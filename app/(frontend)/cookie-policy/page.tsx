import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { withShare } from "@/lib/seo";

export const metadata: Metadata = withShare({
  title: "Cookie Policy",
  alternates: { canonical: "/cookie-policy/" },
});

export default function Page() {
  return <LegalPage slug="cookie-policy" fallbackTitle="Cookie Policy" />;
}
