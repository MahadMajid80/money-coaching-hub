import type { Metadata } from "next";
import { NotifyForm } from "@/components/forms";
import HashViews from "@/components/HashViews";
import { sideHustle } from "@/lib/sideHustle";
import "./side-hustle.css";

export const metadata: Metadata = {
  title: "Side Hustle, Done Right",
  description: "Thinking about a side hustle? Start here. A live online session and a six-week founding cohort with money coach Luca Caruana, from idea to first paying customer.",
  alternates: { canonical: "/side-hustle/" },
};

export default function Page() {
  const { stage, introCheckout, programmeCheckout } = sideHustle;
  return (
    <div className="sh-page">
      <HashViews names={["notify", "intro", "programme"]} initial={stage} />
      <div className="view" id="view-notify" hidden={stage !== "notify"}>

<div style={{ width: "100%", fontFamily: "Lato,'Segoe UI',sans-serif", color: "#111111", background: "#FFFFFF", display: "flex", flexDirection: "column" }}>
<header style={{ background: "#FFFFFF", borderBottom: "1px solid #EFE6CF" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "12px clamp(20px,4vw,40px)", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
<a href="/" aria-label="Money Coaching Hub home" style={{ display: "flex", alignItems: "center" }}><img src="/img/logo.png" alt="Money Coaching Hub" style={{ height: "60px", width: "auto", display: "block" }} /></a>
<a href="#nt-notify" className="btn btn-dark" style={{ minHeight: "46px", padding: "0 22px", fontSize: "15px" }}>Notify me</a>
</div>
</header>
<section id="nt-top" style={{ background: "#FDF7E8", overflow: "hidden" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "64px clamp(20px,4vw,40px) 0", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "40px 64px", alignItems: "flex-end" }}>
<div style={{ flex: "1 1 520px", minWidth: "0", paddingBottom: "72px", display: "flex", flexDirection: "column", gap: "26px" }}>
<p style={{ margin: "0", alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "10px", padding: "9px 16px", borderRadius: "20px", border: "1.5px solid #E2D6B4", background: "#FFFFFF", fontSize: "15px", fontWeight: "700", lineHeight: "1.4", color: "#111111" }}><span aria-hidden="true" style={{ flex: "0 0 auto", width: "10px", height: "10px", borderRadius: "50%", background: "#FAAC15" }}></span><span>Live online intro · Wednesday 20 January 2027 · <span className="ph">7.30pm to 8.30pm</span></span></p>
<h1 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "clamp(42px,4.8vw,66px)", lineHeight: "1.04", letterSpacing: "-0.02em", color: "#111111" }}>Thinking about a side hustle? <span style={{ textDecoration: "underline", textDecorationColor: "#FAAC15", textDecorationThickness: "0.14em", textUnderlineOffset: "0.08em", textDecorationSkipInk: "none" }}>Start here.</span></h1>
<p className="body" style={{ fontSize: "20px", maxWidth: "34em" }}>A 60-minute live session with money coach Luca Caruana. Find out what you could realistically earn on the side, what stops most people from ever starting, and how to take your first step.</p>
<NotifyForm id="nt-notify" note="Booking opens in January. Leave your email and you'll be the first to know." />
</div>
<div style={{ flex: "0 1 460px", minWidth: "0", display: "flex", justifyContent: "center" }}>
<div style={{ position: "relative", width: "100%", maxWidth: "460px", aspectRatio: "23/28", marginTop: "24px", borderRadius: "28px 28px 0 0", background: "#FFD112", overflow: "hidden" }}>
<img src="/img/luca-yellow.webp" alt="Luca Caruana, smiling" style={{ position: "absolute", left: "50%", bottom: "0", transform: "translateX(-50%)", width: "108%", maxWidth: "none", height: "auto", display: "block" }} />
<div style={{ position: "absolute", left: "20px", bottom: "20px", display: "flex", flexDirection: "column", gap: "2px", padding: "14px 18px", borderRadius: "16px", background: "#FFFFFF", boxShadow: "0 12px 32px rgba(17,17,17,0.18)" }}>
<span className="disp" style={{ fontWeight: "800", fontSize: "22px", lineHeight: "1.15", color: "#111111" }}>€50 → €5,000</span>
<span style={{ fontSize: "13px", lineHeight: "1.4", color: "#3A3A3A" }}>a month, built on the side</span>
</div>
</div>
</div>
</div>
</section>
<footer style={{ background: "#111111", color: "#C9C3B1" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "44px clamp(20px,4vw,40px)", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "18px" }}>
<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
<span className="disp" style={{ fontWeight: "800", fontSize: "18px", letterSpacing: ".04em", color: "#FFFFFF" }}>MONEY COACHING HUB</span>
<nav aria-label="Legal" style={{ display: "flex", flexWrap: "wrap", gap: "20px", fontSize: "14px" }}><a href="/privacy-policy/" className="lk-d">Privacy</a><a href="/cookie-policy/" className="lk-d">Cookies</a><a href="/website-terms-and-conditions/" className="lk-d">Terms</a></nav>
</div>
<p style={{ margin: "0", maxWidth: "62em", fontSize: "15px", lineHeight: "1.6", color: "#FFFFFF" }}>This session is educational. Any earnings shared are real examples, not promises. What you earn depends on your idea, your effort and your market.</p>
<p style={{ margin: "0", maxWidth: "62em", fontSize: "13px", lineHeight: "1.6" }}>Money Coaching Hub provides financial education and coaching. Luca Caruana is a Certified Money Coach (CMC®), not a licensed investment adviser. Nothing on this website is financial advice or a personal recommendation.</p>
<p style={{ margin: "0", fontSize: "13px" }}>© 2026 Money Coaching Hub. All rights reserved.</p>
</div>
</footer>
</div>

      </div>
      <div className="view" id="view-intro" hidden={stage !== "intro"}>

<div style={{ width: "100%", fontFamily: "Lato,'Segoe UI',sans-serif", color: "#111111", background: "#FFFFFF", display: "flex", flexDirection: "column" }}>
<header style={{ background: "#FFFFFF", borderBottom: "1px solid #EFE6CF" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "12px clamp(20px,4vw,40px)", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
<a href="/" aria-label="Money Coaching Hub home" style={{ display: "flex", alignItems: "center" }}><img src="/img/logo.png" alt="Money Coaching Hub" style={{ height: "60px", width: "auto", display: "block" }} /></a>
<a href="#in-book" className="btn btn-dark" style={{ minHeight: "46px", padding: "0 22px", fontSize: "15px" }}>Save my seat, €25</a>
</div>
</header>
<section id="in-top" style={{ background: "#FDF7E8", overflow: "hidden" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "64px clamp(20px,4vw,40px) 0", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "40px 64px", alignItems: "flex-end" }}>
<div style={{ flex: "1 1 520px", minWidth: "0", paddingBottom: "72px", display: "flex", flexDirection: "column", gap: "26px" }}>
<p style={{ margin: "0", alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "10px", padding: "9px 16px", borderRadius: "20px", border: "1.5px solid #E2D6B4", background: "#FFFFFF", fontSize: "15px", fontWeight: "700", lineHeight: "1.4", color: "#111111" }}><span aria-hidden="true" style={{ flex: "0 0 auto", width: "10px", height: "10px", borderRadius: "50%", background: "#FAAC15" }}></span><span>Live online intro · Wednesday 20 January 2027 · <span className="ph">7.30pm to 8.30pm</span></span></p>
<h1 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "clamp(42px,4.8vw,66px)", lineHeight: "1.04", letterSpacing: "-0.02em", color: "#111111" }}>Thinking about a side hustle? <span style={{ textDecoration: "underline", textDecorationColor: "#FAAC15", textDecorationThickness: "0.14em", textUnderlineOffset: "0.08em", textDecorationSkipInk: "none" }}>Start here.</span></h1>
<p className="body" style={{ fontSize: "20px", maxWidth: "34em" }}>A 60-minute live session with money coach Luca Caruana. Find out what you could realistically earn on the side, what stops most people from ever starting, and how to take your first step.</p>
<div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
<a href="#in-book" className="btn btn-gold" style={{ minHeight: "56px", padding: "0 32px", fontSize: "17px" }}>Save my seat, €25</a>
<p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "#3A3A3A" }}>Your €25 comes off the programme fee if you decide to join.</p>
</div>
</div>
<div style={{ flex: "0 1 460px", minWidth: "0", display: "flex", justifyContent: "center" }}>
<div style={{ position: "relative", width: "100%", maxWidth: "460px", aspectRatio: "23/28", marginTop: "24px", borderRadius: "28px 28px 0 0", background: "#FFD112", overflow: "hidden" }}>
<img src="/img/luca-yellow.webp" alt="Luca Caruana, smiling" style={{ position: "absolute", left: "50%", bottom: "0", transform: "translateX(-50%)", width: "108%", maxWidth: "none", height: "auto", display: "block" }} />
<div style={{ position: "absolute", left: "20px", bottom: "20px", display: "flex", flexDirection: "column", gap: "2px", padding: "14px 18px", borderRadius: "16px", background: "#FFFFFF", boxShadow: "0 12px 32px rgba(17,17,17,0.18)" }}>
<span className="disp" style={{ fontWeight: "800", fontSize: "22px", lineHeight: "1.15", color: "#111111" }}>€50 → €5,000</span>
<span style={{ fontSize: "13px", lineHeight: "1.4", color: "#3A3A3A" }}>a month, built on the side</span>
</div>
</div>
</div>
</div>
</section>
<section style={{ background: "#FFFFFF" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "80px clamp(20px,4vw,40px)", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "48px" }}>
<div style={{ display: "flex", flexWrap: "wrap", gap: "40px 56px", alignItems: "center" }}>
<div style={{ flex: "1 1 460px", minWidth: "0", display: "flex", flexDirection: "column", gap: "18px" }}>
<span className="eyebrow">Sound familiar?</span>
<h2 className="h2">You've been thinking about it for a while.</h2>
<p className="body">Earning something extra. Building something that's yours.</p>
<p className="body">Maybe you even have an idea. Then work, family and life get in the way. And the questions start.</p>
</div>
<ul style={{ flex: "1 1 420px", minWidth: "0", margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "14px", alignItems: "flex-start" }}>
<li className="disp" style={{ boxSizing: "border-box", padding: "16px 22px", borderRadius: "22px 22px 22px 6px", background: "#FDF7E8", border: "1.5px solid #EFE2BF", fontWeight: "700", fontSize: "21px", lineHeight: "1.35", color: "#111111" }}>“Where would I even start?”</li>
<li className="disp" style={{ boxSizing: "border-box", marginLeft: "clamp(0px,5vw,64px)", padding: "16px 22px", borderRadius: "22px 22px 22px 6px", background: "#FDF7E8", border: "1.5px solid #EFE2BF", fontWeight: "700", fontSize: "21px", lineHeight: "1.35", color: "#111111" }}>“Who would pay me?”</li>
<li className="disp" style={{ boxSizing: "border-box", marginLeft: "clamp(0px,2.5vw,32px)", padding: "16px 22px", borderRadius: "22px 22px 22px 6px", background: "#FDF7E8", border: "1.5px solid #EFE2BF", fontWeight: "700", fontSize: "21px", lineHeight: "1.35", color: "#111111" }}>“Am I good enough at anything to charge for it?”</li>
</ul>
</div>
<div style={{ borderTop: "1px solid #EFE6CF", paddingTop: "36px", display: "flex", flexWrap: "wrap", gap: "12px 40px", alignItems: "baseline" }}>
<p className="disp" style={{ margin: "0", flex: "1 1 520px", minWidth: "0", fontWeight: "800", fontSize: "clamp(24px,2.4vw,32px)", lineHeight: "1.25", color: "#111111" }}>You're not alone. Most people who want a side hustle never start.</p>
<p className="body" style={{ flex: "1 1 340px", minWidth: "0" }}>Not because they lack talent. Because nobody showed them how.</p>
</div>
</div>
</section>
<section style={{ background: "#FDF7E8" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "80px clamp(20px,4vw,40px)", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "40px 64px", alignItems: "flex-start" }}>
<div style={{ flex: "1 1 300px", minWidth: "0", display: "flex", flexDirection: "column", gap: "24px", alignItems: "flex-start" }}>
<h2 className="h2">In 60 minutes, you'll</h2>
<a href="#in-book" className="btn btn-dark">Save my seat, €25</a>
</div>
<ol style={{ flex: "2 1 560px", minWidth: "0", margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", borderBottom: "1px solid #E9DDBC" }}>
<li style={{ display: "flex", gap: "20px", alignItems: "flex-start", padding: "22px 0", borderTop: "1px solid #E9DDBC" }}><span aria-hidden="true" className="disp" style={{ flex: "0 0 auto", width: "44px", height: "44px", borderRadius: "50%", background: "#FAAC15", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "17px", color: "#111111" }}>1</span><span style={{ flex: "1 1 auto", minWidth: "0", paddingTop: "8px", fontSize: "19px", lineHeight: "1.55", color: "#111111" }}>Hear how I built Money Coaching Hub from €50 a month to €5,000 a month, alongside a full-time job and two kids</span></li>
<li style={{ display: "flex", gap: "20px", alignItems: "flex-start", padding: "22px 0", borderTop: "1px solid #E9DDBC" }}><span aria-hidden="true" className="disp" style={{ flex: "0 0 auto", width: "44px", height: "44px", borderRadius: "50%", background: "#FAAC15", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "17px", color: "#111111" }}>2</span><span style={{ flex: "1 1 auto", minWidth: "0", paddingTop: "8px", fontSize: "19px", lineHeight: "1.55", color: "#111111" }}>See what a side hustle could realistically earn you, with simple, honest maths</span></li>
<li style={{ display: "flex", gap: "20px", alignItems: "flex-start", padding: "22px 0", borderTop: "1px solid #E9DDBC" }}><span aria-hidden="true" className="disp" style={{ flex: "0 0 auto", width: "44px", height: "44px", borderRadius: "50%", background: "#FAAC15", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "17px", color: "#111111" }}>3</span><span style={{ flex: "1 1 auto", minWidth: "0", paddingTop: "8px", fontSize: "19px", lineHeight: "1.55", color: "#111111" }}>Understand the three things that stop most people from starting, and from ever earning</span></li>
<li style={{ display: "flex", gap: "20px", alignItems: "flex-start", padding: "22px 0", borderTop: "1px solid #E9DDBC" }}><span aria-hidden="true" className="disp" style={{ flex: "0 0 auto", width: "44px", height: "44px", borderRadius: "50%", background: "#FAAC15", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "17px", color: "#111111" }}>4</span><span style={{ flex: "1 1 auto", minWidth: "0", paddingTop: "8px", fontSize: "19px", lineHeight: "1.55", color: "#111111" }}>Spot your own hidden skills with a quick exercise, and leave with at least one idea worth exploring</span></li>
<li style={{ display: "flex", gap: "20px", alignItems: "flex-start", padding: "22px 0", borderTop: "1px solid #E9DDBC" }}><span aria-hidden="true" className="disp" style={{ flex: "0 0 auto", width: "44px", height: "44px", borderRadius: "50%", background: "#FAAC15", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "17px", color: "#111111" }}>5</span><span style={{ flex: "1 1 auto", minWidth: "0", paddingTop: "8px", fontSize: "19px", lineHeight: "1.55", color: "#111111" }}>Find out about the 6-week programme starting in February</span></li>
</ol>
</div>
</section>
<section style={{ background: "#FFFFFF" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "80px clamp(20px,4vw,40px)", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "40px 64px", alignItems: "flex-start" }}>
<div style={{ flex: "0 1 420px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px" }}>
<img src="/img/luca-seated.jpg" alt="Luca Caruana explaining a point during a TV interview" style={{ width: "100%", maxWidth: "420px", aspectRatio: "4/5", height: "auto", objectFit: "cover", objectPosition: "50% 22%", borderRadius: "24px", display: "block" }} />
<figure style={{ margin: "0", padding: "22px 24px", borderRadius: "20px", background: "#FDF7E8", display: "flex", flexDirection: "column", gap: "14px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
<div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "14px", color: "#6B6248" }}><span>Where it started</span><span style={{ fontWeight: "700", color: "#111111" }}>€50 a month</span></div>
<div style={{ height: "14px", borderRadius: "7px", background: "#EFE4C6", overflow: "hidden" }}><div style={{ width: "1%", minWidth: "4px", height: "100%", borderRadius: "7px", background: "#FAAC15" }}></div></div>
</div>
<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
<div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "14px", color: "#6B6248" }}><span>Where it grew</span><span style={{ fontWeight: "700", color: "#111111" }}>€5,000 a month</span></div>
<div style={{ height: "14px", borderRadius: "7px", background: "#EFE4C6", overflow: "hidden" }}><div style={{ width: "100%", height: "100%", borderRadius: "7px", background: "#FAAC15" }}></div></div>
</div>
<figcaption style={{ fontSize: "13px", lineHeight: "1.4", color: "#6B6248" }}>Money Coaching Hub, built on the side. Bars drawn to scale.</figcaption>
</figure>
</div>
<div style={{ flex: "1 1 480px", minWidth: "0", display: "flex", flexDirection: "column", gap: "18px" }}>
<span className="eyebrow">Meet Luca</span>
<h2 className="h2">I didn't start with a business plan.</h2>
<p className="body" style={{ fontSize: "21px", color: "#111111" }}>I started with €50 a month and a lot of late evenings.</p>
<p className="body">I built Money Coaching Hub on the side, alongside a full-time job, two kids and Monipal, the financial wellbeing platform I lead. Step by step, it grew to €5,000 a month. I made plenty of mistakes along the way. I'll share those too.</p>
<p style={{ margin: "0", padding: "14px 18px", border: "1.5px dashed #D9C48A", borderRadius: "14px", fontSize: "15px", lineHeight: "1.55", color: "#6B6248" }}>[Add from January: “In December 2026, I left my full-time job to go all in on what I built on the side.”]</p>
<ul style={{ margin: "6px 0 0", padding: "0", listStyle: "none", display: "flex", flexWrap: "wrap", gap: "10px" }}>
<li style={{ padding: "8px 14px", borderRadius: "999px", border: "1.5px solid #E2D6B4", fontSize: "14px", fontWeight: "700", color: "#111111" }}>Certified money coach</li>
<li style={{ padding: "8px 14px", borderRadius: "999px", border: "1.5px solid #E2D6B4", fontSize: "14px", fontWeight: "700", color: "#111111" }}>300+ clients coached</li>
<li style={{ padding: "8px 14px", borderRadius: "999px", border: "1.5px solid #E2D6B4", fontSize: "14px", fontWeight: "700", color: "#111111" }}>1,000+ workshop participants</li>
<li style={{ padding: "8px 14px", borderRadius: "999px", border: "1.5px solid #E2D6B4", fontSize: "14px", fontWeight: "700", color: "#111111" }}>Founder, Money Coaching Hub</li>
<li style={{ padding: "8px 14px", borderRadius: "999px", border: "1.5px solid #E2D6B4", fontSize: "14px", fontWeight: "700", color: "#111111" }}>CEO, Monipal</li>
</ul>
</div>
</div>
</section>
<section id="in-book" style={{ background: "#FDF7E8" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "80px clamp(20px,4vw,40px)", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "40px 64px", alignItems: "center" }}>
<div style={{ flex: "1 1 440px", minWidth: "0", display: "flex", flexDirection: "column", gap: "18px" }}>
<h2 className="h2">Why €25?</h2>
<p className="body">Because people who commit, show up. I want a room full of people who are serious about starting.</p>
<p className="body">And if you join the programme, your €25 comes straight off the fee. So if you're in, <strong style={{ color: "#111111" }}>the intro is free.</strong></p>
</div>
<div style={{ flex: "0 1 460px", minWidth: "0", background: "#111111", color: "#FFFFFF", borderRadius: "24px", padding: "36px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "22px" }}>
<span style={{ alignSelf: "flex-start", padding: "7px 14px", borderRadius: "999px", background: "#FAAC15", color: "#111111", fontWeight: "700", fontSize: "13px", letterSpacing: ".1em", textTransform: "uppercase" }}>The details</span>
<div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
<div aria-hidden="true" style={{ flex: "0 0 auto", width: "76px", borderRadius: "14px", overflow: "hidden", background: "#FFFFFF", textAlign: "center" }}>
<div style={{ background: "#FAAC15", color: "#111111", fontWeight: "700", fontSize: "12px", letterSpacing: ".14em", padding: "5px 0" }}>JAN</div>
<div className="disp" style={{ fontWeight: "800", fontSize: "34px", lineHeight: "1", padding: "8px 0 10px", color: "#111111" }}>20</div>
</div>
<div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
<span className="disp" style={{ fontWeight: "800", fontSize: "22px", lineHeight: "1.25", color: "#FFFFFF" }}>Wednesday 20 January 2027</span>
<span style={{ fontSize: "16px", color: "#C9C3B1" }}><span className="ph-d">7.30pm to 8.30pm</span></span>
</div>
</div>
<dl style={{ margin: "0", display: "flex", flexDirection: "column", borderBottom: "1px solid #2E2E2E" }}>
<div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", padding: "14px 0", borderTop: "1px solid #2E2E2E" }}><dt style={{ flex: "0 0 96px", fontSize: "12px", fontWeight: "700", letterSpacing: ".12em", textTransform: "uppercase", color: "#C9C3B1", paddingTop: "3px" }}>Where</dt><dd style={{ margin: "0", flex: "1 1 200px", minWidth: "0", fontSize: "16px", lineHeight: "1.5", color: "#FFFFFF" }}>Live online on <span className="ph-d">Zoom</span>. The link is emailed after booking.</dd></div>
<div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", padding: "14px 0", borderTop: "1px solid #2E2E2E" }}><dt style={{ flex: "0 0 96px", fontSize: "12px", fontWeight: "700", letterSpacing: ".12em", textTransform: "uppercase", color: "#C9C3B1", paddingTop: "3px" }}>Price</dt><dd style={{ margin: "0", flex: "1 1 200px", minWidth: "0", fontSize: "16px", lineHeight: "1.5", color: "#FFFFFF" }}>€25, credited against the programme fee</dd></div>
<div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", padding: "14px 0", borderTop: "1px solid #2E2E2E" }}><dt style={{ flex: "0 0 96px", fontSize: "12px", fontWeight: "700", letterSpacing: ".12em", textTransform: "uppercase", color: "#C9C3B1", paddingTop: "3px" }}>Bring</dt><dd style={{ margin: "0", flex: "1 1 200px", minWidth: "0", fontSize: "16px", lineHeight: "1.5", color: "#FFFFFF" }}>A pen and paper for the quick exercise</dd></div>
<div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", padding: "14px 0", borderTop: "1px solid #2E2E2E" }}><dt style={{ flex: "0 0 96px", fontSize: "12px", fontWeight: "700", letterSpacing: ".12em", textTransform: "uppercase", color: "#C9C3B1", paddingTop: "3px" }}>Recording</dt><dd style={{ margin: "0", flex: "1 1 200px", minWidth: "0", fontSize: "16px", lineHeight: "1.5", color: "#FFFFFF" }}><span className="ph-d">Live only, so the exercise and Q&amp;A work properly</span></dd></div>
</dl>
<a href={introCheckout} className="btn btn-gold" style={{ width: "100%" }}>Save my seat, €25</a>
</div>
</div>
</section>
<section style={{ background: "#FFFFFF" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "80px clamp(20px,4vw,40px)", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "36px" }}>
<h2 className="h2">Questions</h2>
<div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
<div style={{ flex: "1 1 440px", minWidth: "0", boxSizing: "border-box", background: "#FDF7E8", borderRadius: "20px", padding: "28px 30px", display: "flex", flexDirection: "column", gap: "10px" }}>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "20px", lineHeight: "1.3", color: "#111111" }}>Do I need a side hustle idea already?</h3>
<p className="body" style={{ fontSize: "17px", lineHeight: "1.6" }}>No. Most people come without one. The quick exercise helps you find a starting point.</p>
</div>
<div style={{ flex: "1 1 440px", minWidth: "0", boxSizing: "border-box", background: "#FDF7E8", borderRadius: "20px", padding: "28px 30px", display: "flex", flexDirection: "column", gap: "10px" }}>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "20px", lineHeight: "1.3", color: "#111111" }}>Is this a sales pitch?</h3>
<p className="body" style={{ fontSize: "17px", lineHeight: "1.6" }}>I'll tell you about the programme in the last 10 minutes. The rest is real, useful content you can act on, whether you join or not.</p>
</div>
<div style={{ flex: "1 1 440px", minWidth: "0", boxSizing: "border-box", background: "#FDF7E8", borderRadius: "20px", padding: "28px 30px", display: "flex", flexDirection: "column", gap: "10px" }}>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "20px", lineHeight: "1.3", color: "#111111" }}>I already have a side hustle, but it barely earns. Is this for me?</h3>
<p className="body" style={{ fontSize: "17px", lineHeight: "1.6" }}>Yes. The same things that stop people starting often stop side hustles from paying.</p>
</div>
<div style={{ flex: "1 1 440px", minWidth: "0", boxSizing: "border-box", background: "#FDF7E8", borderRadius: "20px", padding: "28px 30px", display: "flex", flexDirection: "column", gap: "10px" }}>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "20px", lineHeight: "1.3", color: "#111111" }}>What if I can't make it on the night?</h3>
<p className="body" style={{ fontSize: "17px", lineHeight: "1.6" }}><span className="ph">Join the notify list and you'll hear about the next intro.</span></p>
</div>
</div>
</div>
</section>
<section style={{ background: "#FAAC15" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "80px clamp(20px,4vw,40px)", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "28px 48px", alignItems: "center", justifyContent: "space-between" }}>
<div style={{ flex: "1 1 560px", minWidth: "0", display: "flex", flexDirection: "column", gap: "14px" }}>
<h2 className="h2" style={{ fontSize: "clamp(34px,4vw,52px)" }}>Your side hustle won't start itself. Give it one hour.</h2>
<p style={{ margin: "0", fontSize: "18px", lineHeight: "1.5", color: "#111111" }}>Wednesday 20 January 2027 · <span className="ph">7.30pm to 8.30pm</span> · Live online</p>
</div>
<a href="#in-book" className="btn btn-dark" style={{ minHeight: "58px", padding: "0 34px", fontSize: "17px" }}>Save my seat, €25</a>
</div>
</section>
<footer style={{ background: "#111111", color: "#C9C3B1" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "44px clamp(20px,4vw,40px)", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "18px" }}>
<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
<span className="disp" style={{ fontWeight: "800", fontSize: "18px", letterSpacing: ".04em", color: "#FFFFFF" }}>MONEY COACHING HUB</span>
<nav aria-label="Legal" style={{ display: "flex", flexWrap: "wrap", gap: "20px", fontSize: "14px" }}><a href="/privacy-policy/" className="lk-d">Privacy</a><a href="/cookie-policy/" className="lk-d">Cookies</a><a href="/website-terms-and-conditions/" className="lk-d">Terms</a></nav>
</div>
<p style={{ margin: "0", maxWidth: "62em", fontSize: "15px", lineHeight: "1.6", color: "#FFFFFF" }}>This session is educational. Any earnings shared are real examples, not promises. What you earn depends on your idea, your effort and your market.</p>
<p style={{ margin: "0", maxWidth: "62em", fontSize: "13px", lineHeight: "1.6" }}>Money Coaching Hub provides financial education and coaching. Luca Caruana is a Certified Money Coach (CMC®), not a licensed investment adviser. Nothing on this website is financial advice or a personal recommendation.</p>
<p style={{ margin: "0", fontSize: "13px" }}>© 2026 Money Coaching Hub. All rights reserved.</p>
</div>
</footer>
</div>

      </div>
      <div className="view" id="view-programme" hidden={stage !== "programme"}>

<div style={{ width: "100%", fontFamily: "Lato,'Segoe UI',sans-serif", color: "#111111", background: "#FFFFFF", display: "flex", flexDirection: "column" }}>
<header style={{ background: "#FFFFFF", borderBottom: "1px solid #EFE6CF" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "12px clamp(20px,4vw,40px)", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
<a href="/" aria-label="Money Coaching Hub home" style={{ display: "flex", alignItems: "center" }}><img src="/img/logo.png" alt="Money Coaching Hub" style={{ height: "60px", width: "auto", display: "block" }} /></a>
<a href="#pg-join" className="btn btn-dark" style={{ minHeight: "46px", padding: "0 22px", fontSize: "15px" }}>Join the founding cohort</a>
</div>
</header>
<section id="pg-top" style={{ background: "#FDF7E8", overflow: "hidden" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "64px clamp(20px,4vw,40px) 0", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "40px 64px", alignItems: "flex-end" }}>
<div style={{ flex: "1 1 540px", minWidth: "0", paddingBottom: "72px", display: "flex", flexDirection: "column", gap: "24px" }}>
<span className="disp" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "10px", fontWeight: "800", fontSize: "15px", letterSpacing: ".12em", textTransform: "uppercase", color: "#111111" }}><span aria-hidden="true" style={{ flex: "0 0 auto", width: "14px", height: "14px", borderRadius: "3px", background: "#FAAC15" }}></span><span className="ph">Side Hustle, Done Right</span></span>
<p style={{ margin: "0", alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "10px", padding: "9px 16px", borderRadius: "20px", border: "1.5px solid #E2D6B4", background: "#FFFFFF", fontSize: "15px", fontWeight: "700", lineHeight: "1.4", color: "#111111" }}><span aria-hidden="true" style={{ flex: "0 0 auto", width: "10px", height: "10px", borderRadius: "50%", background: "#FAAC15" }}></span><span>Founding cohort · 6 Wednesday evenings, 17 February to 24 March 2027 · Live online · <span className="ph">15</span> places</span></p>
<h1 className="disp" style={{ margin: "0", display: "flex", flexDirection: "column", gap: "12px", fontWeight: "800", color: "#111111" }}><span style={{ fontSize: "clamp(40px,4.6vw,62px)", lineHeight: "1.04", letterSpacing: "-0.02em" }}>From idea to launch in 6 weeks.</span><span style={{ fontSize: "clamp(24px,2.4vw,32px)", lineHeight: "1.25", fontWeight: "700", letterSpacing: "-0.01em" }}>With someone who's <span style={{ textDecoration: "underline", textDecorationColor: "#FAAC15", textDecorationThickness: "0.18em", textUnderlineOffset: "0.12em", textDecorationSkipInk: "none" }}>actually done it.</span></span></h1>
<p className="body" style={{ fontSize: "20px", maxWidth: "34em" }}>A hands-on programme for people with a full-time job and a full life. One evening a week, you'll find your idea, price it, build your brand and reach your first customers, step by step, with money coach Luca Caruana.</p>
<div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
<a href="#pg-join" className="btn btn-gold" style={{ minHeight: "56px", padding: "0 32px", fontSize: "17px" }}>Join the founding cohort, €295</a>
<p style={{ margin: "0", maxWidth: "36em", fontSize: "15px", lineHeight: "1.5", color: "#3A3A3A" }}>Founding price, first cohort only. Pay in full or in 2 instalments. Came to the intro? Use your €25 code.</p>
</div>
</div>
<div style={{ flex: "0 1 460px", minWidth: "0", display: "flex", justifyContent: "center" }}>
<div style={{ position: "relative", width: "100%", maxWidth: "460px", aspectRatio: "23/28", marginTop: "24px", borderRadius: "28px 28px 0 0", background: "#FFD112", overflow: "hidden" }}>
<img src="/img/luca-yellow.webp" alt="Luca Caruana, smiling" style={{ position: "absolute", left: "50%", bottom: "0", transform: "translateX(-50%)", width: "108%", maxWidth: "none", height: "auto", display: "block" }} />
<div style={{ position: "absolute", left: "20px", bottom: "20px", display: "flex", flexDirection: "column", gap: "2px", padding: "14px 18px", borderRadius: "16px", background: "#FFFFFF", boxShadow: "0 12px 32px rgba(17,17,17,0.18)" }}>
<span className="disp" style={{ fontWeight: "800", fontSize: "22px", lineHeight: "1.15", color: "#111111" }}>€50 → €5,000</span>
<span style={{ fontSize: "13px", lineHeight: "1.4", color: "#3A3A3A" }}>a month, built on the side</span>
</div>
</div>
</div>
</div>
</section>
<section style={{ background: "#FFFFFF" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "80px clamp(20px,4vw,40px)", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "32px 64px", alignItems: "flex-start" }}>
<div style={{ flex: "1 1 300px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
<span className="eyebrow">Who it's for</span>
<h2 className="h2">This is for you if</h2>
</div>
<div style={{ flex: "2 1 560px", minWidth: "0", display: "flex", flexDirection: "column", gap: "24px" }}>
<ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", borderBottom: "1px solid #EFE6CF" }}>
<li style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "16px 0", borderTop: "1px solid #EFE6CF" }}><span className="chk" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg></span><span style={{ flex: "1 1 auto", minWidth: "0", paddingTop: "1px", fontSize: "19px", lineHeight: "1.55", color: "#111111" }}>You want extra income, but don't know where to start</span></li>
<li style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "16px 0", borderTop: "1px solid #EFE6CF" }}><span className="chk" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg></span><span style={{ flex: "1 1 auto", minWidth: "0", paddingTop: "1px", fontSize: "19px", lineHeight: "1.55", color: "#111111" }}>You have a skill, a passion or an idea, and you've never made money from it</span></li>
<li style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "16px 0", borderTop: "1px solid #EFE6CF" }}><span className="chk" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg></span><span style={{ flex: "1 1 auto", minWidth: "0", paddingTop: "1px", fontSize: "19px", lineHeight: "1.55", color: "#111111" }}>You've started something, but it barely pays</span></li>
<li style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "16px 0", borderTop: "1px solid #EFE6CF" }}><span className="chk" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg></span><span style={{ flex: "1 1 auto", minWidth: "0", paddingTop: "1px", fontSize: "19px", lineHeight: "1.55", color: "#111111" }}>You have a job, a family and limited time, and need a plan that fits around them</span></li>
</ul>
<p style={{ margin: "0", display: "flex", gap: "16px", alignItems: "flex-start", padding: "18px 20px", borderRadius: "16px", background: "#F6F2E8", fontSize: "17px", lineHeight: "1.55", color: "#3A3A3A" }}><span aria-hidden="true" style={{ flex: "0 0 auto", width: "28px", height: "28px", borderRadius: "50%", background: "#E3DCCB", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"></path></svg></span><span style={{ flex: "1 1 auto", minWidth: "0", paddingTop: "2px" }}><strong style={{ color: "#111111" }}>It's not for you if</strong> you're looking for a get-rich-quick scheme, or you want someone to build it for you.</span></p>
</div>
</div>
</section>
<section style={{ background: "#FDF7E8" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "80px clamp(20px,4vw,40px)", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "36px" }}>
<h2 className="h2">Why this is different</h2>
<div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
<div style={{ flex: "1 1 440px", minWidth: "0", boxSizing: "border-box", background: "#FFFFFF", borderRadius: "20px", padding: "30px", display: "flex", flexDirection: "column", gap: "12px" }}>
<span aria-hidden="true" style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#FAAC15", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21v-9"></path><path d="M12 12c0-4.4 3-7 8-7 0 4.4-3 7-8 7z"></path><path d="M12 15c0-3.3-2.4-5.5-7-5.5 0 3.3 2.4 5.5 7 5.5z"></path></svg></span>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "22px", lineHeight: "1.25", color: "#111111" }}>Built by someone who did it.</h3>
<p className="body" style={{ fontSize: "17px", lineHeight: "1.6" }}>I built Money Coaching Hub from €50 a month to €5,000 a month, on the side, with a full-time job, two kids and Monipal. Every week, I'll show you what I did, what I charged, and what I'd never do again.</p>
</div>
<div style={{ flex: "1 1 440px", minWidth: "0", boxSizing: "border-box", background: "#FFFFFF", borderRadius: "20px", padding: "30px", display: "flex", flexDirection: "column", gap: "12px" }}>
<span aria-hidden="true" style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#FAAC15", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h4L19 9l-4-4L4 16v4z"></path><path d="M13 7l4 4"></path></svg></span>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "22px", lineHeight: "1.25", color: "#111111" }}>You build it in the room.</h3>
<p className="body" style={{ fontSize: "17px", lineHeight: "1.6" }}>You don't just learn. You do it, live, with me. Every week you leave with something done: your idea, your price, your bio, your first message to a customer.</p>
</div>
<div style={{ flex: "1 1 440px", minWidth: "0", boxSizing: "border-box", background: "#FFFFFF", borderRadius: "20px", padding: "30px", display: "flex", flexDirection: "column", gap: "12px" }}>
<span aria-hidden="true" style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#FAAC15", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M15.5 8.6a4 4 0 1 0 0 6.8"></path><path d="M7.5 10.8h5.5"></path><path d="M7.5 13.4h5.5"></path></svg></span>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "22px", lineHeight: "1.25", color: "#111111" }}>The money side, sorted.</h3>
<p className="body" style={{ fontSize: "17px", lineHeight: "1.6" }}>Most programmes skip it. Pricing. Undercharging. Feeling awkward charging friends. What the extra income should actually do for your life. As a money coach, this is my home ground.</p>
</div>
<div style={{ flex: "1 1 440px", minWidth: "0", boxSizing: "border-box", background: "#FFFFFF", borderRadius: "20px", padding: "30px", display: "flex", flexDirection: "column", gap: "12px" }}>
<span aria-hidden="true" style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#FAAC15", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg></span>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "22px", lineHeight: "1.25", color: "#111111" }}>Built for busy people.</h3>
<p className="body" style={{ fontSize: "17px", lineHeight: "1.6" }}>One 90-minute evening a week. One small action, about 2 hours. That's it.</p>
</div>
</div>
</div>
</section>
<section id="pg-weeks" style={{ background: "#111111", color: "#FFFFFF" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "80px clamp(20px,4vw,40px)", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "36px" }}>
<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "16px 40px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
<span className="eyebrow" style={{ color: "#FFD112" }}>6 Wednesday evenings</span>
<h2 className="h2" style={{ color: "#FFFFFF" }}>The 6 weeks</h2>
</div>
<p style={{ margin: "0", fontSize: "16px", lineHeight: "1.5", color: "#C9C3B1" }}>17 February to 24 March 2027 · Live online</p>
</div>
<ol style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexWrap: "wrap", gap: "20px" }}>
<li style={{ flex: "1 1 320px", minWidth: "0", boxSizing: "border-box", background: "#1F1F1F", borderRadius: "20px", padding: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}><span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFD112" }}>Week 1</span><span style={{ padding: "5px 12px", borderRadius: "999px", background: "#FAAC15", color: "#111111", fontSize: "14px", fontWeight: "700" }}>Wed 17 Feb</span></div>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "26px", lineHeight: "1.2", color: "#FFFFFF" }}>Find it</h3>
<p style={{ margin: "0", fontSize: "16px", lineHeight: "1.55", color: "#C9C3B1" }}>Your Life Inventory: what you're good at, what you enjoy, what people already ask you for</p>
<div style={{ marginTop: "auto", paddingTop: "16px", borderTop: "1px solid #333333", display: "flex", flexDirection: "column", gap: "6px" }}><span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".14em", textTransform: "uppercase", color: "#C9C3B1" }}>You leave with</span><span style={{ fontSize: "17px", fontWeight: "700", lineHeight: "1.45", color: "#FFFFFF" }}>A shortlist of 3 side hustle ideas</span></div>
</li>
<li style={{ flex: "1 1 320px", minWidth: "0", boxSizing: "border-box", background: "#1F1F1F", borderRadius: "20px", padding: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}><span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFD112" }}>Week 2</span><span style={{ padding: "5px 12px", borderRadius: "999px", background: "#FAAC15", color: "#111111", fontSize: "14px", fontWeight: "700" }}>Wed 24 Feb</span></div>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "26px", lineHeight: "1.2", color: "#FFFFFF" }}>Test it</h3>
<p style={{ margin: "0", fontSize: "16px", lineHeight: "1.55", color: "#C9C3B1" }}>Talk to real potential customers before building anything</p>
<div style={{ marginTop: "auto", paddingTop: "16px", borderTop: "1px solid #333333", display: "flex", flexDirection: "column", gap: "6px" }}><span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".14em", textTransform: "uppercase", color: "#C9C3B1" }}>You leave with</span><span style={{ fontSize: "17px", fontWeight: "700", lineHeight: "1.45", color: "#FFFFFF" }}>One idea, tested with 5 real people</span></div>
</li>
<li style={{ flex: "1 1 320px", minWidth: "0", boxSizing: "border-box", background: "#1F1F1F", borderRadius: "20px", padding: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}><span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFD112" }}>Week 3</span><span style={{ padding: "5px 12px", borderRadius: "999px", background: "#FAAC15", color: "#111111", fontSize: "14px", fontWeight: "700" }}>Wed 3 Mar</span></div>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "26px", lineHeight: "1.2", color: "#FFFFFF" }}>Package and price it</h3>
<p style={{ margin: "0", fontSize: "16px", lineHeight: "1.55", color: "#C9C3B1" }}>One clear offer, and a price you can say without apologising</p>
<div style={{ marginTop: "auto", paddingTop: "16px", borderTop: "1px solid #333333", display: "flex", flexDirection: "column", gap: "6px" }}><span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".14em", textTransform: "uppercase", color: "#C9C3B1" }}>You leave with</span><span style={{ fontSize: "17px", fontWeight: "700", lineHeight: "1.45", color: "#FFFFFF" }}>Your offer and your price</span></div>
</li>
<li style={{ flex: "1 1 320px", minWidth: "0", boxSizing: "border-box", background: "#1F1F1F", borderRadius: "20px", padding: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}><span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFD112" }}>Week 4</span><span style={{ padding: "5px 12px", borderRadius: "999px", background: "#FAAC15", color: "#111111", fontSize: "14px", fontWeight: "700" }}>Wed 10 Mar</span></div>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "26px", lineHeight: "1.2", color: "#FFFFFF" }}>Build your brand</h3>
<p style={{ margin: "0", fontSize: "16px", lineHeight: "1.55", color: "#C9C3B1" }}>One platform, your story, your bio and first posts, with AI and free tools</p>
<div style={{ marginTop: "auto", paddingTop: "16px", borderTop: "1px solid #333333", display: "flex", flexDirection: "column", gap: "6px" }}><span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".14em", textTransform: "uppercase", color: "#C9C3B1" }}>You leave with</span><span style={{ fontSize: "17px", fontWeight: "700", lineHeight: "1.45", color: "#FFFFFF" }}>A profile ready to launch and a 4-week content plan</span></div>
</li>
<li style={{ flex: "1 1 320px", minWidth: "0", boxSizing: "border-box", background: "#1F1F1F", borderRadius: "20px", padding: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}><span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFD112" }}>Week 5</span><span style={{ padding: "5px 12px", borderRadius: "999px", background: "#FAAC15", color: "#111111", fontSize: "14px", fontWeight: "700" }}>Wed 17 Mar</span></div>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "26px", lineHeight: "1.2", color: "#FFFFFF" }}>Sell it</h3>
<p style={{ margin: "0", fontSize: "16px", lineHeight: "1.55", color: "#C9C3B1" }}>Reaching your first customers through people you already know</p>
<div style={{ marginTop: "auto", paddingTop: "16px", borderTop: "1px solid #333333", display: "flex", flexDirection: "column", gap: "6px" }}><span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".14em", textTransform: "uppercase", color: "#C9C3B1" }}>You leave with</span><span style={{ fontSize: "17px", fontWeight: "700", lineHeight: "1.45", color: "#FFFFFF" }}>Your first messages sent</span></div>
</li>
<li style={{ flex: "1 1 320px", minWidth: "0", boxSizing: "border-box", background: "#FAAC15", borderRadius: "20px", padding: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}><span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: ".14em", textTransform: "uppercase", color: "#111111" }}>Week 6</span><span style={{ padding: "5px 12px", borderRadius: "999px", background: "#111111", color: "#FFFFFF", fontSize: "14px", fontWeight: "700" }}>Wed 24 Mar</span></div>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "26px", lineHeight: "1.2", color: "#111111" }}>Launch it</h3>
<p style={{ margin: "0", fontSize: "16px", lineHeight: "1.55", color: "#2A2A2A" }}>Go public, set up a simple money system, plan your next 90 days</p>
<div style={{ marginTop: "auto", paddingTop: "16px", borderTop: "1px solid #D99300", display: "flex", flexDirection: "column", gap: "6px" }}><span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".14em", textTransform: "uppercase", color: "#2A2A2A" }}>You leave with</span><span style={{ fontSize: "17px", fontWeight: "700", lineHeight: "1.45", color: "#111111" }}>A launched side hustle, celebrated at showcase night <span className="ph">in person, venue TBC</span></span></div>
</li>
</ol>
<p style={{ margin: "0", display: "flex", alignItems: "center", gap: "14px", fontSize: "17px", lineHeight: "1.5", color: "#FFFFFF" }}><span aria-hidden="true" style={{ flex: "0 0 auto", width: "40px", height: "40px", borderRadius: "50%", background: "#1F1F1F", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFD112" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M5 11a7 7 0 0 0 14 0"></path><path d="M12 18v3"></path></svg></span><span style={{ flex: "1 1 auto", minWidth: "0" }}>Plus two guest speakers who built their own side hustles in Malta <span className="ph-d">names TBC</span>.</span></p>
</div>
</section>
<section style={{ background: "#FFFFFF" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "80px clamp(20px,4vw,40px)", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "32px" }}>
<h2 className="h2">What's included</h2>
<ul style={{ margin: "0", padding: "28px 32px", boxSizing: "border-box", listStyle: "none", display: "flex", flexWrap: "wrap", gap: "4px 40px", background: "#FDF7E8", borderRadius: "24px" }}>
<li style={{ flex: "1 1 400px", minWidth: "0", display: "flex", gap: "14px", alignItems: "flex-start", padding: "12px 0" }}><span className="chk" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg></span><span style={{ flex: "1 1 auto", minWidth: "0", paddingTop: "2px", fontSize: "18px", lineHeight: "1.5", color: "#111111" }}>6 live 90-minute sessions with Luca, Wednesday evenings</span></li>
<li style={{ flex: "1 1 400px", minWidth: "0", display: "flex", gap: "14px", alignItems: "flex-start", padding: "12px 0" }}><span className="chk" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg></span><span style={{ flex: "1 1 auto", minWidth: "0", paddingTop: "2px", fontSize: "18px", lineHeight: "1.5", color: "#111111" }}>The Life Inventory, adapted for side hustles</span></li>
<li style={{ flex: "1 1 400px", minWidth: "0", display: "flex", gap: "14px", alignItems: "flex-start", padding: "12px 0" }}><span className="chk" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg></span><span style={{ flex: "1 1 auto", minWidth: "0", paddingTop: "2px", fontSize: "18px", lineHeight: "1.5", color: "#111111" }}>Luca's AI prompt pack: write bios, posts, offers and customer messages in minutes</span></li>
<li style={{ flex: "1 1 400px", minWidth: "0", display: "flex", gap: "14px", alignItems: "flex-start", padding: "12px 0" }}><span className="chk" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg></span><span style={{ flex: "1 1 auto", minWidth: "0", paddingTop: "2px", fontSize: "18px", lineHeight: "1.5", color: "#111111" }}>The launch-for-under-€100 toolkit: the free and low-cost tools I actually use</span></li>
<li style={{ flex: "1 1 400px", minWidth: "0", display: "flex", gap: "14px", alignItems: "flex-start", padding: "12px 0" }}><span className="chk" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg></span><span style={{ flex: "1 1 auto", minWidth: "0", paddingTop: "2px", fontSize: "18px", lineHeight: "1.5", color: "#111111" }}>One 30-minute 1:1 call with Luca, mid-programme</span></li>
<li style={{ flex: "1 1 400px", minWidth: "0", display: "flex", gap: "14px", alignItems: "flex-start", padding: "12px 0" }}><span className="chk" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg></span><span style={{ flex: "1 1 auto", minWidth: "0", paddingTop: "2px", fontSize: "18px", lineHeight: "1.5", color: "#111111" }}>Two guest speakers who've done it in Malta</span></li>
<li style={{ flex: "1 1 400px", minWidth: "0", display: "flex", gap: "14px", alignItems: "flex-start", padding: "12px 0" }}><span className="chk" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg></span><span style={{ flex: "1 1 auto", minWidth: "0", paddingTop: "2px", fontSize: "18px", lineHeight: "1.5", color: "#111111" }}>A private WhatsApp group for your cohort</span></li>
<li style={{ flex: "1 1 400px", minWidth: "0", display: "flex", gap: "14px", alignItems: "flex-start", padding: "12px 0" }}><span className="chk" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg></span><span style={{ flex: "1 1 auto", minWidth: "0", paddingTop: "2px", fontSize: "18px", lineHeight: "1.5", color: "#111111" }}>Showcase night to celebrate your launch</span></li>
<li style={{ flex: "1 1 400px", minWidth: "0", display: "flex", gap: "14px", alignItems: "flex-start", padding: "12px 0" }}><span className="chk" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg></span><span style={{ flex: "1 1 auto", minWidth: "0", paddingTop: "2px", fontSize: "18px", lineHeight: "1.5", color: "#111111" }}>A group check-in 30 days after launch</span></li>
<li style={{ flex: "1 1 400px", minWidth: "0", display: "flex", gap: "14px", alignItems: "flex-start", padding: "12px 0" }}><span className="chk" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg></span><span style={{ flex: "1 1 auto", minWidth: "0", paddingTop: "2px", fontSize: "18px", lineHeight: "1.5", color: "#111111" }}>Lifetime access to the alumni community</span></li>
</ul>
</div>
</section>
<section style={{ background: "#FDF7E8" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "80px clamp(20px,4vw,40px)", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "40px 64px", alignItems: "center" }}>
<div style={{ flex: "1 1 520px", minWidth: "0", display: "flex", flexDirection: "column", gap: "18px" }}>
<span className="eyebrow">After the programme</span>
<h2 className="h2">Launching is the start, not the end.</h2>
<p className="body">30 days after launch, we meet again as a group to share results and fix what isn't working. Then you join the alumni community: side hustlers from every cohort, where wins get celebrated and nobody builds alone.</p>
<ol style={{ margin: "8px 0 0", padding: "0", listStyle: "none", display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
<li style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ padding: "9px 16px", borderRadius: "999px", background: "#FFFFFF", border: "1.5px solid #E2D6B4", fontSize: "15px", fontWeight: "700", color: "#111111" }}>Week 6: launch</span><span aria-hidden="true" style={{ fontWeight: "700", color: "#8A5A00" }}>→</span></li>
<li style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ padding: "9px 16px", borderRadius: "999px", background: "#FFFFFF", border: "1.5px solid #E2D6B4", fontSize: "15px", fontWeight: "700", color: "#111111" }}>30 days later: group check-in</span><span aria-hidden="true" style={{ fontWeight: "700", color: "#8A5A00" }}>→</span></li>
<li style={{ display: "flex", alignItems: "center" }}><span style={{ padding: "9px 16px", borderRadius: "999px", background: "#111111", border: "1.5px solid #111111", fontSize: "15px", fontWeight: "700", color: "#FFFFFF" }}>Alumni community</span></li>
</ol>
</div>
<div style={{ flex: "0 1 420px", minWidth: "0", boxSizing: "border-box", background: "#FFFFFF", borderRadius: "24px", padding: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "22px", lineHeight: "1.3", color: "#111111" }}>Want more personal support?</h3>
<p className="body" style={{ fontSize: "17px", lineHeight: "1.6" }}>Book a 30-minute follow-up call with me at the alumni rate.</p>
<div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
<div style={{ flex: "1 1 140px", minWidth: "0", boxSizing: "border-box", background: "#FDF7E8", borderRadius: "16px", padding: "18px", display: "flex", flexDirection: "column", gap: "6px" }}><span className="disp" style={{ fontWeight: "800", fontSize: "34px", lineHeight: "1", color: "#111111" }}>€49</span><span style={{ fontSize: "14px", color: "#6B6248" }}>per call</span></div>
<div style={{ flex: "1 1 140px", minWidth: "0", boxSizing: "border-box", background: "#FDF7E8", borderRadius: "16px", padding: "18px", display: "flex", flexDirection: "column", gap: "6px" }}><span className="disp" style={{ fontWeight: "800", fontSize: "34px", lineHeight: "1", color: "#111111" }}>€129</span><span style={{ fontSize: "14px", color: "#6B6248" }}>3 calls</span></div>
</div>
</div>
</div>
</section>
<section style={{ background: "#FFFFFF" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "80px clamp(20px,4vw,40px)", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "40px 64px", alignItems: "flex-start" }}>
<div style={{ flex: "0 1 420px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px" }}>
<img src="/img/luca-mia1.jpg" alt="Luca Caruana presenting to a room of professionals" style={{ width: "100%", maxWidth: "420px", aspectRatio: "4/5", height: "auto", objectFit: "cover", objectPosition: "73% 50%", borderRadius: "24px", display: "block" }} />
<figure style={{ margin: "0", padding: "22px 24px", borderRadius: "20px", background: "#FDF7E8", display: "flex", flexDirection: "column", gap: "14px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
<div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "14px", color: "#6B6248" }}><span>Where it started</span><span style={{ fontWeight: "700", color: "#111111" }}>€50 a month</span></div>
<div style={{ height: "14px", borderRadius: "7px", background: "#EFE4C6", overflow: "hidden" }}><div style={{ width: "1%", minWidth: "4px", height: "100%", borderRadius: "7px", background: "#FAAC15" }}></div></div>
</div>
<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
<div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "14px", color: "#6B6248" }}><span>Where it grew</span><span style={{ fontWeight: "700", color: "#111111" }}>€5,000 a month</span></div>
<div style={{ height: "14px", borderRadius: "7px", background: "#EFE4C6", overflow: "hidden" }}><div style={{ width: "100%", height: "100%", borderRadius: "7px", background: "#FAAC15" }}></div></div>
</div>
<figcaption style={{ fontSize: "13px", lineHeight: "1.4", color: "#6B6248" }}>Money Coaching Hub, built on the side. Bars drawn to scale.</figcaption>
</figure>
</div>
<div style={{ flex: "1 1 480px", minWidth: "0", display: "flex", flexDirection: "column", gap: "18px" }}>
<span className="eyebrow">Meet Luca</span>
<h2 className="h2" style={{ fontSize: "clamp(28px,2.8vw,38px)", lineHeight: "1.2" }}>I know what it's like to build something after the kids are asleep and the day job is done.</h2>
<p className="body">I started Money Coaching Hub with €50 a month. Step by step, alongside a full-time job, two kids and Monipal, it grew to €5,000 a month.</p>
<p className="body">Every week, I'll open with a chapter of that story. How I found my idea. What I first charged. Where my clients came from. And the mistakes that cost me the most, so they don't cost you.</p>
<p style={{ margin: "0", padding: "14px 18px", border: "1.5px dashed #D9C48A", borderRadius: "14px", fontSize: "15px", lineHeight: "1.55", color: "#6B6248" }}>[Add from January: “In December 2026, I left my full-time job to go all in on what I built on the side.”]</p>
<ul style={{ margin: "6px 0 0", padding: "0", listStyle: "none", display: "flex", flexWrap: "wrap", gap: "10px" }}>
<li style={{ padding: "8px 14px", borderRadius: "999px", border: "1.5px solid #E2D6B4", fontSize: "14px", fontWeight: "700", color: "#111111" }}>Certified money coach</li>
<li style={{ padding: "8px 14px", borderRadius: "999px", border: "1.5px solid #E2D6B4", fontSize: "14px", fontWeight: "700", color: "#111111" }}>300+ clients coached</li>
<li style={{ padding: "8px 14px", borderRadius: "999px", border: "1.5px solid #E2D6B4", fontSize: "14px", fontWeight: "700", color: "#111111" }}>1,000+ workshop participants</li>
<li style={{ padding: "8px 14px", borderRadius: "999px", border: "1.5px solid #E2D6B4", fontSize: "14px", fontWeight: "700", color: "#111111" }}>Founder, Money Coaching Hub</li>
<li style={{ padding: "8px 14px", borderRadius: "999px", border: "1.5px solid #E2D6B4", fontSize: "14px", fontWeight: "700", color: "#111111" }}>CEO, Monipal</li>
</ul>
</div>
</div>
</section>
<section id="pg-join" style={{ background: "#FDF7E8" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "80px clamp(20px,4vw,40px)", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "40px 64px", alignItems: "center" }}>
<div style={{ flex: "1 1 440px", minWidth: "0", display: "flex", flexDirection: "column", gap: "22px" }}>
<h2 className="h2">Investment</h2>
<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
<span style={{ fontSize: "15px", fontWeight: "700", color: "#6B6248" }}>6 Wednesday evenings, live online</span>
<ol style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexWrap: "wrap", gap: "10px" }}>
<li style={{ flex: "1 1 150px", minWidth: "0", boxSizing: "border-box", background: "#FFFFFF", border: "1.5px solid #E9DDBC", borderRadius: "14px", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".12em", textTransform: "uppercase", color: "#8A5A00" }}>Week 1</span><span className="disp" style={{ fontWeight: "800", fontSize: "18px", color: "#111111" }}>Wed 17 Feb</span></li>
<li style={{ flex: "1 1 150px", minWidth: "0", boxSizing: "border-box", background: "#FFFFFF", border: "1.5px solid #E9DDBC", borderRadius: "14px", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".12em", textTransform: "uppercase", color: "#8A5A00" }}>Week 2</span><span className="disp" style={{ fontWeight: "800", fontSize: "18px", color: "#111111" }}>Wed 24 Feb</span></li>
<li style={{ flex: "1 1 150px", minWidth: "0", boxSizing: "border-box", background: "#FFFFFF", border: "1.5px solid #E9DDBC", borderRadius: "14px", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".12em", textTransform: "uppercase", color: "#8A5A00" }}>Week 3</span><span className="disp" style={{ fontWeight: "800", fontSize: "18px", color: "#111111" }}>Wed 3 Mar</span></li>
<li style={{ flex: "1 1 150px", minWidth: "0", boxSizing: "border-box", background: "#FFFFFF", border: "1.5px solid #E9DDBC", borderRadius: "14px", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".12em", textTransform: "uppercase", color: "#8A5A00" }}>Week 4</span><span className="disp" style={{ fontWeight: "800", fontSize: "18px", color: "#111111" }}>Wed 10 Mar</span></li>
<li style={{ flex: "1 1 150px", minWidth: "0", boxSizing: "border-box", background: "#FFFFFF", border: "1.5px solid #E9DDBC", borderRadius: "14px", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".12em", textTransform: "uppercase", color: "#8A5A00" }}>Week 5</span><span className="disp" style={{ fontWeight: "800", fontSize: "18px", color: "#111111" }}>Wed 17 Mar</span></li>
<li style={{ flex: "1 1 150px", minWidth: "0", boxSizing: "border-box", background: "#FFFFFF", border: "1.5px solid #E9DDBC", borderRadius: "14px", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: ".12em", textTransform: "uppercase", color: "#8A5A00" }}>Week 6</span><span className="disp" style={{ fontWeight: "800", fontSize: "18px", color: "#111111" }}>Wed 24 Mar</span></li>
</ol>
</div>
</div>
<div style={{ flex: "0 1 480px", minWidth: "0", background: "#111111", color: "#FFFFFF", borderRadius: "24px", padding: "40px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "22px" }}>
<span style={{ alignSelf: "flex-start", padding: "7px 14px", borderRadius: "999px", background: "#FAAC15", color: "#111111", fontWeight: "700", fontSize: "13px", letterSpacing: ".1em", textTransform: "uppercase" }}>Founding cohort</span>
<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
<span className="disp" style={{ fontWeight: "800", fontSize: "68px", lineHeight: "1", letterSpacing: "-0.02em", color: "#FFFFFF" }}>€295</span>
<span style={{ fontSize: "15px", lineHeight: "1.5", color: "#C9C3B1" }}><span className="ph-d">regular price from cohort 2: €495</span></span>
</div>
<dl style={{ margin: "0", display: "flex", flexDirection: "column", borderBottom: "1px solid #2E2E2E" }}>
<div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", padding: "14px 0", borderTop: "1px solid #2E2E2E" }}><dt style={{ flex: "0 0 150px", fontSize: "12px", fontWeight: "700", letterSpacing: ".12em", textTransform: "uppercase", color: "#C9C3B1", paddingTop: "3px" }}>Or</dt><dd style={{ margin: "0", flex: "1 1 180px", minWidth: "0", fontSize: "16px", lineHeight: "1.5", color: "#FFFFFF" }}>2 instalments of <span className="ph-d">€150</span></dd></div>
<div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", padding: "14px 0", borderTop: "1px solid #2E2E2E" }}><dt style={{ flex: "0 0 150px", fontSize: "12px", fontWeight: "700", letterSpacing: ".12em", textTransform: "uppercase", color: "#C9C3B1", paddingTop: "3px" }}>Came to the intro?</dt><dd style={{ margin: "0", flex: "1 1 180px", minWidth: "0", fontSize: "16px", lineHeight: "1.5", color: "#FFFFFF" }}>€25 off with your code</dd></div>
<div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", padding: "14px 0", borderTop: "1px solid #2E2E2E" }}><dt style={{ flex: "0 0 150px", fontSize: "12px", fontWeight: "700", letterSpacing: ".12em", textTransform: "uppercase", color: "#C9C3B1", paddingTop: "3px" }}>Places</dt><dd style={{ margin: "0", flex: "1 1 180px", minWidth: "0", fontSize: "16px", lineHeight: "1.5", color: "#FFFFFF" }}><span className="ph-d">15</span> only, so everyone gets real attention</dd></div>
<div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", padding: "14px 0", borderTop: "1px solid #2E2E2E" }}><dt style={{ flex: "0 0 150px", fontSize: "12px", fontWeight: "700", letterSpacing: ".12em", textTransform: "uppercase", color: "#C9C3B1", paddingTop: "3px" }}>Booking closes</dt><dd style={{ margin: "0", flex: "1 1 180px", minWidth: "0", fontSize: "16px", lineHeight: "1.5", color: "#FFFFFF" }}><span className="ph-d">Wednesday 10 February 2027</span></dd></div>
</dl>
<a href={programmeCheckout} className="btn btn-gold" style={{ width: "100%" }}>Join the founding cohort</a>
</div>
</div>
</section>
<section style={{ background: "#FFFFFF" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "80px clamp(20px,4vw,40px)", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "36px" }}>
<h2 className="h2">Questions</h2>
<div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
<div style={{ flex: "1 1 440px", minWidth: "0", boxSizing: "border-box", background: "#FDF7E8", borderRadius: "20px", padding: "28px 30px", display: "flex", flexDirection: "column", gap: "10px" }}>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "20px", lineHeight: "1.3", color: "#111111" }}>How much time do I need?</h3>
<p className="body" style={{ fontSize: "17px", lineHeight: "1.6" }}>One 90-minute live session a week, plus about 2 hours for that week's action.</p>
</div>
<div style={{ flex: "1 1 440px", minWidth: "0", boxSizing: "border-box", background: "#FDF7E8", borderRadius: "20px", padding: "28px 30px", display: "flex", flexDirection: "column", gap: "10px" }}>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "20px", lineHeight: "1.3", color: "#111111" }}>I don't have an idea yet. Can I still join?</h3>
<p className="body" style={{ fontSize: "17px", lineHeight: "1.6" }}>Yes. Week 1 is all about finding it.</p>
</div>
<div style={{ flex: "1 1 440px", minWidth: "0", boxSizing: "border-box", background: "#FDF7E8", borderRadius: "20px", padding: "28px 30px", display: "flex", flexDirection: "column", gap: "10px" }}>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "20px", lineHeight: "1.3", color: "#111111" }}>What if I miss a session?</h3>
<p className="body" style={{ fontSize: "17px", lineHeight: "1.6" }}><span className="ph">Every session is recorded and shared in the cohort group.</span></p>
</div>
<div style={{ flex: "1 1 440px", minWidth: "0", boxSizing: "border-box", background: "#FDF7E8", borderRadius: "20px", padding: "28px 30px", display: "flex", flexDirection: "column", gap: "10px" }}>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "20px", lineHeight: "1.3", color: "#111111" }}>Do I need to be good with technology?</h3>
<p className="body" style={{ fontSize: "17px", lineHeight: "1.6" }}>No. If you can use WhatsApp and your phone's camera, you can do this. We use free tools, and AI does the heavy lifting.</p>
</div>
<div style={{ flex: "1 1 440px", minWidth: "0", boxSizing: "border-box", background: "#FDF7E8", borderRadius: "20px", padding: "28px 30px", display: "flex", flexDirection: "column", gap: "10px" }}>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "20px", lineHeight: "1.3", color: "#111111" }}>How much will it cost me to launch?</h3>
<p className="body" style={{ fontSize: "17px", lineHeight: "1.6" }}>The aim is under €100, using free and low-cost tools.</p>
</div>
<div style={{ flex: "1 1 440px", minWidth: "0", boxSizing: "border-box", background: "#FDF7E8", borderRadius: "20px", padding: "28px 30px", display: "flex", flexDirection: "column", gap: "10px" }}>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "20px", lineHeight: "1.3", color: "#111111" }}>Will I make money?</h3>
<p className="body" style={{ fontSize: "17px", lineHeight: "1.6" }}>Honest answer: that depends on your idea, your effort and your market. What I can promise is that by week 6, you'll have a real offer, a price, and your first customer conversations already started.</p>
</div>
<div style={{ flex: "1 1 440px", minWidth: "0", boxSizing: "border-box", background: "#FDF7E8", borderRadius: "20px", padding: "28px 30px", display: "flex", flexDirection: "column", gap: "10px" }}>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "20px", lineHeight: "1.3", color: "#111111" }}>Do I need to register a business?</h3>
<p className="body" style={{ fontSize: "17px", lineHeight: "1.6" }}>You'll get a one-page checklist on the basics, and we'll point you to an accountant for your own situation.</p>
</div>
<div style={{ flex: "1 1 440px", minWidth: "0", boxSizing: "border-box", background: "#FDF7E8", borderRadius: "20px", padding: "28px 30px", display: "flex", flexDirection: "column", gap: "10px" }}>
<h3 className="disp" style={{ margin: "0", fontWeight: "800", fontSize: "20px", lineHeight: "1.3", color: "#111111" }}>What if it's not for me?</h3>
<p className="body" style={{ fontSize: "17px", lineHeight: "1.6" }}><span className="ph">Refund policy to confirm.</span></p>
</div>
</div>
</div>
</section>
<section style={{ background: "#FAAC15" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "80px clamp(20px,4vw,40px)", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "28px 48px", alignItems: "center", justifyContent: "space-between" }}>
<div style={{ flex: "1 1 560px", minWidth: "0", display: "flex", flexDirection: "column", gap: "14px" }}>
<h2 className="h2" style={{ fontSize: "clamp(32px,3.8vw,50px)" }}>Six weeks from now, your side hustle could be live. Or it could still be “one day”.</h2>
<p style={{ margin: "0", fontSize: "18px", lineHeight: "1.5", color: "#111111" }}>Founding cohort · Starts Wednesday 17 February 2027 · <span className="ph">15</span> places</p>
</div>
<a href="#pg-join" className="btn btn-dark" style={{ minHeight: "58px", padding: "0 34px", fontSize: "17px" }}>Join the founding cohort, €295</a>
</div>
</section>
<footer style={{ background: "#111111", color: "#C9C3B1" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", padding: "44px clamp(20px,4vw,40px)", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "18px" }}>
<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
<span className="disp" style={{ fontWeight: "800", fontSize: "18px", letterSpacing: ".04em", color: "#FFFFFF" }}>MONEY COACHING HUB</span>
<nav aria-label="Legal" style={{ display: "flex", flexWrap: "wrap", gap: "20px", fontSize: "14px" }}><a href="/privacy-policy/" className="lk-d">Privacy</a><a href="/cookie-policy/" className="lk-d">Cookies</a><a href="/website-terms-and-conditions/" className="lk-d">Terms</a></nav>
</div>
<p style={{ margin: "0", maxWidth: "62em", fontSize: "15px", lineHeight: "1.6", color: "#FFFFFF" }}>This programme is educational. Any earnings shared are real examples, not promises. What you earn depends on your idea, your effort and your market.</p>
<p style={{ margin: "0", maxWidth: "62em", fontSize: "13px", lineHeight: "1.6" }}>Money Coaching Hub provides financial education and coaching. Luca Caruana is a Certified Money Coach (CMC®), not a licensed investment adviser. Nothing on this website is financial advice or a personal recommendation.</p>
<p style={{ margin: "0", fontSize: "13px" }}>© 2026 Money Coaching Hub. All rights reserved.</p>
</div>
</footer>
</div>

      </div>
    </div>
  );
}
