import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const description =
  "Certified Money Coach Luca helps you get great with money: one-to-one coaching, the Investing Made Simple course and financial wellbeing workshops. Based in Malta, coaching worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Money Coaching Hub – Money Coaching with Luca, Malta",
    template: "%s | Money Coaching Hub",
  },
  description,
  openGraph: {
    title: "Money Coaching Hub – Let me help you be great with money",
    description,
    url: `${SITE_URL}/`,
    siteName: "Money Coaching Hub",
    images: [{ url: "/images/money-coach-column.webp", width: 1200, height: 800 }],
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Header />
        <RevealOnScroll />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
