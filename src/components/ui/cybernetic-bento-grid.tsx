"use client";

import { useRef } from "react";
import Image from "next/image";
import { Link } from "@/navigation";
import { works, getLocalizedWork, Work, WorkI18n } from "@/config/works";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

// Bento layout: 4-col grid, explicit positioning for each card
// Row 1-2: [Yrem col1-2] [Coresatin col3-4]
// Row 3:   [ONR col1] [DrSinan col2-3] [Studio col4]
// Row 4:   [ONR col1] [Volta col2-3]  [Kairos col4]

const LAYOUT = [
  // slug, col-start, col-span, row-start, row-span
  { idx: 0, cs: 1, csp: 2, rs: 1, rsp: 2 }, // Yrem — big
  { idx: 1, cs: 3, csp: 2, rs: 1, rsp: 2 }, // Coresatin — big
  { idx: 2, cs: 1, csp: 1, rs: 3, rsp: 2 }, // ONR — tall
  { idx: 3, cs: 2, csp: 2, rs: 3, rsp: 1 }, // Dr. Sinan — wide
  { idx: 4, cs: 4, csp: 1, rs: 3, rsp: 1 }, // Studio Noir
  { idx: 5, cs: 2, csp: 2, rs: 4, rsp: 1 }, // Volta — wide
  { idx: 6, cs: 4, csp: 1, rs: 4, rsp: 1 }, // Kairos
] as const;

function Card({
  work,
  large,
}: {
  work: Work & WorkI18n;
  large?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--mouse-x", `${x}%`);
    ref.current.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <Link
      href={`/works/${work.slug}` as any}
      className="group relative block overflow-hidden rounded-3xl border border-white/8 bg-[#080312] cursor-pointer"
    >
      <div
        ref={ref}
        className="relative w-full h-full min-h-[200px]"
        onMouseMove={handleMouseMove}
        style={
          {
            "--mouse-x": "50%",
            "--mouse-y": "50%",
          } as React.CSSProperties
        }
      >
        {/* Image */}
        <Image
          src={work.coverImage}
          alt={work.brand}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Base dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

        {/* Cyber-glow — follows mouse */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle 200px at var(--mouse-x) var(--mouse-y), ${work.accentColor}40, transparent 70%)`,
          }}
        />

        {/* Border glow */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 0 1px ${work.accentColor}50`,
          }}
        />

        {/* Category chip */}
        <div className="absolute top-4 left-4">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
            style={{
              backgroundColor: `${work.accentColor}25`,
              color: work.accentColor,
              border: `1px solid ${work.accentColor}40`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: work.accentColor }}
            />
            {work.category}
          </span>
        </div>

        {/* Year */}
        <div className="absolute top-4 right-4">
          <span className="text-xs text-white/30 font-mono">{work.year}</span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-end justify-between gap-2">
            <div>
              <h3
                className={`font-black text-white leading-tight ${large ? "text-3xl" : "text-xl"}`}
              >
                {work.brand}
              </h3>
              <p className="text-white/40 text-sm mt-1 font-light">
                {work.tagline}
              </p>
              {large && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {work.services.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/8 text-white/50 border border-white/8"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100"
              style={{
                backgroundColor: `${work.accentColor}25`,
                border: `1px solid ${work.accentColor}60`,
              }}
            >
              <ArrowUpRight
                className="w-5 h-5"
                style={{ color: work.accentColor }}
              />
            </div>
          </div>

          {/* Stats row for large cards */}
          {large && (
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/8">
              {work.stats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-lg font-black"
                    style={{ color: work.accentColor }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function CyberneticBentoGrid() {
  const t = useTranslations("Works");
  const locale = useLocale();
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16 flex items-end justify-between">
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
          <Link
            href={"/references" as any}
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-violet-500/50 text-sm font-semibold transition-all group"
          >
            {t("view_all")}
            <ExternalLink className="w-4 h-4 group-hover:text-violet-400" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "280px 280px 240px 240px",
          }}
        >
          {LAYOUT.map(({ idx, cs, csp, rs, rsp }) => {
            const work = getLocalizedWork(works[idx], locale);
            const large = rsp >= 2;
            return (
              <div
                key={work.slug}
                style={{
                  gridColumnStart: cs,
                  gridColumnEnd: cs + csp,
                  gridRowStart: rs,
                  gridRowEnd: rs + rsp,
                }}
              >
                <Card work={work} large={large} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
