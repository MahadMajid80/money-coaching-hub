import type { Metadata } from "next";
import { pageContent } from "@/lib/cms/pageContent";
import IntroView from "../side-hustle/IntroView";
import "../side-hustle/side-hustle.css";
import { withShare } from "@/lib/seo";

// Hidden early-access page for the Side Hustle waitlist.
// Not in the menu, not in the sitemap, and noindex: only people with the link can find it.
// Text and photos follow the Side Hustle page in the dashboard (Pages → Side hustle page → Intro sections).

// Stripe payment link: €25 incl. VAT, stops automatically after 20 bookings.
// Until the link is in, the button goes to the contact page.
const STRIPE_LINK: string = "https://buy.stripe.com/5kQ3cv9Lq6M36g4b7I5os0k";
const EARLY_CHECKOUT = STRIPE_LINK || "/contact-us/?subject=Side%20Hustle%20intro%20(waitlist)";

export const metadata: Metadata = withShare({
  title: "Side Hustle intro: early access",
  description: "Early access to the Side Hustle intro session for the waitlist.",
  alternates: { canonical: "/side-hustle-early/" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
});

function Banner() {
  return (
    <div style={{ background: "#111111", color: "#FFFFFF" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "14px clamp(20px,4vw,40px)",
          boxSizing: "border-box",
          display: "flex",
          flexWrap: "wrap",
          gap: "6px 14px",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontSize: "16px",
          lineHeight: "1.4",
        }}
      >
        <span aria-hidden="true" style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FAAC15", flex: "0 0 auto" }} />
        <strong style={{ fontFamily: "Raleway,'Trebuchet MS',sans-serif", color: "#FFD112" }}>Waitlist early access</strong>
        <span>Your €25 place is held until Monday 30 November. Only 20 places at this price, then it goes up to €35.</span>
      </div>
    </div>
  );
}

export default async function Page() {
  const c = await pageContent("side-hustle");
  return (
    <div className="sh-page">
      <IntroView c={c} checkout={EARLY_CHECKOUT} banner={<Banner />} />
    </div>
  );
}
