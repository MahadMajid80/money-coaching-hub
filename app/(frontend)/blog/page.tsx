import type { Metadata } from "next";
import BlogIndex from "@/components/BlogIndex";

export const metadata: Metadata = {
  title: "Knowledge Hub – Money Coaching Blog",
  description: "Practical articles on investing, family budgeting, money mindset and smarter financial choices from Certified Money Coach Luca Caruana.",
  alternates: { canonical: "/blog/" },
};

export default function Page() {
  return <BlogIndex page={1} />;
}
