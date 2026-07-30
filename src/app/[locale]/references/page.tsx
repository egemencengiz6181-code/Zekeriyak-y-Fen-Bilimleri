import { getTranslations } from 'next-intl/server';
import ReferencesMarquee from '@/components/sections/ReferencesMarquee';

type Student = {
  name: string;
  achievement: string;
  exam: 'LGS' | 'YKS';
};

const students: Student[] = [
  { name: 'Elif K.', achievement: 'LGS 500 Tam Puan', exam: 'LGS' },
  { name: 'Kerem A.', achievement: 'YKS TR 154.', exam: 'YKS' },
  { name: 'Selin T.', achievement: 'LGS 496', exam: 'LGS' },
  { name: 'Mert Ö.', achievement: 'YKS TR 89.', exam: 'YKS' },
  { name: 'Zeynep B.', achievement: 'LGS 492', exam: 'LGS' },
  { name: 'Arda Y.', achievement: 'YKS TR 312.', exam: 'YKS' },
  { name: 'Melis G.', achievement: 'LGS 488', exam: 'LGS' },
  { name: 'Can S.', achievement: 'YKS TR 45.', exam: 'YKS' },
];

function AchievementCard({ name, achievement, exam }: Student) {
  const isLGS = exam === 'LGS';
  return (
    <div className="group relative rounded-2xl p-px overflow-hidden">
      {/* Gradient border layer */}
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
          isLGS
            ? 'bg-gradient-to-br from-blue-500/40 via-blue-300/10 to-transparent'
            : 'bg-gradient-to-br from-primary/50 via-primary/10 to-transparent'
        }`}
      />
      {/* Card body */}
      <div className="relative rounded-[15px] bg-white dark:bg-neutral-900 px-5 py-8 flex flex-col items-center text-center gap-3 h-full min-h-[170px] justify-center">
        <span
          className={`text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1 rounded-full ${
            isLGS
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
              : 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
          }`}
        >
          {exam}
        </span>
        <p className="text-xl md:text-2xl font-black text-foreground leading-tight">
          {achievement}
        </p>
        <p className="text-xs font-semibold text-foreground/40">{name}</p>
      </div>
      {/* Hover glow behind card */}
      <div
        className={`absolute inset-0 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl ${
          isLGS ? 'bg-blue-400/15' : 'bg-primary/20'
        }`}
      />
    </div>
  );
}

export default async function ReferencesPage() {
  const t = await getTranslations('References');

  return (
    <main className="min-h-screen bg-background">
      {/* ── Hero Section ──────────────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/5 blur-[140px] rounded-full" />
        </div>
        <div className="relative max-w-3xl mx-auto space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary/70">
            Başarı Hikayeleri
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
            {t('title')}
          </h1>
          <p className="text-lg text-foreground/50 max-w-xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* ── Student Cards Grid ─────────────────────────────────────────────── */}
      <section className="pb-28 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {students.map((student) => (
            <AchievementCard key={student.name} {...student} />
          ))}
        </div>
      </section>

      {/* ── Marquee Section ────────────────────────────────────────────────── */}
      <ReferencesMarquee />
    </main>
  );
}
