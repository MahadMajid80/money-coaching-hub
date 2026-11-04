import type { Metadata } from "next";
import { PageFooter, PageHeader } from "@/components/chrome";
import { getCourse } from "@/lib/courses";
export const metadata: Metadata = {
  title: "Investing Made Simple – Live Online Course in Maltese",
  description:
    "Four live online sessions, in Maltese, on how to invest your own money. Taught by a Certified Money Coach who sells no financial products. Next cohort starts 11 January 2027.",
  alternates: { canonical: "/investing-made-simple/" },
};

export default function Page() {
  const checkout = getCourse("investing-made-simple").checkout || "/contact-us/?subject=Investing%20Made%20Simple";
  return (
    <>
      <PageHeader cta={{ label: "Apply for January", href: "#apply" }} />
      <main id="main">
{/* HERO */}
<section style={{ background: "#FDF7E8", padding: "72px 0" }}>
<div className="wrap" style={{ display: "flex", gap: "56px", flexWrap: "wrap", alignItems: "center" }}>
<div style={{ flex: "1 1 520px", minWidth: "0", display: "flex", flexDirection: "column", gap: "24px" }}>
<span className="eyebrow">Bestselling course · Taught in Maltese · 4 live sessions</span>
<h1 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "64px", lineHeight: "1.02", letterSpacing: "-0.02em", margin: "0" }}>Investing Made Simple</h1>
<p className="body" style={{ fontSize: "21px", maxWidth: "560px" }}>Four live evenings on how to invest your own money, taught by someone who has <strong style={{ color: "#111111" }}>nothing to sell you.</strong></p>
<p className="body" style={{ maxWidth: "560px" }}>The course that took hundreds of Maltese and European professionals from "I don't know where to start" to their first investment. No jargon, no products pushed, no pressure.</p>
<div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
<span className="chip" style={{ borderColor: "#E0D5B7", background: "transparent", fontSize: "14px", padding: "8px 14px" }}>No experience needed</span>
<span className="chip" style={{ borderColor: "#E0D5B7", background: "transparent", fontSize: "14px", padding: "8px 14px" }}>Built for European investors</span>
<span className="chip" style={{ borderColor: "#E0D5B7", background: "transparent", fontSize: "14px", padding: "8px 14px" }}>Education, not advice</span>
</div>
</div>
<div style={{ flex: "0 1 420px", minWidth: "300px" }}>
<div style={{ background: "#111111", color: "#ffffff", borderRadius: "24px", padding: "40px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "22px" }}>
<span style={{ display: "inline-flex", alignSelf: "flex-start", padding: "8px 14px", borderRadius: "999px", background: "#FAAC15", color: "#111111", fontWeight: "700", fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Applications open for January</span>
<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
<span style={{ fontSize: "14px", color: "#C9C3B1", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: "700" }}>Next cohort starts</span>
<span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "40px", lineHeight: "1" }}>Monday 11 January 2027</span>
</div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "16px" }}>
<div style={{ background: "#1F1F1F", borderRadius: "14px", padding: "16px", display: "flex", flexDirection: "column", gap: "4px" }}><span style={{ fontSize: "13px", color: "#C9C3B1" }}>Format</span><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "20px", color: "#FFD112" }}>4 Mondays, 7.30pm</span></div>
<div style={{ background: "#1F1F1F", borderRadius: "14px", padding: "16px", display: "flex", flexDirection: "column", gap: "4px" }}><span style={{ fontSize: "13px", color: "#C9C3B1" }}>Investment</span><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "26px", color: "#FFD112" }}>€175</span></div>
</div>
<p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "#C9C3B1" }}>Live online, taught in Maltese, recorded if you miss one. Small group, so places are limited.</p>
<a href="#apply" className="btn btn-gold" style={{ width: "100%" }}>Apply for the January cohort</a>
<span className="compliance" style={{ color: "#8E8878" }}>Education, not advice. No financial products are sold and nothing here is a personal recommendation.</span>
</div>
</div>
</div>
</section>
{/* WHO IT'S FOR */}
<section style={{ background: "#ffffff", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "32px", alignItems: "center", textAlign: "center" }}>
<span className="eyebrow">Who this is for</span>
<h2 className="h2" style={{ maxWidth: "800px" }}>You're not bad with money. You're waiting for permission.</h2>
<p className="body" style={{ maxWidth: "640px" }}>Most people who come to this course aren't reckless. They're careful. Careful to the point of paralysis. The money sits in the account, the years go by, and the decision never gets made.</p>
<div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", maxWidth: "980px" }}>
<span className="chip">"My savings are sitting in the bank doing nothing."</span>
<span className="chip">"I tried once, it went badly, I never went back."</span>
<span className="chip">"Everyone giving me advice is also selling me something."</span>
<span className="chip">"I should understand this by now. I don't."</span>
<span className="chip">"I want to build slowly, not gamble."</span>
</div>
<p className="body" style={{ maxWidth: "640px" }}><strong style={{ color: "#111111" }}>No experience needed.</strong> Session one starts where you actually are, not where a textbook assumes you are.</p>
</div>
</section>
{/* THE FOUR EVENINGS */}
<section style={{ background: "#111111", color: "#ffffff", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "720px" }}>
<span className="eyebrow" style={{ color: "#FFD112" }}>The four evenings</span>
<h2 className="h2" style={{ color: "#ffffff" }}>Mondays, 7.30pm to 8.30pm. Live online.</h2>
<p className="body" style={{ color: "#C9C3B1" }}>Every session is recorded. Miss one and you keep the recording. The order matters, so we build it in sequence.</p>
</div>
<div className="g2" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "20px" }}>
<article className="session"><span className="num">01</span><h3>The investment landscape</h3><ul><li>Which platforms to use, and which to walk away from</li><li>Stocks, ETFs, bonds, crypto and commodities, in plain language</li><li>How each one actually behaves when markets move</li><li>What diversification means beyond the buzzword</li></ul></article>
<article className="session"><span className="num">02</span><h3>Beyond the index fund</h3><ul><li>What most beginner courses stop short of teaching</li><li>Sector and thematic investing, and where it goes wrong</li><li>How to evaluate a theme without falling for the story</li><li>Worked portfolio examples, including my own</li></ul></article>
<article className="session"><span className="num">03</span><h3>The psychology of investing</h3><ul><li>Why your emotions cost you more than your fees</li><li>The behavioural traps that catch almost everyone</li><li>What to do on the day everything drops</li><li>Building the discipline to do nothing</li></ul></article>
<article className="session"><span className="num">04</span><h3>Putting it together</h3><ul><li>Applying the framework to your own situation</li><li>Templates you can start using that night</li><li>Your own written investing roadmap</li><li>The mistakes I made so you don't have to</li></ul></article>
</div>
<div><a href="#apply" className="btn btn-gold">Apply for the January cohort</a></div>
</div>
</section>
{/* PHOTO STRIP */}
<section style={{ background: "#ffffff", padding: "0" }}>
<div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "4px" }}>
<figure style={{ margin: "0", position: "relative", overflow: "hidden" }}><img src="/img/luca-mia1.jpg" alt="Luca teaching a room at the Malta Institute of Accountants" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} /><figcaption style={{ position: "absolute", left: "0", right: "0", bottom: "0", padding: "40px 20px 16px", background: "linear-gradient(to top,rgba(17,17,17,.9),rgba(17,17,17,0))", color: "#fff", fontWeight: "700", fontSize: "13px", letterSpacing: ".12em", textTransform: "uppercase" }}>Small groups, not webinars</figcaption></figure>
<figure style={{ margin: "0", position: "relative", overflow: "hidden" }}><img src="/img/luca-mic.jpg" alt="Luca speaking on stage" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", objectPosition: "center 30%", display: "block" }} /><figcaption style={{ position: "absolute", left: "0", right: "0", bottom: "0", padding: "40px 20px 16px", background: "linear-gradient(to top,rgba(17,17,17,.9),rgba(17,17,17,0))", color: "#fff", fontWeight: "700", fontSize: "13px", letterSpacing: ".12em", textTransform: "uppercase" }}>1,000+ people trained</figcaption></figure>
<figure style={{ margin: "0", position: "relative", overflow: "hidden" }}><img src="/img/luca-workshop.jpg" alt="Luca answering a question in a workshop" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} /><figcaption style={{ position: "absolute", left: "0", right: "0", bottom: "0", padding: "40px 20px 16px", background: "linear-gradient(to top,rgba(17,17,17,.9),rgba(17,17,17,0))", color: "#fff", fontWeight: "700", fontSize: "13px", letterSpacing: ".12em", textTransform: "uppercase" }}>Questions answered live</figcaption></figure>
</div>
</section>
{/* INCLUDED */}
<section style={{ background: "#FDF7E8", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "720px" }}>
<span className="eyebrow">Everything included</span>
<h2 className="h2">Five things, one price.</h2>
</div>
<div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "20px" }}>
<div className="card"><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><h3 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "20px", margin: "0" }}>4 live sessions</h3><p className="body" style={{ fontSize: "16px" }}>One hour each, Mondays, online. Questions answered as we go.</p></div>
<div className="card"><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><h3 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "20px", margin: "0" }}>Lifetime recordings</h3><p className="body" style={{ fontSize: "16px" }}>Every session recorded and yours to keep.</p></div>
<div className="card"><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><h3 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "20px", margin: "0" }}>Investment templates</h3><p className="body" style={{ fontSize: "16px" }}>The same worksheets used in one-to-one coaching.</p></div>
<div className="card"><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><h3 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "20px", margin: "0" }}>The Newbie's Investment Playbook</h3><p className="body" style={{ fontSize: "16px" }}>The workbook. Written for European investors, not American ones.</p></div>
<div className="card"><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><h3 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "20px", margin: "0" }}>Luca's Money Hub</h3><p className="body" style={{ fontSize: "16px" }}>The WhatsApp community and regular market updates, after the course ends.</p></div>
<div className="card" style={{ background: "#111111", color: "#ffffff", borderColor: "#111111", justifyContent: "center" }}><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "40px", lineHeight: "1", color: "#FFD112" }}>€175</span><span style={{ fontSize: "15px", color: "#C9C3B1" }}>One payment. No upsells inside the course.</span><a href="#apply" className="btn btn-gold" style={{ alignSelf: "flex-start", marginTop: "6px" }}>Apply now</a></div>
</div>
</div>
</section>
{/* WHO IS TEACHING */}
<section style={{ background: "#ffffff", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", gap: "64px", alignItems: "center", flexWrap: "wrap" }}>
<div style={{ flex: "0 1 400px", minWidth: "280px", display: "flex", justifyContent: "center" }}>
<div style={{ position: "relative", width: "380px", maxWidth: "100%", marginLeft: "20px" }}>
<div aria-hidden="true" style={{ position: "absolute", left: "-20px", top: "20px", width: "100%", height: "100%", background: "#FAAC15", borderRadius: "24px" }}></div>
<img src="/img/luca-tv2.jpg" alt="Luca Caruana explaining a point" style={{ position: "relative", width: "100%", aspectRatio: "4/5", objectFit: "cover", objectPosition: "center 10%", borderRadius: "24px", display: "block" }} />
</div>
</div>
<div style={{ flex: "1 1 480px", minWidth: "0", display: "flex", flexDirection: "column", gap: "22px" }}>
<span className="eyebrow">Who is teaching this</span>
<h2 className="h2">Luca Caruana</h2>
<p className="body">Certified Money Coach. Brought money coaching to Malta in 2023. Hundreds of clients, workshops for more than a thousand people at HSBC, PwC Malta, MeDirect and others. Columnist in the Times of Malta.</p>
<blockquote style={{ margin: "0", padding: "20px 24px", borderLeft: "4px solid #FAAC15", background: "#FDF7E8", borderRadius: "0 16px 16px 0", fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "22px", lineHeight: "1.3" }}>I'm not a broker. I don't sell financial products. I teach people how to think.</blockquote>
<p className="body">That distinction is the whole point. Nobody in this course gets nudged towards a fund because it pays a commission, because there is no commission. There's a course fee, and that's the entire commercial relationship.</p>
<p className="body">What you get instead is four evenings with someone who invests his own money, has made his own expensive mistakes, and will show you both.</p>
</div>
</div>
</section>
{/* PAST STUDENTS */}
<section style={{ background: "#FDF7E8", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "720px" }}>
<span className="eyebrow">From past students</span>
<h2 className="h2">People who have already done this course.</h2>
</div>
<div className="quotes" style={{ columns: "2", columnGap: "20px" }}>
<blockquote className="quote" style={{ margin: "0 0 20px" }}><p>"I recently completed an online investment course with Luca Caruana and I cannot recommend it enough. He has a fantastic ability to simplify complex financial concepts, making them easy to understand even if you're a complete beginner. Luca is incredibly approachable, patient, and uses great real-life examples that really help everything click. If you've been intimidated by investing, this is the course for you."</p><cite>Valerie Vella</cite></blockquote>
<blockquote className="quote" style={{ margin: "0 0 20px" }}><p>"His course helped me understand the world of investments and helped build my confidence. I learned a lot, well done."</p><cite>Marianne Zammit</cite></blockquote>
<blockquote className="quote" style={{ margin: "0 0 20px" }}><p>"On his newspaper column, Luca comes across as a nice guy. In person he is lovely. He is patient, passes on his knowledge using simple, everyday language. He has a hands-on approach and is highly receptive to questions from his audience. I thoroughly enjoyed his sessions and found them extremely informative."</p><cite>Bernard Busuttil</cite></blockquote>
<blockquote className="quote" style={{ margin: "0 0 20px" }}><p>"Very informative course with clear explanations and well-prepared materials."</p><cite>Clayton Camilleri</cite></blockquote>
<blockquote className="quote" style={{ margin: "0 0 20px" }}><p>"I recently attended the financial course and found it to be extremely informative and valuable. The content was well structured, easy to follow, and relevant to both beginners and those with some prior financial knowledge. I particularly appreciated the real-life examples and interactive discussions, which helped me better understand topics such as investment strategies and risk management. A course that I really recommend."</p><cite>Louise Attard Refalo</cite></blockquote>
<blockquote className="quote" style={{ margin: "0 0 20px" }}><p>"Luca is very professional, knowledgeable, and trustworthy. He makes complex topics like crypto and investing easy to understand, especially for beginners. Highly recommend his courses and coaching sessions to anyone looking to grow their financial knowledge."</p><cite>Kieran Vella</cite></blockquote>
<blockquote className="quote" style={{ margin: "0 0 20px" }}><p>"Finally I found a person who is very professional in his work and trustworthy. When you are learning, you need someone to come down to your level, especially when you are new. I recommend anyone who wants to learn to do a course with Luca. You can only gain in knowledge. 10/10"</p><cite>Alexander Pace</cite></blockquote>
</div>
<span style={{ fontSize: "14px", color: "#6B6248" }}>All reviews published on the Money Coaching Hub Facebook page.</span>
</div>
</section>
{/* FAQ */}
<section style={{ background: "#ffffff", padding: "96px 0" }}>
<div className="wrap" style={{ maxWidth: "860px", display: "flex", flexDirection: "column", gap: "28px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
<span className="eyebrow">Before you decide</span>
<h2 className="h2">The questions people actually ask.</h2>
</div>
<div style={{ borderTop: "1px solid #E6E0D0" }}>
<details open><summary>Is this financial advice?</summary><div className="answer">No, and this matters. Luca is a Certified Money Coach, not a licensed investment adviser, and Money Coaching Hub is not a regulated investment firm. Everything taught is general financial education. You'll learn how different instruments work, how to assess them and how to build a framework, but nobody will tell you what to buy, and no products are sold at any point.</div></details>
<details><summary>I know nothing about investing. Will I be lost?</summary><div className="answer">No. Session one starts from the beginning, with no assumed knowledge. Most people who take this course have never bought a single share. The ones with some experience tend to find the psychology session the most useful, because that's the part nobody teaches them.</div></details>
<details><summary>What language is the course in?</summary><div className="answer">The live sessions are in Maltese. If you'd rather learn in English, <a href="/contact-us/">book a 10-minute call</a> and we'll find the right option for you.</div></details>
<details><summary>What if I can't make a Monday?</summary><div className="answer">Every session is recorded and sent out afterwards, and you keep the recordings. You can also send questions in advance and they'll be answered live. That said, the live sessions are where the value is, so come if you can.</div></details>
<details><summary>Why a small group?</summary><div className="answer">Because past a certain size it stops being a conversation and becomes a webinar. The whole format depends on being able to stop and answer a real question from a real person. When the places are gone, they're gone until the next cohort.</div></details>
<details><summary>Is this relevant if I'm not in Malta?</summary><div className="answer">Yes. The course is built around European platforms and European investors, which is deliberate, because most investing content online assumes you're American and can buy things you can't actually access. If you're investing from anywhere in the EU, it applies.</div></details>
</div>
</div>
</section>
{/* APPLY */}
<section id="apply" style={{ background: "#FAAC15", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center", textAlign: "center" }}>
<span className="eyebrow" style={{ color: "#111111" }}>Starts Monday 11 January 2027</span>
<h2 className="h2" style={{ fontSize: "48px", maxWidth: "760px" }}>One evening a week. Four weeks. Done.</h2>
<p className="body" style={{ color: "#111111", maxWidth: "560px" }}>You've been meaning to sort this out for a while. This is four Mondays.</p>
<div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
<span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "40px", lineHeight: "1" }}>€175</span>
<a href={checkout} className="btn btn-dark" style={{ minWidth: "280px" }}>Apply for the January cohort</a>
<span className="compliance" style={{ color: "#5A4A1A", maxWidth: "460px" }}>Education, not advice. Money Coaching Hub is not a regulated investment firm. No financial products are sold and nothing on this course constitutes a personal recommendation.</span>
</div>
<div style={{ display: "flex", gap: "32px", flexWrap: "wrap", justifyContent: "center", paddingTop: "24px", borderTop: "1px solid rgba(17,17,17,.2)", fontSize: "13px", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: "700", color: "#5A4A1A" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}><span>Starts</span><b style={{ color: "#111111" }}>11 Jan 2027</b></div>
<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}><span>Format</span><b style={{ color: "#111111" }}>Live online</b></div>
<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}><span>Time</span><b style={{ color: "#111111" }}>Mondays 7.30pm</b></div>
<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}><span>Sessions</span><b style={{ color: "#111111" }}>4 × 1 hour</b></div>
<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}><span>Language</span><b style={{ color: "#111111" }}>Maltese</b></div>
</div>
</div>
</section>

      </main>
      <PageFooter />
    </>
  );
}
