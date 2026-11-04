import type { Metadata } from "next";
import { PageFooter, PageHeader } from "@/components/chrome";
import QuizSection from "@/components/QuizSection";

export const metadata: Metadata = {
  title: "Money Type Quiz",
  description: "Which money types are running your money life? Take the three-minute Money Type Quiz and find out.",
  alternates: { canonical: "/take-money-type-quiz/" },
};

export default function Page() {
  return (
    <>
      <PageHeader cta={{ label: "Start the quiz", href: "#quiz" }} />
      <main id="main">
{/* HERO */}
<section style={{ background: "#FDF7E8", padding: "72px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center", textAlign: "center" }}>
<span className="eyebrow">Free · 3 minutes · Instant result</span>
<h1 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "60px", lineHeight: "1.02", letterSpacing: "-0.02em", margin: "0", maxWidth: "860px" }}>Which money types are running your money life?</h1>
<p className="body" style={{ fontSize: "20px", maxWidth: "640px" }}>Some days you're the Warrior in the driving seat. Other days the Innocent or the Martyr takes over, or the Fool goes on a splurge. Most of us carry three or four types, with one or two in charge. Find yours.</p>
<a href="#quiz" className="btn btn-gold">Start the quiz</a>
<span style={{ fontSize: "13px", color: "#6B6248" }}>The eight money types and this quiz are from <em>Money Magic</em> by Deborah L. Price, founder of the Money Coaching Institute, used with permission.</span>
</div>
</section>
<QuizSection />
{/* THE EIGHT, SHORT */}
<section style={{ background: "#FDF7E8", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", flexWrap: "wrap" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}><span className="eyebrow">The eight types</span><h2 className="h2">Meet the cast.</h2></div>
<a href="/the-8-money-archetypes/" style={{ fontWeight: "700", fontSize: "15px" }}>Full descriptions →</a>
</div>
<div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "16px" }}>
<a href="/the-8-money-archetypes/#innocent" className="type"><strong style={{ fontFamily: "Raleway,sans-serif", fontSize: "18px" }}>The Innocent</strong><span style={{ fontSize: "15px", color: "#3A3A3A" }}>Avoids looking at money and hopes it all works out.</span></a>
<a href="/the-8-money-archetypes/#victim" className="type"><strong style={{ fontFamily: "Raleway,sans-serif", fontSize: "18px" }}>The Victim</strong><span style={{ fontSize: "15px", color: "#3A3A3A" }}>Feels money happens to them, not by them.</span></a>
<a href="/the-8-money-archetypes/#warrior" className="type"><strong style={{ fontFamily: "Raleway,sans-serif", fontSize: "18px" }}>The Warrior</strong><span style={{ fontSize: "15px", color: "#3A3A3A" }}>In the driving seat: decisive and goal-driven.</span></a>
<a href="/the-8-money-archetypes/#martyr" className="type"><strong style={{ fontFamily: "Raleway,sans-serif", fontSize: "18px" }}>The Martyr</strong><span style={{ fontSize: "15px", color: "#3A3A3A" }}>Takes care of everyone else's needs first.</span></a>
<a href="/the-8-money-archetypes/#fool" className="type"><strong style={{ fontFamily: "Raleway,sans-serif", fontSize: "18px" }}>The Fool</strong><span style={{ fontSize: "15px", color: "#3A3A3A" }}>Loves the thrill. Hello, impulsive splurge.</span></a>
<a href="/the-8-money-archetypes/#creator" className="type"><strong style={{ fontFamily: "Raleway,sans-serif", fontSize: "18px" }}>The Creator</strong><span style={{ fontSize: "15px", color: "#3A3A3A" }}>Values meaning and freedom over money.</span></a>
<a href="/the-8-money-archetypes/#tyrant" className="type"><strong style={{ fontFamily: "Raleway,sans-serif", fontSize: "18px" }}>The Tyrant</strong><span style={{ fontSize: "15px", color: "#3A3A3A" }}>Uses money to keep control and feel safe.</span></a>
<a href="/the-8-money-archetypes/#magician" className="type" style={{ background: "#FAAC15", borderColor: "#FAAC15" }}><strong style={{ fontFamily: "Raleway,sans-serif", fontSize: "18px" }}>The Magician ✦</strong><span style={{ fontSize: "15px", color: "#111111" }}>Balanced, confident and at peace with money. The goal.</span></a>
</div>
</div>
</section>

      </main>
      <PageFooter note={<>The Money Types are from <em>Money Magic</em> by Deborah L. Price, used with permission. This quiz is for self-reflection, not diagnosis or financial advice.</>} />
    </>
  );
}
