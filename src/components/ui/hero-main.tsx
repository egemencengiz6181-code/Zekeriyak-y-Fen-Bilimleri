"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ContactPopup from "@/components/shared/ContactPopup";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function HeroMain() {
  const t = useTranslations("HeroMain");
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Simple gradient background - no canvas, no blur */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-50 via-white to-orange-50/30 dark:from-[#0a0a0f] dark:via-[#0d0005] dark:to-[#0a0a0f]" />

      {/* School image background */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <Image
          src="/okul2/unnamed-6.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-[0.06]"
          sizes="100vw"
          quality={30}
          priority
        />
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_40%,rgba(255,255,255,0.85)_100%)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_40%,rgba(0,0,0,0.85)_100%)]" />

      {/* Subtle glow - no blur, Safari safe */}
      <div
        className="absolute z-[2] w-[600px] h-[600px] rounded-full opacity-[0.12]"
        style={{
          background: "radial-gradient(circle, #E35205 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E35205]/30 bg-[#E35205]/10 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E35205] animate-pulse" />
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#E35205]/80">
            Bahçelievler / İstanbul
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.04] text-slate-900 dark:text-white mb-8"
        >
          {t("title_prefix")}{" "}
          <span className="bg-gradient-to-r from-[#FF9E7F] via-[#E35205] to-[#A03500] bg-clip-text text-transparent">
            {t("title_highlight")}
          </span>
          <br />
          {t("title_suffix")}
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl text-slate-500 dark:text-white/40 font-light leading-relaxed max-w-2xl mx-auto mb-12"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <ContactPopup>
            <span className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#E35205] hover:bg-[#A03500] text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
              <MessageCircle className="w-4 h-4" />
              {t("cta")}
              <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
            </span>
          </ContactPopup>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[2] bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
