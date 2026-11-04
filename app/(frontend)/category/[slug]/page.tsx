import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogShell, PostGrid } from "@/components/BlogIndex";
import { categoryName, getCategories, getPosts } from "@/lib/blog";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = categoryName(slug, await getCategories());
  return { title: `${name} – Articles`, description: `Articles on ${name.toLowerCase()} from Certified Money Coach Luca Caruana.`, alternates: { canonical: `/category/${slug}/` } };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cats = await getCategories();
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) notFound();
  const { items } = await getPosts({ category: slug, limit: 100 });
  return (
    <BlogShell eyebrow="Knowledge hub" title={cat.name} lead={cat.description || `${items.length} article${items.length === 1 ? "" : "s"} on ${cat.name.toLowerCase()}.`} current={slug}>
      {items.length ? <PostGrid items={items} /> : <p className="body" style={{ textAlign: "center" }}>Articles are on their way.</p>}
    </BlogShell>
  );
}
