import { SiteFooter, SiteHeader } from "@/components/chrome";
import { UnspokenForm } from "@/components/forms";
import { categoryName, posts } from "@/lib/blog";
import { columnFeatured, columnList } from "@/lib/content";

const monthYear = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric" });

export default function Home() {
  const latest = posts.slice(0, 3);
  const latestColumns = [columnFeatured, columnList[0]];
  return (
    <div className="home" style={{ width: "100%", fontFamily: "Lato,sans-serif", color: "#111111", background: "#ffffff", display: "flex", flexDirection: "column" }}>
      <SiteHeader />
      <main id="main" style={{ display: "contents" }}>
{/* HERO */}
<section id="top" style={{ background: "#FDF7E8", padding: "72px 0 0" }}>
<div className="wrap" style={{ display: "flex", gap: "48px", alignItems: "flex-end", flexWrap: "wrap" }}>
<div style={{ flex: "1 1 480px", minWidth: "0", paddingBottom: "72px", display: "flex", flexDirection: "column", gap: "28px" }}>
<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
<div style={{ display: "flex" }}>
<img src="/img/face1.jpg" alt="" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#D9CFB3", border: "2px solid #FDF7E8", objectFit: "cover", display: "block" }} />
<img src="/img/face2.jpg" alt="" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#C9BC9C", border: "2px solid #FDF7E8", marginLeft: "-10px", objectFit: "cover", display: "block" }} />
<img src="/img/face3.jpg" alt="" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#B8A986", border: "2px solid #FDF7E8", marginLeft: "-10px", objectFit: "cover", display: "block" }} />
</div>
<span style={{ fontSize: "15px", color: "#3A3A3A" }}><strong style={{ color: "#111111" }}>Hundreds</strong> of clients coached, <strong style={{ color: "#111111" }}>1,000+</strong> workshop participants</span>
</div>
<h1 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "64px", lineHeight: "1.02", letterSpacing: "-0.02em", margin: "0", color: "#111111" }}>Let me help you be <span style={{ color: "#FAAC15" }}>great</span> with money.</h1>
<p className="body" style={{ fontSize: "20px", maxWidth: "520px" }}>Earning well but still broke at the end of the month? I'm Luca, a Certified Money Coach. Together we build your money map, fill the knowledge gaps and keep you going.</p>
<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
<a href="/contact-us/" className="btn btn-gold">Book a 10-minute call</a>
<a href="#course" className="btn btn-ghost">See the investing course</a>
</div>
<div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
<span className="chip" style={{ borderColor: "#E0D5B7", background: "transparent", fontSize: "14px", padding: "8px 14px" }}>Certified Money Coach</span>
<span className="chip" style={{ borderColor: "#E0D5B7", background: "transparent", fontSize: "14px", padding: "8px 14px" }}>No products, no commissions</span>
<span className="chip" style={{ borderColor: "#E0D5B7", background: "transparent", fontSize: "14px", padding: "8px 14px" }}>Columnist, Times of Malta</span>
</div>
</div>
<div style={{ flex: "0 1 460px", minWidth: "300px", display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "72px" }}>
<div style={{ position: "relative", width: "100%", maxWidth: "420px", marginLeft: "20px" }}>
<div aria-hidden="true" style={{ position: "absolute", left: "-20px", top: "20px", width: "100%", height: "100%", background: "#FAAC15", borderRadius: "28px" }}></div>
<img src="/img/luca-tv.jpg" alt="Luca Caruana laughing during a TV interview" style={{ position: "relative", width: "100%", aspectRatio: "4/5", objectFit: "cover", objectPosition: "center 15%", borderRadius: "28px", display: "block" }} />
<div style={{ position: "absolute", left: "-20px", bottom: "28px", background: "#ffffff", borderRadius: "14px", padding: "14px 18px", boxShadow: "0 8px 24px rgba(0,0,0,0.14)", display: "flex", flexDirection: "column", gap: "2px" }}>
<span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "22px", lineHeight: "1.15", color: "#111111" }}>Certified Money Coach</span>
<span style={{ fontSize: "13px", color: "#6B6248" }}>Columnist, Times of Malta</span>
</div>
</div>
</div>
</div>
</section>
{/* LOGO STRIP */}
<section style={{ background: "#111111", padding: "22px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
<span style={{ fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9C3B1", fontWeight: "700" }}>Trusted by teams at</span>
<div style={{ display: "flex", gap: "16px 36px", flexWrap: "wrap", alignItems: "center", justifyContent: "center", fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "15px", color: "#ffffff" }}>
<span>HSBC</span><span>PwC Malta</span><span>MeDirect</span><span>MGA</span><span>Evolution</span><span>Deriv</span><span>Thomas Smith Group</span><span>Alf Mizzi &amp; Sons</span><span>Nectar</span><span>9H Digital</span><span>Siegfried</span><span>Malta Institute of Accountants</span>
</div>
</div>
</section>
{/* COURSE */}
<section id="course" style={{ background: "#ffffff", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", gap: "56px", flexWrap: "wrap", alignItems: "stretch" }}>
<div style={{ flex: "1 1 520px", minWidth: "0", display: "flex", flexDirection: "column", gap: "24px" }}>
<span className="eyebrow">Bestselling course · Taught in Maltese</span>
<h2 className="h2" style={{ fontSize: "52px" }}>Investing Made Simple</h2>
<p className="body" style={{ fontSize: "20px" }}>The course that took hundreds of Maltese and European professionals from "I don't know where to start" to their first investment, in four weeks. No jargon, no products pushed, no pressure.</p>
<ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "14px", fontSize: "18px", color: "#111111" }}>
<li style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}><span aria-hidden="true" style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#FAAC15", flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span>4 live online sessions, recorded if you miss one</span></li>
<li style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}><span aria-hidden="true" style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#FAAC15", flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span>Cohort WhatsApp group and lifetime access to the materials</span></li>
<li style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}><span aria-hidden="true" style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#FAAC15", flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span>Education only: you decide what to buy, never a sales pitch</span></li>
</ul>
<blockquote style={{ margin: "8px 0 0", padding: "20px 24px", borderLeft: "4px solid #FAAC15", background: "#FDF7E8", borderRadius: "0 16px 16px 0", fontSize: "17px", lineHeight: "1.5", color: "#3A3A3A" }}>"Luca helped me understand all I needed to know to start investing. 10/10!"<br /><span style={{ fontSize: "14px", color: "#6B6248" }}>Angele Azzopardi, Freelance Creative Director</span></blockquote>
</div>
<div style={{ flex: "0 1 420px", minWidth: "300px" }}>
<div style={{ background: "#111111", color: "#ffffff", borderRadius: "24px", padding: "40px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "22px", height: "100%" }}>
<span style={{ display: "inline-flex", alignSelf: "flex-start", padding: "8px 14px", borderRadius: "999px", background: "#FAAC15", color: "#111111", fontWeight: "700", fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Applications open for January</span>
<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
<span style={{ fontSize: "14px", color: "#C9C3B1", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: "700" }}>Next cohort starts</span>
<span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "40px", lineHeight: "1" }}>11 January 2027</span>
</div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "16px" }}>
<div style={{ background: "#1F1F1F", borderRadius: "14px", padding: "16px", display: "flex", flexDirection: "column", gap: "4px" }}><span style={{ fontSize: "13px", color: "#C9C3B1" }}>Format</span><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "22px", color: "#FFD112" }}>Every Monday, 4 weeks</span></div>
<div style={{ background: "#1F1F1F", borderRadius: "14px", padding: "16px", display: "flex", flexDirection: "column", gap: "4px" }}><span style={{ fontSize: "13px", color: "#C9C3B1" }}>Investment</span><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "26px", color: "#FFD112" }}>€175</span></div>
</div>
<p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "#C9C3B1" }}>Live online, taught in Maltese. Small group, so places are limited.</p>
<a href="/investing-made-simple/" className="btn btn-gold" style={{ width: "100%" }}>Apply for the January cohort</a>
<a href="/investing-made-simple/" style={{ fontSize: "14px", color: "#C9C3B1", textAlign: "center", textDecoration: "underline" }}>Full course details and FAQ</a>
</div>
</div>
</div>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "20px", paddingTop: "64px" }}>
<span className="eyebrow" style={{ color: "#6B6248" }}>Other programmes</span>
<div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "20px" }}>
<a href="/crypto-made-simple-the-online-course/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", padding: "24px", borderRadius: "16px", background: "#FDF7E8", color: "#111111" }}>
<span style={{ fontSize: "13px", color: "#6B6248" }}>Online course · Maltese</span>
<span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "20px" }}>Crypto Made Simple</span>
<span style={{ fontSize: "15px", color: "#3A3A3A", lineHeight: "1.5" }}>Understand Bitcoin, Ethereum and the rest before you put a cent in. Next cohort: 14, 16 and 21 December 2026.</span>
<span style={{ fontSize: "14px", fontWeight: "700", marginTop: "auto", paddingTop: "8px" }}>Learn more →</span>
</a>
<a href="/side-hustle/#notify" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", padding: "24px", borderRadius: "16px", background: "#FDF7E8", color: "#111111", border: "1.5px solid #FAAC15" }}>
<span style={{ fontSize: "13px", color: "#B07400", fontWeight: "700" }}>New · Founding cohort February 2027</span>
<span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "20px" }}>Side Hustle, Done Right</span>
<span style={{ fontSize: "15px", color: "#3A3A3A", lineHeight: "1.5" }}>Six weeks from idea to first paying customer, with someone who built his on the side. Intro session 20 January.</span>
<span style={{ fontSize: "14px", fontWeight: "700", marginTop: "auto", paddingTop: "8px" }}>Get notified →</span>
</a>
<a href="/technical-analysis-bootcamp/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", padding: "24px", borderRadius: "16px", background: "#FDF7E8", color: "#111111" }}>
<span style={{ fontSize: "13px", color: "#6B6248" }}>Bootcamp · 2 sessions</span>
<span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "20px" }}>Technical Analysis Bootcamp</span>
<span style={{ fontSize: "15px", color: "#3A3A3A", lineHeight: "1.5" }}>Read a chart without the noise. Intro level, deliberately simple. 11 and 22 December 2026.</span>
<span style={{ fontSize: "14px", fontWeight: "700", marginTop: "auto", paddingTop: "8px" }}>Learn more →</span>
</a>
</div>
</div>
</section>
{/* CONCERNS BRIDGE */}
<section style={{ background: "#FDF7E8", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "32px", alignItems: "center", textAlign: "center" }}>
<span className="eyebrow">The things we don't say out loud</span>
<h2 className="h2" style={{ maxWidth: "800px" }}>Does any of this sound like you?</h2>
<div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", maxWidth: "980px" }}>
<span className="chip">"I earn well. So why is there nothing left on the 28th?"</span>
<span className="chip">"My partner and I only talk about money when we're fighting about it."</span>
<span className="chip">"I've been meaning to start investing for three years."</span>
<span className="chip">"I'm 38 and I still don't have an emergency fund."</span>
<span className="chip">"Everyone thinks I'm doing fine. I'm not."</span>
<span className="chip">"I don't open the bills. I know, I know."</span>
</div>
<p className="body" style={{ maxWidth: "640px" }}>Nobody taught us this. Most of us were told not to even talk about it. That silence is the real problem, and it's the first thing we fix.</p>
<a href="/contact-us/" className="btn btn-dark">Book a 10-minute call</a>
</div>
</section>
{/* COACHING */}
<section id="coaching" style={{ background: "#ffffff", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", flexWrap: "wrap" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "640px" }}>
<span className="eyebrow">Coaching</span>
<h2 className="h2">Coaching, one-to-one</h2>
<p className="body">Online from anywhere, or in person in Malta. You leave every session with a simple money map and clear next steps.</p>
</div>
<a href="/contact-us/" className="btn btn-ghost">Book a 10-minute call</a>
</div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "20px" }}>
<div className="card" style={{ borderColor: "#FAAC15", boxShadow: "0 0 0 2px #FAAC15 inset", padding: "40px" }}><span className="eyebrow">For you</span><h3 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "26px", margin: "0" }}>Individual Coaching</h3><p className="body" style={{ fontSize: "17px" }}>A one-to-one journey to rewrite your money story, fix the habits that keep you broke and start investing with confidence.</p><a href="/services/" style={{ fontSize: "15px", fontWeight: "700", marginTop: "auto" }}>Learn more →</a></div>
<div className="card" style={{ padding: "40px" }}><span className="eyebrow" style={{ color: "#6B6248" }}>For two</span><h3 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "26px", margin: "0" }}>Couples Coaching</h3><p className="body" style={{ fontSize: "17px" }}>Talk about money without the awkwardness, align your goals and plan your future together.</p><a href="/services/" style={{ fontSize: "15px", fontWeight: "700", marginTop: "auto" }}>Learn more →</a></div>
</div>
<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", padding: "24px 32px", borderRadius: "16px", background: "#FDF7E8" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
<span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "18px" }}>Not ready for a programme? Start with one session.</span>
<span style={{ fontSize: "15px", color: "#3A3A3A" }}>A 90-minute deep-dive on one money question. Property or stocks? Pay the loan or invest?</span>
</div>
<a href="/contact-us/" style={{ fontSize: "15px", fontWeight: "700", whiteSpace: "nowrap" }}>Book a single session →</a>
</div>
</div>
</section>
{/* ABOUT */}
<section id="about" style={{ background: "#FDF7E8", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", gap: "64px", alignItems: "center", flexWrap: "wrap" }}>
<div style={{ flex: "0 1 420px", minWidth: "280px", display: "flex", justifyContent: "center" }}>
<div style={{ position: "relative", width: "400px", maxWidth: "100%", marginLeft: "20px" }}>
<div aria-hidden="true" style={{ position: "absolute", left: "-20px", top: "20px", width: "100%", height: "100%", background: "#FAAC15", borderRadius: "24px" }}></div>
<img src="/img/luca-curtain.jpg" alt="Luca Caruana speaking at an event" style={{ position: "relative", width: "100%", aspectRatio: "4/5", objectFit: "cover", objectPosition: "62% 20%", borderRadius: "24px", display: "block" }} />
</div>
</div>
<div style={{ flex: "1 1 480px", minWidth: "0", display: "flex", flexDirection: "column", gap: "22px" }}>
<span className="eyebrow">About Luca</span>
<h2 className="h2">Hello, I'm Luca.<br />Your money coach.</h2>
<p className="body">I brought money coaching to Malta in January 2023, when nobody here had heard of it. Since then I've coached hundreds of Maltese and European professionals who earn well but feel stuck: the ones who never learnt how money works and were told not to ask.</p>
<p className="body">I don't sell products and I don't tell you what to buy. I help you understand your money story, fix the habits that keep you broke, and start investing with a plan you actually understand.</p>
<div style={{ display: "flex", gap: "28px", flexWrap: "wrap", paddingTop: "8px" }}>
<div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "30px" }}>2023</span><span style={{ fontSize: "14px", color: "#6B6248" }}>brought money coaching to Malta</span></div>
<div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "30px" }}>1,000+</span><span style={{ fontSize: "14px", color: "#6B6248" }}>workshop participants</span></div>
<div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "30px" }}>70+</span><span style={{ fontSize: "14px", color: "#6B6248" }}>Times of Malta columns</span></div>
</div>
<div style={{ display: "flex", gap: "16px", flexWrap: "wrap", paddingTop: "8px" }}>
<a href="/contact-us/" className="btn btn-gold">Book a 10-minute call</a>
<a href="/luca/" className="btn btn-ghost">My story</a>
</div>
</div>
</div>
</section>
{/* COMPANIES */}
<section id="companies" style={{ background: "#111111", color: "#ffffff", padding: "80px 0" }}>
<div className="wrap" style={{ display: "flex", gap: "48px", alignItems: "center", flexWrap: "wrap" }}>
<div style={{ flex: "0 1 520px", minWidth: "280px" }}>
<img src="/img/luca-mia2.jpg" alt="Luca speaking at the Malta Institute of Accountants" style={{ width: "100%", aspectRatio: "3/2", objectFit: "cover", objectPosition: "center", borderRadius: "20px", display: "block" }} />
</div>
<div style={{ flex: "1 1 460px", minWidth: "0", display: "flex", flexDirection: "column", gap: "18px" }}>
<span className="eyebrow" style={{ color: "#FFD112" }}>For companies</span>
<h2 className="h2" style={{ color: "#ffffff" }}>Financial wellbeing workshops your team will actually enjoy.</h2>
<p className="body" style={{ color: "#C9C3B1" }}>Engaging, practical sessions on the psychology of money. Delivered to HSBC, PwC Malta, MeDirect, Thomas Smith Group and more.</p>
<blockquote style={{ margin: "0", fontSize: "17px", lineHeight: "1.5", color: "#ffffff" }}>"Luca is the only person that addresses the psychological aspect of money, and that part got people the most involved and intrigued."<br /><span style={{ fontSize: "14px", color: "#C9C3B1" }}>Christine Borg, Engagement &amp; Culture Manager, HSBC</span></blockquote>
<div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "8px", alignItems: "flex-start" }}>
<a href="/services/financial-workshops/" className="btn btn-gold">Enquire about a workshop</a>
<span style={{ fontSize: "14px", color: "#C9C3B1" }}>Lunch-and-learn, half-day or series. Online or on site in Malta.</span>
</div>
</div>
</div>
</section>
{/* TIMES OF MALTA COLUMN */}
<section id="column" style={{ background: "#FDF7E8", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", flexWrap: "wrap" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "680px" }}>
<span className="eyebrow">As published in Times of Malta</span>
<h2 className="h2">The Money Coach column</h2>
<p className="body">Every fortnight, a real reader writes in with a money story they've never told anyone. I answer in Malta's national newspaper. 70+ columns and counting.</p>
</div>
<a href="https://timesofmalta.com/author/luca-caruana.537" className="btn btn-ghost" target="_blank" rel="noopener">Read the column</a>
</div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "20px" }}>
{latestColumns.map((c) => (
<a key={c.href} href={c.href} target="_blank" rel="noopener" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "14px" }}>
<img src="/img/column-artwork.webp" alt="The Money Coach column, Times of Malta" loading="lazy" style={{ aspectRatio: "16/10", width: "100%", objectFit: "cover", borderRadius: "16px", background: "#E8DFC6", display: "block" }} />
<span style={{ fontSize: "13px", color: "#6B6248" }}>{c.date} · Times of Malta</span>
<span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "20px", lineHeight: "1.3" }}>{c.title}</span>
</a>
))}
<div style={{ borderRadius: "16px", background: "#111111", color: "#ffffff", padding: "32px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "16px", justifyContent: "center" }}>
<span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "24px", lineHeight: "1.25" }}>Got a money story you've never told anyone?</span>
<p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "#C9C3B1" }}>Write in anonymously. It might be the next column, and the answer might be the one you needed.</p>
<a href="/contact-us/?subject=My%20money%20story" className="btn btn-gold" style={{ alignSelf: "flex-start" }}>Send your story</a>
</div>
</div>
</div>
</section>
{/* TESTIMONIALS */}
<section id="reviews" style={{ background: "#ffffff", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center", textAlign: "center" }}>
<span className="eyebrow">Reviews</span>
<h2 className="h2">Don't take my word for it</h2>
</div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "20px" }}>
<div className="card" style={{ background: "#FDF7E8", borderColor: "#FDF7E8" }}><p className="body" style={{ fontSize: "17px", color: "#111111" }}>"I was a mess when we started. Just 2 months later I'm already seeing the improvement on paper and mentally."</p><div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "auto" }}><img src="/images/reviews/lorraine-sammut.webp" alt="" loading="lazy" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#D9CFB3", objectFit: "cover", display: "block" }} /><div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontWeight: "700", fontSize: "15px" }}>Lorraine Sammut</span><span style={{ fontSize: "13px", color: "#6B6248" }}>Key Account Manager</span></div></div></div>
<div className="card" style={{ background: "#FDF7E8", borderColor: "#FDF7E8" }}><p className="body" style={{ fontSize: "17px", color: "#111111" }}>"Luca doesn't dictate investment choices. He opens up a world of possibilities so I can decide."</p><div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "auto" }}><img src="/images/reviews/carmelo-romano.webp" alt="" loading="lazy" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#D9CFB3", objectFit: "cover", display: "block" }} /><div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontWeight: "700", fontSize: "15px" }}>Carmelo Romano</span><span style={{ fontSize: "13px", color: "#6B6248" }}>CTO</span></div></div></div>
<div className="card" style={{ background: "#FDF7E8", borderColor: "#FDF7E8" }}><p className="body" style={{ fontSize: "17px", color: "#111111" }}>"I appreciate Luca's no-BS, no bells-and-whistles approach. Practical solutions I can repeat."</p><div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "auto" }}><img src="/images/reviews/hannah-cremona.webp" alt="" loading="lazy" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#D9CFB3", objectFit: "cover", display: "block" }} /><div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontWeight: "700", fontSize: "15px" }}>Hannah Cremona</span><span style={{ fontSize: "13px", color: "#6B6248" }}>Business Strategist &amp; Mentor</span></div></div></div>
</div>
<div style={{ display: "flex", justifyContent: "center" }}><a href="/services/#reviews" style={{ fontWeight: "700", fontSize: "15px" }}>Read all 20+ reviews →</a></div>
</div>
</section>
{/* MONEY TYPES */}
<section id="types" style={{ background: "#FDF7E8", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", gap: "56px", alignItems: "center", flexWrap: "wrap" }}>
<div style={{ flex: "1 1 440px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px" }}>
<span className="eyebrow">Money Types</span>
<h2 className="h2">Which money type is running your money life?</h2>
<p className="body">Some days you're the Warrior in the driving seat. Other days the Innocent or the Martyr takes over, or the Fool goes on a splurge. Know your type and you can become the Magician: calm, confident and in control.</p>
<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
<a href="/take-money-type-quiz/" className="btn btn-dark">Take the 3-minute quiz</a>
<a href="/the-8-money-archetypes/" className="btn btn-ghost">Read about the 8 types</a>
</div>
</div>
<div style={{ flex: "1 1 440px", minWidth: "0", display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "12px" }}>
<div style={{ aspectRatio: "3/4", borderRadius: "16px", background: "#ffffff", border: "1px solid #E6E0D0", display: "flex", alignItems: "flex-end", padding: "14px", boxSizing: "border-box", fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "15px" }}>Innocent</div>
<div style={{ aspectRatio: "3/4", borderRadius: "16px", background: "#ffffff", border: "1px solid #E6E0D0", display: "flex", alignItems: "flex-end", padding: "14px", boxSizing: "border-box", fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "15px" }}>Victim</div>
<div style={{ aspectRatio: "3/4", borderRadius: "16px", background: "#ffffff", border: "1px solid #E6E0D0", display: "flex", alignItems: "flex-end", padding: "14px", boxSizing: "border-box", fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "15px" }}>Warrior</div>
<div style={{ aspectRatio: "3/4", borderRadius: "16px", background: "#ffffff", border: "1px solid #E6E0D0", display: "flex", alignItems: "flex-end", padding: "14px", boxSizing: "border-box", fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "15px" }}>Martyr</div>
<div style={{ aspectRatio: "3/4", borderRadius: "16px", background: "#ffffff", border: "1px solid #E6E0D0", display: "flex", alignItems: "flex-end", padding: "14px", boxSizing: "border-box", fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "15px" }}>Fool</div>
<div style={{ aspectRatio: "3/4", borderRadius: "16px", background: "#ffffff", border: "1px solid #E6E0D0", display: "flex", alignItems: "flex-end", padding: "14px", boxSizing: "border-box", fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "15px" }}>Creator</div>
<div style={{ aspectRatio: "3/4", borderRadius: "16px", background: "#ffffff", border: "1px solid #E6E0D0", display: "flex", alignItems: "flex-end", padding: "14px", boxSizing: "border-box", fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "15px" }}>Tyrant</div>
<div style={{ aspectRatio: "3/4", borderRadius: "16px", background: "#FAAC15", display: "flex", alignItems: "flex-end", padding: "14px", boxSizing: "border-box", fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "15px" }}>Magician ✦</div>
</div>
</div>
<div className="wrap" style={{ paddingTop: "64px" }}>
<a href="/portfolio-management/" style={{ textDecoration: "none", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", padding: "28px 32px", borderRadius: "20px", background: "#111111" }}>
<div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
<div aria-hidden="true" style={{ display: "grid", gridTemplateColumns: "repeat(3, 18px)", gap: "3px" }}><span style={{ height: "14px", borderRadius: "3px", background: "#E3572B" }}></span><span style={{ height: "14px", borderRadius: "3px", background: "#FAAC15" }}></span><span style={{ height: "14px", borderRadius: "3px", background: "#FFD112" }}></span><span style={{ height: "14px", borderRadius: "3px", background: "#FAAC15" }}></span><span style={{ height: "14px", borderRadius: "3px", background: "#FFD112" }}></span><span style={{ height: "14px", borderRadius: "3px", background: "#F3E6B8" }}></span></div>
<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
<span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: ".1em", textTransform: "uppercase", color: "#FFD112" }}>Free tool</span>
<span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "22px", color: "#ffffff" }}>Build your €10,000 Investment House</span>
<span style={{ fontSize: "15px", color: "#C9C3B1" }}>Stack bricks of different risk and see what €10,000 could become in 10, 20 or 30 years.</span>
</div>
</div>
<span className="btn btn-gold" style={{ whiteSpace: "nowrap" }}>Start building</span>
</a>
</div>
</section>
{/* BLOG */}
<section id="blog" style={{ background: "#ffffff", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", flexWrap: "wrap" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}><span className="eyebrow">Knowledge hub</span><h2 className="h2">Fresh from the blog</h2></div>
<a href="/blog/" style={{ fontWeight: "700", fontSize: "15px" }}>All articles →</a>
</div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "20px" }}>
{latest.length ? latest.map((p) => (
<a key={p.id} href={p.path} style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "14px" }}>{p.image ? <img src={p.image.src} alt={p.image.alt} loading="lazy" style={{ aspectRatio: "16/10", width: "100%", objectFit: "cover", borderRadius: "16px", background: "#E8DFC6", display: "block" }} /> : <div style={{ aspectRatio: "16/10", borderRadius: "16px", background: "#E8DFC6" }}></div>}<span style={{ fontSize: "13px", color: "#6B6248" }}>{categoryName(p.category)} · {monthYear(p.date)} · {p.readingTime} min read</span><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "20px", lineHeight: "1.3" }}>{p.title}</span></a>
)) : (<>
<a href="/blog/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "14px" }}><div style={{ aspectRatio: "16/10", borderRadius: "16px", background: "#E8DFC6" }}></div><span style={{ fontSize: "13px", color: "#6B6248" }}>Investing · Sep 2025 · 5 min read</span><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "20px", lineHeight: "1.3" }}>Investing for Children: Smarter Strategies Beyond Child Savings Plans</span></a>
<a href="/blog/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "14px" }}><div style={{ aspectRatio: "16/10", borderRadius: "16px", background: "#E8DFC6" }}></div><span style={{ fontSize: "13px", color: "#6B6248" }}>Family budgeting · Aug 2025 · 4 min read</span><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "20px", lineHeight: "1.3" }}>Couples Financial Counseling: What Happens When One Partner Is a Millionaire?</span></a>
<a href="/blog/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "14px" }}><div style={{ aspectRatio: "16/10", borderRadius: "16px", background: "#E8DFC6" }}></div><span style={{ fontSize: "13px", color: "#6B6248" }}>Investing · Aug 2025 · 4 min read</span><span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "20px", lineHeight: "1.3" }}>Why I'm Shifting Focus to Artificial Intelligence Stocks</span></a>
</>)}
</div>
</div>
</section>
{/* CLOSING CTA + NEWSLETTER */}
<section id="contact" style={{ background: "#FAAC15", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", gap: "56px", flexWrap: "wrap", alignItems: "center" }}>
<div style={{ flex: "1 1 480px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px" }}>
<h2 className="h2" style={{ fontSize: "48px" }}>Want your money working as hard as you do?</h2>
<p className="body" style={{ color: "#111111" }}>Let me show you how. Based in Malta (EU), coaching clients all over the world via Google Meet. No products, no commissions, no judgement.</p>
<a href="/contact-us/" className="btn btn-dark" style={{ alignSelf: "flex-start" }}>Book a 10-minute call</a>
</div>
<UnspokenForm />
</div>
</section>

      </main>
      <SiteFooter />
    </div>
  );
}
