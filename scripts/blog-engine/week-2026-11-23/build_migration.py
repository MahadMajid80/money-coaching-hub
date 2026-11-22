import json, base64, sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
from md2lex import convert

W = os.path.dirname(os.path.abspath(__file__)) + '/'
C = sys.argv[1].rstrip('/') + '/'  # render folder with the .webp files
ARTICLES = [
 dict(key='a', md='a-what-is-etf.md', slug='what-is-an-etf-simple-explanation', category='investment-coaching',
      when='2026-11-23T06:00:00.000Z',
      title='What is an ETF? A simple explanation',
      excerpt="What is an ETF, and why does everyone recommend them? A plain-words explanation: what's inside the basket, why fees matter, and how to check you're really diversified.",
      meta_title='What is an ETF? A simple explanation | Money Coaching Hub',
      meta_desc='What is an ETF and how does it work? A plain guide for beginners in Malta: indices, fees, diversification, factsheets, and what to check before you buy.',
      alt_wide='A shopping basket filled with small buildings, with coins flying into it',
      alt_share='What is an ETF? A simple explanation. Luca Caruana, Certified Money Coach'),
 dict(key='b', md='b-property-stocks.md', slug='property-or-stocks-where-should-my-money-go', category='investment-coaching',
      when='2026-11-24T06:00:00.000Z',
      title='Property or stocks: where should my money go?',
      excerpt='A couple with two rental apartments and €200,000 in cash: buy a third, or finally invest in stocks? The real costs of property in Malta, concentration risk, and a gentler way in.',
      meta_title='Property or stocks: where should my money go? | Money Coaching Hub',
      meta_desc='Property or the stock market? Compare rental property in Malta with low-cost share funds: stamp duty, rental tax, diversification, and how to start gradually.',
      alt_wide='A couple standing beneath a house on one side and a rising chart on the other',
      alt_share='Property or stocks: where should my money go? Luca Caruana, Certified Money Coach'),
 dict(key='c', md='c-guilty-spending.md', slug='earn-well-feel-guilty-spending-money', category='money-mindset',
      when='2026-11-26T06:00:00.000Z',
      title='I earn well, but I feel guilty spending anything',
      excerpt="Earning well but feeling guilty every time you spend? Why more saving won't fix it, how to decide what 'enough' means, and how to give yourself guilt-free money.",
      meta_title='I earn well, but I feel guilty spending anything | Money Coaching Hub',
      meta_desc='Why you feel guilty spending money even when you can afford it, and what to do: define your enough number, give every euro a job, and plan guilt-free spending.',
      alt_wide='A woman holding a small shopping bag beside a large locked piggy bank',
      alt_share='I earn well, but I feel guilty spending anything. Luca Caruana, Certified Money Coach'),
 dict(key='d', md='d-mgs-etfs.md', slug='malta-government-stocks-or-etfs', category='investment-coaching',
      when='2026-11-28T06:00:00.000Z',
      title='Malta Government Stocks or ETFs: which suits me?',
      excerpt='Recent Malta Government Stocks paid 3.80% to 4.50% a year. How MGS work, what €10,000 would earn, how they compare with ETFs, and three questions to choose your mix.',
      meta_title='Malta Government Stocks or ETFs: which suits me? | Money Coaching Hub',
      meta_desc='Malta Government Stocks or ETFs? How MGS work, current rates from the 2026 issues, what they pay after tax, and how to decide between stability and growth.',
      alt_wide='A government building with a bond certificate beside a basket of small buildings',
      alt_share='Malta Government Stocks or ETFs: which suits me? Luca Caruana, Certified Money Coach'),
]

def b64(p): return base64.b64encode(open(p, 'rb').read()).decode()

import re as _re
V = C
items = []
for a in ARTICLES:
    md_text = open(W + a['md']).read()
    images = [{'key': k, 'alt': alt, 'data': b64(V + 'v-' + k + '.webp')} for k, alt in _re.findall(r'\{\{img:([\w-]+)\|(.*)\}\}', md_text)]
    content = convert(open(W + a['md']).read())
    items.append({k: a[k] for k in ('slug', 'category', 'when', 'title', 'excerpt', 'meta_title', 'meta_desc', 'alt_wide', 'alt_share')}
                 | {'content': content, 'images': images, 'wide': b64(C + a['key'] + '-wide.webp'), 'share': b64(C + a['key'] + '-share.webp')})

ts = """/* eslint-disable @typescript-eslint/no-explicit-any */
import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

// Blog week of 23 November 2026: four articles, each with a text-free blog image, a titled share image,
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
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../migrations/20261122_070000_blog_week_23_nov.ts'), 'w').write(out)
print(len(out))
