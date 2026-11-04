/**
 * Step 2 of the WordPress move: loads what scripts/import-wordpress.mjs downloaded
 * (content/posts.json, content/categories.json, content/pages/*.json, public/wp/…)
 * into the dashboard, as fully editable posts, categories and pages.
 *
 *   npm run import:wordpress      (runs both steps)
 *
 * Safe to re-run: posts already imported (same WordPress id) are skipped.
 */
import fs from "node:fs";
import path from "node:path";
import { JSDOM } from "jsdom";
import { convertHTMLToLexical, editorConfigFactory } from "@payloadcms/richtext-lexical";
import { getPayload } from "payload";
import config from "../payload.config";

type WpPost = {
  id: number;
  slug: string;
  path: string;
  category: string;
  categories: string[];
  title: string;
  date: string;
  excerpt: string;
  description: string;
  image: { src: string; alt: string } | null;
  html: string;
};

const ROOT = process.cwd();
const read = <T,>(f: string, fallback: T): T => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : fallback);
const posts = read<WpPost[]>(path.join(ROOT, "content/posts.json"), []);
const categories = read<{ slug: string; name: string; description: string }[]>(path.join(ROOT, "content/categories.json"), []);
if (!posts.length) {
  console.log("Nothing to import: run scripts/import-wordpress.mjs first (it needs access to moneycoachinghub.com).");
  process.exit(0);
}

const payload = await getPayload({ config });
const editorConfig = await editorConfigFactory.default({ config: payload.config });

const mediaCache = new Map<string, number | string>();
async function mediaFor(src: string, alt: string) {
  if (!src?.startsWith("/wp/")) return null;
  if (mediaCache.has(src)) return mediaCache.get(src)!;
  const file = path.join(ROOT, "public", src);
  if (!fs.existsSync(file)) return null;
  const name = path.basename(file);
  const found = await payload.find({ collection: "media", where: { filename: { equals: name } }, limit: 1, depth: 0 });
  const id = found.docs[0]?.id ?? (await payload.create({ collection: "media", data: { alt }, filePath: file })).id;
  mediaCache.set(src, id);
  return id;
}

type Node = { type: string; children?: Node[]; [k: string]: unknown };

/** HTML → editor content, with images moved into the media library and videos kept as links. */
async function toLexical(html: string) {
  const prepared = html.replace(/<iframe[^>]*src="([^"]+)"[^>]*><\/iframe>/g, (_m, src) => `<p><a href="${src.replace("/embed/", "/watch?v=")}">Watch the video</a></p>`);
  const data = convertHTMLToLexical({ editorConfig, html: prepared, JSDOM }) as unknown as { root: Node };
  const srcs = [...prepared.matchAll(/<img[^>]+src="([^"]+)"[^>]*?(?:alt="([^"]*)")?/g)].map((m) => ({ src: m[1], alt: m[2] || "" }));
  let i = 0;
  async function walk(n: Node): Promise<Node | null> {
    if (n.type === "upload") {
      const img = srcs[i++];
      const id = img ? await mediaFor(img.src, img.alt) : null;
      if (!id) return null;
      return { type: "upload", version: 3, format: "", relationTo: "media", value: id, fields: null };
    }
    if (n.children) n.children = (await Promise.all(n.children.map(walk))).filter(Boolean) as Node[];
    return n;
  }
  await walk(data.root);
  data.root.children = (data.root.children || []).filter((c) => c.type !== "paragraph" || (c.children?.length ?? 0) > 0);
  return data;
}

// Categories
const catIds = new Map<string, number | string>();
for (const c of categories) {
  const found = await payload.find({ collection: "categories", where: { slug: { equals: c.slug } }, limit: 1, depth: 0 });
  const doc = found.docs[0] ?? (await payload.create({ collection: "categories", data: { slug: c.slug, name: c.name, description: c.description } as never }));
  catIds.set(c.slug, doc.id);
}

async function categoryId(slug: string) {
  if (catIds.has(slug)) return catIds.get(slug)!;
  const found = await payload.find({ collection: "categories", where: { slug: { equals: slug } }, limit: 1, depth: 0 });
  const id =
    found.docs[0]?.id ??
    (await payload.create({ collection: "categories", data: { slug, name: slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()) } as never })).id;
  catIds.set(slug, id);
  return id;
}

// Posts
let added = 0;
for (const p of posts) {
  const done = await payload.find({ collection: "posts", where: { wpId: { equals: p.id } }, limit: 1, depth: 0 });
  if (done.docs.length) continue;
  const cat = await categoryId(p.category);
  const extra = [];
  for (const c of p.categories.filter((x) => x !== p.category)) extra.push(await categoryId(c));
  let content: unknown = undefined;
  try {
    content = await toLexical(p.html);
  } catch (e) {
    console.warn(`  ! kept as HTML: ${p.slug}`, (e as Error).message);
  }
  await payload.create({
    collection: "posts",
    data: {
      title: p.title,
      slug: p.slug,
      wpId: p.id,
      category: cat,
      extraCategories: extra,
      publishedAt: p.date,
      excerpt: p.excerpt,
      featuredImage: p.image ? await mediaFor(p.image.src, p.image.alt || p.title) : undefined,
      content,
      legacyHtml: content ? undefined : p.html,
      meta: { description: p.description },
      _status: "published",
    } as never,
  });
  added++;
  console.log(`  + ${p.path}`);
}

// Pages (legal etc.)
const pagesDir = path.join(ROOT, "content/pages");
if (fs.existsSync(pagesDir)) {
  for (const f of fs.readdirSync(pagesDir).filter((x) => x.endsWith(".json"))) {
    const pg = read<{ slug: string; title: string; description: string; html: string }>(path.join(pagesDir, f), { slug: "", title: "", description: "", html: "" });
    const content = await toLexical(pg.html);
    const found = await payload.find({ collection: "simple-pages", where: { slug: { equals: pg.slug } }, limit: 1, depth: 0, draft: true });
    const data = { title: pg.title, slug: pg.slug, content, meta: { description: pg.description }, _status: "published" } as never;
    if (found.docs[0]) await payload.update({ collection: "simple-pages", id: found.docs[0].id, data });
    else await payload.create({ collection: "simple-pages", data });
    console.log(`  + page /${pg.slug}/`);
  }
}

console.log(`Done: ${added} new posts.`);
process.exit(0);
