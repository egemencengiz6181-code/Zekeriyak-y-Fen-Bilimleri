import { getTranslations } from 'next-intl/server';
import ReferencesMarquee from '@/components/sections/ReferencesMarquee';

type Student = {
  name: string;
  achievement: string;
  exam: 'YKS' | 'YKS_RANK';
};

const students: Student[] = [
  { name: 'Yusuf E.',   achievement: 'YKS — Cerrahpaşa Tıp',           exam: 'YKS' },
  { name: 'Elif K.',    achievement: 'YKS TR 156.',                     exam: 'YKS_RANK' },
  { name: 'Arda Y.',    achievement: 'YKS — ODTÜ Havacılık Uzay',      exam: 'YKS' },
  { name: 'Zeynep B.',  achievement: 'YKS — Koç Hukuk (Burslu)',        exam: 'YKS_RANK' },
  { name: 'Kerem A.',   achievement: 'YKS — İTÜ Yazılım Müh.',        exam: 'YKS' },
  { name: 'Melis G.',   achievement: 'YKS TR 415.',                     exam: 'YKS_RANK' },
  { name: 'Can S.',     achievement: 'YKS — Galatasaray İşletme',      exam: 'YKS' },
  { name: 'Selin T.',   achievement: 'YKS — Pilotaj (Burslu)',          exam: 'YKS_RANK' },
];

function AchievementCard({ name, achievement, exam }: Student) {
  const isRank = exam === 'YKS_RANK';
  return (
    <div className="group relative rounded-2xl p-px overflow-hidden">
      {/* Gradient border layer */}
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
          isRank
            ? 'bg-gradient-to-br from-[#2E3192]/40 via-[#2E3192]/10 to-transparent'
            : 'bg-gradient-to-br from-primary/50 via-primary/10 to-transparent'
        }`}
      />
      {/* Card body */}
      <div className="relative rounded-[15px] bg-white dark:bg-neutral-900 px-5 py-8 flex flex-col items-center text-center gap-3 h-full min-h-[170px] justify-center">
        <span
          className={`text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1 rounded-full ${
            isRank
              ? 'bg-[#2E3192]/10 text-[#2E3192] dark:bg-[#2E3192]/20 dark:text-[#8B8FD4]'
              : 'bg-[#E21F26]/10 text-[#E21F26] dark:bg-[#E21F26]/20 dark:text-[#EF8487]'
          }`}
        >
          YKS
        </span>
        <p className="text-xl md:text-2xl font-black text-foreground leading-tight">
          {achievement}
        </p>
        <p className="text-xs font-semibold text-foreground/40">{name}</p>
      </div>
      {/* Hover glow behind card */}
      <div
        className={`absolute inset-0 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl ${
          isRank ? 'bg-[#2E3192]/15' : 'bg-primary/20'
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/5  rounded-full" />
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
