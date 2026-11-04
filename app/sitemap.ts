import type { MetadataRoute } from "next";
import { cms } from "@/lib/cms/payload";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const fixed: [string, number][] = [
    ["/", 1],
    ["/luca/", 0.7],
    ["/services/", 0.9],
    ["/services/financial-workshops/", 0.8],
    ["/portfolio-management/", 0.7],
    ["/side-hustle/", 0.8],
    ["/take-money-type-quiz/", 0.7],
    ["/the-8-money-archetypes/", 0.6],
    ["/blog/", 0.8],
    ["/contact-us/", 0.7],
  ];
  const out: MetadataRoute.Sitemap = fixed.map(([p, priority]) => ({ url: `${SITE_URL}${p}`, lastModified: now, priority }));
  try {
    const payload = await cms();
    const [courses, posts, cats, pages] = await Promise.all([
      payload.find({ collection: "courses", where: { status: { not_equals: "hidden" } }, limit: 100, depth: 0 }),
      payload.find({ collection: "posts", where: { _status: { equals: "published" } }, limit: 2000, depth: 1 }),
      payload.find({ collection: "categories", limit: 100, depth: 0 }),
      payload.find({ collection: "simple-pages", where: { _status: { equals: "published" } }, limit: 100, depth: 0 }),
    ]);
    for (const c of courses.docs) out.push({ url: `${SITE_URL}/${c.slug}/`, lastModified: new Date(c.updatedAt), priority: c.status === "open" ? 0.9 : 0.6 });
    for (const c of cats.docs) out.push({ url: `${SITE_URL}/category/${c.slug}/`, lastModified: now, priority: 0.5 });
    for (const p of pages.docs) out.push({ url: `${SITE_URL}/${p.slug}/`, lastModified: new Date(p.updatedAt), priority: 0.2 });
    for (const p of posts.docs) {
      const cat = p.category && typeof p.category === "object" ? (p.category as { slug?: string }).slug : null;
      if (cat) out.push({ url: `${SITE_URL}/${cat}/${p.slug}/`, lastModified: new Date(p.updatedAt), priority: 0.6 });
    }
    const pagesCount = Math.ceil(posts.totalDocs / 12);
    for (let i = 2; i <= pagesCount; i++) out.push({ url: `${SITE_URL}/blog/${i}/`, lastModified: now, priority: 0.3 });
  } catch (e) {
    console.error("[sitemap]", e);
  }
  return out;
}
