import type { Metadata } from "next";
import InvestmentHouse from "@/components/InvestmentHouse";
import { CtaBand, PageHero, SectionHead, delay } from "@/components/ui";

export const metadata: Metadata = {
  title: "Build Your €10,000 Investment House – Free Portfolio Tool",
  description:
    "A free interactive tool: see how a real investment portfolio is built brick by brick, and what €10,000 could become over 10, 20 or 30 years.",
  alternates: { canonical: "/portfolio-management/" },
};

const steps = [
  {
    title: "Lay the foundation",
    text: "Your emergency fund is always the base: 3 to 6 months of expenses in a savings account before a single euro is invested. This is non-negotiable.",
  },
  {
    title: "Stack your bricks",
    text: "Choose from 15 real instruments: ETFs, bonds, gold, cash. Each brick is colour-coded by risk level, from light green (very low) to dark red (very high).",
  },
  {
    title: "See your future value",
    text: "Watch your projected returns update in real time: what €10,000 could become after 10, 20 and 30 years, based on each instrument's approximate average annual return over the past decade, in USD.",
  },
];

const risks = [
  { label: "Very low", range: "~1–3%", eg: "Cash, short bonds", color: "#bfe6c3" },
  { label: "Low", range: "~1–15%", eg: "Bonds, gold, infrastructure", color: "#6cc57a" },
  { label: "Medium", range: "~8–14%", eg: "Core equity ETFs", color: "#f8c43a" },
  { label: "High", range: "~10–24%", eg: "Tech, defence, emerging markets", color: "#ef7d3c" },
  { label: "Very high", range: "~3–15%", eg: "AI, clean energy", color: "#b42318" },
];

export default function Page() {
  return (
    <div className="frame">
      <PageHero
        crumbs={[{ label: "Coaching", href: "/services/" }, { label: "€10,000 Investment House" }]}
        eyebrow="Free interactive tool"
        title={
          <>
            Build your <span className="mark">€10,000</span> investment house
          </>
        }
        lead={
          <p>
            See exactly how a real investment portfolio is constructed brick by brick, and discover what your money could become over 10, 20 or 30
            years. Based on approximate 10-year average annual returns for each instrument, in USD.
          </p>
        }
        actions={
          <a href="#build" className="btn btn--dark">
            Start building <span className="arrow" aria-hidden="true">→</span>
          </a>
        }
        aside={
          <dl className="facts">
            <div>
              <dt>Starting amount</dt>
              <dd>€10,000</dd>
            </div>
            <div>
              <dt>Time horizon</dt>
              <dd>Up to 30 years</dd>
            </div>
            <div>
              <dt>Instruments</dt>
              <dd>15, in 5 risk colours</dd>
            </div>
          </dl>
        }
      />

      <section className="row">
        <SectionHead eyebrow="How it works" title="Three steps to your portfolio" lead="No jargon. No complicated spreadsheets. Just a visual way to understand how real portfolios are built." />
        <ol className="cols cols--3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {steps.map((s, i) => (
            <li key={s.title} className="cell reveal" style={delay(0.05 * i)}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="row row--soft">
        <SectionHead eyebrow="Risk colour system" title="The darker the brick, the higher the risk" lead="Darker bricks carry more potential return but also bigger swings. You see the trade-off before you place a single brick." />
        <div className="cols cols--5">
          {risks.map((r) => (
            <div key={r.label} className="cell reveal">
              <span className="ih__swatch ih__swatch--lg" style={{ background: r.color }} aria-hidden="true" />
              <h3>{r.label}</h3>
              <p>
                <strong>{r.range}</strong> · {r.eg}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="row" id="build">
        <SectionHead eyebrow="Interactive tool" title="Build your house now" lead="Pick your bricks (each one is €1,000) and watch your portfolio take shape in real time. Click a brick in the house to remove it." />
        <div className="pad" style={{ paddingTop: 0 }}>
          <InvestmentHouse />
        </div>
      </section>

      <section className="row">
        <SectionHead eyebrow="Transparency" title="Sources & methodology" />
        <div className="pad" style={{ paddingTop: 0 }}>
          <div className="prose" style={{ margin: 0, maxWidth: 820 }}>
            <h3>How returns are calculated</h3>
            <p>
              All return figures in this tool are approximate 10-year annualised returns in US dollars (USD), based on publicly available data from
              PortfoliosLab, Morningstar, and JustETF. Where a specific UCITS ETF has a full 10-year track record, that fund&apos;s data is used. Where
              no full 10-year history exists (for example some bond ETFs launched after 2017), figures are based on the underlying index or a
              comparable proxy fund.
            </p>
            <h3>A note on currency</h3>
            <p>
              Returns are quoted in USD to give a consistent, comparable baseline. European investors holding EUR or GBP share classes of the same
              funds may see different returns due to exchange-rate movements. Currency fluctuations can work in your favour or against you, and
              it&apos;s an important part of investing that your money coach can help you navigate.
            </p>
            <h3>Past performance</h3>
            <p>
              The 10-year period reviewed covers roughly 2015–2025, which included an unusually strong bull run in US equities and technology, a
              sharp gold surge in 2024–2025, and a historic silver rally in 2025. Future returns may be materially lower or higher across all asset
              classes. Past performance does not guarantee future results. This tool is for educational purposes only and does not constitute
              financial advice.
            </p>
            <p>Sources: PortfoliosLab, Morningstar, JustETF, Yahoo Finance, World Gold Council.</p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to build your real portfolio?"
        text="This tool shows you the concept. A money coaching session helps you build the real thing, with your actual numbers, your timeline, and your goals."
        cta={{ label: "Work with Luca", href: "/contact-us/?subject=Investment%20House" }}
        secondary={{ label: "Explore courses", href: "/investing-made-simple/" }}
      />
    </div>
  );
}
