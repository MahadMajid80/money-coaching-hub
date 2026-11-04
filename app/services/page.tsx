import type { Metadata } from "next";
import { PageFooter, PageHeader } from "@/components/chrome";
export const metadata: Metadata = {
  title: "Coaching, one-to-one – Individual & Couples Money Coaching",
  description: "One-to-one and couples money coaching with Luca Caruana, Certified Money Coach. Online from anywhere, or in person in Malta.",
  alternates: { canonical: "/services/" },
};

export default function Page() {
  return (
    <>
      <PageHeader cta={{ label: "Book a 10-minute call", href: "/contact-us/" }} />
      <main id="main">
{/* HERO */}
<section style={{ background: "#FDF7E8", padding: "72px 0" }}>
<div className="wrap" style={{ display: "flex", gap: "56px", flexWrap: "wrap", alignItems: "center" }}>
<div style={{ flex: "1 1 520px", minWidth: "0", display: "flex", flexDirection: "column", gap: "24px" }}>
<span className="eyebrow">Coaching · Online or in person in Malta</span>
<h1 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "60px", lineHeight: "1.02", letterSpacing: "-0.02em", margin: "0" }}>The money conversation you never got to have.</h1>
<p className="body" style={{ fontSize: "20px", maxWidth: "560px" }}>Not a budget lecture. Not a product pitch. An hour with someone who listens first, then helps you build a simple money map you'll actually follow.</p>
<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
<a href="/contact-us/" className="btn btn-gold">Book a 10-minute call</a>
<a href="#options" className="btn btn-ghost">See the options</a>
</div>
<div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
<span className="chip" style={{ borderColor: "#E0D5B7", background: "transparent", fontSize: "14px", padding: "8px 14px" }}>Certified Money Coach</span>
<span className="chip" style={{ borderColor: "#E0D5B7", background: "transparent", fontSize: "14px", padding: "8px 14px" }}>Google Meet or in person</span>
<span className="chip" style={{ borderColor: "#E0D5B7", background: "transparent", fontSize: "14px", padding: "8px 14px" }}>No products, no commissions</span>
</div>
</div>
<div style={{ flex: "0 1 420px", minWidth: "280px", display: "flex", justifyContent: "center" }}>
<div style={{ position: "relative", width: "380px", maxWidth: "100%", marginLeft: "20px" }}>
<div aria-hidden="true" style={{ position: "absolute", left: "-20px", top: "20px", width: "100%", height: "100%", background: "#FAAC15", borderRadius: "28px" }}></div>
<img src="/img/luca-close.jpg" alt="Luca Caruana, smiling" style={{ position: "relative", width: "100%", aspectRatio: "4/5", objectFit: "cover", borderRadius: "28px", display: "block" }} />
</div>
</div>
</div>
</section>
{/* HOW IT WORKS */}
<section style={{ background: "#ffffff", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "720px" }}>
<span className="eyebrow">How it works</span>
<h2 className="h2">Three steps. No homework before the first one.</h2>
</div>
<div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "20px" }}>
<div className="card"><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "40px", lineHeight: "1", color: "#FAAC15" }}>01</span><h3 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "22px", margin: "0" }}>A 10-minute call</h3><p className="body" style={{ fontSize: "16px" }}>Free, no pressure. You tell me what's going on, I tell you honestly whether coaching will help and which option fits.</p></div>
<div className="card"><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "40px", lineHeight: "1", color: "#FAAC15" }}>02</span><h3 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "22px", margin: "0" }}>Your money story</h3><p className="body" style={{ fontSize: "16px" }}>The first session is about where your habits came from, not a spreadsheet. We find the pattern before we touch the numbers.</p></div>
<div className="card"><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "40px", lineHeight: "1", color: "#FAAC15" }}>03</span><h3 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "22px", margin: "0" }}>Your money map</h3><p className="body" style={{ fontSize: "16px" }}>A one-page plan you understand and can repeat: what comes in, what goes where, what you're building towards. Then we keep you on it.</p></div>
</div>
</div>
</section>
{/* OPTIONS */}
<section id="options" style={{ background: "#FDF7E8", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", flexWrap: "wrap" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "640px" }}>
<span className="eyebrow">The options</span>
<h2 className="h2">Pick the shape. We'll agree the details on the call.</h2>
</div>
<a href="/contact-us/" className="btn btn-ghost">Book a 10-minute call</a>
</div>
<div className="g2" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "20px" }}>
<div className="card" style={{ borderColor: "#FAAC15", boxShadow: "0 0 0 2px #FAAC15 inset", padding: "40px", gap: "18px" }}>
<span className="eyebrow">For you</span>
<h3 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "28px", margin: "0" }}>Individual Coaching</h3>
<p className="body" style={{ fontSize: "17px" }}>A one-to-one journey over several sessions. Rewrite your money story, fix the habits that keep you broke, build the emergency fund, and start investing with a plan you understand.</p>
<ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "16px", color: "#111111" }}>
<li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span>Best for: earning well, nothing to show for it</span></li>
<li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span>Your own forecasting and expense-tracking templates</span></li>
<li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span>Written follow-up after every session</span></li>
</ul>
<a href="/contact-us/" className="btn btn-gold" style={{ alignSelf: "flex-start" }}>Book a 10-minute call</a>
</div>
<div className="card" style={{ padding: "40px", gap: "18px" }}>
<span className="eyebrow" style={{ color: "#6B6248" }}>For two</span>
<h3 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "28px", margin: "0" }}>Couples Coaching</h3>
<p className="body" style={{ fontSize: "17px" }}>Talk about money without it turning into a fight. Understand each other's money types, align on what you're building, and set up accounts and habits that work for both of you.</p>
<ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "16px", color: "#111111" }}>
<li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span>Best for: one saver, one spender, or two who never talk about it</span></li>
<li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span>Both money type quizzes, read together</span></li>
<li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span>A joint money map and a bills setup you both agree on</span></li>
</ul>
<a href="/contact-us/" className="btn btn-ghost" style={{ alignSelf: "flex-start" }}>Book a 10-minute call</a>
</div>
</div>
<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", padding: "28px 32px", borderRadius: "16px", background: "#ffffff", border: "1px solid #E6E0D0" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
<span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "20px" }}>Not ready for a programme? Start with one session.</span>
<span style={{ fontSize: "16px", color: "#3A3A3A" }}>A 90-minute deep-dive on one money question. Property or stocks? Pay off the loan or invest? Take the job or not? You leave with a simple map and clear next steps.</span>
</div>
<a href="/contact-us/" className="btn btn-dark" style={{ whiteSpace: "nowrap" }}>Book a single session</a>
</div>
</div>
</section>
{/* WHO IT'S FOR */}
<section style={{ background: "#ffffff", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "32px", alignItems: "center", textAlign: "center" }}>
<span className="eyebrow">The things we don't say out loud</span>
<h2 className="h2" style={{ maxWidth: "800px" }}>Does any of this sound like you?</h2>
<div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", maxWidth: "980px" }}>
<span className="chip">"I earn well. So why is there nothing left on the 28th?"</span>
<span className="chip">"My partner and I only talk about money when we're fighting about it."</span>
<span className="chip">"I'm 38 and I still don't have an emergency fund."</span>
<span className="chip">"Everyone thinks I'm doing fine. I'm not."</span>
<span className="chip">"I don't open the bills. I know, I know."</span>
</div>
<p className="body" style={{ maxWidth: "640px" }}>Nobody taught us this. Most of us were told not to even talk about it. That silence is the real problem, and it's the first thing we fix.</p>
</div>
</section>
{/* TESTIMONIALS */}
<section id="reviews" style={{ background: "#FDF7E8", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "720px" }}>
<span className="eyebrow">From coaching clients</span>
<h2 className="h2">Don't take my word for it</h2>
</div>
<div className="quotes" style={{ columns: "2", columnGap: "20px" }}>
<blockquote className="quote" style={{ margin: "0 0 20px", background: "#ffffff" }}><p>"I was a mess when we started and you really helped me in more ways than I thought you could. Thanks to your feedback I learned that I'm great with short-term goals and what I lacked was guidance for long-term ones. Just 2 months later I'm already seeing the improvement on paper and mentally."</p><cite>Lorraine Sammut <span style={{ fontWeight: "400", color: "#6B6248" }}>· Key Account Manager</span></cite></blockquote>
<blockquote className="quote" style={{ margin: "0 0 20px", background: "#ffffff" }}><p>"Luca doesn't dictate investment choices. He opens up a world of possibilities, enabling me to make informed decisions about my savings."</p><cite>Carmelo Romano <span style={{ fontWeight: "400", color: "#6B6248" }}>· CTO</span></cite></blockquote>
<blockquote className="quote" style={{ margin: "0 0 20px", background: "#ffffff" }}><p>"Luca has exceeded our expectations by actively listening to our needs. He presented multiple tailored scenarios that allowed us to choose the best path for our financial goals. His personalised approach made managing finances less daunting."</p><cite>Marlene Agius <span style={{ fontWeight: "400", color: "#6B6248" }}>· Gestalt Psychotherapist</span></cite></blockquote>
<blockquote className="quote" style={{ margin: "0 0 20px", background: "#ffffff" }}><p>"As a very practical person I appreciate Luca's no-BS, no bells-and-whistles approach. Practical, easy-to-implement solutions with a structure I can repeat."</p><cite>Hannah Cremona <span style={{ fontWeight: "400", color: "#6B6248" }}>· Business Strategist &amp; Mentor</span></cite></blockquote>
<blockquote className="quote" style={{ margin: "0 0 20px", background: "#ffffff" }}><p>"My husband and I had a couple of sessions with Luca regarding our finances. He explained the various options of investing very clearly and in a way which, as beginners, we understood. He also went out of his way to follow up after the meetings."</p><cite>Anna Debono <span style={{ fontWeight: "400", color: "#6B6248" }}>· Project Coordinator</span></cite></blockquote>
<blockquote className="quote" style={{ margin: "0 0 20px", background: "#ffffff" }}><p>"The model Luca has shifted my understanding of money, my relationship with money, and eventually brought awareness to my true potential, which allowed me to get back to the business idea that was long on my mind."</p><cite>Ieva Strekaite <span style={{ fontWeight: "400", color: "#6B6248" }}>· Entrepreneur</span></cite></blockquote>
</div>
</div>
</section>
{/* FAQ */}
<section style={{ background: "#ffffff", padding: "96px 0" }}>
<div className="wrap" style={{ maxWidth: "860px", display: "flex", flexDirection: "column", gap: "28px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
<span className="eyebrow">Before you book</span>
<h2 className="h2">The questions people actually ask.</h2>
</div>
<div style={{ borderTop: "1px solid #E6E0D0" }}>
<details open><summary>Is this financial advice?</summary><div className="answer">No. Luca is a Certified Money Coach, not a licensed investment adviser, and Money Coaching Hub is not a regulated investment firm. Coaching helps you understand your own behaviour, build a plan and make informed decisions. Nobody tells you what to buy and no products are sold.</div></details>
<details><summary>How much does it cost?</summary><div className="answer">It depends on the shape: a single session, an individual programme or couples coaching. I'll give you the exact figure on the 10-minute call, once I know what you need, so you're not paying for sessions you don't.</div></details>
<details><summary>Online or in person?</summary><div className="answer">Either. Most sessions run on Google Meet, which is how clients from across Europe work with me. If you're in Malta and prefer to sit across a table, we can do that too.</div></details>
<details><summary>Do I need to prepare anything?</summary><div className="answer">Nothing before the call. Before the first session I'll send a short intake form so we don't spend your hour collecting numbers. Bring honesty; the numbers can be messy.</div></details>
<details><summary>What if I'm embarrassed about my situation?</summary><div className="answer">Everyone is, at first. I've sat with people earning six figures with nothing saved, and people with hundreds of thousands in the bank too scared to move it. There's no situation I haven't seen, and none I'll judge.</div></details>
</div>
</div>
</section>
{/* CTA */}
<section style={{ background: "#FAAC15", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center", textAlign: "center" }}>
<h2 className="h2" style={{ fontSize: "48px", maxWidth: "760px" }}>Ten minutes. No pitch. Just a conversation.</h2>
<p className="body" style={{ color: "#111111", maxWidth: "560px" }}>Tell me what's going on with your money. I'll tell you honestly whether coaching will help.</p>
<a href="/contact-us/" className="btn btn-dark" style={{ minWidth: "280px" }}>Book a 10-minute call</a>
</div>
</section>

      </main>
      <PageFooter />
    </>
  );
}
