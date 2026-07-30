import React from 'react';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { BookOpen, GraduationCap, Trophy, Users } from 'lucide-react';

/**
 * Program etiketleri — server component.
 *
 * Önceden framer-motion spring + hover'da `filter: blur(4px)` vardı; blur
 * filtresi her hover'da tüm katmanı yeniden boyatıyordu. Artık saf CSS
 * transform/opacity. `useRouter().push` yerine gerçek <Link> kullanılıyor
 * (prefetch çalışır, sağ tık → yeni sekme çalışır, JS gerekmez).
 */
interface Badge {
  slug: string;
  href: string;
  label: string;
  icon: React.ReactNode;
  rotation: number;
  x: number;
  y: number;
  color: string;
  zIndex?: number;
}

const badges: Badge[] = [
  { slug: '9-sinif',   href: '/services/9-sinif',   label: '9. Sınıf',        icon: <BookOpen className="w-4 h-4" />,      rotation: -12, x: -280, y: -80,  color: 'from-[#E35205] to-[#A03500]' },
  { slug: '10-sinif',  href: '/services/10-sinif',  label: '10. Sınıf',       icon: <BookOpen className="w-4 h-4" />,      rotation: 8,   x: -120, y: -140, color: 'from-[#2E3192] to-[#242672]' },
  { slug: '11-sinif',  href: '/services/11-sinif',  label: '11. Sınıf',       icon: <GraduationCap className="w-4 h-4" />, rotation: -5,  x: 150,  y: -120, color: 'from-[#E35205] to-[#2E3192]' },
  { slug: '12-sinif',  href: '/services/12-sinif',  label: '12. Sınıf & YKS', icon: <Trophy className="w-4 h-4" />,        rotation: 10,  x: 260,  y: -30,  color: 'from-zinc-800 to-zinc-900' },
  { slug: 'mezun',     href: '/services/mezun',     label: 'Mezun',           icon: <GraduationCap className="w-4 h-4" />, rotation: 6,   x: -220, y: 60,   color: 'from-[#2E3192] to-[#E35205]' },
  { slug: 'ozel-ders', href: '/services/ozel-ders', label: 'Özel Ders',       icon: <Users className="w-4 h-4" />,         rotation: -8,  x: 180,  y: 90,   color: 'from-[#E35205] to-[#A03500]' },
  { slug: 'rehberlik', href: '/rehberlik',          label: 'Rehberlik',       icon: <Users className="w-4 h-4" />,         rotation: 0,   x: -40,  y: -20,  color: 'from-[#2E3192] to-[#242672]', zIndex: 50 },
];

const badgeBase =
  'bg-gradient-to-br font-bold text-white border border-white/10 inline-flex items-center rounded-2xl';

export default function MarketingBadges() {
  return (
    <>
      {/* MOBİL: taşmayan flex grid */}
      <div className="md:hidden w-full px-4 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {badges.map((badge) => (
            <Link
              key={badge.slug}
              href={badge.href}
              className={cn(
                badgeBase,
                'gap-2 px-5 py-3 shadow-lg text-sm active:scale-95 transition-transform',
                badge.color,
              )}
            >
              <span className="text-white/70">{badge.icon}</span>
              <span className="tracking-tight text-white/90 whitespace-nowrap">{badge.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* MASAÜSTÜ: dağınık yüzen yerleşim.
          Konum/rotasyon dış sarmalayıcıda, hover ölçeği içte — böylece inline
          transform ile hover:scale birbirini ezmiyor. */}
      <div className="hidden md:flex relative h-[500px] w-full items-center justify-center">
        {badges.map((badge) => (
          <div
            key={badge.slug}
            className="absolute"
            style={{
              transform: `translate(${badge.x}px, ${badge.y}px) rotate(${badge.rotation}deg)`,
              zIndex: badge.zIndex ?? 10,
            }}
          >
            <Link
              href={badge.href}
              className={cn(
                badgeBase,
                'group gap-3 px-8 py-4 shadow-2xl transition-transform duration-300 hover:scale-110',
                badge.color,
              )}
            >
              <span className="text-white/60 group-hover:text-white transition-colors">
                {badge.icon}
              </span>
              <span className="text-base tracking-tight text-white/90 whitespace-nowrap">
                {badge.label}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
