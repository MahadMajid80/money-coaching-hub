import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`enquiries\` ADD \`ip_hash\` text;`)
  await db.run(sql`CREATE INDEX \`enquiries_ip_hash_idx\` ON \`enquiries\` (\`ip_hash\`);`)
  await db.run(sql`ALTER TABLE \`subscribers\` ADD \`ip_hash\` text;`)
  await db.run(sql`CREATE INDEX \`subscribers_ip_hash_idx\` ON \`subscribers\` (\`ip_hash\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`enquiries_ip_hash_idx\`;`)
  await db.run(sql`ALTER TABLE \`enquiries\` DROP COLUMN \`ip_hash\`;`)
  await db.run(sql`DROP INDEX \`subscribers_ip_hash_idx\`;`)
  await db.run(sql`ALTER TABLE \`subscribers\` DROP COLUMN \`ip_hash\`;`)
}
