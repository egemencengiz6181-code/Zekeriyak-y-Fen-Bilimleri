import type { Metadata } from 'next';
import HeroMain from '@/components/ui/hero-main';
import ServicesGrid from '@/components/sections/ServicesGrid';
import { getTranslations } from 'next-intl/server';
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
  const origin = 'https://www.zekeriyakoyfenbilimleri.com';
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
              className="inline-flex items-center px-8 py-4 bg-[#ec2027] hover:bg-[#c8191f] text-white font-medium rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(236,32,39,0.3)]"
            >
              {t('cta')}
            </Link>
          </div>
        </section>

        {/* Fen Bilimleri Bölümü */}
        <SectionWithMockup
          badge="Fen Bilimleri"
          title={
            <>
              Sağlam Temel,<br />
              <span className="bg-gradient-to-r from-[#ec2027] via-[#f06060] to-[#fff] bg-clip-text text-transparent">
                Kanıtlanmış Başarı
              </span>
            </>
          }
          description="Fen Bilimleri, öğrencilerin lisans eğitimine yönelik temel bilimlerdeki sağlam temellerini atmak ve sınavlarda başarı göstermelerini sağlamak için kritik bir alandır. Dershanemiz bu alanda deneyimli öğretmen kadrosu ve zengin eğitim materyalleriyle öğrencilerin akademik seviyelerini yükseltmeye odaklanır. Sunduğumuz programlar öğrencilerin yalnızca teorik bilgi değil, aynı zamanda pratik becerilerini de geliştirerek sınavlarda yüksek başarı göstermelerini sağlar."
        />

        <TestimonialsSection />
        <LetsWorkSection />
      </div>
    </>
  );
}
