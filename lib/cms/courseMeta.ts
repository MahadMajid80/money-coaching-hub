import type { Metadata } from "next";
import { getCourse } from "./data";
import { mediaUrl } from "./payload";

/** Course page metadata, with the course's SEO fields (if filled in) taking priority. */
export async function courseMetadata(slug: string, base: Metadata = {}): Promise<Metadata> {
  const c = await getCourse(slug);
  if (!c) return base;
  const m = c.meta || {};
  const image = mediaUrl(m.image, "large");
  return {
    title: c.name,
    description: c.short || c.tagline,
    alternates: { canonical: `/${slug}/` },
    ...base,
    ...(m.title ? { title: { absolute: m.title } } : {}),
    ...(m.description ? { description: m.description } : {}),
    ...(image ? { openGraph: { images: [{ url: image }] } } : {}),
  };
}
