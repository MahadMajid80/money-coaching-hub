/* eslint-disable @typescript-eslint/no-explicit-any */
import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

// The week-of-16-November migration ran on several server instances at once right after the merge.
// The ones that lost the race had already uploaded images, which now sit unused in Media.
// This removes those unused copies (only images named after this week's four posts and not used by them).
// Preview deployments share the live database, so this refuses to run there.

const SLUGS = [
  'start-investing-100-a-month',
  'will-ai-take-my-job-protect-your-finances',
  'buy-now-pay-later-convenience-or-trap',
  'husband-gambling-what-now',
]

function collectIds(node: any, out: Set<string>) {
  if (Array.isArray(node)) return node.forEach((n) => collectIds(n, out))
  if (node && typeof node === 'object') {
    if (node.type === 'upload' && node.value != null) out.add(String(typeof node.value === 'object' ? node.value.id : node.value))
    for (const v of Object.values(node)) collectIds(v, out)
  }
}

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  if (process.env.VERCEL_ENV === 'preview') throw new Error('Data migration runs on the live site only.')

  const used = new Set<string>()
  for (const slug of SLUGS) {
    const r = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1, depth: 0, draft: true, req })
    const p = r.docs[0] as any
    if (!p) return // a post is missing: leave everything as it is
    if (p.featuredImage) used.add(String(p.featuredImage))
    if (p.meta?.image) used.add(String(p.meta.image))
    collectIds(p.content, used)
  }

  for (const slug of SLUGS) {
    const media = await payload.find({ collection: 'media', where: { filename: { like: slug } }, limit: 50, depth: 0, req })
    for (const m of media.docs as any[]) {
      if (!String(m.filename || '').startsWith(slug)) continue
      if (used.has(String(m.id))) continue
      await payload.delete({ collection: 'media', id: m.id, req }).catch(() => {})
    }
  }
}

export async function down(_: MigrateDownArgs): Promise<void> {}
