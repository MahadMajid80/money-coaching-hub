import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";


const description =
  "Certified Money Coach Luca helps you get great with money: one-to-one coaching, the Investing Made Simple course and financial wellbeing workshops. Based in Malta, coaching worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL("https://moneycoachinghub.com"),
  title: "Money Coaching Hub – Money Coaching with Luca, Malta",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Money Coaching Hub – Let me help you be great with money",
    description,
    url: "https://moneycoachinghub.com/",
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
        {children}
      </body>
    </html>
  );
}
