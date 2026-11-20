import type { ReactNode } from "react";
import { PageFooter, PageHeader } from "@/components/chrome";

export type Faq = { q: string; a: string };

/** Shared layout for every calculator page: hero, the tool, an explainer, FAQs (with FAQ markup), one call to action. */
export default function ToolPage({ title, lead, tool, explain, faq, cta }: {
  title: string; lead: string; tool: ReactNode; explain: ReactNode; faq: Faq[];
  cta: { title: string; text: string; href: string; button: string };
}) {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <PageHeader cta={{ label: "Book a 10-minute call", href: "/contact-us/" }} />
      <main id="main" className="tools-page">
        <section className="tools-hero">
          <div className="wrap">
            <a href="/tools/" className="tools-crumb">← Free money tools</a>
            <span className="eyebrow">Free tool</span>
            <h1>{title}</h1>
            <p className="body tools-lead">{lead}</p>
          </div>
        </section>
        <section className="tools-body">
          <div className="wrap">{tool}</div>
        </section>
        <section className="tools-explain">
          <div className="wrap tools-narrow">
            {explain}
            <h2 className="h2" style={{ marginTop: "48px" }}>Frequently asked questions</h2>
            <div>
              {faq.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <div className="answer">{f.a}</div>
                </details>
              ))}
            </div>
            <div className="tools-cta">
              <div>
                <strong>{cta.title}</strong>
                <span>{cta.text}</span>
              </div>
              <a href={cta.href} className="btn btn-dark">{cta.button}</a>
            </div>
            <p className="compliance">This calculator is for education only and is not financial advice. Luca Caruana is a Certified Money Coach (CMC®). Money Coaching Hub does not sell financial products.</p>
          </div>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PageFooter />
    </>
  );
}
