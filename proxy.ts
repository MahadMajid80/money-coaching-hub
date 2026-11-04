import { NextResponse, type NextRequest } from "next/server";

/** Site pages always end with a slash (as on the old WordPress site); the dashboard and API are left alone. */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.endsWith("/") || pathname.startsWith("/api") || pathname.startsWith("/admin") || pathname.startsWith("/_next") || /\.[a-z0-9]+$/i.test(pathname)) {
    return NextResponse.next();
  }
  return new NextResponse(null, { status: 308, headers: { Location: new URL(`${pathname}/${req.nextUrl.search}`, req.url).toString() } });
}

export const config = { matcher: ["/((?!_next/|api/|admin).*)"] };
