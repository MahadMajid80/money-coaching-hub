import type { Metadata } from "next";
import CourseLayout from "@/components/CourseLayout";
import { getCourse } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Technical Analysis Bootcamp",
  description: "Two live 2-hour sessions on reading charts with clarity: support and resistance, candlesticks, moving averages and Fibonacci. Limited to 15 people.",
  alternates: { canonical: "/technical-analysis-bootcamp/" },
};

export default function Page() {
  return <CourseLayout c={getCourse("technical-analysis-bootcamp")} />;
}
