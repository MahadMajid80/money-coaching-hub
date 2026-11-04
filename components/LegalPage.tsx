import { SiteFooter, SiteHeader } from "@/components/chrome";
import { wpPage } from "@/lib/blog";
import { EMAIL } from "@/lib/site";

export default function LegalPage({ slug, fallbackTitle }: { slug: string; fallbackTitle: string }) {
  const page = wpPage(slug);
  return (
    <div className="home" style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <SiteHeader />
      <main id="main" style={{ display: "contents" }}>
        <section style={{ background: "#FDF7E8", padding: "72px 0" }}>
          <div className="wrap" style={{ maxWidth: "860px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <span className="eyebrow">Legal</span>
            <h1 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "56px", lineHeight: "1.04", letterSpacing: "-0.02em", margin: "0" }}>{page?.title || fallbackTitle}</h1>
            {page?.modified && (
              <span style={{ fontSize: "14px", color: "#6B6248" }}>
                Last updated {new Date(page.modified).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            )}
          </div>
        </section>
        <section style={{ background: "#ffffff", padding: "72px 0 96px" }}>
          <div className="wrap">
            {page ? (
              <div className="prose" dangerouslySetInnerHTML={{ __html: page.html }} />
            ) : (
              <div className="prose">
                <p>
                  This page is being updated. For any questions, please email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
