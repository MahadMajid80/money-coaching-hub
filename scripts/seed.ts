/**
 * Fills an empty dashboard with the site's current content.
 * Safe to run more than once: it only adds what is missing.
 *
 *   npm run seed
 *
 * Optional: SEED_ADMIN_EMAIL + SEED_ADMIN_PASSWORD create the first admin login.
 */
import fs from "node:fs";
import path from "node:path";
import { getPayload } from "payload";
import config from "../payload.config";
import { columnFeatured, columnList } from "../lib/content";
import { courses } from "../lib/courses";
import { DEFAULT_QUIZ } from "../lib/quiz";
import pageReviews from "../content/seed/reviews.json" with { type: "json" };

const payload = await getPayload({ config });
const log = (...a: unknown[]) => console.log("•", ...a);

async function exists(collection: string, where: Record<string, unknown>) {
  const r = await payload.find({ collection: collection as never, where: where as never, limit: 1, depth: 0 });
  return r.docs[0] as { id: number | string } | undefined;
}

async function upload(file: string, alt: string) {
  const name = path.basename(file);
  const found = await exists("media", { filename: { equals: name } });
  if (found) return found.id;
  const doc = await payload.create({ collection: "media", data: { alt }, filePath: path.resolve(file) });
  log("image", name);
  return doc.id;
}

/* Admin user */
if (process.env.SEED_ADMIN_EMAIL && process.env.SEED_ADMIN_PASSWORD && !(await exists("users", { email: { equals: process.env.SEED_ADMIN_EMAIL } }))) {
  await payload.create({
    collection: "users",
    data: { email: process.env.SEED_ADMIN_EMAIL, password: process.env.SEED_ADMIN_PASSWORD, name: process.env.SEED_ADMIN_NAME || "Admin", role: "admin" },
  });
  log("admin user", process.env.SEED_ADMIN_EMAIL);
}

/* Courses */
const starts: Record<string, string> = {
  "investing-made-simple": "2027-01-11T18:30:00.000Z",
  "crypto-made-simple-the-online-course": "2026-12-14T18:30:00.000Z",
  "technical-analysis-bootcamp": "2026-12-11T18:30:00.000Z",
};
const lines = (a: string[] = []) => a.map((text) => ({ text }));
for (const [i, c] of courses.entries()) {
  if (await exists("courses", { slug: { equals: c.slug } })) continue;
  await payload.create({
    collection: "courses",
    data: {
      name: c.name,
      slug: c.slug,
      status: c.status,
      order: i,
      eyebrow: c.eyebrow,
      short: c.short,
      tagline: c.tagline,
      dates: c.dates,
      startDate: starts[c.slug],
      format: c.format,
      time: c.time,
      price: c.price,
      priceNote: c.priceNote,
      seats: c.seats,
      checkout: c.checkout,
      ctaLabel: c.ctaLabel,
      intro: { title: c.intro.title, paras: lines(c.intro.paras) },
      forYou: { title: c.forYou.title, items: lines(c.forYou.items), note: c.forYou.note },
      sessionsTitle: c.sessionsTitle,
      sessionsNote: c.sessionsNote,
      sessions: c.sessions.map((s) => ({ title: s.title, meta: s.meta, points: lines(s.points), outcome: s.outcome })),
      included: c.included,
      includedValue: c.includedValue,
      instructor: lines(c.instructor),
      testimonials: c.testimonials,
      faqs: c.faqs,
      disclaimer: c.disclaimer,
    } as never,
  });
  log("course", c.name);
}

/* Reviews */
type R = { quote: string; name: string; role: string; showOn: string[]; photo?: string };
const reviews: R[] = [
  { quote: "I was a mess when we started. Just 2 months later I'm already seeing the improvement on paper and mentally.", name: "Lorraine Sammut", role: "Key Account Manager", showOn: ["home"], photo: "lorraine-sammut" },
  { quote: "Luca doesn't dictate investment choices. He opens up a world of possibilities so I can decide.", name: "Carmelo Romano", role: "CTO", showOn: ["home"], photo: "carmelo-romano" },
  { quote: "I appreciate Luca's no-BS, no bells-and-whistles approach. Practical solutions I can repeat.", name: "Hannah Cremona", role: "Business Strategist & Mentor", showOn: ["home"], photo: "hannah-cremona" },
  ...(pageReviews as R[]),
  {
    quote: "I was a mess when we started and you really helped me in more ways than I thought you could. Just 2 months later I'm already seeing the improvement on paper and mentally.",
    name: "Lorraine Sammut",
    role: "Key Account Manager",
    showOn: ["luca"],
  },
  {
    quote: "Luca is the only person that addresses the psychological aspect of money, and that part was definitely the most that got people involved and intrigued.",
    name: "Christine Borg",
    role: "Engagement & Culture Manager, HSBC",
    showOn: ["luca"],
  },
  {
    quote: "Luca doesn't dictate investment choices. He opens up a world of possibilities, enabling me to make informed decisions about my savings.",
    name: "Carmelo Romano",
    role: "CTO",
    showOn: ["luca"],
  },
  {
    quote: "The model Luca has shifted my understanding of money, my relationship with money, and eventually brought awareness to my true potential.",
    name: "Ieva Strekaite",
    role: "Entrepreneur",
    showOn: ["luca"],
  },
];
if (!(await exists("testimonials", {}))) {
  for (const [i, r] of reviews.entries()) {
    const photoFile = `public/images/reviews/${r.photo || r.name.toLowerCase().replace(/\s+/g, "-")}.webp`;
    const photo = fs.existsSync(photoFile) ? await upload(photoFile, r.name) : undefined;
    await payload.create({ collection: "testimonials", data: { quote: r.quote, name: r.name, role: r.role, showOn: r.showOn, photo, order: i } as never });
  }
  log("reviews", reviews.length);
}

/* Times of Malta columns */
if (!(await exists("columns", {}))) {
  for (const c of [columnFeatured, ...columnList]) {
    await payload.create({
      collection: "columns",
      data: { title: c.title, url: c.href, date: new Date(`${c.date} 12:00 UTC`).toISOString(), excerpt: "summary" in c ? c.summary : undefined } as never,
    });
  }
  log("columns", columnList.length + 1);
}

/* Client logos (names until logo files are uploaded) */
const clients = ["HSBC", "PwC Malta", "MeDirect", "MGA", "Evolution", "Deriv", "Thomas Smith Group", "Alf Mizzi & Sons", "Nectar", "9H Digital", "Siegfried", "Malta Institute of Accountants"];
if (!(await exists("client-logos", {}))) {
  for (const [i, name] of clients.entries()) await payload.create({ collection: "client-logos", data: { name, order: i } as never });
  log("clients", clients.length);
}

/* Blog categories */
const cats = [
  ["investment-coaching", "Investment Coaching"],
  ["family-budgeting", "Family Budgeting"],
  ["money-mindset", "Money Mindset"],
  ["smart-financial-choices", "Smart Financial Choices"],
  ["employee-financial-wellness", "Employee Financial Wellness"],
];
for (const [slug, name] of cats) {
  if (!(await exists("categories", { slug: { equals: slug } }))) {
    await payload.create({ collection: "categories", data: { slug, name } as never });
    log("category", name);
  }
}

/* Legal pages (text arrives with the WordPress import) */
for (const [slug, title] of [
  ["privacy-policy", "Privacy Policy"],
  ["cookie-policy", "Cookie Policy"],
  ["website-terms-and-conditions", "Website Terms and Conditions"],
]) {
  if (!(await exists("simple-pages", { slug: { equals: slug } }))) {
    await payload.create({ collection: "simple-pages", data: { slug, title, eyebrow: "Legal", _status: "published" } as never });
    log("page", title);
  }
}

/* Quiz words */
const quiz = await payload.findGlobal({ slug: "quiz-settings" as never });
if (!(quiz as { words?: unknown[] }).words?.length) {
  await payload.updateGlobal({ slug: "quiz-settings" as never, data: { words: DEFAULT_QUIZ } as never });
  log("quiz words", DEFAULT_QUIZ.length);
}

console.log("Done.");
process.exit(0);
