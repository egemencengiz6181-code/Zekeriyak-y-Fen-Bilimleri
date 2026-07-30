import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/config/locales';
import { serviceSlugs, serviceImages, type ServiceSlug } from '@/config/services';
import ServiceSlugContent from './ServiceSlugContent';

export function generateStaticParams() {
  return locales.flatMap((locale) => serviceSlugs.map((slug) => ({ locale, slug })));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale); // statik render için gerekli

  if (!serviceSlugs.includes(slug as ServiceSlug)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'Services' });
  const toolsRaw = t(`items.${slug}.tech_tools`);

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

  return (
    <ServiceSlugContent slug={slug} images={serviceImages[slug as ServiceSlug]} i18n={i18n} />
  );
}
