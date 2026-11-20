import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { UnspokenMarks } from "@/components/unspoken/Marks";
import { UK, fraunces } from "@/components/unspoken/brand";

// Where the one-tap answers in an Unspoken letter land. MailerLite counts which answer each reader tapped;
// this page just says thank you.
export const metadata: Metadata = {
  title: "Thank you | Unspoken",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <SiteHeader />
      <main id="main" className={`uk ${fraunces.variable}`} style={{ background: UK.night, color: UK.cream, minHeight: "70vh", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", padding: "96px 24px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "24px", alignItems: "flex-start" }}>
          <UnspokenMarks height={30} />
          <h1 className="uk-display uk-hero-h" style={{ fontSize: "56px", lineHeight: 1.05, color: UK.cream }}>
            Thank you for <span className="uk-gold">answering</span>.
          </h1>
          <p style={{ margin: 0, fontSize: "19px", lineHeight: 1.7, color: UK.mistLight }}>
            Your tap is counted. It helps me understand which stories feel close to home, and which ones to tell next.
          </p>
          <p style={{ margin: 0, fontSize: "19px", lineHeight: 1.7, color: UK.mistLight }}>
            If you ever want to say more, just hit reply on the letter. I read every one, and it stays between us.
          </p>
          <a href="/unspoken/" className="uk-btn" style={{ marginTop: "8px" }}>
            Read the past letters
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
