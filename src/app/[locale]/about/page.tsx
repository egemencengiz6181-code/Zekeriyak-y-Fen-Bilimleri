'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Reveal from '@/components/ui/reveal';

const LocationMap = dynamic(() => import('@/components/shared/LocationMap'), {
  ssr: false,
  loading: () => <div className="h-[450px] bg-background" />,
});
const LetsWorkSection = dynamic(() => import('@/components/ui/lets-work-section'), {
  ssr: false,
  loading: () => <div className="h-64" />,
});

const columns = [
  { key: 'vision', color: 'from-primary/20' },
  { key: 'mission', color: 'from-accent/20' },
] as const;

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <div className="min-h-screen relative overflow-hidden bg-transparent z-10">
      <section className="min-h-[85vh] flex items-center justify-center px-6 relative z-10">
        <div className="text-center">
          <span className="animate-fade-up text-primary tracking-[0.3em] uppercase text-xs mb-6 block font-medium">
            Bahçelievler Sevinç Dershanesi
          </span>
          <h1 className="animate-fade-up delay-1 text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-gradient-to-b from-slate-900 via-slate-900 to-primary/30 dark:from-white dark:via-white dark:to-primary/30 bg-clip-text text-transparent leading-tight">
            {t('hero_slogan')}
          </h1>
          <div className="animate-fade-in delay-3 w-px h-[100px] bg-gradient-to-b from-primary/50 to-transparent mx-auto mt-12" />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-32 relative z-10">
        <Reveal className="mb-40 text-center md:text-left">
          <h2 className="text-primary text-sm tracking-widest uppercase mb-6 font-semibold">{t('title')}</h2>
          <h3 className="text-4xl md:text-6xl font-bold mb-10 leading-tight">{t('subtitle')}</h3>
          <p className="text-xl md:text-2xl text-foreground/50 max-w-4xl font-light leading-relaxed">
            {t('content')}
          </p>
        </Reveal>

        {/* Vizyon / Misyon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-48">
          {columns.map((item, i) => (
            <Reveal
              key={item.key}
              delay={i * 0.12}
              className="group relative transition-transform duration-500 hover:-translate-y-2"
            >
              <div
                className={`absolute -inset-10 bg-gradient-to-b ${item.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`}
              />
              <span className="text-6xl font-black text-black/5 dark:text-white/5 absolute -top-10 -left-6 select-none group-hover:text-primary/10 transition-colors">
                0{i + 1}
              </span>
              <h4 className="text-3xl font-bold mb-6 group-hover:text-primary transition-colors">
                {t(`${item.key}.title`)}
              </h4>
              <p className="text-lg text-foreground/40 font-light leading-relaxed group-hover:text-foreground/70 transition-colors">
                {t(`${item.key}.text`)}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <LocationMap />
      <LetsWorkSection />
    </div>
  );
}
