import { calendly } from "@/lib/site";

/** Calendly's inline booking calendar, in the site's gold. No script needed: a plain iframe. */
export function CalendlyEmbed() {
  const src = `${calendly}?embed_type=Inline&embed_domain=moneycoachinghub.com&primary_color=faac15`;
  return (
    <div className="calendly-embed">
      <iframe src={src} title="Book a 10-minute call with Luca" loading="lazy" />
      <p style={{ fontSize: "13px", color: "#6B6248", textAlign: "center", margin: "8px 0 0" }}>
        Calendar not loading? <a href={calendly} target="_blank" rel="noopener noreferrer">Open it in a new tab</a>.
      </p>
    </div>
  );
}
