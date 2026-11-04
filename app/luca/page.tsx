import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/chrome";

export const metadata: Metadata = {
  title: "My story – Luca Caruana, Certified Money Coach",
  description:
    "Luca Caruana brought money coaching to Malta in 2023. Certified Money Coach (CMC®), financial wellbeing speaker, founder of Money Coaching Hub and Monipal, and Times of Malta columnist.",
  alternates: { canonical: "/luca/" },
};

const quotes = [
  { name: "Lorraine Sammut", role: "Key Account Manager", text: "I was a mess when we started and you really helped me in more ways than I thought you could. Just 2 months later I'm already seeing the improvement on paper and mentally." },
  { name: "Christine Borg", role: "Engagement & Culture Manager, HSBC", text: "Luca is the only person that addresses the psychological aspect of money, and that part was definitely the most that got people involved and intrigued." },
  { name: "Carmelo Romano", role: "CTO", text: "Luca doesn't dictate investment choices. He opens up a world of possibilities, enabling me to make informed decisions about my savings." },
  { name: "Ieva Strekaite", role: "Entrepreneur", text: "The model Luca has shifted my understanding of money, my relationship with money, and eventually brought awareness to my true potential." },
];

export default function LucaPage() {
  return (
    <div className="home" style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <SiteHeader />
      <main id="main" style={{ display: "contents" }}>
        {/* HERO */}
        <section style={{ background: "#FDF7E8", padding: "72px 0" }}>
          <div className="wrap" style={{ display: "flex", gap: "56px", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ flex: "1 1 520px", minWidth: "0", display: "flex", flexDirection: "column", gap: "24px" }}>
              <span className="eyebrow">My story</span>
              <h1 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "60px", lineHeight: "1.02", letterSpacing: "-0.02em", margin: "0" }}>Hello, I&apos;m Luca. Your money coach.</h1>
              <p className="body" style={{ fontSize: "20px", maxWidth: "560px" }}>
                I brought money coaching to Malta in January 2023, when nobody here had heard of it. Since then I&apos;ve coached hundreds of Maltese and European professionals who earn well but feel stuck: the ones who never learnt how money works and were told not to ask.
              </p>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <a href="/contact-us/" className="btn btn-gold">Book a 10-minute call</a>
                <a href="https://timesofmalta.com/author/luca-caruana.537" className="btn btn-ghost" target="_blank" rel="noopener">Read my column</a>
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {["Certified Money Coach (CMC®)", "No products, no commissions", "Columnist, Times of Malta"].map((t) => (
                  <span key={t} className="chip" style={{ borderColor: "#E0D5B7", background: "transparent", fontSize: "14px", padding: "8px 14px" }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ flex: "0 1 420px", minWidth: "280px", display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative", width: "380px", maxWidth: "100%", marginLeft: "20px" }}>
                <div aria-hidden="true" style={{ position: "absolute", left: "-20px", top: "20px", width: "100%", height: "100%", background: "#FAAC15", borderRadius: "28px" }}></div>
                <img src="/img/luca-seated.jpg" alt="Luca Caruana, Certified Money Coach" style={{ position: "relative", width: "100%", aspectRatio: "4/5", objectFit: "cover", objectPosition: "center 20%", borderRadius: "28px", display: "block" }} />
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="strip-22" style={{ background: "#111111", padding: "22px 0" }}>
          <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "16px", color: "#ffffff" }}>
            {[
              ["2023", "brought money coaching to Malta"],
              ["Hundreds", "of clients coached one-to-one"],
              ["1,000+", "workshop participants"],
              ["70+", "Times of Malta columns"],
            ].map(([v, l]) => (
              <div key={l} style={{ display: "flex", flexDirection: "column", padding: "8px 0" }}>
                <span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "30px", color: "#FFD112" }}>{v}</span>
                <span style={{ fontSize: "14px", color: "#C9C3B1" }}>{l}</span>
              </div>
            ))}
          </div>
        </section>

        {/* STORY */}
        <section style={{ background: "#ffffff", padding: "96px 0" }}>
          <div className="wrap" style={{ display: "flex", gap: "64px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 480px", minWidth: "0", display: "flex", flexDirection: "column", gap: "22px" }}>
              <span className="eyebrow">Why I do this</span>
              <h2 className="h2">My financial health wasn&apos;t always great.</h2>
              <p className="body">
                In my 20s, I thought strict money management and saving every cent was the key to financial success. I tracked everything down to the smallest detail and became obsessed with staying on top of my finances.
              </p>
              <p className="body">
                Then, in March 2019, I had two unexpected seizures while asleep. That experience forced me to reflect on how I was living. Financial wellbeing is far more than managing your cash flow: it&apos;s about balancing the practical side of money with your emotional and psychological needs.
              </p>
              <blockquote style={{ margin: "0", padding: "20px 24px", borderLeft: "4px solid #FAAC15", background: "#FDF7E8", borderRadius: "0 16px 16px 0", fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "22px", lineHeight: "1.3" }}>
                I don&apos;t sell products and I don&apos;t tell you what to buy. I help you understand your money story.
              </blockquote>
              <p className="body">
                Today I balance ambition with joy, logic with emotion, and purpose with impact, and teach others to do the same: on stage, on screen, in the Times of Malta, and one-to-one.
              </p>
            </div>
            <div style={{ flex: "0 1 460px", minWidth: "280px" }}>
              <img src="/img/luca-mic.jpg" alt="Luca speaking on stage" loading="lazy" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", objectPosition: "center 30%", borderRadius: "20px", display: "block" }} />
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" style={{ background: "#FDF7E8", padding: "96px 0" }}>
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "720px" }}>
              <span className="eyebrow">What people say</span>
              <h2 className="h2">Don&apos;t take my word for it</h2>
            </div>
            <div className="quotes" style={{ columns: "2", columnGap: "20px" }}>
              {quotes.map((q) => (
                <blockquote key={q.name} className="quote" style={{ margin: "0 0 20px", background: "#ffffff" }}>
                  <p>&ldquo;{q.text}&rdquo;</p>
                  <cite>
                    {q.name} <span style={{ fontWeight: "400", color: "#6B6248" }}>· {q.role}</span>
                  </cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "#FAAC15", padding: "96px 0" }}>
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center", textAlign: "center" }}>
            <h2 className="h2" style={{ fontSize: "48px", maxWidth: "760px" }}>Ten minutes. No pitch. Just a conversation.</h2>
            <p className="body" style={{ color: "#111111", maxWidth: "560px" }}>Tell me what&apos;s going on with your money. I&apos;ll tell you honestly whether coaching will help.</p>
            <a href="/contact-us/" className="btn btn-dark" style={{ minWidth: "280px" }}>Book a 10-minute call</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
