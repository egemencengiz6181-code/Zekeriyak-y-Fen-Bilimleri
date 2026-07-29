'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from '@/navigation';
import React from 'react';
import { type LucideIcon, BookOpen, GraduationCap, Trophy, FileText, Users, Star, Award } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  GraduationCap,
  Trophy,
  FileText,
  Users,
  Star,
  Award,
};

// Lightweight magnetic wrapper — only used on desktop hover
const MagneticContent = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.2);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ x: springX, y: springY }}>
      {children}
    </motion.div>
  );
};

interface ServiceCardProps {
  slug: string;
  icon: string;
  span?: string;
  title: string;
  description: string;
}

export function ServiceCard({ slug, icon, span = 'col-span-1', title, description }: ServiceCardProps) {
  const Icon = ICON_MAP[icon] ?? BookOpen;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${span} group relative`}
    >
      <Link href={`/services/${slug}`} className="block h-full">
        <div className="relative h-full p-8 rounded-[32px] bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-xl border border-black/5 dark:border-white/5 overflow-hidden transition-all duration-500 hover:border-primary/30">
          <div className="absolute -inset-20 bg-primary/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />
          <div className="relative z-10 h-full flex flex-col">
            <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors duration-500">
              <Icon className="w-7 h-7 text-primary-light" />
            </div>
            <MagneticContent>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-light transition-colors tracking-tight">
                {title}
              </h3>
            </MagneticContent>
            <p className="text-foreground/40 font-light leading-relaxed group-hover:text-foreground/70 transition-colors">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-12 relative">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '100px' }}
        viewport={{ once: true }}
        className="h-px bg-gradient-to-r from-primary to-transparent mb-6"
      />
      <h2 className="text-primary-light tracking-[0.4em] uppercase text-xs font-bold">{title}</h2>
    </div>
  );
}

interface ServicesGridProps {
  pageTitle: string;
  pageSubtitle: string;
  sectionOrtaokul: string;
  sectionLise: string;
  sectionVip: string;
  sectionDestek: string;
  cards: Array<{ slug: string; icon: string; span?: string; title: string; description: string }>;
}

export default function ServicesPageClient({ pageTitle, pageSubtitle, sectionOrtaokul, sectionLise, sectionVip, sectionDestek, cards }: ServicesGridProps) {
  const ortaokul = cards.filter(c => ['6-sinif','7-sinif','8-sinif'].includes(c.slug));
  const lise = cards.filter(c => ['9-sinif','10-sinif','11-sinif','12-sinif','mezun'].includes(c.slug));
  const vip = cards.filter(c => ['8-sinif-vip','12-sinif-vip'].includes(c.slug));
  const destek = cards.filter(c => ['ozel-ders','deneme-kulubu'].includes(c.slug));

  return (
    <div className="min-h-screen pt-40 pb-32 relative overflow-hidden bg-transparent z-10">
      <div className="absolute top-0 right-0 w-full h-[800px] bg-primary/5 blur-[150px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-32">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter"
          >
            {pageTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-foreground/40 font-light max-w-2xl"
          >
            {pageSubtitle}
          </motion.p>
        </div>

        <section className="mb-32">
          <SectionHeader title={sectionOrtaokul} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ortaokul.map((card) => (
              <ServiceCard key={card.slug} {...card} />
            ))}
          </div>
        </section>

        <section className="mb-32">
          <SectionHeader title={sectionLise} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lise.map((card) => (
              <ServiceCard key={card.slug} {...card} />
            ))}
          </div>
        </section>

        <section className="mb-32">
          <SectionHeader title={sectionVip} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vip.map((card) => (
              <ServiceCard key={card.slug} {...card} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title={sectionDestek} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destek.map((card) => (
              <ServiceCard key={card.slug} {...card} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
