/* eslint-disable @typescript-eslint/no-explicit-any */
import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

// Open the €25 intro booking on the public Side Hustle page (approved by Luca, 20 Nov 2026):
// switch "Side hustle: launch stage" to the intro view and use the Stripe link from the waitlist page
// (€25, stops after 20 bookings). Leaves a payment link alone if one is already set.
// Preview deployments share the live database, so this refuses to run there.

const STRIPE_LINK = 'https://buy.stripe.com/5kQ3cv9Lq6M36g4b7I5os0k'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  if (process.env.VERCEL_ENV === 'preview') throw new Error('Data migration runs on the live site only.')
  const s: any = await payload.findGlobal({ slug: 'side-hustle-settings' as any, depth: 0, req })
  const current = String(s?.introCheckout || '')
  await payload.updateGlobal({
    slug: 'side-hustle-settings' as any,
    data: {
      stage: 'intro',
      introCheckout: current.startsWith('https://buy.stripe.com/') ? current : STRIPE_LINK,
    } as any,
    req,
  })
}

export async function down(_: MigrateDownArgs): Promise<void> {}
