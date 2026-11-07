// Small building blocks that render dashboard lists in the design's style.
import type { ClientLogo, Review } from "@/lib/cms/data";
import { renderMarkup } from "@/lib/cms/pageContent";

/** Plain review text without surrounding quote marks; the card draws a gold one. Supports **highlight**. */
const reviewText = (q: string) => renderMarkup(q.trim().replace(/^["“]+|["”]+$/g, ""));

/** "Kurt Slattery" -> "KS" */
export const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w.charAt(0).toUpperCase()).join("");

/** “Trusted by teams at” names: the uploaded logo when there is one, otherwise the name. */
export function ClientNames({ logos }: { logos: ClientLogo[] }) {
  return (
    <>
      {logos.map((l) => {
        const inner = l.logo ? (
          <img src={l.logo} alt={l.name} style={{ height: "28px", width: "auto", maxWidth: "140px", objectFit: "contain", display: "block" }} />
        ) : (
          l.name
        );
        return l.url ? (
          <a key={l.name} href={l.url} target="_blank" rel="noopener" style={{ color: "inherit", textDecoration: "none" }}>
            {inner}
          </a>
        ) : (
          <span key={l.name}>{inner}</span>
        );
      })}
    </>
  );
}

/** Review cards as on the homepage design. */
export function ReviewCards({ reviews, background = "#FDF7E8" }: { reviews: Review[]; background?: string }) {
  return (
    <>
      {reviews.map((r) => (
        <div key={r.name + r.quote.slice(0, 20)} className="card review-card" style={{ background, borderColor: background, boxShadow: "0 1px 2px rgba(17,17,17,.04),0 10px 28px rgba(17,17,17,.06)" }}>
          <p className="body" style={{ fontSize: "17px", color: "#3A3A3A" }}>{reviewText(r.quote)}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "auto" }}>
            {r.photo ? (
              <img src={r.photo} alt="" loading="lazy" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#D9CFB3", objectFit: "cover", display: "block" }} />
            ) : (
              <span aria-hidden="true" className="avatar">{initials(r.name)}</span>
            )}
            <div className="who" style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: "700", fontSize: "15px" }}>{r.name}</span>
              {r.role && <small>{r.role}</small>}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

/** “11 January 2027” from a date field. */
export const longDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Malta" }) : "";

/** Review quotes in the inner pages' “quote” style. */
export function QuoteCards({ reviews, background = "#ffffff" }: { reviews: Review[]; background?: string }) {
  return (
    <>
      {reviews.map((r) => (
        <blockquote key={r.name + r.quote.slice(0, 20)} className="quote" style={{ margin: "0 0 20px", background }}>
          <p>{reviewText(r.quote)}</p>
          <cite>
            {r.photo ? <img src={r.photo} alt="" loading="lazy" className="avatar" /> : <span aria-hidden="true" className="avatar">{initials(r.name)}</span>}
            <span className="who">
              {r.name}
              {r.role && <small>{r.role}</small>}
            </span>
          </cite>
        </blockquote>
      ))}
    </>
  );
}
