import { getTranslations, setRequestLocale } from 'next-intl/server';
import ServicesPageClient from './ServicesPageClient';
import { serviceSlugs, serviceIcons } from '@/config/services';

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale); // statik render için gerekli
  const t = await getTranslations({ locale, namespace: 'Services' });

  const cards = serviceSlugs.map((slug) => ({
    slug,
    icon: serviceIcons[slug],
    span: 'md:col-span-1',
    title: t(`items.${slug}.title`),
    description: t(`items.${slug}.description`),
  }));

  return (
    <ServicesPageClient
      pageTitle={t('title')}
      pageSubtitle={t('subtitle')}
      sectionOrtaokul={t('sections.ortaokul')}
      sectionLise={t('sections.lise')}
      sectionVip={t('sections.vip')}
      sectionDestek={t('sections.destek')}
      cards={cards}
    />
  );
}
