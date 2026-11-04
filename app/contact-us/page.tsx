import type { Metadata } from "next";
import { PageFooter, PageHeader } from "@/components/chrome";
import { CallRequestForm } from "@/components/forms";

export const metadata: Metadata = {
  title: "Book a 10-minute call",
  description: "Free, 10 minutes, no pitch. Tell Luca what's going on with your money and he'll tell you honestly whether coaching, a course or a workshop is the right next step.",
  alternates: { canonical: "/contact-us/" },
};

export default function Page() {
  return (
    <>
      <PageHeader plain cta={{ label: "← Back to the homepage", href: "/" }} />
      <main id="main" style={{ background: "#FDF7E8" }}>
<section style={{ padding: "72px 0 96px" }}>
<div className="wrap" style={{ display: "flex", gap: "56px", flexWrap: "wrap", alignItems: "flex-start" }}>
<div style={{ flex: "1 1 440px", minWidth: "0", display: "flex", flexDirection: "column", gap: "22px" }}>
<span className="eyebrow">Free · 10 minutes · No pitch</span>
<h1 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "56px", lineHeight: "1.02", letterSpacing: "-0.02em", margin: "0" }}>Book a 10-minute call.</h1>
<p className="body" style={{ fontSize: "19px", maxWidth: "520px" }}>Tell me what's going on with your money. I'll tell you honestly whether coaching, a course or a workshop is the right next step, or whether you don't need me at all.</p>
<div style={{ display: "flex", flexDirection: "column", gap: "14px", paddingTop: "8px" }}>
<div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span className="body" style={{ fontSize: "17px" }}>Tell me when suits you. The call is on Google Meet, or by phone if you prefer.</span></div>
<div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span className="body" style={{ fontSize: "17px" }}>Nothing to prepare. You don't need numbers in front of you.</span></div>
<div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}><span className="tick"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></span><span className="body" style={{ fontSize: "17px" }}>If coaching fits, I'll tell you the price on the call. If it doesn't, I'll say so.</span></div>
</div>
<div style={{ display: "flex", alignItems: "center", gap: "16px", paddingTop: "16px" }}>
<img src="/images/reviews/lorraine-sammut.webp" alt="" style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover" }} />
<span style={{ fontSize: "15px", color: "#3A3A3A" }}>"Just 2 months later I'm already seeing the improvement on paper and mentally." <span style={{ color: "#6B6248" }}>Lorraine Sammut</span></span>
</div>
</div>
<div style={{ flex: "0 1 480px", minWidth: "300px", background: "#ffffff", borderRadius: "24px", padding: "32px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "16px", border: "1px solid #E6E0D0" }}>
<span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "700", fontSize: "20px" }}>Request your call</span>
<CallRequestForm />
<span style={{ fontSize: "13px", color: "#6B6248", textAlign: "center" }}>Prefer email? <a href="mailto:info@moneycoachinghub.com">info@moneycoachinghub.com</a></span>
</div>
</div>
</section>

      </main>
      <PageFooter back={false} />
    </>
  );
}
