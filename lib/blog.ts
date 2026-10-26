import fs from "node:fs";
import path from "node:path";
import postsData from "@/content/posts.json";
import categoriesData from "@/content/categories.json";

export type Post = {
  id: number;
  slug: string;
  path: string; // e.g. /investment-coaching/my-post/
  category: string;
  categories: string[];
  title: string;
  date: string;
  modified: string;
  excerpt: string;
  description: string;
  readingTime: number;
  image: { src: string; alt: string; width: number; height: number } | null;
  html: string;
};
export type Category = { slug: string; name: string; description: string; count: number };

export const PER_PAGE = 12;
export const posts = postsData as Post[];
export const categories = categoriesData as Category[];

export const categoryName = (slug: string) =>
  categories.find((c) => c.slug === slug)?.name || slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());

export const pageCount = () => Math.max(1, Math.ceil(posts.length / PER_PAGE));
export const postsOnPage = (n: number) => posts.slice((n - 1) * PER_PAGE, n * PER_PAGE);
export const findPost = (category: string, slug: string) => posts.find((p) => p.path === `/${category}/${slug}/`);

export function related(post: Post, n = 3) {
  const same = posts.filter((p) => p.id !== post.id && p.categories.some((c) => post.categories.includes(c)));
  const rest = posts.filter((p) => p.id !== post.id && !same.includes(p));
  return [...same, ...rest].slice(0, n);
}

export const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

/** WordPress pages imported as JSON (legal pages etc.). */
export function wpPage(slug: string): { slug: string; title: string; modified: string; description: string; html: string } | null {
  const file = path.join(process.cwd(), "content", "pages", `${slug}.json`);
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : null;
}
