'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import LocationMap from '@/components/shared/LocationMap';
import LetsWorkSection from '@/components/ui/lets-work-section';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function AboutPage() {
  const t = useTranslations('About');
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden bg-transparent z-10">
      {/* Soluk Arka Plan Mührü */}
      <div className="fixed top-[15%] right-[-250px] w-[900px] h-[900px] opacity-[0.05] rotate-12 pointer-events-none z-0">
        <Image 
          src="/logos/Main_Simge_Beyaz.png" 
          alt="" 
          fill 
          className="object-contain"
          priority
        />
      </div>

      {/* İnce Partikül Arka Planı (CSS ile) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary-light rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-accent rounded-full animate-pulse delay-700" />
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-pulse delay-1000" />
      </div>

      <motion.section 
        className="h-screen flex items-center justify-center px-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-primary-light tracking-[0.3em] uppercase text-xs mb-6 block font-medium"
          >
            Renee DesignLab
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-gradient-to-b from-white via-white to-primary/20 bg-clip-text text-transparent leading-tight"
          >
            {t('hero_slogan')}
          </motion.h1>
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "100px" }}
            transition={{ delay: 1, duration: 1.5 }}
            className="w-px bg-gradient-to-b from-primary/50 to-transparent mx-auto mt-12"
          />
        </div>
      </motion.section>

      <motion.section 
        className="max-w-6xl mx-auto px-6 py-32 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="mb-40 text-center md:text-left" variants={fadeInUp}>
          <h2 className="text-primary-light text-sm tracking-widest uppercase mb-6 font-semibold">{t('title')}</h2>
          <h3 className="text-4xl md:text-6xl font-bold mb-10 leading-tight">
            {t('subtitle')}
          </h3>
          <p className="text-xl md:text-2xl text-foreground/50 max-w-4xl font-light leading-relaxed">
            {t('content')}
          </p>
        </motion.div>

        {/* Dinamik Vizyon/Misyon Sütunları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-48">
          {[
            { key: 'vision', color: 'from-primary/20' },
            { key: 'mission', color: 'from-accent/20' }
          ].map((item, i) => (
            <motion.div 
              key={item.key}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className={`absolute -inset-10 bg-gradient-to-b ${item.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl -z-10`} />
              <span className="text-6xl font-black text-white/5 absolute -top-10 -left-6 select-none group-hover:text-primary/10 transition-colors">0{i+1}</span>
              <h4 className="text-3xl font-bold mb-6 group-hover:text-primary-light transition-colors">{t(`${item.key}.title`)}</h4>
              <p className="text-lg text-foreground/40 font-light leading-relaxed group-hover:text-foreground/70 transition-colors">
                {t(`${item.key}.text`)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Premium Founder Bölümü */}
        <motion.div 
          className="relative py-32 border-t border-white/5 overflow-hidden group"
          variants={fadeInUp}
        >
          {/* Arka plan monogram */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-black text-white/[0.02] select-none pointer-events-none group-hover:text-primary/[0.03] transition-colors duration-1000">
            EC
          </div>
          
          <div className="relative flex flex-col items-center text-center">
            <motion.div 
              className="w-20 h-px bg-primary/30 mb-12"
              whileInView={{ width: "120px" }}
              transition={{ duration: 1.5 }}
            />
            <h2 className="text-4xl md:text-6xl font-serif italic mb-4 tracking-tight">Egemen Cengiz</h2>
            <p className="text-primary-light tracking-[0.5em] uppercase text-xs mb-10 font-bold">{t('founder.role')}</p>
            <p className="max-w-xl text-foreground/40 font-light text-lg leading-relaxed italic">
              "{t('founder.text')}"
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* Sayfa sonu geçişi ve Harita */}
      <LocationMap />
      <LetsWorkSection />
    </div>
  );
}
