import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostGrid } from "@/components/PostCard";
import { Crumbs } from "@/components/ui";
import { categoryName, findPost, formatDate, posts, related } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => {
    const [category, slug] = p.path.split("/").filter(Boolean);
    return { category, slug };
  });
}

type Params = { params: Promise<{ category: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category, slug } = await params;
  const post = findPost(category, slug);
  if (!post) return {};
  return {
    title: post.title,
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
      images: post.image ? [{ url: post.image.src, width: post.image.width, height: post.image.height, alt: post.image.alt }] : undefined,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { category, slug } = await params;
  const post = findPost(category, slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.modified,
    image: post.image ? `${SITE_URL}${post.image.src}` : undefined,
    author: { "@type": "Person", name: "Luca Caruana", url: `${SITE_URL}/luca/` },
    publisher: { "@type": "Organization", name: "Money Coaching Hub", logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.webp` } },
    mainEntityOfPage: `${SITE_URL}${post.path}`,
  };

  return (
    <div className="frame">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <header className="row row--first article-head">
          <div className="pad">
            <Crumbs items={[{ label: "Knowledge Hub", href: "/blog/" }, { label: categoryName(post.category), href: `/category/${post.category}/` }]} />
            <p className="mono mono--gold">
              {categoryName(post.category)} · {formatDate(post.date)} · {post.readingTime} min read
            </p>
            <h1 className="article-title">{post.title}</h1>
            <div className="article-byline">
              <Image src="/images/luca.webp" alt="" width={48} height={48} className="avatar avatar--lg article-byline__img" />
              <span>
                <strong>Luca Caruana</strong>
                <small>Certified Money Coach (CMC®)</small>
              </span>
            </div>
          </div>
          {post.image && (
            <div className="article-cover">
              <Image src={post.image.src} alt={post.image.alt} width={post.image.width} height={post.image.height} priority sizes="(max-width: 900px) 100vw, 1000px" />
            </div>
          )}
        </header>

        <div className="row">
          <div className="pad">
            <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

            <aside className="author-box">
              <Image src="/images/luca.webp" alt="Luca Caruana" width={360} height={515} className="author-box__img" />
              <div>
                <p className="mono mono--gold">About the author</p>
                <h2>Luca Caruana</h2>
                <p>
                  Certified Money Coach (CMC®) and founder of Money Coaching Hub. Luca has coached 300+ clients one-on-one, trained 1,000+ people in
                  workshops, and answers readers&apos; money stories in his Times of Malta column. He doesn&apos;t sell financial products: he helps
                  people understand their money.
                </p>
                <div className="btn-row" style={{ marginTop: 16 }}>
                  <Link href="/contact-us/" className="btn btn--dark">
                    Book a free 10-minute call
                  </Link>
                  <Link href="/luca/" className="btn btn--line">
                    More about Luca
                  </Link>
                </div>
              </div>
            </aside>
            <p className="article-disclaimer">This article is general financial education, not personal financial advice.</p>
          </div>
        </div>
      </article>

      <section className="row">
        <div className="pad pad--tight-bottom section-head">
          <div className="section-head__text">
            <p className="mono">Keep reading</p>
            <h2 className="h2">Related articles</h2>
          </div>
          <Link href="/blog/" className="link">
            All articles →
          </Link>
        </div>
        <PostGrid items={related(post)} />
      </section>
    </div>
  );
}
