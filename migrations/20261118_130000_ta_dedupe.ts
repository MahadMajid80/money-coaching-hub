import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'
import { claimMigration } from '../lib/cms/migrationLock'

// Technical Analysis Bootcamp: the previous update ran twice at once on deploy and doubled every list.
// This writes each list once, with the correct content. Only one server instance runs it (claimMigration).

const NAME = '20261118_130000_ta_dedupe'

const data = {
  "intro": {
    "title": "Why this bootcamp exists",
    "paras": [
      "Most people don't struggle because they can't find information. They struggle because charts feel overwhelming, everything sounds too technical, and emotions take over when price moves.",
      "This bootcamp is designed to give you clarity, structure, and confidence, without jargon. It is not a webinar: it's capped at 15 people so questions are encouraged, charts are reviewed live and everyone gets proper value."
    ]
  },
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
  "included": [
    {
      "title": "2 live sessions",
      "text": "Two 2-hour evenings on Zoom, 7:30–9:30pm (Malta time)."
    },
    {
      "title": "Small group, max 15",
      "text": "So charts are reviewed live and every question gets answered."
    },
    {
      "title": "Live chart walkthroughs",
      "text": "Real charts, read together on screen, step by step."
    },
    {
      "title": "Homework with feedback",
      "text": "Practise on real charts after session one, then review it together in session two."
    },
    {
      "title": "Both sessions recorded",
      "text": "Watch again anytime to lock in what you learned."
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
    },
    {
      "name": "Carmelo Romano",
      "role": "CTO",
      "text": "Unlike a traditional financial advisor, Luca does not dictate investment choices; instead, he expertly opens up a world of possibilities, enabling me to make informed decisions about my savings."
    }
  ]
} as const

const lines = (a: readonly string[]) => a.map((text) => ({ text }))

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  try {
    if (!(await claimMigration(db, NAME))) return
    const course = (
      await payload.find({ collection: 'courses', where: { slug: { equals: 'technical-analysis-bootcamp' } }, limit: 1, depth: 0, req })
    ).docs[0] as any
    if (!course) return
    await payload.update({
      collection: 'courses',
      id: course.id,
      data: {
        intro: { title: data.intro.title, paras: lines(data.intro.paras) },
        forYou: { title: data.forYou.title, note: data.forYou.note, items: lines(data.forYou.items) },
        sessions: data.sessions.map((s: any) => ({ title: s.title, meta: s.meta, outcome: s.outcome ?? null, points: lines(s.points) })),
        included: data.included.map((i) => ({ title: i.title, text: i.text })),
        instructor: lines(data.instructor),
        testimonials: data.testimonials.map((t: any) => ({ text: t.text, name: t.name, role: t.role ?? null })),
      } as any,
      depth: 0,
      req,
    })
  } catch (err) {
    payload.logger.error({ err }, `${NAME} failed`)
  }
}

export async function down(_: MigrateDownArgs): Promise<void> {}
