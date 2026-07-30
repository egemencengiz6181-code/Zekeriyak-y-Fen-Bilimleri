import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { OG_IMAGE, TWITTER_IMAGE } from '@/config/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Services.items.rehberlik' });
  const origin = 'https://www.zekeriyakoyfenbilimleri.com';
  const path = `${origin}/${locale}/rehberlik`;

  const title = t('meta_title');
  const description = t('meta_description');

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        tr: `${origin}/tr/rehberlik`,
        en: `${origin}/en/rehberlik`,
      },
    },
    openGraph: {
      images: OG_IMAGE,
      title,
      description,
      url: path,
      locale: locale === 'en' ? 'en_US' : 'tr_TR',
    },
    twitter: {
      card: 'summary_large_image' as const,
      images: TWITTER_IMAGE,
      title,
      description,
    },
  };
}

export default function RehberlikLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
