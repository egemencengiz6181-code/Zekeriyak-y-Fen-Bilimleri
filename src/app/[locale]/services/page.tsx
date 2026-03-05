'use client';

import { useTranslations } from 'next-intl';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from '@/navigation';
import { 
  Search, Target, Share2, Code, 
  Globe, Camera, Palette, Megaphone 
} from 'lucide-react';
import React from 'react';

const MagneticContent = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

const ServiceCard = ({ slug, icon: Icon, span = "col-span-1" }: { slug: string, icon: any, span?: string }) => {
  const t = useTranslations('Services');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${span} group relative`}
    >
      <Link href={`/services/${slug}`} className="block h-full">
        <div className="relative h-full p-8 rounded-[32px] bg-white/[0.02] backdrop-blur-xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-primary/30">
          {/* Aurora Glow sızıntısı */}
          <div className="absolute -inset-20 bg-primary/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />
          
          <div className="relative z-10 h-full flex flex-col">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors duration-500">
              <Icon className="w-7 h-7 text-primary-light" />
            </div>
            
            <MagneticContent>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-light transition-colors tracking-tight">
                {t(`items.${slug}.title`)}
              </h3>
            </MagneticContent>
            
            <p className="text-foreground/40 font-light leading-relaxed group-hover:text-foreground/70 transition-colors">
              {t(`items.${slug}.description`)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <div className="mb-12 relative">
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: "100px" }}
      viewport={{ once: true }}
      className="h-px bg-gradient-to-r from-primary to-transparent mb-6"
    />
    <h2 className="text-primary-light tracking-[0.4em] uppercase text-xs font-bold">{title}</h2>
  </div>
);

export default function ServicesPage() {
  const t = useTranslations('Services');

  return (
    <div className="min-h-screen pt-40 pb-32 relative overflow-hidden bg-transparent z-10">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-[800px] bg-primary/5 blur-[150px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-32">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter"
          >
            {t('title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-foreground/40 font-light max-w-2xl"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Strateji Bölümü */}
        <section className="mb-32">
          <SectionHeader title={t('sections.strategy')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard slug="seo" icon={Search} span="md:col-span-1" />
            <ServiceCard slug="pr" icon={Megaphone} span="md:col-span-2" />
          </div>
        </section>

        {/* Tasarım Bölümü */}
        <section className="mb-32">
          <SectionHeader title={t('sections.design')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard slug="web-design" icon={Code} span="md:col-span-2" />
            <ServiceCard slug="design" icon={Palette} span="md:col-span-1" />
            <ServiceCard slug="production" icon={Camera} span="md:col-span-3" />
          </div>
        </section>

        {/* Performans Bölümü */}
        <section>
          <SectionHeader title={t('sections.performance')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard slug="google-ads" icon={Target} span="md:col-span-1" />
            <ServiceCard slug="meta-ads" icon={Share2} span="md:col-span-1" />
            <ServiceCard slug="social-media" icon={Globe} span="md:col-span-1" />
          </div>
        </section>
      </div>
    </div>
  );
}
