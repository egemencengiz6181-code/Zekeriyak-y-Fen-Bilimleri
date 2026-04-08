'use client';

import { useTranslations } from 'next-intl';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Trophy, Star, GraduationCap, BookOpen, ArrowUpRight, Medal, Flame } from 'lucide-react';
import dynamic from 'next/dynamic';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { useEffect, useRef, useState } from 'react';

const LetsWorkSection = dynamic(() => import('@/components/ui/lets-work-section'));
const TestimonialsSection = dynamic(() => import('@/components/sections/Testimonials'));

const successStories = [
  { icon: Trophy,        label: 'LGS 500 Net',        name: 'Elif K.',    school: 'Kabataş Erkek Lisesi',     year: '2025', color: '#ec2027', type: 'LGS', gridArea: '1/1/3/2' },
  { icon: GraduationCap, label: 'YKS — Tıp Fakültesi', name: 'Kerem A.',  school: 'İstanbul Üniversitesi',    year: '2025', color: '#12648f', type: 'YKS', gridArea: '1/2/2/3' },
  { icon: Star,          label: 'LGS 496 Net',         name: 'Selin T.',  school: 'Sarıyer Anadolu Lisesi',   year: '2024', color: '#ec2027', type: 'LGS', gridArea: '1/3/2/4' },
  { icon: GraduationCap, label: 'YKS — Hukuk',         name: 'Mert Ö.',   school: 'Galatasaray Üniversitesi', year: '2025', color: '#12648f', type: 'YKS', gridArea: '1/4/3/5' },
  { icon: BookOpen,      label: 'YKS — Mühendislik',   name: 'Can D.',    school: 'Boğaziçi Üniversitesi',   year: '2025', color: '#12648f', type: 'YKS', gridArea: '2/2/3/3' },
  { icon: Star,          label: 'LGS 493 Net',         name: 'İrem S.',   school: 'Arnavutköy Erkek Anadolu', year: '2024', color: '#ec2027', type: 'LGS', gridArea: '2/3/3/4' },
  { icon: Trophy,        label: 'YKS — Diş Hekimliği', name: 'Berk Y.',   school: 'Marmara Üniversitesi',    year: '2025', color: '#12648f', type: 'YKS', gridArea: '3/1/4/3' },
  { icon: GraduationCap, label: 'LGS — Fen Lisesi',    name: 'Ayşe N.',  school: 'Kadıköy Anadolu Lisesi',   year: '2024', color: '#ec2027', type: 'LGS', gridArea: '3/3/4/5' },
];

const stats = [
  { value: 200, suffix: '+', label: 'Başarılı Öğrenci', icon: Medal },
  { value: 98,  suffix: '%', label: 'Hedef Okul Oranı',  icon: Flame },
  { value: 12,  suffix: '+', label: 'Yıllık Deneyim',    icon: Star },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        animate(count, to, { duration: 2, ease: 'easeOut' });
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [count, to]);

  useEffect(() => rounded.on('change', setDisplay), [rounded]);

  return <span ref={ref}>{display}{suffix}</span>;
}

function StoryCard({ s, i }: { s: typeof successStories[0]; i: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-3xl p-[1px] cursor-default min-h-[14rem] list-none"
      style={{
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
        gridArea: s.gridArea,
      }}
    >
      {/* GlowingEffect border */}
      <div className="relative h-full rounded-3xl border border-black/[0.035] dark:border-white/[0.035]">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />

        {/* glass body */}
        <div
          className="relative h-full flex flex-col gap-5 p-6 rounded-3xl bg-black/[0.03] dark:bg-white/[0.03] backdrop-blur-xl transition-colors duration-500 overflow-hidden"
          style={{ backgroundColor: hovered ? `${s.color}08` : undefined }}
        >
          {/* top row */}
          <div className="flex items-start justify-between">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500"
              style={{
                backgroundColor: s.color + '18',
                border: `1px solid ${s.color}35`,
                transform: hovered ? 'scale(1.1) rotate(-4deg)' : 'scale(1) rotate(0deg)',
              }}
            >
              <s.icon className="w-6 h-6" style={{ color: s.color }} />
            </div>
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 6 }}
              transition={{ duration: 0.25 }}
            >
              <ArrowUpRight className="w-4 h-4 text-white/30" />
            </motion.div>
          </div>

          {/* type badge */}
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
              style={{ backgroundColor: s.color + '20', color: s.color }}
            >
              {s.type}
            </span>
            <span className="text-slate-400 dark:text-white/20 text-xs">{s.year}</span>
          </div>

          {/* content */}
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: s.color }}>
              {s.label}
            </p>
            <p className="text-slate-900 dark:text-white font-bold text-xl leading-tight mb-1">{s.name}</p>
            <p className="text-slate-500 dark:text-white/40 text-sm">{s.school}</p>
          </div>

          {/* glow line at bottom */}
          <div
            className="h-px w-full rounded-full transition-all duration-500"
            style={{
              background: `linear-gradient(to right, ${s.color}60, transparent)`,
              opacity: hovered ? 1 : 0.2,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function ReferencesPage() {
  const t = useTranslations('References');

  return (
    <div className="min-h-screen pt-40 pb-24 relative overflow-hidden bg-transparent z-10">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#ec2027]/6 blur-[160px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-[#12648f]/6 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ── BAŞLIK ── */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.04] dark:bg-white/[0.04] backdrop-blur-sm mb-8"
          >
            <Trophy className="w-3.5 h-3.5 text-[#ec2027]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500 dark:text-white/50">{t('subtitle')}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-900/30 dark:from-white dark:via-white dark:to-white/30 bg-clip-text text-transparent leading-none"
          >
            {t('title')}
          </motion.h1>
        </div>

        {/* ── STATS BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-3 gap-4 mb-20 max-w-2xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-black/[0.03] dark:bg-white/[0.03] backdrop-blur-xl p-5"
            >
              <stat.icon className="w-4 h-4 text-slate-400 dark:text-white/20 mb-1" />
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                <Counter to={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-slate-500 dark:text-white/35 text-xs text-center leading-tight">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* ── BAŞARI KARTLARI ── */}
        <ul
          className="hidden md:grid gap-4 mb-24"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(3, minmax(14rem, auto))' }}
        >
          {successStories.map((s, i) => (
            <StoryCard key={i} s={s} i={i} />
          ))}
        </ul>
        {/* mobile fallback — simple 1-col */}
        <div className="md:hidden flex flex-col gap-4 mb-24">
          {successStories.map((s, i) => (
            <StoryCard key={i} s={s} i={i} />
          ))}
        </div>
      </div>

      <TestimonialsSection />
      <LetsWorkSection />
    </div>
  );
}
