import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageHero, SectionHead, TestimonialGrid } from "@/components/ui";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Meet Luca Caruana, Certified Money Coach",
  description:
    "Luca Caruana is a financial wellbeing speaker, Certified Money Coach (CMC®) and founder of Money Coaching Hub and Monipal, and writes The Money Coach column in Times of Malta.",
  alternates: { canonical: "/luca/" },
};

export default function LucaPage() {
  return (
    <div className="frame">
      <PageHero
        crumbs={[{ label: "About", href: "/money-coaching-mindset-budgeting/" }, { label: "Luca" }]}
        eyebrow="About Luca"
        title={
          <>
            Meet <span className="mark">Luca</span>
          </>
        }
        lead={
          <>
            <p>
              Luca Caruana is a seasoned financial wellbeing speaker, certified coach, and founder of Money Coaching Hub and Monipal. With over a
              decade of experience helping professionals transform their relationship with money, Luca brings energy, empathy, and practical tools to
              every stage, whether he&apos;s on stage, on screen, or one-on-one.
            </p>
          </>
        }
        actions={
          <>
            <Link href="/contact-us/" className="btn btn--dark">
              Book a 10-minute call
            </Link>
            <a href="https://timesofmalta.com/author/luca-caruana.537" className="btn btn--line" target="_blank" rel="noopener">
              Read his Times of Malta column ↗
            </a>
          </>
        }
        aside={
          <div className="about__photo" style={{ maxWidth: "none", height: 460 }}>
            <Image src="/images/luca.webp" alt="Luca Caruana, Certified Money Coach" width={360} height={515} priority />
          </div>
        }
      />

      <section className="row">
        <dl className="statband">
          <div>
            <dt>300+</dt>
            <dd>clients coached one-on-one</dd>
          </div>
          <div>
            <dt>1,000+</dt>
            <dd>workshop participants</dd>
          </div>
          <div>
            <dt>70+</dt>
            <dd>Times of Malta columns</dd>
          </div>
          <div>
            <dt>CMC®</dt>
            <dd>Certified Money Coach</dd>
          </div>
        </dl>
      </section>

      <section className="row">
        <div className="pad split split--top">
          <div style={{ flex: "1 1 400px" }} className="reveal">
            <p className="mono">His mission</p>
            <h2 className="h2">Not your average money coach.</h2>
          </div>
          <div style={{ flex: "1 1 520px" }} className="reveal">
            <p className="lead" style={{ marginTop: 0 }}>
              Having delivered keynote speeches in front of CEOs, led corporate workshops, and appeared on national media, Luca is not your average
              money coach. His mission? To normalise conversations around money, empower people to create income-aligned lives, and bring practical
              change to how we think about wealth.
            </p>
            <p className="lead">
              After surviving a near-death experience in 2019, Luca radically redefined what financial success meant. He now balances ambition with
              joy, logic with emotion, and purpose with impact, and teaches others how to do the same.
            </p>
          </div>
        </div>
      </section>

      <section className="row row--dark">
        <div className="pad split">
          <Image
            src="/images/workshop-stage.webp"
            alt="Luca speaking at a financial wellbeing workshop"
            width={1009}
            height={871}
            className="workshop__photo reveal"
            sizes="(max-width: 900px) 100vw, 460px"
          />
          <div className="workshop__text reveal">
            <p className="mono mono--sun">Why I do this</p>
            <h2 className="h2">My financial health wasn&apos;t always great.</h2>
            <p className="lead">
              In my 20s, I thought that strict money management and saving every cent was the key to financial success. I tracked everything down to
              the smallest detail and became obsessed with staying on top of my finances.
            </p>
            <p className="lead">
              Then, in March 2019, I had two unexpected seizures while asleep. That experience forced me to reflect on how I was living my life.
              Financial wellbeing is far more than managing your cash flow: it&apos;s about balancing the practical side of money with your emotional
              and psychological needs.
            </p>
          </div>
        </div>
      </section>

      <section className="row row--soft">
        <SectionHead eyebrow="Reviews" title="What people say about working with Luca" center />
        <TestimonialGrid items={[testimonials[0], testimonials[8], testimonials[1]]} />
      </section>

      <CtaBand title={<>Let me help you be great with money.</>} cta={{ label: "Book a 10-minute call", href: "/contact-us/" }} />
    </div>
  );
}
