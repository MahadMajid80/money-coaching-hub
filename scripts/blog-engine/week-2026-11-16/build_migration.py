import json, base64, sys
sys.path.insert(0, '/home/claude/work/blog')
from md2lex import convert

W = '/home/claude/work/blog/w1/'
C = '/home/claude/work/covers/'
ARTICLES = [
 dict(key='a', md='a-invest-100.md', slug='start-investing-100-a-month', category='investment-coaching',
      when='2026-11-16T06:00:00.000Z',
      title='How do I start investing in Malta with €100 a month?',
      excerpt='Is €100 a month enough to start investing? Yes. Here are the four steps I walk beginners in Malta through, with real numbers on what small amounts can grow into.',
      meta_title='How to start investing in Malta with €100 a month | Money Coaching Hub',
      meta_desc='Is €100 a month enough to invest? A simple four-step guide for beginners in Malta: safety net, low-cost funds, the right platform, and patience.',
      alt_wide='Luca Caruana smiling beside stacks of coins that grow taller from left to right',
      alt_share='How do I start investing with €100 a month? Luca Caruana, Certified Money Coach'),
 dict(key='b', md='b-ai-job.md', slug='will-ai-take-my-job-protect-your-finances', category='employee-financial-wellness',
      when='2026-11-17T06:00:00.000Z',
      title='Will AI take my job? How to protect your finances either way',
      excerpt="Worried AI could replace your job? Don't plan from panic. How big your emergency fund really needs to be, why you shouldn't stop investing, and the skills AI can't copy.",
      meta_title='Will AI take my job? Protect your finances either way | Money Coaching Hub',
      meta_desc='Worried about AI and your job? How to size your emergency fund, keep investing, and build the skills AI is still poor at. A practical plan from a Malta money coach.',
      alt_wide='A woman working at a laptop between an AI chip and a shield protecting a coin',
      alt_share='Will AI take my job? Protect your finances either way. Luca Caruana, Certified Money Coach'),
 dict(key='c', md='c-bnpl.md', slug='buy-now-pay-later-convenience-or-trap', category='smart-financial-choices',
      when='2026-11-19T06:00:00.000Z',
      title='Buy now, pay later: convenience or trap?',
      excerpt='A €2,000 phone that ends up costing €2,565. When buy now, pay later makes sense, when it becomes a trap, and what the new EU rules from 20 November change.',
      meta_title='Buy now, pay later: convenience or trap? | Money Coaching Hub',
      meta_desc='When buy now, pay later makes sense and when it turns into expensive debt. Four questions to ask before you click, plus the new EU consumer credit rules.',
      alt_wide='A daughter and her mother beneath a phone showing a purchase split into four payments',
      alt_share='Buy now, pay later: convenience or trap? Luca Caruana, Certified Money Coach'),
 dict(key='d', md='d-gambling.md', slug='husband-gambling-what-now', category='family-budgeting',
      when='2026-11-21T06:00:00.000Z',
      title="I found my husband's gambling bets. What now?",
      excerpt="€11,000 in bets on a husband's bank statement. The practical steps to protect your family's money this week, the questions to ask, and where to find help in Malta.",
      meta_title="I found my husband's gambling bets. What now? | Money Coaching Hub",
      meta_desc="Found gambling transactions on your partner's statement? How to protect joint accounts and savings, what to ask, and where families can get support in Malta.",
      alt_wide='A woman at a table reviewing a bank statement with highlighted lines, beside a locked bank card',
      alt_share="I found my husband's gambling bets. What now? Luca Caruana, Certified Money Coach"),
]

def b64(p): return base64.b64encode(open(p, 'rb').read()).decode()

import re as _re
V = '/home/claude/work/covers/'
items = []
for a in ARTICLES:
    md_text = open(W + a['md']).read()
    images = [{'key': k, 'alt': alt, 'data': b64(V + 'v-' + k + '.webp')} for k, alt in _re.findall(r'\{\{img:([\w-]+)\|(.*)\}\}', md_text)]
    content = convert(open(W + a['md']).read())
    items.append({k: a[k] for k in ('slug', 'category', 'when', 'title', 'excerpt', 'meta_title', 'meta_desc', 'alt_wide', 'alt_share')}
                 | {'content': content, 'images': images, 'wide': b64(C + a['key'] + '-wide.webp'), 'share': b64(C + a['key'] + '-share.webp')})

ts = """/* eslint-disable @typescript-eslint/no-explicit-any */
import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

// Blog week of 16 November 2026: four articles, each with a text-free blog image, a titled share image,
// and in-article charts/tables (uploaded to Media and placed in the content as image blocks).
// Each post is saved as a draft with its publish date, and a scheduled-publish job is queued for 07:00 Malta time
// on that date (the daily Vercel Cron runs the queue). A post whose date has already passed is published straight away.
// Preview deployments share the live database, so this refuses to run there; it runs on the live site.

type Item = {
  slug: string; category: string; when: string; title: string; excerpt: string
  meta_title: string; meta_desc: string; alt_wide: string; alt_share: string
  content: unknown; wide: string; share: string
  images: { key: string; alt: string; data: string }[]
}

// Swap each inline-image placeholder ("__IMG_<key>__") in the content for the uploaded media id.
function withImageIds(node: any, ids: Record<string, number | string>): any {
  if (Array.isArray(node)) return node.map((n) => withImageIds(n, ids))
  if (node && typeof node === 'object') {
    const out: any = {}
    for (const [k, v] of Object.entries(node)) {
      const m = typeof v === 'string' ? v.match(/^__IMG_(.+)__$/) : null
      out[k] = m ? ids[m[1]] : withImageIds(v, ids)
    }
    return out
  }
  return node
}

const ITEMS: Item[] = __ITEMS__

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  if (process.env.VERCEL_ENV === 'preview') throw new Error('Blog article migration runs on the live site only.')
  const now = Date.now()

  for (const it of ITEMS) {
    const existing = await payload.find({ collection: 'posts', where: { slug: { equals: it.slug } }, limit: 1, depth: 0, draft: true, req })
    if (existing.docs.length) continue

    const cat = await payload.find({ collection: 'categories', where: { slug: { equals: it.category } }, limit: 1, depth: 0, req })
    const categoryId = cat.docs[0]?.id
    if (!categoryId) throw new Error(`Category ${it.category} not found`)

    const wide = Buffer.from(it.wide, 'base64')
    const share = Buffer.from(it.share, 'base64')
    const wideMedia = await payload.create({
      collection: 'media', data: { alt: it.alt_wide } as any,
      file: { data: wide, mimetype: 'image/webp', name: `${it.slug}-wide.webp`, size: wide.length }, req,
    })
    const shareMedia = await payload.create({
      collection: 'media', data: { alt: it.alt_share } as any,
      file: { data: share, mimetype: 'image/webp', name: `${it.slug}.webp`, size: share.length }, req,
    })

    const ids: Record<string, number | string> = {}
    for (const im of it.images) {
      const buf = Buffer.from(im.data, 'base64')
      const m = await payload.create({
        collection: 'media', data: { alt: im.alt } as any,
        file: { data: buf, mimetype: 'image/webp', name: `${it.slug}-${im.key}.webp`, size: buf.length }, req,
      })
      ids[im.key] = m.id
    }
    const content = withImageIds(it.content, ids)

    const publishNow = new Date(it.when).getTime() <= now
    // Several server instances can start at once and run this migration side by side. If another one
    // already created this post, tidy up the images we just uploaded and move on instead of crashing.
    const created = [wideMedia.id, shareMedia.id, ...Object.values(ids)]
    let post: any
    try {
      post = await payload.create({
      collection: 'posts',
      draft: !publishNow,
      data: {
        title: it.title,
        slug: it.slug,
        category: categoryId,
        featuredImage: wideMedia.id,
        excerpt: it.excerpt,
        content: content as any,
        publishedAt: publishNow ? new Date(now).toISOString() : it.when,
        _status: publishNow ? 'published' : 'draft',
        meta: { title: it.meta_title, description: it.meta_desc, image: shareMedia.id },
      } as any,
      req,
    })
    } catch (err) {
      const again = await payload.find({ collection: 'posts', where: { slug: { equals: it.slug } }, limit: 1, depth: 0, draft: true, req })
      if (!again.docs.length) throw err
      for (const id of created) await payload.delete({ collection: 'media', id, req }).catch(() => {})
      continue
    }

    if (!publishNow) {
      await payload.jobs.queue({
        task: 'schedulePublish' as any,
        input: { type: 'publish', doc: { relationTo: 'posts', value: String(post.id) } } as any,
        // a few minutes before the 06:00 UTC cron, so that day's run picks it up
        waitUntil: new Date(new Date(it.when).getTime() - 5 * 60 * 1000),
        req,
      })
    }
  }
}

export async function down(_: MigrateDownArgs): Promise<void> {}
"""
out = ts.replace('__ITEMS__', json.dumps(items, ensure_ascii=False, indent=0))
open('/home/claude/moneycoachinghub/migrations/20261115_230000_blog_week_16_nov.ts', 'w').write(out)
print(len(out))
