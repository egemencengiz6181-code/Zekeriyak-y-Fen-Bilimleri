import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { jwtVerify } from "jose";
import { locales, localePrefix } from "./navigation";

const intlMiddleware = createIntlMiddleware({
  defaultLocale: "tr",
  locales,
  localePrefix,
});

const JWT_SECRET = new TextEncoder().encode("renee-admin-jwt-secret-2024-x9k");

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin route guard ────────────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";

    if (!isLoginPage) {
      const token = request.cookies.get("admin-token")?.value;

      if (!token) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }

      try {
        await jwtVerify(token, JWT_SECRET);
      } catch {
        const res = NextResponse.redirect(
          new URL("/admin/login", request.url)
        );
        res.cookies.delete("admin-token");
        return res;
      }
    }

    return NextResponse.next();
  }

  // ── Intl middleware for all other routes ─────────────────────────────────
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(tr|en)/:path*",
    "/admin",
    "/admin/:path*",
  ],
};
