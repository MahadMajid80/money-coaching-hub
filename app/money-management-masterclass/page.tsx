import type { Metadata } from "next";
import CourseLayout from "@/components/CourseLayout";
import { getCourse } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Money Management Masterclass",
  description: "A 90-minute live masterclass, the Intentional Spending Planner and a group accountability call with real coaching on your real numbers. €99.",
  alternates: { canonical: "/money-management-masterclass/" },
};

export default function Page() {
  return <CourseLayout c={getCourse("money-management-masterclass")} />;
}
