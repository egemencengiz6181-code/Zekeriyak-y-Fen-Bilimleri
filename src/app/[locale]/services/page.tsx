import { getTranslations } from 'next-intl/server';
import ServicesPageClient from './ServicesPageClient';

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Services' });

  const cards = [
    { slug: '6-sinif',        icon: 'BookOpen',      span: 'md:col-span-1', title: t('items.6-sinif.title'),        description: t('items.6-sinif.description') },
    { slug: '7-sinif',        icon: 'BookOpen',      span: 'md:col-span-1', title: t('items.7-sinif.title'),        description: t('items.7-sinif.description') },
    { slug: '8-sinif',        icon: 'BookOpen',      span: 'md:col-span-1', title: t('items.8-sinif.title'),        description: t('items.8-sinif.description') },
    { slug: '9-sinif',        icon: 'BookOpen',      span: 'md:col-span-1', title: t('items.9-sinif.title'),        description: t('items.9-sinif.description') },
    { slug: '10-sinif',       icon: 'BookOpen',      span: 'md:col-span-1', title: t('items.10-sinif.title'),       description: t('items.10-sinif.description') },
    { slug: '11-sinif',       icon: 'GraduationCap', span: 'md:col-span-1', title: t('items.11-sinif.title'),       description: t('items.11-sinif.description') },
    { slug: '12-sinif',       icon: 'Trophy',        span: 'md:col-span-1', title: t('items.12-sinif.title'),       description: t('items.12-sinif.description') },
    { slug: 'mezun',          icon: 'GraduationCap', span: 'md:col-span-1', title: t('items.mezun.title'),          description: t('items.mezun.description') },
    { slug: '8-sinif-vip',    icon: 'Star',          span: 'md:col-span-1', title: t('items.8-sinif-vip.title'),    description: t('items.8-sinif-vip.description') },
    { slug: '12-sinif-vip',   icon: 'Star',          span: 'md:col-span-1', title: t('items.12-sinif-vip.title'),   description: t('items.12-sinif-vip.description') },
    { slug: 'ozel-ders',      icon: 'Users',         span: 'md:col-span-1', title: t('items.ozel-ders.title'),      description: t('items.ozel-ders.description') },
    { slug: 'deneme-kulubu',  icon: 'FileText',      span: 'md:col-span-1', title: t('items.deneme-kulubu.title'),  description: t('items.deneme-kulubu.description') },
  ];

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
