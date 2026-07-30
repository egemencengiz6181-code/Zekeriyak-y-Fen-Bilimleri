"use client";

import Image from "next/image";
import { Link } from "@/navigation";
import { Instagram, Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

// ── TextHoverEffect ───────────────────────────────────────────────────────────
// İmleci takip eden SVG mask efekti kaldırıldı: her mousemove'da iki setState
// tetikliyor, bu da her harekette tam re-render + SVG mask'ın yeniden
// rasterize edilmesi demekti (Safari'de belirgin takılma). Yerine saf CSS ile
// hover'da açılan statik bir gradient kullanılıyor.
function TextHoverEffect({ text }: { text: string }) {
  return (
    <svg
      width="100%"
      viewBox="0 0 800 100"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none cursor-default group/txt"
      aria-hidden
    >
      <defs>
        <linearGradient id="footer-text-grad-base" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7a1010" />
          <stop offset="50%" stopColor="#ec2027" />
          <stop offset="100%" stopColor="#7a1010" />
        </linearGradient>

        <linearGradient id="footer-text-grad-hover" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec2027" />
          <stop offset="40%" stopColor="#f06060" />
          <stop offset="100%" stopColor="#12648f" />
        </linearGradient>
      </defs>

      {/* Stroke katmanı — hover'da soluyor */}
      <text
        x="50%"
        y="75%"
        textAnchor="middle"
        fontSize="80"
        letterSpacing="-2"
        fontWeight="900"
        fill="none"
        stroke="url(#footer-text-grad-base)"
        strokeWidth="1"
        className="opacity-25 transition-opacity duration-500 group-hover/txt:opacity-0"
        style={{ fontFamily: "inherit" }}
      >
        {text}
      </text>

      {/* Dolgu katmanı — hover'da beliriyor */}
      <text
        x="50%"
        y="75%"
        textAnchor="middle"
        fontSize="80"
        letterSpacing="-2"
        fontWeight="900"
        fill="url(#footer-text-grad-hover)"
        className="opacity-0 transition-opacity duration-500 group-hover/txt:opacity-90"
        style={{ fontFamily: "inherit" }}
      >
        {text}
      </text>
    </svg>
  );
}

// ── HoverFooter ───────────────────────────────────────────────────────────────
export default function HoverFooter() {
  const nt = useTranslations("Navbar");
  const ft = useTranslations("Footer");

  const navLinks = [
    { name: nt("about"), href: "/about" },
    { name: nt("services"), href: "/services" },
    { name: nt("references"), href: "/references" },
    { name: nt("contact"), href: "/contact" },
  ];

  const socialLinks = [
    { icon: <Instagram className="w-4 h-4" />, href: "https://www.instagram.com/zekeriyakoyfenbilimleri", label: "Instagram" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-black/5 dark:border-white/5 bg-transparent">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#ec2027]/10 rounded-full glow-soft" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 border-b border-black/5 dark:border-white/5">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block pointer-events-auto">
              <Image
                src="/logos/fen-bilimleri-logo.png"
                alt="Zekeriyaköy Fen Bilimleri Dershanesi"
                width={180}
                height={60}
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-slate-500 dark:text-white/30 leading-relaxed max-w-xs">
              {ft('brand_tagline')}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-black/8 dark:border-white/8 bg-black/[0.03] dark:bg-white/[0.03] flex items-center justify-center text-slate-400 dark:text-white/30 hover:text-[#ec2027] hover:border-[#ec2027]/40 transition-all pointer-events-auto"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400 dark:text-white/25">{ft('pages')}</p>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5 group pointer-events-auto"
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#ec2027] transition-opacity" />
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400 dark:text-white/25">{ft('contact')}</p>
            <ul className="space-y-4">
              <li>
                <a href="mailto:zekeriyakoyfenbilimleri@gmail.com" className="flex items-center gap-3 text-sm text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors group pointer-events-auto">
                  <Mail className="w-4 h-4 text-[#ec2027] shrink-0" />
                  zekeriyakoyfenbilimleri@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+902122015848" className="flex items-center gap-3 text-sm text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors pointer-events-auto">
                  <Phone className="w-4 h-4 text-[#ec2027] shrink-0" />
                  0212 201 58 48
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-500 dark:text-white/40">
                <MapPin className="w-4 h-4 text-[#ec2027] shrink-0 mt-0.5" />
                <span>{ft('address')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* TextHoverEffect */}
        <div className="py-8 -mx-6 px-6 overflow-hidden">
          <TextHoverEffect text="FEN BİLİMLERİ" />
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-white/20">
            © {new Date().getFullYear()} Zekeriyaköy Fen Bilimleri. {ft('rights_suffix')}
          </p>
          <p className="text-xs text-slate-400 dark:text-white/20">
            {ft('tagline')}
          </p>
        </div>
      </div>
    </footer>
  );
}
