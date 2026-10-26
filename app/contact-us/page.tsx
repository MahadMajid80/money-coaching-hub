import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import { Check, Crumbs } from "@/components/ui";
import { EMAIL, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact – Book a Chat with Luca",
  description:
    "Book a free 10-minute call with Certified Money Coach Luca Caruana. Based in Malta (EU), coaching clients all over the world via Google Meet.",
  alternates: { canonical: "/contact-us/" },
};

export default function ContactPage() {
  return (
    <div className="frame">
      <section className="row row--first">
        <div className="pad split split--top page-hero__inner">
          <div className="page-hero__text">
            <Crumbs items={[{ label: "Contact" }]} />
            <p className="mono mono--gold">Book a chat with me</p>
            <h1 className="page-hero__title">Want your money working as hard as you do?</h1>
            <div className="page-hero__lead">
              <p>Let me show you how. Based in Malta (the EU), working with clients all over the world via Google Meet.</p>
            </div>
            <ul className="points" style={{ marginTop: 32 }}>
              {[
                "Start with a free 10-minute call to see if we're the right fit",
                "Sessions in person in Malta, or online from anywhere",
                "No products sold, no commission, no pressure",
              ].map((t) => (
                <li key={t}>
                  <span className="check">
                    <Check size={13} stroke={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="card card--soft" style={{ marginTop: 36 }}>
              <p className="mono">Prefer email?</p>
              <p style={{ marginTop: 8, fontSize: 18, color: "var(--ink)" }}>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </p>
              <p>
                {socials.map((s, i) => (
                  <span key={s.label}>
                    {i > 0 && " · "}
                    <a href={s.href} target="_blank" rel="noopener">
                      {s.label}
                    </a>
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="card" style={{ flex: "1 1 460px", padding: 32, boxShadow: "0 20px 40px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 20 }}>Send me a message</h2>
            <Suspense>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
