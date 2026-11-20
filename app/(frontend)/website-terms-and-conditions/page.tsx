import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { withShare } from "@/lib/seo";

export const metadata: Metadata = withShare({
  title: "Website Terms and Conditions",
  alternates: { canonical: "/website-terms-and-conditions/" },
});

export default function Page() {
  return <LegalPage slug="website-terms-and-conditions" fallbackTitle="Website Terms and Conditions" />;
}
