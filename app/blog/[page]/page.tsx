import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogIndex from "@/components/BlogIndex";
import { pageCount } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  const n = pageCount();
  const pages = Array.from({ length: Math.max(0, n - 1) }, (_, i) => ({ page: String(i + 2) }));
  return pages.length ? pages : [{ page: "2" }];
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  return { title: `Knowledge Hub – Page ${page}`, alternates: { canonical: `/blog/${page}/` } };
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const n = Number(page);
  if (!Number.isInteger(n) || n < 2 || n > pageCount()) notFound();
  return <BlogIndex page={n} />;
}
