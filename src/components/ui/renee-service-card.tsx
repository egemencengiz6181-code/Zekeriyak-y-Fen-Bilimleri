'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { Link } from '@/navigation';

interface ReneeServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  features: string[];
}

export default function ReneeServiceCard({ title, description, icon: Icon, href, features }: ReneeServiceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-[420px] w-full perspective-1000 group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-700 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/5 to-purple-900/20 backdrop-blur-xl p-8 flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl -z-10" />
          
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
            <Icon className="w-10 h-10 text-primary-light" />
          </div>
          
          <h3 className="text-2xl font-bold tracking-tight text-white mb-4">{title}</h3>
          <div className="w-12 h-1 bg-primary/30 rounded-full group-hover:w-24 group-hover:bg-primary/60 transition-all duration-500" />
          
          <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/40 font-bold">
            <span>Keşfet</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 backface-hidden rounded-[32px] border border-primary/30 bg-purple-950/40 backdrop-blur-2xl p-8 flex flex-col justify-between [transform:rotateY(180deg)]"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Icon className="w-5 h-5 text-primary-light" />
              </div>
              <h4 className="text-lg font-bold text-white tracking-tight">{title}</h4>
            </div>
            
            <p className="text-sm text-foreground/60 leading-relaxed font-light">
              {description}
            </p>

            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Link 
            href={href}
            className="w-full py-4 rounded-2xl bg-primary hover:bg-primary-light text-white text-sm font-bold transition-all text-center shadow-[0_0_20px_rgba(109,40,217,0.3)] flex items-center justify-center gap-2 group/btn"
          >
            <span>Projeyi Başlat</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
