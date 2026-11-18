import { sql } from "@payloadcms/db-sqlite";

/**
 * Content migrations run when the server starts, and on Vercel several server
 * instances can start at once, each running the same migration. Two copies of
 * the same update racing each other can wipe or double a course's lists.
 *
 * Call this first in any migration that changes content. It returns true for
 * exactly one instance (the one whose insert wins); every other instance should
 * return without touching anything.
 */
export async function claimMigration(db: any, name: string): Promise<boolean> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS mch_migration_claims (name text PRIMARY KEY NOT NULL, claimed_at text NOT NULL)`);
  const res = await db.run(sql`INSERT OR IGNORE INTO mch_migration_claims (name, claimed_at) VALUES (${name}, ${new Date().toISOString()})`);
  return Number(res?.rowsAffected ?? 0) === 1;
}
