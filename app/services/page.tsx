import type { Metadata } from "next";
import Link from "next/link";
import { A, CheckList, CtaBand, PageHero, SectionHead, TestimonialGrid, delay } from "@/components/ui";
import { byTag } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Money Coaching Services for Individuals and Couples",
  description:
    "Work with Luca Caruana, one of Europe's first certified Money Coaches: a 1:1 clarity session, the Financial Accelerator, a two-month coaching programme, couples coaching and workshops.",
  alternates: { canonical: "/services/" },
};

const offers = [
  {
    tag: "The starting point",
    title: "1:1 Financial Clarity Session",
    text: "This is where most people begin. One deep conversation. One breakthrough.",
    list: ["What's really keeping you stuck", "What your numbers are (without the overwhelm)", "What's possible if you had clarity and a path forward"],
    note: "You'll walk away with a clearer head, a lighter heart, and a personal direction to move forward.",
    cta: { label: "Book your clarity session", href: "/services/one-time-session/" },
  },
  {
    tag: "The Financial Accelerator",
    title: "Four sessions to finally do something about it",
    text: "From “I'm tired of this” to “I'm finally doing something about it.” Perfect if you:",
    list: ["Earn well but don't feel like you're growing", "Keep starting and stopping with budgeting or investing", "Want structure, mindset shifts, and momentum"],
    note: "This isn't about cutting coffee. It's about cutting confusion.",
    cta: { label: "Apply for the Accelerator", href: "/services/individual-coaching/" },
    featured: true,
  },
  {
    tag: "Comprehensive programme",
    title: "Deep work. Long-term change. Real clarity.",
    text: "Over two months, we'll:",
    list: ["Break old money patterns", "Create a values-led financial plan", "Work on budgeting, saving, investing and clarity", "Rebuild the confidence most people didn't know they'd lost"],
    note: "This is deep work. For deep change. You're ready? Let's go.",
    cta: { label: "Explore the full programme", href: "/services/individual-coaching/" },
  },
  {
    tag: "Money Talks for Two",
    title: "Real conversations. Shared goals. Less tension.",
    text: "A space to:",
    list: ["Understand each other's financial upbringing", "Find common ground on budgeting and spending", "Build trust and long-term strategy without power struggles"],
    note: "You don't need to fight about money. You just need a safe space to understand it, together.",
    cta: { label: "Book a couples coaching chat", href: "/services/couples-coaching/" },
  },
];

export default function ServicesPage() {
  return (
    <div className="frame">
      <PageHero
        crumbs={[{ label: "Services" }]}
        eyebrow="Work with me"
        title={
          <>
            Not just financial coaching. <span className="mark">A life shift.</span>
          </>
        }
        lead={
          <>
            <p>
              I&apos;m Luca Caruana, one of the first certified Money Coaches in Malta and Europe. I&apos;ve helped people get unstuck: high earners who felt
              lost, new parents trying to keep it together, professionals who knew there had to be more to money than just numbers.
            </p>
          </>
        }
        actions={
          <>
            <Link href="/contact-us/" className="btn btn--dark">
              Book a free discovery call
            </Link>
            <Link href="/take-money-type-quiz/" className="btn btn--line">
              Take the quiz <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </>
        }
      />

      <section className="row row--soft">
        <div className="pad split">
          <div style={{ flex: "1 1 420px" }} className="reveal">
            <p className="mono">You were never taught how to handle money</p>
            <h2 className="h2">But you can still master it.</h2>
          </div>
          <div style={{ flex: "1 1 480px" }} className="reveal">
            <p className="lead" style={{ marginTop: 0 }}>
              You don&apos;t need a lecture. You need a new lens.
            </p>
            <p className="lead">
              Coaching with me is not just about what you do with money. It&apos;s about how you feel about it, how you use it to build the life you want,
              and what habits (or hurt) you need to let go of to move forward.
            </p>
          </div>
        </div>
      </section>

      <section className="row">
        <SectionHead eyebrow="What coaching with me looks like" title="Choose where to start" />
        <div className="cols cols--2">
          {offers.map((o, i) => (
            <div key={o.title} className={`cell reveal${o.featured ? " service--featured" : ""}`} style={delay(0.05 * i)}>
              <p className={`mono${o.featured ? " mono--gold" : ""}`}>{o.tag}</p>
              <h3>{o.title}</h3>
              <p className="text">{o.text}</p>
              <CheckList items={o.list} />
              <p className="text" style={{ fontStyle: "italic" }}>
                {o.note}
              </p>
              <A href={o.cta.href} className="btn btn--line">
                {o.cta.label} <span className="arrow" aria-hidden="true">→</span>
              </A>
            </div>
          ))}
        </div>
      </section>

      <section className="row">
        <div className="pad split">
          <div style={{ flex: "1 1 460px" }} className="reveal">
            <p className="mono">Workshops &amp; masterclasses</p>
            <h2 className="h2">Group learning with heart.</h2>
            <p className="lead">Join one of my signature group sessions or bring a workshop to your team. Themes include:</p>
            <CheckList
              items={["Rewiring your money story", "Emotional spending & self-worth", "Financial boundaries in relationships", "Planning for retirement (before it's too late)"]}
            />
            <div className="btn-row">
              <Link href="/investing-made-simple/" className="btn btn--dark">
                See upcoming courses
              </Link>
            </div>
          </div>
          <div style={{ flex: "1 1 420px" }} className="card card--dark reveal">
            <p className="mono mono--sun">For organisations</p>
            <h3 style={{ fontSize: 28, marginTop: 10 }}>Financial wellbeing workshops that go beyond budgets.</h3>
            <p>I help companies and HR leaders design practical, engaging money sessions for their people.</p>
            <CheckList items={["Reduced stress", "Smarter money decisions", "Stronger employee engagement"]} className="points--dark" />
            <p style={{ marginTop: 18 }}>Trusted by PwC, HSBC, Mapfre and Womanifest.</p>
            <div className="btn-row">
              <Link href="/services/financial-workshops/" className="btn btn--gold">
                Request the corporate pack
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="row row--soft">
        <SectionHead eyebrow="Reviews" title="What clients say" center />
        <TestimonialGrid items={byTag("coaching", 3)} />
      </section>

      <CtaBand
        title="Still not sure where to start?"
        text="Take the quiz. Book a call. Let's talk it through together. No pressure. Just clarity."
        cta={{ label: "Book a free intro chat", href: "/contact-us/" }}
        secondary={{ label: "Take the Money Type quiz", href: "/take-money-type-quiz/" }}
      />
    </div>
  );
}
