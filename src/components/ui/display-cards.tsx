"use client";
import { cn } from "@/lib/utils";
import { Sparkles, TrendingUp, Zap, ShieldCheck } from "lucide-react";

function DisplayCard({ className, icon, title, description, date, iconClassName, titleClassName }: any) {
  return (
    <div className={cn("relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-white/5 bg-white/5 backdrop-blur-md px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-purple-500/30 hover:bg-white/10 [&>*]:flex [&>*]:items-center [&>*]:gap-2", className)}>
      <div>
        <span className={cn("relative inline-block rounded-full bg-purple-900/50 p-1", iconClassName)}>
          {icon}
        </span>
        <p className={cn("text-lg font-medium text-purple-400", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg text-white/90">{description}</p>
      <p className="text-white/40 text-xs uppercase tracking-widest">{date}</p>
    </div>
  );
}

export default function DisplayCards() {
  const defaultCards = [
    {
      icon: <TrendingUp className="size-4 text-purple-300" />,
      title: "Performans",
      description: "%200 Organik Trafik Artışı",
      date: "SEO Sonuçları",
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Zap className="size-4 text-purple-300" />,
      title: "Hız",
      description: "Ads Dönüşümünde %40 Artış",
      date: "Google & Meta",
      className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <ShieldCheck className="size-4 text-purple-300" />,
      title: "Güven",
      description: "Markanız İçin Dijital Anıtlar",
      date: "Web & Tasarım",
      className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
    },
  ];
  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {defaultCards.map((card, index) => <DisplayCard key={index} {...card} />)}
    </div>
  );
}
