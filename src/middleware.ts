import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./config/locales";

const intlMiddleware = createIntlMiddleware({
  defaultLocale: "tr",
  locales,
  localePrefix,
});

/**
 * Bot / tarama filtresi + i18n yönlendirmesi.
 *
 * Performans notu: bu fonksiyon her sayfa isteğinde edge'de çalışıyor, o yüzden
 * iş mümkün olduğunca az. Path kalıpları tek bir regex'te birleştirildi
 * (önceden 27 elemanlı bir dizide `Array.some` + `String.includes` vardı) ve
 * matcher artık `/api` ile uzantılı tüm dosyaları hiç uyandırmıyor.
 */

// Saldırı/tarama kalıpları — tek regex, tek geçiş
const BLOCKED_PATH_RE =
  /(^|\/)(wp-|xmlrpc|phpmyadmin|cgi-bin|eval-stdin|_ignition|actuator|telescope|solr|installer|setup-config)|\.(php|env|git)(\/|$)|\/(credentials|config\.json)(\/|$)/i;

// Bilinen zararlı / kaynak tüketen User-Agent'lar.
// NOT: `headlesschrome` listeden çıkarıldı — Lighthouse, PageSpeed Insights ve
// Vercel'in kendi önizleme botu bu UA ile geliyor; engellendiğinde performans
// ölçümü hiç çalışmıyordu.
const BLOCKED_UA_RE =
  /(sqlmap|nikto|nmap|masscan|zgrab|gobuster|dirbuster|wpscan|nessus|acunetix|openvas|scrapy|libwww-perl|phantomjs|semrush|ahrefsbot|mj12bot|dotbot|blexbot|petalbot|bytespider)/i;

export function middleware(request: NextRequest): NextResponse {
  const path = request.nextUrl.pathname;
  const ua = request.headers.get("user-agent") ?? "";

  // Aşırı uzun URL (path traversal denemesi)
  if (path.length > 500) {
    return new NextResponse(null, { status: 414 });
  }

  if (BLOCKED_PATH_RE.test(path)) {
    return new NextResponse(null, { status: 404 });
  }

  if (BLOCKED_UA_RE.test(ua)) {
    return new NextResponse(null, { status: 403 });
  }

  return intlMiddleware(request) as NextResponse;
}

export const config = {
  matcher: [
    /*
     * Yalnızca gerçek sayfa isteklerini yakala.
     * Hariç: Next.js dahili yolları, /api, ve uzantısı olan tüm dosyalar
     * (logo/görsel/robots/sitemap dahil) — bunlar için middleware çalıştırmak
     * her istek başına gereksiz edge gecikmesi demek.
     */
    "/((?!api|_next|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
