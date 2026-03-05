'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import LetsWorkSection from '@/components/ui/lets-work-section';

const logoNumbers = Array.from({ length: 34 }, (_, i) => i + 1);

export default function ReferencesPage() {
  const t = useTranslations('References');

  return (
    <div className="min-h-screen pt-40 pb-24 relative overflow-hidden bg-transparent z-10">
      {/* Arka plan süslemesi */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent"
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

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center mb-32">
          {logoNumbers.map((num) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (num % 10) * 0.05 }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(109, 40, 217, 0.05)",
                borderColor: "rgba(109, 40, 217, 0.2)"
              }}
              className="aspect-[3/2] rounded-2xl bg-accent-muted border border-white/5 flex items-center justify-center p-6 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-500 cursor-pointer group relative"
            >
              {/* Parlama Efekti */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-primary/10 -z-10" />
              
              <div className="relative w-full h-full">
                <Image
                  src={`/logos/${num}.png`}
                  alt={`Partner Logo ${num}`}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <LetsWorkSection />
    </div>
  );
}
