import Image from "next/image";
import Header from "@/components/Header";
import NewsletterForm from "@/components/NewsletterForm";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  clients,
  columnFeatured,
  columnList,
  concerns,
  course,
  links,
  moneyTypes,
  posts,
  reviews,
  services,
  socials,
  stats,
  workshopQuote,
} from "@/lib/content";

const Check = ({ size = 16, stroke = 2 }: { size?: number; stroke?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const d = (s: number) => ({ "--delay": `${s}s` }) as React.CSSProperties;

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        name: "Money Coaching Hub",
        url: "https://moneycoachinghub.com/",
        logo: "https://moneycoachinghub.com/images/logo.webp",
        areaServed: "Worldwide",
        address: { "@type": "PostalAddress", addressCountry: "MT" },
        founder: { "@type": "Person", name: "Luca Caruana", jobTitle: "Certified Money Coach" },
        sameAs: socials.map((s) => s.href),
      },
      {
        "@type": "Course",
        name: course.name,
        description: course.intro,
        inLanguage: "mt",
        provider: { "@type": "Organization", name: "Money Coaching Hub" },
        offers: { "@type": "Offer", price: "175", priceCurrency: "EUR", category: "Paid" },
      },
    ],
  };

  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Header />
      <RevealOnScroll />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main id="main">
        <div className="frame" id="top">
          {/* HERO */}
          <section className="row row--first hero split" aria-labelledby="hero-title">
            <div className="hero__text">
              <a href="#course" className="announce up">
                <span className="pulse" />
                <span>
                  <strong>{course.name}</strong> · next cohort {course.startShort}
                </span>
                <span aria-hidden="true">→</span>
              </a>
              <h1 id="hero-title" className="up d1">
                Let me help you be <span className="mark">great</span> with money.
              </h1>
              <p className="hero__lead up d2">
                Earning well but still broke at the end of the month? I&apos;m Luca, a Certified Money Coach. Together we
                build your money map, fill the knowledge gaps and keep you going.
              </p>
              <div className="hero__ctas up d3">
                <a href={links.bookCall} className="btn btn--dark">
                  Book a 10-minute call
                </a>
                <a href="#course" className="btn btn--line">
                  See the investing course <span className="arrow" aria-hidden="true">→</span>
                </a>
              </div>
              <ul className="hero__badges up d4">
                <li>
                  <Check /> Certified Money Coach
                </li>
                <li>
                  <Check /> Based in Malta, coaching worldwide
                </li>
                <li>
                  <Check /> Columnist, Times of Malta
                </li>
              </ul>
            </div>

            <div className="hero__media">
              <div className="portrait">
                <div className="portrait__sun" aria-hidden="true" />
                <Image
                  src="/images/luca.webp"
                  alt="Luca, Certified Money Coach, seated and smiling"
                  width={360}
                  height={515}
                  priority
                  sizes="(max-width: 600px) 300px, 360px"
                />
              </div>
              <a href="#column" className="chip chip--column">
                <span className="chip__tom" aria-hidden="true">
                  ToM
                </span>
                <span>
                  <strong>The Money Coach column</strong>
                  <small>Times of Malta · 70+ columns</small>
                </span>
              </a>
              <div className="chip chip--stats">
                <div className="mono">300+ clients</div>
                <strong>1,000+ workshop participants</strong>
              </div>
            </div>
          </section>

          {/* LOGOS */}
          <section className="row logos" aria-label="Trusted by teams at">
            <p className="mono logos__label">Trusted by teams at</p>
            <div className="logos__track-wrap">
              <ul className="logos__track">
                {clients.map((c) => (
                  <li key={c}>{c}</li>
                ))}
                {clients.map((c) => (
                  <li key={`dup-${c}`} aria-hidden="true">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* COURSE */}
          <section id="course" className="row" aria-labelledby="course-title">
            <div className="pad split split--top">
              <div className="course__text reveal">
                <p className="mono mono--gold">{course.eyebrow}</p>
                <h2 id="course-title" className="h2 h2--xl">
                  {course.name}
                </h2>
                <p className="lead">{course.intro}</p>
                <ul className="points">
                  {course.points.map((p) => (
                    <li key={p}>
                      <span className="check">
                        <Check size={13} stroke={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <figure className="quote-card">
                  <blockquote>&ldquo;{course.quote.text}&rdquo;</blockquote>
                  <figcaption>
                    <Image src={course.quote.photo} alt="" width={48} height={48} className="avatar" />
                    {course.quote.name}, {course.quote.role}
                  </figcaption>
                </figure>
              </div>

              <aside className="cohort reveal" style={d(0.1)} aria-label="January cohort">
                <div className="cohort__badge">
                  <span className="pulse" />
                  APPLICATIONS OPEN FOR JANUARY
                </div>
                <p className="cohort__label">Next cohort starts</p>
                <p className="cohort__date">{course.startDate}</p>
                <dl className="cohort__facts">
                  <div>
                    <dt>Format</dt>
                    <dd>{course.format}</dd>
                  </div>
                  <div>
                    <dt>Investment</dt>
                    <dd className="price">{course.price}</dd>
                  </div>
                </dl>
                <p className="cohort__note">Live online, taught in Maltese. Small group, so places are limited.</p>
                <a href={links.courseApply} className="btn btn--gold btn--block">
                  Apply for the January cohort
                </a>
                <p className="cohort__more">
                  <a href={links.courseDetails}>Full course details and FAQ</a>
                </p>
              </aside>
            </div>
            <ol className="cols cols--4" style={{ listStyle: "none", padding: 0, margin: 0 }} aria-label="Session dates">
              {course.sessions.map((s, i) => (
                <li key={s} className="cell hover-soft">
                  <p className="mono">Session {String(i + 1).padStart(2, "0")}</p>
                  <p className="session">{s}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* CONCERNS */}
          <section className="row row--soft" aria-labelledby="concerns-title">
            <div className="pad center">
              <p className="mono reveal">The things we don&apos;t say out loud</p>
              <h2 id="concerns-title" className="h2 reveal" style={d(0.05)}>
                Does any of this sound like you?
              </h2>
              <ul className="pills">
                {concerns.map((c, i) => (
                  <li key={c} className="reveal" style={d(0.05 * i)}>
                    &ldquo;{c}&rdquo;
                  </li>
                ))}
              </ul>
              <p className="lead concerns__lead reveal">
                Nobody taught us this. Most of us were told not to even talk about it. That silence is the real problem,
                and it&apos;s the first thing we fix.
              </p>
              <div className="reveal" style={{ marginTop: 32 }}>
                <a href={links.bookCall} className="btn btn--dark">
                  Book a 10-minute call
                </a>
              </div>
            </div>
          </section>

          {/* COACHING */}
          <section id="coaching" className="row" aria-labelledby="coaching-title">
            <div className="pad pad--tight-bottom section-head">
              <div className="section-head__text reveal">
                <p className="mono">Coaching</p>
                <h2 id="coaching-title" className="h2">
                  Coaching tailored to you
                </h2>
                <p className="lead">
                  One-to-one, on Google Meet, from anywhere. You leave every session with a simple money map and clear
                  next steps.
                </p>
              </div>
              <a href={links.bookCall} className="btn btn--line reveal">
                Book a 10-minute call
              </a>
            </div>
            <div className="cols cols--4">
              {services.map((s, i) => (
                <a
                  key={s.title}
                  href={s.href}
                  className={`cell service hover-soft reveal${s.featured ? " service--featured" : ""}`}
                  style={d(0.06 * i)}
                >
                  <span className={`mono${s.featured ? " mono--gold" : ""}`}>{s.tag}</span>
                  <h3>{s.title}</h3>
                  <p>{s.blurb}</p>
                  <span className="service__cta">{s.cta} →</span>
                </a>
              ))}
            </div>
          </section>

          {/* ABOUT */}
          <section className="row" aria-labelledby="about-title">
            <div className="pad split">
              <div className="about__photo reveal">
                <Image src="/images/luca.webp" alt="Luca, founder of the Money Coaching Hub" width={360} height={515} />
              </div>
              <div className="about__text reveal" style={d(0.1)}>
                <p className="mono">About Luca</p>
                <h2 id="about-title" className="h2">
                  Hello, I&apos;m Luca.
                  <br />
                  Your money coach.
                </h2>
                <p className="lead">
                  I&apos;m a Certified Money Coach and the founder of the Money Coaching Hub. I help people who earn well
                  but feel stuck: the ones who never learnt how money works and were told not to ask.
                </p>
                <p className="lead">
                  I don&apos;t sell products and I don&apos;t tell you what to buy. I help you understand your money story,
                  fix the habits that keep you broke, and start investing with a plan you actually understand.
                </p>
                <dl className="stats">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <dt>{s.value}</dt>
                      <dd>{s.label}</dd>
                    </div>
                  ))}
                </dl>
                <div className="btn-row">
                  <a href={links.bookCall} className="btn btn--gold">
                    Book a 10-minute call
                  </a>
                  <a href={links.about} className="btn btn--line">
                    My story
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* COMPANIES */}
          <section id="companies" className="row row--dark" aria-labelledby="companies-title">
            <div className="pad split">
              <Image
                src="/images/workshop-stage.webp"
                alt="Luca presenting a financial wellbeing workshop to a seated audience"
                width={1009}
                height={871}
                className="workshop__photo reveal"
                sizes="(max-width: 900px) 100vw, 460px"
              />
              <div className="workshop__text reveal" style={d(0.1)}>
                <p className="mono mono--sun">For companies</p>
                <h2 id="companies-title" className="h2">
                  Financial wellbeing workshops your team will actually enjoy.
                </h2>
                <p className="lead">
                  Engaging, practical sessions on the psychology of money. Delivered to HSBC, PwC Malta, MeDirect, Thomas
                  Smith Group and more.
                </p>
                <figure className="quote-card quote-card--dark" style={{ marginTop: 28 }}>
                  <blockquote>&ldquo;{workshopQuote.text}&rdquo;</blockquote>
                  <figcaption>
                    <Image src={workshopQuote.photo} alt="" width={48} height={48} className="avatar" />
                    {workshopQuote.name}, {workshopQuote.role}
                  </figcaption>
                </figure>
                <div className="btn-row" style={{ marginTop: 28 }}>
                  <a href={links.workshopEnquiry} className="btn btn--gold">
                    Enquire about a workshop
                  </a>
                  <span className="workshop__note">Lunch-and-learn, half-day or series. Online or on site in Malta.</span>
                </div>
              </div>
            </div>
          </section>

          {/* COLUMN */}
          <section id="column" className="row" aria-labelledby="column-title">
            <div className="pad pad--tight-bottom section-head">
              <div className="section-head__text reveal">
                <p className="mono">As published in Times of Malta</p>
                <h2 id="column-title" className="h2 h2--xl">
                  The Money Coach column
                </h2>
                <p className="lead">
                  Every fortnight, a real reader writes in with a money story they&apos;ve never told anyone. I answer in
                  Malta&apos;s national newspaper. 70+ columns and counting.
                </p>
              </div>
              <a href={links.column} className="btn btn--line reveal" target="_blank" rel="noopener">
                Read the column <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="column">
              <a href={columnFeatured.href} className="column__featured hover-soft reveal" target="_blank" rel="noopener">
                <Image
                  src="/images/money-coach-column.webp"
                  alt="The Money Coach column artwork, Times of Malta"
                  width={1200}
                  height={800}
                  sizes="(max-width: 900px) 100vw, 600px"
                />
                <div className="column__meta">
                  <span className="tag">LATEST</span>
                  <span className="date">{columnFeatured.date}</span>
                </div>
                <h3>{columnFeatured.title}</h3>
                <p>{columnFeatured.summary}</p>
                <span className="column__read">Read on Times of Malta ↗</span>
              </a>
              <div className="column__side">
                <ul className="column__list">
                  {columnList.map((c, i) => (
                    <li key={c.href} className="reveal" style={d(0.04 * i)}>
                      <a href={c.href} className="column__item hover-soft" target="_blank" rel="noopener">
                        <span className="date">{c.date}</span>
                        <strong>{c.title}</strong>
                        <span aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="story">
                  <p className="mono mono--gold">Write in, anonymously</p>
                  <h3>Got a money story you&apos;ve never told anyone?</h3>
                  <p>It might be the next column, and the answer might be the one you needed.</p>
                  <a href={links.sendStory} className="btn btn--dark">
                    Send your story
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* REVIEWS */}
          <section className="row row--soft" aria-labelledby="reviews-title">
            <div className="pad pad--tight-bottom center">
              <p className="mono reveal">Reviews</p>
              <h2 id="reviews-title" className="h2 reveal">
                Don&apos;t take my word for it
              </h2>
            </div>
            <div className="cols cols--3 reviews">
              {reviews.map((r, i) => (
                <figure key={r.name} className="cell review reveal" style={d(0.06 * i)}>
                  <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
                  <figcaption>
                    <Image src={r.photo} alt="" width={48} height={48} className="avatar avatar--lg" />
                    <span>
                      <strong>{r.name}</strong>
                      <small>{r.role}</small>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="reviews__more">
              <a href={links.reviews} className="link">
                Read all 20+ reviews →
              </a>
            </div>
          </section>

          {/* MONEY TYPES */}
          <section id="types" className="row" aria-labelledby="types-title">
            <div className="pad split">
              <div className="types__text reveal">
                <p className="mono">Money types</p>
                <h2 id="types-title" className="h2">
                  Which money type is running your money life?
                </h2>
                <p className="lead">
                  Some days you&apos;re the Warrior in the driving seat. Other days the Innocent or the Martyr takes over,
                  or the Fool goes on a splurge. Know your type and you can become the Magician: calm, confident and in
                  control.
                </p>
                <div style={{ marginTop: 32 }}>
                  <a href={links.quiz} className="btn btn--dark">
                    Take the 3-minute quiz <span className="arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
              <ol className="types reveal" style={d(0.1)}>
                {moneyTypes.map((t, i) => (
                  <li key={t} className={t === "Magician" ? "is-magician" : undefined}>
                    <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      {t}
                      {t === "Magician" && <span aria-hidden="true"> ✦</span>}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* BLOG */}
          <section id="blog" className="row" aria-labelledby="blog-title">
            <div className="pad pad--tight-bottom section-head">
              <div className="reveal">
                <p className="mono">Knowledge hub</p>
                <h2 id="blog-title" className="h2">
                  Fresh from the blog
                </h2>
              </div>
              <a href={links.blog} className="link reveal">
                All articles →
              </a>
            </div>
            <div className="cols cols--3">
              {posts.map((p, i) => (
                <a key={p.title} href={p.href} className="cell post hover-soft reveal" style={d(0.06 * i)}>
                  <Image src={p.image} alt="" width={320} height={213} sizes="(max-width: 900px) 100vw, 360px" />
                  <p className="post__meta">
                    {p.category} · {p.date}
                  </p>
                  <h3>{p.title}</h3>
                </a>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section id="book" className="row row--gold" aria-labelledby="cta-title">
            <div className="pad split">
              <div className="cta__text reveal">
                <h2 id="cta-title" className="h2 h2--xl">
                  Want your money working as hard as you do?
                </h2>
                <p>Let me show you how. Based in Malta (EU), coaching clients all over the world via Google Meet.</p>
                <div style={{ marginTop: 28 }}>
                  <a href={links.bookCall} className="btn btn--dark">
                    Book a 10-minute call
                  </a>
                </div>
              </div>
              <div className="reveal" style={{ flex: "1 1 360px", minWidth: 0, ...d(0.1) }}>
                <NewsletterForm />
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__grid">
            <div>
              <Image src="/images/logo-dark.webp" alt="Money Coaching Hub" width={559} height={459} className="footer__logo" />
              <p>Based in Malta (EU), working with clients all over the world.</p>
              <p>Education, not personalised financial advice.</p>
            </div>
            <nav className="footer__col" aria-labelledby="f-learn">
              <h2 id="f-learn">Learn</h2>
              <a href="#course">Investing Made Simple</a>
              <a href={links.crypto}>Crypto Made Simple</a>
              <a href="#column">Times of Malta column</a>
              <a href={links.quiz}>Money Type Quiz</a>
              <a href={links.blog}>Blog</a>
            </nav>
            <nav className="footer__col" aria-labelledby="f-coaching">
              <h2 id="f-coaching">Coaching</h2>
              {services.slice(0, 3).map((s) => (
                <a key={s.title} href={s.href}>
                  {s.title}
                </a>
              ))}
              <a href="#companies">For Companies</a>
            </nav>
            <nav className="footer__col" aria-labelledby="f-connect">
              <h2 id="f-connect">Connect</h2>
              <a href={links.bookCall}>Book a 10-minute call</a>
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener">
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="footer__bottom">
            <span>© {new Date().getFullYear()} Money Coaching Hub. All rights reserved.</span>
            <nav aria-label="Legal">
              <a href={links.privacy}>Privacy</a>
              <a href={links.cookies}>Cookies</a>
              <a href={links.terms}>Terms</a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
