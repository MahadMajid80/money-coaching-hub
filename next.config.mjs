/** @type {import('next').NextConfig} */

// Old WordPress URLs that no longer have their own page → where they go now.
const legacy = [
  ["/about-us/", "/money-coaching-mindset-budgeting/"],
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
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "moneycoachinghub.com", pathname: "/wp-content/uploads/**" }],
  },
  async redirects() {
    return [
      ...legacy.map(([source, destination]) => ({ source, destination, permanent: true })),
      { source: "/feed/", destination: "/blog/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: false },
      { source: "/blog/page/:n/", destination: "/blog/:n/", permanent: true },
      { source: "/category/:cat/page/:n/", destination: "/category/:cat/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
