import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";
import { moneyTypes } from "@/lib/moneyTypes";

export const metadata: Metadata = {
  title: "The 8 Money Types (Money Archetypes) Explained",
  description:
    "The Innocent, Victim, Warrior, Martyr, Fool, Creator, Tyrant and Magician: discover the 8 money archetypes and what they say about your relationship with money.",
  alternates: { canonical: "/the-8-money-archetypes/" },
};

export default function ArchetypesPage() {
  return (
    <div className="frame">
      <PageHero
        crumbs={[{ label: "Money Types", href: "/take-money-type-quiz/" }, { label: "The 8 money types" }]}
        eyebrow="Have you ever wondered about your behaviours with money?"
        title={
          <>
            That&apos;s where the 8 <span className="mark">money types</span> reveal all.
          </>
        }
        lead={
          <>
            <p>
              Your relationship with money is not set in stone. As you become more financially aware and your habits evolve, so does the way you
              handle your finances. Money types act as mentors on your journey towards your financial potential.
            </p>
          </>
        }
        actions={
          <>
            <Link href="/take-money-type-quiz/" className="btn btn--dark">
              Take the quiz
            </Link>
            <a href="#types" className="btn btn--line">
              Read about each type ↓
            </a>
          </>
        }
      />

      <nav className="row" aria-label="Jump to a money type">
        <ul className="type-jump">
          {moneyTypes.map((t, i) => (
            <li key={t.slug}>
              <a href={`#${t.slug}`} className={t.slug === "magician" ? "is-magician" : undefined}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                {t.name.replace("The ", "")}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="row row--soft">
        <div className="pad split split--top">
          <div style={{ flex: "1 1 420px" }} className="reveal">
            <p className="mono">Where they come from</p>
            <h2 className="h2">Your personal money teachers</h2>
          </div>
          <div style={{ flex: "1 1 500px" }} className="reveal">
            <p className="lead" style={{ marginTop: 0 }}>
              We all have unique money habits, but do you ever stop to think about the motivations behind them? Money types help uncover why
              it&apos;s so hard for some of us to save, while others excel at budgeting.
            </p>
            <p className="lead">
              Developed by Deborah Price (founder of the Money Coaching Institute), money types are your “personal teachers”. They help you
              recognise your financial goals, spot roadblocks ahead, and make well-informed decisions.
            </p>
            <p className="lead">
              Everyone&apos;s relationship with money is made up of three to four money types, one or two of which tend to be dominant. And they
              aren&apos;t fixed: as you learn and grow, they evolve too.
            </p>
          </div>
        </div>
      </section>

      <section className="row" id="types">
        <SectionHead eyebrow="Unpacking the 8 money archetypes" title="Which ones sound like you?" />
        <div className="types-list">
          {moneyTypes.map((t, i) => (
            <article key={t.slug} id={t.slug} className={`type-card reveal${t.slug === "magician" ? " type-card--magician" : ""}`}>
              <div className="type-card__head">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{t.name}</h3>
                <p className="type-card__short">{t.short}</p>
              </div>
              <div className="type-card__body">
                {t.body.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
                {t.mantra && (
                  <ul className="mantra">
                    {t.mantra.map((m) => (
                      <li key={m}>&ldquo;{m}&rdquo;</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
        <p className="source">The eight money types are excerpted from the book Money Magic by Deborah L. Price © 2001. All rights reserved. Used with permission.</p>
      </section>

      <CtaBand
        title="Want to go further?"
        text="Our quiz narrows down which types drive your money behaviour. Couples: take it together and talk it through afterwards. Then book a session to move towards the Warrior and the Magician."
        cta={{ label: "Take the quiz", href: "/take-money-type-quiz/" }}
        secondary={{ label: "Book a free call", href: "/contact-us/" }}
      />
    </div>
  );
}
