import { getTranslations } from 'next-intl/server';
import ReneeServiceCard from '@/components/ui/renee-service-card';

const serviceSlugs = ['6-sinif', '7-sinif', '8-sinif', '9-sinif', '10-sinif', '11-sinif', '12-sinif', 'mezun', '8-sinif-vip', '12-sinif-vip', 'deneme-kulubu', 'ozel-ders'];

export default async function ServicesSection() {
  const t = await getTranslations('Services');

  const services = serviceSlugs.map((slug) => ({
    slug,
    title: t(`items.${slug}.title`),
    description: t(`items.${slug}.description`),
    href: `/services/${slug}`,
    features: (t.raw(`items.${slug}.features`) as string[]).slice(0, 4),
  }));

  return (
    <section className="py-32 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-4">{t('title')}</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-900 dark:text-white">{t('subtitle')}</h3>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {services.map((service) => (
            <div key={service.slug} className="w-full md:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]">
              <ReneeServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
