import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'References' });
  const origin = 'https://www.reneedesignlab.com';
  const path = `${origin}/${locale}/references`;

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: path,
      languages: {
        tr: `${origin}/tr/references`,
        en: `${origin}/en/references`,
      },
    },
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      url: path,
      locale: locale === 'en' ? 'en_US' : 'tr_TR',
    },
    twitter: {
      title: t('meta_title'),
      description: t('meta_description'),
    },
  };
}

export default function ReferencesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
