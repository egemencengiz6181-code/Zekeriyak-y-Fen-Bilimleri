'use client';

import { Quote } from 'lucide-react';

interface TestimonialItem {
  name: string;
  role: string;
  text: string;
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <div className="w-[300px] shrink-0 mx-3 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.04] dark:bg-white/[0.04] backdrop-blur-md p-5 flex flex-col gap-3 hover:border-black/[0.10] dark:hover:border-white/[0.10] hover:bg-black/[0.07] dark:hover:bg-white/[0.07] transition-colors duration-300">
      <Quote className="w-4 h-4 text-[#ec2027] opacity-50 shrink-0" />
      <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed italic flex-1">
        &ldquo;{item.text}&rdquo;
      </p>
      <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06]">
        <p className="text-slate-900 dark:text-white font-semibold text-sm">{item.name}</p>
        <p className="text-[#ec2027] text-xs mt-0.5">{item.role}</p>
      </div>
    </div>
  );
}

function MarqueeRow({ items, direction }: { items: TestimonialItem[]; direction: 'left' | 'right' }) {
  const doubled = [...(items ?? []), ...(items ?? [])];
  const animStyle: React.CSSProperties = {
    animation: `marquee-${direction} ${(items?.length ?? 1) * 7}s linear infinite`,
    display: 'flex',
    width: 'max-content',
  };
  return (
    <div className="overflow-hidden">
      <div style={animStyle}>
        {doubled.map((item, i) => (
          <TestimonialCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection({
  items: rawItems = [],
  subtitle = '',
  title = '',
}: {
  items?: TestimonialItem[] | Record<string, TestimonialItem>;
  subtitle?: string;
  title?: string;
}) {
  const items: TestimonialItem[] = Array.isArray(rawItems)
    ? rawItems
    : Object.values(rawItems ?? {});
  const mid = Math.ceil(items.length / 2);
  const row1 = items.slice(0, mid);
  const row2 = items.slice(mid);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-6 text-center mb-16 relative z-10">
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-4">
          {subtitle}
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-900/40 dark:from-white dark:to-white/40 bg-clip-text text-transparent">
          {title}
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        <MarqueeRow items={row1} direction="left" />
        <MarqueeRow items={row2} direction="right" />
      </div>
    </section>
  );
}
