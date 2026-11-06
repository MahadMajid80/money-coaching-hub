// Moves the blog from the old WordPress site (moneycoachinghub.com) into the dashboard.
// Runs on the server, a few posts per call, so each call stays well inside the time limit.
// Safe to re-run: posts already imported (same WordPress id) are skipped.
import type { Payload } from "payload";
import sanitizeHtml from "sanitize-html";

const WP = "https://moneycoachinghub.com";
const SKIP_CATEGORIES = ["uncategorized", "money-blog"];
const LEGAL_PAGES = ["privacy-policy", "cookie-policy", "website-terms-and-conditions"];

type Doc = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
type Node = { type: string; children?: Node[]; [k: string]: unknown };

async function wp(pathAndQuery: string) {
  for (let i = 0; i < 3; i++) {
    const res = await fetch(`${WP}/wp-json/wp/v2/${pathAndQuery}`, { headers: { "User-Agent": "MCH-site-migration" }, cache: "no-store" });
    if (res.ok) return { data: (await res.json()) as Doc[], total: Number(res.headers.get("x-wp-total") || 0) };
    if (i === 2) throw new Error(`Old site answered ${res.status} for ${pathAndQuery}`);
    await new Promise((r) => setTimeout(r, 800 * (i + 1)));
  }
  throw new Error("unreachable");
}

export function decode(s: string) {
  return String(s || "")
    .replace(/&#8217;|&#039;|&#39;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8230;/g, "…")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, "&");
}

const text = (html: string) => decode(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ")).trim();
function excerptFrom(html: string, n = 180) {
  const t = text(html).replace(/\s*\[…\]\s*$|\s*\[&hellip;\]\s*$/, "");
  return t.length > n ? t.slice(0, t.lastIndexOf(" ", n)) + "…" : t;
}

/** Cut the repeated "About the Author" block; the new site shows its own author box. */
function stripAuthorBox(html: string) {
  const marker = html.search(/<(p|h[2-4])[^>]*>(?:(?!<\/\1>).)*About the Author/is);
  return marker > 0 ? html.slice(0, marker) : html;
}

function cleanHtml(html: string) {
  let out = sanitizeHtml(stripAuthorBox(html), {
    allowedTags: ["h2", "h3", "h4", "h5", "p", "br", "strong", "em", "u", "a", "ul", "ol", "li", "blockquote", "img", "table", "thead", "tbody", "tr", "th", "td", "hr", "iframe", "sup", "sub", "code", "pre"],
    allowedAttributes: { a: ["href", "target", "rel"], img: ["src", "alt"], iframe: ["src"], ol: ["start"], th: ["colspan", "rowspan"], td: ["colspan", "rowspan"] },
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com", "player.vimeo.com"],
    transformTags: {
      h1: "h2",
      h6: "h5",
      b: "strong",
      i: "em",
      a: (_tag, attribs) => {
        const href = (attribs.href || "").replace(/^https?:\/\/(www\.)?moneycoachinghub\.com/, "") || "/";
        const out: Record<string, string> = /^https?:\/\//.test(href) ? { href, target: "_blank", rel: "noopener" } : { href };
        return { tagName: "a", attribs: out };
      },
      img: (_tag, attribs) => {
        // Prefer the full-size file over WordPress's resized copies (photo-1024x528.jpg → photo.jpg is tried first).
        return { tagName: "img", attribs: { src: attribs.src || "", alt: attribs.alt || "" } };
      },
    },
  });
  out = out.replace(/<p>\s*(?:&nbsp;|\s|<br \/>)*<\/p>/g, "");
  // A video becomes a link, which the editor can hold.
  out = out.replace(/<iframe[^>]*src="([^"]+)"[^>]*><\/iframe>/g, (_m, src: string) => `<p><a href="${src.replace("/embed/", "/watch?v=").split("?si=")[0]}" target="_blank" rel="noopener">Watch the video</a></p>`);
  return out.trim();
}

/** Puts an image from the old site into the media library (once) and returns its id. */
async function mediaFor(payload: Payload, url: string, alt: string, cache: Map<string, number | string | null>) {
  if (!url) return null;
  const clean = url.split("?")[0].replace(/^http:/, "https:").replace("://www.", "://");
  if (!clean.startsWith(`${WP}/wp-content/uploads/`)) return null;
  if (cache.has(clean)) return cache.get(clean)!;
  const full = clean.replace(/-\d+x\d+(\.\w+)$/, "$1");
  let id: number | string | null = null;
  for (const candidate of full === clean ? [clean] : [full, clean]) {
    const name = decodeURIComponent(candidate.split("/").pop() || "image.jpg").replace(/[^\w.-]+/g, "-");
    const found = await payload.find({ collection: "media", where: { filename: { equals: name } }, limit: 1, depth: 0, overrideAccess: true });
    if (found.docs[0]) {
      id = found.docs[0].id;
      break;
    }
    const res = await fetch(candidate, { headers: { "User-Agent": "MCH-site-migration" } });
    if (!res.ok) continue;
    const mimetype = (res.headers.get("content-type") || "").split(";")[0];
    if (!["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"].includes(mimetype)) continue;
    const data = Buffer.from(await res.arrayBuffer());
    const doc = await payload.create({ collection: "media", data: { alt: alt.slice(0, 200) }, file: { data, mimetype, name, size: data.length }, overrideAccess: true });
    id = doc.id;
    break;
  }
  cache.set(clean, id);
  return id;
}

/** HTML → editor content, with images moved into the media library. */
async function toLexical(payload: Payload, html: string, cache: Map<string, number | string | null>) {
  // @ts-expect-error jsdom ships without type declarations here; only JSDOM is used.
  const [{ JSDOM }, { convertHTMLToLexical, editorConfigFactory }] = await Promise.all([import("jsdom"), import("@payloadcms/richtext-lexical")]);
  const editorConfig = await editorConfigFactory.default({ config: payload.config });
  const data = convertHTMLToLexical({ editorConfig, html, JSDOM: JSDOM as never }) as unknown as { root: Node };
  const imgs = [...html.matchAll(/<img[^>]*src="([^"]+)"[^>]*?(?:alt="([^"]*)")?[^>]*>/g)].map((m) => ({ src: m[1], alt: decode(m[2] || "") }));
  let i = 0;
  async function walk(n: Node): Promise<Node | null> {
    if (n.type === "upload") {
      const img = imgs[i++];
      const id = img ? await mediaFor(payload, img.src, img.alt, cache) : null;
      return id ? { type: "upload", version: 3, format: "", relationTo: "media", value: id, fields: null } : null;
    }
    if (n.children) n.children = (await Promise.all(n.children.map(walk))).filter(Boolean) as Node[];
    return n;
  }
  await walk(data.root);
  data.root.children = (data.root.children || []).filter((c) => c.type !== "paragraph" || (c.children?.length ?? 0) > 0);
  return data;
}

async function categoryIds(payload: Payload) {
  const { data: cats } = await wp("categories?per_page=100");
  const byWpId = new Map<number, number | string>();
  for (const c of cats) {
    if (SKIP_CATEGORIES.includes(c.slug) || !c.count) continue;
    const found = await payload.find({ collection: "categories", where: { slug: { equals: c.slug } }, limit: 1, depth: 0, overrideAccess: true });
    const doc =
      found.docs[0] ??
      (await payload.create({ collection: "categories", data: { name: decode(c.name), slug: c.slug, description: text(c.description || "") } as never, overrideAccess: true }));
    byWpId.set(c.id, doc.id);
  }
  return { byWpId, bySlug: new Map(cats.filter((c) => byWpId.has(c.id)).map((c) => [c.slug as string, byWpId.get(c.id)!])) };
}

export type ImportResult = { total: number; next: number | null; added: string[]; skipped: number; failed: { slug: string; error: string }[]; pages?: string[] };

/** Imports posts [offset, offset+limit) from the old site, oldest first. */
export async function importWordPress(payload: Payload, { offset = 0, limit = 4 } = {}): Promise<ImportResult> {
  const { byWpId, bySlug } = await categoryIds(payload);
  const { data: posts, total } = await wp(
    `posts?status=publish&orderby=date&order=asc&per_page=${limit}&offset=${offset}&_embed=wp:featuredmedia&_fields=id,slug,link,date,date_gmt,title,excerpt,content,categories,featured_media,yoast_head_json,_links,_embedded`,
  );
  const cache = new Map<string, number | string | null>();
  const result: ImportResult = { total, next: offset + posts.length < total ? offset + posts.length : null, added: [], skipped: 0, failed: [] };

  for (const p of posts) {
    try {
      const done = await payload.find({ collection: "posts", where: { wpId: { equals: p.id } }, limit: 1, depth: 0, overrideAccess: true, draft: true });
      if (done.docs.length) {
        result.skipped++;
        continue;
      }
      // The first part of the old address is the post's main category, so addresses stay the same.
      const pathname = new URL(p.link).pathname;
      const primarySlug = pathname.split("/").filter(Boolean)[0];
      const category = bySlug.get(primarySlug) ?? byWpId.get(p.categories?.[0]);
      if (!category) throw new Error(`no category for ${pathname}`);
      const extraCategories = (p.categories || []).map((id: number) => byWpId.get(id)).filter((id: unknown) => id && id !== category);

      const html = cleanHtml(p.content?.rendered || "");
      let content: unknown;
      try {
        content = await toLexical(payload, html, cache);
      } catch (e) {
        payload.logger.warn(`[wp import] kept as HTML: ${p.slug} – ${(e as Error).message}`);
      }
      const fm = p._embedded?.["wp:featuredmedia"]?.[0];
      const title = decode(p.title?.rendered || p.slug);
      const featuredImage = fm?.source_url ? await mediaFor(payload, fm.source_url, decode(fm.alt_text || title), cache) : null;
      const y = p.yoast_head_json || {};

      await payload.create({
        collection: "posts",
        overrideAccess: true,
        data: {
          title,
          slug: p.slug,
          wpId: p.id,
          category,
          extraCategories,
          publishedAt: new Date(p.date_gmt ? `${p.date_gmt}Z` : p.date).toISOString(),
          excerpt: excerptFrom(p.excerpt?.rendered || html),
          featuredImage: featuredImage ?? undefined,
          content,
          legacyHtml: content ? undefined : html,
          meta: { description: decode(y.description || y.og_description || excerptFrom(html, 155)), image: featuredImage ?? undefined },
          _status: "published",
        } as never,
      });
      result.added.push(pathname);
    } catch (e) {
      result.failed.push({ slug: p.slug, error: (e as Error).message });
    }
  }

  // With the last batch, bring over the legal pages' text too (only into pages that are still empty).
  if (result.next === null) {
    result.pages = [];
    for (const slug of LEGAL_PAGES) {
      try {
        const { data } = await wp(`pages?slug=${slug}&_fields=slug,title,content,yoast_head_json`);
        if (!data[0]) continue;
        const found = await payload.find({ collection: "simple-pages", where: { slug: { equals: slug } }, limit: 1, depth: 0, draft: true, overrideAccess: true });
        const existing = found.docs[0] as Doc | undefined;
        if (existing && (existing.content?.root?.children?.length || 0) > 0) continue;
        const html = cleanHtml(data[0].content.rendered);
        const content = await toLexical(payload, html, cache);
        const pageData = { title: decode(data[0].title.rendered), slug, content, meta: { description: decode(data[0].yoast_head_json?.description || "") }, _status: "published" } as never;
        if (existing) await payload.update({ collection: "simple-pages", id: existing.id, data: pageData, overrideAccess: true });
        else await payload.create({ collection: "simple-pages", data: pageData, overrideAccess: true });
        result.pages.push(`/${slug}/`);
      } catch (e) {
        result.failed.push({ slug: `page ${slug}`, error: (e as Error).message });
      }
    }
  }
  return result;
}
