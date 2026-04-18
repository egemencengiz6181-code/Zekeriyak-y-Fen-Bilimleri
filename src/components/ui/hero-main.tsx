"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, Phone, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";

const Waves = dynamic(() => import('@/components/ui/waves'), { ssr: false });

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
  const { resolvedTheme } = useTheme();
  const wavesBg = resolvedTheme === "dark" ? "#000000" : "#f4f4f8";
  const [showContact, setShowContact] = useState(false);
  return (
    <>
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── WAVES BACKGROUND — sadece desktop (mobilde performans tasarrufu) ── */}
      <div className="hidden md:block absolute inset-0 z-0">
        <Waves
          strokeColor="#ec2027"
          backgroundColor={wavesBg}
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
        />
      </div>
      {/* Mobil için sade gradient arka plan */}
      <div className="md:hidden absolute inset-0 z-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-[#0a0a0f] dark:via-[#0d0005] dark:to-[#0a0a0f]" />

      {/* ── SCHOOL IMAGE BACKGROUND ──────────────────────────── */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <Image
          src="/okul/okul.jpeg"
          alt=""
          fill
          className="object-cover object-center opacity-[0.08]"
          priority
          sizes="100vw"
        />
      </div>

      {/* ── VIGNETTE OVERLAY ─────────────────────────────────── */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_40%,rgba(255,255,255,0.82)_100%)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_40%,rgba(0,0,0,0.82)_100%)]" />

      {/* ── PURPLE GLOW ──────────────────────────────────────── */}
      <motion.div
        className="absolute z-[2] w-[720px] h-[720px] rounded-full blur-[160px] opacity-[0.18]"
        style={{
          background: "radial-gradient(circle, #ec2027 0%, #12648f 50%, transparent 80%)",
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
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ec2027]/30 bg-[#ec2027]/10 backdrop-blur-sm mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#ec2027] animate-pulse" />
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#ec2027]/80">
            Zekeriyaköy · Sarıyer / İstanbul
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.04] text-slate-900 dark:text-white mb-8"
        >
          {t("title_prefix")}{" "}
          <span className="bg-gradient-to-r from-[#ec2027] via-[#f06060] to-[#12648f] bg-clip-text text-transparent">
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
          className="text-lg md:text-xl text-slate-500 dark:text-white/40 font-light leading-relaxed max-w-2xl mx-auto mb-12"
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
          <button
            onClick={() => setShowContact(true)}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#ec2027] hover:bg-[#c8191f] text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_32px_rgba(236,32,39,0.45)] hover:shadow-[0_0_48px_rgba(236,32,39,0.6)]"
          >
            <MessageCircle className="w-4 h-4" />
            {t("cta")}
            <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* ── BOTTOM FADE ──────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[2] bg-gradient-to-t from-background to-transparent" />
    </section>

    {/* ── CONTACT POPUP ──────────────────────────────────────── */}
    <AnimatePresence>
      {showContact && (
        <motion.div
          key="contact-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center px-4"
          onClick={() => setShowContact(false)}
        >
          <div className="absolute inset-0 bg-black/60 [backdrop-filter:blur(8px)]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-sm bg-[rgba(10,10,15,0.92)] border border-white/10 [backdrop-filter:blur(30px)] rounded-3xl p-6 shadow-[0_24px_64px_rgba(0,0,0,0.7)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowContact(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Bize Ulaşın</h3>
            <p className="text-sm text-white/50 mb-6">Kayıt ve bilgi için arayın veya WhatsApp’tan yazın.</p>

            <div className="flex flex-col gap-3">
              <a
                href="tel:02122015848"
                className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ec2027]/20 flex items-center justify-center shrink-0 group-hover:bg-[#ec2027]/30 transition-colors">
                  <Phone className="w-5 h-5 text-[#ec2027]" />
                </div>
                <div>
                  <div className="text-xs text-white/50 mb-0.5">Telefon ile Ara</div>
                  <div className="text-sm font-semibold text-white">0212 201 58 48</div>
                </div>
              </a>

              <a
                href="https://wa.me/905453491773"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/30 transition-colors">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </div>
                <div>
                  <div className="text-xs text-white/50 mb-0.5">WhatsApp’tan Yaz</div>
                  <div className="text-sm font-semibold text-white">0545 349 17 73</div>
                </div>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
