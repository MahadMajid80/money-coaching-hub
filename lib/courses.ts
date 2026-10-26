// All course content lives here. To open a course for booking, set `status: "open"`,
// fill in `dates`, and set `checkout` to its Stripe payment link.

export type Session = { title: string; meta?: string; points: string[]; outcome?: string };

export type Course = {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  eyebrow: string;
  status: "open" | "waitlist";
  dates: string; // shown in the booking card
  format: string;
  time: string;
  price: string;
  priceNote?: string;
  seats?: string;
  checkout?: string; // Stripe payment link
  ctaLabel: string;
  intro: { title: string; paras: string[] };
  forYou: { title: string; items: string[]; note?: string };
  sessionsTitle: string;
  sessionsNote?: string;
  sessions: Session[];
  included?: { title: string; text: string }[];
  includedValue?: string;
  instructor: string[];
  testimonials: { text: string; name: string; role?: string }[];
  faqs?: { q: string; a: string }[];
  disclaimer: string;
};

const DISCLAIMER =
  "Education, not advice. Luca Caruana is a Certified Money Coach (CMC®), not a licensed investment adviser, and Money Coaching Hub is not a regulated investment firm. No financial products are sold and nothing on this course is a personal recommendation.";

export const courses: Course[] = [
  {
    slug: "investing-made-simple",
    name: "Investing Made Simple",
    short: "Four live evenings on how to invest your own money",
    tagline: "Four live evenings on how to invest your own money, taught by someone who has nothing to sell you.",
    eyebrow: "Bestselling course · Taught in Maltese",
    status: "open",
    dates: "Starts Monday 11 January 2027",
    format: "4 live sessions on Zoom",
    time: "Mondays, 7:30–8:30pm CET",
    price: "€175",
    seats: "Strictly 20 seats",
    // TODO: confirm this Stripe link is set up for the January 2027 cohort at €175.
    checkout: "https://buy.stripe.com/aFadR98Hm0nFcEsgs25os0h",
    ctaLabel: "Take your seat",
    intro: {
      title: "You are not bad with money. You are just waiting for permission.",
      paras: [
        "Most people who come to me are not reckless. They are careful. Careful to the point of paralysis. The money sits in the account, the years go by, and the decision never gets made.",
        "No experience needed. This course starts where you actually are, not where a textbook assumes you are.",
      ],
    },
    forYou: {
      title: "See if any of this sounds like you",
      items: [
        "You earn well, but the money is sitting in a bank account doing nothing",
        "You tried investing once, it went badly, and you have not gone back",
        "Everyone giving you advice also happens to be selling you something",
        "You feel like you should understand this by now, and you do not",
        "You want to build something slowly, not gamble",
      ],
    },
    sessionsTitle: "The four evenings",
    sessionsNote: "Mondays, 7:30pm to 8:30pm CET. Live on Zoom. Every session is recorded: miss one and you keep the recording for good. The order matters, so we build it in sequence.",
    sessions: [
      {
        title: "The investment landscape",
        points: [
          "Which platforms to use, and which to walk away from",
          "Stocks, ETFs, bonds, crypto and commodities, explained in plain language",
          "How each one actually behaves when markets move",
          "What diversification means beyond the buzzword",
        ],
      },
      {
        title: "Beyond the index fund",
        points: [
          "What most beginner courses stop short of teaching",
          "Sector and thematic investing, and where it goes wrong",
          "How to evaluate a theme without falling for the story",
          "Worked portfolio examples, including my own",
        ],
      },
      {
        title: "The psychology of investing",
        points: [
          "Why your emotions cost you more than your fees",
          "The behavioural traps that catch almost everyone",
          "What to do on the day everything drops",
          "Building the discipline to do nothing",
        ],
      },
      {
        title: "Putting it together",
        points: [
          "Applying the framework to your own situation",
          "Templates you can start using that night",
          "Your own written investing roadmap",
          "The mistakes I made so you do not have to",
        ],
      },
    ],
    included: [
      { title: "4 live sessions", text: "One hour each, Mondays on Zoom. Questions answered as we go." },
      { title: "Lifetime recordings", text: "Every session recorded and yours to keep, permanently." },
      { title: "Private 1:1 with Luca", text: "Thirty minutes on your own situation, after the course ends." },
      { title: "Investment templates", text: "The same worksheets used in coaching sessions." },
      { title: "The investing book", text: "Written for European investors, not American ones." },
      { title: "The MoneyHub community", text: "Ongoing access to Luca's private group and daily market notes." },
    ],
    instructor: [
      "Certified Money Coach. Over 300 private clients. Workshops delivered to more than a thousand people, at HSBC, PwC and others. Money columnist in the Times of Malta.",
      "I am not a broker. I do not sell financial products. I teach people how to think. Nobody in this course is going to be nudged towards a fund because it pays a commission, because there is no commission. There is a course fee and that is the entire commercial relationship.",
      "What you get instead is four evenings with someone who invests his own money, has made his own expensive mistakes, and will show you both.",
    ],
    testimonials: [
      {
        name: "Valerie Vella",
        text: "He has a fantastic ability to simplify complex financial concepts, making them easy to understand even if you're a complete beginner. Luca is incredibly approachable, patient, and uses great real-life examples that really help everything click. If you've been intimidated by investing, this is the course for you.",
      },
      {
        name: "Louise Attard Refalo",
        text: "The content was well structured, easy to follow, and relevant to both beginners and those with some prior financial knowledge. I particularly appreciated the real-life examples and interactive discussions, which helped me better understand investment strategies and risk management.",
      },
      {
        name: "Bernard Busuttil",
        text: "On his newspaper column, Luca comes across as a nice guy. In person he is lovely. He is patient, passes on his knowledge using simple, everyday language, and is highly receptive to questions from his audience.",
      },
      { name: "Marianne Zammit", text: "His course helped me understand the world of investments and helped build my confidence. I learned a lot, well done." },
      {
        name: "Kieran Vella",
        text: "Luca is very professional, knowledgeable, and trustworthy. He makes complex topics like crypto and investing easy to understand, especially for beginners.",
      },
      {
        name: "Alexander Pace",
        text: "When you are learning, you need someone to come down to your level, especially when you are new. I recommend anyone who wants to learn to do a course with Luca. You can only gain in knowledge. 10/10",
      },
    ],
    faqs: [
      {
        q: "Is this financial advice?",
        a: "No, and this matters. Luca is a Certified Money Coach, not a licensed investment adviser, and Money Coaching Hub is not a regulated investment firm. Everything taught is general financial education. You will learn how different instruments work, how to assess them and how to build a framework, but nobody will tell you what to buy, and no products are sold at any point.",
      },
      {
        q: "I know nothing about investing. Will I be lost?",
        a: "No. Session one starts from the beginning, with no assumed knowledge. Most people who take this course have never bought a single share. The ones who have some experience tend to find the psychology session the most useful, because that is the part nobody teaches them.",
      },
      {
        q: "What if I cannot make a Monday?",
        a: "Every session is recorded and sent out afterwards, and you keep those recordings for good. You can also send questions in advance and they will be answered live. That said, the live sessions are where the value is, so come if you can.",
      },
      {
        q: "Why only 20 people?",
        a: "Because past 20, it stops being a conversation and becomes a webinar. The whole format depends on being able to stop and answer a real question from a real person. When the twenty seats are gone, they are gone until the next cohort.",
      },
      {
        q: "What exactly is the 1:1 session?",
        a: "Thirty minutes with Luca, one to one, booked after the course finishes. It is your time to bring your own situation. It is still coaching rather than regulated advice, so it is about helping you think clearly, not telling you where to put your money.",
      },
      {
        q: "Is it relevant for European investors?",
        a: "Yes. The course is built around European platforms and European investors, which is deliberate, because most investing content online assumes you are American and can buy things you cannot actually access.",
      },
    ],
    disclaimer: DISCLAIMER,
  },
  {
    slug: "crypto-made-simple-the-online-course",
    name: "Crypto Made Simple",
    short: "From confusion to confidence in 4 weeks",
    tagline: "From confusion to confidence in four weeks: a practical, interactive journey into the future of finance.",
    eyebrow: "Online course · 4 live sessions",
    status: "waitlist",
    dates: "Next cohort: dates coming soon",
    format: "4 live sessions on Zoom",
    time: "Mondays, 7:30–8:30pm CET",
    price: "€149.99",
    priceNote: "All 4 sessions, lifetime recordings and bonus resources",
    checkout: "https://buy.stripe.com/4gMbJ15va6M3fQEb7I5os08",
    ctaLabel: "Reserve your spot",
    intro: {
      title: "Understand crypto without the hype",
      paras: [
        "After years of studying both traditional and digital assets, Luca combines financial coaching with practical crypto insights to make the world of money simple, approachable, and real.",
        "All sessions are recorded, so you can watch anytime.",
      ],
    },
    forYou: {
      title: "This course is perfect for",
      items: [
        "Beginners curious about crypto but unsure where to start",
        "Investors wanting to diversify beyond stocks and property",
        "Anyone who wants to understand the trends shaping the future of money",
      ],
    },
    sessionsTitle: "What you'll learn",
    sessions: [
      {
        title: "Understanding crypto: the basics",
        points: [
          "What cryptocurrency is and why it matters",
          "The difference between Bitcoin, Ethereum and altcoins",
          "Why investors are turning to crypto as “digital gold”",
          "How to buy your first crypto safely",
          "The best exchanges to use and how to start small",
          "Pros and cons of crypto investing",
        ],
        outcome: "You'll walk away with your first crypto account set up, and a clear understanding of how the system works.",
      },
      {
        title: "Smarter strategies: AI, wallets & airdrops",
        points: [
          "AI bots in crypto: how automation can work for (or against) you",
          "Long-term vs short-term investing: finding your fit",
          "The 4-year crypto cycle explained",
          "How to create and protect your digital wallet",
          "Airdrop farming 101: how early users get rewarded",
        ],
        outcome: "You'll learn how to use AI tools and wallet systems safely while discovering practical ways to grow your portfolio.",
      },
      {
        title: "Staying safe: avoiding scams & pitfalls",
        points: [
          "How to identify common scams, rug pulls and fake projects",
          "The psychology of FOMO and herd mentality",
          "Why most traders lose money and how to avoid their mistakes",
          "Real-life examples of what to watch out for",
        ],
        outcome: "You'll gain the confidence to protect your investments and spot red flags before they cost you.",
      },
      {
        title: "The future: narratives, trends & your portfolio",
        points: [
          "The big narratives driving the next bull run",
          "How to use X (Twitter) and key websites for real-time updates",
          "Portfolio diversification: balancing blue chips, altcoins and memecoins",
          "How to build your crypto portfolio step by step",
        ],
        outcome: "You'll finish with your own personalised strategy, and the confidence to navigate the crypto space.",
      },
    ],
    included: [
      { title: "4 live sessions", text: "One hour each, on Zoom, with live Q&A." },
      { title: "Lifetime recordings", text: "Watch anytime, and keep them for good." },
      { title: "Bonus resources", text: "Extra material to keep learning after the course." },
    ],
    instructor: [
      "Luca Caruana, Certified Money Coach (CMC)®, founder of Money Coaching Hub and Monipal, has helped hundreds of professionals and investors make smarter, more human financial decisions.",
    ],
    testimonials: [
      {
        name: "Kieran Vella",
        text: "Luca is very professional, knowledgeable, and trustworthy. He makes complex topics like crypto and investing easy to understand, especially for beginners. Highly recommend his courses and coaching sessions.",
      },
      {
        name: "Carmelo Romano",
        role: "CTO",
        text: "Unlike a traditional financial advisor, Luca does not dictate investment choices; instead, he expertly opens up a world of possibilities, enabling me to make informed decisions about my savings.",
      },
      {
        name: "Chris Cascun",
        role: "CTO",
        text: "He did very well at explaining the missing gaps, and providing insights on the tools and strategies to use for investing and the way to look at finances.",
      },
    ],
    disclaimer: DISCLAIMER,
  },
  {
    slug: "crypto-masterclass",
    name: "Crypto Masterclass",
    short: "From beginner to smart investor",
    tagline: "A 90-minute live masterclass to give you the tools and confidence to invest in crypto smarter.",
    eyebrow: "Free live masterclass",
    status: "waitlist",
    dates: "Next masterclass: date coming soon",
    format: "Live on Zoom, 90 minutes",
    time: "7:30pm CET",
    price: "Free",
    priceNote: "Seats are limited to keep the session interactive",
    ctaLabel: "Book your spot",
    intro: {
      title: "Why join this masterclass?",
      paras: [
        "Crypto is hot again. But while everyone is rushing in, most people don't know how to protect their money. That's where this session comes in.",
        "Whether you're just starting out or want to sharpen your strategy, this live masterclass will give you the tools and confidence to invest smarter.",
      ],
    },
    forYou: {
      title: "Who should attend?",
      items: [
        "Beginners who want a safe introduction to crypto",
        "Investors looking to avoid hype-driven mistakes",
        "Anyone curious about building wealth in the fastest-growing market today",
      ],
    },
    sessionsTitle: "What you'll learn",
    sessions: [
      {
        title: "In one live session",
        points: [
          "The essentials of crypto, simplified, without the jargon",
          "Latest updates: where the market is heading and why it matters",
          "How to invest safely and avoid the traps that wreck beginners",
          "Proven strategies to build long-term wealth in a volatile market",
          "A clear action plan you can start applying immediately",
        ],
      },
    ],
    instructor: [
      "Luca Caruana has coached hundreds of clients and spoken to thousands about money and investing. He blends practical strategies with personal stories, making complex topics simple and relatable. Luca is also the founder of Money Coaching Hub and Monipal, two platforms dedicated to financial wellbeing.",
    ],
    testimonials: [
      {
        name: "Carmelo Romano",
        role: "CTO",
        text: "Unlike a traditional financial advisor, Luca does not dictate investment choices; instead, he expertly opens up a world of possibilities, enabling me to make informed decisions about my savings.",
      },
      {
        name: "Chris Cascun",
        role: "CTO",
        text: "He did very well at explaining the missing gaps, and providing insights on the tools and strategies to use for investing and the way to look at finances.",
      },
      {
        name: "Hannah Cremona",
        role: "Entrepreneur",
        text: "He was able to give me practical and easy-to-implement solutions with a structure that I can repeat.",
      },
    ],
    disclaimer: DISCLAIMER,
  },
  {
    slug: "technical-analysis-bootcamp",
    name: "Technical Analysis Bootcamp",
    short: "Read charts with clarity, not hype",
    tagline: "A practical, stripped-back approach to chart reading. No signals. No hype. Just understanding price.",
    eyebrow: "Live online bootcamp · 2 sessions",
    status: "waitlist",
    dates: "Next bootcamp: dates coming soon",
    format: "2 live sessions, 2 hours each",
    time: "7:30–9:30pm (Malta time)",
    price: "€150",
    priceNote: "Both sessions recorded",
    seats: "Strictly limited to 15 people",
    checkout: "https://buy.stripe.com/9B68wPaPu3zRawk1x85os0b",
    ctaLabel: "Book your spot",
    intro: {
      title: "Why this bootcamp exists",
      paras: [
        "Most people don't struggle because they can't find information. They struggle because charts feel overwhelming, everything sounds too technical, and emotions take over when price moves.",
        "This bootcamp is designed to give you clarity, structure, and confidence, without jargon. It is not a webinar: it's capped at 15 people so questions are encouraged, charts are reviewed live and everyone gets proper value.",
      ],
    },
    forYou: {
      title: "What you'll learn",
      items: [
        "Support & resistance (zones, not lines)",
        "Candlesticks (reading buyer vs seller behaviour)",
        "Moving averages (trend clarity, not predictions)",
        "Fibonacci: when it works, and when it doesn't",
        "How to combine everything into a simple decision framework",
      ],
      note: "No signals. No hype. Just understanding price.",
    },
    sessionsTitle: "How it works",
    sessions: [
      {
        title: "Market structure & price behaviour",
        meta: "2 hours",
        points: ["How technical analysis actually works", "Support & resistance done properly", "Candlesticks explained simply", "Live chart walkthroughs", "Homework to practise on real charts"],
      },
      {
        title: "Refining decisions & putting it all together",
        meta: "2 hours",
        points: [
          "Review of homework & common mistakes",
          "Moving averages and trend confirmation",
          "Fibonacci used cleanly and realistically",
          "Building a simple, repeatable framework",
          "Risk basics to avoid emotional decisions",
        ],
      },
    ],
    instructor: [
      "Luca has been studying technical analysis for over 10 years across different market cycles. But more importantly: he teaches without jargon, focuses on understanding, not prediction, and explains complex ideas in a calm, practical way.",
      "This isn't trader hype. It's education designed to help you trust yourself when reading charts.",
    ],
    testimonials: [
      {
        name: "Chris Cascun",
        role: "CTO",
        text: "I already had some good knowledge of the subjects discussed but he did very well at explaining the missing gaps, and providing insights on the tools and strategies to use for investing.",
      },
      {
        name: "Kieran Vella",
        text: "Luca is very professional, knowledgeable, and trustworthy. He makes complex topics easy to understand, especially for beginners.",
      },
      { name: "Clayton Camilleri", text: "Very informative course with clear explanations and well-prepared materials." },
    ],
    disclaimer: DISCLAIMER,
  },
  {
    slug: "money-management-masterclass",
    name: "Money Management Masterclass",
    short: "Most people earn enough. They just don't know where it goes.",
    tagline: "A 90-minute live masterclass, a tool you'll use for years, and a group accountability call with real coaching on your real numbers.",
    eyebrow: "Live masterclass + accountability call",
    status: "waitlist",
    dates: "Next masterclass: date coming soon",
    format: "90-minute live masterclass",
    time: "7:30–9:00pm CET",
    price: "€99",
    priceNote: "Total value €250+",
    ctaLabel: "Secure your spot",
    intro: {
      title: "Most people earn enough. They just don't know where it goes.",
      paras: [
        "You work hard. You earn a decent salary. And yet, at the end of the month, you're not sure where it all went.",
        "Here's the uncomfortable truth: no amount of earning more will fix a spending plan that doesn't exist. The problem isn't your income. It's the fact that nobody ever taught you how to manage it. This masterclass changes that.",
      ],
    },
    forYou: {
      title: "Is this you?",
      items: [
        "You earn well but still feel like money slips through your fingers",
        "You've tried budgeting before and it lasted two weeks",
        "You and your partner argue about money more than you'd like to admit",
        "You have debt you're embarrassed about",
        "You know you should be saving more, but life keeps getting in the way",
        "You feel guilty every time you spend, but also when you save",
        "You want to invest, but you know your foundation isn't in place yet",
      ],
      note: "No spreadsheets. No judgment. No complicated systems. No prior financial knowledge needed: this starts from zero.",
    },
    sessionsTitle: "Here's what you'll learn",
    sessionsNote: "The 90-minute session, in six parts. The masterclass is recorded, with lifetime access included.",
    sessions: [
      {
        title: "Why most people are bad with money, and it's not their fault",
        points: ["How your upbringing shaped your money habits", "Why earning more rarely solves the problem"],
        outcome: "You'll finally understand your own money behaviour and stop blaming yourself for it.",
      },
      {
        title: "Where your money actually goes",
        points: ["The money audit: tracking without guilt", "Fixed vs variable expenses: the difference that changes everything", "How to spot your money leaks, including the ones you don't notice"],
        outcome: "You'll see, probably for the first time, exactly what's happening to your money every month.",
      },
      {
        title: "Building your Intentional Spending Plan",
        points: [
          "Live walkthrough of the Intentional Spending Planner template",
          "Why this is NOT a budget, and why that matters",
          "The 4 buckets: Needs / Wants / Savings / Future You",
          "Setting real numbers for your real life",
        ],
        outcome: "You'll leave with a completed plan you can actually follow, not one that makes you feel like a failure by week two.",
      },
      {
        title: "Saving, the right way",
        points: ["Why the emergency fund comes before everything else", "How much to save and where to put it", "Automating savings so willpower isn't required"],
        outcome: "You'll have a savings system that works even when motivation runs out.",
      },
      {
        title: "Debt: getting out and staying out",
        points: [
          "Good debt vs bad debt: the honest version",
          "The two methods for paying it down, and which suits your personality",
          "Buy Now Pay Later: the silent budget killer",
          "How to stop a debt cycle without the shame",
        ],
        outcome: "You'll have a clear, realistic debt plan and the mindset to stick to it.",
      },
      {
        title: "The money mindset shift",
        points: ["Spending with intention, not guilt", "How to talk about money with a partner", "What financial freedom actually feels like day-to-day"],
        outcome: "You'll walk away with a completely different relationship with money.",
      },
      {
        title: "Bonus: the group accountability call",
        meta: "2–3 weeks after the masterclass",
        points: [
          "Quick recap of the key principles (10 mins)",
          "Group sharing: participants present their planner and what they discovered (30–35 mins)",
          "Live coaching from Luca on real situations",
          "Your 90-day action plan: what to do next (15 mins)",
        ],
        outcome: "Accountability, clarity, and a concrete next step, with a room full of people doing the same thing.",
      },
    ],
    included: [
      { title: "90-minute live masterclass", text: "Recorded, with lifetime access." },
      { title: "The Intentional Spending Planner", text: "A fillable template covering income, expenses, savings gaps, debt, and your 90-day financial intention." },
      { title: "Group accountability call", text: "Live coaching on your real numbers, not hypotheticals, 2–3 weeks after the masterclass." },
      { title: "Luca's Money Hub community", text: "150+ members. Ongoing support, weekly market updates, and a community that talks about money honestly." },
    ],
    includedValue: "Total value €250+. Today: €99.",
    instructor: [
      "Luca Caruana is a Certified Money Coach (CMC)® and one of the leading voices in financial education in Malta and across Europe. He has coached over 300 clients one-on-one, delivered workshops to 1,000+ participants, and spoken at organisations including HSBC and PwC.",
      "He is not a bank. He is not a broker. He does not sell financial products. He is someone who has sat across from hundreds of people who earn well, feel confused about money, and are too embarrassed to admit it. This masterclass is built on everything he has learned from those conversations.",
    ],
    testimonials: [
      {
        name: "Laura Zahra",
        role: "HR Manager",
        text: "Not only is he an expert on the topic, but he is able to explain principles in the simplest of ways and makes discussions around finances less awkward and uncomfortable.",
      },
      { name: "Hannah Cremona", role: "Entrepreneur", text: "He was able to give me practical and easy-to-implement solutions with a structure that I can repeat." },
      {
        name: "Nicole Mangion",
        role: "HR Executive, Alf Mizzi & Sons",
        text: "Luca was very easy to work with, and the workshop itself was very well-structured. Useful supporting material was also provided to all attendees.",
      },
    ],
    disclaimer:
      "Luca Caruana is a Certified Money Coach, not a licensed financial advisor. This masterclass is educational in nature and does not constitute personal financial advice.",
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug)!;
