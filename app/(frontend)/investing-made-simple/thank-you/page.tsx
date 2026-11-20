import type { Metadata } from "next";
import { PageFooter, PageHeader } from "@/components/chrome";
import { PurchaseEvent } from "@/components/PurchaseEvent";
import { getCourse } from "@/lib/cms/data";
import { withShare } from "@/lib/seo";

// Where Stripe sends buyers of Investing Made Simple after paying.
// Stripe "After payment" redirect: https://www.moneycoachinghub.com/investing-made-simple/thank-you/?session_id={CHECKOUT_SESSION_ID}
export const metadata: Metadata = withShare({
  title: "You're in",
  description: "Thank you for joining Investing Made Simple.",
  alternates: { canonical: "/investing-made-simple/thank-you/" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
});

const WHATSAPP = "https://wa.me/message/6QZWZO5REG65M1";

export default async function Page() {
  const course = await getCourse("investing-made-simple");
  // The sale value follows the price in the dashboard (Courses → Investing Made Simple → Price), e.g. "€175".
  const value = Number(String(course?.price || "").replace(/[^\d.]/g, "")) || 175;
  return (
    <>
      <PageHeader plain cta={{ label: "← Back to the homepage", href: "/" }} />
      <main id="main" style={{ background: "#FDF7E8" }}>
        <section style={{ padding: "96px 0 120px" }}>
          <div className="wrap" style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ maxWidth: "560px", width: "100%", background: "#ffffff", borderRadius: "24px", padding: "48px 36px", boxSizing: "border-box", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px", boxShadow: "0 18px 40px rgba(17,17,17,.06)" }}>
              <span aria-hidden="true" style={{ width: "64px", height: "64px", borderRadius: "999px", background: "#FAAC15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
              </span>
              <span className="eyebrow">Investing Made Simple</span>
              <h1 style={{ margin: "0", fontSize: "44px", lineHeight: "1.05" }}>You&apos;re in!</h1>
              <p style={{ margin: "0", fontSize: "19px", lineHeight: "1.55", color: "#3A3A3A" }}>Check your email for your joining details.</p>
              <a href={WHATSAPP} target="_blank" rel="noopener" className="btn btn-dark" style={{ marginTop: "8px" }}>
                Questions? Message me on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <PageFooter />
      <PurchaseEvent value={value} itemId="investing-made-simple" itemName="Investing Made Simple" />
    </>
  );
}
