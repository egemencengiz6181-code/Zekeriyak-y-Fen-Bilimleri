"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Link } from "@/navigation";
import { motion, useMotionValue, animate } from "framer-motion";
import { works, getLocalizedWork, Work, WorkI18n } from "@/config/works";
import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

// Per-card static tilt angles
const ROTATIONS = [-6, 4, -3, 7, -5, 3];

// Single project card
function WorkCard({
  work,
  index,
}: {
  work: Work & WorkI18n;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const tilt = ROTATIONS[index % ROTATIONS.length];

  return (
    <motion.div
      className="relative shrink-0 cursor-pointer"
      style={{ width: 300 }}
      animate={{ rotate: hovered ? 0 : tilt }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow under card */}
      <motion.div
        className="absolute inset-0 rounded-2xl -z-10 blur-2xl"
        animate={{
          opacity: hovered ? 0.5 : 0,
          scale: hovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.4 }}
        style={{ backgroundColor: work.accentColor }}
      />

      {/* Photo */}
      <Link href={`/works/${work.slug}` as any} className="block w-full">
        <motion.div
          className="relative w-full rounded-2xl overflow-hidden border border-white/10"
          animate={{ scale: hovered ? 1.03 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={work.coverImage}
            alt={work.brand}
            width={300}
            height={300}
            className="w-full h-auto block"
            sizes="300px"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          {/* Hover color wash */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: hovered ? 0.15 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: work.accentColor }}
          />

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <motion.p
              className="text-[9px] font-black uppercase tracking-[0.25em] mb-1"
              style={{ color: work.accentColor }}
              animate={{ opacity: hovered ? 1 : 0.6 }}
            >
              {work.category}
            </motion.p>
            <h3 className="text-white font-black text-lg leading-none tracking-tight">
              {work.brand}
            </h3>
            <motion.p
              className="text-white/50 text-xs mt-1 font-light"
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
              transition={{ duration: 0.3 }}
            >
              {work.tagline}
            </motion.p>
          </div>

          {/* Arrow */}
          <motion.div
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${work.accentColor}30`, border: `1px solid ${work.accentColor}60` }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
            transition={{ duration: 0.25 }}
          >
            <ArrowUpRight className="w-4 h-4" style={{ color: work.accentColor }} />
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// Main showcase
export default function WorksShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [dragging, setDragging] = useState(false);
  const locale = useLocale();
  const t = useTranslations("Works");
  const localizedWorks = works.map((w) => getLocalizedWork(w, locale));

  const CARD_W = 300;
  const GAP = 48;

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400 mb-3">
              ✦ {t("section_label")}
            </p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none text-white">
              {t("section_title_1")}
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                {t("section_title_2")}
              </span>
            </h2>
          </div>
          <p className="hidden md:block text-sm text-white/25 font-light pb-2">
            {t("drag_hint")}
          </p>
        </div>
      </div>

      {/* Draggable track */}
      <div className="relative select-none">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-r from-[#05010d] to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-l from-[#05010d] to-transparent" />

        <motion.div
          ref={trackRef}
          className="flex items-center gap-12 px-20 py-16 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{
            left: -(localizedWorks.length * (CARD_W + GAP) - (typeof window !== "undefined" ? window.innerWidth : 1200)),
            right: 0,
          }}
          dragElastic={0.08}
          dragTransition={{ bounceStiffness: 200, bounceDamping: 30 }}
          onDragStart={() => setDragging(true)}
          onDragEnd={() => setDragging(false)}
          style={{ x }}
          whileTap={{ cursor: "grabbing" }}
        >
          {localizedWorks.map((work, i) => (
            <WorkCard key={work.slug} work={work} index={i} />
          ))}
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {localizedWorks.map((w, i) => (
          <button
            key={w.slug}
            onClick={() => {
              animate(x, -(i * (CARD_W + GAP)), {
                type: "spring",
                stiffness: 200,
                damping: 30,
              });
            }}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300 hover:scale-150"
            style={{ backgroundColor: w.accentColor, opacity: 0.5 }}
          />
        ))}
      </div>
    </section>
  );
}
