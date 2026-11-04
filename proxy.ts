import { NextResponse, type NextRequest } from "next/server";

/**
 * 1. There is no sign-up: the dashboard has a single admin login, so the "create first user"
 *    screen and its API are switched off (login page only).
 * 2. Site pages always end with a slash (as on the old WordPress site); the dashboard and API are left alone.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin/create-first-user")) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  if (pathname.startsWith("/api/users/first-register")) {
    return NextResponse.json({ error: "Not available." }, { status: 404 });
  }
  if (pathname.endsWith("/") || pathname.startsWith("/api") || pathname.startsWith("/admin") || pathname.startsWith("/_next") || /\.[a-z0-9]+$/i.test(pathname)) {
    return NextResponse.next();
  }
  return new NextResponse(null, { status: 308, headers: { Location: new URL(`${pathname}/${req.nextUrl.search}`, req.url).toString() } });
}

export const config = {
  matcher: ["/((?!_next/|api/|admin).*)", "/admin/create-first-user/:path*", "/admin/create-first-user", "/api/users/first-register/:path*", "/api/users/first-register"],
};
