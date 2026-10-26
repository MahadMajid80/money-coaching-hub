import Image from "next/image";
import Link from "next/link";
import { A, CheckList, Crumbs, Faq, SectionHead, delay } from "@/components/ui";
import type { Course } from "@/lib/courses";
import { courses } from "@/lib/courses";

function BookingCard({ c, id }: { c: Course; id?: string }) {
  const open = c.status === "open";
  const href = open && c.checkout ? c.checkout : `/contact-us/?subject=${encodeURIComponent(c.name)}`;
  return (
    <aside className="cohort" id={id} aria-label={`${c.name} booking`}>
      <div className="cohort__badge">
        <span className="pulse" />
        {open ? "APPLICATIONS OPEN" : "REGISTER YOUR INTEREST"}
      </div>
      <p className="cohort__label">{open ? "Next cohort" : "Next dates"}</p>
      <p className="cohort__date">{c.dates.replace(/^Starts /, "")}</p>
      <dl className="cohort__facts">
        <div>
          <dt>Format</dt>
          <dd>{c.format}</dd>
        </div>
        <div>
          <dt>Investment</dt>
          <dd className="price">{c.price}</dd>
        </div>
      </dl>
      <p className="cohort__note">
        {c.time}
        {c.seats ? ` · ${c.seats}` : ""}
        {c.priceNote ? `. ${c.priceNote}.` : "."}
      </p>
      <A href={href} className="btn btn--gold btn--block">
        {open ? `${c.ctaLabel} · ${c.price}` : "Notify me about the next dates"}
      </A>
      {!open && <p className="cohort__more">I&apos;ll email you as soon as the next dates are confirmed.</p>}
    </aside>
  );
}

export default function CourseLayout({ c }: { c: Course }) {
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
    <div className="frame">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="row row--first page-hero">
        <div className="pad split split--top page-hero__inner">
          <div className="page-hero__text">
            <Crumbs items={[{ label: "Courses", href: "/investing-made-simple/" }, { label: c.name }]} />
            <p className="mono mono--gold up">{c.eyebrow}</p>
            <h1 className="page-hero__title up d1">{c.name}</h1>
            <div className="page-hero__lead up d2">
              <p>{c.tagline}</p>
            </div>
            <ul className="hero__badges up d3">
              {[c.format, c.time, c.seats || "Recordings included"].map((b) => (
                <li key={b}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="up d2" style={{ flex: "1 1 380px", minWidth: 0 }}>
            <BookingCard c={c} />
          </div>
        </div>
        <p className="disclaimer-strip">{c.disclaimer}</p>
      </section>

      {/* INTRO + FOR YOU */}
      <section className="row">
        <div className="pad split split--top">
          <div style={{ flex: "1 1 440px" }} className="reveal">
            <p className="mono">Why this course</p>
            <h2 className="h2">{c.intro.title}</h2>
            {c.intro.paras.map((p) => (
              <p key={p.slice(0, 20)} className="lead">
                {p}
              </p>
            ))}
          </div>
          <div style={{ flex: "1 1 440px" }} className="card card--soft reveal">
            <p className="mono mono--gold">{c.forYou.title}</p>
            <CheckList items={c.forYou.items} />
            {c.forYou.note && <p style={{ marginTop: 20, fontWeight: 500, color: "var(--ink)" }}>{c.forYou.note}</p>}
          </div>
        </div>
      </section>

      {/* SESSIONS */}
      <section className="row">
        <SectionHead eyebrow="The curriculum" title={c.sessionsTitle} lead={c.sessionsNote} />
        <ol className="sessions">
          {c.sessions.map((s, i) => (
            <li key={s.title} className="session-row reveal" style={delay(0.04 * i)}>
              <div className="session-row__num">{c.sessions.length > 1 ? String(i + 1).padStart(2, "0") : "→"}</div>
              <div className="session-row__body">
                <h3>{s.title}</h3>
                {s.meta && <p className="mono">{s.meta}</p>}
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                {s.outcome && (
                  <p className="session-row__outcome">
                    <strong>Outcome:</strong> {s.outcome}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* INCLUDED */}
      {c.included && (
        <section className="row row--soft">
          <SectionHead eyebrow="Everything included" title={c.includedValue ? c.includedValue : "Everything you get, one price."} />
          <div className={`cols cols--${c.included.length % 3 === 0 ? 3 : c.included.length === 4 ? 4 : 3}`}>
            {c.included.map((it, i) => (
              <div key={it.title} className="cell reveal" style={delay(0.04 * i)}>
                <span className="check">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* INSTRUCTOR */}
      <section className="row row--dark">
        <div className="pad split">
          <div className="about__photo reveal" style={{ background: "var(--sun)" }}>
            <Image src="/images/luca.webp" alt="Luca Caruana, Certified Money Coach" width={360} height={515} />
          </div>
          <div className="workshop__text reveal">
            <p className="mono mono--sun">Who is teaching this</p>
            <h2 className="h2">Luca Caruana, CMC®</h2>
            {c.instructor.map((p) => (
              <p key={p.slice(0, 20)} className="lead">
                {p}
              </p>
            ))}
            <div className="btn-row">
              <Link href="/luca/" className="btn btn--line">
                More about Luca
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="row row--soft">
        <SectionHead eyebrow="From past students and clients" title="People who've learned with Luca" center />
        <div className={`cols cols--3 reviews`}>
          {c.testimonials.slice(0, 6).map((r, i) => (
            <figure key={r.name} className="cell review reveal" style={delay(0.05 * (i % 3))}>
              <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption>
                <span className="avatar avatar--lg avatar--initial" aria-hidden="true">
                  {r.name.charAt(0)}
                </span>
                <span>
                  <strong>{r.name}</strong>
                  {r.role && <small>{r.role}</small>}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      {c.faqs && (
        <section className="row">
          <SectionHead eyebrow="Before you decide" title="The questions people actually ask" center />
          <div className="pad" style={{ paddingTop: 0 }}>
            <Faq items={c.faqs} />
          </div>
        </section>
      )}

      {/* CLOSING */}
      <section className="row row--gold" id="apply">
        <div className="pad split">
          <div style={{ flex: "1 1 460px" }} className="reveal">
            <h2 className="h2 h2--xl">{c.status === "open" ? "Ready to take your seat?" : "Want a place next time?"}</h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, marginTop: 16, color: "#1f1600" }}>
              {c.status === "open"
                ? "You have been meaning to sort this out for a while. Places are limited, and when they're gone, they're gone until the next cohort."
                : "Leave your details and I'll let you know the moment the next dates are confirmed."}
            </p>
          </div>
          <div style={{ flex: "1 1 380px", minWidth: 0 }} className="reveal">
            <BookingCard c={c} />
          </div>
        </div>
      </section>

      {/* OTHER COURSES */}
      <section className="row">
        <SectionHead eyebrow="Keep learning" title="Other courses" />
        <div className="cols cols--4">
          {others.map((o, i) => (
            <Link key={o.slug} href={`/${o.slug}/`} className="cell service hover-soft reveal" style={delay(0.04 * i)}>
              <span className="mono">{o.price}</span>
              <h3>{o.name}</h3>
              <p>{o.short}</p>
              <span className="service__cta">View course →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
