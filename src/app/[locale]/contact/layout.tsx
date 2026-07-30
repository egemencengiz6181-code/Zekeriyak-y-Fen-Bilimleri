import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { OG_IMAGE, TWITTER_IMAGE } from '@/config/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });
  const origin = 'https://www.zekeriyakoyfenbilimleri.com';
  const path = `${origin}/${locale}/contact`;

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: path,
      languages: {
        tr: `${origin}/tr/contact`,
        en: `${origin}/en/contact`,
      },
    },
    openGraph: {
      images: OG_IMAGE,
      title: t('meta_title'),
      description: t('meta_description'),
      url: path,
      locale: locale === 'en' ? 'en_US' : 'tr_TR',
    },
    twitter: {
      card: 'summary_large_image' as const,
      images: TWITTER_IMAGE,
      title: t('meta_title'),
      description: t('meta_description'),
    },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
