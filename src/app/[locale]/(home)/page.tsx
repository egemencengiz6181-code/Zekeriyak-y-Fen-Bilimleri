import type { Metadata } from 'next';
import { ogImages } from '@/config/site';
import HeroMain from '@/components/ui/hero-main';
import ServicesGrid from '@/components/sections/ServicesGrid';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const TestimonialsSection = dynamic(() => import('@/components/sections/Testimonials'));
const LetsWorkSection = dynamic(() => import('@/components/ui/lets-work-section'));
const SectionWithMockup = dynamic(() => import('@/components/ui/section-with-mockup'));
const ShimmerText = dynamic(() => import('@/components/ui/shimmer-text'));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Index' });
  const origin = 'https://www.bahcelievlersevinc.com';
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${origin}/${locale}`,
      languages: { tr: `${origin}/tr` },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${origin}/${locale}`,
      locale: 'tr_TR',
      images: ogImages,
    },
    twitter: {
      title: t('title'),
      description: t('description'),
      images: ogImages,
    },
  };
}

export default async function IndexPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale); // statik render için gerekli
  const t = await getTranslations('WhyUs');
  const tt = await getTranslations('Testimonials');
  const testimonialItems = tt.raw('items') as { name: string; role: string; text: string }[];
  const testimonialsTitle = tt('title');
  const testimonialsSubtitle = tt('subtitle');

  return (
    <>
      <div className="relative z-10">
        <HeroMain />
        <ServicesGrid />

        {/* Neden Biz */}
        <section className="py-32 relative overflow-hidden">
          {/* Watermark arka plan yazısı */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
            <ShimmerText className="text-[clamp(4rem,14vw,11rem)] font-black tracking-tighter leading-none uppercase">
              KANITLANMIŞ BAŞARI
            </ShimmerText>
          </div>
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-4">{t('title')}</h2>
            <p className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight text-slate-900 dark:text-white mb-8">
              {t('description')}
            </p>
            <Link 
              href={`/${locale}/contact`}
              className="inline-flex items-center px-8 py-4 bg-[#E21F26] hover:bg-[#BE1821] text-white font-medium rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(226,31,38,0.3)]"
            >
              {t('cta')}
            </Link>
          </div>
        </section>

        {/* YKS Programları Bölümü */}
        <SectionWithMockup
          badge="YKS Programları"
          title={
            <>
              Sağlam Temel,<br />
              {/* Gradient eskiden #fff ile bitiyordu — bölümün zemini açık temada
                  beyaz olduğu için başlığın sonu görünmez oluyordu. */}
              <span className="bg-gradient-to-r from-[#E21F26] via-[#E65F5F] to-[#2E3192] bg-clip-text text-transparent">
                Kanıtlanmış Başarı
              </span>
            </>
          }
          description="Bahçelievler Sevinç Dershanesi, 9. sınıftan mezun seviyesine kadar öğrencilerin YKS’de hedef üniversitelerine ulaşmalarını sağlamak için deneyimli öğretmen kadrosu ve zengin eğitim materyalleriyle akademik seviyelerini yükseltmeye odaklanır. Sunduğumuz programlar öğrencilerin yalnızca teorik bilgi değil, aynı zamanda pratik becerilerini de geliştirerek sınavlarda yüksek başarı göstermelerini sağlar."
        />

        <TestimonialsSection items={testimonialItems} title={testimonialsTitle} subtitle={testimonialsSubtitle} />
        <LetsWorkSection />
      </div>
    </>
  );
}
