import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

// Restores the Technical Analysis Bootcamp's topic list, sessions, instructor text and reviews,
// which came back empty after 20261118_090000_january_crypto_ta. Content matches the page as it was
// before that update, with the new January session labels. Writes everything in one update, then
// reads it back and retries if any list is still empty.

const data = {
  "forYou": {
    "title": "What you'll learn",
    "items": [
      "Support & resistance (zones, not lines)",
      "Candlesticks (reading buyer vs seller behaviour)",
      "Moving averages (trend clarity, not predictions)",
      "Fibonacci: when it works, and when it doesn't",
      "How to combine everything into a simple decision framework"
    ],
    "note": "No signals. No hype. Just understanding price."
  },
  "sessions": [
    {
      "title": "Market structure & price behaviour",
      "meta": "Friday 8 January · 2 hours",
      "points": [
        "How technical analysis actually works",
        "Support & resistance done properly",
        "Candlesticks explained simply",
        "Live chart walkthroughs",
        "Homework to practise on real charts"
      ]
    },
    {
      "title": "Refining decisions & putting it all together",
      "meta": "Friday 15 January · 2 hours",
      "points": [
        "Review of homework & common mistakes",
        "Moving averages and trend confirmation",
        "Fibonacci used cleanly and realistically",
        "Building a simple, repeatable framework",
        "Risk basics to avoid emotional decisions"
      ]
    }
  ],
  "instructor": [
    "Luca has been studying technical analysis for over 10 years across different market cycles. But more importantly: he teaches without jargon, focuses on understanding, not prediction, and explains complex ideas in a calm, practical way.",
    "This isn't trader hype. It's education designed to help you trust yourself when reading charts."
  ],
  "testimonials": [
    {
      "name": "Chris Cascun",
      "role": "CTO",
      "text": "I already had some good knowledge of the subjects discussed but he did very well at explaining the missing gaps, and providing insights on the tools and strategies to use for investing."
    },
    {
      "name": "Kieran Vella",
      "text": "Luca is very professional, knowledgeable, and trustworthy. He makes complex topics easy to understand, especially for beginners."
    },
    {
      "name": "Clayton Camilleri",
      "text": "Very informative course with clear explanations and well-prepared materials."
    }
  ]
} as const

const lines = (a: readonly string[]) => a.map((text) => ({ text }))

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const find = async () =>
    (await payload.find({ collection: 'courses', where: { slug: { equals: 'technical-analysis-bootcamp' } }, limit: 1, depth: 0, req })).docs[0] as any
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const course = await find()
      if (!course) return
      const ok =
        course.forYou?.items?.length && course.sessions?.length && course.instructor?.length && course.testimonials?.length
      if (ok) return
      await payload.update({
        collection: 'courses',
        id: course.id,
        data: {
          forYou: { title: data.forYou.title, note: data.forYou.note, items: lines(data.forYou.items) },
          sessions: data.sessions.map((s) => ({ title: s.title, meta: s.meta, points: lines(s.points) })),
          instructor: lines(data.instructor),
          testimonials: data.testimonials.map((t: any) => ({ text: t.text, name: t.name, role: t.role ?? null })),
        } as any,
        depth: 0,
        req,
      })
    } catch (err) {
      payload.logger.error({ err }, `restore_ta_content attempt ${attempt} failed`)
    }
  }
}

export async function down(_: MigrateDownArgs): Promise<void> {}
