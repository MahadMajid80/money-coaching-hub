// Header and footer variants from the design pack:
// - SiteHeader / SiteFooter: the homepage's full navigation and footer
// - PageHeader / PageFooter: the inner pages' compact header (logo + one action) and footer

import { EMAIL, socials } from "@/lib/site";

export function SiteHeader() {
  return (
    <header style={{ position: "relative", background: "#ffffff", borderBottom: "1px solid #EFE9D9" }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", height: "84px" }}>
        <a href="/" aria-label="Money Coaching Hub home" style={{ display: "flex", alignItems: "center" }}>
          <img src="/img/logo.png" alt="Money Coaching Hub" style={{ height: "64px", width: "auto" }} />
        </a>
        <nav aria-label="Main" className="site-nav" style={{ display: "flex", gap: "32px", flexWrap: "wrap", fontWeight: "700", fontSize: "15px" }}>
          <a href="/investing-made-simple/" style={{ textDecoration: "none", color: "#111111" }}>Investing Course</a>
          <a href="/services/" style={{ textDecoration: "none", color: "#111111" }}>Coaching</a>
          <a href="/services/financial-workshops/" style={{ textDecoration: "none", color: "#111111" }}>Companies</a>
          <a href="/#column" style={{ textDecoration: "none", color: "#111111" }}>Column</a>
          <a href="/#types" style={{ textDecoration: "none", color: "#111111" }}>Money Types</a>
          <a href="/blog/" style={{ textDecoration: "none", color: "#111111" }}>Blog</a>
        </nav>
        <a href="/contact-us/" className="btn btn-dark" style={{ minHeight: "46px", padding: "0 22px", fontSize: "15px" }}>Book a 10-minute call</a>
      </div>
    </header>
  );
}

export function PageHeader({ cta, plain = false }: { cta: { label: string; href: string }; plain?: boolean }) {
  return (
    <header style={{ background: "#ffffff", borderBottom: "1px solid #EFE9D9" }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", height: "84px" }}>
        <a href="/" aria-label="Money Coaching Hub home" style={{ display: "flex", alignItems: "center" }}>
          <img src="/img/logo.png" alt="Money Coaching Hub" style={{ height: "64px", width: "auto" }} />
        </a>
        {plain ? (
          <a href={cta.href} style={{ fontWeight: "700", fontSize: "15px", textDecoration: "none" }}>{cta.label}</a>
        ) : (
          <a href={cta.href} className="btn btn-dark" style={{ minHeight: "46px", padding: "0 22px", fontSize: "15px" }}>{cta.label}</a>
        )}
      </div>
    </header>
  );
}

const DISCLAIMER =
  "Luca Caruana is a Certified Money Coach (CMC®). Money Coaching Hub provides financial education and coaching. It is not licensed to provide investment advice and does not sell financial products.";

export function PageFooter({ note = DISCLAIMER, contactLine = true, back = true, divider = false }: { note?: React.ReactNode; contactLine?: boolean; back?: boolean; divider?: boolean }) {
  return (
    <footer
      style={{
        background: "#111111",
        color: "#C9C3B1",
        padding: divider ? "0 0 40px" : "40px 0",
        textAlign: "center",
        fontSize: "14px",
        lineHeight: "1.6",
        borderTop: divider ? "1px solid #2A2A2A" : undefined,
      }}
    >
      <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: divider ? "32px" : undefined }}>
        {contactLine && <span>Money Coaching Hub · Malta · {EMAIL}</span>}
        <span>{note}</span>
        <nav aria-label="Legal" style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap", marginTop: "4px" }}>
          <a href="/privacy-policy/" style={{ color: "#C9C3B1", textDecoration: "none" }}>Privacy</a>
          <a href="/cookie-policy/" style={{ color: "#C9C3B1", textDecoration: "none" }}>Cookies</a>
          <a href="/website-terms-and-conditions/" style={{ color: "#C9C3B1", textDecoration: "none" }}>Terms</a>
        </nav>
        {back && (
          <a href="/" style={{ color: "#FFD112", textDecoration: "none", fontWeight: "700", marginTop: "8px" }}>
            ← Back to the homepage
          </a>
        )}
      </div>
    </footer>
  );
}

const link = { color: "#C9C3B1", textDecoration: "none" } as const;

export function SiteFooter() {
  return (
    <footer style={{ background: "#111111", color: "#C9C3B1", padding: "56px 0 32px" }}>
      <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "32px", fontSize: "15px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "18px", color: "#ffffff" }}>MONEY COACHING HUB</span>
            <span>Based in Malta (EU), working with clients all over the world.</span>
            <span>Education, not personalised financial advice.</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ color: "#ffffff", fontWeight: "700" }}>Learn</span>
            <a href="/investing-made-simple/" style={link}>Investing Made Simple</a>
            <a href="/crypto-made-simple-the-online-course/" style={link}>Crypto Made Simple</a>
            <a href="/side-hustle/#notify" style={link}>Side Hustle, Done Right</a>
            <a href="/technical-analysis-bootcamp/" style={link}>Technical Analysis Bootcamp</a>
            <a href="/#column" style={link}>Times of Malta column</a>
            <a href="/take-money-type-quiz/" style={link}>Money Type Quiz</a>
            <a href="/the-8-money-archetypes/" style={link}>The 8 Money Types</a>
            <a href="/portfolio-management/" style={link}>€10,000 Investment House</a>
            <a href="/blog/" style={link}>Blog</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ color: "#ffffff", fontWeight: "700" }}>Coaching</span>
            <a href="/services/#options" style={link}>Individual Coaching</a>
            <a href="/services/#options" style={link}>Couples Coaching</a>
            <a href="/services/#options" style={link}>Single Session</a>
            <a href="/services/financial-workshops/" style={link}>For Companies</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ color: "#ffffff", fontWeight: "700" }}>Connect</span>
            <a href="/contact-us/" style={link}>Book a 10-minute call</a>
            {socials.map((s) => (
              <a key={s.label} href={s.href} style={link} target="_blank" rel="noopener">
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid #2A2A2A", paddingTop: "24px", display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", fontSize: "13px" }}>
          <span>© {new Date().getFullYear()} Money Coaching Hub. All rights reserved.</span>
          <div style={{ display: "flex", gap: "20px" }}>
            <a href="/privacy-policy/" style={link}>Privacy</a>
            <a href="/cookie-policy/" style={link}>Cookies</a>
            <a href="/website-terms-and-conditions/" style={link}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const Tick = ({ stroke = "#111" }: { stroke?: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
