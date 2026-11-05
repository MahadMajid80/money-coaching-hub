import { jsonLd as toJsonLd } from "@/lib/security/sanitize";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { PostGrid } from "@/components/BlogIndex";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { categoryName, findPost, formatDate, getCategories, related } from "@/lib/blog";
import { findRedirect } from "@/lib/cms/data";
import { SITE_URL } from "@/lib/site";

type Params = { params: Promise<{ category: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await findPost(category, slug, (await draftMode()).isEnabled);
  if (!post) return {};
  return {
    title: post.meta?.title ? { absolute: post.meta.title } : post.title,
    description: post.description,
    alternates: { canonical: post.path },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE_URL}${post.path}`,
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: ["Luca Caruana"],
      images: post.meta?.image ? [{ url: post.meta.image }] : post.image ? [{ url: post.image.src, width: post.image.width, height: post.image.height, alt: post.image.alt }] : undefined,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { category, slug } = await params;
  const post = await findPost(category, slug, (await draftMode()).isEnabled);
  if (!post) {
    const to = await findRedirect(`/${category}/${slug}/`);
    if (to) redirect(to);
    notFound();
  }
  const cats = await getCategories();
  const more = await related(post);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.modified,
    image: post.image ? `${SITE_URL}${post.image.src}` : undefined,
    author: { "@type": "Person", name: "Luca Caruana", url: `${SITE_URL}/luca/` },
    publisher: { "@type": "Organization", name: "Money Coaching Hub", logo: { "@type": "ImageObject", url: `${SITE_URL}/img/logo.png` } },
    mainEntityOfPage: `${SITE_URL}${post.path}`,
  };

  return (
    <div className="home" style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }} />
      <SiteHeader />
      <main id="main" style={{ display: "contents" }}>
        <article>
          <section style={{ background: "#FDF7E8", padding: "72px 0 56px" }}>
            <div className="wrap" style={{ maxWidth: "860px", display: "flex", flexDirection: "column", gap: "20px" }}>
              <nav aria-label="Breadcrumb" style={{ fontSize: "14px", color: "#6B6248" }}>
                <a href="/blog/" style={{ color: "#6B6248" }}>Knowledge hub</a> ·{" "}
                <a href={`/category/${post.category}/`} style={{ color: "#6B6248" }}>
                  {categoryName(post.category, cats)}
                </a>
              </nav>
              <h1 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "52px", lineHeight: "1.06", letterSpacing: "-0.02em", margin: "0" }}>{post.title}</h1>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <img src="/img/luca-close.jpg" alt="" style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", display: "block" }} />
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <strong style={{ fontSize: "15px" }}>Luca Caruana</strong>
                  <span style={{ fontSize: "13px", color: "#6B6248" }}>
                    {formatDate(post.date)} · {post.readingTime} min read
                  </span>
                </span>
              </div>
            </div>
          </section>
          {post.image && (
            <div className="wrap" style={{ maxWidth: "1000px", marginTop: "-8px" }}>
              <img src={post.image.src} alt={post.image.alt} style={{ width: "100%", maxHeight: "560px", objectFit: "cover", borderRadius: "20px", display: "block", marginTop: "40px" }} />
            </div>
          )}
          <section style={{ background: "#ffffff", padding: "64px 0 96px" }}>
            <div className="wrap">
              <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
              <aside style={{ maxWidth: "720px", margin: "56px auto 0", display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap", padding: "28px", borderRadius: "20px", background: "#FDF7E8" }}>
                <img src="/img/luca-close.jpg" alt="Luca Caruana" style={{ width: "88px", height: "88px", borderRadius: "50%", objectFit: "cover", display: "block" }} />
                <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span className="eyebrow">About the author</span>
                  <span style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "22px" }}>Luca Caruana</span>
                  <p className="body" style={{ fontSize: "16px" }}>
                    Certified Money Coach (CMC®). Brought money coaching to Malta in 2023, columnist in the Times of Malta. No products, no commissions.
                  </p>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", paddingTop: "6px" }}>
                    <a href="/contact-us/" className="btn btn-gold">Book a 10-minute call</a>
                    <a href="/luca/" className="btn btn-ghost">My story</a>
                  </div>
                </div>
              </aside>
              <p className="compliance" style={{ maxWidth: "720px", margin: "24px auto 0" }}>
                This article is general financial education, not personal financial advice.
              </p>
            </div>
          </section>
        </article>
        <section style={{ background: "#FDF7E8", padding: "96px 0" }}>
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <span className="eyebrow">Keep reading</span>
                <h2 className="h2">Related articles</h2>
              </div>
              <a href="/blog/" style={{ fontWeight: "700", fontSize: "15px" }}>All articles →</a>
            </div>
            <PostGrid items={more} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
