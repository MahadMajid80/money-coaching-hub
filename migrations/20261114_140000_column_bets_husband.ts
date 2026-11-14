import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

// Adds the Money Coach column of 14 Nov 2026 to the homepage column list.
// Preview deployments share the live database, so this refuses to run there.

const URL = 'https://timesofmalta.com/article/i-found-11000-bets-husband-bank-statement-now.1137025'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  if (process.env.VERCEL_ENV === 'preview') throw new Error('Column migration runs on the live site only.')
  const existing = await payload.find({ collection: 'columns', where: { url: { equals: URL } }, limit: 1, depth: 0, req })
  if (existing.docs.length) return
  await payload.create({
    collection: 'columns',
    data: {
      title: "'I found €11,000 of bets on my husband's bank statement. What now?'",
      url: URL,
      date: '2026-11-14T12:00:00.000Z',
    } as any,
    req,
  })
}

export async function down(_: MigrateDownArgs): Promise<void> {}
