'use client';

import { use } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, Cpu, MessageCircle } from 'lucide-react';
import { HeroHighlight } from '@/components/ui/hero-highlight';
import MarketingBadges from '@/components/ui/marketing-badges';
import LetsWorkSection from '@/components/ui/lets-work-section';

// ─── Per-slug Unsplash visuals ────────────────────────────────────────────────
const slugImages: Record<string, { hero: string; tech: string; alt: string }> = {
  seo: {
    hero: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80',
    tech: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80',
    alt: 'SEO analytics data visualization',
  },
  'google-ads': {
    hero: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1400&q=80',
    tech: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80',
    alt: 'Google Ads performance dashboard',
  },
  'meta-ads': {
    hero: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1400&q=80',
    tech: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1400&q=80',
    alt: 'Social media advertising campaign',
  },
  'web-design': {
    hero: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1400&q=80',
    tech: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1400&q=80',
    alt: 'Modern web design interface and code',
  },
  'social-media': {
    hero: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1400&q=80',
    tech: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1400&q=80',
    alt: 'Social media content strategy',
  },
  production: {
    hero: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1400&q=80',
    tech: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80',
    alt: 'Professional video production set',
  },
  design: {
    hero: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&q=80',
    tech: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&q=80',
    alt: 'Brand identity and graphic design',
  },
  pr: {
    hero: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1400&q=80',
    tech: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=80',
    alt: 'Digital PR and media relations',
  },
};

const defaultImages = {
  hero: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80',
  tech: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1400&q=80',
  alt: 'Digital agency services',
};

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Phase Card ───────────────────────────────────────────────────────────────
function PhaseCard({
  title,
  text,
  index,
}: {
  title: string;
  text: string;
  index: number;
}) {
  const num = String(index + 1).padStart(2, '0');
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative p-8 rounded-3xl border border-white/5 bg-white/[0.03] backdrop-blur-sm hover:border-violet-500/20 hover:bg-white/[0.05] transition-all duration-500 group"
    >
      <div className="text-7xl font-black text-white/[0.04] group-hover:text-violet-500/10 transition-colors duration-500 absolute top-4 right-6 leading-none select-none">
        {num}
      </div>
      <div className="w-8 h-[2px] bg-gradient-to-r from-violet-500 to-purple-400 rounded-full mb-6" />
      <h3 className="text-base font-bold text-white mb-4 pr-8 leading-snug">{title}</h3>
      <p className="text-foreground/45 leading-relaxed text-sm">{text}</p>
    </motion.div>
  );
}

// ─── Tool Badge ───────────────────────────────────────────────────────────────
function ToolBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-violet-500/10 border border-violet-500/20 text-violet-300 whitespace-nowrap">
      <Cpu className="w-3 h-3" />
      {label}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const t = useTranslations('Services');

  const images = slugImages[slug] ?? defaultImages;
  const toolsRaw = t(`items.${slug}.tech_tools`) as string;
  const tools = toolsRaw.split(' · ');
  const features = t.raw(`items.${slug}.features`) as string[];

  const rawQuote = t(`items.${slug}.hero_quote`) as string;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── AMBIENT GLOW ─────────────────────────────────────────────── */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-violet-600/8 blur-[180px] rounded-full pointer-events-none -z-10" />

      {/* ── BACK NAV ─────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 pt-36 pb-0">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-foreground/40 hover:text-violet-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t('back')}
          </Link>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          § 1  HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-24">
        {/* eyebrow */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-3 mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">{t('title')}</span>
          <span className="flex-1 h-px bg-gradient-to-r from-violet-500/40 to-transparent" />
        </motion.div>

        {/* H1 */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.04] bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent mb-10"
        >
          {t(`items.${slug}.title`)}
        </motion.h1>

        {/* HeroHighlight quote */}
        <HeroHighlight containerClassName="w-full mb-14 border border-white/5 bg-white/[0.02]">
          <blockquote className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-foreground/65">
              {rawQuote}
            </p>
          </blockquote>
        </HeroHighlight>

        {/* Hero image */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-white/5"
        >
          <Image
            src={images.hero}
            alt={images.alt}
            fill
            className="object-cover opacity-65"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
          {/* Floating service title on image */}
          <div className="absolute bottom-8 left-8">
            <div className="px-4 py-2 rounded-xl bg-background/80 backdrop-blur-md border border-white/10 inline-flex">
              <span className="text-sm font-bold text-white">{t(`items.${slug}.title`)}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          § 2  INTRO — sidebar + body
      ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 items-start">
          {/* Sticky sidebar — features + CTA */}
          <motion.aside
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:sticky lg:top-32 p-8 rounded-3xl border border-white/5 bg-white/[0.03] backdrop-blur-sm"
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-violet-400 mb-6">{t('scope')}</h3>
            <ul className="space-y-3">
              {features?.map((f: string) => (
                <li key={f} className="flex items-center gap-3 text-sm text-foreground/55">
                  <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-8 border-t border-white/5">
              <a
                href="https://wa.me/905325046606"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_24px_rgba(124,58,237,0.35)]"
              >
                <MessageCircle className="w-4 h-4" />
                {t('cta')}
                <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
              </a>
            </div>
          </motion.aside>

          {/* Main body text */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-8 leading-snug">
              {t(`items.${slug}.title`)} {t('about_suffix')}
            </h2>
            <p className="text-foreground/55 leading-[1.9] text-lg font-light mb-8">
              {t(`items.${slug}.intro`)}
            </p>
            <p className="text-foreground/38 leading-[1.9] text-base font-light">
              {t(`items.${slug}.body`)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          § 3  STRATEGY — 3 phases
      ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400 block mb-3">{t('strategy_section')}</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">{t(`items.${slug}.strategy_title`)}</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PhaseCard title={t(`items.${slug}.phase1_title`)} text={t(`items.${slug}.phase1_text`)} index={0} />
          <PhaseCard title={t(`items.${slug}.phase2_title`)} text={t(`items.${slug}.phase2_text`)} index={1} />
          <PhaseCard title={t(`items.${slug}.phase3_title`)} text={t(`items.${slug}.phase3_text`)} index={2} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          § 4  TECHNOLOGY — image + tools
      ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Tech image */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative aspect-square rounded-3xl overflow-hidden border border-white/5 order-2 lg:order-1"
          >
            <Image
              src={images.tech}
              alt={`${t(`items.${slug}.title`)} technology`}
              fill
              className="object-cover opacity-55"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/50 to-background/70" />
            <div className="absolute bottom-6 left-6 px-4 py-2 rounded-xl bg-background/80 backdrop-blur-md border border-white/10 inline-flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-xs font-semibold text-violet-300">{t('tech_section')}</span>
            </div>
          </motion.div>

          {/* Tech text + badges */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400 block mb-3">{t('tech_section')}</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-6 leading-snug">
              {t(`items.${slug}.tech_title`)}
            </h2>
            <p className="text-foreground/50 leading-relaxed mb-8 text-base">
              {t(`items.${slug}.tech_intro`)}
            </p>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <ToolBadge key={tool} label={tool.trim()} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          § 5  DISCOVERY
      ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-foreground/30">{t('discovery_title')}</h2>
        </motion.div>
        <MarketingBadges />
      </section>

      <LetsWorkSection />
    </div>
  );
}
