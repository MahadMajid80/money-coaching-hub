import type { Metadata } from "next";
import { PageFooter, PageHeader } from "@/components/chrome";
import CompoundCalculator from "@/components/tools/CompoundCalculator";
import "../tools.css";
import { withShare } from "@/lib/seo";

export const metadata: Metadata = withShare({
  title: "Compound Interest Calculator (€) – See What Your Savings Could Grow Into",
  description:
    "Free compound interest calculator in euros. Enter a starting amount, a monthly amount, a yearly return and a number of years, and see how much is growth, year by year.",
  alternates: { canonical: "/tools/compound-interest-calculator/" },
  openGraph: {
    title: "Compound Interest Calculator | Money Coaching Hub",
    description: "See what your savings and monthly investments could grow into, in euros.",
    url: "/tools/compound-interest-calculator/",
  },
});

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is compound interest?",
    a: "It's growth on your growth. When your money earns a return, that return is added to your balance, and next time it earns a return too. Over long periods, this is why the growth part of your savings can end up bigger than what you put in.",
  },
  {
    q: "How does this calculator work it out?",
    a: "It adds your monthly amount at the start of each month and applies one twelfth of the yearly return every month. If you choose to raise your monthly amount, it goes up once a year. The result in today's money divides each year's value by inflation.",
  },
  {
    q: "What yearly return should I use?",
    a: "There's no right number. Savings accounts pay a few percent. Broad stock market funds have historically averaged around 7–10% a year over long periods, but with big drops along the way. Try a few rates to see the range, and remember past returns don't guarantee future ones.",
  },
  {
    q: "Is €100 a month really worth investing?",
    a: "Yes. At 7% a year, €100 a month grows to roughly €52,000 after 20 years and €122,000 after 30, from €24,000 and €36,000 put in. Starting early matters more than starting big.",
  },
  {
    q: "Does the calculator include fees and tax?",
    a: "No. Fees and tax reduce real returns, sometimes a lot over many years. Lowering the yearly return by your fund's yearly fee gives a rough idea of the difference.",
  },
];

export default function Page() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <PageHeader cta={{ label: "Book a 10-minute call", href: "/contact-us/" }} />
      <main id="main" className="tools-page">
        <section className="tools-hero">
          <div className="wrap">
            <a href="/tools/" className="tools-crumb">← Free money tools</a>
            <span className="eyebrow">Free tool</span>
            <h1>Compound interest calculator</h1>
            <p className="body tools-lead">
              See what your savings could grow into, and how much of it is growth rather than money you put in. In euros, with no sign-up needed.
            </p>
          </div>
        </section>

        <section className="tools-body">
          <div className="wrap">
            <CompoundCalculator />
          </div>
        </section>

        <section className="tools-explain">
          <div className="wrap tools-narrow">
            <h2 className="h2">Why starting early beats starting big</h2>
            <p className="body">
              Compound growth is slow at first and fast later. In the first few years, almost all of your balance is money you put in. Give it time, and the growth starts to overtake your own contributions.
            </p>
            <p className="body">
              That&apos;s why I tell people who feel they &quot;only&quot; have €100 a month to start anyway. The habit, and the years, do more of the heavy lifting than the amount.
            </p>
            <p className="body">
              <a href="/investment-coaching/start-investing-100-a-month/">Read: how to start investing in Malta with €100 a month →</a>
            </p>

            <h2 className="h2" style={{ marginTop: "48px" }}>Frequently asked questions</h2>
            <div>
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <div className="answer">{f.a}</div>
                </details>
              ))}
            </div>

            <div className="tools-cta">
              <div>
                <strong>Want to learn how to actually invest?</strong>
                <span>My course Investing Made Simple takes you from &quot;I don&apos;t know where to start&quot; to your first investment, in Maltese.</span>
              </div>
              <a href="/investing-made-simple/" className="btn btn-dark">See the course</a>
            </div>
            <p className="compliance">This calculator is for education only and is not financial advice. Luca Caruana is a Certified Money Coach (CMC®). Money Coaching Hub does not sell financial products.</p>
          </div>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PageFooter />
    </>
  );
}
