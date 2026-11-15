/* eslint-disable @typescript-eslint/no-explicit-any */
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

const ITEMS: Item[] = [
{
"slug": "start-investing-100-a-month",
"category": "investment-coaching",
"when": "2026-11-16T06:00:00.000Z",
"title": "How do I start investing in Malta with €100 a month?",
"excerpt": "Is €100 a month enough to start investing? Yes. Here are the four steps I walk beginners in Malta through, with real numbers on what small amounts can grow into.",
"meta_title": "How to start investing in Malta with €100 a month | Money Coaching Hub",
"meta_desc": "Is €100 a month enough to invest? A simple four-step guide for beginners in Malta: safety net, low-cost funds, the right platform, and patience.",
"alt_wide": "Luca Caruana smiling beside stacks of coins that grow taller from left to right",
"alt_share": "How do I start investing with €100 a month? Luca Caruana, Certified Money Coach",
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
"text": " yes, €100 a month is enough to start. Build a small emergency fund first, then invest the same amount every month in a low-cost, diversified fund through a regulated platform, and leave it alone for years. Time does more of the heavy lifting than the amount.",
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
"text": "\"I'd love to invest, but I only have €100 a month. Is it even worth it?\"",
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
"text": "I hear this almost every week. In workshops, in coaching sessions, in messages after my TV segment. And every time, the person asking is a little embarrassed, as if investing were a club with a minimum entry fee.",
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
"text": "It isn't. Not anymore.",
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
"text": "Firstly, is €100 a month really worth it?",
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
"text": "Let me answer with numbers, because they surprise most people.",
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
"text": "If you invest €100 every month and your investments grow by an average of 7% a year, this is roughly what you could end up with:",
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
"text": "After 10 years: about ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": "€17,400",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": ", from €12,000 put in.",
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
"text": "After 20 years: about ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": "€52,400",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": ", from €24,000 put in.",
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
"text": "After 30 years: about ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": "€122,700",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": ", from €36,000 put in.",
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
"type": "upload",
"version": 3,
"format": "",
"id": "imgagrowth",
"fields": null,
"relationTo": "media",
"value": "__IMG_a-growth__"
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
"text": "Look at that last line again. Over 30 years, more than two thirds of the final amount is growth, not money you put in. That's compound growth: your returns start earning returns of their own.",
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
"text": "Illustration only. It assumes a steady 7% a year, which markets never deliver in a straight line, and ignores fees, tax and inflation. Returns can be lower, and you can lose money.",
"format": 2,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"textFormat": 2,
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
"text": "So yes. €100 a month is not \"too small\". It's a beginning, and beginnings matter more than amounts.",
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
"text": "Step 1: make sure you have a safety net first",
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
"text": "Before a single euro goes into the market, ask yourself one question. If my car broke down tomorrow, could I pay for it without touching my investments or a credit card?",
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
"text": "If the answer is no, start there. Even a small emergency fund of one or two months of essential expenses changes everything. It means you will never be forced to sell your investments at the worst possible moment.",
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
"text": "And if you carry expensive debt, like a credit card or a buy now, pay later plan, clear that first. No investment reliably beats 20% interest.",
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
"text": "Step 2: understand what you're buying",
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
"text": "Most beginners in Malta start with ETFs. An ETF (exchange traded fund) is a basket that holds many companies at once. One ETF can give you a small slice of hundreds or even thousands of businesses around the world.",
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
"text": "Two things make ETFs popular with beginners:",
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
"text": " You're not betting on one company. If one struggles, it's one of hundreds.",
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
"text": " Many index ETFs charge around 0.1% to 0.3% a year. Some actively managed funds charge 1% to 2.5% a year, plus entry fees.",
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
"text": "Fees sound small. They're not. On €100 a month over 30 years, the difference between paying 0.2% and 1.5% a year could be around ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": "€26,000",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " in my example above. Same money in, very different result.",
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
"id": "imgafees",
"fields": null,
"relationTo": "media",
"value": "__IMG_a-fees__"
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
"text": "Having said that, \"an ETF\" is not one thing. Some hold the 500 largest American companies. Others hold the whole world, bonds, or a single sector. Read the fund's factsheet before you buy. It tells you what it holds, where, and what it costs.",
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
"text": "Step 3: choose where to invest",
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
"text": "You have two main routes in Malta:",
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
"text": "A local bank or stockbroker.",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " Familiar, face to face, often higher fees.",
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
"text": "An online investment platform.",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " Usually cheaper and easy to set up a monthly plan, but you do everything yourself.",
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
"text": "Whichever you choose, check three things:",
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
"text": "Is it regulated?",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " Look it up on the MFSA register or on its home country regulator's website.",
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
"text": "What does it really cost?",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " Account fees, trading fees, currency conversion fees.",
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
"text": "Does it allow automatic monthly investing?",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " This is what makes €100 a month work.",
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
"text": "How your returns are taxed in Malta can depend on the type of fund. Check this before you start, or ask a tax professional. It's a five-minute conversation that saves headaches later.",
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
"text": "Step 4: automate it, then leave it alone",
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
"text": "Set up a monthly plan for the day after your salary arrives. Investing the same amount every month, whatever the market is doing, is called dollar-cost averaging. When prices are high, your €100 buys less. When prices fall, it buys more.",
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
"text": "And then comes the hardest part of all: doing nothing.",
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
"text": "Markets will drop. Some years they will drop a lot. The people who build wealth are rarely the ones who picked the best fund. They're the ones who kept going when it felt uncomfortable.",
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
"text": "What I tell everyone who starts small",
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
"text": "I started small too. What changed my financial life wasn't a big amount. It was the decision to start, and then the habit of never stopping.",
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
"text": "€100 a month won't make you rich next year. But in twenty years, you'll be very glad that today's version of you didn't wait for the \"right amount\".",
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
"text": "Can I really start investing with €100?",
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
"text": "Yes. Many platforms let you invest small monthly amounts and buy fractions of funds. The key is low fees, so a small amount isn't eaten up by charges.",
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
"text": "What should I invest in first?",
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
"text": "Most beginners start with a low-cost, diversified fund, such as a global or broad index ETF, rather than individual shares. Understand what the fund holds before you buy it.",
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
"text": "Is it safe to invest in Malta?",
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
"text": "All investing carries risk, and the value of your investments can fall. Use a regulated provider, diversify, and only invest money you won't need for at least five years.",
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
"text": "Should I invest or keep saving in the bank?",
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
"text": "Both. Keep your emergency fund in an easy-access account. Money you won't need for many years has historically grown more when invested, though there are no guarantees.",
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
"text": "Want to learn it properly, in Maltese?",
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
"text": " walks you through all of this over four live Monday evenings from 11 January, in Maltese. €175 if you book by 31 December, €195 from 1 January.",
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
"text": "This article is for education only and is not financial or investment advice. Luca Caruana is a Certified Money Coach (CMC®). Money Coaching Hub does not sell financial products. Past performance does not guarantee future results.",
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
"key": "a-growth",
"alt": "Bar chart: €100 a month at 7% a year grows to about €17,409 after 10 years (€12,000 put in), €52,397 after 20 years (€24,000 put in) and €122,709 after 30 years (€36,000 put in).",
"data": "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"
},
{
"key": "a-fees",
"alt": "Bar chart: €100 a month for 30 years grows to about €117,955 in a fund charging 0.2% a year, and about €91,780 in one charging 1.5% a year.",
"data": "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zsfvnY/fOx++dj987H752P3zsfrROiu2CUPNK+TpumiswTxwuQUrqq19ZY1dHRzkBYsgeqDqEhCXHsi6tJ7nIqmzDzziBzW1bQ/nxCgHYxRtICo5/gRjY/fd0DmbKEyRA1jsH1lVlRaNJ5rw6C9WsUNFsGZrvFPxOKoDoROx++dj987H752P3zsfvnY/fOx++dj987H71BLWSh2SBC9nToPHeFJPNow7reszaFpWi9lNL4ZhoFb1iThHQNWdyRpk6MATx07r/ESgCre1af1WH1/+TOFQdWsI++dj987H752P3zsfvnY/fOx++dj2O8yla+5JXpm/12WO5Vj1lSIzSraGNo5f67LHcqyFypEcbyND2Ucv9dljuVYhV2e8Ebk++dj987H752P3zsfvnY9unaP3zsfvnY/fOx++dj987H75011S8YAxnOwe3KoK0IJiMiZzT98A2qitbkfXbM5D76UFx4X9K7vJAB2nMc3mw+Eem29yffOx++dj987H75id9o/fOx++dj987H752P3zsfvnTXlQsf1SWxlEkPaxiwE0HpTBL9TMvNd/GzdAJkPJBB02GnUcECsR7ut4Fp+KUeL52P3zsfvnY/fOx+9Kr8fDljuVZC5UiON5Gh7KOX+uyx3KshcqRHG8jQ9lHL/XZY7lWQuVIjjeRniIHQYcF2QE52P3zsfvnY/fOx++dj987H752P3zsfvnY/fOx++dj987H752P3zsfvnY/fOx++dj987H752P3zsfvnY/fOx++dj987H752P3zsfvnY/fOx++dj987H752P3zsfvnY/fOx++dj987H752P3zsfvnY/fOx++dj987H72bQMdN1xiFrSlwRvlyffOx++dj987H752P3zsUgefxfTdZ6PcB6eduIj0DfOx++dLl6stQ+QfqV8MIy9wBfSosKtfQQkQ8dol3JCF7CJbnDREaMu9VhjOn6wWIBVBd7um/Pc5+rgeEZWH5Zdii7+e0v9YNhVrNho+V25ojjq10Silwf4nOO9rv2RH0nyMvgxtkhwbdY+/hJQ5X95TIqj987H752P3zsfvnY/fOkyWxBWUemnqsV37707o3ajfe7O10LGLuAilnWtgaK4u5wfIBa1qQwkfkOuI7GRPVC/rrFOmc7Lt+E5j2pW9yVJdxpfoPKyG1VNrJRMPPs5tDTN/nfPWplJV/HR/+Z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"
}
],
"wide": "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",
"share": "UklGRt6zAABXRUJQVlA4INKzAABwGgOdASqwBHYCPlEmkEYjoiGhIzLZwHAKCWVu/CHZxcYDNb+L+n/l/yQ76eS/cX4r/M/sh/cf2x+fnlHxj9m+C/7n/8P9773fgrvO+274JvJv1r/M/3f/L/9v/Df/////dX/u/7j3Ff1T/b/7j3Bf1B/zH96/zH/f/yf/////1i/rn7/f71/3fUJ/O/7f/3f8P+//ykf7//gf4L9//mJ/Uv8r/wv8b/of//9Af83/uH/Q/P/5uP9t/5vd4/b32Cf5v/hv/R+7vw+f9H9tf+R8pX9K/2X/y/2P+/////0+xT+e/3v/zfn//6voA/9vqAf971APSv68f3X8iv2k+VHzT98/yX+J/ar/D/+X15/O/vn93+Yf73/Et/xeGftT/2eiP84/GP6T/Kftp/j/24++X+P/1fzY/yfsD+y/5H/g9Rr8u/qP+f/v37Yf3v9xfvTiNeOO73qKe9n2n/Zf4T/L/9v/LfHl+1/sP8x6/fvP7j+4J/Nf6j/o/75+7/+B//////CP/b5F/q//g+5n7BP5X/YP+R/jP9j+3n1Jf7X/i/0v+1/ar3zfsX+u/8P+c/2H7dfYX/M/7B/y/8F/pP/h/qf/////vl//Xuo/df//+6B+0n/6HBI835CfU+Cscg/yE+p8FY5B/kJ821GsNTDsqKxyD/IT6nwVjkH+Qn1PgrHIP8hPqfBWOQf5CfU+CqMcvg/yE+p8FY5B/kJ9T4KxyD/IT6nwVjkH+Qn1PgrHIP8hPqe9OaBI835CfU+Cscg/yE+p8FY5B/kJ9T4KxyD/IT6nwVjkH+Qn1IA6orHIP8hPqfBWOQf5CfU+CsOxRBPVHV27mWBG/wH3wC20+Z06zLNjcT/TLNt1YsVzcdd8/sqxPFvnKGkj63yB9FkLaKmhqMjK1NwfLUDAQi6BZ8qQmN5u6elGm0urgCz8IgWy7nf84U4jPWxgOOoIbtQJTLVsgjm5wKQ2djLKFwgzMEa/EjBzTBBWLZ0bo80TVJ0UP6HFY4y7URIcwDl6mufcC4zV9c8ivxhC94OdddUgugq6oatCieoipcvg/yE+p4HhsEjzfkJ9T4KxyD/IT6nwVjkIgc5ljEFUA+Gu3Wexnq6cKtTDsqKxvk+NYamHZUVjkH+Qn1PgrHIP8hPqfBWOQf5CfU+Cscg/yE+p8FUY5fB/kJ9TxIQ41JIh4HsLOyorHIP8hPqfBWOQf5CfU+Cscg/yE+p8FY5BpsStTDsqKme3aanoeXtYcVbCLXzZFH/LjHq5yhDgHQIQLZTPZq6qBQHufoJ2MvwrVj8J9T4KxyD/IT6nwVjkH+Qn1PgrHIP8hPqfBFHKvwf5CH3JHN7EZNhzjiH+gDH+s1jBQaoTvM4iq4Djbamg3nWIDFXwcoeSo5sXFk1NenMFfni0N/Ibb3GbifzLktUKYdlRWOQf5CfU+Cscg/yE+p8FY5B/kJ9T3pzQJHm/HNeCJY7uDM6kjkeQzSIuKijs29WkiwNX/EjQF/zSqNbLHyTHNyXX7Hjehts613EBZyJgjvImFEI2NIjAuE8JbUCvy/ng7Z9T4KxyD/IT6nwVjkH+Qn1PgrHIP8hPqe9OaBI833NnOYL2CLWvMD4rOH2g5v3tPhthUvOKeVqC4g1tay9+GSaEasVf8IvCbsBLLlQJi2YoBIYm++DuOKP9Dd17UbD9xPj9nhqYdlRWOQf5CfU+Cscg/yE+p8FY5B/kJ83KQ7YJHYH5gWHbOT85grSiq1Dl1r8pD0qixQE6ubTfDAjvbC+AF0lvmM3QdjAvLQGYXCn2wxcSMKj3atTwp3U+UwaZwl2yQVjkH+Qn1PgrHIP8hPqfBWOQf5CfU+Csb5PjWGphhcwFJNhtjfrisxI2IQ2IjwhDu7QsQRtMgE4P6qkIAqSx9QlPrk0hVBufjV4/eFrKbR9jmvx2RVreRkdyD0znEmlvGa0yCCxyD/IT6nwVjkH+Qn1PgrHIP8hPqfBWOQabErUw7HqUVlxaPZHL7Lcjnni4Ky/ijMZbx6w5cpp5FQdR9FVeY+6n+k3uRP/9vRo19vlokv+NsMG9u2nuiMWv0jySiHcYe4YJtqXJUG05vyE+p7wUV1wZRx11q9pzfcv2VaMxD4YhE2vcyh+sE7p08l/QukjzfkJ9T3pzQJHm7WKoVpigjVhTLfLd2Di9dLk+1KuWNgQOlUNF0kQnhM4NlOSDrz/VgXWNBYoY9TeAwHAuxQ9rS4vaupxL8h6/t2Gdjife5TnCChV0XqbEMB/yE+p8FYmHmzfhT7nVh4f1SRmtZ1crfz+ESy67ABbWkjJihL0YzhxXqhJM69RRFWhiq0qYgYJ/TQ56bhhtI6M7+CblfHkDRazxhRXHATknpDO+hnURL22At1GNbcFL7LH8XWwCgyp9DWRMNTDsqKxMbTm/IPVNRK/0A4l2BdX13NKaO3E1KjFIfIrlHmKXUhIvDUvQhAG5VKMqDHA+ghptB3GYzCmpuO7QJK3WKdtN2eIN612YftYt5t1GR9N6kw/Dtz6rD0hqF1drssKWreGdsCEHM2QE+p8FY5B+IRbOZP5Z+RdozRufcmUpeOJnRKkV+l7gU/2549pkyPm6zssbpxwI4aXH2yyINoikRG+Yk9QhigmzkPFxz/B1ori5HV7C86c4wJycHWiv5RFg707h4FwE55o6bi3AruV4CbSZbe8awNTkKZKaO6Rxrq8Ks6eb8hPqe9OaBI83frcqITCTPX9YESHftKwa758DtUJNImy6uI+9t2QkHqZBxprGazwJ+n89GzywAzMCmgf/8YX9Zz/PxzL2r237/pa6JKzVEErWwDJ52CNylMwo7XvvLdTDBnd7mhZHEuGARLRt+Qn1Pd8GLCp40dzQ1b5Ar/gKgVJibZBeE32FYQifYoyAlGp8ZZlhcZnbUGAzbReF2emPi1nKaEcinaq4GNe275vyE+p8EUcq/B/dbEfkp56co8lijBOHgpxSmGA3BmWeN2Fk5NWP/I2Q75Ej6IhL/G/PBbFISJ2TPG81rq61ysK6C0OPPnTeXkQR/VNVqBIpkE/zCSP/os/EHJqT1bDL7WJVKgzfXT4KxyD7othNtZHUbObSdAIGOKLwCwtF4+LITsHrkBKibt5gP2DWQEAh1MaWABwmyHGzZpKyoNqaYf1QYD0r1t7LhtS8vOGCsbv18aREE+eO76hUeptTTCpql9wQKSYQf1UAt3kzoFw0/zRVm4Du0ZrCOca5zvanuv9R0hBttHpWF6w4M/lX9Pcsky4rEVeYjmY7BB1kQMFY5B/c4KM3aQM3srvY8Qu9QEOynexBxQe6N5wXGXTJVg4Rzq7Mhq7RNqMLXaPYY46NTJNjK6pYoD0LWM/WRLHSwS2yrfyxt1vCxJbqJT4vP21T0yiqd6zwnfwTtCKwv3d1qL6HGXPQTRAVABjtgKAhCsCbkYKyomiXQxP0pIyyBtcNb0lAuITTpMDT28fcDL6PWzwK0REoiayiehl9fTHnEV0pQ3l/U9c/05u9vk0FpwOp6GMpEPD8yc0mxQZYZsW/fVAwCH/OqvvOhHwalzsS49/8Ujzfjrp5rukrfZGRBFNWCALOyLcmWq5k2O+2p/bnjiBWGWHv/G0ZvkN7TnZJDKLj6eEKwhlk0qM0wqp9G9yMAPbFqUTmWKRvIlXtHgSHR8V3rlRph2VFY5B93VLsjmQ/8Chav0cgJ++c8ZSJMaI7Mt+Hu4adqHLoJuiYt9rAETlkNB7L5s1tsEQka/J9ATNp0Q9nDpoZgKreMLkCcbh8C97XpJB0Ss5At4Ljknce1VxOUOPE0RQIHrDRJGQ9q5qPKTmcUqUWlpgd3iZm8y4PE2ZUapFGEpLnfInxLo0+GtClvl9rZtUXqeKqrWKsIq5rQPmGY9ZVYHT3rpDC/PkS5GLvEIH0+2eVO6S1U8ckQbVIQMFTLJ356UZ4c5Z0b/COjW208yzXihfBQ9e5SqmxeIwp9n52kFrC9iMKZlzdttX7+wGy7QwYn0AY4Osuq1IxU4eBoBMelUchWb8RBXLqXsMZOg8yb0kz6tTDsqKxyXjPnH6Rag6DgJVq7BIbFUYxyQ0yNKYqW5mF8GbyBzMQmk2eFqkIGCsQx6D/7kxtrRHzDAm2AODE/JjdbOW/YdIZKnE8yTs0CimKrHax3ptZDGyYPFuwK42wfHbTjOGTNrzaXvj6xkSsUp30Uk2mCfU+Cscg+4lTDfyD1B5TvRhnZhiUn0np7+xNrnOIzDW73ROZmlZIOehLJKbHuWYFJ1Llx3c7oiCH8x6InqB1C/+HyE+p8FY5B/kJ9SAOqKxyEC3W/W7ZoKXzQNkfCJ3k07toT++Ir1pdiYETQRH6SRpLtnS5YlLRWTzEEDh0f2XTrDrwD+H8Si3AUsj/IT6nwViYcLGqA+NsNYIKakN0DBQHybW72pF1OgGnzUzP2GkOhgrbM5fXDm7uSIuauOwu04siVxB1DaYQtAZIQoM9zoqymJHMOyorHIP8hPqfBWJjac35CfKh+9Asb+oBMwuyf9xaQMShiUjiDLLRDmCKbg1lrLEWuTCIjYMryyxxY9wH7Cv4/WtY1WhGKfzWv42L7yL5BmGph2VFY47H4PX5QD6i+fgKEgMHVNHOcXufZmQHmWZy7D911IHZZhDYNZr8YByx+A5izOle2bvSHTdpOECa6aYCdT4KxyD/IT6nwViY2nN+QnOUqO29lS143reyVK4qP+vQOTYUoTWWTDjWI/U1z84Z9WdK8M0vnLhwCp76mUf1XOCV7sdlhuhdXeJSZvmAS6GNeqri+DlH72YFgenwVjkH+QzQGwr5lJvfVqYdlRWOQf5CfU+CKOVfg+3qh5GWFa2tZ5b9QeO0z8opRuEdSPoi0nlTyp5MJDXM0BFWpeCc3YAaBzPNaYgNYXOZRty5UbKfbpG1WBwsVEIpt3fd/byyUtJGiLZKZIwIUSIdU1ZAIw+VJQwVjkH+Qn1PgrHIP8hPqfBWOQf5CfU+CKOVfdiKbwf72+wL/xWCmiZ8idyzGVtgXydKpzTTJiGLjKzXey9OdubmPnwxnwcY19AS4z1DXm6JVHZWA09nM2F8ljLEDFzK4bdlKqsnks55rHF+OFNBkByQUQkRd5Ro9iAgZqYdlRWOQf5CfU+Cscg/yE+p8FY5B/jxNS6cYP//yCLs1f3wge9f887+FZqLbQl5+DAMv0tqbD9y4icui0UWZbeXChm50Mu9HA2DLK9dUq6ENajbOQcfiZWHsgZMFqBTt/OoKWnuyy6w7CxA8A9C/AbYMQ+3Ugd5jK6//6hQKylJbPWquXtR9TAObX+DPBWOQf5CfU+Cscg/yE+p8FY5B/kJ83JrnKmm//9lM2v52yJ0N73J7Rr08xPNscjQ5h5UH+w7n5AwXWJN/N8oT73xutZuWtD5fgL15PcrRk8YNgQU4+ht73Goua1o+ezW0ftszJoAaDUXCXAZiiZFIiqTg9W5ba+K9XshswzCYNKct6ehgWg+X5OBYswUiSxxkLpwyohEZkIhSVzqfKWPqfBWOQf5CfU+Cscg/yE+p8FY5BizgCMchIaf+Un85t4LYJqdtrg/zZ7VZyStcCefOpeQbz8TvxczFf2DGpUB7ABNlz8uzPDAXes9WWWr90y3CF+5ydOvqCquUpIF5s+IMVChTHlL2UwxZy0cH31Gcc2uVKhtblq21YIB2rmeCo+sd+ymhYMVqXtaS/O2xKhMZcyXerwKfvRpEgkb9LXK+X0vFE1GWJ2gr9Gyg0/MKL9KN/1KVW3Dw1hqYdlRWOQf5CfU+Cscg/yE+p8EJGF6ikG0aPls43RBilWtb04XKKhkWLN4ZFLO3WZuyCo8x0esTZX3E86RQLQwNReCZ21ROGdFkjj6d+OTd8S7WC3ZWCjmLLo8IgwgUsn9bFIaWSYIIUbH70XxbSvAKT0j+KbA0zQZKJFz9q7K1Zsj2HJtQvKZFaJZbql4NJwI0uTy/XaO4aVX8/L+tOyMxsEQVqd3LuAfx7t5bO5H/L5V1jNB2wSPN+Qn1PgrHIP8hPqfBWOQf3Q4GVQ7z8jHRiYYsp8CKLiytEORuZE/OZUJFKYAS6baAVMeFInFOSwNK7Kxog2mPJhzl7OIrnFnlDIa0uvbaOpDBpX5OFDghV22thE+eurwvmijg5P03FW/nVfoy1k/US4O0CdaeSvjgSLQWrq9KvDOn0iI9ghFMrtg36BVSQfKqruG4WvWN5nIsHqros7WZllmNUJ0CghvmBiJy4xV/F1OW8UozW449BDklBtf8IGCscg/yE+p8FY5B/kJ9T4KxyDLvmEq5+pyTc58R11sFSnGLqQvPWcULUSCJfY85HsHfaRKxPG6yOwUFT+l66epB5YW8vACCl1DNqq7qI/PFHrU0/fi1FgwkkAVcpeaRWoP+hhY2ondigV5OM7aq2qjUj9u/PQglDC9yzNG0rnEtTxoP3H/Gkt2MJXPI4440y/n5yrBGG+GH9CCAeae8NNRGgimxsV8DgbfBXrjSDLxyD/IT6nwVjkH+Qn1PgrHIP8hPmGE881/S+JdoB7fNWGBhf7OD0P9f/athX3ej92sdZEMHxhIUXrlqsqmiWdR0ffcoY/RzIwd4zFs0mmLPSS81dIQ1Ve+FULL5b9OD+qYCRowO/XIuYFwT3VadHsohFHx5hNgOjC2/aEK3pcaUsOu9d+giRyHqWcNvTtKdT441t7xC3iEI6GJt4Ky051bUuRLrG/WFIzjZtZSZ59qgmjoaPowPkiYs48JOW1kcp7wUVBxUOVgOZ2fbI6XmeWEawG33neeEnPdSBNcGRdlIagJGtAmG3v+Hfcme1Z1VCf+fSILAo/CBFzoiQ6NJ9IqEndqNWC0cdUXEcYYKxyD/IQC966SODYk2FeELH4+oooJxEuRGDJQoVB2ZU4MQ7KpkNIjOb3DAtOCCBxFLm7mPfiTllqbMlES1JDDxVWnsPOsHO96ZZv7dh1/c7HX8PzkIPgNTucnrHCX3KdidqJI/Z/6kaJZA/j+qo+tW/YlyXRhq/C/dI/PO4IG2BzPRqGIi7g+UH0S+KuW8L/aJ/I6T1zg9+SgGAR7uA5o2Ly9fvDUYW2MgOAHV7/6eRecGYcCF45jvmqoEslmAKI+wL5YaKEGrvzGLwCRgo1QCnjQJcuFfbxdjMAhoxa9zqw1ZSAtWO3a5DnzzJqtaqKwIWL38Z0+/4xaJAYuppmIYKq2ZW67EFpKHbk9bNEpakHLIURuvaDQFsliCmXkxORppgQSxXBdvttlbI9X2PIA6Q7R6OAArRZ8cfTzlzfg/yE+p8EB+Xsg20rj6Jomuxd/CUGg9qAwm+GhTYWJjuZDyebrklkOqb6pVguIkHMubmaSJQVuciER93gs/FINKzQRVrQA5R4vbLVkdgHohVhR2q7JaT36q6zObAv0laJI5OGWxHoQ+j3DYiLrBP57Dq5Pk+a0XXCviWEGJW6UC/Ou02VyV/VtFKV6PUmisUqIEWJunR0WlfSjGRgMzw7KnrDX1OHoRa4W7eti2dwPSxZuT17E74TBFoA837rPEQMiVuEJRKisdnQLKiscg/yEC3sE49GL7vRmBUeT4e9MFyXX8EdFj5QyHSQCyHINgA0pQb4I3b0gyBug0kbOb+WrJRHWbTG9nCH/NYI/0PMB5gj9dipIhXsfs4jFq3dInmuYUd42opfFmwNEA89QbbcCC97z/FUFeYWBkJnZeb4U+rZLR0tcDnU9d33WNHk1/ZnloLGJ4mrepJZ6d0CzmYb2RntAVbYmS7JKjKlcONV4gNYPWp5HEN7nE4nLamHZUVjkH+Qn1PgrHIP8hPqfBUxP4VTD9u5TQgjBlpF+iAFanc+1Rcgabukgf3mhdvmgt/5nY2ctMJ3wE2Gfrj6RdHTHQDeR9PH8AtYN9Czne+uqeslazXdj/53dSCxcgU2CaJNExLeUES3TxK+i+8BunUeI/EJc8XMl3GWPc+a+rBdYF+JbvI/pZyuVS6BfZP8zm6sPvhxh81+NOyNFcIgd9o6h4kV0NyEBo+oV4+xUikLUlLss3HcjKW3yOQf5CfU+Cscg/yE+p8FY5B/kIFalju+LVDrtL+mFk2afh3yiqLuhAfZBF4xEBQQhZcNg8ZMBakp/4qiITynu3d1h2grAbBbC6Nu8OojskmVugg8EEyl6M5KG0PB+WzKnxXqzHlQQzMO+Y51hi3Mk2Uwjfezsq+ZSz3uf/3DWflyWYuHuU81xyuHhxk4EXeCJwS5QLbcm/lf9Gs1c+DmEknHLZs2UCDVh6CnUsqZhIveWCy7FFKJ6fKSnS+VWOQf5CfU+Cscg/yE+p8FY5B/kJ3l6sS37+HOdeV0omrpQO1ocsUMt1SXNyBR424FBNds274xr+TnN/cJGPvoAfpn663bc5nk4B5qEWspQN8yxQgHt/7vIIvmzsDIV+zOG5q1lAa5Wm2sGBsRwEmdGXAP6IOB5RT8rpEAJVq1JWI2Fur0esCYtOC1Wm1Y7BdZDxneVHEeXfI4YgWpZsS0AAP7+LMAAANbzwf//xt03TNL50PcYm0IAAAAAAAAAAAAAAAAAAAAAAAALCw1fTKivMshuUwMBbuN7OoD1vH/iavEK1uzXfo9bptm8Q17J2z7jDxBX0TITMzBpCb2QEBKBFf+SA7daaopKhdYnulqBo41zWJD3vCxfcDJfegEoje2Y4t0qnqwpaaUyUI7c7YK+9DRzDSzZIzkW22dZTKUkfiXyxW8XF0JKTNqkqMUwmFwo3Vng5uABP5tOyKCsvE5BlQoWkJLyhze3Ji7qgXrnRQ2/IV4g89v9D7PzJiToPP87HD/PzF+vMoH+cYawQqy3eBvGClV/v3l1W+6CetE4uZMLuHU7xinV58j6PMz+M0MN98xqUugxM+AfrCFkbjU6cmLsRt9oMbx7X8epRz3T5VRCVCD4mu6Xv44bgt0yOG8kG7QUReWvOftkaDBWn+pL1FDogISqaFaO7ybPAQp0Ge/6VRFLfaO5DQq4L7hlP2Z1Tv3cEbL2IZu82pbX5gIZXHt9tPp19wZbk5McEgE8oU/142e0DxOupiKWeKtnx7FdzO4RdHwj3YNweKvFLmAW612X91kq96UXgoHlB8/YPG4NaQ29fZZlsH0Qw5dOv3WUDNwlrUuP3PotRFBziv/FcNAPKZSsH3XWKcmwMdvFulPNhZkx5Y6sU3B+A/92uB5jV1Kt+dNJ8lB2MN8Bd33c8HMLwVNScXAkpciZW3J299f65lRVIrnKVHp1D3j570ePaZiBNEg96DdxgH/rFg/cZPGcmY8hezkl+JAumch/UjIUufe4930Tt336j9kwLvQN3BVR2kifp09pBVG4lFkbeI4aJRcLMGIdCAUFm+AsrX6b/SlM2XiBhWpPmyO8Ar0VeHww11apRzCZV/lbmLjNCsA6G6fxYLpKFpumOr7CJ+Joq50YGDv1Ob2gTsigc/NKueSXdn/ANdo2fFFGzAzyCgW4Xn9bSz0uhOjdAU8mKKHdcaLRjBLiqQvJs4fpnLdZWuYfouC+PKqdLhQj6VBN/SSNF+GiUtu7eZgwsFRsm8AcupAVVO/FX0xrfvYNUXpfcpmrXI878RzukI5QtNr+X0u4WkxSSM9LAuTxBHpaV6qc47LeQLp8+raZxX8YtPWQTx5bmWUiwgMdgpnEtG9ifd1Sg7BvjugBvnI61tfh6Jv9RGYeLFyO/OkcANc3r6CY91IJmxn6NHM1AGL5faJKK2uU//3io6JrITKwHo7+CIPM+kpayz3BjKMm2+zLhdwdDP4fh/lB07nyp1kxRK7F/sx9JW3qdywHfWvptxsoslW5njfp7c7usNZSzazNxcoloWgKhNkiOU97ckHqEY4WxevxNNB1EdvK2Rh2BqRfiGMAnP8zXqigNlRfiXOfwmZxwqcfHAX/KW16f2qMU6sBoLevc7tZodjLHc4fqLtBKEqzyjRtQ0XvEchqOEOuOsdnQRvMWf6+6YbncxlUuuCBBlAIuZK8qPY6+9bvWu3a8R6sKC+itHHlGpWaZiBMyfiu4Z510Xrxx8J5uDWPgSGL+l6rkCMeU65QnvsQ4VufNhtSWQs148EiWj962gArWHoZAXc4Xd3D+PWgwb2knt4YX1DiP8KjF/oJGFVROPzBOJepob6NoOLlwI1VGK3qycOb1LiX8TJ8sgJz79IrBhbPtqZgc3vBA2SVdc4mGAnEiyEzewc+jB0wzfoeiJ9IcTbFYxHN78gZGFTUJFuRKZpV+PvmF69uFwlsLlQePRSp4bvDpXs4M2XG1RAAkJAbusulSfx0dOzOGlDZe6jR6/R/Z0fN5hs30m/XHxNXTGUl975WCFESIM2NXQJJ2y1VSvkQXLFbfkISuXsKN1MxMMLCMim8gYYqLTL3Af7tpMBVr0+19dSRmgIRUVr0JgiaUu7LY2gUXOCHkJpAbIVcV8IAf3nt6JnL/p05zZf9mFyX7Za/oyry20FDQQ56K0naE0a1FJkIdhPFC9Kx6+/2wFOYkiEXTSclJ0mVrCbkzfbmHryqTlUZOCiz2JaiUoQP/JVXOqpOjqMDm12ro5nObPA5jgrqCSF0jVw0fYJ1npg/zsZ8f3FJnhQibYRuPFD5jpTH73vCdHOOwAaBdrWSxRfL+Gtu9NQ17+vYEzdEMDe3bjFNyTAm7nPyC8K29YiaRFc6e7CS/1puMApvBSRpiWC6T/GzpfTwFjfNo52QRetrqspzFwyCRkVkvWiL8kgo4W+1CjP49dqVHU5ODYvbwX2clO3XdX7PzuCqeybEoPr5OBpp+Uof7JqUJMMKz3pvJd2Rlk7rcfZG3KAEwxZ0/3YQbqtSrwpYBBUfo4NXAH8Qqd5kcbvNBGbM36dGzyDoDVcDtAdVt2v6Tb2IY70XPCn15/dV7MFwT2SjnMaY2MYXKLXnmY3Pb/CdnQX+AhxZ4UBu6y6VKCJ0pl7O9Fw07c/o/s6Pm8w2aJhCzWswEwUCOs8FPoHMla/F9CNRxk9NM24iPzdMwa/MRP1x36xKmveWdhL6UWzo+DQdGgF3mQwKh/BfcNkw9uCJAqUzOiSw36RLPeS/n9KIBzpaUsQuvNTv97xFpB6yPH53/g+HZhJXttpYosdWEpNH4wXxiOVJyZmSOVyR1kB2UL+mk0Dl+kvrqeJDix6iM/1ZoQpq4AzdI549jxXe6uwEdPGRn7nBPENPQWVkYyKNCEKD0RcDOm1KIxQWELN0fAFb6V9sIxZb/w3i/UH+aJDlVNorDld1lcHvD41o60Gf9liWEC5XGzX/9vj/9zdnF3piueB3ouY5qMTtsdpCAaY0RLW70yxYtCzD5WtA6xXw2avIeO1w2YhD7Z//jHR101qHUJkP1uM8KMkokNWCIenbnJDswb91m3nRQD6Y6ibhMqLLmk4rKmr2s7m6cGKMl3c0QtvYnQfsMO0xkDJUwE+KlOX6nV6WNbnB4zFZDANOc4v5zgmdcWEJPBATKNucXRL8YmIfqTm2WRXtgDyUmHURG7U5ATiVA0M9iZsjSlNl6CnfDdY2ctvGgr0XuJ/KlN7imoLc3XOK4xhLpsY53zZYCPqjheFNmyotmGZ2pGxHLEBCdTl5By2hryoiSnM5U4bHM9mAytGmSaskcfhpiP2f08+yE4HS+BQ717owUuYf7gbTIW7DIT5tltkG6lH/XeG8hzuuoI3sxNnlPR2XRr/OTN/pX19WlNyV0YzHP0i+EpxtQGufm1n++QdJUjvbIswsy42zmf1m3mXXS8N1xmuWyXmW+tgIOE50G96rAl/9yi3xIK8wjxxx3CYVmCCxSqNCVqw+xI/yFDhqEfXTyte4C/MqlfKNsCUWWpZbicsp4yKKIfMCayigcKyUxGC/0WfZDvABcffoiYuqhWvTdm2I4j60hb6xeWG/UU9MJSKQb39z32JXIKXiRj2LNxt5g5QpaOl21dCU7ia7KWZWTHPQAGtV6guWTy7k6AROhgDwRySInnrcntHS9U3CN//J6HboofC7tzXXDtPMlJ/8glPcsI84v+pBu/RCTj2ihpHiJmdhvDg+R0vscKeQiMGnHJBzB6Dw8V+NQXNLt35CfbZamTLPjyswUwwIr3Pb527vdrUx3th6ZKkpvjgfSlVLQM+fVlMipYRevfvnC2mpimtRx8NnKaV+AgQb95GeROkO2wXAqWbnvVnb01FwAqMDrFo/6yq+q2rtJ7USEvP4r627OGy86ywKbwVNmGytC4rf+9OA5djhlDiOzsqOmaDghQPUwaErCbGW6SscWvQ/AOIvYI7P24xrkil1f6Pge+81pRYyRpo6+yy5GSujQTJyd0VFoBJ0qfG8weOs1FKz0GkE1vUu/JJvUQuvjaDk/icUtQVCHl/TpyRQ2f3xE7bat6HB/ZeuyUbcSRL1TMvN4lVbUpvVE+4XYGCxUrb4WNWGaEbD8rtwN/fwROg3dI8UVZJVsXvNALG5NfpD/NdjRfYCDZs/fMNFekxNnGtvI4Rv0sPWyaiMh1NJ7AmfMAFDIUZjuQNVOlP/Gd4KzbWhIsHGwRaQwKP8kkERqrLJOgpLSnTFaLmSSKMMAtG9je+3o4LE2Ml6sdk3GQj5jyeo8nB6UNfMfck4eJxGmgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE30dk0dAkM/mkGTMHQlHgoHFa9yGLa1WKAndm1Qr6maQluoOgCsPp5WwzoaM4+dVXnSbcRxioQAAAAAACQOSPgB7aRPw9kHu5822ncO7s8SJUBNJ4H671A0G0YWCeaKn9F9HyYJfZjUQ/eXJMp3Ay2TinJvvHQBeXFLyMIXjR4w0RO8B5wixVF9hCOXH+ch8QUFRAHn7ZxYNZFkjvvUcJFnIXb1YwQShUxpBTJ3eVZ6XnZFMVlHYAmq/TaB4OnU6ryudho0kAIK53+no8fUhJnthXjrBI+HgD+y4kUAcwI7IO7MWy40tswkyKAucEXh+0hBRWVVqJgyLIft0OFaY53/exesZpmFMsNJJtri+62UCqASQbnjAQZvcAihrqumo7Z4MFRBECUkogkG8FOk3/PHbvy6msGw72Oi7R03Zps0/a6Nz6NGoLAU8sKAIVtj/tuZHMnkADtC3oeiWjV4DYTZIpsa0+wPzfDGfzoL4j7/DbsdVA0d6aPmMgXSyP8xci7MHEd/w5WV25BnDtVbhkHXuqwUbspaesqBZflMEWpsgw5n0j6fTEsg4JTf/0OVrs/NedGUrgWkUUXt7XWUosMAAAAAAcaY6bjO44ifIwF7F7NX823jXLIAj/yBaeGkJ3E6kp1c8To32gI2UH8mRgwQzrefpfhGmi/sMVxYCkATU8olsVuQsn0MNs7fNdtzlcBQjXeirq2QaM6f9HsTWV0gXbsgJeJ1kR21o8XFY2AGIz2fSMazrPkK2Au+7hZd3GO2q8MdNlHeekvcPxdvXDv/5Wz2jhlbPiN1EdON+m2Cjly6z2WeSMrpCfAZSJB8WWpjeaaVqdYJ1fBvXYNdLiV8gZx6h1T86EBYYEacG/opuDEBtnSjCC83Ug0jxN3VPwpXQJtTglIKfGr6hviAhyDAMbKeJ/E9sMYcyukFsCnR6uBNsP8OdF6M3ipxZhK99IjPHGm4E1eqEJZlQbdAS6P7tEhgx+k263tm649qXO+iZlQ3TKv4y8+fO0Bmoio1rzy0b3FcWG6AbWlk8l+jyNZw45fBaGNZTWZEbrl9e/gOIoJDh5HrKACfp48dBSrx0oNKzgY2ILcxGhFtBAeIBDi5jPz5Miazx7DSujrYJIHrflAIwMP9ZOBikDukpbE/OpA4XGkCB50twSKPOr8PVAkpwav7fOWRahy8+XY7WXz/UpzistZRSjfA711VaIOh5WRpSl15FdlQkz8vtjXh5wokti6qP0DiR7PpWt+wGi5RHwVDXv+H9/451Yyd9gX7V9gMaYWr/aq5apg4qFuua7MqngyWrVRVgmmnr7Kpd9m8yQTFKxA4ZmQqPHvSSxhClIvXr1Mhifg9MOZugwVDbYTsOEqq0OXZgJHHgAAAACfeGX1e3SuPOkrxxDMvGNDkdU3gAkRIyygZZnjy43gt2rw0AANbQOBMYDffQRJ8n5WnnAyj6Ua2xEk0YYczAPf43+afMlGnlJdP6g+lhN+tELI6E9JT6F6c9L+I1hCgJBemrztRhrrydZ7yBq19aZIOW16OqHFvvnD8q7rWp8bsGqBd/khkraKcfRNGk5krv4LUC9L3uWJIJ4dqnq45pIdh971mORamI3tLY5l1kE4VQyTdilPvJnLBY3e76ZYqIGEHGHxFUVRHI0Mp2+HxRFfACimlw8hyZR8HaoOTbhxLhfGE0u95N6Dg55/MSBfpNmMQKI1OLm4x56edKZPIlqIvVWfhjNOd0j12ckuDw4cRxpT40DErZJNTgW+4aEG7m0o1b9Oiiu3oD7jJDg2oRG6Y+9J6CixbVY461pfDSu9Z6Pgfg9fBMRkb/vLJFN5HiM6NFrwJnCLAyhO5v4bQLNw8QWk/HgYuZbrxWHKB44/TgG5ma9Ftqeb0z6U9kdGR7erEbl/ySoDT3gODRJlxZhoZKp1/CfFNrtGU05Ul3i2A/bNpaMGoSViPKT1oUZO8tk2WC2LfHV+Tgf1V5EVXdvmapSD78vDri9G8CemV9Cac/iRvkCnhiYXACTo2HtDx5apfifaBygg6aLXP0mruIewZQZ9KO8q8rUSp/AYJtJNiJHOUdVTynOi/gu599BMKu1cPyLGq1IBK6PW4EOb4uz0VRHAKFeBZFO/7p4Kvcsz7tZs6pLme/Q6KXtk9gSpblpUDNkzI7/msvqIOFX7CnW0LWZquxAAPkMg2DX9Ik/WWVWbV/DRCnUrzZTcJe8J7dz+Obs8imPO3vpgbpqlHgAAAAGXuiJjxxDj+Tp5C+XsYcqhzoJ7E0rs5WOMdCm572Ia8Lkg2lIsJIwJKd18fz0ePjqbAB3lf+dICcYPnPZuiBtLQwYKX1po/RVXSoBiF3h5ZfQOyqT+3z0F6WIWjKqoZGGjFUjImaQ9BSOfaMaVGkcY0nwGOOV1moj7QzRscK11Gd67Yvre2oj8ZWrs7e6oAonCKvoSx2bH5CMWtPwMuP7AxzchKVqb/fB1sHw0JjhI2zZelJGkRKlQ5HQMpDK2Bb2T7AU1K2Nv8HyTcY7i2bizHJU5laO+TXy5kECEUBJI0KL2CVkJ2+Z3EtrWTHmBQHTOHT+nBAdTMnGNBpf+HF0y38WwqlCW+ZhTjJ16owAlnG9jrK9RKpT4u9xUxuBjOJOQMqVqOal5aCg1W4EO3V7leiqMdcF0W5G1zueoQT8G2oNqvAbW+BxApWeSnZJ6eRUGyOetu1oq6oDMrtrRQwtm0CvNcHvC5ZyQjxwmQydc72hwdQ2nubandIvblr7OK7Il8OPieRXISCFSBMXUForGwYCp3ovr4c59OLAqipAoHlcaofcho5FdcjsMiHTZZTzjw/u5T+3aPa7+n/6WptgIqgSFE+4AAAAAWOhBJn48DzS58rbE5uoWAd8X1LbcedaJE2Cssa7w9Y7xHs++sRCi9SYftOERvIPGBfSraRP0cqf2BuK8KxgMMlzdfJh7eXrHyV/4B65arIHt6ehFVVo/12JiSxFb0HkYGwABVAQ7ZHirPomvErcPLIQaw+uS+zTsztqZ63sMhTTpG20i/XA2iElRhmP7U1+bQVJp3AhfGluZmtzf6urn2o5qnAkmvPB0ObnGxbdKSQUzBUjZp/qaBYZQhY/vbrqa2wurwMkvQoUm+2/Agjw4DGg5ssK46OSeSEyq9h4aVgxOQ3RwMeL+3maVckqUGfDGJGiaTgH7LtIhUsAAuh0m9WD6DhUUcynVvGD6/mfrixH/GLwtlZLu2MEaB8ri89Tlo5jSWfa8QzCxOMM64qPnfk17qjD2O7+9EbU/TdkaXIW0ZAoAAAAAXo0JAuJBq8tdC95GoFbwcxEeexBjMhXqiHnBZ8+IUip5NYK1H2l+/ZNzwpkYTiJF7JMLl9FgpElHt3g88+4hwnbIMKXaiHO832ykqtYIGSOoTUxNydIuSdNzAhhzcu5oYYtJi/W42xYpq7R3IFGto467l5IEQNmRZ1RZu96gzu86Zk/KMvAShA/alo7X7B4Fm/KLAbr+XdIvj77uuA+29igTYlXt/VP/4OO8MrgCM8R79am3nyXDzsh4VzY+CZ2aXUhZycZ7vOTGe3UiWXjbZT8ESf4yDqlmeYmkNtjiHUFSrbvSuS1BsqHifFzSLdjfBRfuMMP6Z3E9Yi+QPLLMV2NrDjd6924UUW8J6YDgM+3GXgUFdEXgIeLM7KEjBcRMP7Wg/4WTAXwsRMBeBOuDXoyont1I0ghHDHbpiFNeTWSd4PUQVKXPoe3/OOsZz04aYDLecF0mRPh0js/viWWAAAAACGHx75NcBKNb4a4P3vV46acmZvXpxRpdW4/i1tfbbJx989gJTn9/SLHbhKWCMo8Ju+iw7H5zIOQm2y9MEBkESmkrAdGGfB/ZGqNbsIKoRV86KQ4H0JmbvNFaVQqNTIHoeJ6VjKRenBThCsapp0viJtBNWtQ7fHQ5VjkR4syY89kPTPlX2oeLI9UIEs+RvZ567h/c7+xj4sxVjsJXNlNX6uHSWWjWLzIdQAFJH27o5i5yBOU+Meo+45mm4wtTo6VFzhHp/VsjghkqG/RPdLu5xBdO9yZTQ5IFkDrDL3NsCBszJS4z8N8MHkZrdJfzivi/Ij4w5AHTxukxryovkgTgHqpjzAVXWuxS1h6j1G0hwyaAnetC/5OijGZCMhjIXOzfYjn1IYxPD+ANms8kiXi8l+Y5qFrf0luA2JvREBPORJexwnVl2HVWsSFMXw+KygnGa52yOmUf8NAn2tMz6n6DTEdQN75pCrs6j7Zwbh039JrXEUaDDUGDl2yYPNrt/rpsBeetbAtwHSrDAFC/zCB1xed2iP/v9oydYwFEfOtjEnEQitPZlG5boVL03S0W7Sd6bRzVkb3IdzYDda/0B1QF49z3r5fC0y5UPK3HGfbcMVpqlRMx3Ef7uXuNY3dv0oZ83RcX3VRowe4R7CsLpYV8Xyfw4WzjdDDoWCZ0LeEF9vQ9L1LgAo/CGBBf9VzWGsM/9q3I3XoC37W+OfDHpLO5XiwpXbkU2T29s8iu4PquO//m793QylMtYIoaa7CCxFr5o5jlx37uTEz24lrU62YVAAubobfJjpGlbAIvXCWLdsjTQI+H70A0DtXqEbqdFrrBSOXuSTba/G4b6TDM7B5NC/O6HFYiuIeZ5Mm1lkBhVOh2xVIUg1LC1Z1rt6H4XV8MroVqZb4Jahssz/FSmhxXcZemrJtLJrM1TG05H1miyEAhyUUDHje5FLSmJlI6IXgCYtJlFvYgoyED9n6dtlkqIOiho1wNgDbo8iKKt4tp3Q89mwPdTlSMF+Zm8SEWRuqNwM/Wi0UsrKiIC4AF9o2F/VyBjAGyISXj224yJsctHJEnQ3TcYraevo1PgFfjpnyTujdyTjOvEGl5QzFZeLt5X06HWGb/4r5Vsr4HxNH0K1PseRhYkKBKVTvNJc5qVJwqEAaDNnj8UURHYtGhPNxuS7zW7+uDwuhIkoVMAJknF3youvIkHRDQWEa6IFWrxbeKPf4rcltC2L+BDBpwy5cb0Wcvp8bC0AFaWpWkIh9K5g4v015RPcnIzRtwi7S+4x+ncJ0gm8ZrhYn+PLV51SbeQ3KIQJOQhIrxdmXNjI9tev1h96dSn9CbnOaxQ9uiyjKoHonlheLIMjDawrTTD+HkIUm0Ee/iSmsSuxjzZZiSrOJIeKAEyzFGFkelYqKbmYR9rHv+1GV6Hm9MsP2csMIGx5RqicF3PGL52ICJUcrw3it6ksvoO4oeQD9h2hwmR/SYPVi/r6YO5Lyu2X+GUI2jtrmPa+vI3ePzbGInYibIdmkYBMv85mKVYJKYPQOmDtUA0ncwhllKbCFS+XaSf2HQfpTMIBbv4dPM27C2Gcs1a27N87jF8iLvsPEHoX00Q15pfdL/TiWe5escsBl4Npx+DsnMOr06iylFUXE3LZrGlpcEMGoeeEaPcgaAPIP0goiB4N71N+q5SHg8QTVh2w44wJ8WzyJjRbHPwmU8zjHmLTyeNaHeSXNZOLe7hN1QyM606US2HaGwP+Py3ZKDaFxQv4yUQrk5hjr8K8QU3uEDjkn3cLYf+qub7FixUSxbt3vT7MY3A20uVTf/S1LrVfxlmeRMZ7Jr0kSsNk/5iuAq8PTkSEuo+K5kc3DAxjz/n+3KNA3UwplAVjX0He1hHIHK4FNik6iXh3jHOZzkw7NHrWW/5CEmJtxxwXyaU9dDwehlVReKhK2durYWDRTwT706VmVg9fQTFRTZU/wZjMPugakmIX9lbg6iuYe84sP+RAAKI23cNi3HbAkJ5pwVBWTtVRQfCgQC8A74qyaW3EUtPt/yZy9jQg57cJtA9Ww3ShGz0At087UTDHEDx9O1jb/KLsgTM1EY0THZ6RbTZcJs53E5aGc25GofE2twRxYykbbQFk5qglw9u1Orf8AXYnP/3aoHTGLFhFQNZbzjPQGH971TguXUGwXiZGrN3xVpX6LOr3exF8SlicASeoy3wTSofW3c81Po5k5zFC+aj+GiZYgw2XKmJa+od6ylKv5AzrLFOko+4X5uLZpeFSFtAz3npvGmOmJHnKlrPGmvOMmXx9NOaZ59QmcxkJ+JqEN/toWNPwttaPAbkRFgeV/M0ux3/9VD8IPwJE3AbWIxPPcTbOHDPvNxadn7rEvv8sGCNDkX8np07r2yEkMTPGXKNBpDym8/5EGkTe2iXPIONcgyDML79bzqvnPHEPlOUAUOTGxgnzwDZNSLr7XUjIYMvM9vM9maXpnfpMmdxe5FkXt/2QjyLpLOe/D2rRrDYWJIzgKe7nvlXoPGQYzk+UWz4/C9CE7q4bVpAvIyrpVmg1ubfabwVC3NIdwbB7tdA4UviGzEuDhcpE6eRDzIjEJKzXbdat0bUwmfxTOcqkZ2gpRRwoLUJZP3avlgs1b6d34KGNQkRC37yJ7APCAtrwplo9qAxOICw2yuQndCARp98a180g9w6GQjTB765hFQd9Fm1Cy/eTGt4HrKM3zi1njjXXIVY3dTQz5dImdeHDTA+DbsRLj/kRQ9BkWMmzz4/mqDdkM2L7f7wzXlp3QoKwi8xMJ9R6Obo385j5CBXbrjYN2QRyX2lMGPrvijiLBOw6+wT9yOM1ZLAoz/maRShV7NOaKrYmAcaLMbJleljjDF4TlsNUmtxriwIZOy4xHeiTJAECikFlnNRHP6S5M+be2TTYmH74/0e/lAgOx5Iw0y7xrxXHSj0yQCcjzt7KgAIkCpdgYY2Q0mDr10YW//7/EWG9GR7oECIlFZjucwoaNOQVPxIdUPtN2zL7m1ebUnONGLwkwBY84vfOS9bm25aKksVyDyGEiWDihiTafEK1UmCp1RISpYC/sBims/Fby6GElzH/i0aMNc4+gANkfufohWMqTkOd9oijZN2u5DzeZodNllxGYmEOfIJykoo9ru5xbesCbnqhMjj0nrxWp02PR9wc9Gch3zSNHbeiV+d30uwxW9DQ5gSkWQ5Q5AdQicvWDQHOaPN8sSnHYjTjmUG41GdoXpml88A37/r6Z6+yt5XxPHF7ss4YfjccgO9Cz+IYs9JzAcP6ZbN0pqf8jZhjnsX9aRpbV1MlsE/+TqTFksGQBoEuiGt3lKR96+7843U1/X2+vMRHgQMos1Q8NeJ/9PO/G6Qe7A9HWnA/Z6xpxmcp/HbIGk5tujbH20XTR3PEz2yDWaiuXURX0k2WKfLgmnoaz0kqGFYC2BrX1hvx62vtdRabIg36H9GnHgcZRGkd3u0CRDG/wsQ7AW0fZnCQEtrn0+YMpWrCfQ/jH/vNNoYH/r4F/W8jhL98gpruLwCZypI65aKVuTPZfdpdhDxu+ZTzKDDBnvNQRJMzCA/1+XQW21GQkbzMZ7gLjDTxDtYYQjeDaw6x3V25whrrVS15MDG8mvX13fNC3q67zbEDhfH7tMdIF5BkbEkktJ1IazbxaIJ4cTFcoBKA3Hx81AtVqIZw8IsJ1pytdzmqthkeauoCnz6KmPdB/rGdoJV1GGoNwzsmtjY+DeWMVAx79Ask8V+EvuDF+UWTbbLoDZE4RBA6qaqw5IFtpISRyB5AvoxXAEhhS2C5JIliwf2DqEizDmfAag6nO2eRRgdzdmK66tPkhge+zq31WTD0f7kl2goTZAqyCtVBxChbXPCEK5sbqOGSbd97Aesls3fmdPFGmhSe2RkAQlaAD40lny5Dg6nG3ePYTgMBNTtzu9qngCPYTWhB+cHgIrYKcoscd8W9a0o6WXYXHv2A7sBALrss3izXtVDyyoADku5gtlNd1xWe+xI/Dj0YMj4jqJJpWf2wWZefQFl2nqivnKxTtL3j/70B7sne71WWe1aaTF3xh0csGYX3Om80MV4AhrfwLPXbrdJQoArkU628eeZ9BXzs3RD+uHLDOpnl5wzh9jKuaP7NkZ4SJn9hTph5XnVcesz2/dHMqT+rS+BP/H736ohBlpt3+r2m59atRdMPqFR5g7acbXqGKxElGWaa6HPKU/TxJdY2XdCgYUEKyy8u8UBbNUlIYllcFX2dBQF6UtAmICysI2Wp723MkrhnIHZjuFwfHjc/xtk4MFQoN4FXqIEGy3JPTqsWIW8Ud2Ad9Mkv8iBOSpvZWvstXBQ4p5vMaFdAxcpHExKoSowp18qMLdWzNGBZPQl2UA0XbmHCuQTNL+Ux6e+Imemo1PRi8YKkljw5Hf8XkDZtYCEvIxvFeWdOuPeOfC3lCjKpeObG4MHcb5nGedjPxm3HWSkJw0Mwa0JI1YW8XdUyVtOayeQ5xuSs6RTpe6UdQAqJ1Aqtg+DFSGMkULs0ZTmt43W6+LxxwNAfwsDLwk/YcULGDZvqSHUOPSmjftwCJ/ZZ/5RrIY7vQAfUSo8WhShmxUhN5hScTKsrOXMvK57ymPqD66q9WIRLTMQeKRTkaUm/b/v3ZAkSK8GT+uIoHjnl1R8j4R5X2CUMh0xEEYrnixSfQdFfOBDkjf2BVOMqRezXoMjBRlncYL8a63dZv/LhkR1CBVhInHNbnSsjht4VJgEjhBuXDEGQ+NqsJ06ZKBA8idMTcZlwuED65PkqLl/lCDYQxCEx1WK7tMoP/+s+6caDnhD65A8Y/xgNrDfGSYPKAJzjoKGY5oBbXqK5IAjXOkMT4hri9FBEq/ouA1eUTVrG37A07hK4HJLc5cG22xUEeWibbjeJvGicQ20q8LY/j5fYYGeLvxWDrrlbApe+kkGFn7xXGr4xo9Fs5FWFdoKd1CO/URgvLgijwMI6Ky7FNBnL5ahtYXEeezcU7JW0+eUYmVsHcbgV9ynh4vY33wH1yhRbj2sY2Zf2RgQOm6Uf/iG9kJ2QODVskwTXIeGxuK/2bpCkPE3HfX1SzzKQ7huoH/2MyK4x40uYqVDy4XWCkl6GPgiJ6uaDuWz2zKmZxzf6246RlO1+puKeHcuhU4i6sATcuKLWlArBRNUGufUeemrrH1APkfQSNlXKvopdm83IjrjkvWhD8DAzCim58YqA8B6VofnaNfF2ggT/T8k5gjfawnnF+x4eN5kh72Yuo9G3tTGiXx5kpgrPWxdcyEFRCmu9gy2U94/7qXiad8AZnaGX8OUcgj/i/MaPH+oTra2Z/Cj0Vd75YVmIIh90Y/RopKhT0WuG/XMMP0WpT0kYx3o6zxsn0oRc41SYxRSlKv9oSK44e4zr122MSb5q1HaKxksh2HmlhlG+ibDHBgMb6giiZ6soz/QXSFPHGck2qLJww8mgTlkqswWCmCfu+QuhzqNpfcwGlfBF01qSDKrtlj3PcA1WMiRqXLkGAS+WAcCeVa7spY3R6DndKPxACRaIPEjIfaE0+GgF3pnopu1+l5FIKjrJZ+MLzmNtCWjFjX+KcRbxXWwSVLEWUOWeYgtq754mdhW035oMBKV+Q6uT6rt3W4Y7ycJRysPfqE+hBU1tTc9s2lG/NJGTKTqxE9s6k0x0IvX0KAw4YgNp9KgceOmIqdSsaPLM8VLMFo4L/IK4e2QHLXJgcDVQffbUlgMJyJOWcFdJ3Xm4xq7L9ZoiOzqFXN7o2241DxY6JlzaBBJkbtaXWs29NSzJ5dP8XtKF0HhVz19Gs7XhlC0aOKZ25UYEqxaaMACPjc85rgF4anhgBlg8NvpXPHuYD9AHAf0msoMQu0/MP4XfMcKMLS04JXTowQ2mlS2snJtanrhyLGxTwf+PH0VZ0kGnPQVVLEX875dPMNhTgoHG0icRwiLy4pxJO+qvrAsxgCKLYrY8BtDAQake01INzK/cIZa961E9t5ZyRcrSuMUKFxUPWivf97gjQemU4kiUiLmTNM/9qGAGWSUhH125gp4r48YbcvF15Y0mJA1gaRNujYjqqk3idF840FSSZwPyGB+msn2dUXKyfzZ3+SJFD5wda7Hph1O77eatT32ZRGN7+b7edOoOdyEm/SdqyAKH+JI7kNPqkYlZwqDMIapXLrtK/c53+XPPNB+rtFOOcwZnOnmSkJJwpcqV5kbLgqW/6Z00y6/JI2YKZwORI85Ep02n+a8s9EOJjUtXOhp6zM8fRa1mnZreR6+iEveFWxb6rzIsz6JerHnrSLqUb7JRwGgdOGZmgBWsm8RWgLucWWA7bkpzDt1BOJgsWA9jsAUNi78eN0bvG42OcctiLEiGfb2pypETGFi1bM43sSZYHLfYXcOwqhcILhlo2M+s8pDMcuNtXgSiiiICen5M9kEW5IKUj+b06SAfgdDjUUWkb54lIVN/e2FmZ/EVb0qjJ0sYrm2oiSbzAsiCh+WDrCxMQjpVhwoLHVOGoV3nXUwhYL1YZc1a4YjVjMwzwA8JMdZr+oivRyWDK94Hq1Ka5SbutsUG11BRVxwOyCHK3aEZ2PfcTaLFSrv4vQnobImPZpTAVYmOjJA6ogrvfLOXLLyFIwP7dNJQlAMw1nlMMukk7j0vrjEmfIJYbahlcIYnPEiY42eRcSFaMvNIw3gY2P4J5ZAbqqnWHoUve1Wxep58/sGK/P4bLLd92JttYLwNTr5GApJ0KowvyzsM2W2FlLs08WpHt5VQ4Mv3+yT4ZLeDWGgFAAnerslUO9r27PrUP3yERWP7ABvFtImrHPry/f+EIJ/lytNTYWW3x20+JeCByWBtj6o4bL5fu/e9WPwUZLu16isAj35c5GB4ZnjfPQUwzINmo7RGcY0Tbwygvr2yYxoM0MmWCEjTISICJWcOvwKmFHlnDsctfAxtvzAzfDmlXpV1c32tLjlvQwJM11BQJNhQ/kf1yKgP8bS3dPR5MzkJRHwdhJDZyL4VhqZZwmKw1aEZRqC73hL9KPgtK5U++K4g3n+JvxqEIaJ6iUcxC1bUvWvMCkCCRQ2c6IL27EQbgM3AJ0sSr6kYlqfukmII7Yv5BCH5hU4xJ33bQiu0YLixabaJoNVZCwAmrOAsEgljW/WZgCxjdpJMB0T7VuKuZwCxecACLIHzwhu7d1Uw8pi036kaTOQBLkKZfRd8hSHmY2UdhvJ4fcdtWH98Lb+aWMO27huYDWsBzDhjLxP19PQ3bdlhrHeJueY3plxQkPbIniCVuXVHd2aJDFBHoea7cqiw8g8EmEN4Je2LQl1j2Brc4kjAvbEBALZtbqDN4K1/MGTOLtUleP9BV3hXl30Kb92I8a3HX2xlGEl3suesiz1+cJhIYLX4Fu/6QVMD7BbWBREgW+XVBU4/UyVgIoT7qP9LM/1lroAaTIOUK68y6kEsYcRrIIGIABY8HTymA8NSRB8o2DkkUM6PsOsKppE+8J8uaEu8u3WniqqUcX12CKwyLXmdYR79ZBW4GjuHPYvPf4NJ5ylgmn56lOymIA7R9Dh0TeFJBuQbaMYPz3rW8vRm85aF6m+03zrnG9jVj3/qUgYzety7c2d7dhum2G57rBUrjnktaieHUPBjMR2dt3ADoXQgd2c+AGOyTAiakDAvJJq6JJW3jV6FkxJa3jD2LWjpZYtpQGec1Eg+scYAPOE1O9/cjyqh/2am5Xts0cYdXS4cRuaeGRCVCvmdRV7bI6+7TajJ3ysbFWwtTMxk4UQoSaTxF5VFDFMV6L/GbCXfYaqqJ0Im6iyqycO7zfuYhr+CgI22CXubhib8NoLYlMIw4bvyHCrYiYtZXzDiyr1IEILl5BvE7p4n46eFKjCOqzDSNe98FplY94GFjOgX9ToerwYa2LKBIMJWG2eU4iaiGOnXasjt4jiWlRLqRimNmFye5GTMdym3UZULKcr9UHMzDZTM8ShLI8aIYHHNsA6FFJQ1rUwYV7qiXwvtRbmFe6r2xpUy0cPXrOcKoxtEwdWVMjn6uhuu0Vf0n1moU9k+P/2lU52JAyT6n5dRR5j9aGiKDibBurwEBi1aw272bPpyC+hq08coWW4fcqx9Wo0IYpRwfpbXF1sDpeSkf396Y4kh1ZSjSFXyXskEwJbVf/VEkaMZYmJJllB38qPt07ZxpCu2Csmaearw77kPoAKuayRCLojfEGEaHjxLBBVbyt+1XCtNOI9cW/WlFAI94qJYWsk6G4IHpYeF2qTcLlfNOOB29R0azoZv0szbqTcyKLTyEoGF4+SOJFq8GYHBYvqjpZREGgGrLie+/tvi1aBQktfODK5NQ9lD838gNE4js72L67KywuMJcD6xZV49C7r+z/hPNF4qP7vTAwz4EcX8RvCTAnI8+MRVwyLeKNt30IbrE8SewLu4gmihA+S/3Z+Ia9FUFp9N/jR5hj+AuVFmV+IyEHTPMjQkACmadb6rT3rfdQIxf15iObV03vTUe5tNtzevYuFnZ8tiN8b5kG48925fTDNV3WNa1rJYBojRG1jumOaB0wQU10RfdI37ZGrvqZDRMrOm9r+DP7yVKJW5Ynditmbd4UrLg4PaK67qJhUiVKYea3sSNNxT+xR0/25Wf1njPt9tf4idfdkXNsIxN2zVyojis3lBKenlx6T5Bnj6SUieNNpwQ4V2uo1M6fq1f06apVi2CjfTkuVR94wR/y8xk7LMo7fJZmH7sOaQ8rymRlr0mMIp8p4C01CvlHW1z+kipxY141w/XDzoE0OhRpagherPCFx0sBpGUFRBufH1tJX1M246Cxv8MRbNb/Pf0E9HoT+4YmMRXfjCo9lqocnEQP7V7DpPSfO9Xk5DPxV9uLR69K3mJkBOqQ+5w2B1/TxZZJFvEeUJJK8zL1DNdcUf1j7yw618NfdFiE8cQYPXQRGpU+jdGMre0DpEzET3GDt08uPGE3rPNrcusZc8kncN+ylUxHbAU+q81WCTgms37zHOoY7sSQv5f6rHcnyhhTR+4D/lzfLTfOOe+kbXJBJy+dj4s9X1Pb/bmtT4RjhUjEHlG0GxJ+fLx4vj/WH2AnKVSdtBE8bvkTk7KhKqRsjS8H6ynEHMLf//7NzP+at58H34oJBeU7ExJD066yWVBHD+xgGXogaaT60dWKrTnfzaxHafMmKixGfN5n8MwqOZmBvDLagBL3KsmSssNnOnHVmkIpSksrol5EUGTJW4XBLGcfJDE3PNdrQHa82X6XGgkUUCjGd2KGsV3CXZHivSI618uJOFOkazpDq793NDnVV/blPkQ2l3pdUPwsbuHvL1qCNfmqUNpkUqc2Gqk61A9h7lWe3s7AiSX0ofH4bxWYvnL5fepqoVTUXdMD1s0XqXayYlKyGwab+xZfbZlvxmfGW86PHFrNi/0p3QO0x8NlkncHPJXMkzDOTdwZahiAAVgD5aVbU9cFtU1FdsJpR8RNaUif8OSl36ffJyAEVZFRfC0Hk9kdOWAuazlpzqO/fBwd+2BxPqdhzZeZmoCuGj2m6Lrh9ZhLnndA9jJ9xpo6G/Nay/KqMmG3Un9e7goxJ7WIbPRjut4iAV8ZNDtrs/06fGIEFiNCOA7bOks93GF598/JVxSz9X3C2Ou77Dmme6okOefS6vahf22YQB+NfaKcxvYV7jZTO9gfCnU9GnRkHo40DQ4Ehyu6+GAGQJgyFwcuOEY+VLO5jkGzIH9v6Ohhozbi/IKetfUlOVEK1ajxjBwKWgKDxX+u/ZJGzVzHxMXh61bBgE5BbHvwPbdd0SFVeJpexhe9OFtHW0CDmdQk5Ou2UErG+m1gKwFWDPaIjQO1fIHn665qbpLNwwBkaTyZWY5KlZclm95ocvcQiUANPYI0essCmoCq16KO8patnM0Ts28VEi06lgVopflCpNuJlvNYwsyfkHXr56sISbPxNveda9XcBKElnUEgsAxSVeQoF11fJ+T7XHPIhoNCeHhvLFfveuCbjxQmenZqMnqEgeGaJrGjAs6j5E/Z/RBVpsYCvni/Or5HcHBf4cbM8QsRl3aBR/Ehxt2I6NHWXtmLIUSNBEbDGkEva8XN2yDcixVCjcCNPgIZjQ71ajKOYZjQ9o9x21l34EaIK0p97Xd0AlCUGEiC4CB/+e68Rb4TW7JXrtTaNzn3B1KeKhiBF8cBTjWIheCQZ6XmIWSYrzsuWyx5qL7Z05I0HXLkGmZZ5MkU8ShP4k1UHeByWvf4JdfN/2UFpikL3/R+3g0h8kc1Foyehaq7IpkMV2OVhnoOoALzswjGTmIcb19WJarWmupVO8x2n4o/yIn2xHhl8OISy1saCqC4WHXIT0lQOP/WavgDYfQsWSHE83nXEWlPTPoXwFfGvrQv2xWjS5mXslkS4liK4UFQUr8qo8KAadWmM6D+W94vMLD6Il0Iirb+0/7oWY6R/TeWoVdqs/kpNnV2TNRORb0dfcjNHtbr1VAU4ok/FYAOZcgf20X0a4TkxsOrU5h/mFLb0NmoykM8n0NYPsp0zrNYRHWpmXd95PUcIsv2aOQ8m1JtfLIIfhRUzDaa3A4oQwav2wvzi720tOu58pGCJBaOO/7KjOvm3sUBc0hUIu5Uw+jHjGn/3x41Mbh6cTikWOg4BCkOMO6wCxzYzfGHZbSiHEiHiI5LpovFWDhzWv5gywrbtzBAc8IQotTHS2RgAP8trVccK3UP5JpORQREtuxd7FzbvLdS6J9RB10155EjUuT2zOQ2v98OQShIk6tlMQfRZRMWzs93bcNNUxpT6U2dKUkyR14UsNAyoVZR2rDlKSSVNM7DG2+psX2XIwBu4LKrPqOYrFKok1BEyyuKIBt+lIGB+u8l2RIlF4q5Ds0Zz6hOo3TlSN+SX2aWhsImhPQaKHOuC0WkeShfNKRmEQk6ZRoDao9PfztkLnWv/0n8zMZu+tKEe3zTGgEl/k7GipVy3jHf/f/xHszD2/cDFUl8u22CwOyS6CO6TQAqR6QntgSf7quH3P4vVkwpPGB1GHmfX7UIZPvQkWLHkO1Jl+sRzhoILk4+I0OvYPIw1NAuD7wrzSxTtd19jsbh12P/kK7qJCyXIs2mqusV5WZkqetgSiOd9Od6i9kQhubUtL8vZL5Zr6nCguounaFW8h60s688LEAiycVoiSB/pVgmF0zXYFr58DO7YW48fxVVuf3z7liapm6k2WsNmVB2TLIUk2o7is0omuKlGJKjs0N/ai5TVAxDQF2YYkGEs6tAE3+6Mo+w2a29vngnVkjDqi3KP/IHoC6b/1i1KLP3efNkPLN6etLqfm5trO/07pPAIFqan3AShTn5yOwkuayKilp6nN0fDHD+t1Qk4IIpFpCuSLU/tu+b3AOoKVcGGGSC3di6oHflxE0dOjLs8piYkr6MnonvR1CrjZoSu3nQ+ljEHQrxzuh0b85hNuo9KKovO6Yd+2JdI++PQto3O9772EcI0N0A2pYaR/Xb0mJQc+lzRHC9+nmaiZX9tCk8AkEUUCdO534G3NuzPouPjA4Xb+e+tqRUuHhc206xulDbU2WM2raviSZZg0Qj2Oplmq7Ta1IWdyeT3/BlqNNu4/752UsqlW1SvY+zPVmCjnkUr6IN9lfE93CWe8116h1p2uCiQn9aQ7pkTS4JxWMhzB2pEuvoL/KlpHHKbPT8cgfDjtURR+5XOXG6zh4RqOAucHyZ3P1KcwT+a1Mh7x78SygAQ9ao5/y1Rvr/CvNWHE11zf8ftoNRKdeMxUl3ZjbQiLxoaXc+VKZyaEN7fXXB/6kD8CyH9IsqSahBtMMvSlh7zN7i3bcW3E2a8RMfg/eXA3MZV5hpplUuEBUQ6p/8Qa97JgOOchnJ0jhN97UHbBmqfWLEyRH1Qs6ZMiG2Uj7GHxFQcr/Z15pwLWtsQorhZ9L9Cr7ARj/wCRAOjcbEZk/wu0VlAQjFV7np0/LctmseRv9JB5XKo4Q6aApBNxx72L8tB2qEIkMPNZDnzDPg4yGPm5tevuOeoTDZMx3+Sc1l4TN3Efvl4cQQsgcWcDVI1lpVP8BZ4ThxxZRaQq9VEVwitoei5MiqKB6ftr7ao6eRwJ9ZXF6JsSJqEqKfKtvqAIIdwXumaXzY9+baswtN1SIC+467jCJSWCed2FLK/ssO+V9EhbPBVjHzYWjH2uKVtIqbftQO7CQKN5Op/CYQ87ZoS+foct6DZBg1C4WENmn2nTEv5+Ag2ocFAUl7OXZ3yM8NzjdNNV/dc1l+/aar83xNqxyl+kylfsgH2cBq8rI4Uz9ni4PtU9cbkVFEXgD8cVcTFWdeo1Utr01no3ZuPm9H4qBTbPEInnXCs9H+Bx+KNTIfo36bmabjIzTJSJ2I6D6v/iSFyuoacci/nz2Sjvvaz1T68Cr0hpFYyfP55voUHuNeCEkBQFQkW4i9UUBARVWIXmlnej366/dBjs7JWibpQJTIprDIZ/Avlv/ODakAGQ0qU/JM97b+iPYTAJjHg4t36X+WJfT9nOU2E6Y7QitTCyIXtUAIS7MIr4EAswsk9VhFtSNAxmOjOfGD0GUPHeTvkNUW9r9Uufr0Wh75zPWAoSfhAKzRtq5azFSYQilK4GeioV5tefM0LPYwZHrRgYlsvcyawnbtUcCDYfCE/ZFLZniTlC7GI9BKbVMKUbWNHYJEqoEe7Fhr/jV+K5YfT4uHyfRPqoH+9cgAtHaInZksbeFx2ohjaHcvigilzYIIuEeJ0e4s7ZEV44BosoyV9BOsTkLGJZFyyXPqVTAwp3r8L/0pDJrjZuBIm6elEk085oV9gk2kVwBSQ0THZHiVCkE1QW0qHyC59ez7GnE2chW0wEd2yF3fgHQbyMkgPnGaWAitGdAGqi7xyuvxFcSbJuod7E3Ha3UXtHe2E4EzHHJqu/LKQZvqJ3uieY8NuJn7Y3ZVY+7ZasN6MS/JQRac4TtuN7uW5LV5QIGrtxw3xBmYWD7Rew0jSdeuLhbApq/qsrUIugvCiqqsY04BCbfL6KfDfMf9sdNxIqSW5RWcuwa/QRhBLtbnSsMrZF0+JvKXuRIKd4hgIbOZLW980wSgFvWgqTmiCy9mxla9A6/cbH0aEdAj2BEMToTUvN/HOBSqgAAxdXF6uA4cGaiC3OEJOqO3BOVRP13VGIypy16vd+rshpUP2V1b0FGCKQI4+HrToHlcKI+BYl59+Si4z4bV+484kF1G5Ub8ms3VlyF6x81rBqGQj0ytJuxFxNRFuXT99z54Ym7NJVVv91Z6mKy6u89TUhO5V8p27dGZQLjGe2BdV44h/PgVAR+mGOfoOhS1gG3xXC2ifha+21ZmV5yX+4+o0DnTls8kh3DDGjWHGbT2HrIBrq5XFCiZIjuJCNiMBQIyK7iGAWI3wl4Dm4wTQflffa1ed0oPgLGh87UMsWstVNzimrTmepDaxizLktbnb45ann1Lsaq20hswKWx0N8VuoaIn/uhsN/zt1HqcDUauEKMDvigmo9EBhEoLDXxs5Jr9lIHPY+0HE9wQb+SimPTAponaU0nDp0fMhEguaPCvWVc2BPJHU+H1TYpg08ngQTq65TyR90j/ckJswW3pAfyjS/2cT4tRsa5+sQ7q16hkKAiTonZKAU4erY+AMrvt2y8xER4BvQr6tcHZKWlmkq3TGtLkZTPD/j/zgT2c6V6CcuxeBa2RocbvtZrOEzFNjLU1SofI/NB23opXbfSTsBOBUOMcw61e2h7ebnUvh1m1GA9Xt26jRss913xQxboxEX955EBDe2KA7FA25sBtpplmYhmyrHzP2q1QB1SSVnjph744hyT1zVUyGPkWxP1P0NXASl5Z1RLlb8nWM968QE/wFA8MlaTXPophMTdNl9P3Z7bmUAH9al9RnXB/RYJ0ufwj+VxgmIHcVAaZx+XXdGjsNF9CbM0c/HHq9cp5FdAXoNfywkwLI1/qFsLloVHbl8WPLbrMo+6R3n6V0IcatfgAwzMfAvSEYisSbxtoyKEhOYrvX3CBiwCJ7W9f96nuzXXSnpVWkYhmnl9t00Lhi4JurinE2DK2PHcvh/dfHCYFGF5ofbmSi8L4TiB9nej+KQSkyaL9+EIs7R4+flE4OtCtCaKOdavFt08fAgX1SB+Yvi9opXYyBGcnaT2boZkmwCT7w15TByirChirDLSFgCHbcbvHnwB1xv17422VTGSK1kOIbyLvpkneD4Jof/cdeD/w582qSMVMBrKtOsaXkwiqDX+iOkupLdAh1PePrkr47+nlZsbbaV8iGINaQBGvjEn76eDC7pCcI89KP9/SKmaLKjCYpjcwQFwzI0/xgSGTV7wjHVCnxv6QnLDVGBx9nOWbeY7Ae8QjZJp4VyIbaaAThsccuLOvP+oPsiPVrq9MSpW90bwggWAMSamRku2oRXmB0hUIPI2SmTh/G0LsmcsHntoQbxyJkDTfGefgsIcngijcCo+rkfFl1u+7DHlXTspqwWrbNrjqcjAzPEYrSKr6LeIS/6Fa6WVMG31qFNozSywqr1LXA3O2dRy+pVR2ZBKp2ZCz+zY7D/QHziGBhcSvnpxaglra0NToIJWR5/GeNPxvTwokw2kI8EgIA+Wbo4Uegye6HDMbUNbbzJvjTTHfQSm+idMtPpl4y8iq8ZaLzB6gQvOVuo9v0eCrnemZQkosqKQ81IRcbrKypGOmiyWiVR6ZBp56/g6RaA59XFgwRkQ5mxE7WanFOFwqZdLiAfoL2O/dryLu8nCND80lOaABQSx5qKXJIGhj9Nff45etfV+KcUJaWLvPQDa+H96dCoS00b9jCuxjnqBgoJm/zDD/fTugZvpIRRnLajUlKq/K7Ukcnp2KNw4NdU52jEbjAo1Mvd4ZxGMr6DMvK7WDHd8uamcayWi7n+1nJMyZPxfCPXe0aep98PMq+uq0kwBf+Kzol8dPYoo7BO22aVaZ1l2UUfANinm6soxRweCfNhFibnTvDdLW+a/PO8AdHQkG79HheURLz+oafjqQmYH+46A9lIZntrFX3KD0YVZHnIaXi+B6CjJe371m6yIdzYjPDs49f+Xaon6JInmKMhH/DBj4aOXuzG1JrWuECTjLCD7bILelu4G4QVGnScu7MW3NmW6FCFVHV8z1WOUmentdQkh0c4+hIN0sYDUQjnbc9Xjz2DCAPgjBsj+CaA1O1+8FCB1Lha2D1FcoKOFqfe8ms1XBm7xVvbb1UvrziUt7TVVi5OkVkZorgrYbluY1MQfXEOy5LjSAjcFcI5M/sn70eTY+iWkY03aEhPLht5Xe31GgRq8x7BLfji+dXNXFXQmM39EwPK2f++U9KGP9bHEho7TLhitG3c6Y4fhTb/n6ufdyrBLJMIIYRf4CNaYA5dk0fN9WsPAK6DHdIpGp4kRe2tic1dBa57BXcu/9u180IFPEQZ0NNIRy7fg4pgj4tIWTdoOLOh6mOBz3ojg+EFvARaQUbECzJhAru9kh4+q/fmeOydalxWkxwObuNiLS821JtxR0CntZfs9B5oOxq2cExOJ/DyYcA8uF/hdh00IvNO0eoKnQfXve6C0E8XMFDVMCAujOJGTzbuUPfPg/h5BkAMJajbLcCwtxs+OGDEbkCPF39U8P9nAdwGDTFy2Kp22zB6PKOkuLM9kLSmbaFDn4znuZr8LntZoOycQ2DUOiRWXyxkQ/CheL3AlJ3n/K9UPYiGG84QGzWsvpVhkoso5E/YFjsCLeoTU61u7R/13XEjDP5lqGW+jhLav9GVKknRP+Nwd0KBk2wdnk9uwJqpXdNCMaMHxA33NrH6ZnD9bcipncTIhaEyOYVeMsO6QKKZP8iNdH22S/ElIOJmQRGKYXrRGkHSrNqxo7WcKvYjCwHYJzICRMx/ZVwu6nrQ04b1kJrN3afsCh8k6Xrq6JkGdPfkLdIn4yHDI7hLBB2ELaxuzwf9JN4aUVu5kgG7CwpuqZ2eqIUjY2/sJAAAS7TthLUDCeTjkfWHPS2vebJNKCCZC/x+41HgCJdBXJ8p/nRa3UVs7KE9aYCcBNVJR0YseNHAibySfxipJppPHrKNMy55oNVZ6Tyt0560IUgoxl6pbYSTKakrwvQroNfcUDOZ/ohp4FfsS3RPZEZfWjHOPJ2jaIeuX/CB8SyQL/0CjjWCLJvQo8o8RSNUSkS2Ng8JqXf1RhGdN0qwphCTTLXEZeiRyfVbrE1wxsy8lGZalZk9/1L5W6o3WwXco8XJn8oPa0F9aFa151rUbibuEFgcezpYtPI10DMHLrG5A2L0RCC7TNyuVUEnSJHTdVH+NtbtYdN+KT+SEnJyHg5PR9L9mciuOnBvqeScgj20s7ECMjlJFt12XamZl4+k05X8ff27KfLTnjSsd+ddN8vWh6qr5DR+cDcXORddm8zNVZew8CPe0+6Qd45uBA+IfBDmqAi6bz5+FtsuTjKDmxstf4bDHhOLRizrPRpRMWA6qPa8U/qHtGt9vBiD/in0LHTGkP+R99uGDsCAXppySLv+zeA9/L5ZEHlMWBrNXUkgSq5nE35PP4RUWygXpSQZPXy/GtvdJjV/ewbkrW4KRXTRN9RmGM8QBe7r/1APDPQIYVzzwiyQbB6TOchEvM0UMllQHGRdy+ncczVwNDYRpN+6+l9StV3Wq0IgtGquQh7uBClqtV/a3NfOdxXKVO7xCDYfpOEP1KP5otZSP/cg1hLCGCE6eJe8FMWZ2jTf5M//1sD8c9G9OuomZGG8I+tAG1prWpABd3HIuIl9TdAUz4uZYi7Q56i8zldWJfKTkKAnvElEAGzYBZNqJe/KmX/hG9quXfjb/Is1VNTR6s917hJuOP0NxydLRuWYGqytvbMPo8fnCHQfylkYWxcQZKrO7Ksab+MfraDRNbb9f1Og/N9MtRnXXraCjTONWomwa71t4ogkZQCSKSjfxoOsyptRk28bco5ftP2pAafuMB05DCO7sXzHF54GCIrnGIVUVTw9m0+7AIiCWPpUrexWIjk5x/8V5n6pj3VsSE5ed8O0aClWed0dkqJqwxgx5+YPu3G1A/vxoB4AQraUNXVC8DcEdZpzQ32fR2NQ89v7ZQ9Oz2ktzNrDKtD0zKhP6k3IUkVTLPPNslm0/T4lxZoo5xCfYEIuGgPjS3kKE+qPQwALnRMneRpJ94DM84M0RPKXO7u332iz4N5rEBZOENL6wNs6T0DlBUSK4l7mR8hY0b67+xQAIjzPHicPF+olphlj+vMJ3+o5X1PThSsig2bPcm1HSsx/6l+4ycYy8Me/1B+PiU3RF26xyxfcdCU+ykW5tbv+nM6EbDWss2t4sYwnK7iIeW63qTdniZY5M8JBy3dojqGnolgWSRRnTSsbe93zeJoAHxJE5su/V40p//R0P6PnoDI7dIk9CFylFlD6l+DnG9X/Z+UfiVWRdyG4NvuiPcAl2nDehFcpcHO061UehMQAGtPBlocKrSFvvM7/UY6MxmSj1RkNqtCO1ddA3K00CtpVeB1wu/O0oTW10os7sZoLi4qjNJoF9dHOcuhNOhdSw4nOn0WUUIOM1Hf02bvl0DjZ4fdN6XYGGQTBxve6LnMnNiwWxYP1bOycbTCIbrs7tl9ZDv8rM1dh5KBMOSKBeY716yAE2984APomHeLy2d4o2BlvwzoHjUHX0B2972/EUrjPDle7+L1/yoxnUtfldvAw81oSjF5qt4iyJlHNm2VGcoSEYDkMRZPtVCyWdalum/YHHBp2bI/k1UxO6KQllgiThT25XcYESwdURrzoJegQ64BFurQ+6D4UScQ7hCVqLddm4orws5nvgvsQG9eIirqCsp6dXnykZ64ulIdP5gQfj69w9E7sgYPndHy16t5LZF8TP8LpSkP9dAAvTpDSUff11H2lM2h1QajCKRMUqyFeVK/fL0BTxUs4+4ZtFyhR+uxtDZ3iRgjh5+buDUqkxY/v/CRd13J/ICCTUhM4KASZe3TLIieRzpdSiy7yuv9BAtKogbYQwBbyjTY6vrggE/8YiY4Ebyw5+AbQbfQaQDiJcE4btFsupjMppzs02/wZwSve0vCZq9UoUlmN4XbN6gYibnQQAAAAAAAAAAoFrQbXWUsv0PtgLMkns3TKjXcGjiXYmz1oHBl7N/l2BNrHgmeQmtJACFlp0ZZWtLNVv/io+IXy7zT2pKOoGH0BSwWrw5FQeI4amJpQf5VpJn6I8XVH8r0k5m1kv3mMyzLDWfBwD+MjhymT6bZ0cBgEBqqtsF/7Hgdpj1eVvUPnxGoPQLskMUaFSwML1BbNAAAAAAAAAAAAAAABR3i3JMSESe+wWhaU1IbpcdBi7uGMIz5g+02IdTIZP/lbpB15NPmNauNtRkTCOnJcIRFTudDfXpqdb/LZJi7SCb0uPseT5jEZZYkZO1h/AhBht2htxm1NllG90D2+yf85F2Bw0pefQdCN6xeXHXTLj8wQUPoISZIYGbNAbtwo4PvJ7Kl1qvXz0rZh+uS2wzyYJZn1HQNtSOqdq/v8tzseSDmhFS6FsRUKZ7YXQ57yrK8EQrb2iEWBzEHybxzfzdes0rZkhuzC8PyUsaLKAf3kXXQ+m/g8qSyvWzJbI1laLvVgHrchBWmSy6gssdAH29Kz9mDbHI4I8VuVPLrLsiu1ZR9hEyv3os/VqS/a57YfsLOVnVV6tiu2AMevXltIIStEf+5l1pZ/yBj9oo+EWf9W0hDD/wQt+cAbp16pDAMfcXGysqDEbA5dGPOCTE6u0XyAO+H+jM6szrrvpu85lLOd1OLxnTtuMQFH5zb5R3PFIOYlVC/cifKtSJcbLGcAiquuLAfe0lX5VR54YPsUYJNNVaEHGJSDtgdcQCTzViyrqQGK5wrJeA6pRZIjCDf4ixgbHacticM/Wxm07LIvCXbf7i6G1evlidfKCb3Yldh1R8XWgnr/3SQAK9+SxVSxXMiqQcU2b19kD9bjj2c/SP8831JsC1q2vQjkdqaWf2pycaC95JGPo5QvWhha/kyJhRIzZEtIJbROTgABA6IA10RcMjEHrSmsa/AOXOB0nT+7UdbbI8erXm99r5o6UgXlkXAy7Nb47WG3fqHv7Hn/9jfdvWy3oN8FiwUvnKLK3EJ7q8BYTXGBW3WOQ108TgzwChauVLKFG1eB+Al5/WIGDwG/MvygRvf3FcUhNgQcfnkdu6NDTqzzo5/phuqqwRVSseWsU8KA18smV87YlZ6+fWTKJBRmIPdIAKunIUoaT23Aa/eplFFPpD9YmA+Gv4oDGvRUlBI1+MQu8DCpdl+a7R2p34uSftCLExLnjp/4jqz9fsRPvyUI1q/wmoK8KY2WXw8DliCP14YjmBTuuoGygT1zuhTjThm6kaZHEeGnvIR6qm8BHZLcbo48KkFRzsK8zh6e5sdByxHJoX+N06MpDRI3gBcyuo+1C8w8s0+zw/LFrIcV9qBRFbXofIXHMpl4d9T5mQtC9uAsA5ZxozyJjpJjOzCTA9BB0UscredGTAW9is3Qw4qeP91bkRt8hMAwFDcLygfUTAKIxI5Et0doncOmFS9Cj7zd5vEjVa6ltIRkwVPfT4AcEVy5J8k4CHAHCKSJoH0lHZk0DtChK3SjW8UC/dmMn2yZJ1P4y7RBaj9JnfrMYjBNNHQ1vOrejY0R62LDpj31Tkyqah4+NaDQ996voY5+OE3qb2j1SQ5p+NZoJvL9uaRUwaq3aS8XF2C7HO2sVfRaWSmcrzOd16TI5lOr0ZSAIlw1yG3h6f44C577PI3Htt+5PlhTosQtn1emCDIwim4f/G+r6S8rVaeDyJKdd88C43WEaakMTejvEArfSDf4to7iBk4bxyN/BtkuXSWPM1BmthTs5aAxb94G92aiLvDUdGhBinw5u2Ivyo9d2MESgo0d9Jni4lLOqtsRyLWNJCF+S4xuUvVGeyMP6MooOK1ZqWhmx2qAbzjzA0+p2OKeafvkQme9HiczBEupvTLB6j31PIRvXtZeiKXO0lFkqrFpDZXeAb/rWLe672sso+pH4IQuIRCePn7UVfq+4xRNbAO7mAAAAANYYB3nbs6H7ZsX+bMBAmN4JhB2fAJ1Vm0FAhNmDty81A6Ih5n3cZw+UKpE92oX6DSTNHTrV1U9ncEJiGw3HS6sUm/73xfeYglhb6Sq6BmnKsUnqZ1buRrfHqqywc227Ih3KVohxWtHa/H9MAu2+M0CDDvL8hKvWPY5n2Zs4LjlZ/7GHa1Chpwsm/4wKZOdAzqLcn9ajuShu7bL7+jSjWyJyI230GuauBHXSQtNDd+n78CcgMxsU5r9nnPDRQy0rQTkbZuFDhSC2wIqR2oJdVFlCswL6I958mwAjNkfXMCsT4vKzRdJVUMvp0kAY70XAzL6EKg5hz1jJXkkkJ+08stcQbioOCnMvtjzQrUYWe94JYI3azP8ehGwRkjh8b/c1/9IolUhk66ZV1zf8NW1f0GXFJUacl+4f1ekpIHVz48VdpxP4zxtRmsLE6Xj+yonU1Y7kvQumQQJVh95SDoJ4urjTtxzwCawNZK6ng4FjBsEPDJABES8NgWRw2tmPFzZxO1+QfBO7AdHBKIOT+VuZuJ0wg0tnfPcbGqF1qZ4XFOBDHZchuJtDwQgHFpuMJgiDTFM5airQ8aW6QbYN4SrX8e6rHF+SKbi/wppH+QwBWCuwJQCnKYpxU7gPug7W09lPwYoOvr6CC53N/oTyc8z9boTpxf2JYIL9oxJRJtvQBE2LIA7ugldWHJnDZzjXVY2E3j0Ru2EdQS8kY5AIHLc7LAWXtFD515Bde5Hwu9caeMfag/zkyR1+Ba+Bx31Ss55kemYZBYyVBpM4Iz0183EJfUC0Kyu3KvaX22jzOvCcRBAZXWBL7zL7LLqnUbe5Jco86tz91ZI4wmeb+SmwiuF3NVfvHPu5s6EOIq69jjcJRDqozCB8kFHJjCCSARD+H9sJMJuJcWBNqR8YYxMUEifVhGPxUKPg/V/kkzQ6U72bPMox4emYQBVMFkWtfxeAY56BRp207Y2U2Ae+OeEI3b+blA+/app1g3mkS4rJJETXDYIxnBZNktDsnGodjHKs+h38ludQ/22+wM8dVMP1auAYDa6Z2m86zlFBvdXGEogqCSSn/bVilk/NJXfPc3QRfFU8dwbqH0xQW008gjFHm9XGmz79OjEWCXtZoQ8Sq6gvEPFzixWJ3j8J4wcMbNyJpih0l3Bq2N8p+RSk1cZdQnbRMULZBQ6fxyqKCNDgs7OCmnYg+CBbeC+Y4CsDmf3mshz02z7jsSFEcEq9CJXtZDoRRAs+ail/yfJ/q7BfH0gNMChJPl/tw0AZhGciX9dQ0VsoXAS3BmvN0Vb+xwYrvm/7t4glJ7NEEaMf/jMiZhuyPNqJ8OuReRL7LY/gjMKZRaQ6JG8HeFF9FxYnFeSfLaSCoVi4/mfRZOv2ajqNrpxDiPQ97HIWkYsnwT0CJbn1y4R+Zb+wKtbJuLfpJby/mcMttvclty2nmYvNC8uFJPXz944c5VdvU15df7ZtHVqFvqaqIvW9sQkwJ+VJTyplK4En8MXLEPbFqlH9sZ5K0xxnU6moPyUjKSCFSnCCSE9EG7z+U0cPX/NLUKP6KhABddg8cJUez/ecXZNUcFP7SFkU5/+QxixcHkTOqPzCBn+xBZ4HGQmSVqEwCvG7xjVLH8Q5zlhsMheBnff4WzIJASi70HYy4RjqDSx59g8U+63qh9j7e/NrTJUBCHaTj1IF2UjOUwZze78zkoayRItyY/W6nrb5GDe+1gTyZ/qtYfy1ITcBopdfguWSwAADZkJdBlKsg2deDb3+2QJ9bCebpKlZwZIt618ukhASb6DGnYe4Q3+A7k3dvAj47A/ZJVy+73dpBEURQyU0vsDw/QPAN6SgWPp4ZmdzWoBPXql5mROuPVu6PFATi7pVW3x8Ozz3KxC7UDwQpVS4/mpDSlELgi3Z2Ze8N+IjNvXJX2VLmYEY9/Nj5ozBH4dr62npS5CouL+CGtU+nTSMK9GWH+Z0VkQ8s/7yqIfE1UdKkT2ZTKXOUS4prRzWKpB1XMQUfaFneNz2O2b4PgIFth03JFdC3hFsMtp8SKKfMlHBmcllQRxRpAl3adGG/DoxV/Y3cclngZruKcTgkRd9UxfvrmOusBpjXs+XtnaNAq6QwvWdUm5Voio31Y+IRfS1/eDXz2+m1OgZYgnHyZIBy+dbxnpKyKabXrTTbamxDBEV5w1JNe+kP29AzSl276+pkBZ59DbWf7ySR5uKLwEhg5aYkTBpoeFNZGl8Jq3QIzdBNHlDGXoBPyy22ov5TSeDzTh6EdP7VuEwHapa8JrF5f0n+NMMxs1k+zdhTcOLVVn+MygYwVjLAFD5/eOxsSLHzFE8WFOog5IA3ZgT9c9WDgPmfK1PwAazJ1JUP3d0h1zk8UwmBuKiYRA4GMxxSBN00/1UijaZeek/uFDKjZIH9YyWf1q00UBWTM9d9GVBOCEjw4C0pAuEDXnToEX/wfTJRZ+kwK9Px4Y7CgQtJUkQgKpy/SoznZV/hsds73IL6QC7tn40IMsNlG3FUjFgoZSIyRTIr/j8qtRBEOOuTwwyqBIx9ngeLyx0oGtLIg0FdxABkA7/EzbOd+9FpDoSc2TrkLYMJvwPfMMbNXz5dhu2aanC5/DVYvJLfSTt8gh6DiYnqoYCy/JBw3xOi41u2iGotGLBZH/T+qZ38RxBkxxEqyJAXWfjZ/679HxCvzJG1NVYDT+OmjwnVniK+uY3pcaCjXE1gT+fQxDaHcrgCvQwJHX/Xow5YbPExt676Q0H1ugqUAzsGm3wmounAJILSUQSDtFFk2FJZlkCxaOGEt5KQfm3bvbEF+0wYN0aBlK/IS4xh1oWGeEsMVQaMldHKoj62EI9JMJWimI0OSQae+HJ8VZsjQzRRfaucw4bbAQIzR527l4P0Lj+EUfDdVH+OuPVUYnoubCN7vZ3piQhxqcjfdRg4oKgNinwNGz0+3hwegi241drqI2EgOf+SiA99/Y/Y7q46JgmX1bK/+u6qBtzN+m8uuNl0idEoALi2zauwm2dOgj4QhYFc4Fk7TlCCxP3QrK2pCCMWm9IyitqKnUKvrYKYMylE+sLvY+RaAfEQjPDGEfTc9JAhgheyAzhVwPYn6Ml/rmDW+9Pz+G9PND13l40HBDwkVWuVGXDTi9JXNb44QjpOIgBhCIG6x5/Dvtg3aAAD98IR2izrSNBmT0P3SlsCkqz/3O1OOuHz4EixR7MSOb2dcjJIFmOMdDHqzI1o4N9XPYjuSlAc9BTGZfx+tZwHq6bSzU1dhUvOpGOutBIzY02GRq33YDh3EDv/HqohlBTvM257Eefu3Wg/7VN9hGfCiEzp0GFhF3mq+vqbmyu6oEPFbQkbmssEc0DV//0cf8QhtiwI5TvJOMiOEE9AGK2z3zep/2xLaLqsOut47aneKnfSMuo/i7h1S71+1dASBkKknmgvsKWqsVetVaoOlN9eA5Q87ytuJ87xZ5t3oRKPfgcYwSXIyXrOWgiwGCtbj3orWKwhcRohi/1xHijGZASxG86RR3KCl1r+EfKD1+2DGuUilxlD6i0FEtN6aIoLLE0wjXdD7IeHteasnE5zE2wHWj1zjOuOEhraFL/u76LZBgLZehLCUOdi8DMurDm0u7wGRpnIO8YAXRsZmlydDnOh+h2gutrMisujYhK1QWhNlj6MidxNTV9cNHD9GexXt5QEw78jtioWdrCk1Y5iTUODK+X/ZKXnY2EPYB9xhZ4pD1ztpTXOpdjIilOME2AQwaVj0mQib3iclj90ePrf/ytPpaqwtC0m/pfMn4uG3jbeL0mjT0GcQzESZIRHT/tMCOJaYiRcejogM5GO1oy35LGfHFYK5Xw5OO9YKRWRP76IdlFOScRHdLc5GkOX88L6MSudCLbk6MgjhOaYUz9xJU1VspcSJDIMn65wZTLnMMJ6lrpBecNspyIOjpG1YLVNUoYlyA2Fz64A1Z5GlFhuWS4n/dE7+rqXN1aTe5RHHDa/NAM62o42GgAAAAAAAAAAAAYNiC3OcSSF8yQ6uiIeEnUrqOdrRIrUzv3lheB2L+39peGPOTWxAN89ZtqRBokTzE4XYZ1AvRvHFbYg0R37ScI9z5oVxNyZMhdOMt6/ZTOIssS87gOY2g7UokQe3mGQWfZ6hWhZ8fpGLJ15e+3OFm3dmzPDNzMxecQL68nNMS4uAzQG6sNSPEps4TByhsx4eNxLujzo2VFS6bpB3qGEObUqoscDtLEdYaDjIawu+oGjV8MpozsSewQN6JfDXek15nM0algd1HnqqV1C23iOzYO6DoZVcUvCDvtU20ob/880A6sOxpU2WT2qx5pUwEzws57qyu7jBbS3CmYQLowf/F8QjzDx3gl/WijgvwKEDxKNwdt9C0Cr5wvtVwEg/8wWQcfu3ThLq6eREFf/WIOr0HIze18Q/P0esVPW+qixm3Mpsjqw4vQjdT0UWc/44imqUG5Izn4PntneLF602G36UqJIrJPkpZxj2VqAjbCZsW/gTkHBHyjW1aPznr2MFUtVs4E+sFP+XOyGKZwY5/ocRPF4zWa8r3xKlQXs3x0G42Dgcez3NHvqmYn/+4ts/iWNU4IeIapzHFXsTNIy0rweqAgIl7fxToXG4BkLVGay/mHPigtrXcHRfpn6P+dpH6Glr5rUoV/JBApHQ4lCacQcpQM7w6TJQrXL3YYyYbry862HgABcBkCFDKKLSTEqRzpmBX/Sy8udkN8dHJVyZ5jophEaLFNQdjfNG8hTefQe+jacFD1elfYuQZP2ON2SWDX30IYWssVXuIg2tZjyn9SIgHkNLlmZOr6id26k73Jz0jtLJWg6dAAAAAbBueC6W+ZSu5qrfy9s8XGR8shA7RE32eBK5EYjiMHhCXM4wTSiJnM5ofkYge0OFq2FDPCQHg1V1um1SfMx7lOFJ9Vhj1Bm1jmYyL7rxkN5CGPdORyT0KZcnGrnpQVRy3gpc4Rl58pUnbqKM8/rYD7Yq5iAbBV/+CxojZjrq7T9nByzEP6nI3b4NIVTNwiITiQmRPDV4mVtCtXYeacC6avf6U6W4Bw8MWjuStdCvAm5MUg8k50t0w6jns5qf3B0IxsetmvCMC+yOnPM3tZXfvtYpUAnjTqgGJDUMjt9R2Q3jrL0SyQF1+6pu1r1b97R8ue1Rw4NYwaRJCoohVnw4aueLe/lmJ8E3YZZ/s2fltLMNE9KxXkVlIKgbNZ/ZLTsyTnXtdyGWHikefQjqXpft5VSfWMxH0Fa15ZUWQkzYZj8JEZnb1od3jmlYeYjfxiECZXgssK9/C0GACD686mOjK0feogs4PM730IF4fDRY5d69u1pMY4J+pOq7azruBHH2E+gFiuqp5EAOc1mc2rkD/V6/BHYPm3lxBEAdeO00peEWVfFnanr3X4hog0j03YpNDT3cJA6Z0hoInWbazyXFtDlTYqzLOe2ILL6RN6L2U0OZiBb+vuDqXKDfht4uEt/IoafJE6xJvBVSwTrYM1HB2Wn4MDAQvl7avz90tLl1rSA+qirNaYnNyqdeBMfvD1GlyvnddENGqWSK6YjMUYdAmROb8Yw3WzjZoLDC3K7EsQWjQyywQuh08ETj6QL/DRH5E2GNmAAAAAIycVCaw29lIpNahpa1Y0wDlee9hIGG4UjGoAI9Hu8maznIIw6GCRfHout7RVfhRl8vKxLrQgLDSO1fpisrDFqkJ0Wokot4V8WXq6tqu8773l/7+sqE4HOpfCRI4rFlqeZEz7+9Z8/OgAwpxsMQpv/2jQKXNPLzuCzCW1MS8fGfBlxPALA5odjuJPuKjJfqnn9TzGmdPggP6zKU58kY2ogXY6WQTXUYvXDYfT/H03fCoIXmJd0TjL1em3yg+Y406U/GtiLTKiLlJOLg08ogHxj2iPwDxj7XlJ40SJ0hG1icgIN2btO5UqBJWbfENB9OtbNJABrDkJWmT0hwgIFwc+1zYNNV5a9t5X06ytdXWd5i+NYpzhM/yigVdoPI5uoEmraA+m5hslWiytvX3Gm3AAoCLJDfcndgUAO/fi76x8ZWovS7+iDnsYUn0hJeuVaIg4qoVO+VW+iG2FffbJiHcfGNYHnujvMMnxNe+0s0E8LcHrT75vnSNAFhUlLtPBF6ED/Pz9WwPJdBPf9NtyHsIxQbhHzYlgG/IparRs5tjYg4iY8Hg2hW4GdmK12FPRI18w5wh0ABEcNSBze3JY9U2rnOSkODDDZvbwBpIsihmnEkPu1QVTXRP1tJGTSdpBFS7hM+hQLXWY3USnFKHzZhpD2k1OXZhNdgx/zWIfERN73hDQBlNaH8svwTinZQG/MUrYYQJEth0k+v4/VPLaz82he+HoeLZIq7hkeHnLAhSpUKBeRMdDPU/Nlfk0H4w9Vc5Ma/jWPnVrBCDw2uu99IvgikunJ84a5Gk2Bj7fTeQsTfMVyZ/7ABl18hSxW6McrrMsSw5TjT5YJTW16xCMZeMycSrcEDMlCd7Z9YgzxjK+/mAUT3n8u+W3GgoEFbbq5KvICyzf5cEjpn7jMTFlRb/Kc6ZsMIXkbxDDE3KoK7VlckjwCdgnMFxyrmkxo6fcGvE4srPDwtLNGCwd93kuG9EXNKDF6uYRPAAAAAWkShnvkEM0jWY006B4kdNnTs9sMuMt5xTQVGnwxPkrIebT2JJg74Nwz79MmC5eaxmLKnalUvNF+yXjECISbMo5b2c3QMhHOA5rOnITKnrCs3Y9WRE223CkQCOdVPDHF6kVHNEeGaJHnGEW+og5BX/xDz5nriFRuubHSftGyI88uz+F4YHpZnUR9V3UWKsWvzzTCknOqGxQWs/f3wlCul8vegDTOUBFyxv1lMMcHe9LAIALig+LBBVQLl6getzOg68k8W+LrvoCTf6wHnZct6PYXPLooKmAkncflKIQGK6QW8DNFZz6gWwGOk4kiGpRlNPcNGx+OvpDuxNOHe36InwGbG7CD4uvRtEeVuUWnEI27RPDgma+e2pSJ72GbPltsNl7TiG7w/pxIfp5OHS016KtkTVjYbDc87qzdZ8K+8h8YOD35KmnY0z0mqwUfkIQh5TmWSzvu7/OkTZOdBePnZrmZmxlEaNvDt5E6L+9HWyqbFE6Rdi0YPQfhpWw5VuRqautJimarkAo5k+s5j7KTXBcKqm/6hOs83X3aA7Z2Kis01TaDBlWLMp/Kc1XQCicrtQWTk9y9hsfrRssnTImvUQKy4VGZIIpzq1OEXJRM0qI25QWPpLX+nrFAjrlvnv1sIJ2ZS9TqUACApcfRmFAp0WdYN7IvrcSSoYKcqlCZFmPDDx3EYHdfAbLiRlgP6Kf2qr9vPgliTXMbDtw4VUBmwiOY0O3Ng+K8BBPSbda2hjFbkuMf742d9JqnWegr1+d477sXZLuWO37hE0vsGTXunIGpepnoox5yjzAAY8fg543DxGmSxHUuqewYmohUfC8yXRJFrrAVu/tSVJxXCuaOMgYY5zIkRQ6zxtXwRq/QXntHQP4OApZn6KxavOAyIrUxyJRTqBtadvphEBqRKqs/KQMtHvxzxpU2dwdckZq14l4jHKRjIwbRe00MLG/iq2CJXGU9yqdHEwM+B2Gt28vXdkMtfcULrKC+gdgCx52q0/fr3bo017Vufa/JlETX15FgnJ5erHBEHr76GeyKB3kRMgDYKfFD9R/caVxC7tZAAABgCd5QcC7wpewOJ0XbGnT3OesMthVofsospmKDpV06tXAFLXtmCVjcWwsyN8yuS72SmfrIjDgwSX3gNIYKq7g2kH1VAf3i9Wa6S8YdE4Yo7plN9B6wvHQO43ck8v3FFuZuvUkIbiW+Cy72yomplKmqnwBT1warMMkgo1E9ug5VcXKWKBrmFK1OARwa4ruqZglNeFhZTsJHwroj4D352DuHJFGyxPg7sPK6qSaystmab5g/cfTNmHc/tS0uSCcCTylZ0mSnxQfsfcY1yKKqPwbuaN9fBezEVnqAa+OUuYmBMZc6htMprmgu6B8ZRbYh0JmKvAKzprEoVGFhLDvF6vvHDVUqU4sQT/ia/8cXQzl3HJAVG3AV4ixBLWnmI5iGJ7IqiLpIDKeQt6yvGYXWWXwxE7VMSKHP18mSqKJwbQ0sjrB+9sZIIxzPSU62lVqUE/GK3jOMTQRr15pW8Uq8Egx4Dpp4je0OZblG9EpBLYaWkp2U1xFi2l/fwQILuW9nIXQREZJQE5sWn07XGULNP+HvqZSI+x9X8K596IwKoYgieZbC97gFps0npLgb5YFMUOAGEaON3m+b7q4FR+GmjhSq4ejaA/9/71zHoWJIL0GqyYJo+HZGUPcqfbqbBdLzLtr0zIa7cH9KQd+UP2UpDOx3Dop/+GsyDLaPuVnxJKL6ht9335zRXkHFRxos+PofQuRxpe3/C6sjokfF2T0kUpE1Xy3CTIazkOy/GkiVuIFER1CrVt60n2gkqkW8CzsEajhIHCMoxZoCQ/4q6Lf8K11M/U3hmbAbzkGh3QcAfYZaDhgvdgtTTXKZ1l1N/oJ0nWuSjYMB5Y6EQAKgMkZVfLW4jpD6r3O7Gpohn4miO0+plQImxeElnZbKlZoK7nU1ymbPwPSsAEj23W8Jd4SRgyu8QNOHLTdHC0ur1w6HGoGvbF2lwt74TZt9tyWWoYm9RnrrZ+ScScCiJ7WE8vcU7VsUoLvUK0APUEVGvzfesypbA3uTeck47wE9oBkpqqzkxSC6oA7cRqXleBKEEowggktcBlZ1ifd9JxFqbwbZEk/mSAM4jkKweC8d7JblsRs3RK76Yqmf87l2NpJMW1PDBJQhOSyo95N0P8wX/7FdBLuDc9q6809wc45x+IeVgVgLCch3wilrnOAwfAWogcn5VXUE3c5IFA6w0h5ruKtpOaJKD6yB5sovvT6ezalT8hOlm2JrE7N8i4K5fY5UxQ8AkTy4dfs+7+ufh6SkRlKyTEQX8VOoOl5KLgKbANOVvmvNtcO3AtEB2xdPxJIdnv0lOegAAK/6ygj/S6/l2xzcYCf3b2U5Xj5QHkkwhAT/fL7apDTTBGHvXqdT3yjPkGqRNwCmlt1ybnLj38Oq/PkaQJkJxY27ESSJ0FLRpHGly0veu9ud3NxJVEWaJzwe3T4ces8rWKEBzbI97YsApSwVlvtbS+K6NMtJ2UCGCNwtG6Yl3X2WsSH5/GI6nugow5yGK49DAbmSdSI8YxccamZbKRiFngyKCTWBeVcjhMr6cTJ+7NiKkTh323suOoZDbnghrRBloEzc4TuQm6ebcsxHlyiKGqf1wcjx9CbAt8DCH/zFyVnWy20O1rkyIgc45yG8Qbk3qX3EDNnjHG5x7Qp+1YZGZ1EVpFDATtBCWDRwPbyzEtilvSlbGQE96/eSK8/8U09xS09+eNwNEijIWEjHTkjhvCc52rctlUNVG/B7dxLXbtCdUYYtIxEd7TE2y6rDTIhMhGK7Ggyspq0FNkjiQUsdNr+2LCAcDZp2PYheS6mzqYEarkjW6fx+DTFtrjrBQYvNveMwnTD3mlHcIyleoHS/QBW2qlO6rxxhdQSbTvAHSdE9Dl60VwmXff0Kz8Uzx7iqFZviUdAQF7WJEA8g1cpHlzLfbsGpm/uI6oGccAI1YRT5N6j7cPXhXm2K8xQZp+hQXF8gzFU30pwzeY0oBdms1+occdfkFTbJ+O1g7sz8EhbQP4M9lrcuVTSonXW9ZdIUPnbmtBOaNoKwddCAdjrJZ3HJVjSr/9LGVarXbeioiLqMtjwhrorl+eYMGQOfM2V7LxjgVm/rrrKNUwxVzr/EoRvCdQgBE8GpaQ4tVaDW5e3dCAdqTFdga4/BaW5ooRuLavbvWWTshC69RthsoV0qzuYA6KbL06kdWAciZD3sFcqk7c9KX63z/EM7LHw8oz7tWvA6KXYvG+QtiZLtNz1c7aZGwMM0zNXS1WXLtoeAkRM/a3x1uMFrK4OMpgKe0F9SjjlhCEM6P2MXUm8lXN+92Cu1cnj6c2ZZkMWhqmtAaL9Qqm1I0YxE1GrZSM3JVMzlpMagRWNSK6hgltWMBNtaFfYwe/r9F6gWb3L9uTCUuyaAP9fnj4fhR2gCIRGnDfbU6AX5r8dhklubMbzhn74dvX6MLX1wpPZa4ppzan7OzsuHlPpkxUywfpDjkJYVztk0YLQG5kPzaw5K6osDvmNq0ReelCULiULIbtsto1wRl/ycTi62f+rz1NCFYLSASF+BvdpdibLGcLwqYLDZbuD0jl8wZOsSlo37LFL87QHgx4kElLya6lnwlm2m6twMg7qZfvpI+41JXKsE/iF/HR9RZldl9ehqclP5I8LHEkC4G+WhhBSxj+1LQBUHp1hW0+aQW/D9gwjt7776Z+x5pd8ngB3CqoGJ2n7lsO7bym+iXz2OXEENlMXuzSu91MAP8j8cvtYNbiR3G3QoAE/pMy3Us5MMaoYvmpcAAAIHt6pXsVXyjUeHtKYycVJxoPhX2l7wPqBDUORQXG617sMdXSOXI1ExPB1jmXpFhogaPXsU16aOyJgUZzdQmG+m0l5nvgvBJNbPXnGuFDTc75T7uWao4QgS27qAhipsc+/j9wbA6I8KbBaLVIX9/YT9+/xjHG3rwBjsTO0JbcP0XlkUKp0Hsd+0LuOYGh+ITFmfX3ImkkqG7Cea8654+1lUqlBV6mj8I9Y8oFfrBXhiz5KWjMteTpVwgXS1TYYeJVVoBFh+lAGkghE+Okq8th62up6S52e1ejfwU5bQa/UGts34hCTPwyLYqN0Wecd3NYTM0ktouTkjEE0UPXi3PGsTeshJ98G29g3WPRDRlARFMKby0ln13WwCt1ReeJcfe4rPYvL0lmdpjIdBpHrQCSLXPpbS+xozCvGX0jEESmm7WwuFS6YGnLHOjcqpTJPBxCc1xb0ZAAjPkTIC7/ReOGyv1HZq3rmfqTPgRK5sO07n+KZwRk4CV97oBvOGR+74HgahLFcQcQQ3GKQ6/jdJt82VfMprvDNEYlSYVpidtPPHsr1Pz1oFe9vuI5jkIgNeMq2RUeyaLA+vrwiJPcINSF0xyZgIh0Zt931edA227vqbnHhdxVxVhYEwM6ozpdl3Q0YOWQNUa/+daxkrtIpFVdJLVjAUt2aNmNT079P0LHfv1l9UAS5oBjjv9Zv5y2u2Pc1d8G24hO0AcROyEjdj6CgIPAn86mvzp3k6eNY+/I4oYjAFsV9PwGdbQvek0tR7gg0AtJmgmF+y+cFJz5MzlwZW1gx77bAqH8BZrd+KMHtNlVvvKafPmlTY6nyqhKgh+ulvjVZBT2O/pcwZzbqBGQDekKxkjHOLORJrJmie4cluP/zTktNFL6uedqcnoXk6nvCGEiiwLKOTdtCdBD0cOf9ibLEEnspU5aEO6PlW+PEOWbBIT4bfDyTOc0VsoWCH2/J6K3x7jJ1Deo/G+ZwPsML/nnhsh8bsBozNRKmC5eGgchCmi+Xpa6uqULbOhrJyHB5IvR+yqOjDRfJsuA0nALzhpd3JkBjcE//grhsxcwGomUdqF4IMKr1vI3u+JWx7iUJU4dI1bDHi/0ejEyRqFu9RCSsI+SS+T39Kyv4PTW4yMyrc39ZIt0bfbvqonJcOsnCUNICOmFmr2KoTaApkUdqQAAGUodQ6Mw9ZtqkK5a7t6QUZqHQlHVCqjl43LgQl4M5ZCzTmkRp1HdKa+FMZeNKNvHc/enYfr1nu4fnXg3vbPMaN0mq74rIUn32wKCOKqBsvFDwQE3k1ohj8TkSVh32OggijhF/4jYVlZ66Va6jEXUAkVA4szTKhXCAYgAXzHQ8w9wYVwF4DD1GRppzW+OWCV32HVo2TlXAEZABfjxdJwADfybtNtZq0KGZnCa1OhcS9mFicMKR/8alLkhqLhHhFgYv8tRQ7UyfzpVFYra/hoIeiSS2ZkCh4pRJhAK3N+SOQa6tS/AdM4x88w1m/4hnREbGbsAhVd4IwKUmYT1yrHFry4AEoE6I7nsJe8s3HW70CAqCb+Qdt01LFp6v991XrxviSM/6RCkUgR6i0gGV6wt66Xz1HfBMpej/1YYry07Ej3PoCaDTrM9XL5YZ+4Kr2juku7OXQO1pviS4W8SWEKKOGh6FXxz6vtzsMeybbsaOgtunf7eL+MYgRRHo0IG1mAZr1u2PYceljfhCP5spXRIFoyrPHFrJcTsRDknqe8Us76k66dkdnPO1vnh5+ACVF6UAUMFeFWessjCgCkImPnyoOenlqoxu4vJyexkWo1TsbjYpqroQMHs5l1AyNKrOSCrIxIwV12JncSkpBYdTt6R4HphTulAMdS5CUx8z7RGf0VYaB3lyJNG6bEeHkzvhwSUL7+JlbAn3Ujp2oUL4Ome/NL7fabiQopLINkG9qfS7L1aYGCW0z+BfUj9fjLLqOUfBOtwRAweaf/bBdphOpsatB1U9GFP4c8ZVrbRyJryY3bS/xKrmPHXg6GozwEB2ubaxUoAixzfJrq7y5AQuBeQskl2PzK/l3Nw2WZgdE72BHq8t1eHjsDQWL0Ifl8/vPPJhaj1kh1TsRwFYWNMcI/KBKmyqCVf2m93oidppmBFp+FFO7O+R8S5CSAeOPn2Fzw3S7Uit5acqPGcenw53hI00K/KnwwT0ekkGQBOMukr42zY+hxxdOqZI8HLgl4hCMsiQMFfrThSQzrnYkQE0kNtH0WvhRhoJDwJ6fU7y2HHnUkgC1Oc2w9rA/AlGgauCmtb11J7NhAAANDk3MN9fQ46kJxROmsmM6CzjMZ9/C0Cw1UvcTZRky/SPiUtUPpcQ5PuTvYLJjHvV5mdjZYAXgoEstY5cAPi4f4AHfLs3m4cBB7GK+CR5g35t1P5mssJoYgsOWLl36WdT9ub2HCxWPyGuIASSC5OzjYRHkMbEaa2ANM95d48Dd+vbE40h790puL/JRNqk3tsmVkK8c4Xor5F9GeJWm4bVeMkp5LQ/9UwVzv9dgFUqFLnqdmad2UrHY66Mg1tRYUBCvlB/UZ2ndv7282lP19SHdHnEBzyEOXVH/uGEqpkPGa6sJukIeKGI72W354CnEm1vZIsdJzKxzICQrhjMBGyEUlpePX3ISr5HVwn1jNRM55WWy3b68xy0TVhWbYlo07nVZFJZkPj2LdPxpgGYnXRt3la+0glDe3GaRFV+IDSW/DFMTWyKhoYVehc6SCRsQ7SPpj/it2yiiAHo1z0XInN/sOSjWt7wCBfIew3eY80K7ys+wrmcRRGN4uShYxfJMoqNYhIVyQl3oYFBfKkMEOjwLgRsM5nhZymRkowe4+VgvI8MZ6YuVxgHI11KPmucsVOCcgdncFZ6PlNMdThFo6fUvDJd+Q+GlyMD7Ug+tnGmIm0BKhvoJGu+n+WOD8XPjMgX/xbs67RI/w6Kw3u8R9GAMiJKnIBOjKiHfO1b/xkfiEyj8uXtwLDuKl0I5b2cx1fHVNvdHNuaSYy+V8wXSmb5msQZdkNsvofsUrteGjY3SpiU17m2E/odnKTQyvGSSkKb1LiIYYq6swuUGZ7PFQw1tv1jdfVwqs2XjFJyJBvpDnrACnVkZaiBF7ChxG/8dBLlxQb7r7dnic+hgz1pwSpZaiJUBGdnGMMrtayzMLwlIDIFk09b/kZRuBEI/n8thjfojly7Bg0OKtc71Bm2Qkw3nhzaUp+OZK1G+1bQo1V1si6paVR9sskZkJQEibW9TajwZeTacbSIMX69PtVd+aPdk525CDGLxFzwujVoPE0ixM8P6nbiR2Wilbkfmj8GNqNG8TpoXn79jrml70tqV9ADiyy3DJ7MN32zN8MVzYQCGbqdOCzUN7lt9eKwwNXQgNxlxHtyocMjdLint15CHSQyb/qR+tBe8WNRCM3qF8/PmSnVoE/GCYE9wobWTTJoR6921YV1s7QHksVpVzulM+fgTTH7jDYy/xQLKVpxMpow/vXFwGm8ksQBc1B0CMRHszw2HZFL6UzgHSi8qt2N6NDUT5LIF5bA/W3lBgbNOaxYfDEfvz9oCc8vDD++mhNdE+BlnWZRXPIMdfLFAjfsceZ6Ky6GZm6p1eTwHnJi77EHWwIc7nFveQLDyx3afM835Lcw8dK6Y6PKtkbeY1F5ncE2p35rWDvRDWe3NGn2m9ss5WLFT/O4xNE8F67fM5rYWqvcy4aXh5QFOTLo2fFhIlJUjAojlb89YXuJ+DNSE5kYP75Lh/WSMZOlttb4OInX+eg2vxs/qjwyr1XaSD0P5iXjc11Oml1OF5nu2eaGAxydtL/LUyis9DnB38x6vVcqqUxoJdIrbWi8x6oe3EKlSKBPG0vfwCtHq5sN1CCgeOfCbVUII42IHJIwjhNDPlI0dj4iVaW98NhPubdlU/vLbRB2DaNXt69pZgCY97066C6y3VDM9PkO4gVOeYIdA2W1w+2qlPG27qHsMn726RxzYLjcr9x+p91oRO5dQXbwHYMkw6GaSYxmb4otB0ESqFLWxR4OEObkuEeIQzQ1a3L2yXri2GzmvpONHvnmOm+9qPLUI5zcIGemYphwap/Juw7V3cXU9QK+dMiJDH2XPGww/jpQYSO8Noj/mRkswE8XICB0n44xBlfEL9LLPzEZS/1gR1/+6WATMzZLgR/Xu5Vd+KtUbXG0DMO5c1A1Oj1myQW1QnvfSekkTn+dgVlOmBnfFe0hk/tNWTAMFMq4p9Oq3N5K5BYgez6+nE5Tt39nNHKGijSVzO1LG0ungszkTfMv42zKQVwlWYg17cBEvy01MbokdlOZzHBVGASijs15RH/PqBVWCPbPS+69l+tejNRTEnrMiNW0L9aPI1/EBkIGMZToLJed2WetsmFaEo0Spolp73ty4kRIcSoTxlUn/Mc4IrfC0LMEdRLqaHdR3LaDOjRV1EsGJuUL/gpRVJTACBN50xZF40yL+6404giahKXUauZEkMizNzrKpE7I2QRv10Sb5P5p81SXdoYDSp/zGBPYX60h/whNcb3HL8RrNWa+NnAeFAHG2Ai2NF+rctatHhD1OtGOn6G3nZzsCL557zqTJ5xHnFffNAMRTz0vum51jabP8GfqO1xRcBlIVRbtsqcOufqZ0dPcLsGhFvth8cF0oshDAd/suGuwLMcwGOcu7JUaav7AApO/Efz+bBbc4xykcjSm+B8xUBZH3J/uMkYkd19InPdTJSqxF3WIYT1LU85cFVfR/gQKsqyuPUO1iHlHXQHX8/f1qGjocL/ozPdv3RlfhhikXf4n43IqXeMRI5bHnpE0LDfO1niKvpQY2YGZm/hqh/6owJP4uWqW424Mv8eRn61RDwBy878UXwdlg+QBb4E/d3cLqufDsgQ7CyH5lkeR5MWmh+EMBHzKFJeh/HvAQBQM4oWIYgdnniY0DZ9ptbhZB8prC5amaF8brxAj8BB2HS9QTJzAttsENelslAB7NdorAXs2dwZla/a9rxrQ10hFm2cv8ebP/MvzApHwq7Elp82oLc/bQAsZwbMbARHlrg1LT+YlDVoiqsvOaVbZv1Uqw9M86VfzTJj7AAk6Ea0CT9H25QnRqya4DM6aoDQKDcc8bTfMFpVR4LNmao11H6MrJlDCBfIloYJyzWHiEk2I6vPo0uVRLb519wxNIqFTmJJLgnJ1C2Tjl22NUcDHB+U1AduG2AkFsly98A7Et2xBl0mJHbbmAXXbsn62Z+N5OGfzDRtXVAPd12y1IC+PllJTYwZzCMYKhi2CGzNYp4zMOlW9wUYpHqp3vXirirvwE3va6ARQJaU5mRXkUd/mfaR39an79qGhQx7E5nKUDB6CidfgQqi0jTEWCzaxXPYnJTpi7NkT4YPuMoXZ/T0GRdsPxU1g+Zw7KZxkGct3PStzr/kHkK16X+dg4cBriYRjM9PT+btKrBtTrNflkr69pGrEGNEwQcg+3HwtXd2cZL/S9oDPM/RDFfHHDGYYhpLMYZsTC6knKoGWMQNFoHPvJ2YlVF5Ay/ZzjCrHzwWQlCXFZAhDqEPLbjObKzdIGPhpFPiSnpFkLlW+jkiqEpD9ehh7ES+LygG9ruFTJLnKVzsg/qddgpZvXTemVo3yRGheyi9OwdhPB+C8KzKzXHNrkwTrplQOGg2hi8xj4eQDsTivHma8URjmVLKOrwxsCv7SCnuc9Mym3bCptAb2SdSbzBGxO0YrONF4ezkZekCdlaNftx1DNMB76VDYkdvR75p6JF3gkp8D9UtVFTzMKHxKAzWIn32kcS2Cnbe6kad+lbaCnQbOkun4lymqBw8CNpctS5VEzg6UqGev2vncHO3Df/ggYP6G/tkz/lF3KRnJoksMUX1BkTEHPjGjExobpwTxBR9/K+Yfs4FsLd1Lx099de+3khJTcBxlfWmJd4IesmVk9/nSGw5+sZ5hMoOhdfrxqX8N3dCyrVvGxr18ofnjzX5d/BtYYyjqaMG+O3G0I9d/5JFyE6+ioMO/ZYFeg816U6z0HehcN3D//jhaym/7dx4u65DZP6Yr3NTMFoNT1XN53xQH+/7bjb3K/0vRC7lkd/dV65Hjfu444tipaVzyKRNjtz3pJKevOMH6bq5Oun7UGhj+J6CP6HTCfn+AnKYEkkukB9xocXNPI4NauM28jXpsdPGViRkS+XTHgEY7KIVtFqKy6IbNnc3od2kWZiZk8V1QH413VChKwiVKrW3ccXnaZohuUKQWwGcZMT/HYgU1XLDYtfjGWAh9LSfL9AOuCV1TwWoiYTGXhx3r+JQS5ksBJdMx1XLx/46UJpEdHRQhuQE47BfbYObdHZDmLaaBwTikeKe2zaL1v5fRRxmJfT10MCxyFlB5rlfyWwAO2LLi25/nMBUFLUjj5ttVf4sMEldBHVNV5FzGcw3kcd+OVSvg/NpEhqzn3YI/EADLJWNkD5ciAwM5yJ4Akh+I/1jq185h/aUfttDcef5q8mOv697SJmZJiS6Xs7nDEoGV/pVGp2g+iInq8m5R5c9Pog5+LxH8zadaRvV0+44pMUAYWhur65cQhZXFu55eCCUYDoah7RkN/ZDvQtrUhIGMdK0rU30ui0A3qubzIeV1zMo1VUS2PMxjV/TJzFab+20U+H32A9hiapWNreLImL6HHGJKV9EKtCevmsT7PlLHd6EFUSKKXPohkZ76qxFqbayW+10nSY7NxZorcHXfaX5nIIrp8CX543RzPtt8gdddFznjKx8EgjZVYTzoqk1bvKzde5TbiwJhD+02F4fsSbr97gAh9alyCom7rJlbQ41bb8kKzpFJbQQwhrcfO/qK/N2nGVqEm33iILZY6iJ61u59kTMRyL3vOrhekHFH9sunIrI7yR33b/LhojiQ/ER3urr6pAvSXQgZYG/yFErJQaITF0EUb/JZekMT4p8CVQMv7S8Ak3J6n4fouRKKTHdUZRbrm5VfwgTOjlnUEZ/LgtVlDxrVPKbxAeC1br23DrY1/ppAOn2QheNi7V6H0fppM1lUrpIk+GRYN8gH/Var+eCLCfZLaWyD/8S+7QXTvk+B0WDcJSm0jl070k+r4reLy+23aC2rtSpetIjRTvr2qtgRwxDakR1pcJpVtowPqltFUvmTzmvlvY2gujqnne/fBRebY0lKBiFmuN4GCYZdGB1PyMotRPCSjumB2LDI19XtG0j8pZqCVJ7pUQQ5xmNbEqIq+TtCdJdEVUGvA3HtnEetSXQhQo+tV6Zs3QY2QB/XY8nJPA+oF2IiuNrzu9bM/NikYcpwZ5aTgh5DIaKTZCAFkqOzDeZnFVi02Xr7r2mgCseWVW2OiyX8qELmFrFCa8z6qHeINhFPKYclouk5xNLxtvdpP19242KGl5tvAYdHwMEco+cAE3rEgezZV6V09P0WfufICuku4HjDS7GZB60oGvaET7l+xNfCxAnWscbXPC9Pfr3aUNVB6XUokgeA61SD4cb+7Nr1bdMf9T25SMzDDZstxcDpkL0uwiLGvH3utKWVg3Vj65sHJG2350bYjsCNC42q5hOp163Ule+7bDci2MpbjBbtIIj9nyIZ6I8/WVTfLvKX8/pVaLq3x32D82xjd80rkUjvdVM6HqRieszi6SJI0wqGGxP5IEtywnQby3zlJeDMc2aeaQA5lloZCBlcP3j5IHK1uFGu8Uz4mHgZf5Flj2D6DcgqWSWyzdizawuCrfgeP1yoMJVb18URTsGJEeiT1reOvuZM81v6TKqH+wJPlgY2v94EXUGL54WdoaBqb/l+2w1kytHgVvlcwd/M8UTxov14lwiAQEZveMi/GN8pomLNtShSffUT6lNH8LSyZGd+wMaZlqDsLkmvpTbnSwtdFXHvN383GvDKw2cVGOgHfUousoTRs7KoLLPSz+zz+sp5C9J89bFsy5gb3x3NHyfGJe+e5k4Ufliba0qv0GEWeznguagNOrFlZ0cqa9XrZujtlDngVhTF3MXiNtgRVcucjOV8NGoyUHKXeuuH2HjAMe/vrktTf+AkpqHepDB6OM3NGrY0BK8ndvu6dKTd7AIv89D5qAtG3+SBS7exG2rfTazQCtGhNUhaaTdLISpcZPLO8FUK1blGAI4u1Y6vySffK3YgvV9cuUWc4DyA3khC0oXUJpIifUPp4SLlDs7yI+2RygJE9oa/ePD33qKP/7/+09Mcbf3ApHrGMPQvWnP28wtrWuBvdMss1V1tnwXpv90rdyYEVMkQ4/UBHIullKP0oUz1iMA7XUCEy1uvzLHhtDz3ZaCIVvNjOSgGRNfiUUGDj5jZvZWnTTECPddZq41jFqBQapU1wGsHO7vxvTw8Qo6Buv8EuTJjLqST7QbWRjtQ7tjjQXAsfbhM/v4jfF65eeScb+xYy28UBqAKUQ+FN2THYYm2rt3PPQdMl/0UkMlNu4LS+I2pB/OpQS1WJjU9Rcy3ZW4eCPvY2SL/m/59kygXqWBESH9g8tGizkR24LxJ2LWL7rb4G/wv2IIh4J6ugjHdAA8b5hXl2Oq4E2FFK8cRe1aMHOCZLA6Iic2hYY0iBz7KtkUYA+duhWoVq+uVwZGT5cAYOAxDCssJBknLFuaFVatsYorfW/HY5KrudwDcnCASQIQR4Q8Ydj7KBCLpNwI2t5IycmWiAh+o6qfCorMDTwA3JWnUnwF1tm2WEl5R5Pfc4cdoZKI52g3sXK8P6pV5E0AB9SPk069GzeNhauebxVDIOcYnc5p6+wVC93dREVjaOGHllGVAbiaEvmqAglNfh/xSW7eB2XMxjflXCX1V/YEGM0XrOlNrNsPQfxAphtj9TOjiL7m4SXpGJdnHEX4x3OIuaMYwAChkok0g/H7LTfCzkZBQksK11qHYMUfLHVuujSFnm5IiOk/RENYachDpFmHKKIsWMqcVhtG9Qo4TURGJFG3eqKcUhpBmL/s2DPYBcBc6ONkF8YJn1Nz1kMMppj8c0TWVTRceTUoAbW43IFx2umRISatknFMAO1uFyhBAVsj2wEiZ8PI/Ay60JhgLfGygTCFinYtWKl/+AEorgWG41IZj7ZTc9UsBP6TLrJVY7I5YPDIF1bw7T1d6Oaq1Vv5B4tBxbbOWI0JBF8oMjBlJwRoPJm9j9EiuWXDBmdWwvONo6e5jDrWYF6uOyfDMRdw4ShT7ZbUhQvGnEyqMvuavzL9KqBll6gfZrgaD2HdHKlXMY23PNmjxKqM1Z5eUMQi7GoIHtb7EikmsusCzqDXUKvGtwhXe4lMulim9W7gtL7zC4VScXPZjzABEEuqHSfAGkVegYIJufUIODp1LdVmzttk2gR5y4vYz/gtfc84aTowLD2Zv+L88vuiEKQq2loeT5UdVr8DZ1Fke8vM1ubZ8fRGNMSEUtA3xVAVIY7mLbqop2CW2a/ldyPgKNia08bJ45V2Qf/EvDKQ7TkNMAstuyWL5oQFYvtUfftUBocOYrQWvY4+LoZ9o4N5ewpmQ7W4DktqTpNYitqZ2Q/hfR1fThflhJSAkmJCaunYc43Kq9Smyp7vDDlKs2mfv7wMx1P08TO0wqCNTugk0tE3BuFt2vgOHFPSK7T2Y4FMsyQatmCtWrMBGGvqODP6xxQsjXmEm/ZPZ7cvB0mbcyEQ06+Iz5IxOvJ21/L+AHwFCIBg0ctk+0LtAAAAAAAAiUWTWC8rZv34vmFIBhDi79bPJOGcuV/AHleYKdC9aTptRpzyIHQC7hp16+srMuuWbNwmWnm7S3IiLzm1fN0dNDa5ND7Yd1Sfb2c2IEDCsi41uGRtnCcel6YRR0DkGkBw5+gZymZkZaLrY7ch8IM8A/zweOtZ1pgrbzIetb2Fba4wud7pYDhhaCDP1ggPytxWOoUSOUuzUELC0pAOpqtcbgIU4hQaS5aRD5ObsJqZU0vHEAQGg48Snp124hydu1OF6Giw+GKY4pRozw7445/vjLBAJCKRxWnd1jrxkxsc27JHhFO9nJo884qYoDN7rKHfLspJA0pq8GBOYRZaUhfwEqTSoSMCZDUu+sF0I1AHyxYeGS5ObXaVmym/e7J8Vc+EdCrOk/fVuyIIUisqcp1YidijBXZYgeO8EanyTgnXLuN1Uc+DjmSenh83SjT4WZo4TfurfhI34YZJut0vL42+rN0VhCK4XucYHyLGIiYCS4Nf6g2HpWiHw4Hz/Lx0sQIVDpxbvrmMuNWq0T4l8yi7dATn5+7DtO/V5WAUeRsnjBdrwD9XK+SatuOLlw3V2a99EKvRfwWqO8kGoqvdD8J8PbfkpzhIsOtm7vrAoKm7MnC7mJnjt+jJMx/s4wEqRxtaVgqagDfloN1s7uHjRZ1ewzomWSZXDNit4D6O/r+r0i/YtiUHkWzsoEUyOYfDrDn1utd1a5wcwLNPjPG6RYrJVKpB0jmZvuyx4aO6wIE+MDOC9x28KFDFPSHZjZM3YtEIt6VKNn4YWfnXl5znXE0hvBPopTFK5JBl+Qeavvh0JDFCJt62aoCHLvtXHwcW935+xexJnSytTHYy9UqYPX2+FxQC+PoA5BG8R/Cn+1vABOhMk53mLKzubHgMK0x/TwmAojrrnwGQbrdw5It8zkWDL+h6aHm5nw9iU0RKqIGvc/P/FL1xnT7ThQsEy8hohOkrL62n5Dp7BoOeOYQSvW4+/OylVy30CbDJvRtExNMzgMYEBnCduc5cFl6GlqIdbkAVBh6oNJ2ZyAthxwywJPDqH4If+/UgTUWqeLfExLZ0LCMM80ERw/aHkY7m0ctyTyN8BPWaCDmoGRYIiB6+q6LanyhZZJ0JVhCYa6u72eGgOtdY59glmeAuIYqD/3A2TmGS5++0zeK/+OnJuuDE4TQyOcQIIH7kKKG/4ksIk51Hkh0lUtXC+yZgsXqi2RFdmo0woWPJV3/JhmIZYHS+8kVm8oInDRj/Ix8qFcbi2dBaKgkM8yzBggxPuwDcdkDmZWbQWsT+C1WRpAAAbOD++f8QBKM5sgQ/Wdv7CETLpAyTzT88EWvGLN/6ZYu9GstmCRZ5VfUZHFFj1mQK/KLHkDCl8nqe9v3YtFt49M58XLrGakQMep0A/E6u4adQPd6qGXKoxScV+ZUnBsQNh7erFNKODmW8czGUfimzXxmIu8prJEe5PsjtFt/Y1wAz4ySh5DdS2wRvc4hgaxpTcSrkKjCI5x4CTWxF7IkwePEkVsxC08oV1wmYtl7TTjS1ardtzaiQdS2UV0KBJF7YMHeiUbvkg8mvQctURVVtE+J+2mvo3koCshZY50gnC5Mev5AN6jfMq8BYjlgRzJqqqMCUcCu0KXlsll7wMpzfYmTg4mzINwF2iB0Yx2K7egW7eCqlqyXrsXmycCgphFL4zNHiYhyQi/zGMftgZrnRnhLEiSqU7FIytwaXhuXnWpLPpBNQParOjNg+HMCuSIyIbph5MixzJQENgnIlyA3IZuwKcsoedfXur4mnsEduFCs9MEkCZ0wDSqXIx99votEtWWRhmySr8c7K9e8aPPOjaI2qziZ/gp/Thp6/uD997kX+VSCHLtyxSFMflTGgwIAdIgNvXOir1PNeNmqeVNT9pjlfOSOy8ncFC6dx+n5Qu458KLlay62tSXiaQPJun7GWixu5Ma9uwd095sMGV0jBrqW4kX8T71WJ73+xoX389hrMGenAuWhmwWJc9SDiJRtcuGW+TU63G0fqpCd3qoUUqovL56LVjzAFakhx2gGhEgX8HJ+7R0ImL1GUZ/0K4QptXEtHqCoSkEQMI2Mimm4GFcFrdeNNof70tF8A1Tu3HZqMgIOjZi15mmgWx5okRuhpYLWg4dA6g6aBMO49Z4dS7uvTecE6o/GXFq5PSc/hdK5mAuzhXHQnXurCoWbidIZ0SMNIgyyGqUkIeVnyGFxcjMasArfn6FWZMwB+6SLnGTA3DhJO0uzvD991ov8sSa8ScwWNiGssjEKgDucOk8UNJQaV3ZQpePamCtqlA25TA9M/OfhD/AxMTUNmKF5pzFDYFAuyh9Gdw8QNetYzvkBAQcPyWSAkyuNWiHNQc2LUXd2TLu4+R2EAPYiZjACXVX+n+B8ybfCwvQrRKf4Fx1eJzaeYDQ+OiOFSh+LThBoMwjDvxYAjJe+RhCVfFhV5L60CtmlRjaCWmRWxmExzQd0wHjTfkMvWD9srwLkS6rY0ENevji21Sm6Qs1jb0YrTokJUFCar7J9KKc3q9Zmo7jLq5dk+ERB0G/xB2m4JqhjNwVIhOAeX7v3laEREDU/keIOBlQyo2/Ynf60R4KBOpZ5numzSWA3HMxP1WaoYpr4M1SvwO2TKCYjYpJo33wVia3V1JKMNnWiE0JPdmDQg6bBSU9oKW9DYxhQAAB/XsXh7RglxR6hsik+btZAxU1Ts9/v959bWazOYwIp8ikG6s4ulRPSf6faEgQrIuFw1uTxmyESni4ralNPJassH9VqbyjDwwLF0XbhRomThu+bDGRoDjdvKf350vOBRJtiAJ4msAn3ckaNyCJ8oVDW9hQ697RwUX0xhc00TM3YGMRMq9xy395kh0pKq3g2J9iUmngP+xUV8D4XdfUGhMUUj3SVtuIeY9hwTcOr200YwrV2aPHO7E8UfO7+Wrfba2FWB5duhS5qpRyMhBpJhr55R+MTqst0/5Vrpu24zrjTgjw7AF5dbgo+xZhKMU1OWPaoPSc5QXfLbAcO9QydFjqoIcd9ef7SJ29T/B5MIpHEDUH3rIYkjoHvgICCs/vES9gx5uNMelYJf2QKDuq/M289uEoGIYSJSDc8kVW3PNZ9sAV7at9pxVyNqWozIyI6jtGlhUg57VgQ5xp9T26AAbq0+d4S38/t2wgeYflVPDKCDyMj8Q05iqbuR1HjRjgtODMn8MT6DVa1PGjdMQVeJThATJPoT+cE8KWpLmofkYAMi8aIJfg+umY08kbSVAsIyrzQk8ILebomaQuwAR8V2Wl5bj6hJy6su2P+1jX633O4ZaybPDDvZp+myPCazD4gYqc/1kwmvAfGOjmRwTnI5Xf9AVYJUVPdNX4BReaeTiBQECtRXecTN9F2UsqTtiR3gctK7iB7wC0wccync3OdNCsRifC7bpp/aTAXw5D6Vgl/GZe9PukfDfvilIdBsIUl4kaBEIsbYK631n8VzxCsoW+YSeEU+vOJCEcC+dZdJaaQPcNcYZCWyerkkNBdw0s2aOthG95p/4wxeVh+opInCzTgRKLUMcVuIBk4FTz6PxLcXAtQSX7ajHvr2eNYVnP9PdOzPnnhAjgh0gRER14XzZO1zDxDbP+JUEBDzTaruGjoy4GZ/IHZnFJOY6bEEH3oXMsI4V0Q1auI72aVAJrIU6xdHS4qdyZ42pFIlJishYjCqLR2ix9nPUwBKa+MKUJI9KDeMLFaCrKkN+LXRvjZxm0DUB77S3aIgEv+cOojdAXAHuk2D2RxAKF52Pusy3dursgp4aCQRjpq66EqKB4zNiBAXf8H1XbC2FzXgJ6mDOdPTRJG1cHfU9B/1MG4ZMUoftHL9rUW6l4DGWQ9a51/+HGfrSFAlQmu5UxmpabuQwdOmRmodx7yIx1gbo6t6Nr6fw6kG41uG1u8SlDSnjBUiwZOw0scVrmYZtxUYRMM7Q2kgEtNl/OukSFu3t+/s81R1naDKM7HtczbdPtjlRg8lePxxP84KZURTGoxyKK5TaBbdUJ+QTJUgWt14bVjYcpW/83gvTdLIBOrWz9INQlw64lxoVoo5zVPfYGLl3Prxi9I7s3/YxIy68FuMCp5sdyFtmsvXFvXIQaHyOkD4LGAlzjiuaTE5SX0aPI0kWyEMXbpgZtaJHKdcVQdb5hOZ/RpfLYm/6s9p/jCq+bbgZK8iywqaNZxCSvcGNTvNSN8p1FQAAIwA80NG14v5UEro9uOuYISnA0EA+1q9WWeBpiqCuNYxcYHPCaRj1ydNCDM8DOrEASpZ+RPStdXKpvUn4V+J1l2DPiFGrXzfIYyGuB6iJQGYUz9OB2Ok0bJCbdb4uW2XAXKZgOuMEQuKS2jxh6vjA6hADE2ceDnvgER6yxgiJu5qXdAQE66O8T/cTlFeIiKuCdZDATLUXxLFB+YhTg14zvt5vLIF69Bx49wMD32H/cphKITKv9G3M/Uk3Q7PPVi0ZWB4zk9bQ4Mz6wv1UoSuaoXkw0eeUOEcE0u5D0gjM0hK2BzTtKWD8LDZHNH9UXvAUUaGFz8XsBlU9ew6zMU0AvHQKJTnwzzW5wCp0YM5lUMg2XUGjMn4wzxF8d1X3JzljAaCGUUNscOYlheWmGlEl+JVWY4c3JE6ZhMjPgHaPKAFsS2L+EzyYHU+xXGidEMfci05KJkmD1pkaqhF4lsw1bdDnoHg/cLV1FqI7YwmlNDGcOCzPwuMBLHvI72JocVWu+q9PUc+3wiViO1uk61YLBaCvTMVIvow825uA6r3Cnj5FIwmZPocHGwHtcHIrCLIacoDMSF/Ws6/1rwXErKFQ81w2+P+GJg7HJTKB9Ql8r1DM2ww2nu9vMeoEzpbiT5bntgQQWLUUQQnp7vushCRUgyX0zCJPP1BJGc0H85UkRoXJYiVXJ6Ypl3Q4iqQ7nMxzXR/G6z/dyTazXtLvykDSkJp6GgaQpYOUufTatYYqGxnuVKEDgbaJZTKwUqB46PztIMzX9r0UazLUSNPYGN5zGcN2oFTnwa+V2vTRVdNP8FYiq30fh5+PYkYaPDLCMmof73RhqBe5zkpN+ydVQTttl2Jqy29X38XinFAht0XaNGxSdgs3tvzpECDzGnNNSQJCoAHM383kq4TBdZbj3jsTBE809A6/e7zzxANSnLJf2V4K5i7alOsbbNoUuLUn0wyyE8oRd8JIAAAA=="
},
{
"slug": "will-ai-take-my-job-protect-your-finances",
"category": "employee-financial-wellness",
"when": "2026-11-17T06:00:00.000Z",
"title": "Will AI take my job? How to protect your finances either way",
"excerpt": "Worried AI could replace your job? Don't plan from panic. How big your emergency fund really needs to be, why you shouldn't stop investing, and the skills AI can't copy.",
"meta_title": "Will AI take my job? Protect your finances either way | Money Coaching Hub",
"meta_desc": "Worried about AI and your job? How to size your emergency fund, keep investing, and build the skills AI is still poor at. A practical plan from a Malta money coach.",
"alt_wide": "A woman working at a laptop between an AI chip and a shield protecting a coin",
"alt_share": "Will AI take my job? Protect your finances either way. Luca Caruana, Certified Money Coach",
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
"text": " nobody knows exactly which jobs AI will change, so don't plan from panic. Build an emergency fund that covers six to twelve months of essential expenses, keep investing (even if a little less), and invest in the skills AI is still poor at: judgment, relationships and understanding the business you work in.",
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
"text": "A reader wrote to me recently. She's 38, a software engineer earning €75,000 a year, with a home loan, three children, and the bigger salary in the family.",
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
"text": "Two months earlier, a colleague with seven years at the company was let go. Not for bad performance. The company had introduced AI tools that could do in hours what used to take his team days.",
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
"text": "\"I always felt my job was the most secure,\" she wrote. \"Now I'm thinking of saving €100,000 and stopping my investments until I get there. Am I overthinking this?\"",
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
"text": "Firstly, you're not overthinking it",
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
"text": "For years we assumed automation would come for repetitive, low-paid work first. That's no longer the whole picture. Desk jobs built on producing text, code, reports or analysis are now squarely in the conversation, and many of them are well paid.",
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
"text": "So if you work at a desk and this worries you, the worry is reasonable. Having said that, worry is a terrible financial planner. It picks big round numbers and makes them feel safe.",
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
"text": "Is €100,000 the right number?",
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
"text": "Maybe. But let's find out instead of guessing.",
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
"text": "Your emergency fund should be based on your ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": "essential",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " monthly costs, not your lifestyle. Think only of what you can't avoid:",
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
"text": "Home loan or rent",
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
"text": "Groceries",
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
"text": "Utilities and bills",
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
"text": "Insurance",
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
"text": "Childcare and school costs",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 5
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
"text": "Loan repayments",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
],
"value": 6
}
],
"listType": "bullet",
"start": 1,
"tag": "ul"
},
{
"type": "upload",
"version": 3,
"format": "",
"id": "imgbworksheet",
"fields": null,
"relationTo": "media",
"value": "__IMG_b-worksheet__"
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
"text": "Add them up. For someone who is the main earner, with children and a mortgage, six to twelve months of these essentials is a sensible buffer. If that truly comes to €100,000, then aim for it. Most people are surprised at how much lower it comes out once they strip it back to the needs.",
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
"text": "And remember, your partner's income counts. If the household still has one salary coming in, the gap you need to cover is smaller.",
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
"text": "Don't stop investing completely",
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
"text": "This is where I'd push back gently. Halting all investing to build a giant cash pile feels safe, but it has a cost. Every month you stop, you lose time in the market, and time is what does the heavy lifting.",
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
"text": "A better balance:",
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
"text": "Reduce your monthly investing for a while,",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " and send the difference to your emergency fund.",
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
"text": "Keep your investing habit alive,",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " even at a lower amount.",
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
"text": "Once your safety net is built,",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " go back to your normal investing amount.",
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
"text": "I've coached many people through job loss. The ones who came through it with the least damage weren't always the ones with the biggest savings. They were the ones whose money had been working quietly in the background for years.",
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
"text": "The part that isn't about money",
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
"text": "AI is very good at executing tasks. It's still weak at judgment, at reading a client, at understanding context, at knowing when the technically correct answer is the wrong business decision.",
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
"text": "So ask yourself honestly:",
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
"text": "What do I bring beyond the task itself?",
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
"text": "Do I understand the business I work in, not just my part of it?",
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
"text": "Am I the person others come to when things are unclear?",
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
"text": "How visible is that in my day-to-day work?",
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
"text": "The people least exposed won't be the ones who ignore AI. They'll be the ones who use it well, and bring the human part it can't.",
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
"text": "Three things to do this month",
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
"text": "Work out your essential monthly costs",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " and multiply by six. That's your first target.",
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
"text": "Set up an automatic transfer",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " to a separate, easy-access savings account the day after payday.",
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
"text": "Learn one AI tool properly",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " for your own job. Being the person who uses it best is a strong position.",
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
"text": "You're not overreacting. But you're also in a stronger position than you think. Use this moment of clarity well.",
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
"text": "How big should my emergency fund be if I'm worried about my job?",
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
"text": "Six to twelve months of essential expenses is a common range for main earners with dependants. Base it on your needs, not your current lifestyle.",
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
"text": "Should I stop investing to save more cash?",
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
"text": "Usually not completely. Reducing your contributions for a while, while keeping the habit going, protects both your safety net and your long-term growth.",
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
"text": "Where should I keep my emergency fund?",
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
"text": "Somewhere safe and easy to reach quickly, like a separate savings account. Avoid investing it, because you may need it at a time when markets are down.",
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
"text": "Which jobs are safest from AI?",
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
"text": "No one can say for certain. Roles that rely on judgment, relationships, hands-on work and understanding people tend to be harder to automate than tasks done alone at a screen.",
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
"text": "Want help building your own plan?",
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
"text": "If AI, a career change or job security is keeping you up at night, a ",
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
"text": " helps you turn the worry into a clear plan for your money.",
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
"text": "This article is for education only and is not financial or investment advice. Luca Caruana is a Certified Money Coach (CMC®). Money Coaching Hub does not sell financial products. Based on a reader question first answered in Luca's Money Coach column in the Times of Malta.",
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
"key": "b-worksheet",
"alt": "Worksheet: list your essential monthly costs (home loan or rent, groceries, utilities, insurance, childcare, loan repayments, transport to work), add them up, then multiply by 6 and by 12.",
"data": "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"
}
],
"wide": "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",
"share": "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"
},
{
"slug": "buy-now-pay-later-convenience-or-trap",
"category": "smart-financial-choices",
"when": "2026-11-19T06:00:00.000Z",
"title": "Buy now, pay later: convenience or trap?",
"excerpt": "A €2,000 phone that ends up costing €2,565. When buy now, pay later makes sense, when it becomes a trap, and what the new EU rules from 20 November change.",
"meta_title": "Buy now, pay later: convenience or trap? | Money Coaching Hub",
"meta_desc": "When buy now, pay later makes sense and when it turns into expensive debt. Four questions to ask before you click, plus the new EU consumer credit rules.",
"alt_wide": "A daughter and her mother beneath a phone showing a purchase split into four payments",
"alt_share": "Buy now, pay later: convenience or trap? Luca Caruana, Certified Money Coach",
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
"text": " buy now, pay later can be a useful tool, but only if you could afford to pay in full today, you know the total cost before you sign, and you have one plan at a time. Used to buy things you can't afford, it quietly turns into expensive debt. And from 20 November 2026, new EU rules treat most of these plans as consumer credit.",
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
"text": "A 28-year-old reader bought the latest iPhone on a buy now, pay later plan. Price: €2,000. Total she'll eventually pay: €2,565.",
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
"text": "Her mum was furious. \"Irresponsible,\" she said. \"Reckless.\"",
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
"text": "The daughter's answer surprised me. She had the €2,000. She chose not to spend it, so she'd keep a cash buffer. And the phone wasn't a luxury. It was the main tool for her growing side business as an influencer.",
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
"text": "So who was right?",
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
"text": "The real cost, in plain numbers",
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
"text": "Let's start with the part that matters most. That plan cost her ",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": "€565 extra",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": ". That's about 28% on top of the price.",
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
"text": "Put another way, she paid more than a quarter of a phone for the privilege of not paying for it today. Sometimes that's a fair trade. Often it isn't.",
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
"id": "imgctable",
"fields": null,
"relationTo": "media",
"value": "__IMG_c-table__"
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
"text": "The trouble with buy now, pay later is that it's designed to feel free. Small monthly amounts. One tap at checkout. No forms. And that's exactly why it's easy to stack three or four plans without noticing.",
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
"text": "Firstly, when it can make sense",
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
"text": "I'll say something that might surprise you: I understood her decision.",
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
"text": "Spending every euro of your savings just to avoid a loan isn't automatically responsible. If your emergency fund is empty and the boiler breaks next month, you're in a worse position than someone with a small, planned repayment and cash in the bank.",
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
"text": "Buy now, pay later can work when:",
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
"text": "You could pay in full today,",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " and you're choosing not to for a good reason.",
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
"text": "The purchase earns or saves you money,",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " like a tool for your work.",
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
"text": "The plan is interest-free,",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " or you know the exact total you'll pay.",
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
"text": "You pay it off early",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " once your cash flow allows, to cut the cost.",
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
"text": "And when it's a trap",
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
"text": "It becomes a problem when:",
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
"text": "You're using it because you can't afford it,",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " not because you're choosing to.",
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
"text": "You have more than one plan running,",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " and you're not sure of the total.",
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
"text": "It's for something you want, not something you need,",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " especially in a sale.",
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
"text": "You've never checked the late fees.",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " Missed payments can get expensive fast.",
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
"text": "Black Friday is the perfect storm for this. Big discounts, countdown timers and a \"pay in 4\" button right under the price. A 30% discount means nothing if you pay 28% more to spread it.",
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
"text": "What changes on 20 November",
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
"text": "From 20 November 2026, the EU's new Consumer Credit Directive applies across all member states, Malta included. For the first time, it brings most buy now, pay later arrangements under consumer credit law, even interest-free ones with short repayment terms.",
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
"text": "In practice, that means more protection and clearer information before you sign. It doesn't change the most important rule, though: the cheapest credit is still the credit you don't need.",
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
"text": "Four questions to ask before you click \"pay later\"",
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
"text": "Could I pay for this in full today without touching my emergency fund?",
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
"text": "What is the total I'll pay, including any fees or interest?",
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
"text": "How many other plans am I paying right now?",
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
"text": "Would I still buy this if I had to pay cash?",
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
"text": "If you can't answer the first two in ten seconds, close the tab and sleep on it.",
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
"text": "The generational argument",
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
"text": "Her mum's approach was simple: save first, buy later. She took her first real holiday at 40. It worked for her.",
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
"text": "Today's world moves faster, and opportunities come and go quickly. But here's what both generations get right. The goal was never to avoid debt at all costs, or to use it freely. It's to stay in control. Debt you planned and chose is a tool. Debt that crept up on you is a weight.",
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
"text": "Is buy now, pay later a loan?",
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
"text": "Yes, in effect. You receive the item now and repay over time. From 20 November 2026, most of these plans fall under EU consumer credit rules.",
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
"text": "Does buy now, pay later affect my credit?",
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
"text": "It can. Missed or late payments can lead to fees and, depending on the provider, may affect your ability to borrow in future. Check the terms before you sign.",
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
"text": "Is it better to pay in full or use buy now, pay later?",
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
"text": "If paying in full doesn't leave you without an emergency fund, paying in full is usually cheaper. If it would empty your savings, a small, interest-free plan you pay off early can be the safer choice.",
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
"text": "How do I get out of several buy now, pay later plans?",
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
"text": "List every plan with its amount and end date. Stop adding new ones, pay the smallest off first for a quick win, and keep going until they're gone.",
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
"text": "Want to get on top of your spending?",
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
"text": "If small monthly payments are quietly adding up, a ",
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
"text": " helps you see where your money is going and build a plan you can stick to.",
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
"text": "This article is for education only and is not financial or legal advice. Luca Caruana is a Certified Money Coach (CMC®). Money Coaching Hub does not sell financial products. Based on a reader question first answered in Luca's Money Coach column in the Times of Malta. Source on the new EU rules: ",
"format": 2,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "link",
"fields": {
"linkType": "custom",
"url": "https://businessnow.mt/new-eu-rules-set-to-reshape-consumer-credit-market-by-2026-macm-warns/",
"newTab": true
},
"format": "",
"indent": 0,
"version": 3,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "BusinessNow",
"format": 2,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
]
},
{
"type": "text",
"text": ".",
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
"key": "c-table",
"alt": "Table: paying in full costs €2,000 and leaves no cash from that €2,000; buy now, pay later costs €2,565 in total, €565 extra (about 28%), but keeps €2,000 in the bank as a buffer.",
"data": "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"
}
],
"wide": "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",
"share": "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"
},
{
"slug": "husband-gambling-what-now",
"category": "family-budgeting",
"when": "2026-11-21T06:00:00.000Z",
"title": "I found my husband's gambling bets. What now?",
"excerpt": "€11,000 in bets on a husband's bank statement. The practical steps to protect your family's money this week, the questions to ask, and where to find help in Malta.",
"meta_title": "I found my husband's gambling bets. What now? | Money Coaching Hub",
"meta_desc": "Found gambling transactions on your partner's statement? How to protect joint accounts and savings, what to ask, and where families can get support in Malta.",
"alt_wide": "A woman at a table reviewing a bank statement with highlighted lines, beside a locked bank card",
"alt_share": "I found my husband's gambling bets. What now? Luca Caruana, Certified Money Coach",
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
"text": " protect the essentials first, keep only a working balance in the joint account, lower its limits, and move savings for your children somewhere only you can access. Pause any big financial decisions, like a new loan. Then have the hard conversation, and get support for yourself too. In Malta, Supportline 179 can put you in touch with Sedqa, which also helps families.",
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
"text": "She was gathering bank statements for a loan. She and her husband wanted to buy a second property to rent out.",
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
"text": "Then she saw them. Several transactions to gambling companies. No less than €11,000.",
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
"text": "The last time she'd seen anything like it was ten years earlier, when it had almost led them to financial ruin. She thought it was over.",
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
"text": "When she asked him, he was quiet for a while. Then he said: \"It's under control. It's only a small part of what I earn.\"",
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
"text": "What she couldn't say out loud was her real fear. Ten years ago, when his own account wasn't enough, the joint account was next.",
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
"text": "I answered her in my ",
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
"url": "https://timesofmalta.com/article/i-found-11000-bets-husband-bank-statement-now.1137025",
"newTab": true
},
"format": "",
"indent": 0,
"version": 3,
"direction": "ltr",
"children": [
{
"type": "text",
"text": "Times of Malta column",
"format": 0,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
}
]
},
{
"type": "text",
"text": ". This article goes deeper into what you can do, step by step, if you're in the same place.",
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
"text": "Firstly, protect what you can control this week",
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
"text": "You can't control his gambling. You can control how exposed your family's money is. These steps aren't about punishment. They're about making sure one bad night can't undo years of work.",
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
"text": "Keep the joint account to a working balance.",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " Only what's needed for groceries, bills and loan repayments. Nothing more sitting there.",
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
"text": "Lower the daily limits",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " on the joint account and any shared cards. Your bank can help you do this quickly.",
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
"text": "Move savings for your children",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " into an account in your name only, so they can't be moved without you.",
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
"text": "Keep your own salary in your own account,",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " and transfer your share of household costs from there.",
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
"text": "Turn on notifications",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " for every transaction on shared accounts, so nothing goes unseen.",
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
"text": "None of this cuts him off. He still has his own income. It simply means the family's foundations are no longer within reach of the next bet.",
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
"id": "imgdchecklist",
"fields": null,
"relationTo": "media",
"value": "__IMG_d-checklist__"
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
"text": "Pause the big decisions",
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
"text": "This is the hard one. If you're about to take on a new loan, a second property or any big financial commitment, pause it.",
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
"text": "A bank reviewing those statements will likely ask the same questions you're asking. And a rental property can wait a year. What you're trying to protect can't wait that long.",
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
"text": "The questions that tell you more than \"it's under control\"",
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
"text": "\"It's under control\" is what almost everyone says. His actions will tell you more than his words. Ask him:",
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
"text": "Will you let me see your account from now on?",
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
"text": "Will you register on the Malta Gaming Authority's self-barring system?",
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
"text": "Will you install gambling-blocking software on your phone?",
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
"text": "Will you speak to someone who specialises in gambling problems?",
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
"text": "If the answers are yes, that's a real start. If they're no, that's information too.",
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
"text": "Help exists in Malta, and it's for you as well",
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
"text": "You don't have to carry this alone, and you don't need his permission to get support.",
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
"text": "Supportline 179",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " is Malta's national helpline. Ask for Sedqa's gambling service. Sedqa supports families, even if the person gambling won't seek help.",
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
"text": "The Responsible Gaming Foundation",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " can help with registering on the self-barring system.",
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
"text": "The Malta Gaming Authority",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " runs self-exclusion and self-barring, and recommends blocking software for online gambling.",
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
"text": "Caritas Malta",
"format": 1,
"detail": 0,
"mode": "normal",
"style": "",
"version": 1
},
{
"type": "text",
"text": " also runs support groups for people affected by gambling.",
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
"text": "What money steps can't fix",
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
"text": "Before I close, one honest thing. You can protect your bank balance. You can't protect a marriage that way.",
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
"text": "If he hides money from you, and you start hiding money from him, you end up with two people managing the same problem alone, in the same house. The practical steps buy you time and safety. They will never replace a real, adult conversation between the two of you, ideally with professional support in the room.",
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
"text": "Can my husband take money from our joint account without me knowing?",
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
"text": "Usually, yes. Either holder can normally withdraw from a joint account. That's why keeping only a working balance there, with lower limits and notifications, matters.",
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
"text": "What is self-barring in Malta?",
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
"text": "It's a system that blocks a person from gambling at land-based venues such as casinos and gaming parlours. For online gambling, players can self-exclude with licensed websites and use blocking software. The Malta Gaming Authority and the Responsible Gaming Foundation can help with the process.",
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
"text": "Where can families get help with gambling in Malta?",
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
"text": "Call Supportline 179 and ask for Sedqa's gambling service, which supports family members too. Caritas Malta and the Responsible Gaming Foundation also offer support.",
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
"text": "Should we still apply for a loan?",
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
"text": "It's wise to pause any new borrowing until things are stable and you both have full visibility of the household finances.",
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
"text": "You don't have to work this out alone",
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
"text": "If money and trust have become tangled at home, a ",
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
"text": " gives you a calm space to plan the practical steps. For the gambling itself, please speak to the specialists listed above.",
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
"text": "This article is for education only and is not financial, legal or medical advice. Luca Caruana is a Certified Money Coach (CMC®). Based on a reader question first answered in Luca's Money Coach column in the Times of Malta.",
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
"key": "d-checklist",
"alt": "Checklist for this week: keep only a working balance in the joint account, lower daily limits, move the children's savings into your name, keep your salary in your own account, turn on notifications, pause any new loan. Support in Malta: Supportline 179.",
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
    const post = await payload.create({
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
