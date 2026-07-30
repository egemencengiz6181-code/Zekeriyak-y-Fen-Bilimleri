'use client';

import React from 'react';
import { FlaskConical, Trophy, Users, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Reveal from '@/components/ui/reveal';

interface SectionWithMockupProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  badge?: string;
}

/* ── Floating image component ──
   Eskiden framer-motion `useAnimation` + `useInView` ile sonsuz bir y
   animasyonu sürüyordu. Aynı efekt CSS keyframe ile yapılıyor: compositor'da
   çalışır, JS tarafında hiç iş yoktur ve `prefers-reduced-motion` ile durur. */
interface FloatCfg { distance: number; duration: number; delay?: number; }

function FloatingImage({
  src, className, float, children,
}: {
  src: string; className: string; float: FloatCfg; children?: React.ReactNode;
}) {
  return (
    <div
      className={`${className} motion-reduce:animate-none`}
      style={{
        animation: `float-y ${float.duration}s ease-in-out ${float.delay ?? 0}s infinite alternate`,
        ['--float-distance' as string]: `${float.distance}px`,
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 768px) 80vw, 40vw"
        className="object-cover object-center"
        loading="lazy"
      />
      {children}
    </div>
  );
}

const stats = [
  { icon: Trophy,        value: '15+',  label: 'Yıl Deneyim' },
  { icon: Users,         value: '500+', label: 'Mezun Öğrenci' },
  { icon: FlaskConical,  value: '%94',  label: 'Başarı Oranı' },
  { icon: BookOpen,      value: '7-12', label: 'Sınıf Aralığı' },
];

const SectionWithMockup: React.FC<SectionWithMockupProps> = ({ title, description, badge }) => {
  return (
    <section className="relative bg-white dark:bg-black overflow-hidden py-28 md:py-40">
      {/* Border lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full glow-soft bg-[#ec2027]/[0.06] " />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[480px] h-[480px] rounded-full glow-soft bg-[#12648f]/[0.08] " />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10">

        {/* ── Header ── */}
        <Reveal as="div" className="mb-16 md:mb-20">
          {badge && (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ec2027]/25 bg-[#ec2027]/10 text-[11px] font-bold tracking-[0.3em] uppercase text-[#ec2027] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ec2027] animate-pulse" />
              {badge}
            </span>
          )}
          <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold tracking-tighter leading-tight text-slate-900 dark:text-white max-w-2xl">
            {title}
          </h2>
        </Reveal>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── Left: floating image stack ── */}
          <Reveal as="div" className="relative h-[320px] sm:h-[420px] md:h-[480px] lg:h-[580px]">
            {/* Back image — okul3 */}
            <FloatingImage
              src="/okul2/okul3.jpg"
              float={{ distance: -14, duration: 9, delay: 0 }}
              className="absolute bottom-0 left-0 w-[74%] h-[72%] rounded-2xl overflow-hidden border border-white/[0.07] cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-transparent to-transparent" />
            </FloatingImage>

            {/* Front image — okul2 */}
            <FloatingImage
              src="/okul2/okul2.jpeg"
              float={{ distance: 10, duration: 7, delay: 1.2 }}
              className="absolute top-0 right-0 w-[70%] h-[78%] rounded-2xl overflow-hidden border border-white/[0.11] shadow-2xl cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/45" />
              <div className="absolute top-0 left-0 w-1 h-16 bg-gradient-to-b from-[#ec2027] to-transparent rounded-full" />
            </FloatingImage>

            {/* Floating stat badge */}
            <Reveal as="div" className="absolute bottom-4 right-2 sm:bottom-8 sm:right-2 md:-right-4 z-20 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/60 shadow-xl">
              <div className="w-9 h-9 rounded-xl bg-[#ec2027]/20 flex items-center justify-center shrink-0">
                <Trophy className="w-4 h-4 text-[#ec2027]" />
              </div>
              <div>
                <p className="text-slate-900 dark:text-white font-bold text-sm leading-none">%94 Başarı</p>
                <p className="text-slate-500 dark:text-white/40 text-xs mt-0.5">YKS Sınav Oranı</p>
              </div>
            </Reveal>

            {/* Red glow */}
            <div className="absolute bottom-0 left-1/4 w-1/2 h-16 bg-[#ec2027]/15 rounded-full glow-soft pointer-events-none" />
          </Reveal>

          {/* ── Right: text + stats ── */}
          <Reveal as="div" className="flex flex-col gap-8 lg:pt-4">
            <p className="text-slate-600 dark:text-white/55 text-base md:text-[17px] leading-[1.85] max-w-lg">
              {description}
            </p>

            <div className="h-px w-full bg-gradient-to-r from-[#ec2027]/30 via-white/10 to-transparent" />

            {/* Stats grid */}
            <Reveal as="div" className="grid grid-cols-2 gap-4">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="group relative flex flex-col gap-3 p-5 rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-black/[0.03] dark:bg-white/[0.03] hover:border-[#ec2027]/30 hover:bg-[#ec2027]/[0.04] transition-all duration-300 cursor-default">
                  <div className="w-9 h-9 rounded-xl bg-[#ec2027]/10 flex items-center justify-center group-hover:bg-[#ec2027]/20 transition-colors">
                    <Icon className="w-4 h-4 text-[#ec2027]" />
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white font-bold text-2xl leading-none">{value}</p>
                    <p className="text-slate-500 dark:text-white/40 text-xs mt-1">{label}</p>
                  </div>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#ec2027]/5 to-transparent pointer-events-none" />
                </div>
              ))}
            </Reveal>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default SectionWithMockup;
