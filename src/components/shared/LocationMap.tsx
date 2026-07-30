'use client';

import Reveal from '@/components/ui/reveal';

export default function LocationMap() {
  return (
    <section className="w-full h-[450px] relative overflow-hidden group bg-background">
      {/* DÜZELTME: harita ve etiket başka bir adresi gösteriyordu
          (Şirinevler, Hürriyet Mah. Mahmutbey Cd. No:5). Footer, iletişim
          sayfası ve JSON-LD şemasının hepsi Haznedar / Bağcılar Cd. No:11
          diyor — harita da ona hizalandı. */}
      <iframe
        src="https://maps.google.com/maps?q=Haznedar%2C+Bah%C3%A7elievler+Mahallesi%2C+Ba%C4%9Fc%C4%B1lar+Caddesi+No%3A11%2C+Bah%C3%A7elievler%2F%C4%B0stanbul&t=&z=16&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'grayscale(1) contrast(1.2) invert(0.9)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="transition-all duration-1000 group-hover:grayscale-0 group-hover:invert-0 group-hover:contrast-100"
        title="Bahçelievler Sevinç Dershanesi konumu"
      />

      {/* Geçiş katmanları */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.9)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />

      {/* Konum etiketi */}
      <Reveal className="absolute bottom-12 left-12 p-6 rounded-3xl bg-background/90 border border-black/10 dark:border-white/10 pointer-events-none z-20 hidden md:block">
        <div className="text-primary font-bold text-xs uppercase tracking-widest mb-2">Konum</div>
        <div className="text-slate-900 dark:text-white font-medium">
          Bahçelievler Mah. Bağcılar Cd. No:11, Haznedar
        </div>
        <div className="text-slate-500 dark:text-white/40 text-sm font-light">
          Bahçelievler / İstanbul
        </div>
      </Reveal>
    </section>
  );
}
