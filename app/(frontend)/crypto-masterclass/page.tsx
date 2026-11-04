import type { Metadata } from "next";
import CourseLayout from "@/components/CourseLayout";
import { courseMetadata } from "@/lib/cms/courseMeta";

const baseMetadata: Metadata = {
  title: "Crypto Masterclass – From Beginner to Smart Investor",
  description: "A free live masterclass on investing in crypto safely: the essentials without jargon, the traps that wreck beginners, and a clear action plan.",
  alternates: { canonical: "/crypto-masterclass/" },
};
export function generateMetadata() {
  return courseMetadata("crypto-masterclass", baseMetadata);
}

export default function Page() {
  return <CourseLayout slug="crypto-masterclass" />;
}
