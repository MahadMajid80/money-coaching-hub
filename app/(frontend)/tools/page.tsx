import type { Metadata } from "next";
import { PageFooter, PageHeader } from "@/components/chrome";
import { TOOLS } from "@/lib/tools";
import "./tools.css";
import { withShare } from "@/lib/seo";

export const metadata: Metadata = withShare({
  title: "Free Money Tools and Calculators – Money Coaching Hub",
  description: "Free calculators and tools from money coach Luca Caruana: compound interest, the €10,000 Investment House and more. In euros, made for Malta.",
  alternates: { canonical: "/tools/" },
});

export default function Page() {
  return (
    <>
      <PageHeader cta={{ label: "Book a 10-minute call", href: "/contact-us/" }} />
      <main id="main" className="tools-page">
        <section className="tools-hero">
          <div className="wrap">
            <span className="eyebrow">Free money tools</span>
            <h1>Calculators that make money decisions clearer</h1>
            <p className="body tools-lead">Simple, free tools in euros. Play with the numbers, see the picture, then decide what&apos;s right for you.</p>
          </div>
        </section>
        <section className="tools-body">
          <div className="wrap tools-grid">
            {TOOLS.map((t) =>
              t.href ? (
                <a key={t.title} href={t.href} className="tool-card">
                  <span className="tool-card__icon" aria-hidden="true">{t.icon}</span>
                  <span className="tool-card__title">{t.title}</span>
                  <span className="tool-card__text">{t.text}</span>
                  <span className="tool-card__go">Open the tool →</span>
                </a>
              ) : (
                <div key={t.title} className="tool-card tool-card--soon">
                  <span className="tool-card__icon" aria-hidden="true">{t.icon}</span>
                  <span className="tool-card__title">{t.title}</span>
                  <span className="tool-card__text">{t.text}</span>
                  <span className="tool-card__go">Coming soon</span>
                </div>
              ),
            )}
          </div>
        </section>
      </main>
      <PageFooter />
    </>
  );
}
