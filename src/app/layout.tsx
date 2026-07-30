import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ORIGIN, BRAND, ogImages } from '@/config/site';
import './globals.css';

/**
 * KÖK LAYOUT — <html> ve <body> burada olmak ZORUNDA.
 *
 * Önceden bu dosya sadece `children` döndürüyor, <html>/<body> ise
 * `[locale]/layout.tsx` içinde render ediliyordu. Next.js metadata'yı yalnızca
 * kök layout'un <head>'ine enjekte edebildiği için <title>, description,
 * canonical, og:image ve font preload etiketlerinin HİÇBİRİ <head>'e
 * girmiyordu — hepsi <body> sonuna düşüyordu. Google bunları çoğu zaman yine
 * okur ama garanti değil ve OG önizlemeleri çalışmıyordu.
 *
 * lang="tr" sabit: src/config/locales.ts içinde tek dil tanımlı. Yeni bir dil
 * eklenirse burayı dinamikleştirmek gerekir.
 */

// Google Fonts derleme anında indirilip /_next/static/media altından kendi
// domainimizden servis edilir; tarayıcı fonts.googleapis.com'a hiç bağlanmaz.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(ORIGIN),
  title: {
    default: `${BRAND} | Bahçelievler İstanbul`,
    template: `%s | ${BRAND}`,
  },
  description:
    'Bahçelievler Sevinç Dershanesi — Ortaokul, lise ve YKS hazırlık ders programları. Deneyimli öğretmenler ve kişisel takip ile hedef okuluna giden yol.',
  keywords: [
    'bahçelievler dershane',
    'sevinç dershanesi',
    'bahçelievler sevinç kurs merkezi',
    'haznedar dershane',
    'şirinevler dershane',
    'yks hazırlık bahçelievler',
    'lgs hazırlık bahçelievler',
    'tyt ayt kursu istanbul',
    '8. sınıf lgs kursu',
    '12. sınıf yks kursu',
    'mezun yks kursu',
    'birebir özel ders bahçelievler',
    'deneme sınavı kulübü',
    'eğitim koçluğu istanbul',
    'öğrenci rehberlik danışmanlık',
  ],
  authors: [{ name: BRAND, url: ORIGIN }],
  creator: BRAND,
  publisher: BRAND,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logos/Sevinc-Kurs-Logo.png',
    apple: '/logos/Sevinc-Kurs-Logo.png',
  },
  openGraph: {
    type: 'website',
    siteName: BRAND,
    locale: 'tr_TR',
    url: ORIGIN,
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    images: ogImages,
  },
  category: 'education',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={inter.variable} suppressHydrationWarning>
      <body
        className="bg-background text-foreground antialiased selection:bg-primary/30 min-h-screen relative font-sans"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
