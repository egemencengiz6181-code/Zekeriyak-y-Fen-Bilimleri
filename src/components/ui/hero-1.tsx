'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MessageCircle, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const t = useTranslations('Hero');

  const handleCTA = () => {
    window.open("https://wa.me/905325046606", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">
      {/* Premium Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Radial Accent Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-xs font-bold text-primary-light uppercase tracking-[0.2em]">
            {t('eyebrow', { defaultValue: 'Geleceğin Dijital Standartları' })}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-tight mb-8 bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent"
        >
          {t('title', { defaultValue: 'Dijital Sanatı Veriyle Harmanlıyoruz' })}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-xl md:text-2xl text-foreground/50 font-light mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          {t('subtitle', { defaultValue: 'Renee DesignLab, yaratıcı bir laboratuvar titizliğiyle markanızı dijitalin zirvesine taşır.' })}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 items-center justify-center"
        >
          <button
            onClick={handleCTA}
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-primary text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(109,40,217,0.3)] hover:shadow-[0_0_40px_rgba(109,40,217,0.6)]"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{t('cta', { defaultValue: 'Laboratuvarı Keşfedin' })}</span>
          </button>

          <a
            href="#services"
            className="flex items-center gap-2 text-foreground/40 hover:text-white transition-all group font-medium"
          >
            <span>Hizmetler</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
