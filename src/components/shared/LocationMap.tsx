'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function LocationMap() {
  return (
    <section className="w-full h-[450px] relative overflow-hidden group bg-background">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3003.8!2d29.0450!3d41.2148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab6e1f1c5c0d7%3A0x0!2sKilyos%20Caddesi%20238%2F2%2C%20Zekeriyak%C3%B6y%2C%20Sar%C4%B1yer%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1710000000000!5m2!1str!2str"
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'grayscale(1) contrast(1.2) invert(0.9)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="transition-all duration-1000 group-hover:grayscale-0 group-hover:invert-0 group-hover:contrast-100"
        title="Zekeriyaköy Fen Bilimleri Dershanesi"
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
        className="absolute bottom-12 left-12 p-6 rounded-3xl bg-background/60 backdrop-blur-xl border border-black/10 dark:border-white/10 pointer-events-none z-20 hidden md:block"
      >
        <div className="text-primary-light font-bold text-xs uppercase tracking-widest mb-2">Konum</div>
        <div className="text-slate-900 dark:text-white font-medium">Kilyos Caddesi 238/2, Zekeriyaköy</div>
        <div className="text-slate-500 dark:text-white/40 text-sm font-light">Sarıyer / İstanbul</div>
      </motion.div>
    </section>
  );
}
