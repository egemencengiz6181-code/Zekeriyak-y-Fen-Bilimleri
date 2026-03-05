'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from '@/navigation';
import { cn } from '@/lib/utils';
import { 
  Search, Target, Share2, Code, Globe, 
  Camera, Palette, Megaphone 
} from 'lucide-react';

interface BadgeProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  rotation: number;
  x: number;
  y: number;
  color: string;
  zIndex?: number;
}

const badges: BadgeProps[] = [
  { 
    id: 'seo', 
    label: 'SEO', 
    icon: <Search className="w-4 h-4" />,
    rotation: -12,
    x: -280,
    y: -80,
    color: "from-purple-600 to-indigo-700"
  },
  { 
    id: 'google-ads', 
    label: 'Google ADS', 
    icon: <Target className="w-4 h-4" />,
    rotation: 8,
    x: -120,
    y: -140,
    color: "from-zinc-800 to-zinc-900"
  },
  { 
    id: 'meta-ads', 
    label: 'Meta Reklam', 
    icon: <Share2 className="w-4 h-4" />,
    rotation: -5,
    x: 150,
    y: -120,
    color: "from-purple-400 to-purple-600"
  },
  { 
    id: 'web-design', 
    label: 'Web Tasarım', 
    icon: <Code className="w-4 h-4" />,
    rotation: 10,
    x: 260,
    y: -30,
    color: "from-zinc-900 to-black"
  },
  { 
    id: 'social-media', 
    label: 'Sosyal Medya', 
    icon: <Globe className="w-4 h-4" />,
    rotation: 6,
    x: -220,
    y: 60,
    color: "from-indigo-600 to-purple-800"
  },
  { 
    id: 'production', 
    label: 'Prodüksiyon', 
    icon: <Camera className="w-4 h-4" />,
    rotation: -3,
    x: 0,
    y: 110,
    color: "from-zinc-700 to-zinc-900"
  },
  { 
    id: 'design', 
    label: 'Marka Kimliği', 
    icon: <Palette className="w-4 h-4" />,
    rotation: -8,
    x: 180,
    y: 90,
    color: "from-purple-800 to-indigo-900"
  },
  { 
    id: 'pr', 
    label: 'PR Stratejisi', 
    icon: <Megaphone className="w-4 h-4" />,
    rotation: 0,
    x: -40,
    y: -20,
    zIndex: 50,
    color: "from-zinc-800 to-zinc-950"
  }
];

export default function MarketingBadges() {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleClick = (id: string) => {
    router.push(`/services/${id}`);
  };

  return (
    <div className="relative h-[500px] md:h-[500px] sm:h-[700px] w-full flex items-center justify-center overflow-visible">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      {badges.map((badge, index) => {
        const isHovered = hoveredId === badge.id;
        const isOtherHovered = hoveredId !== null && hoveredId !== badge.id;

        return (
          <motion.button
            key={badge.id}
            onClick={() => handleClick(badge.id)}
            onMouseEnter={() => setHoveredId(badge.id)}
            onMouseLeave={() => setHoveredId(null)}
            initial={{ 
              opacity: 0, 
              scale: 0.5, 
              x: 0, 
              y: 0, 
              rotate: 0 
            }}
            whileInView={{ 
              opacity: 1, 
              scale: 1, 
              x: badge.x, 
              y: badge.y, 
              rotate: badge.rotation 
            }}
            viewport={{ once: true }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: index * 0.05 
            }}
            animate={{
              scale: isHovered ? 1.2 : isOtherHovered ? 0.8 : 1,
              opacity: isHovered ? 1 : isOtherHovered ? 0.2 : 1,
              rotate: isHovered ? 0 : badge.rotation,
              filter: isOtherHovered ? "blur(4px)" : "blur(0px)",
              zIndex: isHovered ? 999 : (badge.zIndex || 10)
            }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "absolute flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md transition-all duration-500 group cursor-pointer",
              "bg-gradient-to-br font-bold text-white",
              badge.color
            )}
          >
            {/* Internal Glow on Hover */}
            <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <span className="text-white/60 group-hover:text-white transition-colors">
              {badge.icon}
            </span>
            <span className="text-base tracking-tight text-white/90 group-hover:text-white whitespace-nowrap">
              {badge.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
