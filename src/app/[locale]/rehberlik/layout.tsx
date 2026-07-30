import type { Metadata } from 'next';
import { ogImages } from '@/config/site';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navbar' });
  const origin = 'https://www.bahcelievlersevinc.com';
  const path = `${origin}/${locale}/rehberlik`;

  const title = `${t('guidance')} | Bahçelievler Sevinç Dershanesi`;
  const description = 'Psikolojik danışmanlık ve rehberlik hizmetleri ile öğrencilerimizin akademik ve kişisel gelişimlerini destekliyoruz.';

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        tr: `${origin}/tr/rehberlik`,
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      locale: 'tr_TR',
      images: ogImages,
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
