import type { Metadata } from "next";
import CourseLayout from "@/components/CourseLayout";
import { getCourse } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Crypto Made Simple – The Online Course",
  description: "A four-week live online course that takes you from crypto confusion to confidence: the basics, wallets, avoiding scams and building your portfolio.",
  alternates: { canonical: "/crypto-made-simple-the-online-course/" },
};

export default function Page() {
  return <CourseLayout c={getCourse("crypto-made-simple-the-online-course")} />;
}
