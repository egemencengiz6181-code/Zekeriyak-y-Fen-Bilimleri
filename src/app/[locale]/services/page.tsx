'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import type { LucideIcon } from 'lucide-react';
import {
  BookOpen, GraduationCap, Trophy, FileText
} from 'lucide-react';
import React from 'react';
import Reveal from '@/components/ui/reveal';

const ServiceCard = ({ slug, icon: Icon, span = "col-span-1" }: { slug: string, icon: LucideIcon, span?: string }) => {
  const t = useTranslations('Services');
  
  return (
    <Reveal as="div" className={`${span} group relative`}>
      <Link href={`/services/${slug}`} className="block h-full">
          <div className="relative h-full p-8 rounded-[32px] bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 overflow-hidden transition-all duration-500 hover:border-primary/30">
          {/* Aurora Glow sızıntısı */}
          <div className="absolute -inset-20 bg-primary/20 rounded-full glow-soft opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />
          
          <div className="relative z-10 h-full flex flex-col">
            <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors duration-500">
              <Icon className="w-7 h-7 text-primary-light" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-light transition-colors tracking-tight">
              {t(`items.${slug}.title`)}
            </h3>
            
            <p className="text-foreground/40 font-light leading-relaxed group-hover:text-foreground/70 transition-colors">
              {t(`items.${slug}.description`)}
            </p>
          </div>
        </div>
      </Link>
    </Reveal>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <div className="mb-12 relative">
    <Reveal as="div" className="h-px bg-gradient-to-r from-primary to-transparent mb-6" />
    <h2 className="text-primary-light tracking-[0.4em] uppercase text-xs font-bold">{title}</h2>
  </div>
);

export default function ServicesPage() {
  const t = useTranslations('Services');

  return (
    <div className="min-h-screen pt-40 pb-32 relative overflow-hidden bg-transparent z-10">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-[800px] bg-primary/5 rounded-full glow-soft -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-32">
          <h1 className="enter-up text-6xl md:text-8xl font-bold mb-8 tracking-tighter">
            {t('title')}
          </h1>
          <p className="enter-up text-2xl text-foreground/40 font-light max-w-2xl">
            {t('subtitle')}
          </p>
        </div>

        {/* Ortaokul Programı */}
        <section className="mb-32">
          <SectionHeader title={t('sections.ortaokul')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard slug="7-sinif" icon={BookOpen} span="md:col-span-1" />
            <ServiceCard slug="8-sinif" icon={GraduationCap} span="md:col-span-2" />
          </div>
        </section>

        {/* Lise Programı */}
        <section className="mb-32">
          <SectionHeader title={t('sections.lise')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard slug="10-sinif" icon={BookOpen} span="md:col-span-1" />
            <ServiceCard slug="11-sinif" icon={FileText} span="md:col-span-1" />
            <ServiceCard slug="12-sinif" icon={Trophy} span="md:col-span-1" />
            <ServiceCard slug="mezun" icon={GraduationCap} span="md:col-span-2" />
            <ServiceCard slug="acik-lise" icon={BookOpen} span="md:col-span-1" />
          </div>
        </section>

        {/* Destek & Analiz */}
        <section>
          <SectionHeader title={t('sections.destek')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard slug="deneme-kulubu" icon={FileText} span="md:col-span-3" />
          </div>
        </section>
      </div>
    </div>
  );
}
