"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HeroMain() {
  const t = useTranslations("HeroMain");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted">
      {/* ── OKUL GÖRSELİ (LCP) ────────────────────────────────── */}
      <div className="absolute inset-0 z-[1]">
        <Image
          src="/okul/okul.jpeg"
          alt=""
          fill
          className="object-cover object-center opacity-[0.08]"
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={60}
        />
      </div>

      {/* ── RADIAL GLOW — blur yok, saf CSS gradient (Safari/GPU dostu) ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none opacity-70 dark:opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 45% at 50% 45%, rgba(236,32,39,0.16) 0%, rgba(18,100,143,0.10) 45%, transparent 75%)",
        }}
      />

      {/* ── VIGNETTE ─────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_40%,rgba(255,255,255,0.82)_100%)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_40%,rgba(0,0,0,0.82)_100%)]"
      />

      {/* ── CONTENT ──────────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div
          className="enter-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-8"
          style={{ animationDelay: "0s" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary">
            Zekeriyaköy · Sarıyer / İstanbul
          </span>
        </div>

        {/* Title */}
        <h1
          className="enter-up text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.04] text-slate-900 dark:text-white mb-8"
          style={{ animationDelay: "0.1s" }}
        >
          {t("title_prefix")}{" "}
          <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
            {t("title_highlight")}
          </span>
          <br />
          {t("title_suffix")}
        </h1>

        {/* Subtitle */}
        <p
          className="enter-up text-lg md:text-xl text-slate-500 dark:text-white/40 font-light leading-relaxed max-w-2xl mx-auto mb-12"
          style={{ animationDelay: "0.2s" }}
        >
          {t("subtitle")}
        </p>

        {/* CTA */}
        <div
          className="enter-up flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animationDelay: "0.3s" }}
        >
          <a
            href="https://wa.me/902122015848"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold text-sm tracking-wide transition-colors duration-200 shadow-[0_0_32px_rgba(236,32,39,0.35)]"
          >
            <MessageCircle className="w-4 h-4" />
            {t("cta")}
            <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
          </a>
        </div>
      </div>

      {/* ── BOTTOM FADE ──────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 z-[2] bg-gradient-to-t from-background to-transparent pointer-events-none"
      />
    </section>
  );
}
