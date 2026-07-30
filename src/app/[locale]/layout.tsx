import type { Metadata } from 'next';
import {getMessages, getTranslations} from 'next-intl/server';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import MobileStickyButton from '@/components/shared/MobileStickyButton';
import Providers from './providers';
import {locales} from '@/config/locales';
import { Inter } from 'next/font/google';
import '../globals.css';

// Inter'in variable sürümü — TEK dosya, tüm ağırlıklar (400–900) içinde.
// `weight: [...]` vermek variable font'u statik kesitlere böler ve tek dosya
// yerine ayrı ayrı dosyalar indirtir; bu yüzden bilerek belirtilmiyor.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  adjustFontFallback: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
});

const ORIGIN = 'https://www.zekeriyakoyfenbilimleri.com';

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Index' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${ORIGIN}/${locale}`,
      languages: {
        'tr-TR': `${ORIGIN}/tr`,
        'en-US': `${ORIGIN}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      siteName: 'Zekeriyaköy Fen Bilimleri',
      title: t('title'),
      description: t('description'),
      url: `${ORIGIN}/${locale}`,
      images: [
        {
          url: `${ORIGIN}/logos/fen-bilimleri-logo.png`,
          alt: 'Zekeriyaköy Nazmi Arıkan Fen Bilimleri',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${ORIGIN}/logos/fen-bilimleri-logo.png`],
    },
  };
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Zekeriyaköy Nazmi Arıkan Fen Bilimleri',
  alternateName: 'Zekeriyaköy Fen Bilimleri Dershanesi',
  url: ORIGIN,
  logo: `${ORIGIN}/logos/fen-bilimleri-logo.png`,
  image: `${ORIGIN}/logos/fen-bilimleri-logo.png`,
  description:
    "Zekeriyaköy Nazmi Arıkan Fen Bilimleri Dershanesi — Sarıyer'de 7. sınıftan mezun seviyesine kadar LGS ve YKS hazırlık programları.",
  telephone: '+902122015848',
  email: 'zekeriyakoyfenbilimleri@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Uskumruköy, Zekeriyaköy Mahallesi, Kilyos Caddesi No: 238/2',
    addressLocality: 'Sarıyer',
    addressRegion: 'İstanbul',
    addressCountry: 'TR',
  },
  areaServed: ['Zekeriyaköy', 'Sarıyer', 'İstanbul'],
  sameAs: ['https://www.instagram.com/zekeriyakoyfenbilimleri'],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased selection:bg-primary/30 min-h-screen relative font-sans" suppressHydrationWarning>
        {/* 900x900'lük sabit arka plan logosu kaldırıldı: her sayfada tam
            boyutlu bir PNG dekode ediliyor ve `fixed` olduğu için her scroll'da
            yeniden kompozit ediliyordu. Marka kimliği hero gradient'i ve
            navbar/footer logosuyla zaten korunuyor. */}
        <Providers locale={locale} messages={messages ?? {}}>
            <Navbar />
            <main className="relative z-10 pb-20 md:pb-0">
              {children}
            </main>
            <Footer />
            {/* Mobil sticky buton — her sayfada görünür, layout seviyesinde */}
            <MobileStickyButton />
        </Providers>
      </body>
    </html>
  );
}
