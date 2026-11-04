import type { Metadata } from "next";
import { PageFooter, PageHeader } from "@/components/chrome";
import InvestmentHouse from "@/components/InvestmentHouse";

export const metadata: Metadata = {
  title: "Build Your €10,000 Investment House – Free Tool",
  description: "A free tool: lay a foundation, stack bricks of different risk, and see what €10,000 could become over 10, 20 or 30 years.",
  alternates: { canonical: "/portfolio-management/" },
};

export default function Page() {
  return (
    <>
      <PageHeader cta={{ label: "Start building", href: "#tool" }} />
      <main id="main">
{/* HERO */}
<section style={{ background: "#FDF7E8", padding: "72px 0" }}>
<div className="wrap" style={{ display: "flex", gap: "56px", flexWrap: "wrap", alignItems: "center" }}>
<div style={{ flex: "1 1 520px", minWidth: "0", display: "flex", flexDirection: "column", gap: "24px" }}>
<span className="eyebrow">Free tool · No sign-up to play</span>
<h1 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "60px", lineHeight: "1.02", letterSpacing: "-0.02em", margin: "0" }}>Build your €10,000 Investment House.</h1>
<p className="body" style={{ fontSize: "20px", maxWidth: "560px" }}>Most people's first portfolio is a guess. This is a way to see it instead: lay a foundation, stack bricks of different risk, and watch what €10,000 could become over 10, 20 or 30 years.</p>
<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
<a href="#tool" className="btn btn-gold">Start building</a>
<a href="#how" className="btn btn-ghost">How it works</a>
</div>
<div style={{ display: "flex", gap: "28px", flexWrap: "wrap", paddingTop: "8px" }}>
<div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "28px" }}>€10,000</span><span style={{ fontSize: "14px", color: "#6B6248" }}>starting amount</span></div>
<div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "28px" }}>15</span><span style={{ fontSize: "14px", color: "#6B6248" }}>instruments to choose from</span></div>
<div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "28px" }}>30 yrs</span><span style={{ fontSize: "14px", color: "#6B6248" }}>longest projection</span></div>
</div>
</div>
<div style={{ flex: "0 1 420px", minWidth: "280px", display: "flex", justifyContent: "center" }}>
<div aria-hidden="true" style={{ width: "100%", maxWidth: "380px", display: "flex", flexDirection: "column", gap: "6px" }}>
<div className="roof" style={{ height: "0", borderLeft: "190px solid transparent", borderRight: "190px solid transparent", borderBottom: "90px solid #111111" }}></div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "6px" }}>
<div style={{ height: "44px", borderRadius: "8px", background: "#B0122A" }}></div><div style={{ height: "44px", borderRadius: "8px", background: "#E3572B" }}></div><div style={{ height: "44px", borderRadius: "8px", background: "#E3572B" }}></div><div style={{ height: "44px", borderRadius: "8px", background: "#FAAC15" }}></div>
<div style={{ height: "44px", borderRadius: "8px", background: "#FAAC15" }}></div><div style={{ height: "44px", borderRadius: "8px", background: "#FAAC15" }}></div><div style={{ height: "44px", borderRadius: "8px", background: "#FFD112" }}></div><div style={{ height: "44px", borderRadius: "8px", background: "#FFD112" }}></div>
<div style={{ height: "44px", borderRadius: "8px", background: "#FFD112" }}></div><div style={{ height: "44px", borderRadius: "8px", background: "#F3E6B8" }}></div><div style={{ height: "44px", borderRadius: "8px", background: "#F3E6B8" }}></div><div style={{ height: "44px", borderRadius: "8px", background: "#F3E6B8" }}></div>
</div>
<div style={{ height: "34px", borderRadius: "8px", background: "#111111", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFD112", fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "13px", letterSpacing: ".1em" }}>EMERGENCY FUND · 3 TO 6 MONTHS</div>
</div>
</div>
</div>
</section>
{/* HOW */}
<section id="how" style={{ background: "#ffffff", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "720px" }}>
<span className="eyebrow">How it works</span>
<h2 className="h2">Foundation first. Then bricks. Then time.</h2>
</div>
<div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "20px" }}>
<div className="card"><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "40px", lineHeight: "1", color: "#FAAC15" }}>01</span><h3 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "22px", margin: "0" }}>Lay the foundation</h3><p className="body" style={{ fontSize: "16px" }}>Three to six months of expenses in a savings account before a single brick goes down. This one's not negotiable; it's what stops you selling at the worst moment.</p></div>
<div className="card"><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "40px", lineHeight: "1", color: "#FAAC15" }}>02</span><h3 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "22px", margin: "0" }}>Stack your bricks</h3><p className="body" style={{ fontSize: "16px" }}>Fifteen instruments: cash, bonds, gold, core ETFs, sector and thematic funds. Each is colour-coded by risk. Darker bricks swing harder, both ways.</p></div>
<div className="card"><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "40px", lineHeight: "1", color: "#FAAC15" }}>03</span><h3 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "22px", margin: "0" }}>See your future value</h3><p className="body" style={{ fontSize: "16px" }}>The projection updates as you build: 10, 20 and 30 years, using approximate 10-year average annual returns. Then you can analyse the house and start over.</p></div>
</div>
<div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
<span className="eyebrow" style={{ color: "#6B6248" }}>The risk colours</span>
<div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "12px" }}>
<div className="brick"><span className="swatch" style={{ background: "#F3E6B8" }}></span><span><strong>Very low</strong> · cash, short bonds · ~1–3%</span></div>
<div className="brick"><span className="swatch" style={{ background: "#FFD112" }}></span><span><strong>Low</strong> · bonds, gold, infrastructure · ~1–15%</span></div>
<div className="brick"><span className="swatch" style={{ background: "#FAAC15" }}></span><span><strong>Medium</strong> · core equity ETFs · ~8–14%</span></div>
<div className="brick"><span className="swatch" style={{ background: "#E3572B" }}></span><span><strong>High</strong> · tech, defence, emerging markets · ~10–24%</span></div>
<div className="brick"><span className="swatch" style={{ background: "#B0122A" }}></span><span><strong>Very high</strong> · AI, clean energy · ~3–15%</span></div>
</div>
<span style={{ fontSize: "14px", color: "#6B6248" }}>Approximate 10-year annualised returns in USD, from PortfoliosLab, Morningstar, JustETF, Yahoo Finance and the World Gold Council. Past returns don't guarantee future results.</span>
</div>
</div>
</section>
{/* TOOL */}
<section id="tool" style={{ background: "#FDF7E8", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "720px" }}>
<span className="eyebrow">The tool</span>
<h2 className="h2">Build your house.</h2>
</div>
<InvestmentHouse />
</div>
</section>
{/* CTA */}
<section style={{ background: "#FAAC15", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center", textAlign: "center" }}>
<h2 className="h2" style={{ fontSize: "46px", maxWidth: "760px" }}>Ready to build the real one?</h2>
<p className="body" style={{ color: "#111111", maxWidth: "600px" }}>The tool uses round numbers and average returns. Your life doesn't. In a coaching session we build it with your actual income, goals and timeline, and you leave with a plan you understand.</p>
<div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
<a href="/contact-us/" className="btn btn-dark">Book a 10-minute call</a>
<a href="/investing-made-simple/" className="btn btn-ghost">Or learn to do it yourself</a>
</div>
<span className="compliance" style={{ color: "#5A4A1A", maxWidth: "560px" }}>This tool is for education only. Luca Caruana is a Certified Money Coach, not a licensed financial adviser. Nothing on this page is financial advice or a personal recommendation.</span>
</div>
</section>

      </main>
      <PageFooter note="Money Coaching Hub provides financial education and coaching. It is not licensed to provide investment advice and does not sell financial products." />
    </>
  );
}
