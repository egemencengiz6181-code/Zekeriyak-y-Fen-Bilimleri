'use client';

import React, { useCallback, useState } from 'react';
import { type LucideIcon, ArrowRight, BookOpen, GraduationCap, Trophy, FileText, Users, Star } from 'lucide-react';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';

const SLUG_ICONS: Record<string, LucideIcon> = {
  '6-sinif':        BookOpen,
  '7-sinif':        BookOpen,
  '8-sinif':        Trophy,
  '9-sinif':        BookOpen,
  '10-sinif':       BookOpen,
  '11-sinif':       GraduationCap,
  '12-sinif':       Trophy,
  'mezun':          GraduationCap,
  '8-sinif-vip':    Star,
  '12-sinif-vip':   Star,
  'deneme-kulubu':  FileText,
  'ozel-ders':      Users,
};

interface ServiceFlipCardProps {
  title: string;
  description: string;
  slug: string;
  href: string;
  features: string[];
}

/** Kart çevirme framer-motion spring yerine saf CSS transform — aynı görsel
 *  sonuç, ilk yüklemede sıfır JS kütüphanesi maliyeti. */
export default function ServiceFlipCard({ title, description, slug, href, features }: ServiceFlipCardProps) {
  const Icon = SLUG_ICONS[slug] ?? BookOpen;
  const [isFlipped, setIsFlipped] = useState(false);

  // Mobilde dokununca çevir; link'e dokunulduysa çevirmeyi atla
  const handleClick = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) return;
    setIsFlipped(v => !v);
  }, []);

  return (
    <div
      className="relative h-[420px] w-full perspective-1000 group cursor-pointer select-none"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={handleClick}
    >
      <div
        className={cn(
          'relative w-full h-full preserve-3d transition-transform duration-700 ease-out',
          isFlipped && 'flip-y-180',
        )}
      >
        {/* Ön yüz */}
        <div className="absolute inset-0 backface-hidden rounded-[32px] border border-black/10 dark:border-white/10 bg-gradient-to-br from-black/5 dark:from-white/5 to-primary/10 p-8 flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
            <Icon className="w-10 h-10 text-primary" />
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">{title}</h3>
          <div className="w-12 h-1 bg-primary/30 rounded-full group-hover:w-24 group-hover:bg-primary/60 transition-all duration-500" />

          <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/40 font-bold">
            <span className="hidden sm:inline">Keşfet</span>
            <span className="sm:hidden">Dokunun</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Arka yüz */}
        <div className="absolute inset-0 backface-hidden rounded-[32px] border border-primary/30 bg-background p-8 flex flex-col justify-between [transform:rotateY(180deg)]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{title}</h4>
            </div>

            <p className="text-sm text-foreground/60 leading-relaxed font-light">
              {description}
            </p>

            <ul className="space-y-3">
              {(features ?? []).map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={href}
            className="w-full py-4 rounded-2xl bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-colors text-center shadow-[0_0_20px_rgba(227,82,5,0.3)] flex items-center justify-center gap-2 group/btn"
          >
            <span>Detayları Gör</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
