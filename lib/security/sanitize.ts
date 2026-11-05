import sanitizeHtml from "sanitize-html";

/** Only http(s), mailto, tel, on-site paths and #anchors are allowed as links (no javascript: or data:). */
export function safeUrl(url: string | null | undefined, fallback = "#"): string {
  if (!url) return fallback;
  const u = url.trim();
  if (/^(https?:\/\/|mailto:|tel:)/i.test(u)) return u;
  if (u.startsWith("/") && !u.startsWith("//")) return u;
  if (u.startsWith("#") || u.startsWith("?")) return u;
  // A bare word like "contact-us/" is treated as a page on this site.
  if (/^[\w\-./%]+$/.test(u) && !u.includes(":")) return `/${u.replace(/^\.?\/*/, "")}`;
  return fallback;
}

/** Article/page HTML from the dashboard or the WordPress import, with anything that could run removed. */
export function cleanHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "h2", "h3", "h4", "h5", "h6", "p", "br", "hr", "strong", "b", "em", "i", "u", "s", "sup", "sub", "code", "pre", "mark", "span", "small",
      "a", "ul", "ol", "li", "blockquote", "figure", "figcaption", "img", "picture", "source",
      "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "div", "iframe",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel", "title"],
      img: ["src", "srcset", "sizes", "alt", "width", "height", "loading"],
      source: ["srcset", "media", "type", "sizes"],
      iframe: ["src", "title", "allow", "allowfullscreen", "width", "height"],
      ol: ["start", "type"],
      li: ["value"],
      th: ["colspan", "rowspan", "scope"],
      td: ["colspan", "rowspan"],
      "*": ["id", "class"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["http", "https", "data"] },
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com", "player.vimeo.com"],
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attribs) => {
        const external = /^https?:\/\//i.test(attribs.href || "") && !/^https?:\/\/(www\.)?moneycoachinghub\.com/i.test(attribs.href || "");
        return { tagName, attribs: external ? { ...attribs, target: "_blank", rel: "noopener noreferrer" } : attribs };
      },
    },
  });
}

/** JSON for a <script type="application/ld+json"> block that can't close the script tag early. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
