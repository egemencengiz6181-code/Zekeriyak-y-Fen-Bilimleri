import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getWorkBySlug, getLocalizedWork } from '@/config/works';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const origin = 'https://www.reneedesignlab.com';
  const path = `${origin}/${locale}/works/${slug}`;

  const rawWork = getWorkBySlug(slug);
  if (!rawWork) return { alternates: { canonical: path } };

  const work = getLocalizedWork(rawWork, locale);
  const t = await getTranslations({ locale, namespace: 'Works' });

  const title = `${work.brand} – ${work.tagline} | Renee DesignLab`;
  const description = work.story?.challenge ?? work.tagline;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        tr: `${origin}/tr/works/${slug}`,
        en: `${origin}/en/works/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'tr_TR',
      ...(work.coverImage && {
        images: [
          {
            url: work.coverImage.startsWith('http')
              ? work.coverImage
              : `${origin}${work.coverImage}`,
            width: 1200,
            height: 630,
            alt: `${work.brand} – ${t('section_label')}`,
          },
        ],
      }),
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function WorkSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
