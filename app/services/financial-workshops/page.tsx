import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckList, CtaBand, PageHero, SectionHead, TestimonialGrid, delay } from "@/components/ui";
import { byTag, testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Financial Wellbeing Workshops for Companies",
  description:
    "Financial wellbeing workshops and programmes for teams in Malta and Europe. Trusted by HSBC, PwC Malta, MeDirect, Thomas Smith Group, Nectar and more.",
  alternates: { canonical: "/services/financial-workshops/" },
};

const clients = ["HSBC", "PwC Malta", "MeDirect", "Thomas Smith Group", "Alf Mizzi & Sons", "Nectar", "Deriv", "Marriott", "AMSM", "9H Digital", "Mapfre", "Womanifest"];

const formats = [
  { title: "Lunch-and-learn", text: "A focused 45–60 minute session your team can join on site or online." },
  { title: "Half-day workshop", text: "Deeper, interactive work with exercises, worksheets and live Q&A." },
  { title: "Series & programmes", text: "A run of sessions that builds lasting money habits across the team." },
  { title: "Keynotes", text: "An energetic talk on the psychology of money for conferences and events." },
];

const themes = [
  "The psychology of money and your money story",
  "Budgeting and spending plans that actually work",
  "Emotional spending and self-worth",
  "Investing for beginners",
  "Financial boundaries in relationships",
  "Planning for retirement, before it's too late",
];

export default function Page() {
  const workshopReviews = byTag("workshop", 6);
  return (
    <div className="frame">
      <PageHero
        crumbs={[{ label: "Services", href: "/services/" }, { label: "Financial Workshops" }]}
        eyebrow="For companies · Financial wellbeing"
        title={
          <>
            Empower your team with <span className="mark">financial wellbeing</span>
          </>
        }
        lead={
          <p>
            Engaging, practical workshops and programmes on the psychology of money. Financial wellbeing helps your people feel less stressed, more
            secure, and more settled in their job.
          </p>
        }
        actions={
          <>
            <Link href="/contact-us/?subject=Workshops" className="btn btn--dark">
              Enquire about a workshop
            </Link>
            <Link href="/contact-us/?subject=Workshops" className="btn btn--line">
              Request the brochure
            </Link>
          </>
        }
        aside={
          <Image
            src="/images/workshop-stage.webp"
            alt="Luca presenting a financial wellbeing workshop to a seated audience"
            width={1009}
            height={871}
            priority
            className="hero-photo"
            sizes="(max-width: 900px) 100vw, 460px"
          />
        }
      />

      <section className="row logos" aria-label="Trusted by companies and organisations">
        <p className="mono logos__label">Trusted by</p>
        <div className="logos__track-wrap">
          <ul className="logos__track">
            {clients.map((c) => (
              <li key={c}>{c}</li>
            ))}
            {clients.map((c) => (
              <li key={`d-${c}`} aria-hidden="true">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="row">
        <SectionHead eyebrow="Why it matters" title="Financial wellbeing is more important than ever" />
        <dl className="statband statband--3">
          <div className="reveal">
            <dt>60%</dt>
            <dd>of employees say financial matters are their #1 source of stress.</dd>
          </div>
          <div className="reveal" style={delay(0.06)}>
            <dt>2.2×</dt>
            <dd>more likely to leave when employees are financially stressed.</dd>
          </div>
          <div className="reveal" style={delay(0.12)}>
            <dt>4×</dt>
            <dd>more likely to be clinically depressed when facing financial concerns.</dd>
          </div>
        </dl>
        <p className="source">Source: PwC Employee Financial Wellness Survey / Employer&apos;s guide to financial wellness.</p>
      </section>

      <section className="row row--soft">
        <div className="pad split split--top">
          <div style={{ flex: "1 1 420px" }} className="reveal">
            <p className="mono">Tailored to your workforce</p>
            <h2 className="h2">Explore every facet of financial wellbeing</h2>
            <p className="lead">Every session is shaped around your people: their stage of life, their questions, and the culture of your company.</p>
          </div>
          <div style={{ flex: "1 1 460px" }} className="reveal">
            <CheckList items={themes} />
          </div>
        </div>
        <div className="cols cols--4">
          {formats.map((f, i) => (
            <div key={f.title} className="cell reveal" style={delay(0.05 * i)}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="row">
        <SectionHead eyebrow="Don't just take our word for it" title="What HR leaders say" center />
        <TestimonialGrid items={workshopReviews.slice(0, 3)} />
        <TestimonialGrid items={workshopReviews.slice(3, 6).length ? workshopReviews.slice(3, 6) : [testimonials[0]]} />
      </section>

      <CtaBand
        title="Bring a workshop to your team"
        text="Lunch-and-learn, half-day or series. Online or on site in Malta. Tell me about your team and I'll send over the brochure and options."
        cta={{ label: "Enquire about a workshop", href: "/contact-us/?subject=Workshops" }}
      />
    </div>
  );
}
