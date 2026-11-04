import { SiteFooter, SiteHeader } from "@/components/chrome";

export default function NotFound() {
  return (
    <div className="home" style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <SiteHeader />
      <main id="main" style={{ display: "contents" }}>
        <section style={{ background: "#FDF7E8", padding: "120px 0" }}>
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center", textAlign: "center" }}>
            <span className="eyebrow">Error 404</span>
            <h1 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "60px", lineHeight: "1.02", letterSpacing: "-0.02em", margin: "0", maxWidth: "760px" }}>
              This page has gone <span style={{ color: "#FAAC15" }}>missing</span>.
            </h1>
            <p className="body" style={{ fontSize: "20px", maxWidth: "560px" }}>It may have moved when we rebuilt the site. Try one of these instead.</p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
              <a href="/" className="btn btn-gold">Homepage</a>
              <a href="/blog/" className="btn btn-ghost">Knowledge hub</a>
              <a href="/contact-us/" className="btn btn-ghost">Book a 10-minute call</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
