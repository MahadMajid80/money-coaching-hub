import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { UnspokenSignup } from "@/components/forms";
import { UnspokenMarks } from "@/components/unspoken/Marks";
import { UK, UnspokenWide, fraunces } from "@/components/unspoken/brand";
import { withShare } from "@/lib/seo";

export const metadata: Metadata = withShare({
  title: "Unspoken: the money stories people never tell",
  description:
    "A letter from money coach Luca Caruana, every second Thursday: one true money story, and what really sits underneath it. Names changed. No hard selling.",
  alternates: { canonical: "/unspoken/" },
  openGraph: {
    title: "Unspoken: the money stories people never tell",
    description: "One true money story, every second Thursday, from money coach Luca Caruana.",
    url: "/unspoken/",
  },
});

// The latest letters. Each links to its web version in MailerLite.
const letters = [
  {
    n: 3,
    title: "“She’s the breadwinner now.”",
    teaser: "His brother said it as a joke. He’s been paying for it ever since.",
    href: "https://preview.mailerlite.io/preview/595545/emails/203394428126102908",
  },
  {
    n: 2,
    title: "A bigger salary. A bigger secret.",
    teaser: "She earned €18,000 more a year. So why couldn’t she save a cent?",
    href: "https://preview.mailerlite.io/preview/595545/emails/202064915588974387",
  },
  {
    n: 1,
    title: "I was 10 when I asked if we were saving money.",
    teaser: "My mum’s answer taught me the lesson so many of us learn growing up in Malta.",
    href: "https://preview.mailerlite.io/preview/595545/emails/201975056307324840",
  },
];

export default function Page() {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <SiteHeader />
      <main id="main" className={`uk ${fraunces.variable}`} style={{ display: "flex", flexDirection: "column", background: UK.cream }}>
        <section style={{ background: UK.night, color: UK.cream }}>
          <header className="uk-wrap" style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "space-between", alignItems: "center", paddingTop: "28px", paddingBottom: "28px" }}>
            <a href="/unspoken/" aria-label="Unspoken" style={{ textDecoration: "none", display: "inline-flex" }}>
              <UnspokenWide size={26} />
            </a>
            <a href="/luca/" className="uk-label" style={{ color: UK.mist, textDecoration: "none" }}>
              By Luca Caruana
            </a>
          </header>
          <div className="uk-wrap" style={{ display: "flex", flexWrap: "wrap", gap: "48px 64px", alignItems: "center", paddingTop: "48px", paddingBottom: "104px" }}>
            <div style={{ flex: "999 1 520px", minWidth: 0, display: "flex", flexDirection: "column", gap: "24px" }}>
              <span className="uk-label" style={{ color: UK.mist }}>
                A letter, every second Thursday
              </span>
              <h1 className="uk-display uk-hero-h" style={{ fontSize: "68px", lineHeight: 1.02, color: UK.cream }}>
                The money stories people <span className="uk-gold">never tell</span>
              </h1>
              <p style={{ margin: 0, fontSize: "19px", lineHeight: 1.65, maxWidth: "560px", color: UK.mistLight }}>
                True stories from real life: the people I meet, and the emails, letters and WhatsApp messages they send me. What really sits underneath them. Names always changed. No hard selling.
              </p>
            </div>
            <div style={{ flex: "1 1 340px", minWidth: 0 }}>
              <UnspokenSignup source="unspoken-page" idPrefix="uk-top" />
            </div>
          </div>
        </section>

        <section style={{ background: UK.paper }}>
          <div style={{ maxWidth: "720px", margin: "0 auto", padding: "96px 24px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "22px", fontSize: "19px", lineHeight: 1.75 }}>
            <span className="uk-label" style={{ color: UK.dusk }}>
              Why Unspoken
            </span>
            <p style={{ margin: 0 }}>I was ten when I asked my mum a simple question.</p>
            <p className="uk-display" style={{ fontSize: "40px", lineHeight: 1.15 }}>
              “Mum, are we <span className="uk-gold-light">saving money</span>?”
            </p>
            <p style={{ margin: 0 }}>She put her hand on my shoulder. “This is not a subject to be discussed with children.” I never asked again.</p>
            <p style={{ margin: 0 }}>
              Years later I became a money coach. I’ve sat with hundreds of people since, many of them earning very well. And the same silence keeps showing up. The credit card nobody knows about. The pay gap nobody mentions at dinner. The parents who never explain anything.
            </p>
            <p style={{ margin: 0 }}>These letters are where I tell those stories first, on the way to a book.</p>
          </div>
        </section>

        <section style={{ background: "#ffffff" }}>
          <div className="uk-wrap" style={{ paddingTop: "96px", paddingBottom: "96px", display: "flex", flexDirection: "column", gap: "36px" }}>
            <h2 className="uk-display" style={{ fontSize: "48px", lineHeight: 1.05 }}>
              Recent letters
            </h2>
            <div className="uk-letters">
              {letters.map((l) => (
                <a key={l.n} className="uk-card" href={l.href} target="_blank" rel="noopener">
                  <span className="uk-label" style={{ color: UK.dusk }}>
                    Letter {l.n}
                  </span>
                  <span className="uk-display">{l.title}</span>
                  <p>{l.teaser}</p>
                  <span className="uk-more">Read the letter →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: UK.cream }}>
          <div className="uk-wrap" style={{ paddingTop: "96px", paddingBottom: "96px", display: "flex", flexWrap: "wrap", gap: "32px 48px", alignItems: "center" }}>
            <img src="/img/luca-close.jpg" alt="Luca Caruana" style={{ width: "168px", height: "168px", borderRadius: "50%", objectFit: "cover", display: "block", flex: "none" }} />
            <div style={{ flex: "999 1 420px", minWidth: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              <span className="uk-label" style={{ color: UK.dusk }}>
                Who writes it
              </span>
              <p style={{ margin: 0, fontSize: "19px", lineHeight: 1.7 }}>
                I’m Luca Caruana, a certified money coach in Malta. I write the Money Coach column in the Times of Malta, I’ve coached over 300 people one to one, and I’ve spoken to more than 1,000 in workshops. I’m writing a book called <em>Unspoken</em>.
              </p>
            </div>
          </div>
        </section>

        <section style={{ background: UK.night, color: UK.cream }}>
          <div className="uk-wrap" style={{ paddingTop: "88px", paddingBottom: "88px", display: "flex", flexWrap: "wrap", gap: "40px 64px", alignItems: "center" }}>
            <div style={{ flex: "999 1 420px", minWidth: 0, display: "flex", flexDirection: "column", gap: "22px" }}>
              <UnspokenMarks height={28} />
              <h2 className="uk-display uk-band-h" style={{ fontSize: "52px", lineHeight: 1.04, color: UK.cream }}>
                Some things are easier to <span className="uk-gold">read</span> than to say.
              </h2>
            </div>
            <div style={{ flex: "1 1 340px", minWidth: 0 }}>
              <UnspokenSignup source="unspoken-page" idPrefix="uk-bottom" button="Get the next letter" />
            </div>
          </div>
        </section>

        <p className="uk-wrap" style={{ margin: "0 auto", width: "100%", paddingTop: "28px", paddingBottom: "28px", fontSize: "14px", lineHeight: 1.5, color: UK.dusk }}>
          These stories are shared for education. Names and details are changed. Nothing here is financial advice.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
