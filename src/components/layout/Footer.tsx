'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/navigation';
import { Instagram, Linkedin, Mail, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Footer');
  const nt = useTranslations('Navbar');

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/reneedesignlab/", label: "Instagram" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/egemen-cengiz-826158282/", label: "LinkedIn" },
  ];

  const navLinks = [
    { name: nt('about'), href: "/about" },
    { name: nt('services'), href: "/services" },
    { name: nt('references'), href: "/references" },
    { name: nt('contact'), href: "/contact" },
  ];

  return (
    <footer className="relative bg-transparent z-10 pt-20">
      {/* Google Maps Section */}
      <div className="w-full h-[400px] relative overflow-hidden group">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.203177894902!2d32.81229407632943!3d39.91448827152431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d349377f0a95f3%3A0xc665780a4a6132f!2sYDA%20Center!5e0!3m2!1str!2str!4v1710000000000!5m2!1str!2str"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(1) contrast(1.2) invert(0.9)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="transition-all duration-700 group-hover:grayscale-0 group-hover:invert-0 group-hover:contrast-100"
        />
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Info */}
          <div className="space-y-8 col-span-1 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image 
                src="/logos/Main_Logo_Beyaz.png" 
                alt="Renee DesignLab" 
                width={200} 
                height={80} 
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-foreground/40 font-light leading-relaxed max-w-xs">
              {t('brand_tagline')}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/50 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground/60">
              {t('quick_links')}
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="group relative text-foreground/40 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span>{link.name}</span>
                    <motion.div 
                      className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground/60">
              {t('contact')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-foreground/40">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-light leading-relaxed">{t('address')}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/40">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <a href="mailto:info@reneedesignlab.com" className="hover:text-white transition-colors">
                    info@reneedesignlab.com
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col justify-end">
                <a 
                  href="https://wa.me/905325046606" 
                  target="_blank"
                  className="inline-flex items-center gap-2 text-primary font-medium group"
                >
                  <span>Hadi konuşalım</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-foreground/20 text-sm font-light">
            {t('rights')}
          </p>
          <div className="flex items-center gap-8 text-[10px] uppercase tracking-widest text-foreground/20">
            <span className="hover:text-foreground/40 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-foreground/40 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>

      {/* Background Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
    </footer>
  );
}
