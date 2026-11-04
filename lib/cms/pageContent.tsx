import "server-only";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { cms, mediaUrl } from "./payload";
import { pageSchemas } from "./schemas";

type Props = { style?: CSSProperties; className?: string };
type Doc = Record<string, Record<string, unknown> | undefined> & { meta?: { title?: string; description?: string; image?: unknown } };

export type PageContent = {
  /** Text or link, falling back to the design's original. */
  t: (key: string) => string;
  /** Image URL: the uploaded replacement, or the original. */
  img: (key: string) => string;
  /** False when the section has been hidden in the dashboard. */
  show: (group: string) => boolean;
  meta: Doc["meta"];
};

const defaults = new Map<string, Map<string, string | boolean>>();
for (const s of pageSchemas) {
  const m = new Map<string, string | boolean>();
  for (const g of s.groups) for (const f of g.fields) m.set(`${g.name}.${f.name}`, f.default);
  defaults.set(s.slug, m);
}

export async function pageContent(slug: string): Promise<PageContent> {
  let doc: Doc = {};
  try {
    const payload = await cms();
    doc = (await payload.findGlobal({ slug: `page-${slug}` as never, depth: 1 })) as unknown as Doc;
  } catch (err) {
    console.error(`[cms] could not load page "${slug}"`, err);
  }
  const defs = defaults.get(slug) ?? new Map();
  const raw = (key: string) => {
    const [g, f] = key.split(".");
    return doc?.[g]?.[f];
  };
  return {
    t(key) {
      const v = raw(key);
      if (typeof v === "string" && v.trim()) return v;
      const d = defs.get(key);
      return typeof d === "string" ? d : "";
    },
    img(key) {
      const url = mediaUrl(raw(key), "large");
      if (url) return url;
      const d = defs.get(key);
      return typeof d === "string" ? d : "";
    },
    show(group) {
      return !doc?.[group]?.hidden;
    },
    meta: doc?.meta,
  };
}

/**
 * Render dashboard text. *Words in stars* keep the design's highlight style,
 * **double stars** stay bold, and line breaks are kept.
 */
export function R(c: PageContent, key: string, marks: Props[] = [], strongs: Props[] = []): ReactNode {
  return renderMarkup(c.t(key), marks, strongs);
}

export function renderMarkup(text: string, marks: Props[] = [], strongs: Props[] = []): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*\n]+\*|\n)/g);
  let mi = 0;
  let si = 0;
  return parts.map((p, i) => {
    if (!p) return null;
    if (p === "\n") return <br key={i} />;
    if (p.startsWith("**") && p.endsWith("**") && p.length > 4) {
      const props = strongs[Math.min(si++, Math.max(strongs.length - 1, 0))] || {};
      return (
        <strong key={i} {...props}>
          {p.slice(2, -2)}
        </strong>
      );
    }
    if (p.startsWith("*") && p.endsWith("*") && p.length > 2) {
      const props = marks[Math.min(mi++, Math.max(marks.length - 1, 0))] || { style: { color: "#FAAC15" } };
      return (
        <span key={i} {...props}>
          {p.slice(1, -1)}
        </span>
      );
    }
    return <Fragment key={i}>{p}</Fragment>;
  });
}

/** Page metadata, with the dashboard's SEO fields (if filled in) taking priority. */
export async function pageMetadata(slug: string, base: import("next").Metadata = {}): Promise<import("next").Metadata> {
  const c = await pageContent(slug);
  const m = c.meta || {};
  const image = mediaUrl(m.image, "large");
  return {
    ...base,
    ...(m.title ? { title: { absolute: m.title } } : {}),
    ...(m.description ? { description: m.description } : {}),
    ...(image || m.title || m.description
      ? { openGraph: { ...(base.openGraph || {}), ...(m.title ? { title: m.title } : {}), ...(m.description ? { description: m.description } : {}), ...(image ? { images: [{ url: image }] } : {}) } }
      : {}),
  };
}
