#!/usr/bin/env node
// One-off import of blog posts, categories, legal pages and images from the
// WordPress site into this project. Run with:  node scripts/import-wordpress.mjs
//
// Output:
//   content/posts.json          all published posts (cleaned HTML)
//   content/categories.json     categories with post counts
//   content/pages/<slug>.json   selected WordPress pages (legal etc.)
//   public/wp/<year>/<month>/…  every image the posts and pages use

import fs from "node:fs/promises";
import path from "node:path";
import sanitizeHtml from "sanitize-html";

const WP = "https://moneycoachinghub.com";
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT = path.join(ROOT, "content");
const IMG_DIR = path.join(ROOT, "public", "wp");
const PAGES = ["privacy-policy", "cookie-policy", "website-terms-and-conditions", "compound-interest-calculator", "the-financial-wellness-manifesto", "personal-wellbeing-balance-sheet"];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function getJSON(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(url, { headers: { "User-Agent": "MCH-site-migration" } });
    if (res.ok) return { data: await res.json(), headers: res.headers };
    if (i === tries - 1) throw new Error(`${res.status} ${url}`);
    await sleep(800 * (i + 1));
  }
}
async function getAll(endpoint) {
  const first = await getJSON(`${WP}/wp-json/wp/v2/${endpoint}${endpoint.includes("?") ? "&" : "?"}per_page=100&page=1`);
  const pages = Number(first.headers.get("x-wp-totalpages") || 1);
  let items = first.data;
  for (let p = 2; p <= pages; p++) items = items.concat((await getJSON(`${WP}/wp-json/wp/v2/${endpoint}${endpoint.includes("?") ? "&" : "?"}per_page=100&page=${p}`)).data);
  return items;
}

// ---- images -------------------------------------------------------------
const downloaded = new Map(); // original URL -> local path
async function localImage(url) {
  if (!url) return null;
  const clean = url.split("?")[0].replace(/^http:/, "https:");
  if (!clean.startsWith(`${WP}/wp-content/uploads/`)) return url;
  if (downloaded.has(clean)) return downloaded.get(clean);
  const rel = clean.replace(`${WP}/wp-content/uploads/`, "");
  const dest = path.join(IMG_DIR, rel);
  const pub = `/wp/${rel}`;
  try {
    await fs.access(dest);
  } catch {
    const res = await fetch(clean);
    if (!res.ok) {
      console.warn(`  ! image ${res.status}: ${clean}`);
      downloaded.set(clean, clean);
      return clean;
    }
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
  }
  downloaded.set(clean, pub);
  return pub;
}

// ---- HTML cleaning -------------------------------------------------------
function decode(s) {
  return s
    .replace(/&#8217;|&#039;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8230;/g, "…")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

/** Cut the repeated "About the Author" block; the new site shows its own author box. */
function stripAuthorBox(html) {
  const marker = html.search(/<p[^>]*>(?:(?!<\/p>).)*About the Author/is);
  return marker > 0 ? html.slice(0, marker) : html;
}

async function cleanHtml(html) {
  let out = stripAuthorBox(html);
  out = sanitizeHtml(out, {
    allowedTags: ["h2", "h3", "h4", "h5", "p", "br", "strong", "b", "em", "i", "u", "a", "ul", "ol", "li", "blockquote", "figure", "figcaption", "img", "table", "thead", "tbody", "tr", "th", "td", "hr", "iframe", "sup", "sub", "code", "pre", "mark", "span"],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
      iframe: ["src", "title", "allowfullscreen", "allow"],
      ol: ["start"],
      h2: ["id"],
      h3: ["id"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com", "player.vimeo.com"],
    transformTags: {
      h1: "h2",
      b: "strong",
      i: "em",
      span: (tag, attribs) => ({ tagName: "span", attribs: {} }),
      a: (tag, attribs) => {
        let href = attribs.href || "";
        href = href.replace(/^https?:\/\/(www\.)?moneycoachinghub\.com/, "") || "/";
        const ext = /^https?:\/\//.test(href);
        return { tagName: "a", attribs: ext ? { href, target: "_blank", rel: "noopener" } : { href } };
      },
    },
    exclusiveFilter: (frame) => (frame.tag === "p" || frame.tag === "span") && !frame.text.trim() && !frame.mediaChildren?.length && !/<img|<iframe/.test(frame.text),
  });
  // drop empty paragraphs and stray spans
  out = out.replace(/<span>([\s\S]*?)<\/span>/g, "$1").replace(/<p>\s*(?:&nbsp;|\s)*<\/p>/g, "");
  // localise images
  const srcs = [...out.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  for (const src of srcs) out = out.split(`src="${src}"`).join(`src="${await localImage(src)}"`);
  return out.trim();
}

function excerptFrom(html, n = 180) {
  const text = decode(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ")).trim();
  return text.length > n ? text.slice(0, text.lastIndexOf(" ", n)) + "…" : text;
}
const readingTime = (html) => Math.max(1, Math.round(html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 220));

// ---- main ---------------------------------------------------------------
async function main() {
  await fs.mkdir(path.join(OUT, "pages"), { recursive: true });

  console.log("Categories…");
  const cats = (await getAll("categories")).filter((c) => c.count > 0 && !["uncategorized", "money-blog"].includes(c.slug));
  const catById = new Map(cats.map((c) => [c.id, c]));

  console.log("Media…");
  const media = await getAll("media?_fields=id,source_url,alt_text,media_details");
  const mediaById = new Map(media.map((m) => [m.id, m]));

  console.log("Posts…");
  const raw = await getAll("posts?status=publish&_fields=id,slug,link,date,modified,title,excerpt,content,categories,featured_media,yoast_head_json");
  const posts = [];
  for (const p of raw) {
    process.stdout.write(`  ${p.slug}\n`);
    const html = await cleanHtml(p.content.rendered);
    const pathname = new URL(p.link).pathname; // keep the exact WordPress URL
    const [primarySlug] = pathname.split("/").filter(Boolean);
    const categories = p.categories.map((id) => catById.get(id)?.slug).filter(Boolean);
    const m = mediaById.get(p.featured_media);
    const image = m ? { src: await localImage(m.source_url), alt: decode(m.alt_text || ""), width: m.media_details?.width || 1200, height: m.media_details?.height || 800 } : null;
    const y = p.yoast_head_json || {};
    posts.push({
      id: p.id,
      slug: p.slug,
      path: pathname,
      category: primarySlug,
      categories: categories.length ? categories : [primarySlug],
      title: decode(p.title.rendered),
      date: p.date,
      modified: p.modified,
      excerpt: excerptFrom(p.excerpt.rendered || html),
      description: decode(y.description || y.og_description || excerptFrom(html, 155)),
      readingTime: readingTime(html),
      image,
      html,
    });
  }
  posts.sort((a, b) => b.date.localeCompare(a.date));
  await fs.writeFile(path.join(OUT, "posts.json"), JSON.stringify(posts, null, 1));

  const catOut = cats
    .map((c) => ({ slug: c.slug, name: decode(c.name), description: decode(c.description || ""), count: posts.filter((p) => p.categories.includes(c.slug)).length }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);
  await fs.writeFile(path.join(OUT, "categories.json"), JSON.stringify(catOut, null, 1));

  console.log("Pages…");
  for (const slug of PAGES) {
    const { data } = await getJSON(`${WP}/wp-json/wp/v2/pages?slug=${slug}&_fields=slug,title,content,modified,yoast_head_json`);
    if (!data.length) {
      console.warn(`  ! page not found: ${slug}`);
      continue;
    }
    const pg = data[0];
    const html = await cleanHtml(pg.content.rendered);
    await fs.writeFile(
      path.join(OUT, "pages", `${slug}.json`),
      JSON.stringify({ slug, title: decode(pg.title.rendered), modified: pg.modified, description: decode(pg.yoast_head_json?.description || ""), html }, null, 1)
    );
    console.log(`  ${slug} (${html.length} chars)`);
  }

  console.log(`\nDone: ${posts.length} posts, ${catOut.length} categories, ${downloaded.size} images.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
