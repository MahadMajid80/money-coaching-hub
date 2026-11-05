import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */

// Old WordPress URLs that no longer have their own page → where they go now.
const legacy = [
  ["/about-us/", "/luca/"],
  ["/money-coaching-mindset-budgeting/", "/luca/"],
  ["/services/one-time-session/", "/services/#options"],
  ["/services/individual-coaching/", "/services/#options"],
  ["/services/couples-coaching/", "/services/#options"],
  ["/companies/", "/services/financial-workshops/"],
  ["/services/financial-workshop/", "/services/financial-workshops/"],
  ["/service-page/", "/services/"],
  ["/new-course/", "/investing-made-simple/"],
  ["/investing-made-simple-the-online-course/", "/investing-made-simple/"],
  ["/investing-made-simple-for-europeans/", "/investing-made-simple/"],
  ["/black-friday-special-offer/", "/investing-made-simple/"],
  ["/black-week-bundle/", "/investing-made-simple/"],
  ["/womanifest-offer/", "/investing-made-simple/"],
  ["/new-banner/", "/"],
  ["/take-the-quiz/", "/take-money-type-quiz/"],
  ["/shop/", "/"],
  ["/cart/", "/"],
  ["/checkout/", "/"],
  ["/my-account/", "/"],
  ["/no-access/", "/"],
  ["/thank-you/", "/"],
  ["/money-blog/", "/blog/"],
  ["/category/money-blog/", "/blog/"],
  ["/category/uncategorized/", "/blog/"],
];

const nextConfig = {
  poweredByHeader: false,
  agentRules: false,
  trailingSlash: true,
  // The dashboard (/admin) and its API (/api) must not be redirected; proxy.ts adds the slash for site pages.
  skipTrailingSlashRedirect: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "moneycoachinghub.com", pathname: "/wp-content/uploads/**" }],
  },
  async redirects() {
    return [
      ...legacy.map(([source, destination]) => ({ source, destination, permanent: true })),
      { source: "/feed/", destination: "/blog/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/admin/", permanent: false },
      { source: "/wp-login.php", destination: "/admin/", permanent: false },
      { source: "/blog/page/:n/", destination: "/blog/:n/", permanent: true },
      { source: "/category/:cat/page/:n/", destination: "/category/:cat/", permanent: true },
    ];
  },
  async headers() {
    const common = [
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "X-DNS-Prefetch-Control", value: "on" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), bluetooth=(), magnetometer=(), gyroscope=(), accelerometer=(), browsing-topics=(), interest-cohort=()",
      },
    ];
    return [
      { source: "/(.*)", headers: common },
      {
        // The dashboard API returns data, never pages: nothing in it may run or be framed, and search engines skip it.
        source: "/api/:path*",
        headers: [
          { key: "Content-Security-Policy", value: "default-src 'none'; frame-ancestors 'none'" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
