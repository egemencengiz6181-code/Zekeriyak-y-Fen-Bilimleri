import Image from 'next/image';
import { Link } from '@/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, Cpu, MessageCircle } from 'lucide-react';
import { HeroHighlight } from '@/components/ui/hero-highlight';
import Reveal from '@/components/ui/reveal';
import dynamic from 'next/dynamic';

/**
 * Server component (önceden 'use client' + framer-motion). Tüm metinler zaten
 * prop olarak geliyordu; sadece giriş animasyonları için client'a taşınmıştı.
 */
const MarketingBadges = dynamic(() => import('@/components/ui/marketing-badges'));
const LetsWorkSection = dynamic(() => import('@/components/ui/lets-work-section'));

function PhaseCard({ title, text, index }: { title: string; text: string; index: number }) {
  const num = String(index + 1).padStart(2, '0');
  return (
    <Reveal
      delay={index * 0.1}
      className="relative p-8 rounded-3xl border border-black/5 dark:border-white/5 bg-black/[0.03] dark:bg-white/[0.03] hover:border-[#E35205]/20 transition-colors duration-500 group"
    >
      <div className="text-7xl font-black text-black/[0.04] dark:text-white/[0.04] group-hover:text-[#E35205]/10 transition-colors duration-500 absolute top-4 right-6 leading-none select-none">
        {num}
      </div>
      <div className="w-8 h-[2px] bg-gradient-to-r from-[#E35205] to-[#A03500] rounded-full mb-6" />
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 pr-8 leading-snug">{title}</h3>
      <p className="text-foreground/45 leading-relaxed text-sm">{text}</p>
    </Reveal>
  );
}

function ToolBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#E35205]/10 border border-[#E35205]/20 text-[#E35205] whitespace-nowrap">
      <Cpu className="w-3 h-3" />
      {label}
    </span>
  );
}

interface Props {
  slug: string;
  images: { hero: string; tech: string; alt: string };
  i18n: {
    title: string;
    back: string;
    scope: string;
    strategy_section: string;
    tech_section: string;
    discovery_title: string;
    about_suffix: string;
    cta: string;
    item_title: string;
    hero_quote: string;
    intro: string;
    body: string;
    strategy_title: string;
    phase1_title: string;
    phase1_text: string;
    phase2_title: string;
    phase2_text: string;
    phase3_title: string;
    phase3_text: string;
    result_title: string;
    result_text: string;
    tech_title: string;
    tech_intro: string;
    tools: string[];
    features: string[];
  };
}

export default function ServiceSlugContent({ images, i18n }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Geri navigasyonu */}
      <div className="max-w-5xl mx-auto px-6 pt-36 pb-0">
        <div className="animate-fade-right">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-foreground/40 hover:text-[#E35205] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {i18n.back}
          </Link>
        </div>
      </div>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-24">
        <div className="animate-fade-up flex items-center gap-3 mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#E35205]">{i18n.title}</span>
          <span className="flex-1 h-px bg-gradient-to-r from-[#E35205]/40 to-transparent" />
        </div>

        <h1 className="animate-fade-up delay-1 text-5xl md:text-7xl font-bold tracking-tighter leading-[1.04] bg-gradient-to-b from-slate-900 to-slate-900/50 dark:from-white dark:to-white/50 bg-clip-text text-transparent mb-10">
          {i18n.item_title}
        </h1>

        <HeroHighlight containerClassName="w-full mb-14 border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
          <blockquote className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-foreground/65">
              {i18n.hero_quote}
            </p>
          </blockquote>
        </HeroHighlight>

        <div className="animate-fade-up delay-2 relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-black/5 dark:border-white/5">
          <Image
            src={images.hero}
            alt={images.alt}
            fill
            priority
            quality={70}
            className="object-cover opacity-65"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
          <div className="absolute bottom-8 left-8">
            <div className="px-4 py-2 rounded-xl bg-background/90 border border-black/10 dark:border-white/10 inline-flex">
              <span className="text-sm font-bold text-slate-900 dark:text-white">{i18n.item_title}</span>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 items-start">
          <Reveal
            as="aside"
            className="lg:sticky lg:top-32 p-8 rounded-3xl border border-black/5 dark:border-white/5 bg-black/[0.03] dark:bg-white/[0.03]"
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#E35205] mb-6">{i18n.scope}</h3>
            <ul className="space-y-3">
              {i18n.features?.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-foreground/55">
                  <CheckCircle2 className="w-4 h-4 text-[#E35205] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-8 border-t border-black/5 dark:border-white/5">
              <a
                href="tel:+902125054001"
                className="group flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl bg-[#E35205] hover:bg-[#A03500] text-white font-semibold text-sm transition-colors active:scale-[0.98] shadow-[0_0_24px_rgba(227,82,5,0.35)]"
              >
                <MessageCircle className="w-4 h-4" />
                {i18n.cta}
                <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white mb-8 leading-snug">
              {i18n.item_title} {i18n.about_suffix}
            </h2>
            <p className="text-foreground/55 leading-[1.9] text-lg font-light mb-8">{i18n.intro}</p>
            <p className="text-foreground/38 leading-[1.9] text-base font-light">{i18n.body}</p>
          </Reveal>
        </div>
      </section>

      {/* STRATEJİ */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        <Reveal className="mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#E35205] block mb-3">
            {i18n.strategy_section}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white">
            {i18n.strategy_title}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PhaseCard title={i18n.phase1_title} text={i18n.phase1_text} index={0} />
          <PhaseCard title={i18n.phase2_title} text={i18n.phase2_text} index={1} />
          <PhaseCard title={i18n.phase3_title} text={i18n.phase3_text} index={2} />
        </div>
      </section>

      {/* YÖNTEM */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <Reveal className="relative aspect-square rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 order-2 lg:order-1">
            <Image
              src={images.tech}
              alt=""
              fill
              quality={60}
              className="object-cover opacity-55"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#E35205]/20 to-background/70" />
            <div className="absolute bottom-6 left-6 px-4 py-2 rounded-xl bg-background/90 border border-black/10 dark:border-white/10 inline-flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#E35205]" />
              <span className="text-xs font-semibold text-[#E35205]">{i18n.tech_section}</span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#E35205] block mb-3">
              {i18n.tech_section}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white mb-6 leading-snug">
              {i18n.tech_title}
            </h2>
            <p className="text-foreground/50 leading-relaxed mb-8 text-base">{i18n.tech_intro}</p>
            <div className="flex flex-wrap gap-2">
              {i18n.tools.map((tool) => (
                <ToolBadge key={tool} label={tool.trim()} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* DİĞER PROGRAMLAR */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-black/5 dark:border-white/5">
        <Reveal className="text-center mb-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-foreground/30">
            {i18n.discovery_title}
          </h2>
        </Reveal>
        <MarketingBadges />
      </section>

      <LetsWorkSection />
    </div>
  );
}
