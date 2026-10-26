import type { MetadataRoute } from "next";
import { categories, pageCount, posts } from "@/lib/blog";
import { courses } from "@/lib/courses";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixed: [string, number][] = [
    ["/", 1],
    ["/money-coaching-mindset-budgeting/", 0.7],
    ["/luca/", 0.7],
    ["/services/", 0.9],
    ["/services/one-time-session/", 0.8],
    ["/services/individual-coaching/", 0.8],
    ["/services/couples-coaching/", 0.8],
    ["/services/financial-workshops/", 0.8],
    ["/portfolio-management/", 0.7],
    ["/take-money-type-quiz/", 0.7],
    ["/the-8-money-archetypes/", 0.6],
    ["/blog/", 0.8],
    ["/contact-us/", 0.7],
    ["/privacy-policy/", 0.2],
    ["/cookie-policy/", 0.2],
    ["/website-terms-and-conditions/", 0.2],
  ];
  return [
    ...fixed.map(([p, priority]) => ({ url: `${SITE_URL}${p}`, lastModified: now, priority })),
    ...courses.map((c) => ({ url: `${SITE_URL}/${c.slug}/`, lastModified: now, priority: c.status === "open" ? 0.9 : 0.6 })),
    ...Array.from({ length: pageCount() - 1 }, (_, i) => ({ url: `${SITE_URL}/blog/${i + 2}/`, lastModified: now, priority: 0.3 })),
    ...categories.map((c) => ({ url: `${SITE_URL}/category/${c.slug}/`, lastModified: now, priority: 0.5 })),
    ...posts.map((p) => ({ url: `${SITE_URL}${p.path}`, lastModified: new Date(p.modified), priority: 0.6 })),
  ];
}
