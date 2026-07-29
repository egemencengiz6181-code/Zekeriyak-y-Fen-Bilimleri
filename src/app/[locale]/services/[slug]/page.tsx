import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/config/locales';
import ServiceSlugContent from './ServiceSlugContent';

const VALID_SLUGS = [
  '6-sinif', '7-sinif', '8-sinif', '9-sinif', '10-sinif', '11-sinif', '12-sinif', 'mezun',
  '8-sinif-vip', '12-sinif-vip',
  'deneme-kulubu', 'ozel-ders',
] as const;

type ServiceSlug = (typeof VALID_SLUGS)[number];

const slugImages: Record<ServiceSlug, { hero: string; tech: string; alt: string }> = {
  '6-sinif':       { hero: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&q=80', tech: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1400&q=80', alt: '6. sınıf ders programı' },
  '7-sinif':       { hero: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&q=80', tech: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1400&q=80', alt: '7. sınıf ders programı' },
  '8-sinif':       { hero: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&q=80', tech: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1400&q=80', alt: '8. sınıf LGS hazırlık' },
  '9-sinif':       { hero: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&q=80', tech: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1400&q=80', alt: '9. sınıf ders programı' },
  '10-sinif':      { hero: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1400&q=80', tech: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1400&q=80', alt: '10. sınıf ders programı' },
  '11-sinif':      { hero: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&q=80', tech: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1400&q=80', alt: '11. sınıf YKS hazırlık' },
  '12-sinif':      { hero: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1400&q=80', tech: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1400&q=80', alt: '12. sınıf YKS hazırlık' },
  'mezun':         { hero: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1400&q=80', tech: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1400&q=80', alt: 'Mezun YKS hazırlık' },
  '8-sinif-vip':   { hero: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1400&q=80', tech: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1400&q=80', alt: '8. sınıf VIP LGS hazırlık' },
  '12-sinif-vip':  { hero: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1400&q=80', tech: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1400&q=80', alt: '12. sınıf VIP YKS hazırlık' },
  'deneme-kulubu': { hero: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80', tech: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80', alt: 'Deneme kulübü ve sınav analizi' },
  'ozel-ders':     { hero: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=1400&q=80', tech: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400&q=80', alt: 'Birebir özel ders' },
};

const defaultImages = {
  hero: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&q=80',
  tech: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1400&q=80',
  alt: 'Bahçelievler Sevinç Dershanesi programları',
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    VALID_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!VALID_SLUGS.includes(slug as ServiceSlug)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'Services' });
  const toolsRaw = t(`items.${slug}.tech_tools`) as string;

  const i18n = {
    title: t('title'),
    back: t('back'),
    scope: t('scope'),
    strategy_section: t('strategy_section'),
    tech_section: t('tech_section'),
    discovery_title: t('discovery_title'),
    about_suffix: t('about_suffix'),
    cta: t('cta'),
    item_title: t(`items.${slug}.title`),
    hero_quote: t(`items.${slug}.hero_quote`),
    intro: t(`items.${slug}.intro`),
    body: t(`items.${slug}.body`),
    strategy_title: t(`items.${slug}.strategy_title`),
    phase1_title: t(`items.${slug}.phase1_title`),
    phase1_text: t(`items.${slug}.phase1_text`),
    phase2_title: t(`items.${slug}.phase2_title`),
    phase2_text: t(`items.${slug}.phase2_text`),
    phase3_title: t(`items.${slug}.phase3_title`),
    phase3_text: t(`items.${slug}.phase3_text`),
    result_title: t(`items.${slug}.result_title`),
    result_text: t(`items.${slug}.result_text`),
    tech_title: t(`items.${slug}.tech_title`),
    tech_intro: t(`items.${slug}.tech_intro`),
    tools: toolsRaw.split(' · '),
    features: t.raw(`items.${slug}.features`) as string[],
  };

  const images = slugImages[slug as ServiceSlug] ?? defaultImages;

  return <ServiceSlugContent slug={slug} images={images} i18n={i18n} />;
}
