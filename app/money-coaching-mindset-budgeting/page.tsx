import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { A, CtaBand, PageHero, SectionHead, TestimonialGrid, delay } from "@/components/ui";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "About – Money Coaching, Mindset & Budgeting for Professionals",
  description:
    "Money Coaching Hub helps individuals, couples and professionals take control of their finances, with coaching that builds confidence, a strong money mindset and long-term financial freedom.",
  alternates: { canonical: "/money-coaching-mindset-budgeting/" },
};

const what = [
  { title: "Individuals", text: "One-to-one coaching to rewrite your money story, build habits that last and start investing with a plan.", href: "/services/individual-coaching/" },
  { title: "Couples", text: "A safe space to talk about money, align your goals and plan your future together.", href: "/services/couples-coaching/" },
  { title: "Professionals & teams", text: "Financial wellbeing workshops for companies across Malta and Europe.", href: "/services/financial-workshops/" },
  { title: "Learners", text: "Live online courses on investing, crypto, technical analysis and money management.", href: "/investing-made-simple/" },
];

const involved = [
  { title: "Book a free discovery call", text: "See how coaching can transform your financial life.", href: "/contact-us/" },
  { title: "Read the column", text: "The Money Coach column in Times of Malta: real reader stories, answered.", href: "https://timesofmalta.com/author/luca-caruana.537" },
  { title: "Join the newsletter", text: "Money Talks: monthly tips to manage, grow and protect your money.", href: "/#book" },
];

export default function AboutPage() {
  return (
    <div className="frame">
      <PageHero
        crumbs={[{ label: "About" }]}
        eyebrow="About Money Coaching Hub"
        title={
          <>
            Empowering people to take <span className="mark">control</span> of their finances
          </>
        }
        lead={
          <p>
            Money Coaching Hub is where individuals, couples and professionals transform their financial futures. Our coaching goes beyond theory: we
            help you take action, gain financial confidence, develop a strong money mindset, and achieve long-term financial freedom.
          </p>
        }
        actions={
          <>
            <Link href="/contact-us/" className="btn btn--dark">
              Book a free discovery call
            </Link>
            <Link href="/luca/" className="btn btn--line">
              Meet Luca <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </>
        }
      />

      <section className="row">
        <SectionHead eyebrow="What we do" title="We work with people who want to feel financially secure and empowered" />
        <div className="cols cols--4">
          {what.map((w, i) => (
            <Link key={w.title} href={w.href} className="cell service hover-soft reveal" style={delay(0.05 * i)}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
              <span className="service__cta">Learn more →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="row row--soft">
        <div className="pad split">
          <div className="about__photo reveal">
            <Image src="/images/luca.webp" alt="Luca Caruana, founder and lead money coach" width={360} height={515} />
          </div>
          <div className="about__text reveal">
            <p className="mono">Meet our expert</p>
            <h2 className="h2">Luca Caruana</h2>
            <p className="mono mono--gold" style={{ marginTop: 8 }}>
              Founder &amp; lead money coach
            </p>
            <p className="lead">
              Luca is a Certified Money Coach (CMC®), financial wellbeing speaker and the founder of Money Coaching Hub and Monipal. He has coached
              300+ clients one-on-one, trained 1,000+ people in workshops for companies like HSBC and PwC, and answers readers&apos; money stories in
              The Money Coach column in Times of Malta.
            </p>
            <p className="lead">He doesn&apos;t sell financial products and earns no commission. His only job is helping you understand your money.</p>
            <div className="btn-row">
              <Link href="/luca/" className="btn btn--dark">
                Read Luca&apos;s story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="row">
        <SectionHead eyebrow="Get involved" title="Ready to take control of your finances?" lead="Your financial journey starts here. Let's build your financial future together." />
        <div className="cols cols--3">
          {involved.map((g, i) => (
            <A key={g.title} href={g.href} className="cell service hover-soft reveal" style={delay(0.05 * i)}>
              <h3>{g.title}</h3>
              <p>{g.text}</p>
              <span className="service__cta">{g.href.startsWith("http") ? "Open ↗" : "Go →"}</span>
            </A>
          ))}
        </div>
      </section>

      <section className="row row--soft" id="reviews">
        <SectionHead eyebrow="Reviews" title="Don't take my word for it" center />
        <TestimonialGrid items={testimonials.slice(0, 3)} />
        <TestimonialGrid items={testimonials.slice(3, 6)} />
        <TestimonialGrid items={testimonials.slice(8, 11)} />
      </section>

      <CtaBand />
    </div>
  );
}
