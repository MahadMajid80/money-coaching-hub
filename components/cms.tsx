// Small building blocks that render dashboard lists in the design's style.
import type { ClientLogo, Review } from "@/lib/cms/data";

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
        <div key={r.name + r.quote.slice(0, 20)} className="card" style={{ background, borderColor: background }}>
          <p className="body" style={{ fontSize: "17px", color: "#111111" }}>
            &ldquo;{r.quote.replace(/^["“]|["”]$/g, "")}&rdquo;
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "auto" }}>
            {r.photo ? (
              <img src={r.photo} alt="" loading="lazy" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#D9CFB3", objectFit: "cover", display: "block" }} />
            ) : (
              <span aria-hidden="true" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#FAAC15", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Raleway,sans-serif", fontWeight: 800 }}>
                {r.name.charAt(0)}
              </span>
            )}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: "700", fontSize: "15px" }}>{r.name}</span>
              {r.role && <span style={{ fontSize: "13px", color: "#6B6248" }}>{r.role}</span>}
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
          <p>&ldquo;{r.quote.replace(/^["“]|["”]$/g, "")}&rdquo;</p>
          <cite>
            {r.name}
            {r.role && <span style={{ fontWeight: "400", color: "#6B6248" }}> · {r.role}</span>}
          </cite>
        </blockquote>
      ))}
    </>
  );
}
