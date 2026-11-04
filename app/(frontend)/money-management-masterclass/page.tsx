import type { Metadata } from "next";
import CourseLayout from "@/components/CourseLayout";
import { courseMetadata } from "@/lib/cms/courseMeta";

const baseMetadata: Metadata = {
  title: "Money Management Masterclass",
  description: "A 90-minute live masterclass, the Intentional Spending Planner and a group accountability call with real coaching on your real numbers. €99.",
  alternates: { canonical: "/money-management-masterclass/" },
};
export function generateMetadata() {
  return courseMetadata("money-management-masterclass", baseMetadata);
}

export default function Page() {
  return <CourseLayout slug="money-management-masterclass" />;
}
