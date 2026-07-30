import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

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
      title,
      description,
      url: path,
      locale: locale === 'en' ? 'en_US' : 'tr_TR',
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function RehberlikLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
