"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import ContactPopup from "@/components/shared/ContactPopup";

/**
 * Hero — canvas (Waves/simplex-noise) ve blur YOK, framer-motion YOK.
 * Sadece CSS gradient + radial glow + CSS fade-up animasyonu.
 *
 * Not: eskiden burada `priority` ile %6 opaklıkta tam ekran bir okul fotoğrafı
 * yükleniyordu. Görünmüyordu ama LCP'yi bloke edip mobilde ~160 kB harcıyordu.
 */
export default function HeroMain() {
  const t = useTranslations("HeroMain");

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted">
      {/* Ana gradient zemin */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-50 via-white to-orange-50/40 dark:from-[#0a0a0f] dark:via-[#0d0005] dark:to-[#0a0a0f]" />

      {/* Radial glow — blur filtresi değil, saf gradient */}
      <div
        className="absolute z-[1] w-[620px] h-[620px] max-w-[130vw] max-h-[130vw] rounded-full opacity-[0.14] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #E35205 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* İçerik */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-16">
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E35205]/30 bg-[#E35205]/10 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E35205]" />
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#E35205]/90">
            Bahçelievler / İstanbul
          </span>
        </div>

        <h1 className="animate-fade-up delay-1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.04] text-slate-900 dark:text-white mb-8">
          {t("title_prefix")}{" "}
          <span className="bg-gradient-to-r from-[#FF9E7F] via-[#E35205] to-[#A03500] bg-clip-text text-transparent">
            {t("title_highlight")}
          </span>
          <br />
          {t("title_suffix")}
        </h1>

        <p className="animate-fade-up delay-2 text-lg md:text-xl text-slate-500 dark:text-white/45 font-light leading-relaxed max-w-2xl mx-auto mb-12">
          {t("subtitle")}
        </p>

        <div className="animate-fade-up delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <ContactPopup>
            <span className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#E35205] hover:bg-[#A03500] text-white font-semibold text-sm tracking-wide transition-colors duration-200 active:scale-95 shadow-lg">
              <MessageCircle className="w-4 h-4" />
              {t("cta")}
              <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
            </span>
          </ContactPopup>
        </div>
      </div>

      {/* Alt geçiş */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[2] bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
