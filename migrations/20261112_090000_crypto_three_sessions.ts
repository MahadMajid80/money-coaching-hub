import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

// Crypto Made Simple: merge the four session blocks into the three real dates (14, 16, 21 Dec).
const update = {
  "tagline": "From confusion to confidence in three live evenings: a practical, interactive introduction to crypto.",
  "format": "3 live online sessions",
  "priceNote": "All 3 sessions, lifetime recordings and bonus resources",
  "sessionsTitle": "Three sessions, one clear picture",
  "sessions": [
    {
      "title": "Crypto basics, and getting started safely",
      "meta": "Monday 14 December",
      "points": [
        "What cryptocurrency is and why it matters",
        "The difference between Bitcoin, Ethereum and altcoins",
        "Why some investors call Bitcoin “digital gold”",
        "How exchanges work, how to choose one and how to start small",
        "How to create and protect your digital wallet",
        "The pros and cons of crypto investing"
      ],
      "outcome": "You'll understand how the system works and know how to set up an exchange account and a wallet safely."
    },
    {
      "title": "Smarter strategies, and avoiding scams",
      "meta": "Wednesday 16 December",
      "points": [
        "Long-term vs short-term investing: finding your fit",
        "The 4-year crypto cycle explained",
        "AI bots in crypto: how automation can work for (or against) you",
        "Airdrop farming 101: how early users get rewarded",
        "How to spot common scams, rug pulls and fake projects",
        "FOMO, herd mentality, and why most traders lose money"
      ],
      "outcome": "You'll know the main strategies, and how to spot red flags before they cost you."
    },
    {
      "title": "The future, and your own portfolio",
      "meta": "Monday 21 December",
      "points": [
        "The big narratives driving the crypto market",
        "How to use X (Twitter) and key websites for real-time updates",
        "Diversification: balancing blue chips, altcoins and memecoins",
        "How to build a crypto portfolio step by step",
        "Real-life examples of what to watch out for"
      ],
      "outcome": "You'll finish with your own written plan, and the confidence to navigate the crypto space on your own."
    }
  ]
} as const

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const found = await payload.find({ collection: 'courses', where: { slug: { equals: 'crypto-made-simple-the-online-course' } }, limit: 1, depth: 0, req })
  const course = found.docs[0] as any
  if (!course) return
  const included = Array.isArray(course.included) ? course.included.map(({ id, ...rest }: any) => rest) : []
  if (included.length) included[0] = {"title": "3 live sessions", "text": "Three evenings on Zoom, with live Q&A."}
  await payload.update({
    collection: 'courses',
    id: course.id,
    data: { ...update, sessions: update.sessions.map((s) => ({ ...s, points: s.points.map((text) => ({ text })) })), included } as any,
    depth: 0,
    req,
  })
}

export async function down(_: MigrateDownArgs): Promise<void> {}
