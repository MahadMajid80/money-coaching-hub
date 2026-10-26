import { Crumbs } from "@/components/ui";
import { wpPage } from "@/lib/blog";
import { EMAIL } from "@/lib/site";

export default function LegalPage({ slug, fallbackTitle }: { slug: string; fallbackTitle: string }) {
  const page = wpPage(slug);
  return (
    <div className="frame">
      <article className="row row--first">
        <div className="pad">
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <Crumbs items={[{ label: page?.title || fallbackTitle }]} />
            <h1 className="article-title">{page?.title || fallbackTitle}</h1>
            {page?.modified && (
              <p className="mono" style={{ marginTop: 14 }}>
                Last updated {new Date(page.modified).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            )}
          </div>
          {page ? (
            <div className="prose" style={{ marginTop: 40 }} dangerouslySetInnerHTML={{ __html: page.html }} />
          ) : (
            <div className="prose" style={{ marginTop: 40 }}>
              <p>
                This page is being updated. For any questions, please email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              </p>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
