import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogShell, PostGrid } from "@/components/BlogIndex";
import { categories, categoryName, posts } from "@/lib/blog";

export const dynamicParams = false;

const ALL = ["investment-coaching", "family-budgeting", "money-mindset", "smart-financial-choices", "employee-financial-wellness"];

export function generateStaticParams() {
  return [...new Set([...ALL, ...categories.map((c) => c.slug)])].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = categoryName(slug);
  return { title: `${name} – Articles`, description: `Articles on ${name.toLowerCase()} from Certified Money Coach Luca Caruana.`, alternates: { canonical: `/category/${slug}/` } };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const items = posts.filter((p) => p.categories.includes(slug));
  if (!items.length && posts.length) notFound();
  const cat = categories.find((c) => c.slug === slug);
  return (
    <BlogShell eyebrow="Knowledge hub" title={categoryName(slug)} lead={cat?.description || `${items.length} article${items.length === 1 ? "" : "s"} on ${categoryName(slug).toLowerCase()}.`} current={slug}>
      {items.length ? <PostGrid items={items} /> : <p className="body" style={{ textAlign: "center" }}>Articles are on their way.</p>}
    </BlogShell>
  );
}
