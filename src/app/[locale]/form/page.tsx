'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

/* ── Seçenekler — sitenin kendi programlarından türetildi ──────────────────
   Sınıflar: src/app/[locale]/services/page.tsx içindeki ServiceCard slug'ları
   ve messages/tr.json > Services.items anahtarları.
   Programlar: messages/tr.json > Services.sections kategorileri + rehberlik. */
const GRADES = [
  '7. Sınıf',
  '8. Sınıf (LGS)',
  '10. Sınıf',
  '11. Sınıf',
  '12. Sınıf (YKS)',
  'Mezun (YKS)',
  'Açık Lise',
];

const PROGRAMS = [
  'Ortaokul Programı (7-8. Sınıf, LGS)',
  'Lise Programı (10-12. Sınıf, YKS)',
  'Mezun & YKS Programı',
  'Açık Lise Programı',
  'Deneme Kulübü (Destek & Analiz)',
  'Rehberlik Programı',
  'Henüz Karar Vermedim',
];

// İletişim sayfasındaki form input stilinin aynısı
const inputCls =
  'w-full px-6 py-4 rounded-2xl bg-background/50 border border-black/10 dark:border-white/10 focus:border-primary-light outline-none transition-colors font-light text-sm';

const labelCls = 'text-sm font-medium text-foreground/50 ml-1 block mb-2';

export default function FormPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? '').trim();

    const student = get('student');
    const parent = get('parent');
    const phone = get('phone');
    const email = get('email');
    const grade = get('grade');
    const school = get('school');
    const district = get('district');
    const program = get('program');
    const note = get('note');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${student} (Veli: ${parent})`,
          email: email || 'form@landing.com',
          subject: `Reklam Formu - ${grade} - ${program}`,
          message: [
            `Öğrenci: ${student}`,
            `Veli: ${parent}`,
            `Telefon: ${phone}`,
            `E-posta: ${email || '-'}`,
            `Sınıf: ${grade}`,
            `Okul: ${school}`,
            `İlçe: ${district}`,
            `Program: ${program}`,
            `Not: ${note || '-'}`,
          ].join('\n'),
        }),
      });

      if (!res.ok) throw new Error(`Sunucu ${res.status} döndü`);
      setSent(true);
    } catch {
      setError(
        'Başvuru gönderilemedi. Lütfen tekrar deneyin veya 0212 201 58 48 numaralı telefondan bize ulaşın.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Hafif ambient glow — blur filtresi yok, sadece maskeli gradient */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-primary/5 rounded-full glow-soft pointer-events-none -z-10"
      />

      <div className="max-w-2xl mx-auto">
        {/* ── Logo + başlık ── */}
        <div className="text-center mb-12">
          <Image
            src="/logos/fen-bilimleri-logo.png"
            alt="Zekeriyaköy Nazmi Arıkan Fen Bilimleri"
            width={220}
            height={74}
            className="h-16 w-auto object-contain mx-auto mb-8"
            priority
          />
          <h1 className="enter-up text-3xl md:text-5xl font-bold tracking-tighter mb-4 leading-tight">
            Kayıt ve Bilgi Formu
          </h1>
          <p
            className="enter-up text-base md:text-lg text-foreground/50 font-light leading-relaxed"
            style={{ animationDelay: '0.1s' }}
          >
            Formu doldurun, öğrenciniz için en uygun programı birlikte belirleyelim.
            En kısa sürede sizi arayalım.
          </p>
        </div>

        {sent ? (
          /* ── Başarı ekranı ── */
          <div className="enter-fade rounded-[32px] border border-black/10 dark:border-white/10 bg-background/50 p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Başvurunuz Alındı</h2>
            <p className="text-foreground/50 font-light leading-relaxed max-w-md mx-auto">
              Teşekkür ederiz. Danışmanlarımız en kısa sürede sizinle iletişime geçecek.
              Acil durumlar için{' '}
              <a href="tel:+902122015848" className="text-primary-light font-medium hover:underline">
                0212 201 58 48
              </a>{' '}
              numaralı telefondan bize ulaşabilirsiniz.
            </p>
          </div>
        ) : (
          /* ── Form ── */
          <form
            onSubmit={handleSubmit}
            className="rounded-[32px] border border-black/10 dark:border-white/10 bg-background/50 p-7 md:p-10 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="student" className={labelCls}>
                  Öğrenci Adı Soyadı <span className="text-primary">*</span>
                </label>
                <input id="student" name="student" type="text" required autoComplete="name" className={inputCls} />
              </div>
              <div>
                <label htmlFor="parent" className={labelCls}>
                  Veli Adı Soyadı <span className="text-primary">*</span>
                </label>
                <input id="parent" name="parent" type="text" required className={inputCls} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className={labelCls}>
                  Telefon Numarası <span className="text-primary">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="05XX XXX XX XX"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelCls}>
                  E-posta <span className="text-foreground/30 font-light">(opsiyonel)</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label htmlFor="grade" className={labelCls}>
                Önümüzdeki Yıl Sınıfı <span className="text-primary">*</span>
              </label>
              <select id="grade" name="grade" required defaultValue="" className={inputCls}>
                <option value="" disabled>
                  Seçiniz
                </option>
                {GRADES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="school" className={labelCls}>
                  Mevcut Okulu <span className="text-primary">*</span>
                </label>
                <input id="school" name="school" type="text" required className={inputCls} />
              </div>
              <div>
                <label htmlFor="district" className={labelCls}>
                  Bulunduğunuz İlçe <span className="text-primary">*</span>
                </label>
                <input
                  id="district"
                  name="district"
                  type="text"
                  required
                  placeholder="Örn: Sarıyer"
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label htmlFor="program" className={labelCls}>
                İlgilendiğiniz Program <span className="text-primary">*</span>
              </label>
              <select id="program" name="program" required defaultValue="" className={inputCls}>
                <option value="" disabled>
                  Seçiniz
                </option>
                {PROGRAMS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="note" className={labelCls}>
                Ek Not <span className="text-foreground/30 font-light">(opsiyonel)</span>
              </label>
              <textarea
                id="note"
                name="note"
                rows={4}
                placeholder="Belirtmek istediğiniz bir konu var mı?"
                className={`${inputCls} resize-none`}
              />
            </div>

            {error && (
              <p className="text-sm text-primary bg-primary/10 border border-primary/25 rounded-2xl px-5 py-4">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-[#ec2027] hover:bg-[#c8191f] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition-colors shadow-[0_0_20px_rgba(236,32,39,0.3)] hover:shadow-[0_0_30px_rgba(236,32,39,0.5)] flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              )}
              {loading ? 'Gönderiliyor…' : 'Başvurumu Gönder'}
            </button>

            <p className="text-xs text-foreground/35 text-center leading-relaxed">
              Bilgileriniz yalnızca sizinle iletişime geçmek için kullanılır, üçüncü
              kişilerle paylaşılmaz.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
