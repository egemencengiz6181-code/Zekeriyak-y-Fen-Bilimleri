'use client';

import { useTranslations } from 'next-intl';
import LocationMap from '@/components/shared/LocationMap';
import LetsWorkSection from '@/components/ui/lets-work-section';
import Reveal from '@/components/ui/reveal';

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <div className="min-h-screen relative overflow-hidden bg-transparent z-10">
      {/* 900x900 arka plan logosu kaldırıldı — `fixed` olduğu için her
          scroll'da yeniden kompozit ediliyordu (mobil Safari'de takılma). */}

      {/* İnce Partikül Arka Planı (CSS ile) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary-light rounded-full" />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-accent rounded-full" />
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
      </div>

      <section className="h-screen flex items-center justify-center px-6 relative z-10">
        <div className="text-center">
          <span
            className="enter-up text-primary-light tracking-[0.3em] uppercase text-xs mb-6 block font-medium"
            style={{ animationDelay: '0.1s' }}
          >
            Zekeriyaköy Nazmi Arıkan Fen Bilimleri
          </span>
          <h1
            className="enter-up text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-gradient-to-b from-slate-900 via-slate-900 to-primary/20 dark:from-white dark:via-white dark:to-primary/20 bg-clip-text text-transparent leading-tight"
            style={{ animationDelay: '0.25s' }}
          >
            {t('hero_slogan')}
          </h1>
          <div
            className="enter-fade w-px h-[100px] bg-gradient-to-b from-primary/50 to-transparent mx-auto mt-12"
            style={{ animationDelay: '0.8s' }}
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-32 relative z-10">
        <Reveal className="mb-40 text-center md:text-left">
          <h2 className="text-primary-light text-sm tracking-widest uppercase mb-6 font-semibold">{t('title')}</h2>
          <h3 className="text-4xl md:text-6xl font-bold mb-10 leading-tight">
            {t('subtitle')}
          </h3>
          <p className="text-xl md:text-2xl text-foreground/50 max-w-4xl font-light leading-relaxed">
            {t('content')}
          </p>
        </Reveal>

        {/* Dinamik Vizyon/Misyon Sütunları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-48">
          {[
            { key: 'vision', color: 'from-primary/20' },
            { key: 'mission', color: 'from-accent/20' }
          ].map((item, i) => (
            <Reveal
              key={item.key}
              delay={i * 0.12}
              className="group relative transition-transform duration-500 hover:-translate-y-2.5"
            >
              <div className={`absolute -inset-10 bg-gradient-to-b ${item.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 glow-soft rounded-full -z-10`} />
              <span className="text-6xl font-black text-black/5 dark:text-white/5 absolute -top-10 -left-6 select-none group-hover:text-primary/10 transition-colors">0{i+1}</span>
              <h4 className="text-3xl font-bold mb-6 group-hover:text-primary-light transition-colors">{t(`${item.key}.title`)}</h4>
              <p className="text-lg text-foreground/40 font-light leading-relaxed group-hover:text-foreground/70 transition-colors">
                {t(`${item.key}.text`)}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Premium Founder Bölümü */}
        <Reveal className="relative py-32 border-t border-black/5 dark:border-white/5 overflow-hidden group">
          {/* Arka plan monogram */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-black text-black/[0.02] dark:text-white/[0.02] select-none pointer-events-none group-hover:text-primary/[0.03] transition-colors duration-1000">
            NA
          </div>

          <div className="relative flex flex-col items-center text-center">
            <div className="w-20 h-px bg-primary/30 mb-12 transition-all duration-1000 group-hover:w-[120px]" />
            <h2 className="text-4xl md:text-6xl font-serif italic mb-4 tracking-tight">Nazmi Arıkan</h2>
            <p className="text-primary-light tracking-[0.5em] uppercase text-xs mb-10 font-bold">{t('founder.role')}</p>
            <p className="max-w-xl text-foreground/40 font-light text-lg leading-relaxed italic">
              “{t('founder.text')}”
            </p>
          </div>
        </Reveal>
      </section>

      {/* Sayfa sonu geçişi ve Harita */}
      <LocationMap />
      <LetsWorkSection />
    </div>
  );
}
