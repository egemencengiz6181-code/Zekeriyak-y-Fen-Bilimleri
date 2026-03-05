"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/navigation";
import { Instagram, Linkedin, Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

// ── TextHoverEffect ───────────────────────────────────────────────────────────
function TextHoverEffect({ text }: { text: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPos, setMaskPos] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (!svgRef.current || !hovered) return;
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const x = ((cursor.x - rect.left) / rect.width) * 100;
    const y = ((cursor.y - rect.top) / rect.height) * 100;
    setMaskPos({ cx: `${x}%`, cy: `${y}%` });
  }, [cursor, hovered]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      viewBox="0 0 800 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none cursor-default"
    >
      <defs>
        {/* Base gradient — dark violet outline */}
        <linearGradient id="footer-text-grad-base" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4c1d95" />
          <stop offset="50%" stopColor="#6d28d9" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>

        {/* Hover gradient — bright violet-indigo */}
        <linearGradient id="footer-text-grad-hover" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="40%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>

        {/* Radial mask for hover reveal */}
        <radialGradient
          id="footer-reveal-mask"
          cx={maskPos.cx}
          cy={maskPos.cy}
          r="30%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        <mask id="footer-mask">
          <rect width="100%" height="100%" fill={`url(#footer-reveal-mask)`} />
        </mask>
      </defs>

      {/* Stroke-only base layer */}
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
        style={{ fontFamily: "inherit", opacity: hovered ? 0.4 : 0.25, transition: "opacity 0.4s ease" }}
      >
        {text}
      </text>

      {/* Hover-revealed filled layer */}
      <text
        x="50%"
        y="75%"
        textAnchor="middle"
        fontSize="80"
        letterSpacing="-2"
        fontWeight="900"
        fill="url(#footer-text-grad-hover)"
        stroke="url(#footer-text-grad-hover)"
        strokeWidth="0.5"
        mask="url(#footer-mask)"
        style={{ fontFamily: "inherit", opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease" }}
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
    { icon: <Instagram className="w-4 h-4" />, href: "https://www.instagram.com/reneedesignlab/", label: "Instagram" },
    { icon: <Linkedin className="w-4 h-4" />, href: "https://www.linkedin.com/in/egemen-cengiz-826158282/", label: "LinkedIn" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-transparent">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-violet-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 border-b border-white/5">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block pointer-events-auto">
              <Image
                src="/logos/Main_Logo_Beyaz.png"
                alt="Renee DesignLab"
                width={180}
                height={60}
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-white/30 leading-relaxed max-w-xs">
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
                  className="w-9 h-9 rounded-full border border-white/8 bg-white/[0.03] flex items-center justify-center text-white/30 hover:text-violet-400 hover:border-violet-500/40 transition-all pointer-events-auto"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/25">{ft('pages')}</p>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1.5 group pointer-events-auto"
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 text-violet-400 transition-opacity" />
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/25">{ft('contact')}</p>
            <ul className="space-y-4">
              <li>
                <a href="mailto:info@reneedesignlab.com" className="flex items-center gap-3 text-sm text-white/40 hover:text-white transition-colors group pointer-events-auto">
                  <Mail className="w-4 h-4 text-violet-500 shrink-0" />
                  info@reneedesignlab.com
                </a>
              </li>
              <li>
                <a href="tel:+905325046606" className="flex items-center gap-3 text-sm text-white/40 hover:text-white transition-colors pointer-events-auto">
                  <Phone className="w-4 h-4 text-violet-500 shrink-0" />
                  0532 504 66 06
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/40">
                <MapPin className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                <span>{ft('address')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* TextHoverEffect */}
        <div className="py-8 -mx-6 px-6 overflow-hidden">
          <TextHoverEffect text="RENEE DESIGNLAB" />
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Renee DesignLab. {ft('rights_suffix')}
          </p>
          <p className="text-xs text-white/20">
            {ft('tagline')}
          </p>
        </div>
      </div>
    </footer>
  );
}
