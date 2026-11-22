/* eslint-disable @typescript-eslint/no-explicit-any */
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

const ITEMS: Item[] = [
{
"slug": "what-is-an-etf-simple-explanation",
"category": "investment-coaching",
"when": "2026-11-23T06:00:00.000Z",
"title": "What is an ETF? A simple explanation",
"excerpt": "What is an ETF, and why does everyone recommend them? A plain-words explanation: what's inside the basket, why fees matter, and how to check you're really diversified.",
"meta_title": "What is an ETF? A simple explanation | Money Coaching Hub",
"meta_desc": "What is an ETF and how does it work? A plain guide for beginners in Malta: indices, fees, diversification, factsheets, and what to check before you buy.",
"alt_wide": "A shopping basket filled with small buildings, with coins flying into it",
"alt_share": "What is an ETF? A simple explanation. Luca Caruana, Certified Money Coach",
"content": {
"root": {
"type": "root",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "quote",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "The short answer:",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " an ETF (exchange traded fund) is a basket of many investments that you buy in one go, like a single share. Instead of picking one company, you own a small slice of tens, hundreds or even thousands of them. Most ETFs simply copy an index, which keeps their fees low.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
]
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "A reader wrote to me with a question I think many people are quietly asking.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Over a few years, this reader had built up just over €150,000 in so-called \"reliable ETFs\", with an overall gain of about €50,000. Friends said ETFs just work. Even the reader's financial advisor said: keep investing every month and let the returns come.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "And yet something didn't feel right.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "\"What if I've been blindly following the crowd?\" the letter asked. The honest worry underneath: not really understanding what the money was invested in.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "I loved that letter. Not because ETFs are bad, but because the writer wanted to know what they owned. That's exactly the right instinct. So let's answer it properly, in plain words.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Firstly, what is an ETF?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Think of a basket at the supermarket.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "You could walk around and pick one apple, one loaf of bread and one carton of milk. Or you could pick up a ready-made basket that already holds a little of everything.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "An ETF is the ready-made basket. It holds many shares (or bonds) at once, and you buy the whole basket in one go. The word \"exchange traded\" just means it's bought and sold on a stock exchange during the day, like a normal share.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "So when you buy €100 of an ETF that follows a world index, you don't own €100 of one company. You own a tiny piece of thousands of them.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Why are ETFs so popular?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Three reasons.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "list",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Diversification.",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " If one company struggles, it's one of hundreds. Your money isn't riding on a single business.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 1
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Low fees.",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " Most ETFs copy an index instead of paying a manager to pick shares. Many broad index ETFs charge around 0.1% to 0.3% a year. Some actively managed funds charge 1% to 2.5% a year, plus entry fees.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 2
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Simplicity.",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " You can set up a monthly plan and invest the same amount every month without having to choose individual shares.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 3
}
],
"listType": "bullet",
"start": 1,
"tag": "ul"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Over many years, that fee gap matters. Lower costs mean more of the return stays with you.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "What is an index?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "An index is simply a list of companies with a rule for who's in it.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "The S&P 500, for example, holds 500 of the largest companies listed in the US. A world index holds large companies from many countries. An index ETF buys what's on the list, in roughly the same proportions, and updates when the list changes.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "You'll often hear people push the S&P 500. That's mainly because of its long history: over the past century it has averaged around 8% to 10% a year. But that's an average. Some years it fell by a lot, and the past is no guarantee for the future.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Am I really diversified?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "This was the part of the letter that struck me most. Looking at the portfolio, most of it was in the US, and much of it in a handful of big technology companies. That was never a conscious choice. It came as part of \"buying the index\".",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "It's right to look. Many indices give the most weight to the biggest companies. In March 2026, the 10 largest companies made up about 37% of the S&P 500.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "upload",
"version": 3,
"format": "",
"id": "imgatop10",
"fields": null,
"relationTo": "media",
"value": "__IMG_a-top10__"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "In other words, for every €100 you put into an S&P 500 ETF, roughly €37 goes into just 10 companies. You hold 500 names, but a big part of your result depends on a few of them.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "That's not necessarily wrong. But it should be a choice you make, not a surprise you discover later. A world ETF spreads you across more countries. Other ETFs hold bonds, smaller companies or particular regions. Each basket is different.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Why can't I just buy Apple instead?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "You can. And yes, some single companies have done far better than the index in recent years.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "But you only know the winners afterwards. Even the biggest companies in the world can fall hard. Enron was one of the largest companies in the US before it collapsed in 2001. Now imagine most of your savings sitting in one company that loses half its value in a few weeks.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "An ETF won't make you rich overnight. Its job is to stop one bad decision from sinking you.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "How do I check what's inside an ETF?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Every ETF has a factsheet. Before you buy, look for:",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "list",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "What it holds.",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " The index it follows, and its top 10 holdings.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 1
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Where.",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " How much is in each country and sector.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 2
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "What it costs.",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " The yearly charge, often called the TER or ongoing charges.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 3
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Whether it pays out or reinvests.",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " \"Distributing\" ETFs pay dividends to you. \"Accumulating\" ETFs reinvest them for you.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 4
}
],
"listType": "number",
"start": 1,
"tag": "ol"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "A tip I use myself: if the factsheet feels heavy, upload it to an AI tool and ask for a plain summary. It won't replace proper advice, but it helps you understand what you're looking at.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Also, in Malta and the rest of the EU, most people buy European \"UCITS\" ETFs. Many US-based ETFs aren't sold to ordinary EU investors, because they don't provide the key information document EU rules require.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Frequently asked questions",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Are ETFs safe?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h3"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "ETFs are spread across many investments, which lowers the risk of one company hurting you. But their value still goes up and down with the markets, and you can lose money. Treat them as a long-term investment, ideally five years or more.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "What is the difference between an ETF and a mutual fund?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h3"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Both are baskets of investments. Most ETFs follow an index and trade on an exchange during the day, usually with lower fees. Many mutual funds are actively managed, priced once a day, and often charge more.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Can I buy ETFs in Malta?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h3"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Yes. Through a local bank or stockbroker, or through an online investment platform. Check that the provider is regulated, what it really costs, and whether it lets you invest a set amount every month.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "How are ETFs taxed in Malta?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h3"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "It depends on the type of fund and where it's based. Check before you invest, or ask a tax professional. It's a short conversation that saves headaches later.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Want to understand it properly, in Maltese?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "My course ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "link",
"fields": {
"linkType": "custom",
"url": "/investing-made-simple/",
"newTab": false
},
"format": "",
"indent": 0,
"version": 3,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Investing Made Simple",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
]
},
{
"type": "text",
"text": " explains ETFs, indices and how to build a simple plan, over four live Monday evenings from 11 January, in Maltese. €175 if you book by 31 December, €195 from 1 January.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "This article is for education only and is not financial or investment advice. Luca Caruana is a Certified Money Coach (CMC®). Money Coaching Hub does not sell financial products. Past performance does not guarantee future results. Based on a reader question first answered in Luca's Money Coach column in the Times of Malta.",
"format": 2,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 2,
"textStyle": ""
}
]
}
},
"images": [
{
"key": "a-top10",
"alt": "Bar showing that in March 2026 the 10 largest companies made up about 37% of the S&P 500, and the other 490 companies about 63%.",
"data": "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"
}
],
"wide": "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",
"share": "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"
},
{
"slug": "property-or-stocks-where-should-my-money-go",
"category": "investment-coaching",
"when": "2026-11-24T06:00:00.000Z",
"title": "Property or stocks: where should my money go?",
"excerpt": "A couple with two rental apartments and €200,000 in cash: buy a third, or finally invest in stocks? The real costs of property in Malta, concentration risk, and a gentler way in.",
"meta_title": "Property or stocks: where should my money go? | Money Coaching Hub",
"meta_desc": "Property or the stock market? Compare rental property in Malta with low-cost share funds: stamp duty, rental tax, diversification, and how to start gradually.",
"alt_wide": "A couple standing beneath a house on one side and a rising chart on the other",
"alt_share": "Property or stocks: where should my money go? Luca Caruana, Certified Money Coach",
"content": {
"root": {
"type": "root",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "quote",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "The short answer:",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " it's rarely \"either, or\". Property gives you rent you can see and touch, but it ties a lot of money to one asset in one country. Shares, usually through low-cost funds, spread your money widely and are easier to sell, but they move up and down more. Start from the life you want, then build a mix that gets you there and lets you sleep at night.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
]
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "A couple wrote to me with a question I hear more than almost any other.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "The writer is 39. Together with their wife, they had always invested in property, only in Malta. They own their home outright. They have two rented apartments on a loan, and the rent comfortably covers the repayments. By the time they're about 60, both will be paid off.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Now they have over €200,000 in cash. Their goal is to stop working, or at least slow down a lot, in about ten years.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Their friends have done well in the stock market. One told them she had averaged around 15% a year since 2012. But the writer has always kept away from it. Their parents lost a lot of money when they invested through one of Malta's biggest banks, and that memory never left.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Their question: should they buy a third apartment, or finally invest in stocks?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Firstly, notice where the fear comes from",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "This hesitation isn't really about stocks. It's about what happened to their parents.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "I understand this personally. My own father lost money in the 1990s on what was then seen as one of the most attractive investments around: Argentinian bonds. That experience shaped how I saw investing for years.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "What it taught me is this: not every investment is a good investment, and not all \"stock market investing\" is the same. A bad product sold by a bank is not the same thing as a low-cost fund that holds thousands of companies.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "And the friend's 15% a year? Maybe. But results like that depend on what she bought, when, and for how long. Comparing yourself to a friend's best number is a poor way to plan.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Property and shares side by side",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Here's how the two compare on the things that matter most to a family.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "upload",
"version": 3,
"format": "",
"id": "imgbcompare",
"fields": null,
"relationTo": "media",
"value": "__IMG_b-compare__"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Neither column is \"right\". They do different jobs.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "What a third apartment would really cost",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Let's put some simple numbers on it. These are an illustration, not a quote.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Say a €200,000 apartment rents for €900 a month:",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "list",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Stamp duty:",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " in Malta it's normally 5% of the price, so about ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": "€10,000",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": ", before notary and agent fees.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 1
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Rent:",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " €900 × 12 = ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": "€10,800",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " a year.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 2
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Tax:",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " if you choose Malta's 15% final tax on rent, it's charged on the gross rent, so about ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": "€1,620",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": ".",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 3
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "What's left:",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " about ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": "€9,180",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " a year, before repairs, empty months and furniture.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 4
}
],
"listType": "bullet",
"start": 1,
"tag": "ul"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "That's a return of roughly 4.4% on the €210,000 you'd put in, before those other costs. Not bad. But it also means that nearly everything they own, their home and three apartments, would sit in one asset class, in one small country.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "That's called concentration risk. When property does well, it feels like genius. When it doesn't, everything is hit at the same time.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "What does \"retiring at 50\" actually need?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Before choosing between bricks and shares, I always ask one question: what does your version of retirement look like?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Do you want to stop completely, or just work less? How much do you realistically need each month? Which costs will stay, and which will disappear once the loans are paid?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Early retirement isn't about chasing the highest return. It's about matching reliable income to your future costs. Rent is good at this. So are investments that you can draw on gradually. Knowing your number tells you how much of each you need.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "A gentler way in",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "If you've never invested before, putting €200,000 into the market in one day is a lot to handle emotionally. If prices drop 10% or 20% soon after, even a sensible long-term plan can feel like a disaster.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "A smoother approach is to invest gradually. For example, investing €200,000 in equal parts over 24 months is about ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": "€8,333 a month",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": ". Some months you'll buy when prices are high, some when they're low. This is called dollar-cost averaging, and its biggest benefit is that it helps you stay calm and consistent.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "And remember: adding shares doesn't mean giving up on property. It means not depending on a single path.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Educate yourself first, then get advice",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "On a sum this size, speak to a licensed investment advisor before you decide. Not to hand over control, but to understand your options and how they fit your goals and tax situation.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "But learn the basics first. It's your money, and no one will ever care about it more than you do. Knowing how a fund works, what it costs and what can go wrong is what turns fear into a decision.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Frequently asked questions",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Is property or the stock market a better investment?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h3"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Neither wins every time. Over the past century, the S&P 500 has averaged around 8% to 10% a year, with some painful years. Property can earn rent and grow in value, but it costs more to buy and sell and keeps your money in one place. Many people hold some of both.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Is buying property in Malta still a good investment?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h3"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "It can be, but run the numbers first: stamp duty, tax on rent, repairs, empty months and the loan. Then ask how much of your wealth is already in Malta property.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "How much tax do I pay on rental income in Malta?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h3"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "You can choose to pay a 15% final tax on the gross rent, with no expenses deducted. Otherwise rent is taxed with your other income. Check which suits you with a tax professional.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Should I invest a large sum all at once?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h3"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Investing in parts over months is often easier to live with emotionally. Historically, investing all at once has done better about two thirds of the time, according to Vanguard research, because markets rise more often than they fall. The best choice is the one you'll stick with.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Want to understand the stock market without the fear?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "My course ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "link",
"fields": {
"linkType": "custom",
"url": "/investing-made-simple/",
"newTab": false
},
"format": "",
"indent": 0,
"version": 3,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Investing Made Simple",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
]
},
{
"type": "text",
"text": " explains shares, funds and how to start gradually, over four live Monday evenings from 11 January, in Maltese. €175 if you book by 31 December, €195 from 1 January.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "This article is for education only and is not financial, investment or tax advice. Luca Caruana is a Certified Money Coach (CMC®). Money Coaching Hub does not sell financial products. Past performance does not guarantee future results. Based on a reader question first answered in Luca's Money Coach column in the Times of Malta.",
"format": 2,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 2,
"textStyle": ""
}
]
}
},
"images": [
{
"key": "b-compare",
"alt": "Table comparing a Malta rental apartment with a low-cost share fund. Apartment: about €200,000 to start plus stamp duty, rent every month, all in one asset in one country, slow to sell, needs your time. Share fund: can start from small monthly amounts, spread over many companies and countries, can usually be sold within days, little time needed, but its value moves up and down more.",
"data": "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"
}
],
"wide": "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",
"share": "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"
},
{
"slug": "earn-well-feel-guilty-spending-money",
"category": "money-mindset",
"when": "2026-11-26T06:00:00.000Z",
"title": "I earn well, but I feel guilty spending anything",
"excerpt": "Earning well but feeling guilty every time you spend? Why more saving won't fix it, how to decide what 'enough' means, and how to give yourself guilt-free money.",
"meta_title": "I earn well, but I feel guilty spending anything | Money Coaching Hub",
"meta_desc": "Why you feel guilty spending money even when you can afford it, and what to do: define your enough number, give every euro a job, and plan guilt-free spending.",
"alt_wide": "A woman holding a small shopping bag beside a large locked piggy bank",
"alt_share": "I earn well, but I feel guilty spending anything. Luca Caruana, Certified Money Coach",
"content": {
"root": {
"type": "root",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "quote",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "The short answer:",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " feeling guilty every time you spend, even when you have enough, is usually not about money. It's about fear, and about never having decided what \"enough\" means for you. Give your savings a clear job, decide your number, then give yourself a planned amount to spend without having to justify it.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
]
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "A couple in their early 40s wrote to me recently.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "On paper, they're doing better than most people twice their age. They own their home, on a very low-interest loan. They have two apartments, fully paid off, that bring in rent every month. They pay into a pension. And they have €400,000 in savings.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Their words? \"We still feel paralysed.\"",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "I see a version of this all the time, and not only with big numbers. People who earn well, who've done everything \"right\", and who still feel a knot in their stomach when they spend on anything that isn't strictly necessary.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "If that sounds like you, this article is for you.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Does this sound familiar?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "list",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "You compare prices on small things, even when the difference is a few cents.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 1
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "You buy something nice, then feel you have to explain it, or you return it.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 2
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Your savings keep growing, but you never feel safer.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 3
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Your partner or family has started to see your carefulness as sad rather than sensible.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 4
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "You keep postponing a holiday, a course or a treat \"until things settle\".",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 5
}
],
"listType": "bullet",
"start": 1,
"tag": "ul"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Being careful with money is a strength. But when saving stops being a choice and becomes a rule you can't break, something else is in charge.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Firstly, it isn't really about money",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "In my experience, the guilt rarely comes from the bank balance. It usually comes from somewhere older.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Maybe you grew up in a home where money was tight and every purchase caused an argument. Maybe you saw a parent lose savings, a business or a job. Maybe you were taught, without anyone ever saying it, that spending on yourself is selfish.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Those lessons protected you once. But they don't know that your situation has changed. So they keep sounding the alarm, whatever the numbers say.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "That's why more saving doesn't fix it. If the fear isn't about the amount, no amount will ever feel like enough.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Decide what \"enough\" means to you",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "When I replied to that couple, I didn't suggest a single investment. I asked them two questions:",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "list",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "What do you actually want out of life?",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 1
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "How much is enough?",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 2
}
],
"listType": "number",
"start": 1,
"tag": "ol"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Most people have never answered these out loud. Without them, your savings have no finish line. And a race without a finish line is exhausting.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "\"Enough\" isn't the same for everyone. For me, it means providing for my wife and children, seeing them grow comfortably, and making great memories together. That has a price, and it's far less than most people think.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Write your own answer down. Put a number on it if you can. Then look at where you are today.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Give every euro a job",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Guilt grows in the grey areas. When all your money sits in one big pot, every euro you spend feels like it's coming out of your future.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Split it instead:",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "list",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Safety:",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " an emergency fund of a few months of essential costs, kept somewhere easy to reach.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 1
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Future:",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " money for long-term goals, like your pension or investments, set aside automatically every month.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 2
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Life now:",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " a planned amount every month that you're allowed to spend, guilt-free, on whatever you like.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 3
}
],
"listType": "bullet",
"start": 1,
"tag": "ul"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Once safety and future are taken care of first, the \"life now\" money is no longer a risk. It's part of the plan.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "upload",
"version": 3,
"format": "",
"id": "imgcworksheet",
"fields": null,
"relationTo": "media",
"value": "__IMG_c-worksheet__"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "For example, if you take home €4,000 a month and decide that 5% is your \"life now\" money, that's ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": "€200 a month",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": ", or ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": "€2,400 a year",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": ", to spend without asking permission. The exact percentage is yours to choose. Start small if you need to.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Practise spending, on purpose",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "This sounds strange, but spending is a skill too. If you've avoided it for years, start gently:",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "list",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Pick one thing a month",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " from your \"life now\" money that you've been postponing.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 1
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Notice the guilt, then wait.",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " It usually fades within a day or two. Write down how you feel a week later.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 2
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Spend on experiences and people,",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " not only on things. A dinner with friends often brings more joy than another object.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 3
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Talk about it with your partner.",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " Agree on your \"enough\" number together, so the spending feels shared, not secret.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 4
}
],
"listType": "bullet",
"start": 1,
"tag": "ul"
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "When to get support",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "If the anxiety about money is affecting your sleep, your relationship or your daily life, you don't have to sort it out alone. A money coach can help you untangle the beliefs behind it. And if it feels heavier than that, speaking to a GP or a mental health professional is a sign of strength, not weakness.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Frequently asked questions",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Why do I feel guilty spending money when I can afford it?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h3"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Often because of old money beliefs, learned in childhood or from a difficult experience, that still sound the alarm even though your situation has changed. The guilt is a feeling, not proof that you're doing something wrong.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Is it bad to be too frugal?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h3"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Being careful is healthy. It becomes a problem when it stops you enjoying your life, causes tension with the people you love, or keeps you anxious no matter how much you save.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "How much should I spend on myself?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h3"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "There's no single right number. Once your emergency fund and long-term saving are covered, many people find it helps to set a fixed amount or percentage of take-home pay to spend freely each month.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "How do I stop feeling anxious about money?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h3"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Start with clarity: know your numbers, decide what \"enough\" means, and give every euro a job. If the anxiety stays, talk it through with a coach or a professional.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Want to make peace with your money?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "If you earn well but still can't enjoy it, a ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "link",
"fields": {
"linkType": "custom",
"url": "/services/",
"newTab": false
},
"format": "",
"indent": 0,
"version": 3,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "one-to-one coaching session",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
]
},
{
"type": "text",
"text": " helps you understand where the guilt comes from and build a plan that lets you save and live.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "This article is for education only and is not financial advice. Luca Caruana is a Certified Money Coach (CMC®). Money Coaching Hub does not sell financial products. Opening story based on a reader question first answered in Luca's Money Coach column in the Times of Malta.",
"format": 2,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 2,
"textStyle": ""
}
]
}
},
"images": [
{
"key": "c-worksheet",
"alt": "Worksheet with three boxes for monthly take-home pay: safety (emergency fund), future (pension and investments) and life now (guilt-free spending), plus an example where 5% of a €4,000 take-home pay gives €200 a month, or €2,400 a year, to spend freely.",
"data": "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"
}
],
"wide": "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",
"share": "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"
},
{
"slug": "malta-government-stocks-or-etfs",
"category": "investment-coaching",
"when": "2026-11-28T06:00:00.000Z",
"title": "Malta Government Stocks or ETFs: which suits me?",
"excerpt": "Recent Malta Government Stocks paid 3.80% to 4.50% a year. How MGS work, what €10,000 would earn, how they compare with ETFs, and three questions to choose your mix.",
"meta_title": "Malta Government Stocks or ETFs: which suits me? | Money Coaching Hub",
"meta_desc": "Malta Government Stocks or ETFs? How MGS work, current rates from the 2026 issues, what they pay after tax, and how to decide between stability and growth.",
"alt_wide": "A government building with a bond certificate beside a basket of small buildings",
"alt_share": "Malta Government Stocks or ETFs: which suits me? Luca Caruana, Certified Money Coach",
"content": {
"root": {
"type": "root",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "quote",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "The short answer:",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " Malta Government Stocks (MGS) suit money you want to keep steady and earning a fixed income, especially if you'll hold them until they mature. ETFs that hold shares suit money you can leave for many years and can watch go up and down. Many people use both: MGS for stability and income, ETFs for long-term growth.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
]
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "A 78-year-old reader wrote to me about an inheritance of €100,000.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "The dilemma: buy two garages and rent them out? Or put the money into bonds paying 5.5% to 6% interest? The money wasn't needed for daily living, there were no big expenses coming up, and some ups and downs were fine.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Then came the detail that mattered most. Of an existing €444,000 portfolio, 64% was already in bonds.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "The question was really one that many people in Malta ask: should my money sit in something safe that pays me interest, or in something that can grow?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Firstly, what are Malta Government Stocks?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Despite the name, MGS aren't shares. They're bonds: a loan you make to the Government of Malta.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Here's how they work:",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "list",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "You lend money, in units of €100, for a set number of years.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 1
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "In return, you get a fixed interest rate (the \"coupon\"), paid twice a year.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 2
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "When the stock matures, you get your €100 per unit back.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 3
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "They're listed on the Malta Stock Exchange, so you can sell before maturity. But then you get the market price on the day, which can be more or less than you paid.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 4
}
],
"listType": "bullet",
"start": 1,
"tag": "ul"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "The Treasury plans three to four MGS issues in 2026. Retail investors apply through Malta Stock Exchange members and other licensed investment firms, at a fixed price announced in advance.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "What do they pay right now?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "The most recent issues give a feel for current rates:",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "list",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "August 2026:",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " 3.80% MGS 2036 and 4.25% MGS 2046.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 1
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "October 2026:",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " 4.30% MGS 2037 and 4.50% MGS 2041.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 2
}
],
"listType": "bullet",
"start": 1,
"tag": "ul"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Both were offered to the public at €100 per €100, so the yield, if held to maturity, was close to the coupon. Rates change with every issue, and each one's terms are announced one to two weeks before it opens. Check the Treasury's website for the next one.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "In practice, if you put ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": "€10,000",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " into the 4.30% MGS 2037:",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "list",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "You'd receive ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": "€430",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " a year in interest, paid as ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": "€215",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " every six months.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 1
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Interest on investments in Malta usually has 15% tax taken off at source for residents, so that would be about ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": "€365.50",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " a year after tax.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 2
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Over the roughly 11 years to 2037, that's about ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": "€4,000",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " in interest after tax, plus your €10,000 back at maturity.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 3
}
],
"listType": "bullet",
"start": 1,
"tag": "ul"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "You know those numbers on day one. That's the big attraction.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "And ETFs?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "An ETF (exchange traded fund) is a basket of many investments that you buy in one go. A world share ETF can hold thousands of companies across dozens of countries, usually for a low yearly fee.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "There's no fixed interest and no maturity date. The value goes up and down every day. Over long periods, shares have historically grown more than bonds, but with some painful years along the way. Falls of 20% or more in a single year have happened several times, most recently in 2008. Over 10 years or longer, the ups and downs have tended to even out, but there's no guarantee.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Side by side",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "upload",
"version": 3,
"format": "",
"id": "imgdcompare",
"fields": null,
"relationTo": "media",
"value": "__IMG_d-compare__"
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "So which suits me?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Ask yourself three questions.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "list",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "When will I need this money?",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " Within a few years, or for a regular income, MGS held to maturity are a natural fit. If you won't touch it for ten years or more, ETFs give it room to grow.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 1
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "How would I feel if it dropped 20% in a year?",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " If the honest answer is \"I couldn't sleep\", lean towards MGS. Ups and downs only hurt when you sell in panic.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 2
},
{
"type": "listitem",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "What do I already own?",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " This is the one people forget.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 3
}
],
"listType": "number",
"start": 1,
"tag": "ol"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "That last question was the key for my reader. With 64% already in bonds, adding even more would mean being even more concentrated in one kind of investment. So I suggested looking at a two-part approach: part of the inheritance in quality bonds, to keep the regular income, and part in a diversified, low-cost share fund for growth, matching the reader's wish to hold more shares.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Think of MGS as the foundations and ETFs as the extension. Most homes need both.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Frequently asked questions",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Are Malta Government Stocks safe?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h3"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "They're issued by the Government of Malta and pay a fixed interest rate, which makes them among the more stable investments for Maltese savers. But no investment is risk-free. If you sell before maturity, the price can be lower than you paid, and inflation can eat into fixed interest.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "How do I buy Malta Government Stocks?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h3"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "When a new issue opens, apply through a Malta Stock Exchange member or another licensed investment firm, using the application form published by the Treasury. You can also buy existing MGS on the Malta Stock Exchange through a stockbroker.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "What is the minimum investment in MGS?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h3"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "MGS are issued in units of €100. In recent issues, individuals could apply for up to €499,900 per stock. Your broker may set its own minimum or charge fees, so ask before you apply.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Is it better to invest in bonds or ETFs?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h3"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "It depends on your timeline, your income needs and how you handle ups and downs. Many people hold both. Bond ETFs also exist, holding many bonds in one fund.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "heading",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Want to build your own mix with confidence?",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"tag": "h2"
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "My course ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "link",
"fields": {
"linkType": "custom",
"url": "/investing-made-simple/",
"newTab": false
},
"format": "",
"indent": 0,
"version": 3,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Investing Made Simple",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
]
},
{
"type": "text",
"text": " explains bonds, ETFs and how to fit them together, over four live Monday evenings from 11 January, in Maltese. €175 if you book by 31 December, €195 from 1 January.",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 0,
"textStyle": ""
},
{
"type": "paragraph",
"format": "",
"indent": 0,
"version": 1,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "This article is for education only and is not financial, investment or tax advice. Luca Caruana is a Certified Money Coach (CMC®). Money Coaching Hub does not sell financial products. Past performance does not guarantee future results. Based on a reader question first answered in Luca's Money Coach column in the Times of Malta.",
"format": 2,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 2,
"textStyle": ""
}
]
}
},
"images": [
{
"key": "d-compare",
"alt": "Table comparing Malta Government Stocks with a world share ETF. MGS: fixed interest twice a year (recent issues 3.80% to 4.50%), your €100 back at maturity, price changes if you sell early, all in one government. World share ETF: no fixed income, value rises and falls every day, can grow more over many years, spread across thousands of companies in many countries.",
"data": "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"
}
],
"wide": "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",
"share": "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"
}
]

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
