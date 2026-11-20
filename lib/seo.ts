// Share tags (Open Graph and X/Twitter) for every page, so a shared link shows that page's own
// title, description, address and picture, not the homepage's.
//
// Without this, any page that didn't set its own openGraph inherited the homepage's from the
// root layout: Facebook, LinkedIn and WhatsApp then showed the homepage title, description,
// photo and even the homepage address (og:url) for every page shared.
import type { Metadata } from "next";
import { SITE_URL } from "./site";

type Title = Metadata["title"];

export function titleText(t: Title): string {
  if (!t) return "";
  if (typeof t === "string") return t;
  if ("absolute" in t && t.absolute) return t.absolute;
  if ("default" in t && t.default) return t.default;
  return "";
}

/** A section label for the share card, worked out from the address. */
export function eyebrowFor(path: string): string {
  const p = path.replace(/^\/|\/$/g, "");
  const first = p.split("/")[0];
  if (first === "tools") return p === "tools" ? "Free money tools" : "Free money tool";
  if (first === "services") return p.includes("workshops") ? "For companies" : "Coaching";
  if (first.startsWith("side-hustle")) return "Side hustle";
  if (first === "blog" || first === "category") return "Blog";
  if (first === "media") return "In the media";
  if (first === "luca") return "About Luca";
  if (first === "unspoken") return "UNSPOKEN";
  if (first === "contact-us") return "Get in touch";
  if (/^(investing-made-simple|crypto-|technical-analysis|money-management-masterclass)/.test(first)) return "Online course";
  if (first === "portfolio-management") return "Free money tool";
  if (first === "take-money-type-quiz" || first === "the-8-money-archetypes") return "Money types";
  if (/policy|terms/.test(first)) return "Money Coaching Hub";
  return "Money Coaching Hub";
}

/** The generated share card for a page. */
export function cardUrl(title: string, eyebrow: string): string {
  return `/og/?t=${encodeURIComponent(title)}&k=${encodeURIComponent(eyebrow)}`;
}

/** Uploaded WebP covers are converted to JPEG for apps that can't show WebP (LinkedIn). */
export function shareImage(src: string): string {
  if (/\.webp(\?|$)/i.test(src) && /\.public\.blob\.vercel-storage\.com\//.test(src)) return `/og/?img=${encodeURIComponent(src)}`;
  return src;
}

/**
 * Fills in the share tags from the page's own title, description and canonical address.
 * Keeps anything the page set itself (for example an image chosen in the dashboard).
 */
export function withShare(m: Metadata, opts: { eyebrow?: string; type?: "website" | "article" } = {}): Metadata {
  const canonical = m.alternates?.canonical;
  const path = typeof canonical === "string" ? canonical : canonical instanceof URL ? canonical.pathname : "";
  if (!path) return m; // the homepage keeps the site-wide tags from the layout
  const og = (m.openGraph || {}) as NonNullable<Metadata["openGraph"]> & { type?: string };
  const title = titleText(og.title as Title) || titleText(m.title) || "Money Coaching Hub";
  const description = (og.description as string | undefined) || m.description || undefined;
  const url = path.startsWith("http") ? path : `${SITE_URL}${path}`;
  const given = og.images ? (Array.isArray(og.images) ? og.images : [og.images]) : [];
  const images = given.length
    ? given.map((i) => (typeof i === "string" ? { url: shareImage(i) } : i instanceof URL ? { url: shareImage(i.href) } : { ...i, url: shareImage(String(i.url)) }))
    : [{ url: cardUrl(title.replace(/\s*[|–-]\s*Money Coaching Hub$/, ""), opts.eyebrow || eyebrowFor(path)), width: 1200, height: 630, alt: title }];
  return {
    ...m,
    openGraph: {
      siteName: "Money Coaching Hub",
      locale: "en_GB",
      type: opts.type || (og.type as "website" | undefined) || "website",
      ...og,
      title,
      description,
      url,
      images,
    } as Metadata["openGraph"],
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url as string), ...(m.twitter || {}) },
  };
}
