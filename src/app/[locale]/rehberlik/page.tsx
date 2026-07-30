'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from '@/navigation';
import {
  Brain, BarChart2, Users, Presentation, FileText,
  Tent, GraduationCap, ChevronDown, ArrowRight,
  Sparkles, FlaskConical, Bot, CalendarCheck, Bell,
} from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import LetsWorkSection from '@/components/ui/lets-work-section';

const BLUE = '#12648f';
const RED  = '#ec2027';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── Data ─────────────────────────────────────────────────────────── */
type SectionItem = {
  id: string;
  icon: React.ElementType;
  color: string;
  title: string;
  lead: string;
  blocks: { text: string }[];
  tags: string[];
  list?: string[];
};

const SECTIONS: SectionItem[] = [
  {
    id: 'psikolojik',
    icon: Brain,
    color: BLUE,
    title: 'Psikolojik Danışmanlık ve Rehberlik',
    lead: 'Öğrenci Tanıma Formu ile her öğrenciye ait kapsamlı özlük dosyası oluşturulur.',
    blocks: [
      { text: 'Psikolojik Danışmanlık ve Rehberlik Hizmetleri kurumumuzda yapılan "Seviye Belirleme Sınavı" sonrasında tanıma amaçlı Öğrenci Tanıma Formu ile öğrenciye ait özlük dosyalarını oluşturur.' },
      { text: 'Bu dosya öğrencinin devamsızlık bilgilerini, haftalık ders çalışma programlarını, Baykuş Kamplarındaki soru sayılarını aynı zamanda psikolojik, duygusal ve bilişsel alanlarına yönelik çalışmaları içermektedir.' },
      { text: 'Her öğrenci özelinde duygusal, psikolojik ve psikomotor alanlardaki eksikliklerini belirleme, tamamlama ve bu alanlardaki yetkinliklerini artırmaya yönelik çalışmalar yapmaktadır.' },
      { text: 'Beier Cümle Tamamlama testi uygulanır. Bu test öğrencilerimizin paylaşamadığı duygu ve düşüncelerini anlamaya yönelik projektif bir testtir. Öğrenci bu testte eksik cümleleri tamamlayış biçimiyle ilgilerini, tutumlarını, arzu ve beklentilerini yansıtır. Enneagram kişilik testi ile öğrencilerimizi yakından tanıma amaçlanmaktadır.' },
      { text: 'Burdon dikkat testi uygulanmaktadır.' },
      { text: 'Rehberlik birimimiz tarafından ebeveyn, öğretmenler ve öğrenci işbirliği içerisinde öğrencimizin akademik takipleri sıkı bir şekilde yapılmaktadır.' },
    ],
    tags: ['Beier Testi', 'Enneagram', 'Burdon Dikkat', 'Öğrenci Profili'],
  },
  {
    id: 'olcme',
    icon: BarChart2,
    color: RED,
    title: 'Ölçme ve Değerlendirme',
    lead: 'Yapay zeka destekli dijital analiz sistemiyle her öğrencinin performansı anlık takip edilir.',
    blocks: [
      { text: 'Akademik takvimimize göre yapılan her deneme sınavı sonrasında rehberlik birimimiz soru çözüm saatlerini düzenlemektedir. Branş öğretmenlerimiz tarafından boş bırakılan ya da yanlış yapılan sorular çözülmektedir.' },
      { text: '"YAPAY ZEKA DESTEKLİ" eğitim modelimizin içerisinde yapılan ölçme ve değerlendirme sonuçlarımız dijital ortama aktarılmaktadır. Her öğrenci ve veliye özel olarak tanımlanan profiller sayesinde deneme sınavı sonuçlarına ve kazanımlarına kolaylıkla ulaşılmaktadır.' },
      { text: 'Yapay zeka destekli rehberlik hizmetimizde dijital ortama aktarılan sonuçlar Rehberlik birimimize grafik ve tablo şeklinde sunulur.' },
      { text: 'Yapay zeka destekli eğitim ile her 10 deneme analiz edilir ve 10 denemede yapılan yanlışlar ve yapılamayan sorularla alakalı öğrenciye özel soru bankası oluşturulup teslim edilir.' },
    ],
    tags: ['Yapay Zeka Analizi', 'Dijital Profil', 'Soru Bankası', 'Grafik Rapor'],
  },
  {
    id: 'rehberlik',
    icon: Users,
    color: BLUE,
    title: 'Rehberlik Hizmetleri',
    lead: 'Randevulu haftalık görüşmeler, veli bilgilendirmeleri ve öğrenci takibi bir arada yürütülür.',
    blocks: [
      { text: 'Öğrencilerimizin akademik başarısını desteklemek esaslı çalışır. Deneme sınavları sonrasında her öğrenci ile randevulu görüşmeler gerçekleştirilir.' },
      { text: 'Randevulu haftalık rehberlik görüşmesinde sınav analizleri yapılarak eksik olduğu noktalar çalışma programına eklenir. Bir hafta süreyle uygulanan çalışma programının akabinde veliye bildirimi yapılır.' },
      { text: 'Öğrenci eksikleri branş öğretmenlerine aktarılıp özel ders alması için yönlendirilir. Eksiği tamamlanan öğrencinin bilgisi öğretmenlerimiz tarafından veliye geri dönüt verilir.' },
      { text: 'Rehberlik birimimiz ayda iki kez velilerimize bilgilendirme yapmaktadır. Öğrencimizin Seviye Belirleme sınavı ile başlayıp almış olduğu puana kıyasla hedefe ulaşması için gerekli yönlendirmeleri veliye aktarmaktadır.' },
      { text: 'Kurumumuzda öğretmenlerimiz tarafından düzenli olarak ödevlendirmeler yapılıp rehberlik birimimiz tarafından kontrolü yapıldıktan sonra veliye geri bildirimi yapılmaktadır.' },
      { text: 'Öğrencilerimize hedefleri doğrultusundaki okullar tanıtılır, gezdirilir. Hedefledikleri üniversitelere gezi düzenlenerek sınav provaları yapılmaktadır.' },
      { text: 'Öğrencilerin kuruma geliş gidişleri Arf sistemiyle raporlanıp veliye bildirilmektedir. Veli toplantılarıyla öğretmen ve velilerimiz bir araya gelerek öğrencilerin özlük dosyaları üzerinde akademik bilgi alışverişi sağlanır. Velilerimizle yapılan görüşmeler mutlaka raporlanmaktadır.' },
    ],
    tags: ['Haftalık Görüşme', 'Veli Bilgilendirme', 'Arf Sistemi', 'Okul Gezisi'],
  },
  {
    id: 'seminerler',
    icon: Presentation,
    color: RED,
    title: 'Seminerler',
    lead: 'Bilişsel, duygusal ve psikolojik ihtiyaçlara göre özel seminerler düzenlenmektedir.',
    blocks: [
      { text: 'Öğrencilerimizin bilişsel, duygusal ve psikolojik ihtiyaçlarına göre bültenler ışığında seminerler düzenlenir ve bilişsel alanlarının farkında vardırma çalışmaları yapılmaktadır.' },
    ],
    list: [
      'Odaklanma ve Dikkat',
      'Veli Eğitim Seminerleri',
      "LGS'ye İlk Adım",
      'Zamanı Etkili Kullanma',
      'Verimli Test Çözme Teknikleri',
      'Liseye / Üniversiteye Geri Sayım',
      'Motivasyon',
    ],
    tags: ['LGS', 'YKS', 'Motivasyon', 'Dikkat'],
  },
  {
    id: 'yazili',
    icon: FileText,
    color: BLUE,
    title: 'Yazılı Çalışmaları',
    lead: 'Tüm kademelerde öğrenciye özel yazılı çalışma programları ve provalar hazırlanmaktadır.',
    blocks: [
      { text: 'Kurumumuzda öğrencilerimize özel tüm kademelerde yazılı çalışma programları düzenlenmektedir. Öğrencilerimizin yazılı takvimleri önceden verilmek suretiyle tüm branşlarda uzman kadromuz tarafından yazılı provaları hazırlanmaktadır.' },
    ],
    tags: ['Tüm Kademeler', 'Uzman Kadro', 'Prova', 'Takvim'],
  },
  {
    id: 'kamplar',
    icon: Tent,
    color: RED,
    title: 'Kamplar',
    lead: 'Yaz, sömestr ve ara tatil kamplarıyla sürekli ve verimli çalışma ortamı sağlanır.',
    blocks: [
      { text: 'Yaz kampımızda öğrencilerimiz sınava daha erken başlar.' },
      { text: 'Ara tatiller Otel Kamplarımızda öğretmenlerimiz ve rehberlik birimimiz gözetmenliğinde öğrencilerimiz verimli soru çözümleri ve deneme sınavlarına katılmaktadır.' },
      { text: 'Sömestr kampımızda tüm branşlarda ihtiyaca göre sınıf özelinde konu tekrarları ve bol soru çözümleri yapılmaktadır.' },
    ],
    tags: ['Yaz Kampı', 'Otel Kampı', 'Sömestr Kampı', 'Baykuş Kampı'],
  },
  {
    id: 'koc',
    icon: GraduationCap,
    color: BLUE,
    title: 'Eğitim Koçu ve Danışmanlık Hizmetleri',
    lead: 'Her öğrenciye atanan eğitim koçu akademik sürecin tüm boyutlarını koordineli yönetir.',
    blocks: [],
    list: [
      'Öğrencinin devamsızlığı takip altına alınır.',
      'Öğrencinin aylık çalışma saatleri rapor edilir.',
      'Öğrenciyle ilgili yapılan tüm çalışmalar veliye bildirilir.',
      'Öğrenciye yönelik motivasyon çalışmaları yapılır.',
      'Öğrenciye düzenli çalışma alışkanlığı kazandırılır.',
      'Rehberlik birimiyle koordineli çalışıp öğrenciyi asıl hedefine ulaştırmayı amaçlar.',
    ],
    tags: ['Devamsızlık Takibi', 'Aylık Rapor', 'Motivasyon', 'Hedef'],
  },
];

/* ─── Section Card (accordion) ──────────────────────────────────────── */
function SectionCard({ section, index }: { section: SectionItem; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = section.icon;
  const color = section.color;

  return (
    <motion.div
      variants={fadeUp} custom={index * 0.5}
      initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
      className="relative rounded-3xl"
    >
      <div
        className="relative rounded-3xl border transition-colors duration-500"
        style={{ borderColor: open ? color + '30' : 'rgba(255,255,255,0.06)' }}
      >
        <GlowingEffect spread={30} glow disabled={false} proximity={60} inactiveZone={0.01} borderWidth={2} />

        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center gap-5 p-7 text-left group"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300"
            style={{
              backgroundColor: color + (open ? '25' : '15'),
              border: `1px solid ${color}${open ? '50' : '30'}`,
            }}
          >
            <Icon className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" style={{ color }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: color + 'aa' }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{section.title}</h3>
            </div>
            <p className="text-slate-500 dark:text-white/40 text-sm leading-relaxed line-clamp-1">{section.lead}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {section.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-[10px] font-semibold border"
                  style={{ backgroundColor: color + '12', borderColor: color + '28', color }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
            style={{
              backgroundColor: open ? color + '20' : 'rgba(255,255,255,0.04)',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <ChevronDown className="w-4 h-4 text-white/50" />
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-7 pb-7">
                <div className="h-px mb-6 rounded-full" style={{ background: `linear-gradient(to right,${color}40,transparent)` }} />
                <div className="space-y-4">
                  {section.blocks.map((block, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0" style={{ backgroundColor: color }} />
                      <p className="text-slate-600 dark:text-white/60 leading-relaxed text-sm">{block.text}</p>
                    </div>
                  ))}
                  {section.list && (
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {section.list.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-black/[0.05] dark:border-white/[0.05] bg-black/[0.02] dark:bg-white/[0.02]">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                          <span className="text-slate-600 dark:text-white/65 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className="absolute bottom-0 left-0 h-[2px] rounded-b-3xl transition-all duration-500"
          style={{
            background: `linear-gradient(to right,${color},${color === BLUE ? RED : BLUE})`,
            width: open ? '100%' : '0%',
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Stat card ──────────────────────────────────────────────────────── */
function StatCard({ icon: Icon, label, color }: { icon: React.ElementType; label: string; color: string }) {
  return (
    <div className="flex items-center gap-3 p-5 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-sm">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: color + '20' }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <span className="text-sm font-semibold text-slate-700 dark:text-white/80 leading-tight">{label}</span>
    </div>
  );
}

export default function RehberlikPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY  = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOp = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ambient glows */}
      <div className="fixed top-[-80px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#12648f]/8 blur-[180px] rounded-full pointer-events-none -z-10" />
      <div className="fixed top-[40%] right-[-80px] w-[500px] h-[500px] bg-[#ec2027]/5 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-[-80px] w-[400px] h-[400px] bg-[#12648f]/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* ══ HERO ════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center pt-32 pb-20 px-6">
        <motion.div style={{ y: heroY, opacity: heroOp }} className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div>
              <motion.div
                variants={fadeUp} custom={0} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#12648f]/30 bg-[#12648f]/[0.08] backdrop-blur-sm mb-8"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#12648f]" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#12648f]">Zekeriyaköy Fen Bilimleri</span>
              </motion.div>

              <motion.h1
                variants={fadeUp} custom={1} initial="hidden" animate="show"
                className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tighter leading-[1.05] mb-6"
              >
                <span className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900/40 dark:from-white dark:via-white dark:to-white/40 bg-clip-text text-transparent">
                  Psikolojik Danışmanlık
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#12648f] to-[#ec2027] bg-clip-text text-transparent">
                  ve Rehberlik Hizmetleri
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp} custom={2} initial="hidden" animate="show"
                className="text-base text-slate-500 dark:text-white/50 font-light leading-relaxed mb-10 max-w-lg"
              >
                Seviye Belirleme Sınavı&apos;ndan başlayarak her öğrenciye özel oluşturulan kapsamlı danışmanlık programı; psikolojik testler, yapay zeka destekli analiz ve düzenli veli raporlarını bir arada sunar.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} initial="hidden" animate="show" className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-sm text-white transition-all duration-300 group"
                  style={{ background: `linear-gradient(135deg,${BLUE},#0d4f70)`, boxShadow: `0 0 40px ${BLUE}40` }}
                >
                  Görüşme Talep Et
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#detaylar"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-sm text-slate-500 dark:text-white/60 border border-black/[0.08] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 hover:text-slate-900 dark:hover:text-white transition-all duration-300"
                >
                  Detayları Gör
                </a>
              </motion.div>
            </div>

            <motion.div variants={fadeUp} custom={4} initial="hidden" animate="show" className="relative">
              <div className="absolute -inset-4 rounded-[40px] blur-[60px] opacity-25 pointer-events-none" style={{ background: `linear-gradient(135deg,${BLUE}50,${RED}30)` }} />
              <div className="relative rounded-3xl border border-black/[0.07] dark:border-white/[0.07] bg-black/[0.03] dark:bg-white/[0.03] backdrop-blur-2xl p-8">
                <GlowingEffect spread={50} glow disabled={false} proximity={80} inactiveZone={0.01} borderWidth={2} />

                <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-2xl border border-[#ec2027]/20 bg-[#ec2027]/[0.07]">
                  <Bot className="w-5 h-5 text-[#ec2027]" />
                  <div>
                    <p className="text-slate-900 dark:text-white text-sm font-bold">Dijital Analiz</p>
                    <p className="text-slate-500 dark:text-white/40 text-xs">Dijital analiz ve kişisel soru bankası</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <StatCard icon={CalendarCheck} label="Haftalık Randevulu Görüşme" color={BLUE} />
                  <StatCard icon={Bell}          label="Aylık Veli Bilgilendirme"   color={RED}  />
                  <StatCard icon={FlaskConical}   label="Psikolojik Testler"         color={BLUE} />
                  <StatCard icon={BarChart2}      label="Denemede Özel Analiz"       color={RED}  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* ══ ACCORDION SECTIONS ══════════════════════════════════════════ */}
      <section id="detaylar" className="max-w-4xl mx-auto px-6 pb-32 space-y-4">
        <motion.div
          variants={fadeUp} custom={0} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-3" style={{ color: BLUE }}>Hizmet Başlıkları</p>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Tüm Hizmetlerimiz</h2>
          <p className="text-slate-500 dark:text-white/35 mt-3 text-sm">Genişletmek için bölüme tıklayın</p>
        </motion.div>

        {SECTIONS.map((section, i) => (
          <SectionCard key={section.id} section={section} index={i} />
        ))}
      </section>

      <LetsWorkSection />
    </div>
  );
}
