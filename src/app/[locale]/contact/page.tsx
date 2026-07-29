'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
const LocationMap = dynamic(() => import('@/components/shared/LocationMap'), { ssr: false, loading: () => <div className="h-[450px] bg-background" /> });
const LetsWorkSection = dynamic(() => import('@/components/ui/lets-work-section'), { ssr: false, loading: () => <div className="h-64" /> });

export default function ContactPage() {
  const t = useTranslations('Contact');

  return (
    <div className="min-h-screen pt-40 pb-24 relative overflow-hidden bg-transparent z-10">
      {/* Soluk Arka Plan Mührü (Özel İletişim Sayfası İçin Yüksek Opasite) */}
      <div className="fixed top-[15%] right-[-250px] w-[900px] h-[900px] opacity-[0.12] rotate-12 pointer-events-none z-0">
        <Image 
          src="/logos/Sevinc-Kurs-Logo.png" 
          alt="" 
          fill 
          className="object-contain"
        />
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5  rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5  rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-slate-900 to-slate-900/40 dark:from-white dark:to-white/40 bg-clip-text text-transparent leading-tight"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-foreground/40 max-w-2xl mx-auto font-light"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-12">
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-accent-muted flex items-center justify-center border border-black/5 dark:border-white/5 transition-colors group-hover:bg-primary/20">
                  <MapPin className="w-6 h-6 text-primary-light" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t('info.address')}</h3>
                  <p className="text-foreground/40 font-light leading-relaxed">
                    Haznedar, Bahçelievler Mahallesi, Bağcılar Caddesi No:11, Bahçelievler/İstanbul
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-accent-muted flex items-center justify-center border border-black/5 dark:border-white/5 transition-colors group-hover:bg-primary/20">
                  <Phone className="w-6 h-6 text-primary-light" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t('info.phone')}</h3>
                  <div className="space-y-2">
                    <a href="tel:+902125054001" className="block text-foreground/40 font-light hover:text-primary-light transition-colors">
                      0(212) 505 40 01
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-accent-muted flex items-center justify-center border border-black/5 dark:border-white/5 transition-colors group-hover:bg-primary/20">
                  <Mail className="w-6 h-6 text-primary-light" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t('info.email')}</h3>
                  <a href="mailto:bahcelievlersevinckurs@gmail.com" className="text-foreground/40 font-light leading-relaxed hover:text-primary-light transition-colors block">
                    bahcelievlersevinckurs@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-10 rounded-[40px] bg-slate-100 dark:bg-accent-muted border border-black/10 dark:border-white/10 backdrop-blur-md relative"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/40 ml-1">{t('form.name')}</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-black/10 dark:border-white/10 focus:border-primary-light outline-none transition-colors font-light text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/40 ml-1">{t('form.email')}</label>
                  <input type="email" className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-black/10 dark:border-white/10 focus:border-primary-light outline-none transition-colors font-light text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/40 ml-1">{t('form.subject')}</label>
                <input type="text" className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-black/10 dark:border-white/10 focus:border-primary-light outline-none transition-colors font-light text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/40 ml-1">{t('form.message')}</label>
                <textarea rows={4} className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-black/10 dark:border-white/10 focus:border-primary-light outline-none transition-colors font-light text-sm resize-none"></textarea>
              </div>
              <button className="w-full py-5 bg-[#E35205] hover:bg-[#A03500] text-white font-medium rounded-2xl transition-all shadow-[0_0_20px_rgba(227,82,5,0.3)] hover:shadow-[0_0_30px_rgba(227,82,5,0.5)] flex items-center justify-center gap-2 group">
                {t('form.send')}
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      
      {/* Harita ve CTA */}
      <LocationMap />
      <LetsWorkSection />
    </div>
  );
}
