import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

// January 2027 dates:
// - Crypto Made Simple: 6 and 13 January 2027, now 2 sessions of 2 hours each.
// - Technical Analysis Bootcamp: 8 and 15 January 2027.
// Both courses also get their FAQ ("The questions people actually ask.") filled in,
// and the homepage course cards get the new dates.

const lines = (a: readonly string[]) => a.map((text) => ({ text }))

const cryptoSessions = [
  {
    title: 'Crypto basics, and smarter strategies',
    meta: 'Wednesday 6 January · 2 hours',
    points: [
      'What cryptocurrency is and why it matters',
      'The difference between Bitcoin, Ethereum and altcoins',
      'Why some investors call Bitcoin “digital gold”',
      'How exchanges work, how to choose one and how to start small',
      'How to create and protect your digital wallet',
      'Long-term vs short-term investing: finding your fit',
      'The 4-year crypto cycle explained',
    ],
    outcome: "You'll understand how the system works, know how to set up an exchange account and a wallet safely, and know which approach fits you.",
  },
  {
    title: 'Avoiding scams, and building your own portfolio',
    meta: 'Wednesday 13 January · 2 hours',
    points: [
      'How to spot common scams, rug pulls and fake projects',
      'AI bots and airdrop farming: what is real and what is hype',
      'FOMO, herd mentality, and why most traders lose money',
      'The big narratives driving the crypto market',
      'How to use X (Twitter) and key websites for real-time updates',
      'Diversification: balancing blue chips, altcoins and memecoins',
      'How to build a crypto portfolio step by step',
    ],
    outcome: "You'll finish with your own written plan, and the confidence to navigate the crypto space on your own.",
  },
] as const

const cryptoFaqs = [
  {
    q: 'Is this financial advice?',
    a: 'No. Luca is a Certified Money Coach, not a licensed investment adviser, and Money Coaching Hub is not a regulated investment firm. Everything taught is general education. You will learn how crypto works, how to assess it and how to protect yourself, but nobody will tell you which coins to buy, and no products are sold at any point.',
  },
  {
    q: 'I know nothing about crypto. Will I be lost?',
    a: 'No. The first session starts from zero, with no assumed knowledge. It is built for people who are curious but unsure where to start, and questions are welcome throughout.',
  },
  {
    q: 'How long is each session?',
    a: 'Two hours each, from 7:30pm to 9:30pm (Malta time), on Wednesday 6 and Wednesday 13 January 2027. Each evening mixes teaching with live Q&A.',
  },
  {
    q: 'What if I cannot make one of the evenings?',
    a: 'Both sessions are recorded and you keep the recordings for life, so you can catch up anytime. The live sessions are where you can ask your own questions, so come if you can.',
  },
  {
    q: 'Do I need money to invest before joining?',
    a: 'No. You do not need to buy anything to take the course. Crypto is volatile, so a large part of the course is about risk, scams and starting small, and understanding those before you put a cent in.',
  },
  {
    q: 'Which language is it taught in?',
    a: 'The course is taught in Maltese.',
  },
] as const

const taFaqs = [
  {
    q: 'Is this for complete beginners?',
    a: 'Yes. It is an intro-level bootcamp and deliberately kept simple, so you are not overloaded. If you have looked at a chart and felt lost, this is for you.',
  },
  {
    q: 'Will you give trading signals or tell me what to buy?',
    a: 'No. No signals and no hype. Luca is a Certified Money Coach, not a licensed investment adviser, and Money Coaching Hub is not a regulated investment firm. The bootcamp teaches you how to read price for yourself. It is education, not advice.',
  },
  {
    q: 'When are the sessions?',
    a: 'Two live sessions of two hours each, from 7:30pm to 9:30pm (Malta time), on Friday 8 and Friday 15 January 2027.',
  },
  {
    q: 'Why is it limited to 15 people?',
    a: 'Because it is not a webinar. A small group means charts are reviewed live, questions are encouraged and everyone gets proper attention.',
  },
  {
    q: 'What if I miss a session?',
    a: 'Both sessions are recorded, so you can catch up. There is homework after the first session, which is reviewed together in the second, so it is worth attending live if you can.',
  },
] as const

async function safely(label: string, payload: MigrateUpArgs['payload'], fn: () => Promise<void>) {
  try {
    await fn()
  } catch (err) {
    payload.logger.error({ err }, `january_crypto_ta: ${label} failed`)
  }
}

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const find = async (slug: string) =>
    (await payload.find({ collection: 'courses', where: { slug: { equals: slug } }, limit: 1, depth: 0, req })).docs[0] as any

  await safely('crypto', payload, async () => {
    const course = await find('crypto-made-simple-the-online-course')
    if (!course) return
    const included = Array.isArray(course.included) ? course.included.map(({ id, ...rest }: any) => rest) : []
    if (included.length) included[0] = { title: '2 live sessions', text: 'Two 2-hour evenings on Zoom, with live Q&A.' }
    const hasFaqs = Array.isArray(course.faqs) && course.faqs.length > 0
    await payload.update({
      collection: 'courses',
      id: course.id,
      data: {
        dates: '6 and 13 January 2027',
        startDate: '2027-01-06T18:30:00.000Z',
        tagline: 'From confusion to confidence in two live evenings: a practical, interactive introduction to crypto.',
        format: '2 live online sessions, 2 hours each',
        time: '7:30–9:30pm (Malta time)',
        priceNote: 'Both sessions, lifetime recordings and bonus resources',
        sessionsTitle: 'Two sessions, one clear picture',
        sessions: cryptoSessions.map((s) => ({ ...s, points: lines(s.points) })),
        included,
        ...(hasFaqs ? {} : { faqs: cryptoFaqs.map((f) => ({ ...f })) }),
      } as any,
      depth: 0,
      req,
    })
  })

  await safely('technical analysis', payload, async () => {
    const course = await find('technical-analysis-bootcamp')
    if (!course) return
    const metas = ['Friday 8 January · 2 hours', 'Friday 15 January · 2 hours']
    const sessions = Array.isArray(course.sessions)
      ? course.sessions.map(({ id, points, ...rest }: any, i: number) => ({
          ...rest,
          meta: metas[i] ?? rest.meta,
          points: Array.isArray(points) ? points.map(({ id: _id, ...p }: any) => p) : [],
        }))
      : undefined
    const hasFaqs = Array.isArray(course.faqs) && course.faqs.length > 0
    await payload.update({
      collection: 'courses',
      id: course.id,
      data: {
        dates: '8 and 15 January 2027',
        startDate: '2027-01-08T18:30:00.000Z',
        ...(sessions ? { sessions } : {}),
        ...(hasFaqs ? {} : { faqs: taFaqs.map((f) => ({ ...f })) }),
      } as any,
      depth: 0,
      req,
    })
  })

  await safely('homepage cards', payload, async () => {
    const home = (await payload.findGlobal({ slug: 'page-home' as never, depth: 0, req })) as any
    const course = { ...(home?.course || {}) }
    let changed = false
    if (!course.text_13 || String(course.text_13).includes('December 2026')) {
      course.text_13 = 'Understand Bitcoin, Ethereum and the rest before you put a cent in. Next cohort: 6 and 13 January 2027.'
      changed = true
    }
    if (!course.text_21 || String(course.text_21).includes('December 2026')) {
      course.text_21 = 'Read a chart without the noise. Intro level, deliberately simple. 8 and 15 January 2027.'
      changed = true
    }
    if (changed) await payload.updateGlobal({ slug: 'page-home' as never, data: { course } as never, depth: 0, req })
  })
}

export async function down(_: MigrateDownArgs): Promise<void> {}
