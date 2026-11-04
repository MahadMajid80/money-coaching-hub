import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@fontsource/raleway/600.css";
import "@fontsource/raleway/700.css";
import "@fontsource/raleway/800.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/400-italic.css";
import "@fontsource/lato/700.css";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import { getSettings } from "@/lib/cms/data";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Content comes from the dashboard, so pages are rendered fresh on each visit.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  const image = s.shareImage || "/img/luca-tv.jpg";
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: s.seoTitle, template: "%s | Money Coaching Hub" },
    description: s.seoDescription,
    openGraph: {
      title: s.seoTitle,
      description: s.seoDescription,
      url: `${SITE_URL}/`,
      siteName: "Money Coaching Hub",
      images: [{ url: image }],
      locale: "en_GB",
      type: "website",
    },
    twitter: { card: "summary_large_image" },
    icons: { icon: "/icon.png", apple: "/apple-icon.png" },
    verification: s.searchConsole ? { google: s.searchConsole } : undefined,
  };
}

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings();
  const ga = /^G-[A-Z0-9]+$/i.test(s.gaId) ? s.gaId : "";
  const pixel = /^\d+$/.test(s.metaPixelId) ? s.metaPixelId : "";
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        {children}
        <LivePreviewListener />
        {ga && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}');`}</Script>
          </>
        )}
        {pixel && (
          <Script id="meta-pixel" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');`}</Script>
        )}
      </body>
    </html>
  );
}
