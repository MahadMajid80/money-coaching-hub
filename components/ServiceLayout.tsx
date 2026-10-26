import Link from "next/link";
import type { ReactNode } from "react";
import { CheckList, CtaBand, PageHero, SectionHead, TestimonialGrid, delay } from "@/components/ui";
import type { Testimonial } from "@/lib/testimonials";

type Props = {
  crumb: string;
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  facts: { label: string; value: string }[];
  introTitle: string;
  intro: ReactNode;
  outcomesTitle: string;
  outcomes: string[];
  topicsTitle?: string;
  topics?: { title: string; text?: string }[];
  includes?: string;
  testimonials: Testimonial[];
  cta: string;
};

export default function ServiceLayout(p: Props) {
  return (
    <div className="frame">
      <PageHero
        crumbs={[{ label: "Services", href: "/services/" }, { label: p.crumb }]}
        eyebrow={p.eyebrow}
        title={p.title}
        lead={p.lead}
        actions={
          <>
            <Link href="/contact-us/" className="btn btn--dark">
              {p.cta}
            </Link>
            <Link href="/services/" className="btn btn--line">
              All services
            </Link>
          </>
        }
        aside={
          <dl className="facts">
            {p.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <section className="row">
        <div className="pad split split--top">
          <div style={{ flex: "1 1 440px" }} className="reveal">
            <p className="mono">How it works</p>
            <h2 className="h2">{p.introTitle}</h2>
            <div className="lead">{p.intro}</div>
          </div>
          <div style={{ flex: "1 1 440px" }} className="card card--soft reveal" data-delay>
            <p className="mono mono--gold">{p.outcomesTitle}</p>
            <CheckList items={p.outcomes} />
            {p.includes && <p style={{ marginTop: 20 }}>{p.includes}</p>}
          </div>
        </div>
      </section>

      {p.topics && (
        <section className="row">
          <SectionHead eyebrow="What we'll tackle" title={p.topicsTitle || "What we'll cover"} />
          <ol className={`cols cols--${p.topics.length >= 4 ? 4 : p.topics.length}`} style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {p.topics.map((t, i) => (
              <li key={t.title} className="cell hover-soft reveal" style={delay(0.05 * i)}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{t.title}</h3>
                {t.text && <p>{t.text}</p>}
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="row row--soft">
        <SectionHead eyebrow="Reviews" title="Don't take my word for it" center />
        <TestimonialGrid items={p.testimonials} />
      </section>

      <CtaBand
        title="Not sure if this is right for you?"
        text="Book a free 15-minute chat. We'll talk about where you are, where you want to be, and whether coaching is the right next step."
        cta={{ label: "Book a free chat", href: "/contact-us/" }}
        secondary={{ label: "Take the Money Type quiz", href: "/take-money-type-quiz/" }}
      />
    </div>
  );
}
