import type { Metadata } from "next";
import CourseLayout from "@/components/CourseLayout";
import { getCourse } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Investing Made Simple – Live Online Investing Course",
  description: "Four live evenings on how to invest your own money, taught by Certified Money Coach Luca Caruana. Next cohort starts 11 January 2027. €175.",
  alternates: { canonical: "/investing-made-simple/" },
};

export default function Page() {
  return <CourseLayout c={getCourse("investing-made-simple")} />;
}
