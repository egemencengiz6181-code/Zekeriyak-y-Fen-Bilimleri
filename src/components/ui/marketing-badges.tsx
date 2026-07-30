'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from '@/navigation';
import { cn } from '@/lib/utils';
import { 
  BookOpen, GraduationCap, Trophy, FileText, Users, Star, BookMarked, BarChart2 
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
    id: '7-sinif', 
    label: '7. Sınıf', 
    icon: <BookOpen className="w-4 h-4" />,
    rotation: -12,
    x: -280,
    y: -80,
    color: "from-[#ec2027] to-[#c9191e]"
  },
  { 
    id: '8-sinif', 
    label: '8. Sınıf & LGS', 
    icon: <GraduationCap className="w-4 h-4" />,
    rotation: 8,
    x: -120,
    y: -140,
    color: "from-[#12648f] to-[#0e4e6f]"
  },
  { 
    id: '10-sinif', 
    label: '10. Sınıf', 
    icon: <BookMarked className="w-4 h-4" />,
    rotation: -5,
    x: 150,
    y: -120,
    color: "from-[#ec2027] to-[#12648f]"
  },
  { 
    id: '11-sinif', 
    label: '11. Sınıf', 
    icon: <FileText className="w-4 h-4" />,
    rotation: 10,
    x: 260,
    y: -30,
    color: "from-zinc-800 to-zinc-900"
  },
  { 
    id: '12-sinif', 
    label: '12. Sınıf & YKS', 
    icon: <Trophy className="w-4 h-4" />,
    rotation: 6,
    x: -220,
    y: 60,
    color: "from-[#12648f] to-[#ec2027]"
  },
  { 
    id: 'mezun', 
    label: 'Mezun & YKS', 
    icon: <GraduationCap className="w-4 h-4" />,
    rotation: -3,
    x: 0,
    y: 110,
    color: "from-zinc-700 to-zinc-900"
  },
  { 
    id: 'deneme-kulubu', 
    label: 'Deneme Kulübü', 
    icon: <BarChart2 className="w-4 h-4" />,
    rotation: -8,
    x: 180,
    y: 90,
    color: "from-[#ec2027] to-[#c9191e]"
  },
  { 
    id: 'rehberlik', 
    label: 'Rehberlik', 
    icon: <Users className="w-4 h-4" />,
    rotation: 0,
    x: -40,
    y: -20,
    zIndex: 50,
    color: "from-[#12648f] to-[#0e4e6f]"
  }
];

export default function MarketingBadges() {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleClick = (id: string) => {
    if (id === 'rehberlik') {
      router.push('/rehberlik' as any);
    } else {
      router.push(`/services/${id}`);
    }
  };

  return (
    <>
      {/* ── MOBİL: overflow olmayan flex grid ── */}
      <div className="md:hidden w-full px-4 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {badges.map((badge, index) => (
            <motion.button
              key={badge.id}
              onClick={() => handleClick(badge.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 120, damping: 14, delay: index * 0.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/10 shadow-lg backdrop-blur-md cursor-pointer",
                "bg-gradient-to-br font-bold text-white text-sm",
                badge.color
              )}
            >
              <span className="text-white/70">{badge.icon}</span>
              <span className="tracking-tight text-white/90 whitespace-nowrap">{badge.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── DESKTOP: yüzen scattered layout ── */}
      <div className="hidden md:flex relative h-[500px] w-full items-center justify-center overflow-visible">
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
              initial={{ opacity: 0, scale: 0.5, x: 0, y: 0, rotate: 0 }}
              whileInView={{ opacity: 1, scale: 1, x: badge.x, y: badge.y, rotate: badge.rotation }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.05 }}
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
              <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <span className="text-white/60 group-hover:text-white transition-colors">{badge.icon}</span>
              <span className="text-base tracking-tight text-white/90 group-hover:text-white whitespace-nowrap">{badge.label}</span>
            </motion.button>
          );
        })}
      </div>
    </>
  );
}
