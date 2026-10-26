import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostGrid } from "@/components/PostCard";
import { CtaBand, PageHero } from "@/components/ui";
import { categories, posts } from "@/lib/blog";

export const dynamicParams = false;

const ALL = ["investment-coaching", "family-budgeting", "money-mindset", "smart-financial-choices", "employee-financial-wellness"];

export function generateStaticParams() {
  const slugs = new Set([...ALL, ...categories.map((c) => c.slug)]);
  return [...slugs].map((slug) => ({ slug }));
}

const nameOf = (slug: string) => categories.find((c) => c.slug === slug)?.name || slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = nameOf(slug);
  return {
    title: `${name} – Articles`,
    description: `Articles on ${name.toLowerCase()} from Certified Money Coach Luca Caruana at Money Coaching Hub.`,
    alternates: { canonical: `/category/${slug}/` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const items = posts.filter((p) => p.categories.includes(slug));
  if (!items.length && posts.length) notFound();
  const name = nameOf(slug);
  const cat = categories.find((c) => c.slug === slug);

  return (
    <div className="frame">
      <PageHero
        crumbs={[{ label: "Knowledge Hub", href: "/blog/" }, { label: name }]}
        eyebrow="Knowledge Hub"
        title={name}
        lead={<p>{cat?.description || `${items.length} article${items.length === 1 ? "" : "s"} on ${name.toLowerCase()}.`}</p>}
      />
      <section className="row">
        <ul className="chips" style={{ paddingTop: 32 }}>
          <li>
            <Link href="/blog/">All articles</Link>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/category/${c.slug}/`} aria-current={c.slug === slug ? "page" : undefined}>
                {c.name} ({c.count})
              </Link>
            </li>
          ))}
        </ul>
        {items.length ? <PostGrid items={items} /> : <p className="pad center lead">Articles are on their way.</p>}
      </section>
      <CtaBand />
    </div>
  );
}
