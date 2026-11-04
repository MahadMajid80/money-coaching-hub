import type { Metadata, Viewport } from "next";
import "@fontsource/raleway/600.css";
import "@fontsource/raleway/700.css";
import "@fontsource/raleway/800.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/400-italic.css";
import "@fontsource/lato/700.css";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const description =
  "Luca Caruana, Certified Money Coach in Malta. One-to-one coaching, the Investing Made Simple course and financial wellbeing workshops. No products, no commissions.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Money Coaching Hub – Luca Caruana, Certified Money Coach, Malta",
    template: "%s | Money Coaching Hub",
  },
  description,
  openGraph: {
    title: "Money Coaching Hub – Let me help you be great with money",
    description,
    url: `${SITE_URL}/`,
    siteName: "Money Coaching Hub",
    images: [{ url: "/img/luca-tv.jpg", width: 1200, height: 1600 }],
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
