import type { Metadata } from "next";
import { PageFooter, PageHeader } from "@/components/chrome";

export const metadata: Metadata = {
  title: "The 8 Money Types",
  description: "The Innocent, Victim, Warrior, Martyr, Fool, Creator, Tyrant and Magician: the eight money types as Luca Caruana sees them in the coaching room.",
  alternates: { canonical: "/the-8-money-archetypes/" },
};

export default function Page() {
  return (
    <>
      <PageHeader cta={{ label: "Take the quiz", href: "/take-money-type-quiz/" }} />
      <main id="main">
<section style={{ background: "#FDF7E8", padding: "72px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "860px" }}>
<span className="eyebrow">Money psychology</span>
<h1 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "60px", lineHeight: "1.02", letterSpacing: "-0.02em", margin: "0" }}>The 8 Money Types</h1>
<p className="body" style={{ fontSize: "20px" }}>Your relationship with money isn't about maths. It's about the patterns you learnt long before you had a salary. The eight money types, developed by Deborah Price of the Money Coaching Institute, give those patterns names. Most people carry three or four, with one or two in charge, and they shift as life does.</p>
<p className="body">Below, each type as I see it in the coaching room. Read them, notice which ones sting, then take the quiz.</p>
<a href="/take-money-type-quiz/" className="btn btn-gold" style={{ alignSelf: "flex-start" }}>Take the 3-minute quiz</a>
</div>
</section>
<section style={{ background: "#ffffff", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "960px" }}>
<article id="innocent" className="tcard"><div className="icon" style={{ fontSize: "44px", color: "#B07400" }}>I</div><div style={{ display: "flex", flexDirection: "column", gap: "10px" }}><span className="tag">Type 1</span><h3>The Innocent</h3><p>Money feels big, confusing and slightly frightening, so the Innocent looks away and hopes it sorts itself out. Bills stay unopened, statements unread. They'd much rather someone they trust handled it. Underneath is not laziness but anxiety: looking means finding out.</p><span className="line">In the coaching room: "I know I should check. I just… don't."</span></div></article>
<article id="victim" className="tcard"><div className="icon" style={{ fontSize: "44px", color: "#B07400" }}>V</div><div style={{ display: "flex", flexDirection: "column", gap: "10px" }}><span className="tag">Type 2</span><h3>The Victim</h3><p>Money happens <em>to</em> the Victim. The economy, the landlord, the ex, the boss: there's always someone or something to blame, and often a real wound behind it. The pattern is waiting to be rescued rather than acting, which keeps the story true.</p><span className="line">In the coaching room: "What's the point, it never works out for people like me."</span></div></article>
<article id="warrior" className="tcard"><div className="icon" style={{ fontSize: "44px", color: "#B07400" }}>W</div><div style={{ display: "flex", flexDirection: "column", gap: "10px" }}><span className="tag">Type 3</span><h3>The Warrior</h3><p>Confident, disciplined, goal-driven. The Warrior sets a target, makes a plan, and uses both logic and gut to get there. This is the type most of us want more of. Its shadow is impatience with people who don't think the same way, including partners.</p><span className="line">In the coaching room: "Just tell me the numbers and I'll do it."</span></div></article>
<article id="martyr" className="tcard"><div className="icon" style={{ fontSize: "44px", color: "#B07400" }}>M</div><div style={{ display: "flex", flexDirection: "column", gap: "10px" }}><span className="tag">Type 4</span><h3>The Martyr</h3><p>Generous to a fault. The Martyr pays for everyone, lends to anyone, and puts their own future last. Often there's a quiet expectation that it will be repaid, in money or gratitude, and quiet resentment when it isn't. Very common among parents and eldest siblings.</p><span className="line">In the coaching room: "I can't say no to my family."</span></div></article>
<article id="fool" className="tcard"><div className="icon" style={{ fontSize: "44px", color: "#B07400" }}>F</div><div style={{ display: "flex", flexDirection: "column", gap: "10px" }}><span className="tag">Type 5</span><h3>The Fool</h3><p>The Fool loves the thrill: the splurge, the hot tip, the crypto at 2am. Optimistic and lucky, money comes easily and leaves just as fast, because the pull of now beats the plan for later. Fun at dinner, dangerous in a bull market.</p><span className="line">In the coaching room: "I'll make it back next month."</span></div></article>
<article id="creator" className="tcard"><div className="icon" style={{ fontSize: "44px", color: "#B07400" }}>C</div><div style={{ display: "flex", flexDirection: "column", gap: "10px" }}><span className="tag">Type 6</span><h3>The Creator</h3><p>The Creator wants freedom, meaning and time, and suspects money is a bit grubby. So they under-charge, avoid the business side, and quietly block the wealth that would actually buy the freedom they want. The work is making peace with being paid well for good work.</p><span className="line">In the coaching room: "I didn't get into this for the money."</span></div></article>
<article id="tyrant" className="tcard"><div className="icon" style={{ fontSize: "44px", color: "#B07400" }}>T</div><div style={{ display: "flex", flexDirection: "column", gap: "10px" }}><span className="tag">Type 7</span><h3>The Tyrant</h3><p>A Warrior who went too far. The Tyrant uses money to control: the partner, the children, the staff. Every euro is tracked, every purchase questioned. It looks like strength, but it's fear of losing control, and it costs relationships long before it costs money.</p><span className="line">In the coaching room: usually it's the partner who books the session.</span></div></article>
<article id="magician" className="tcard" style={{ background: "#FAAC15", borderColor: "#FAAC15" }}><div className="icon" style={{ background: "#FFD112", color: "#111111", fontSize: "44px" }}>✦</div><div style={{ display: "flex", flexDirection: "column", gap: "10px" }}><span className="tag" style={{ color: "#111111" }}>The goal</span><h3>The Magician</h3><p style={{ color: "#111111" }}>The Magician knows their money story, where the patterns came from, and chooses differently. Decisions line up with values. Money is a tool, not a threat. There's security without obsession, generosity without martyrdom, ambition without tyranny. Nobody is born one. Everyone can become one.</p><span className="line">In the coaching room: this is where we're heading.</span></div></article>
</div>
</section>
<section style={{ background: "#111111", color: "#ffffff", padding: "96px 0" }}>
<div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center", textAlign: "center" }}>
<h2 className="h2" style={{ color: "#ffffff", maxWidth: "760px" }}>Which two are running your money life?</h2>
<p className="body" style={{ color: "#C9C3B1", maxWidth: "560px" }}>Three minutes, 78 words, instant result. Then, if you want, we talk about what to do with it.</p>
<div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
<a href="/take-money-type-quiz/" className="btn btn-gold">Take the quiz</a>
<a href="/contact-us/" className="btn" style={{ border: "2px solid #ffffff", color: "#ffffff" }}>Book a 10-minute call</a>
</div>
</div>
</section>

      </main>
      <PageFooter divider contactLine={false} note="The Money Types were developed by Deborah L. Price, founder of the Money Coaching Institute, and are used with permission. Descriptions on this page are Luca Caruana's own." />
    </>
  );
}
