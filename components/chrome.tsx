// Header and footer variants from the design pack, filled from the dashboard's Site settings:
// - SiteHeader / SiteFooter: the homepage's full navigation and footer
// - PageHeader: the same header with the page's own button; PageFooter: the inner pages' footer

import { getSettings, type Link } from "@/lib/cms/data";

const ext = (l: Link) => (l.newTab ? { target: "_blank", rel: "noopener" } : {});

async function Announcement() {
  const { announcement: a } = await getSettings();
  if (!a.enabled) return null;
  const dark = a.style === "dark";
  return (
    <div style={{ background: dark ? "#111111" : "#FAAC15", color: dark ? "#ffffff" : "#111111", fontSize: "14px", fontWeight: 700, textAlign: "center", padding: "10px 16px" }}>
      {a.text}
      {a.url && (
        <>
          {" "}
          <a href={a.url} style={{ color: dark ? "#FFD112" : "#111111", textDecoration: "underline" }}>
            {a.linkLabel || "Find out more"} →
          </a>
        </>
      )}
    </div>
  );
}

/**
 * The header on every page: logo, the main menu from Site settings and one button.
 * Pages can swap the button for their own action (e.g. “Apply for January”); `plain` shows it as a text link.
 * On phones the menu folds into a “Menu” button (no script needed).
 */
export async function SiteHeader({ cta, plain = false }: { cta?: { label: string; href: string }; plain?: boolean } = {}) {
  const s = await getSettings();
  const action = cta ?? { label: s.headerCta.label, href: s.headerCta.url };
  return (
    <>
      <Announcement />
      <header className="site-header" style={{ position: "relative", background: "#ffffff", borderBottom: "1px solid #EFE9D9", zIndex: 50 }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", height: "84px" }}>
          <a href="/" aria-label="Money Coaching Hub home" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <img src={s.logo} alt="Money Coaching Hub" style={{ height: "64px", width: "auto" }} />
          </a>
          <nav aria-label="Main" className="site-nav" style={{ display: "flex", gap: "28px", flexWrap: "wrap", justifyContent: "center", fontWeight: "700", fontSize: "15px" }}>
            {s.nav.map((l) => (
              <a key={l.label + l.url} href={l.url} style={{ textDecoration: "none", color: "#111111" }} {...ext(l)}>
                {l.label}
              </a>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            {plain ? (
              <a href={action.href} className="site-cta" style={{ fontWeight: "700", fontSize: "15px", textDecoration: "none", color: "#111111" }}>
                {action.label}
              </a>
            ) : (
              <a href={action.href} className="btn btn-dark site-cta" style={{ minHeight: "46px", padding: "0 22px", fontSize: "15px" }}>
                {action.label}
              </a>
            )}
            <details className="mnav">
              <summary aria-label="Open the menu">
                <span aria-hidden="true" className="mnav-bars" />
                Menu
              </summary>
              <nav aria-label="Main" className="mnav-panel">
                {s.nav.map((l) => (
                  <a key={l.label + l.url} href={l.url} {...ext(l)}>
                    {l.label}
                  </a>
                ))}
                {!plain && (
                  <a href={action.href} className="btn btn-dark" style={{ marginTop: "16px" }}>
                    {action.label}
                  </a>
                )}
              </nav>
            </details>
          </div>
        </div>
      </header>
    </>
  );
}

/** Kept for the inner pages: the same full header, with the page's own button. */
export async function PageHeader({ cta, plain = false }: { cta: { label: string; href: string }; plain?: boolean }) {
  return <SiteHeader cta={cta} plain={plain} />;
}

export async function PageFooter({ note, contactLine = true, back = true, divider = false }: { note?: React.ReactNode; contactLine?: boolean; back?: boolean; divider?: boolean }) {
  const s = await getSettings();
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
        {contactLine && (
          <span>
            Money Coaching Hub · {s.location} · {s.email}
            {s.phone ? ` · ${s.phone}` : ""}
          </span>
        )}
        <span>{note ?? s.disclaimer}</span>
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

const FALLBACK_COLUMNS = [
  {
    title: "Learn",
    links: [
      { label: "Investing Made Simple", url: "/investing-made-simple/" },
      { label: "Crypto Made Simple", url: "/crypto-made-simple-the-online-course/" },
      { label: "Side Hustle, Done Right", url: "/side-hustle/#notify" },
      { label: "Technical Analysis Bootcamp", url: "/technical-analysis-bootcamp/" },
      { label: "Times of Malta column", url: "/#column" },
      { label: "Money Type Quiz", url: "/take-money-type-quiz/" },
      { label: "The 8 Money Types", url: "/the-8-money-archetypes/" },
      { label: "€10,000 Investment House", url: "/portfolio-management/" },
      { label: "Blog", url: "/blog/" },
    ],
  },
  {
    title: "Coaching",
    links: [
      { label: "Individual Coaching", url: "/services/#options" },
      { label: "Couples Coaching", url: "/services/#options" },
      { label: "Single Session", url: "/services/#options" },
      { label: "For Companies", url: "/services/financial-workshops/" },
    ],
  },
  { title: "Connect", links: [{ label: "Book a 10-minute call", url: "/contact-us/" }] },
] as { title: string; links: Link[] }[];

export async function SiteFooter() {
  const s = await getSettings();
  const cols = s.footerColumns.length ? s.footerColumns : FALLBACK_COLUMNS;
  return (
    <footer style={{ background: "#111111", color: "#C9C3B1", padding: "56px 0 32px" }}>
      <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${cols.length + 1}, minmax(0, 1fr))`, gap: "32px", fontSize: "15px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "18px", color: "#ffffff" }}>{s.footerBrand}</span>
            {s.footerTagline.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
          {cols.map((c, i) => (
            <div key={c.title} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ color: "#ffffff", fontWeight: "700" }}>{c.title}</span>
              {c.links.map((l) => (
                <a key={l.label + l.url} href={l.url} style={link} {...ext(l)}>
                  {l.label}
                </a>
              ))}
              {i === cols.length - 1 &&
                s.socials.map((l) => (
                  <a key={l.label} href={l.url} style={link} target="_blank" rel="noopener">
                    {l.label}
                  </a>
                ))}
            </div>
          ))}
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
