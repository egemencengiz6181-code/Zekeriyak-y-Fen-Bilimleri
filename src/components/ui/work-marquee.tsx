"use client";

import { useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { Link } from "@/navigation";
import { works, getLocalizedWork } from "@/config/works";
import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function WorkMarquee() {
  const controls = useAnimationControls();
  const locale = useLocale();
  const t = useTranslations("Works");
  const localizedWorks = works.map((w) => getLocalizedWork(w, locale));
  const items = [...localizedWorks, ...localizedWorks];
  const trackWidth = localizedWorks.length * 420; // card width 380 + gap 40

  const startAnimation = () => {
    controls.start({
      x: [-0, -trackWidth],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: localizedWorks.length * 6,
          ease: "linear",
        },
      },
    });
  };

  return (
    <section className="py-6 overflow-hidden">
      {/* Header badge */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-violet-500/30" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-violet-400">
              {t("section_label")}
            </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-violet-500/30" />
        </div>
      </div>

      {/* Track */}
      <div
        className="relative"
        onMouseEnter={() => controls.stop()}
        onMouseLeave={startAnimation}
      >
        {/* Edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#05010d] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#05010d] to-transparent" />

        <motion.div
          className="flex gap-5 w-max"
          animate={controls}
          initial={{ x: 0 }}
          onViewportEnter={startAnimation}
        >
          {items.map((work, i) => (
            <Link
              href={`/works/${work.slug}` as any}
              key={`${work.slug}-${i}`}
              className="group relative shrink-0 w-[360px] h-[240px] rounded-3xl overflow-hidden border border-white/5 cursor-pointer block"
            >
              <Image
                src={work.coverImage}
                alt={work.brand}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="360px"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Accent color glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 120%, ${work.accentColor}88, transparent 60%)`,
                }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1"
                     style={{ color: work.accentColor }}>
                    {work.category}
                  </p>
                  <h3 className="text-white font-bold text-lg leading-tight">
                    {work.brand}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
