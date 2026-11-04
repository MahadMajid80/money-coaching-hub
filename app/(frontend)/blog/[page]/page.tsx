import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogIndex from "@/components/BlogIndex";
import { getPosts } from "@/lib/blog";

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  return { title: `Knowledge Hub – Page ${page}`, alternates: { canonical: `/blog/${page}/` } };
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const n = Number(page);
  const { totalPages } = await getPosts({ limit: 12 });
  if (!Number.isInteger(n) || n < 2 || n > totalPages) notFound();
  return <BlogIndex page={n} />;
}
