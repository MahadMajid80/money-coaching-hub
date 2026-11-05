// Everything the site reads from the dashboard, besides page text (pageContent) and the blog (lib/blog).
import "server-only";
import { cache } from "react";
import type { Course } from "@/lib/courses";
import { cms, mediaUrl } from "./payload";
import { safeUrl } from "@/lib/security/sanitize";

type Doc = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
export type Link = { label: string; url: string; newTab?: boolean | null };

async function global<T = Doc>(slug: string): Promise<T> {
  try {
    const payload = await cms();
    return (await payload.findGlobal({ slug: slug as never, depth: 1 })) as T;
  } catch (e) {
    console.error(`[cms] global ${slug}`, e);
    return {} as T;
  }
}

async function list(collection: string, opts: { where?: Doc; sort?: string; limit?: number } = {}): Promise<Doc[]> {
  try {
    const payload = await cms();
    const r = await payload.find({ collection: collection as never, depth: 1, limit: opts.limit ?? 100, sort: opts.sort, where: opts.where });
    return r.docs as Doc[];
  } catch (e) {
    console.error(`[cms] ${collection}`, e);
    return [];
  }
}

/* ---------------- Site settings ---------------- */

const DEFAULT_NAV: Link[] = [
  { label: "Investing Course", url: "/investing-made-simple/" },
  { label: "Coaching", url: "/services/" },
  { label: "Companies", url: "/services/financial-workshops/" },
  { label: "Column", url: "/#column" },
  { label: "Money Types", url: "/#types" },
  { label: "Blog", url: "/blog/" },
];

export type SiteSettings = {
  logo: string;
  nav: Link[];
  headerCta: Link;
  announcement: { enabled: boolean; text: string; linkLabel: string; url: string; style: "gold" | "dark" };
  footerBrand: string;
  footerTagline: string[];
  footerColumns: { title: string; links: Link[] }[];
  disclaimer: string;
  email: string;
  phone: string;
  location: string;
  socials: Link[];
  notifyEmail: string;
  seoTitle: string;
  seoDescription: string;
  shareImage: string | null;
  gaId: string;
  metaPixelId: string;
  searchConsole: string;
};

const links = (v: unknown): Link[] =>
  Array.isArray(v) ? v.filter((l) => l?.label && l?.url).map((l) => ({ label: l.label, url: safeUrl(l.url), newTab: !!l.newTab })) : [];

export const getSettings = cache(async (): Promise<SiteSettings> => {
  const s = await global("site-settings");
  const nav = links(s.nav);
  const socials = links(s.socials);
  return {
    logo: mediaUrl(s.logo) || "/img/logo.png",
    nav: nav.length ? nav : DEFAULT_NAV,
    headerCta: { label: s.headerCtaLabel || "Book a 10-minute call", url: safeUrl(s.headerCtaUrl, "/contact-us/") },
    announcement: {
      enabled: !!s.announcement?.enabled && !!s.announcement?.text,
      text: s.announcement?.text || "",
      linkLabel: s.announcement?.linkLabel || "",
      url: s.announcement?.url ? safeUrl(s.announcement.url, "") : "",
      style: s.announcement?.style === "dark" ? "dark" : "gold",
    },
    footerBrand: s.footerBrand || "MONEY COACHING HUB",
    footerTagline: String(s.footerTagline || "Based in Malta (EU), working with clients all over the world.\nEducation, not personalised financial advice.")
      .split("\n")
      .filter(Boolean),
    footerColumns: Array.isArray(s.footerColumns) && s.footerColumns.length
      ? s.footerColumns.map((c: Doc) => ({ title: c.title, links: links(c.links) }))
      : [],
    disclaimer:
      s.disclaimer ||
      "Luca Caruana is a Certified Money Coach (CMC®). Money Coaching Hub provides financial education and coaching. It is not licensed to provide investment advice and does not sell financial products.",
    email: s.email || "info@moneycoachinghub.com",
    phone: s.phone || "",
    location: s.location || "Malta",
    socials: socials.length
      ? socials
      : [
          { label: "Instagram", url: "https://www.instagram.com/moneycoachluca/", newTab: true },
          { label: "LinkedIn", url: "https://www.linkedin.com/company/money-coaching-hub/", newTab: true },
          { label: "Facebook", url: "https://www.facebook.com/profile.php?id=61575551973728", newTab: true },
        ],
    notifyEmail: s.notifyEmail || s.email || "",
    seoTitle: s.seoTitle || "Money Coaching Hub – Luca Caruana, Certified Money Coach, Malta",
    seoDescription:
      s.seoDescription ||
      "Luca Caruana, Certified Money Coach in Malta. One-to-one coaching, the Investing Made Simple course and financial wellbeing workshops. No products, no commissions.",
    shareImage: mediaUrl(s.shareImage, "large"),
    gaId: (s.gaId || "").trim(),
    metaPixelId: (s.metaPixelId || "").trim(),
    searchConsole: (s.searchConsole || "").trim(),
  };
});

/* ---------------- Courses ---------------- */

const texts = (v: unknown): string[] => (Array.isArray(v) ? v.map((x) => (typeof x === "string" ? x : x?.text)).filter(Boolean) : []);

export type CmsCourse = Course & { id: string | number; order: number; image: string | null; startDate?: string; meta?: Doc };

function toCourse(d: Doc): CmsCourse {
  return {
    id: d.id,
    slug: d.slug,
    name: d.name,
    short: d.short || "",
    tagline: d.tagline || "",
    eyebrow: d.eyebrow || "",
    status: d.status === "waitlist" ? "waitlist" : "open",
    dates: d.dates || "",
    format: d.format || "",
    time: d.time || "",
    price: d.price || "",
    priceNote: d.priceNote || undefined,
    seats: d.seats || undefined,
    checkout: d.checkout ? safeUrl(d.checkout, "") || undefined : undefined,
    ctaLabel: d.ctaLabel || "Book your place",
    intro: { title: d.intro?.title || "", paras: texts(d.intro?.paras) },
    forYou: { title: d.forYou?.title || "", items: texts(d.forYou?.items), note: d.forYou?.note || undefined },
    sessionsTitle: d.sessionsTitle || "",
    sessionsNote: d.sessionsNote || undefined,
    sessions: (d.sessions || []).map((s: Doc) => ({ title: s.title, meta: s.meta || undefined, points: texts(s.points), outcome: s.outcome || undefined })),
    included: (d.included || []).map((i: Doc) => ({ title: i.title, text: i.text || "" })),
    includedValue: d.includedValue || undefined,
    instructor: texts(d.instructor),
    testimonials: (d.testimonials || []).map((t: Doc) => ({ text: t.text, name: t.name, role: t.role || undefined })),
    faqs: (d.faqs || []).map((f: Doc) => ({ q: f.q, a: f.a })),
    disclaimer: d.disclaimer || "",
    order: d.order ?? 0,
    image: mediaUrl(d.image, "large"),
    startDate: d.startDate || undefined,
    meta: d.meta,
  };
}

export const getCourses = cache(async (): Promise<CmsCourse[]> => {
  const docs = await list("courses", { sort: "order", where: { status: { not_equals: "hidden" } } });
  return docs.map(toCourse);
});

export async function getCourse(slug: string): Promise<CmsCourse | null> {
  return (await getCourses()).find((c) => c.slug === slug) ?? null;
}

/* ---------------- Reviews, columns, logos ---------------- */

export type Review = { quote: string; name: string; role: string; photo: string | null };

export const getReviews = cache(async (where: "home" | "services" | "workshops" | "luca"): Promise<Review[]> => {
  const docs = await list("testimonials", { sort: "order", where: { showOn: { contains: where } } });
  return docs.map((d) => ({ quote: d.quote, name: d.name, role: d.role || "", photo: mediaUrl(d.photo, "thumb") }));
});

export type Column = { title: string; url: string; date: string; excerpt: string; image: string | null };

export const getColumns = cache(async (limit = 10): Promise<Column[]> => {
  const docs = await list("columns", { sort: "-date", limit });
  return docs.map((d) => ({
    title: d.title,
    url: safeUrl(d.url),
    date: new Date(d.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    excerpt: d.excerpt || "",
    image: mediaUrl(d.image, "card"),
  }));
});

export type ClientLogo = { name: string; logo: string | null; url: string };

export const getClientLogos = cache(async (): Promise<ClientLogo[]> => {
  const docs = await list("client-logos", { sort: "order" });
  return docs.map((d) => ({ name: d.name, logo: mediaUrl(d.logo, "thumb"), url: d.url ? safeUrl(d.url, "") : "" }));
});

/* ---------------- Quiz & side hustle ---------------- */

export const getQuizWords = cache(async (): Promise<{ word: string; type: string }[]> => {
  const g = await global("quiz-settings");
  return Array.isArray(g.words) ? g.words.filter((w: Doc) => w?.word && w?.type).map((w: Doc) => ({ word: w.word, type: w.type })) : [];
});

export const getSideHustle = cache(async () => {
  const g = await global("side-hustle-settings");
  return {
    stage: (["notify", "intro", "programme"].includes(g.stage) ? g.stage : "notify") as "notify" | "intro" | "programme",
    introCheckout: safeUrl(g.introCheckout, "/contact-us/?subject=Side%20Hustle%20intro"),
    programmeCheckout: safeUrl(g.programmeCheckout, "/contact-us/?subject=Side%20Hustle%20programme"),
  };
});

/* ---------------- Simple pages & redirects ---------------- */

export async function getSimplePage(slug: string, draft = false): Promise<Doc | null> {
  try {
    const payload = await cms();
    const r = await payload.find({
      collection: "simple-pages",
      where: draft ? { slug: { equals: slug } } : { and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }] },
      draft,
      overrideAccess: draft,
      limit: 1,
      depth: 2,
    });
    return (r.docs[0] as Doc) ?? null;
  } catch (e) {
    console.error("[cms] simple page", e);
    return null;
  }
}

/** Redirect target for a path, from the dashboard's Redirects list. */
export async function findRedirect(path: string): Promise<string | null> {
  try {
    const payload = await cms();
    const variants = [...new Set([path, path.replace(/\/$/, ""), path.endsWith("/") ? path : `${path}/`])];
    const r = await payload.find({ collection: "redirects", where: { from: { in: variants } }, limit: 1, depth: 2 });
    const d = r.docs[0] as Doc | undefined;
    if (!d) return null;
    if (d.to?.type === "custom") return d.to.url ? safeUrl(d.to.url, "") || null : null;
    const ref = d.to?.reference;
    const doc = ref?.value;
    if (!doc || typeof doc !== "object") return null;
    if (ref.relationTo === "posts") return `/${doc.category?.slug ?? "blog"}/${doc.slug}/`;
    return `/${doc.slug}/`;
  } catch {
    return null;
  }
}
