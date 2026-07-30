"use client"

import { motion } from "framer-motion"

const row1 = [
  "İstanbul Fen Lisesi",
  "Galatasaray Lisesi",
  "Kabataş Erkek Lisesi",
  "Atatürk Fen Lisesi",
  "Darüşşafaka Lisesi",
  "Boğaziçi Üniversitesi",
  "İTÜ İstanbul",
  "ODTÜ Ankara",
  "Beşiktaş Anadolu Lisesi",
  "Vefa Lisesi",
  "Nişantaşı Fen Lisesi",
  "Arnavutköy Anadolu Lisesi",
]

const row2 = [
  "LGS'de 500 Tam Puan",
  "YKS'de İlk 100",
  "30 Yıllık Tecrübe",
  "Bireysel Öğrenci Takibi",
  "Küçük Grup Dersleri",
  "Deneyimli Öğretmenler",
  "%95 Hedef Okul Başarısı",
  "1995'ten Beri Sarıyer'de",
  "Sınırsız Tekrar İmkânı",
]

function MarqueeRow({
  items,
  direction,
  duration = 40,
}: {
  items: string[]
  direction: "left" | "right"
  duration?: number
}) {
  const doubled = [...items, ...items]

  return (
    <div className="flex overflow-hidden py-3">
      <motion.div
        animate={
          direction === "left"
            ? { x: ["0%", "-50%"] }
            : { x: ["-50%", "0%"] }
        }
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0"
      >
        {doubled.map((item, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-3 px-8 text-sm font-semibold tracking-wide text-foreground/30 whitespace-nowrap"
          >
            <span className="text-primary/50 text-[10px]">◆</span>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function ReferencesMarquee() {
  return (
    <section className="py-16 border-t border-black/5 dark:border-white/5 relative overflow-hidden">
      {/* Edge fades */}
      <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="mb-1">
        <MarqueeRow items={row1} direction="left" duration={45} />
      </div>
      <div>
        <MarqueeRow items={row2} direction="right" duration={38} />
      </div>
    </section>
  )
}
