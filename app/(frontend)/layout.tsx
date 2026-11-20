import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import "@fontsource/raleway/600.css";
import "@fontsource/raleway/700.css";
import "@fontsource/raleway/800.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/400-italic.css";
import "@fontsource/lato/700.css";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import { ClickTracking } from "@/components/ClickTracking";
import { SiteNavigation } from "@/components/SiteNavigation";
import { Suspense } from "react";
import { CookieBanner } from "@/components/CookieConsent";
import { consentDefaultScript, pixelConsentSnippet } from "@/lib/consent";
import { getSettings } from "@/lib/cms/data";
import { SITE_URL } from "@/lib/site";
import "./globals.css";
import { WhatsAppFloat } from "@/components/WhatsAppButton";

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
  const nonce = (await headers()).get("x-nonce") || undefined;
  const ga = /^G-[A-Z0-9]+$/i.test(s.gaId) ? s.gaId : "";
  const pixel = /^\d+$/.test(s.metaPixelId) ? s.metaPixelId : "";
  return (
    <html lang="en">
      <head>
        {/* Google Consent Mode v2: everything denied until the visitor chooses. Must run before any tag. */}
        <script nonce={nonce} id="consent-default" dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />
      </head>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        {children}
        <WhatsAppFloat />
        <LivePreviewListener />
        <CookieBanner />
        <ClickTracking />
        <Suspense fallback={null}>
          <SiteNavigation />
        </Suspense>
        {ga && (
          <>
            <Script nonce={nonce} src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
            <Script nonce={nonce} id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}');`}</Script>
          </>
        )}
        {pixel && (
          <Script nonce={nonce} id="meta-pixel" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');${pixelConsentSnippet}fbq('init','${pixel}');fbq('track','PageView');`}</Script>
        )}
      </body>
    </html>
  );
}
