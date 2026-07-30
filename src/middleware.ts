import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./config/locales";

const intlMiddleware = createIntlMiddleware({
  defaultLocale: "tr",
  locales,
  localePrefix,
});

export function middleware(request: NextRequest): NextResponse {
  return intlMiddleware(request) as NextResponse;
}

export const config = {
  matcher: [
    "/",
    "/(tr)/:path*",
  ],
};
