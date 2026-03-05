import type { Metadata } from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import {locales} from '@/navigation';
import Image from 'next/image';
import '../globals.css';

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

  const origin = 'https://www.reneedesignlab.com';
  const alternateLocale = locale === 'tr' ? 'en' : 'tr';

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${origin}/${locale}`,
      languages: {
        tr: `${origin}/tr`,
        en: `${origin}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'tr_TR',
      alternateLocale: alternateLocale === 'en' ? 'en_US' : 'tr_TR',
      siteName: 'Renee DesignLab',
      title: t('title'),
      description: t('description'),
      url: `${origin}/${locale}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
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
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className="bg-background text-foreground antialiased selection:bg-primary/30 min-h-screen relative">
        {/* Arka Plan İkonu (Global Mühür) */}
        <div className="fixed top-[15%] right-[-250px] w-[900px] h-[900px] opacity-[0.08] rotate-12 pointer-events-none z-0">
          <Image 
            src="/logos/Main_Simge_Beyaz.png" 
            alt="" 
            fill 
            className="object-contain"
            priority
          />
        </div>

        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main className="relative z-10">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
