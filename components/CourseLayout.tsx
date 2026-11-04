// Course page template for the courses the design pack doesn't cover
// (Crypto, Crypto Masterclass, Technical Analysis, Money Management).
// Built section-for-section on the design's Investing Made Simple page.

import { PageFooter, PageHeader, Tick } from "@/components/chrome";
import { notFound } from "next/navigation";
import { getCourse, getCourses } from "@/lib/cms/data";

export default async function CourseLayout({ slug }: { slug: string }) {
  const c = await getCourse(slug);
  if (!c) notFound();
  const courses = await getCourses();
  const open = c.status === "open";
  const href = open && c.checkout ? c.checkout : `/contact-us/?subject=${encodeURIComponent(c.name)}`;
  const cta = open ? `${c.ctaLabel}` : "Notify me about the next dates";
  const others = courses.filter((o) => o.slug !== c.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.name,
    description: c.tagline,
    provider: { "@type": "Organization", name: "Money Coaching Hub", sameAs: "https://moneycoachinghub.com" },
    offers: c.price.startsWith("€") ? { "@type": "Offer", price: c.price.replace(/[^\d.]/g, ""), priceCurrency: "EUR", category: "Paid" } : undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader cta={{ label: open ? c.ctaLabel : "Get notified", href: "#apply" }} />
      <main id="main">
        {/* HERO */}
        <section style={{ background: "#FDF7E8", padding: "72px 0" }}>
          <div className="wrap" style={{ display: "flex", gap: "56px", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ flex: "1 1 520px", minWidth: "0", display: "flex", flexDirection: "column", gap: "24px" }}>
              <span className="eyebrow">{c.eyebrow}</span>
              <h1 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "64px", lineHeight: "1.02", letterSpacing: "-0.02em", margin: "0" }}>{c.name}</h1>
              <p className="body" style={{ fontSize: "21px", maxWidth: "560px" }}>{c.tagline}</p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {[c.format, c.time, c.seats || "Education, not advice"].map((t) => (
                  <span key={t} className="chip" style={{ borderColor: "#E0D5B7", background: "transparent", fontSize: "14px", padding: "8px 14px" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ flex: "0 1 420px", minWidth: "300px" }}>
              <div style={{ background: "#111111", color: "#ffffff", borderRadius: "24px", padding: "40px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "22px" }}>
                <span style={{ display: "inline-flex", alignSelf: "flex-start", padding: "8px 14px", borderRadius: "999px", background: "#FAAC15", color: "#111111", fontWeight: "700", fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {open ? "Booking open" : "Register your interest"}
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "14px", color: "#C9C3B1", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: "700" }}>{open ? "Dates" : "Next dates"}</span>
                  <span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "34px", lineHeight: "1.05" }}>{c.dates}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "16px" }}>
                  <div style={{ background: "#1F1F1F", borderRadius: "14px", padding: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontSize: "13px", color: "#C9C3B1" }}>Format</span>
                    <span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "18px", color: "#FFD112" }}>{c.format}</span>
                  </div>
                  <div style={{ background: "#1F1F1F", borderRadius: "14px", padding: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontSize: "13px", color: "#C9C3B1" }}>Investment</span>
                    <span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "26px", color: "#FFD112" }}>{c.price}</span>
                  </div>
                </div>
                <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "#C9C3B1" }}>
                  {c.time}
                  {c.priceNote ? `. ${c.priceNote}.` : "."}
                </p>
                <a href={href} className="btn btn-gold" style={{ width: "100%" }}>
                  {cta}
                </a>
                <span className="compliance" style={{ color: "#8E8878" }}>
                  Education, not advice. No financial products are sold and nothing here is a personal recommendation.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* WHO IT'S FOR */}
        <section style={{ background: "#ffffff", padding: "96px 0" }}>
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "32px", alignItems: "center", textAlign: "center" }}>
            <span className="eyebrow">{c.forYou.title}</span>
            <h2 className="h2" style={{ maxWidth: "800px" }}>{c.intro.title}</h2>
            {c.intro.paras.map((p) => (
              <p key={p.slice(0, 24)} className="body" style={{ maxWidth: "640px" }}>
                {p}
              </p>
            ))}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", maxWidth: "980px" }}>
              {c.forYou.items.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
            {c.forYou.note && (
              <p className="body" style={{ maxWidth: "640px" }}>
                <strong style={{ color: "#111111" }}>{c.forYou.note}</strong>
              </p>
            )}
          </div>
        </section>

        {/* SESSIONS */}
        <section style={{ background: "#111111", color: "#ffffff", padding: "96px 0" }}>
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "720px" }}>
              <span className="eyebrow" style={{ color: "#FFD112" }}>{c.sessionsTitle}</span>
              <h2 className="h2" style={{ color: "#ffffff" }}>
                {c.format}. {c.time}.
              </h2>
              {c.sessionsNote && (
                <p className="body" style={{ color: "#C9C3B1" }}>
                  {c.sessionsNote}
                </p>
              )}
            </div>
            <div className="g2" style={{ display: "grid", gridTemplateColumns: `repeat(${c.sessions.length === 1 ? 1 : 2}, minmax(0, 1fr))`, gap: "20px" }}>
              {c.sessions.map((s, i) => (
                <article key={s.title} className="session">
                  <span className="num">{c.sessions.length === 1 ? "→" : String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.title}</h3>
                  {s.meta && <span style={{ fontSize: "14px", color: "#C9C3B1" }}>{s.meta}</span>}
                  <ul>
                    {s.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  {s.outcome && <p className="outcome">{s.outcome}</p>}
                </article>
              ))}
            </div>
            <div>
              <a href="#apply" className="btn btn-gold">
                {cta}
              </a>
            </div>
          </div>
        </section>

        {/* INCLUDED */}
        {c.included && (
          <section style={{ background: "#FDF7E8", padding: "96px 0" }}>
            <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "720px" }}>
                <span className="eyebrow">Everything included</span>
                <h2 className="h2">{c.includedValue || "Everything you get, one price."}</h2>
              </div>
              <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "20px" }}>
                {c.included.map((it) => (
                  <div key={it.title} className="card">
                    <span className="tick">
                      <Tick />
                    </span>
                    <h3 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "20px", margin: "0" }}>{it.title}</h3>
                    <p className="body" style={{ fontSize: "16px" }}>
                      {it.text}
                    </p>
                  </div>
                ))}
                <div className="card" style={{ background: "#111111", color: "#ffffff", borderColor: "#111111", justifyContent: "center" }}>
                  <span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "40px", lineHeight: "1", color: "#FFD112" }}>{c.price}</span>
                  <span style={{ fontSize: "15px", color: "#C9C3B1" }}>One payment. No upsells inside the course.</span>
                  <a href="#apply" className="btn btn-gold" style={{ alignSelf: "flex-start", marginTop: "6px" }}>
                    {open ? "Book now" : "Get notified"}
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* WHO IS TEACHING */}
        <section style={{ background: "#ffffff", padding: "96px 0" }}>
          <div className="wrap" style={{ display: "flex", gap: "64px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: "0 1 400px", minWidth: "280px", display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative", width: "380px", maxWidth: "100%", marginLeft: "20px" }}>
                <div aria-hidden="true" style={{ position: "absolute", left: "-20px", top: "20px", width: "100%", height: "100%", background: "#FAAC15", borderRadius: "24px" }}></div>
                <img src={c.image || "/img/luca-tv2.jpg"} alt="Luca Caruana explaining a point" loading="lazy" style={{ position: "relative", width: "100%", aspectRatio: "4/5", objectFit: "cover", objectPosition: "center 10%", borderRadius: "24px", display: "block" }} />
              </div>
            </div>
            <div style={{ flex: "1 1 480px", minWidth: "0", display: "flex", flexDirection: "column", gap: "22px" }}>
              <span className="eyebrow">Who is teaching this</span>
              <h2 className="h2">Luca Caruana</h2>
              {c.instructor.map((p, i) =>
                i === 1 ? (
                  <blockquote key={i} style={{ margin: "0", padding: "20px 24px", borderLeft: "4px solid #FAAC15", background: "#FDF7E8", borderRadius: "0 16px 16px 0", fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "20px", lineHeight: "1.35" }}>
                    {p}
                  </blockquote>
                ) : (
                  <p key={i} className="body">
                    {p}
                  </p>
                )
              )}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ background: "#FDF7E8", padding: "96px 0" }}>
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "720px" }}>
              <span className="eyebrow">From past students and clients</span>
              <h2 className="h2">People who&apos;ve learned with Luca.</h2>
            </div>
            <div className="quotes" style={{ columns: "2", columnGap: "20px" }}>
              {c.testimonials.map((t) => (
                <blockquote key={t.name} className="quote" style={{ margin: "0 0 20px", background: "#ffffff" }}>
                  <p>&ldquo;{t.text}&rdquo;</p>
                  <cite>
                    {t.name}
                    {t.role && <span style={{ fontWeight: "400", color: "#6B6248" }}> · {t.role}</span>}
                  </cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        {c.faqs && (
          <section style={{ background: "#ffffff", padding: "96px 0" }}>
            <div className="wrap" style={{ maxWidth: "860px", display: "flex", flexDirection: "column", gap: "28px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <span className="eyebrow">Before you decide</span>
                <h2 className="h2">The questions people actually ask.</h2>
              </div>
              <div style={{ borderTop: "1px solid #E6E0D0" }}>
                {c.faqs.map((f, i) => (
                  <details key={f.q} open={i === 0}>
                    <summary>{f.q}</summary>
                    <div className="answer">{f.a}</div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* APPLY */}
        <section id="apply" style={{ background: "#FAAC15", padding: "96px 0" }}>
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center", textAlign: "center" }}>
            <span className="eyebrow" style={{ color: "#111111" }}>
              {c.name} · {c.dates}
            </span>
            <h2 className="h2" style={{ fontSize: "48px", maxWidth: "760px" }}>
              {open ? "Places are limited. Take yours." : "Want a place next time?"}
            </h2>
            <p className="body" style={{ color: "#111111", maxWidth: "560px" }}>
              {open ? c.short : "Leave your details and you'll hear the moment the next dates are confirmed."}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
              <span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "40px", lineHeight: "1" }}>{c.price}</span>
              <a href={href} className="btn btn-dark" style={{ minWidth: "280px" }}>
                {cta}
              </a>
              <span className="compliance" style={{ color: "#5A4A1A", maxWidth: "460px" }}>
                {c.disclaimer}
              </span>
            </div>
          </div>
        </section>

        {/* OTHER PROGRAMMES */}
        <section style={{ background: "#ffffff", padding: "96px 0" }}>
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <span className="eyebrow" style={{ color: "#6B6248" }}>Other programmes</span>
            <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "20px" }}>
              {others.slice(0, 3).map((o) => (
                <a key={o.slug} href={`/${o.slug}/`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", padding: "24px", borderRadius: "16px", background: "#FDF7E8", color: "#111111" }}>
                  <span style={{ fontSize: "13px", color: "#6B6248" }}>{o.eyebrow}</span>
                  <span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "20px" }}>{o.name}</span>
                  <span style={{ fontSize: "15px", color: "#3A3A3A", lineHeight: "1.5" }}>{o.short}</span>
                  <span style={{ fontSize: "14px", fontWeight: "700", marginTop: "auto", paddingTop: "8px" }}>Learn more →</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
