import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

// Crypto Made Simple: restores the intro paragraphs and "This course is perfect for" list
// (emptied by 20261118_090000_january_crypto_ta) and adds Alexander Pace as a 4th review.
// All text lists are written together in one update, then read back and retried if any is empty.

const data = {
  "intro": {
    "title": "Understand crypto without the hype",
    "paras": [
      "After years of studying both traditional and digital assets, Luca combines financial coaching with practical crypto insights to make the world of money simple, approachable, and real.",
      "All sessions are recorded, so you can watch anytime."
    ]
  },
  "forYou": {
    "title": "This course is perfect for",
    "items": [
      "Beginners curious about crypto but unsure where to start",
      "Investors wanting to diversify beyond stocks and property",
      "Anyone who wants to understand the trends shaping the future of money"
    ]
  },
  "sessions": [
    {
      "title": "Crypto basics, and smarter strategies",
      "meta": "Wednesday 6 January · 2 hours",
      "points": [
        "What cryptocurrency is and why it matters",
        "The difference between Bitcoin, Ethereum and altcoins",
        "Why some investors call Bitcoin “digital gold”",
        "How exchanges work, how to choose one and how to start small",
        "How to create and protect your digital wallet",
        "Long-term vs short-term investing: finding your fit",
        "The 4-year crypto cycle explained"
      ],
      "outcome": "You'll understand how the system works, know how to set up an exchange account and a wallet safely, and know which approach fits you."
    },
    {
      "title": "Avoiding scams, and building your own portfolio",
      "meta": "Wednesday 13 January · 2 hours",
      "points": [
        "How to spot common scams, rug pulls and fake projects",
        "AI bots and airdrop farming: what is real and what is hype",
        "FOMO, herd mentality, and why most traders lose money",
        "The big narratives driving the crypto market",
        "How to use X (Twitter) and key websites for real-time updates",
        "Diversification: balancing blue chips, altcoins and memecoins",
        "How to build a crypto portfolio step by step"
      ],
      "outcome": "You'll finish with your own written plan, and the confidence to navigate the crypto space on your own."
    }
  ],
  "instructor": [
    "Luca Caruana, Certified Money Coach (CMC)®, founder of Money Coaching Hub and Monipal, has helped hundreds of professionals and investors make smarter, more human financial decisions."
  ],
  "testimonials": [
    {
      "name": "Kieran Vella",
      "text": "Luca is very professional, knowledgeable, and trustworthy. He makes complex topics like crypto and investing easy to understand, especially for beginners. Highly recommend his courses and coaching sessions."
    },
    {
      "name": "Carmelo Romano",
      "role": "CTO",
      "text": "Unlike a traditional financial advisor, Luca does not dictate investment choices; instead, he expertly opens up a world of possibilities, enabling me to make informed decisions about my savings."
    },
    {
      "name": "Chris Cascun",
      "role": "CTO",
      "text": "He did very well at explaining the missing gaps, and providing insights on the tools and strategies to use for investing and the way to look at finances."
    },
    {
      "name": "Alexander Pace",
      "text": "Finally I found a person that is very professional in his work and trustworthy. When you are learning about crypto, you need someone to go down to your level, especially when you are new. I recommend anyone that wants to learn, and maybe later invest themselves in crypto, to do a course with Luca. You can only gain in knowledge. 10/10"
    }
  ]
} as const

const lines = (a: readonly string[]) => a.map((text) => ({ text }))

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const find = async () =>
    (await payload.find({ collection: 'courses', where: { slug: { equals: 'crypto-made-simple-the-online-course' } }, limit: 1, depth: 0, req })).docs[0] as any
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const course = await find()
      if (!course) return
      const ok =
        course.intro?.paras?.length &&
        course.forYou?.items?.length &&
        course.sessions?.length === data.sessions.length &&
        course.sessions.every((s: any) => s.points?.length) &&
        course.instructor?.length &&
        course.testimonials?.length === data.testimonials.length
      if (ok) return
      await payload.update({
        collection: 'courses',
        id: course.id,
        data: {
          intro: { title: data.intro.title, paras: lines(data.intro.paras) },
          forYou: { title: data.forYou.title, items: lines(data.forYou.items) },
          sessions: data.sessions.map((s) => ({ title: s.title, meta: s.meta, outcome: s.outcome, points: lines(s.points) })),
          instructor: lines(data.instructor),
          testimonials: data.testimonials.map((t: any) => ({ text: t.text, name: t.name, role: t.role ?? null })),
        } as any,
        depth: 0,
        req,
      })
    } catch (err) {
      payload.logger.error({ err }, `restore_crypto_content attempt ${attempt} failed`)
    }
  }
}

export async function down(_: MigrateDownArgs): Promise<void> {}
