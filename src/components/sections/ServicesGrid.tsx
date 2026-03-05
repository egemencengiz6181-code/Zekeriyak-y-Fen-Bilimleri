'use client';

import ReneeServiceCard from '@/components/ui/renee-service-card';
import { Search, Target, Share2, Code, Globe, Camera, Palette, Megaphone } from 'lucide-react';
import { useTranslations } from 'next-intl';

const serviceIcons = [Search, Target, Share2, Code, Globe, Camera, Palette, Megaphone];
const serviceSlugs = ['seo', 'google-ads', 'meta-ads', 'web-design', 'social-media', 'production', 'design', 'pr'];

export default function ServicesSection() {
  const t = useTranslations('Services');

  const services = serviceSlugs.map((slug, i) => ({
    title: t(`items.${slug}.title`),
    description: t(`items.${slug}.description`),
    icon: serviceIcons[i],
    href: `/services/${slug}`,
    features: (t.raw(`items.${slug}.features`) as string[]).slice(0, 4),
  }));

  return (
    <section className="py-32 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-4">{t('title')}</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">{t('subtitle')}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ReneeServiceCard
              key={index}
              {...service}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
