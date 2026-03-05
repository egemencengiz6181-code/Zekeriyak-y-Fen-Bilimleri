"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Waves from "@/components/ui/waves";
import { useTranslations } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.14, duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HeroMain() {
  const t = useTranslations("HeroMain");
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── WAVES BACKGROUND (z-0) ───────────────────────────── */}
      <Waves
        strokeColor="#8B5CF6"
        backgroundColor="#000000"
        lineCount={14}
        waveSpeedX={0.0007}
        waveSpeedY={0.0005}
        waveAmpX={36}
        waveAmpY={22}
        xGap={16}
        yGap={34}
        friction={0.93}
        tension={0.0035}
        maxCursorMove={80}
        className="z-0"
      />

      {/* ── VIGNETTE OVERLAY ─────────────────────────────────── */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_40%,rgba(0,0,0,0.82)_100%)]" />

      {/* ── PURPLE GLOW ──────────────────────────────────────── */}
      <motion.div
        className="absolute z-[1] w-[720px] h-[720px] rounded-full blur-[160px] opacity-[0.18]"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, #4c1d95 50%, transparent 80%)",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={{ scale: [1, 1.07, 0.97, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── CONTENT (z-10) ───────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-violet-300">
            Design Laboratory v2.0
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.04] text-white mb-8"
        >
          {t("title_prefix")}{" "}
          <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-violet-500 bg-clip-text text-transparent">
            {t("title_highlight")}
          </span>
          <br />
          {t("title_suffix")}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl text-white/40 font-light leading-relaxed max-w-2xl mx-auto mb-12"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTA */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://wa.me/905325046606"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_32px_rgba(124,58,237,0.45)] hover:shadow-[0_0_48px_rgba(124,58,237,0.6)]"
          >
            <MessageCircle className="w-4 h-4" />
            {t("cta")}
            <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* ── BOTTOM FADE ──────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[2] bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
