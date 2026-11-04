import { SiteFooter, SiteHeader } from "@/components/chrome";
import { categories, categoryName, pageCount, type Post, postsOnPage } from "@/lib/blog";

const monthYear = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric" });

export function PostCard({ p }: { p: Post }) {
  return (
    <a href={p.path} className="post-card">
      <span className="post-card__img">{p.image && <img src={p.image.src} alt={p.image.alt} loading="lazy" />}</span>
      <span className="post-card__meta">
        {categoryName(p.category)} · {monthYear(p.date)} · {p.readingTime} min read
      </span>
      <span className="post-card__title">{p.title}</span>
    </a>
  );
}

export function PostGrid({ items }: { items: Post[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "40px 20px" }}>
      {items.map((p) => (
        <PostCard key={p.id} p={p} />
      ))}
    </div>
  );
}

export function BlogShell({ eyebrow, title, lead, current, children }: { eyebrow: string; title: string; lead: string; current?: string; children: React.ReactNode }) {
  return (
    <div className="home" style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <SiteHeader />
      <main id="main" style={{ display: "contents" }}>
        <section style={{ background: "#FDF7E8", padding: "72px 0" }}>
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "980px", marginLeft: "auto", marginRight: "auto" }}>
            <span className="eyebrow">{eyebrow}</span>
            <h1 style={{ fontFamily: "Raleway,sans-serif", fontWeight: "800", fontSize: "60px", lineHeight: "1.02", letterSpacing: "-0.02em", margin: "0" }}>{title}</h1>
            <p className="body" style={{ fontSize: "20px", maxWidth: "640px" }}>{lead}</p>
            <nav aria-label="Categories" style={{ display: "flex", gap: "10px", flexWrap: "wrap", paddingTop: "8px" }}>
              <a href="/blog/" className="pill-link" aria-current={!current ? "page" : undefined}>All articles</a>
              {categories.map((c) => (
                <a key={c.slug} href={`/category/${c.slug}/`} className="pill-link" aria-current={current === c.slug ? "page" : undefined}>
                  {c.name}
                </a>
              ))}
            </nav>
          </div>
        </section>
        <section style={{ background: "#ffffff", padding: "96px 0" }}>
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "48px" }}>{children}</div>
        </section>
        <section style={{ background: "#FAAC15", padding: "96px 0" }}>
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center", textAlign: "center" }}>
            <h2 className="h2" style={{ fontSize: "48px", maxWidth: "760px" }}>Want your money working as hard as you do?</h2>
            <p className="body" style={{ color: "#111111", maxWidth: "560px" }}>Let me show you how. No products, no commissions, no judgement.</p>
            <a href="/contact-us/" className="btn btn-dark" style={{ minWidth: "280px" }}>Book a 10-minute call</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export default function BlogIndex({ page }: { page: number }) {
  const total = pageCount();
  const items = postsOnPage(page);
  const href = (n: number) => (n === 1 ? "/blog/" : `/blog/${n}/`);
  return (
    <BlogShell eyebrow="Knowledge hub" title={page === 1 ? "Fresh from the blog" : `Fresh from the blog · page ${page}`} lead="Real stories and practical guides on investing, budgeting, money mindset and making smarter financial choices.">
      {items.length ? <PostGrid items={items} /> : <p className="body" style={{ textAlign: "center" }}>Articles are on their way.</p>}
      {total > 1 && (
        <nav className="pager" aria-label="Blog pages">
          {page > 1 && <a href={href(page - 1)}>← Newer</a>}
          {Array.from({ length: total }, (_, i) => i + 1).map((n) =>
            n === page ? (
              <span key={n} aria-current="page">
                {n}
              </span>
            ) : (
              <a key={n} href={href(n)}>
                {n}
              </a>
            )
          )}
          {page < total && <a href={href(page + 1)}>Older →</a>}
        </nav>
      )}
    </BlogShell>
  );
}
