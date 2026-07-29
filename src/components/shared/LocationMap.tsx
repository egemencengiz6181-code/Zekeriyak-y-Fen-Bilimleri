'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function LocationMap() {
  return (
    <section className="w-full h-[450px] relative overflow-hidden group bg-background">
      <iframe
        src="https://maps.google.com/maps?q=%C5%9Eirinevler%2C+H%C3%BCrriyet+Mahallesi%2C+Mahmutbey+Caddesi%2C+No%3A5%2C+Bah%C3%A7elievler%2F%C4%B0stanbul&t=&z=16&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'grayscale(1) contrast(1.2) invert(0.9)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="transition-all duration-1000 group-hover:grayscale-0 group-hover:invert-0 group-hover:contrast-100"
        title="Şirinevler Final Dershanesi"
      />
      
      {/* Sanatsal Geçiş Katmanları */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.9)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
      
      {/* Konum Etiketi */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute bottom-12 left-12 p-6 rounded-3xl bg-background/60  border border-black/10 dark:border-white/10 pointer-events-none z-20 hidden md:block"
      >
        <div className="text-primary-light font-bold text-xs uppercase tracking-widest mb-2">Konum</div>
        <div className="text-slate-900 dark:text-white font-medium">Hürriyet Mah. Mahmutbey Cd. No:5, Şirinevler</div>
        <div className="text-slate-500 dark:text-white/40 text-sm font-light">Bahçelievler / İstanbul</div>
      </motion.div>
    </section>
  );
}
