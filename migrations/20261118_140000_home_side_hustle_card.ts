import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'
import { claimMigration } from '../lib/cms/migrationLock'

// Homepage "Side Hustle, Done Right" card: drop the six-week length for now
// (the programme length isn't settled). Only changes the text if it still
// mentions six weeks, so an edit made in the dashboard is never overwritten.

const NAME = '20261118_140000_home_side_hustle_card'
const TEXT = 'From idea to first paying customer, with someone who built his on the side. Intro session 20 January.'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  try {
    if (!(await claimMigration(db, NAME))) return
    const home = (await payload.findGlobal({ slug: 'page-home' as never, depth: 0, req })) as any
    const course = { ...(home?.course || {}) }
    const current = String(course.text_17 || '')
    if (current && !/six weeks|6 weeks/i.test(current)) return
    course.text_17 = TEXT
    await payload.updateGlobal({ slug: 'page-home' as never, data: { course } as never, depth: 0, req })
  } catch (err) {
    console.error(`[migration ${NAME}]`, err)
  }
}

export async function down(_: MigrateDownArgs): Promise<void> {}
