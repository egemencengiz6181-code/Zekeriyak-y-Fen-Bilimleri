import type { Metadata } from 'next';
import HeroMain from '@/components/ui/hero-main';
import ServicesGrid from '@/components/sections/ServicesGrid';
import LogoMarquee from '@/components/sections/LogoMarquee';
import TestimonialsSection from '@/components/sections/Testimonials';
import DisplayCards from '@/components/ui/display-cards';
import LetsWorkSection from '@/components/ui/lets-work-section';
import WorksShowcase from '@/components/ui/works-showcase';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Index' });
  const origin = 'https://www.reneedesignlab.com';
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${origin}/${locale}`,
      languages: { tr: `${origin}/tr`, en: `${origin}/en` },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${origin}/${locale}`,
      locale: locale === 'en' ? 'en_US' : 'tr_TR',
    },
    twitter: {
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function IndexPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations('WhyUs');

  return (
    <>
      <div className="relative z-10">
        <HeroMain />
        <ServicesGrid />
        <WorksShowcase />
        <LogoMarquee />
        
        <section className="py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-20 relative z-10">
            <div className="order-2 lg:order-1 flex justify-center py-20 lg:py-0">
              <DisplayCards />
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                {t('title')}
              </h2>
              <p className="text-xl text-foreground/50 font-light leading-relaxed max-w-xl">
                {t('description')}
              </p>
              <div className="pt-4">
                <Link 
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-light text-white font-medium rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(109,40,217,0.3)]"
                >
                  {t('cta')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <TestimonialsSection />
        <LetsWorkSection />
      </div>
    </>
  );
}
