import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { withShare } from "@/lib/seo";

export const metadata: Metadata = withShare({
  title: "Privacy Policy",
  alternates: { canonical: "/privacy-policy/" },
});

export default function Page() {
  return <LegalPage slug="privacy-policy" fallbackTitle="Privacy Policy" />;
}
