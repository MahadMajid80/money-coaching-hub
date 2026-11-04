import type { Metadata } from "next";
import CourseLayout from "@/components/CourseLayout";
import { courseMetadata } from "@/lib/cms/courseMeta";

const baseMetadata: Metadata = {
  title: "Crypto Made Simple – The Online Course",
  description: "A four-week live online course that takes you from crypto confusion to confidence: the basics, wallets, avoiding scams and building your portfolio.",
  alternates: { canonical: "/crypto-made-simple-the-online-course/" },
};
export function generateMetadata() {
  return courseMetadata("crypto-made-simple-the-online-course", baseMetadata);
}

export default function Page() {
  return <CourseLayout slug="crypto-made-simple-the-online-course" />;
}
