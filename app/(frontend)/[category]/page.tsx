import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound, redirect } from "next/navigation";
import CourseLayout from "@/components/CourseLayout";
import LegalPage from "@/components/LegalPage";
import { courseMetadata } from "@/lib/cms/courseMeta";
import { findRedirect, getCourse, getSimplePage } from "@/lib/cms/data";
import { mediaUrl } from "@/lib/cms/payload";

type Params = { params: Promise<{ category: string }> };

/** Any single-level address that isn't a built-in page: a Simple page or new course from the dashboard, a redirect, or 404. */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category: slug } = await params;
  const page = await getSimplePage(slug, (await draftMode()).isEnabled);
  if (!page) return (await getCourse(slug)) ? courseMetadata(slug) : {};
  const image = mediaUrl(page.meta?.image, "large");
  return {
    title: page.meta?.title ? { absolute: page.meta.title } : page.title,
    description: page.meta?.description || page.intro || undefined,
    alternates: { canonical: `/${slug}/` },
    openGraph: image ? { images: [{ url: image }] } : undefined,
  };
}

export default async function SimplePage({ params }: Params) {
  const { category: slug } = await params;
  const page = await getSimplePage(slug, (await draftMode()).isEnabled);
  if (!page && (await getCourse(slug))) return <CourseLayout slug={slug} />;
  if (!page) {
    const to = await findRedirect(`/${slug}/`);
    if (to) redirect(to);
    notFound();
  }
  return <LegalPage slug={slug} fallbackTitle={page.title} page={page} />;
}
