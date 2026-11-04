import { draftMode } from "next/headers";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { getSettings, getSimplePage } from "@/lib/cms/data";

type Doc = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

export function simpleHtml(page: Doc | null): string {
  if (!page) return "";
  const has = page.content?.root?.children?.some((n: Doc) => (n.children?.length ?? 0) > 0 || n.type !== "paragraph");
  return has ? convertLexicalToHTML({ data: page.content, disableContainer: true }) : page.legacyHtml || "";
}

/** A text page from the dashboard's "Simple pages" (privacy, cookies, terms, or any page Luca adds). */
export default async function LegalPage({ slug, fallbackTitle, page: given }: { slug: string; fallbackTitle: string; page?: Doc | null }) {
  const page = given !== undefined ? given : await getSimplePage(slug, (await draftMode()).isEnabled);
  const { email } = await getSettings();
  const html = simpleHtml(page);
  return (
    <div className="home" style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <SiteHeader />
      <main id="main" style={{ display: "contents" }}>
        <section style={{ background: "#FDF7E8", padding: "72px 0" }}>
          <div className="wrap" style={{ maxWidth: "860px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {(page?.eyebrow ?? "Legal") && <span className="eyebrow">{page?.eyebrow ?? "Legal"}</span>}
            <h1 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "56px", lineHeight: "1.04", letterSpacing: "-0.02em", margin: "0" }}>{page?.title || fallbackTitle}</h1>
            {page?.intro && <p className="body" style={{ fontSize: "20px" }}>{page.intro}</p>}
            {page?.updatedAt && (
              <span style={{ fontSize: "14px", color: "#6B6248" }}>
                Last updated {new Date(page.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            )}
          </div>
        </section>
        <section style={{ background: "#ffffff", padding: "72px 0 96px" }}>
          <div className="wrap">
            {html ? (
              <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
              <div className="prose">
                <p>
                  This page is being updated. For any questions, please email <a href={`mailto:${email}`}>{email}</a>.
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
