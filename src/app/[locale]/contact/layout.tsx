import type { Metadata } from 'next';
import { ogImages } from '@/config/site';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });
  const origin = 'https://www.bahcelievlersevinc.com';
  const path = `${origin}/${locale}/contact`;

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: path,
      languages: {
        tr: `${origin}/tr/contact`,
      },
    },
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      url: path,
      locale: 'tr_TR',
      images: ogImages,
    },
    twitter: {
      title: t('meta_title'),
      description: t('meta_description'),
    },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
