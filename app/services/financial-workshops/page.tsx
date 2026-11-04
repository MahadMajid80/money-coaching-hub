import type { Metadata } from "next";
import { PageFooter, PageHeader } from "@/components/chrome";
import { EnquiryForm } from "@/components/forms";

export const metadata: Metadata = {
  title: "Financial Wellbeing Workshops for Companies",
  description: "Financial wellbeing workshops your team will actually enjoy. Delivered for HSBC, PwC Malta, MeDirect, Thomas Smith Group and more. On site in Malta, online anywhere.",
  alternates: { canonical: "/services/financial-workshops/" },
};

export default function Page() {
  return (
    <>
      <PageHeader cta={{ label: "Enquire about a workshop", href: "#enquire" }} />
      <main id="main">
{/* HERO */}
<section style={{ background: "#111111", color: "#ffffff", padding: "80px 0" }}>
<div className="wrap" style={{ display: "flex", gap: "56px", flexWrap: "wrap", alignItems: "center" }}>
<div style={{ flex: "1 1 520px", minWidth: "0", display: "flex", flexDirection: "column", gap: "24px" }}>
<span className="eyebrow" style={{ color: "#FFD112" }}>For companies and HR teams</span>
<h1 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "60px", lineHeight: "1.02", letterSpacing: "-0.02em", margin: "0", color: "#ffffff" }}>Financial wellbeing workshops your team will actually enjoy.</h1>
<p className="body" style={{ fontSize: "20px", maxWidth: "560px", color: "#C9C3B1" }}>Your people aren't distracted by their workload. They're distracted by their money. One honest hour on the psychology of money does more than a year of pension-scheme emails.</p>
<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
<a href="#enquire" className="btn btn-gold">Enquire about a workshop</a>
<a href="#formats" className="btn" style={{ border: "2px solid #ffffff", color: "#ffffff" }}>See the formats</a>
</div>
</div>
<div style={{ flex: "0 1 520px", minWidth: "280px" }}>
<img src="/img/luca-stage.jpg" alt="Luca presenting The King of Budgeting to a room of executives" style={{ width: "100%", aspectRatio: "3/2", objectFit: "cover", borderRadius: "20px", display: "block" }} />
</div>
</div>
</section>
{/* LOGO STRIP */}
<section style={{ background: "#FDF7E8", padding: "28px 0", borderBottom: "1px solid #EFE9D9" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
<span style={{ fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B6248", fontWeight: "700" }}>Delivered for</span>
<div style={{ display: "flex", gap: "14px 36px", flexWrap: "wrap", alignItems: "center", justifyContent: "center", fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "15px", color: "#111111" }}>
<span>HSBC</span><span>PwC Malta</span><span>MeDirect</span><span>MGA</span><span>Evolution</span><span>Deriv</span><span>Thomas Smith Group</span><span>Alf Mizzi &amp; Sons</span><span>Nectar</span><span>9H Digital</span><span>Siegfried</span><span>Malta Institute of Accountants</span>
</div>
</div>
</section>
{/* WHY */}
<section style={{ background: "#ffffff", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "760px" }}>
<span className="eyebrow">Why it matters</span>
<h2 className="h2">Money stress doesn't stay at home.</h2>
<p className="body">It comes into the office, sits at the desk, and costs you focus, retention and sick days. The research is consistent; what's been missing is a way to talk about it that people don't switch off from.</p>
</div>
<div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "20px" }}>
<div className="card" style={{ background: "#FDF7E8", borderColor: "#FDF7E8" }}><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "44px", lineHeight: "1" }}>2.2×</span><p className="body" style={{ fontSize: "16px" }}>Financially stressed employees are 2.2 times more likely to be looking for a new job.</p><span style={{ fontSize: "13px", color: "#6B6248" }}>PwC Employee Financial Wellness Survey</span></div>
<div className="card" style={{ background: "#FDF7E8", borderColor: "#FDF7E8" }}><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "44px", lineHeight: "1" }}>60%</span><p className="body" style={{ fontSize: "16px" }}>of employees say money is their number one source of stress, ahead of work, health and relationships.</p><span style={{ fontSize: "13px", color: "#6B6248" }}>PwC Employee Financial Wellness Survey</span></div>
<div className="card" style={{ background: "#FDF7E8", borderColor: "#FDF7E8" }}><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "44px", lineHeight: "1" }}>1,000+</span><p className="body" style={{ fontSize: "16px" }}>employees have sat in one of these sessions in Malta and Europe, from shipping crews to bank head offices.</p><span style={{ fontSize: "13px", color: "#6B6248" }}>Money Coaching Hub, since 2023</span></div>
</div>
</div>
</section>
{/* FORMATS */}
<section id="formats" style={{ background: "#FDF7E8", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", flexWrap: "wrap" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "640px" }}>
<span className="eyebrow">Formats</span>
<h2 className="h2">Pick a length. The content bends to your team.</h2>
</div>
<a href="#enquire" className="btn btn-ghost">Enquire</a>
</div>
<div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "20px" }}>
<div className="card"><span className="eyebrow" style={{ color: "#6B6248" }}>60 minutes</span><h3 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "22px", margin: "0" }}>Lunch-and-learn</h3><p className="body" style={{ fontSize: "16px" }}>One topic, one hour, questions live. The psychology of money, or a single theme like "where does my salary go".</p><span style={{ fontSize: "14px", color: "#6B6248", marginTop: "auto" }}>Online or on site · Any team size</span></div>
<div className="card" style={{ borderColor: "#FAAC15", boxShadow: "0 0 0 2px #FAAC15 inset" }}><span className="eyebrow">Most booked</span><h3 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "22px", margin: "0" }}>Half-day workshop</h3><p className="body" style={{ fontSize: "16px" }}>Money types, the salary map, saving and the first steps into investing. Interactive, with each person leaving with their own one-page plan.</p><span style={{ fontSize: "14px", color: "#6B6248", marginTop: "auto" }}>On site · Up to 30 people</span></div>
<div className="card"><span className="eyebrow" style={{ color: "#6B6248" }}>4 to 6 sessions</span><h3 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "22px", margin: "0" }}>Workshop series</h3><p className="body" style={{ fontSize: "16px" }}>A financial wellbeing programme over a quarter, building from mindset to budgeting to investing, with materials your people keep.</p><span style={{ fontSize: "14px", color: "#6B6248", marginTop: "auto" }}>Online or on site · Materials included</span></div>
</div>
<p className="body" style={{ fontSize: "16px", color: "#6B6248" }}>Every session is education, not advice. No products, no referrals, no commissions. That's why HR teams can put it in front of their people without a compliance headache.</p>
</div>
</section>
{/* WHAT THEY SAY */}
<section style={{ background: "#ffffff", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "720px" }}>
<span className="eyebrow">What HR teams say</span>
<h2 className="h2">Real words from the people who booked it.</h2>
</div>
<div className="quotes" style={{ columns: "2", columnGap: "20px" }}>
<blockquote className="quote" style={{ margin: "0 0 20px" }}><p>"I have personally attended and organised many workshops regarding money, but Luca is the only person that addresses the psychological aspect of money, and that part was definitely the most that got people involved and intrigued. Engaging, simple yet effective and refreshing."</p><cite>Christine Borg <span style={{ fontWeight: "400", color: "#6B6248" }}>· Engagement &amp; Culture Manager, HSBC</span></cite></blockquote>
<blockquote className="quote" style={{ margin: "0 0 20px" }}><p>"Very happy to have worked with Luca to provide money management workshops to our employees. Easy to work with, and the workshop itself was very well structured. Useful supporting material was provided to all attendees."</p><cite>Nicole Mangion <span style={{ fontWeight: "400", color: "#6B6248" }}>· HR Executive, Alf Mizzi &amp; Sons</span></cite></blockquote>
<blockquote className="quote" style={{ margin: "0 0 20px" }}><p>"A real pleasure collaborating with Luca. He delivered a presentation to employees on the psychology of money, while exploring ways one can secure a financial future. If you have not yet considered organising such a workshop for your employees, I recommend you get in touch."</p><cite>Liana Naudi <span style={{ fontWeight: "400", color: "#6B6248" }}>· Marketing &amp; HR Director, Thomas Smith Group</span></cite></blockquote>
<blockquote className="quote" style={{ margin: "0 0 20px" }}><p>"Luca is a wonderful, engaging presenter and very easy to listen to. Looking forward to more sessions."</p><cite>Maria Psaila <span style={{ fontWeight: "400", color: "#6B6248" }}>· HR Manager, Nectar</span></cite></blockquote>
<blockquote className="quote" style={{ margin: "0 0 20px" }}><p>"The presentation was both captivating and informative, providing our workforce with valuable insights and enlightenment."</p><cite>Alexia Cordina <span style={{ fontWeight: "400", color: "#6B6248" }}>· Head of People and Culture, 9H Digital</span></cite></blockquote>
</div>
</div>
</section>
{/* ENQUIRE */}
<section id="enquire" style={{ background: "#FAAC15", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", gap: "56px", flexWrap: "wrap", alignItems: "flex-start" }}>
<div style={{ flex: "1 1 440px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px" }}>
<span className="eyebrow" style={{ color: "#111111" }}>Enquire</span>
<h2 className="h2" style={{ fontSize: "46px" }}>Tell me about your team. I'll send a proposal within two working days.</h2>
<p className="body" style={{ color: "#111111" }}>Or skip the form: <a href="/contact-us/" style={{ fontWeight: "700" }}>book a 10-minute call</a> and we'll scope it together.</p>
<p className="body" style={{ color: "#5A4A1A", fontSize: "15px" }}>Based in Malta, delivering across Europe. On site in Malta, online anywhere.</p>
</div>
<EnquiryForm />
</div>
</section>

      </main>
      <PageFooter />
    </>
  );
}
