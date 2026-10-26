import Link from "next/link";
import { PostGrid } from "@/components/PostCard";
import { CtaBand, PageHero } from "@/components/ui";
import { categories, pageCount, postsOnPage } from "@/lib/blog";

export default function BlogIndex({ page }: { page: number }) {
  const total = pageCount();
  const items = postsOnPage(page);
  const href = (n: number) => (n === 1 ? "/blog/" : `/blog/${n}/`);

  return (
    <div className="frame">
      <PageHero
        crumbs={page === 1 ? [{ label: "Knowledge Hub" }] : [{ label: "Knowledge Hub", href: "/blog/" }, { label: `Page ${page}` }]}
        eyebrow="Knowledge Hub"
        title={
          <>
            Fresh from the <span className="mark">blog</span>
          </>
        }
        lead={<p>Real stories and practical guides on investing, budgeting, money mindset and making smarter financial choices.</p>}
      />
      <section className="row">
        <ul className="chips" style={{ paddingTop: 32 }}>
          <li>
            <Link href="/blog/" aria-current="page">
              All articles
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/category/${c.slug}/`}>
                {c.name} ({c.count})
              </Link>
            </li>
          ))}
        </ul>
        {items.length ? (
          <PostGrid items={items} />
        ) : (
          <p className="pad center lead" style={{ marginTop: 0 }}>
            Articles are on their way.
          </p>
        )}
        {total > 1 && (
          <nav className="pager" aria-label="Blog pages">
            {page > 1 && <Link href={href(page - 1)}>← Newer</Link>}
            {Array.from({ length: total }, (_, i) => i + 1).map((n) =>
              n === page ? (
                <span key={n} aria-current="page">
                  {n}
                </span>
              ) : (
                <Link key={n} href={href(n)}>
                  {n}
                </Link>
              )
            )}
            {page < total && <Link href={href(page + 1)}>Older →</Link>}
          </nav>
        )}
      </section>
      <CtaBand />
    </div>
  );
}
