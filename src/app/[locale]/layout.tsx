import type { Metadata } from 'next';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import Navbar, { type NavService } from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import MobileStickyButton from '@/components/shared/MobileStickyButton';
import Providers from './providers';
import {locales} from '@/config/locales';
import {megaMenuSlugs} from '@/config/services';
import {pickClientMessages} from '@/config/clientMessages';
import {ORIGIN, BRAND, ogImages, PHONE, EMAIL} from '@/config/site';

// <html>/<body>, font ve genel metadata kök layout'ta (src/app/layout.tsx).
// Burada olmaları Next'in <head> enjeksiyonunu bozuyordu.

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
      languages: { tr: `${ORIGIN}/tr` },
    },
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      siteName: BRAND,
      title: t('title'),
      description: t('description'),
      url: `${ORIGIN}/${locale}`,
      // Next iç içe metadata'da `openGraph` nesnesini derin birleştirmez —
      // images verilmezse kök layout'taki og:image kaybolur.
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ogImages,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  // ZORUNLU: bu çağrı olmadan next-intl locale'i `headers()` üzerinden okuyor,
  // bu da TÜM sayfaları dinamik hale getiriyordu — hiçbiri statik HTML olarak
  // prerender edilmiyor, her istek Vercel'de bir sunucu fonksiyonu (ve soğuk
  // başlatma) tetikliyordu. Sitenin geç açılmasının en büyük sebebi buydu.
  setRequestLocale(locale);

  const messages = await getMessages();

  // Mega menü başlıkları sunucuda çözülüp prop olarak geçiliyor; böylece
  // 34 kB'lık `Services` namespace'i client payload'ına girmiyor.
  const st = await getTranslations({ locale, namespace: 'Services' });
  const navServices: NavService[] = megaMenuSlugs.map((slug) => ({
    slug,
    title: st(`items.${slug}.title`),
    description: st(`items.${slug}.description`),
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: BRAND,
    url: ORIGIN,
    logo: `${ORIGIN}/logos/Sevinc-Kurs-Logo.png`,
    image: `${ORIGIN}/logos/Sevinc-Kurs-Logo.png`,
    description:
      'Bahçelievler Sevinç Dershanesi — ortaokul, lise ve YKS hazırlık ders programları, rehberlik ve birebir özel ders.',
    telephone: PHONE,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Haznedar, Bahçelievler Mah. Bağcılar Cd. No:11',
      addressLocality: 'Bahçelievler',
      addressRegion: 'İstanbul',
      postalCode: '34180',
      addressCountry: 'TR',
    },
    areaServed: { '@type': 'City', name: 'İstanbul' },
  };

  return (
    <>
      {/* JSON-LD body içinde — Next.js'in resmi önerisi, Google sorunsuz okur */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Providers locale={locale} messages={pickClientMessages(messages)}>
        <Navbar services={navServices} />
        <main className="relative z-10 pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileStickyButton />
      </Providers>
    </>
  );
}
