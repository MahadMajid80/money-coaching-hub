// Blog posts and categories, read from the dashboard (Payload).
import "server-only";
import { cache } from "react";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import type { Where } from "payload";
import { cms, mediaAlt, mediaUrl } from "@/lib/cms/payload";
import { cleanHtml } from "@/lib/security/sanitize";

export type Post = {
  id: number | string;
  slug: string;
  path: string; // e.g. /investment-coaching/my-post/
  category: string;
  categories: string[];
  title: string;
  date: string;
  modified: string;
  excerpt: string;
  description: string;
  readingTime: number;
  image: { src: string; alt: string; width: number; height: number } | null;
  html: string;
  meta?: { title?: string | null; description?: string | null; image?: string | null };
};
export type Category = { id: number | string; slug: string; name: string; description: string; count: number };

export const PER_PAGE = 12;

type Doc = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

function toPost(d: Doc, withHtml = false): Post {
  const cat = d.category && typeof d.category === "object" ? d.category : null;
  const extra = Array.isArray(d.extraCategories) ? d.extraCategories.filter((c: Doc) => c && typeof c === "object") : [];
  const img = d.featuredImage && typeof d.featuredImage === "object" ? d.featuredImage : null;
  let html = "";
  if (withHtml) {
    const hasContent = d.content?.root?.children?.some((n: Doc) => (n.children?.length ?? 0) > 0 || n.type !== "paragraph");
    html = cleanHtml(hasContent ? convertLexicalToHTML({ data: d.content, disableContainer: true }) : d.legacyHtml || "");
  }
  const date = d.publishedAt || d.createdAt;
  return {
    id: d.id,
    slug: d.slug,
    path: `/${cat?.slug ?? "blog"}/${d.slug}/`,
    category: cat?.slug ?? "",
    categories: [cat?.slug, ...extra.map((c: Doc) => c.slug)].filter(Boolean),
    title: d.title,
    date,
    modified: d.updatedAt,
    excerpt: d.excerpt || "",
    description: d.meta?.description || d.excerpt || "",
    readingTime: d.readingTime || 1,
    image: img && mediaUrl(img) ? { src: mediaUrl(img, "large")!, alt: mediaAlt(img, d.title), width: img.width || 1600, height: img.height || 900 } : null,
    html,
    meta: { title: d.meta?.title, description: d.meta?.description, image: mediaUrl(d.meta?.image, "large") },
  };
}

const published: Where = { _status: { equals: "published" } };

export const getCategories = cache(async (): Promise<Category[]> => {
  try {
    const payload = await cms();
    const cats = await payload.find({ collection: "categories", limit: 100, sort: "name", depth: 0 });
    return Promise.all(
      cats.docs.map(async (c) => {
        const n = await payload.count({ collection: "posts", where: { and: [published, { or: [{ category: { equals: c.id } }, { extraCategories: { contains: c.id } }] }] } });
        return { id: c.id, slug: c.slug as string, name: c.name, description: c.description || "", count: n.totalDocs };
      }),
    );
  } catch (e) {
    console.error("[cms] categories", e);
    return [];
  }
});

export async function getPosts({ page = 1, category, limit = PER_PAGE }: { page?: number; category?: string; limit?: number } = {}) {
  try {
    const payload = await cms();
    let where: Where = published;
    if (category) {
      const cat = (await getCategories()).find((c) => c.slug === category);
      if (!cat) return { items: [] as Post[], totalPages: 0, total: 0 };
      where = { and: [published, { or: [{ category: { equals: cat.id } }, { extraCategories: { contains: cat.id } }] }] };
    }
    const r = await payload.find({ collection: "posts", where, page, limit, sort: "-publishedAt", depth: 1 });
    return { items: r.docs.map((d) => toPost(d as Doc)), totalPages: r.totalPages, total: r.totalDocs };
  } catch (e) {
    console.error("[cms] posts", e);
    return { items: [] as Post[], totalPages: 0, total: 0 };
  }
}

export async function findPost(category: string, slug: string, draft = false): Promise<Post | null> {
  try {
    const payload = await cms();
    const r = await payload.find({
      collection: "posts",
      where: draft ? { slug: { equals: slug } } : { and: [published, { slug: { equals: slug } }] },
      draft,
      limit: 1,
      depth: 2,
      overrideAccess: draft,
    });
    const d = r.docs[0] as Doc | undefined;
    if (!d) return null;
    const post = toPost(d, true);
    return post.category === category ? post : null;
  } catch (e) {
    console.error("[cms] post", e);
    return null;
  }
}

export async function related(post: Post, n = 3): Promise<Post[]> {
  const { items } = await getPosts({ category: post.category, limit: n + 1 });
  const same = items.filter((p) => p.id !== post.id);
  if (same.length >= n) return same.slice(0, n);
  const { items: latest } = await getPosts({ limit: n + 4 });
  return [...same, ...latest.filter((p) => p.id !== post.id && !same.some((s) => s.id === p.id))].slice(0, n);
}

export const categoryName = (slug: string, cats: Category[]) =>
  cats.find((c) => c.slug === slug)?.name || slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());

export const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
