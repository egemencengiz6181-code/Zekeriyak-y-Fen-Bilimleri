import { Link } from '@/navigation';
import React from 'react';
import { type LucideIcon, BookOpen, GraduationCap, Trophy, FileText, Users, Star, Award } from 'lucide-react';
import Reveal from '@/components/ui/reveal';

/**
 * Server component. Önceden 'use client' + framer-motion (`useMotionValue`,
 * `useSpring`) ile fare takip eden "magnetic" başlık efekti vardı; her fare
 * hareketinde spring hesabı yapıyordu. Kaldırıldı — çeviriler zaten sunucudan
 * prop olarak geliyor, sayfanın client JS'e ihtiyacı yok.
 */
const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  GraduationCap,
  Trophy,
  FileText,
  Users,
  Star,
  Award,
};

interface ServiceCardProps {
  slug: string;
  icon: string;
  span?: string;
  title: string;
  description: string;
  delay?: number;
}

export function ServiceCard({ slug, icon, span = 'col-span-1', title, description, delay = 0 }: ServiceCardProps) {
  const Icon = ICON_MAP[icon] ?? BookOpen;
  return (
    <Reveal delay={delay} className={`${span} group relative`}>
      <Link href={`/services/${slug}`} className="block h-full">
        <div className="relative h-full p-8 rounded-[32px] bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 overflow-hidden transition-colors duration-500 hover:border-primary/30">
          <div className="relative z-10 h-full flex flex-col">
            <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors duration-500">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors tracking-tight">
              {title}
            </h3>
            <p className="text-foreground/40 font-light leading-relaxed group-hover:text-foreground/70 transition-colors">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-12 relative">
      <div className="h-px w-[100px] bg-gradient-to-r from-primary to-transparent mb-6" />
      <h2 className="text-primary tracking-[0.4em] uppercase text-xs font-bold">{title}</h2>
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

export default function ServicesPageClient({
  pageTitle,
  pageSubtitle,
  sectionOrtaokul,
  sectionLise,
  sectionVip,
  sectionDestek,
  cards,
}: ServicesGridProps) {
  const groups = [
    { title: sectionOrtaokul, slugs: ['6-sinif', '7-sinif', '8-sinif'] },
    { title: sectionLise, slugs: ['9-sinif', '10-sinif', '11-sinif', '12-sinif', 'mezun'] },
    { title: sectionVip, slugs: ['8-sinif-vip', '12-sinif-vip'] },
    { title: sectionDestek, slugs: ['ozel-ders', 'deneme-kulubu'] },
  ];

  return (
    <div className="min-h-screen pt-40 pb-32 relative overflow-hidden bg-transparent z-10">
      <div className="absolute top-0 right-0 w-full h-[800px] bg-primary/5 rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-32">
          <h1 className="animate-fade-right text-6xl md:text-8xl font-bold mb-8 tracking-tighter">
            {pageTitle}
          </h1>
          <p className="animate-fade-right delay-2 text-2xl text-foreground/40 font-light max-w-2xl">
            {pageSubtitle}
          </p>
        </div>

        {groups.map((group, gi) => (
          <section key={group.title} className={gi === groups.length - 1 ? undefined : 'mb-32'}>
            <SectionHeader title={group.title} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cards
                .filter((c) => group.slugs.includes(c.slug))
                .map((card, i) => (
                  <ServiceCard key={card.slug} {...card} delay={i * 0.06} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
