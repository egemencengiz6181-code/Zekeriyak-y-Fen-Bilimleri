import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

// Valid service slugs that match messages keys
const validSlugs = [
  'seo',
  'google-ads',
  'meta-ads',
  'web-design',
  'social-media',
  'production',
  'design',
  'pr',
] as const;

type ServiceSlug = (typeof validSlugs)[number];

function isValidSlug(slug: string): slug is ServiceSlug {
  return validSlugs.includes(slug as ServiceSlug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const origin = 'https://www.reneedesignlab.com';
  const path = `${origin}/${locale}/services/${slug}`;

  if (!isValidSlug(slug)) {
    return {
      alternates: { canonical: path },
    };
  }

  const t = await getTranslations({ locale, namespace: `Services.items.${slug}` });

  const title = t('meta_title');
  const description = t('meta_description');

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        tr: `${origin}/tr/services/${slug}`,
        en: `${origin}/en/services/${slug}`,
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

export default function ServiceSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
