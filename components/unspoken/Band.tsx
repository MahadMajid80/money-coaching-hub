import { UnspokenSignup } from "@/components/forms";
import { UK, UnspokenWide, fraunces } from "./brand";

/** The Unspoken sign-up band shown at the end of every blog post. */
export function UnspokenBand({ source = "blog-post" }: { source?: string }) {
  return (
    <section className={`uk ${fraunces.variable}`} style={{ background: UK.night, color: UK.cream }}>
      <div className="uk-wrap" style={{ paddingTop: "80px", paddingBottom: "80px", display: "flex", flexWrap: "wrap", gap: "40px 64px", alignItems: "center" }}>
        <div style={{ flex: "999 1 420px", minWidth: 0, display: "flex", flexDirection: "column", gap: "20px" }}>
          <a href="/unspoken/" aria-label="Unspoken" style={{ textDecoration: "none", display: "inline-flex" }}>
            <UnspokenWide size={22} />
          </a>
          <h2 className="uk-display uk-band-h" style={{ fontSize: "44px", lineHeight: 1.06, color: UK.cream }}>
            The money stories people <span className="uk-gold">never tell</span>
          </h2>
          <p style={{ margin: 0, fontSize: "18px", lineHeight: 1.65, maxWidth: "520px", color: UK.mistLight }}>
            One true story every second Thursday, from my column and my own life. Names always changed. No hard selling.
          </p>
        </div>
        <div style={{ flex: "1 1 340px", minWidth: 0 }}>
          <UnspokenSignup source={source} idPrefix="uk-post" />
        </div>
      </div>
    </section>
  );
}
