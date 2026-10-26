import type { Metadata } from "next";
import CourseLayout from "@/components/CourseLayout";
import { getCourse } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Crypto Masterclass – From Beginner to Smart Investor",
  description: "A free live masterclass on investing in crypto safely: the essentials without jargon, the traps that wreck beginners, and a clear action plan.",
  alternates: { canonical: "/crypto-masterclass/" },
};

export default function Page() {
  return <CourseLayout c={getCourse("crypto-masterclass")} />;
}
