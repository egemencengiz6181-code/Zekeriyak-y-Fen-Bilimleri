'use client';

import {useTranslations} from 'next-intl';
import {motion, useMotionValue, useSpring, useTransform} from 'framer-motion';
import {useEffect} from 'react';

function AnimatedBackground() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, {stiffness: 40, damping: 30});
  const springY = useSpring(mouseY, {stiffness: 40, damping: 30});

  const auraX = useTransform(springX, [0, 1], ['-55%', '-25%']);
  const auraY = useTransform(springY, [0, 1], ['-55%', '-25%']);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base dark */}
      <div className="absolute inset-0 bg-background" />

      {/* Primary aura — follows cursor */}
      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full blur-[140px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #6d28d9 0%, #4c1d95 50%, transparent 80%)',
          x: auraX,
          y: auraY,
          left: '50%',
          top: '50%',
        }}
      />

      {/* Accent halo — slow idle float */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
          opacity: 0.15,
          left: '20%',
          top: '30%',
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -25, 15, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Deep cold violet — bottom right */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-10"
        style={{
          background: 'radial-gradient(circle, #312e81 0%, transparent 70%)',
          right: '10%',
          bottom: '15%',
        }}
        animate={{
          x: [0, -20, 10, 0],
          y: [0, 20, -10, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle noise grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />
    </div>
  );
}

const wordVariants = {
  hidden: {opacity: 0, y: 28, filter: 'blur(6px)'},
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.3 + i * 0.08,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeUp = {
  hidden: {opacity: 0, y: 20},
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.15,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

interface HeroProps {
  locale: string;
}

export default function Hero({locale}: HeroProps) {
  const t = useTranslations('Hero');
  const headline = t('headline');
  const words = headline.split(' ');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />

      {/* Fine horizontal rule at top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        initial={{scaleX: 0, opacity: 0}}
        animate={{scaleX: 1, opacity: 1}}
        transition={{duration: 1.4, ease: 'easeOut'}}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow tag */}
        <motion.div
          className="inline-flex items-center gap-2 mb-10 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary-light text-xs font-medium tracking-widest uppercase"
          initial={{opacity: 0, y: -10}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, delay: 0.1}}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Renee DesignLab
        </motion.div>

        {/* Animated headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em] last:mr-0 bg-gradient-to-b from-white via-white to-white/30 bg-clip-text text-transparent"
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Slogan */}
        <motion.p
          className="text-base sm:text-lg text-foreground/45 font-light max-w-xl mx-auto mb-12 leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={words.length + 1}
        >
          {t('slogan')}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={words.length + 2}
        >
          <a
            href={`/${locale}/services`}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-sm tracking-wide text-white overflow-hidden transition-all duration-300"
          >
            {/* Glow layer */}
            <span className="absolute inset-0 rounded-full bg-primary opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute inset-0 rounded-full bg-primary blur-xl scale-75 opacity-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500" />
            {/* Inner border shine */}
            <span className="absolute inset-[1px] rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <span className="relative">{t('cta')}</span>
            <motion.span
              className="relative"
              animate={{x: [0, 4, 0]}}
              transition={{duration: 1.8, repeat: Infinity, ease: 'easeInOut'}}
            >
              →
            </motion.span>
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 2, duration: 1}}
        >
          <span className="text-foreground/20 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-primary/50 to-transparent"
            animate={{scaleY: [0, 1, 0], originY: 0}}
            transition={{duration: 2, repeat: Infinity, ease: 'easeInOut'}}
          />
        </motion.div>
      </div>

      {/* Bottom edge fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
