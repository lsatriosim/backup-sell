import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow static assets to pass through (don't redirect CSS/JS files)
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/static/")
  ) {
    return NextResponse.next();
  }

  const ua = req.headers.get("user-agent") || "";
  const isMobile = /mobile|android|iphone|ipad/i.test(ua);

  // if (!isMobile) {
  //   return NextResponse.redirect(new URL("/desktop-warning", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!desktop-warning).*)"],
};
