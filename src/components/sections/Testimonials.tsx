'use client';

import { useTranslations } from 'next-intl';
import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1';
import { motion } from 'framer-motion';

const testimonialsData = [
  { image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop", name: "İrem Aydın", role: "İrem Beauty - Founder" },
  { image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop", name: "Murat Yılmaz", role: "YDA Center - Director" },
  { image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop", name: "Selin Onur", role: "ONR Jewelry - Creative" },
  { image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop", name: "Caner Öz", role: "Digital Marketing Mgr" },
  { image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&h=150&auto=format&fit=crop", name: "Deniz Erten", role: "E-Commerce Expert" },
  { image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop", name: "Arda Güler", role: "Content Creator" },
  { image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&auto=format&fit=crop", name: "Merve Şahin", role: "Project Manager" },
  { image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=150&h=150&auto=format&fit=crop", name: "Ahmet Ak", role: "Public Relations" },
  { image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=150&h=150&auto=format&fit=crop", name: "Buse Terim", role: "Startup Founder" },
];

export default function TestimonialsSection() {
  const t = useTranslations('Testimonials');

  const testimonials = testimonialsData.map((item, i) => ({
    ...item,
    text: t(`items.${i}.text`),
  }));

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent mb-4"
        >
          {t('title')}
        </motion.h2>
        <p className="text-foreground/40 font-light">{t('subtitle')}</p>
      </div>

      <div className="flex justify-center gap-6 h-[738px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
        <TestimonialsColumn testimonials={testimonials.slice(0, 3)} duration={15} />
        <TestimonialsColumn testimonials={testimonials.slice(3, 6)} duration={20} className="hidden md:block" />
        <TestimonialsColumn testimonials={testimonials.slice(6, 9)} duration={17} className="hidden lg:block" />
      </div>
    </section>
  );
}
