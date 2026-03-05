"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import Image from "next/image";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { works, getWorkBySlug, getLocalizedWork } from "@/config/works";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

// ── Gallery image block ───────────────────────────────────────────────────────
function ParallaxImage({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="rounded-3xl overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-auto block"
      />
    </motion.div>
  );
}

// ── Text reveal ───────────────────────────────────────────────────────────────
function RevealText({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function WorkDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = use(params);
  const t = useTranslations("Works");
  const rawWork = getWorkBySlug(slug);
  if (!rawWork) notFound();
  const work = getLocalizedWork(rawWork, locale);

  const currentIndex = works.findIndex((w) => w.slug === slug);
  const nextWork = getLocalizedWork(works[(currentIndex + 1) % works.length], locale);

  return (
    <div className="min-h-screen bg-[#05010d] text-white">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[90vh] flex items-end overflow-hidden">
        <Image
          src={work.coverImage}
          alt={work.brand}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05010d] via-[#05010d]/40 to-transparent" />

        {/* Accent glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, ${work.accentColor}18, transparent 70%)`,
          }}
        />

        {/* Back button */}
        <div className="absolute top-28 left-6 md:left-12">
          <Link
            href={"/" as any}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-white/60 hover:text-white text-sm font-medium transition-all hover:border-white/30"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("back_home")}
          </Link>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
              style={{
                backgroundColor: `${work.accentColor}20`,
                color: work.accentColor,
                border: `1px solid ${work.accentColor}40`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: work.accentColor }}
              />
              {work.category} · {work.year}
            </span>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-4">
              {work.brand}
            </h1>
            <p className="text-xl md:text-2xl text-white/50 font-light max-w-2xl">
              {work.tagline}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 mt-10">
              {work.stats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-3xl md:text-4xl font-black"
                    style={{ color: work.accentColor }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/30 uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Services chips ─────────────────────────────────────────────────── */}
      <section className="py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap items-center gap-3">
          <span className="text-xs text-white/25 uppercase tracking-wider mr-2 font-semibold">
            {t("services_label")}
          </span>
          {work.services.map((s) => (
            <span
              key={s}
              className="px-4 py-1.5 rounded-full text-sm font-semibold border border-white/8 bg-white/[0.03] text-white/60"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── Brand Story ────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Story text */}
            <div className="space-y-16 sticky top-28 self-start">
              {[
                { label: t("challenge"), text: work.story.challenge },
                { label: t("approach"), text: work.story.approach },
                { label: t("result"), text: work.story.result },
              ].map(({ label, text }, i) => (
                <RevealText key={label} delay={i * 0.1}>
                  <div className="flex gap-6">
                    <div className="pt-1.5">
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: work.accentColor }}
                      />
                    </div>
                    <div>
                      <p
                        className="text-xs font-black uppercase tracking-[0.3em] mb-3"
                        style={{ color: work.accentColor }}
                      >
                        {label}
                      </p>
                      <p className="text-lg text-white/60 leading-relaxed font-light">
                        {text}
                      </p>
                    </div>
                  </div>
                </RevealText>
              ))}
            </div>

            {/* Gallery */}
            <div className="space-y-5">
              {work.galleryImages.map((img, i) => (
                <ParallaxImage key={i} src={img} alt={`${work.brand} ${i + 1}`} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Full-width image ───────────────────────────────────────────────── */}
      <section className="py-8">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <ParallaxImage src={work.coverImage} alt={work.brand} index={0} />
        </div>
      </section>

      {/* ── Next project ────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <RevealText>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/25 mb-6">
              {t("next_project")}
            </p>
          </RevealText>

          <Link
            href={`/works/${nextWork.slug}` as any}
            className="group flex items-center justify-between py-10 border-t border-white/8 hover:border-white/20 transition-all"
          >
            <div>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white/20 group-hover:text-white transition-colors duration-500">
                {nextWork.brand}
              </h3>
              <p className="text-white/30 mt-2 font-light group-hover:text-white/50 transition-colors">
                {nextWork.tagline}
              </p>
            </div>
            <div
              className="w-16 h-16 rounded-full border flex items-center justify-center group-hover:scale-110 transition-all duration-300"
              style={{
                borderColor: `${nextWork.accentColor}60`,
                backgroundColor: `${nextWork.accentColor}15`,
              }}
            >
              <ArrowUpRight
                className="w-7 h-7"
                style={{ color: nextWork.accentColor }}
              />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
