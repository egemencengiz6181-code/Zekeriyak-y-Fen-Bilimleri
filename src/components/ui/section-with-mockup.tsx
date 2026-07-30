import React from 'react';
import { FlaskConical, Trophy, Users, BookOpen, BookMarked } from 'lucide-react';
import Image from 'next/image';
import Reveal from '@/components/ui/reveal';

/**
 * Server component — önceden framer-motion `useAnimation` + `useInView` ile
 * sonsuz yüzen görsel animasyonu vardı (her karede JS). Artık CSS keyframe.
 */
interface SectionWithMockupProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  badge?: string;
}

const stats = [
  { icon: Trophy,       value: '15+',  label: 'Yıl Deneyim' },
  { icon: Users,        value: '500+', label: 'Mezun Öğrenci' },
  { icon: FlaskConical, value: '%94',  label: 'Başarı Oranı' },
  { icon: BookOpen,     value: '6-12', label: 'Sınıf Aralığı' },
];

const SectionWithMockup: React.FC<SectionWithMockupProps> = ({ title, description, badge }) => {
  return (
    <section className="relative bg-white dark:bg-black overflow-hidden py-28 md:py-40">
      {/* Kenar çizgileri */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Başlık */}
        <div className="mb-16 md:mb-20">
          {badge && (
            <Reveal
              as="span"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E35205]/25 bg-[#E35205]/10 text-[11px] font-bold tracking-[0.3em] uppercase text-[#E35205] mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E35205]" />
              {badge}
            </Reveal>
          )}
          <Reveal
            as="h2"
            delay={0.12}
            className="text-3xl md:text-5xl lg:text-[56px] font-bold tracking-tighter leading-tight text-slate-900 dark:text-white max-w-2xl"
          >
            {title}
          </Reveal>
        </div>

        {/* Ana grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Sol: yüzen görsel yığını */}
          <Reveal className="relative h-[320px] sm:h-[420px] md:h-[480px] lg:h-[580px]">
            {/* Arka görsel */}
            <div className="animate-float-a absolute bottom-0 left-0 w-[74%] h-[72%] rounded-2xl overflow-hidden border border-black/10 dark:border-white/[0.07]">
              <Image
                src="/okul2/unnamed-6.jpg"
                alt=""
                fill
                sizes="(max-width: 768px) 80vw, 40vw"
                className="object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-transparent to-transparent" />
            </div>

            {/* Ön görsel */}
            <div className="animate-float-b absolute top-0 right-0 w-[70%] h-[78%] rounded-2xl overflow-hidden border border-black/10 dark:border-white/[0.11] shadow-2xl">
              <Image
                src="/okul2/unnamed-7.jpg"
                alt=""
                fill
                sizes="(max-width: 768px) 80vw, 40vw"
                className="object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/45" />
              <div className="absolute top-0 left-0 w-1 h-16 bg-gradient-to-b from-[#E35205] to-transparent rounded-full" />
            </div>

            {/* Yüzen istatistik etiketi */}
            <Reveal
              delay={0.5}
              className="absolute bottom-4 right-2 sm:bottom-8 sm:right-2 md:-right-4 z-20 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/90 shadow-xl"
            >
              <div className="w-9 h-9 rounded-xl bg-[#E35205]/20 flex items-center justify-center shrink-0">
                <Trophy className="w-4 h-4 text-[#E35205]" />
              </div>
              <div>
                <p className="text-slate-900 dark:text-white font-bold text-sm leading-none">%94 Başarı</p>
                <p className="text-slate-500 dark:text-white/40 text-xs mt-0.5">YKS Sınav Oranı</p>
              </div>
            </Reveal>
          </Reveal>

          {/* Sağ: metin + istatistikler */}
          <div className="flex flex-col gap-8 lg:pt-4">
            <Reveal
              as="p"
              className="text-slate-600 dark:text-white/55 text-base md:text-[17px] leading-[1.85] max-w-lg"
            >
              {description}
            </Reveal>

            <Reveal
              delay={0.1}
              className="h-px w-full bg-gradient-to-r from-[#E35205]/30 via-black/10 dark:via-white/10 to-transparent"
            />

            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ icon: Icon, value, label }, i) => (
                <Reveal
                  key={label}
                  delay={i * 0.08}
                  className="group relative flex flex-col gap-3 p-5 rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-black/[0.03] dark:bg-white/[0.03] hover:border-[#E35205]/30 hover:bg-[#E35205]/[0.04] transition-colors duration-300 cursor-default"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#E35205]/10 flex items-center justify-center group-hover:bg-[#E35205]/20 transition-colors">
                    <Icon className="w-4 h-4 text-[#E35205]" />
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white font-bold text-2xl leading-none">{value}</p>
                    <p className="text-slate-500 dark:text-white/40 text-xs mt-1">{label}</p>
                  </div>
                </Reveal>
              ))}

              <Reveal
                delay={0.32}
                className="col-span-2 group relative flex flex-col gap-3 p-5 rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-black/[0.03] dark:bg-white/[0.03] hover:border-[#E35205]/30 hover:bg-[#E35205]/[0.04] transition-colors duration-300 cursor-default"
              >
                <div className="w-9 h-9 rounded-xl bg-[#E35205]/10 flex items-center justify-center group-hover:bg-[#E35205]/20 transition-colors">
                  <BookMarked className="w-4 h-4 text-[#E35205]" />
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white font-bold text-sm leading-snug">Kişiye Özel Kitap - Sıfır Hata</p>
                  <p className="text-slate-500 dark:text-white/40 text-xs mt-1 leading-relaxed">
                    Öğrencilerimize özel olarak hazırladığımız sıfır hata kitapçıkları, denemelerde sık yapılan
                    hataları içeren sorular barındırır. Bu kitapçıklar, öğrencilerimizin zayıf olduğu konularda daha
                    fazla çalışma fırsatı sunar. Kişiye özel kitaplar ise denemelerde sık yapılan hataların yapay zeka
                    ile analiz edilerek hazırlanmış benzer sorularını içerir.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWithMockup;
