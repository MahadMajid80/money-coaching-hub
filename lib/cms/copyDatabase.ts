// One-time copy of the whole dashboard database into another (empty) Turso database.
// Used to move the site's content into a database owned by Luca's Vercel team.
import { createClient, type InStatement } from "@libsql/client";

type Report = { table: string; source: number; target: number }[];

const ident = (n: string) => `"${n.replace(/"/g, '""')}"`;

export async function copyDatabase(
  from: { url: string; authToken?: string },
  to: { url: string; authToken?: string },
): Promise<{ tables: number; rows: number; report: Report; ok: boolean }> {
  const src = createClient(from);
  const dst = createClient(to);

  const existing = await dst.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE 'libsql_%' AND name NOT LIKE '_litestream%'");
  if (existing.rows.length) throw new Error(`The new database isn't empty (${existing.rows.length} tables). Nothing was copied.`);

  const schema = await src.execute(
    "SELECT type, name, tbl_name, sql FROM sqlite_master WHERE sql IS NOT NULL AND name NOT LIKE 'sqlite_%' AND name NOT LIKE 'libsql_%' AND name NOT LIKE '_litestream%' AND name NOT LIKE '_cf_%' ORDER BY CASE type WHEN 'table' THEN 0 WHEN 'index' THEN 1 ELSE 2 END",
  );
  const tables = schema.rows.filter((r) => r.type === "table").map((r) => String(r.name));

  // 1. Tables
  await dst.migrate(schema.rows.filter((r) => r.type === "table").map((r) => String(r.sql)));

  // 2. Rows (in chunks; foreign-key checks are off inside migrate())
  let rows = 0;
  for (const t of tables) {
    const data = await src.execute(`SELECT * FROM ${ident(t)}`);
    if (!data.rows.length) continue;
    const cols = data.columns;
    const sql = `INSERT INTO ${ident(t)} (${cols.map(ident).join(", ")}) VALUES (${cols.map(() => "?").join(", ")})`;
    const stmts: InStatement[] = data.rows.map((r) => ({ sql, args: cols.map((_, i) => r[i] ?? null) }));
    for (let i = 0; i < stmts.length; i += 200) await dst.migrate(stmts.slice(i, i + 200));
    rows += stmts.length;
  }

  // 3. Indexes, triggers, views
  const rest = schema.rows.filter((r) => r.type !== "table").map((r) => String(r.sql));
  if (rest.length) await dst.migrate(rest);

  // 4. Check every table has the same number of rows
  const report: Report = [];
  for (const t of tables) {
    const a = Number((await src.execute(`SELECT COUNT(*) AS n FROM ${ident(t)}`)).rows[0].n);
    const b = Number((await dst.execute(`SELECT COUNT(*) AS n FROM ${ident(t)}`)).rows[0].n);
    report.push({ table: t, source: a, target: b });
  }
  src.close();
  dst.close();
  return { tables: tables.length, rows, report, ok: report.every((r) => r.source === r.target) };
}
