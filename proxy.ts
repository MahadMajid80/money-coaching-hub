import { NextResponse, type NextRequest } from "next/server";

/**
 * Runs before every page:
 * 1. No sign-up: the dashboard has a single admin login, so the "create first user" screen and its
 *    API are switched off, and password-reset is off until email is configured.
 * 2. Site pages always end with a slash (as on the old WordPress site).
 * 3. Security headers, including a Content-Security-Policy with a fresh nonce on every request:
 *    only scripts that Next.js itself marks with the nonce can run, so injected scripts can't.
 */

const isDev = process.env.NODE_ENV !== "production";
const emailConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

function csp(nonce: string, admin: boolean) {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": ["'self'", `'nonce-${nonce}'`, "'strict-dynamic'", ...(isDev ? ["'unsafe-eval'"] : [])],
    "style-src": ["'self'", "'unsafe-inline'", ...(admin ? ["https://cdn.jsdelivr.net"] : [])],
    "img-src": ["'self'", "data:", "blob:", "https:"],
    "font-src": ["'self'", "data:", ...(admin ? ["https://cdn.jsdelivr.net"] : [])],
    "connect-src": [
      "'self'",
      "https://*.public.blob.vercel-storage.com",
      "https://vercel.com",
      "https://*.google-analytics.com",
      "https://*.analytics.google.com",
      "https://www.googletagmanager.com",
      "https://www.facebook.com",
      "https://connect.facebook.net",
      ...(admin ? ["https://cdn.jsdelivr.net"] : []),
      ...(isDev ? ["ws:"] : []),
    ],
    "media-src": ["'self'", "https:"],
    "frame-src": ["'self'", "https://www.youtube.com", "https://www.youtube-nocookie.com", "https://player.vimeo.com"],
    "worker-src": ["'self'", "blob:"],
    "frame-ancestors": ["'self'"],
    "form-action": ["'self'"],
    "base-uri": ["'self'"],
    "object-src": ["'none'"],
    "manifest-src": ["'self'"],
  };
  return (
    Object.entries(directives)
      .map(([k, v]) => `${k} ${v.join(" ")}`)
      .join("; ") + (isDev ? "" : "; upgrade-insecure-requests")
  );
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin/create-first-user")) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  if (pathname.startsWith("/api/users/first-register")) {
    return NextResponse.json({ error: "Not available." }, { status: 404 });
  }
  if (!emailConfigured && (pathname.startsWith("/api/users/forgot-password") || pathname.startsWith("/admin/forgot"))) {
    return pathname.startsWith("/api")
      ? NextResponse.json({ errors: [{ message: "Password reset by email isn't set up yet. Contact your web developer." }] }, { status: 503 })
      : NextResponse.redirect(new URL("/admin/login", req.url));
  }
  if (pathname.startsWith("/api")) return NextResponse.next();

  const isAdmin = pathname.startsWith("/admin");
  if (!isAdmin && !pathname.endsWith("/") && !/\.[a-z0-9]+$/i.test(pathname)) {
    return new NextResponse(null, { status: 308, headers: { Location: new URL(`${pathname}/${req.nextUrl.search}`, req.url).toString() } });
  }

  const nonce = btoa(crypto.randomUUID());
  const policy = csp(nonce, isAdmin);
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", policy);
  const res = NextResponse.next({ request: { headers: requestHeaders } });
  res.headers.set("Content-Security-Policy", policy);
  if (isAdmin) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    res.headers.set("Cache-Control", "no-store");
  }
  return res;
}

export const config = {
  matcher: [
    // every page (site and dashboard), but not static files or images
    { source: "/((?!_next/static|_next/image|img/|images/|wp/|icon.png|apple-icon.png|favicon.ico|robots.txt|sitemap.xml).*)" },
  ],
};
