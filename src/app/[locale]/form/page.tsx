'use client';

import { useState } from 'react';
import { GraduationCap, School, User, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';

/** Sınıf seçenekleri — sitenin gerçekten hizmet verdiği kademeler
 *  (messages/tr.json → Services.items). */
const SINIF_OPTIONS = [
  '6. Sınıf',
  '7. Sınıf',
  '8. Sınıf',
  '9. Sınıf',
  '10. Sınıf',
  '11. Sınıf',
  '12. Sınıf',
  'Mezun',
];

/** Program seçenekleri — Services.sections kategorileri. */
const PROGRAM_OPTIONS = [
  'Ortaokul Programı',
  'Lise Programı',
  'VIP Programlar',
  'Destek & Analiz (Özel Ders / Deneme Kulübü)',
  'Henüz Karar Vermedim',
];

const inputCls =
  'w-full px-5 py-4 rounded-2xl bg-background/50 border border-black/10 dark:border-white/10 focus:border-primary outline-none transition-colors font-light text-sm';

export default function FormPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'landing',
          studentName: data.studentName,
          parentName: data.parentName,
          phone: data.phone,
          email: data.email || '',
          grade: data.grade,
          school: data.school,
          district: data.district,
          program: data.program,
          note: data.note || '',
          // Genel özet — e-posta şablonu değişse bile veri kaybolmaz
          name: `${data.studentName} (Veli: ${data.parentName})`,
          subject: `Reklam Formu - ${data.grade} - ${data.program}`,
          message:
            `Öğrenci: ${data.studentName}\nVeli: ${data.parentName}\nTelefon: ${data.phone}\n` +
            `Sınıf: ${data.grade}\nOkul: ${data.school}\nİlçe: ${data.district}\n` +
            `Program: ${data.program}\nNot: ${data.note || '-'}`,
        }),
      });
      // ÖNEMLİ: eskiden catch bloğu da setSubmitted(true) yapıyordu — gönderim
      // başarısız olsa bile "Başvurunuz Alındı" gösteriliyor, reklam
      // kampanyasından gelen başvurular sessizce kayboluyordu.
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-transparent">
        <div className="animate-pop-in text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-b from-slate-900 to-slate-900/60 dark:from-white dark:to-white/60 bg-clip-text text-transparent">
            Başvurunuz Alındı!
          </h2>
          <p className="text-foreground/50 font-light text-lg">
            En kısa sürede sizinle iletişime geçeceğiz. Teşekkür ederiz.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-32 md:pb-24 relative bg-transparent">
      {/* Arka plan gradient'leri */}
      <div className="absolute top-0 right-0 w-[500px] max-w-full h-[500px] bg-primary/5 rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] max-w-full h-[300px] bg-accent/5 rounded-full pointer-events-none -z-10" />

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        {/* Başlık */}
        <div className="text-center mb-12">
          {/* Logo beyaz zeminli bir PNG — `dark:invert` marka renklerini
              bozuyordu; onun yerine her iki temada beyaz bir kutu içinde. */}
          <div className="animate-fade-up flex justify-center mb-6">
            <div className="bg-white rounded-2xl p-2 shadow-sm">
              <Image
                src="/logos/Sevinc-Kurs-Logo.png"
                alt="Bahçelievler Sevinç Dershanesi"
                width={80}
                height={80}
                sizes="80px"
                priority
                className="w-[72px] h-[72px] object-contain"
              />
            </div>
          </div>
          <h1 className="animate-fade-up delay-1 text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-b from-slate-900 to-slate-900/40 dark:from-white dark:to-white/40 bg-clip-text text-transparent leading-tight">
            Ücretsiz Bilgi Al
          </h1>
          <p className="animate-fade-up delay-2 text-lg text-foreground/50 max-w-lg mx-auto font-light">
            Öğrenciniz için en uygun programı birlikte belirleyelim. Formu doldurun, sizi arayalım.
          </p>
        </div>

        {/* Form */}
        <div className="animate-fade-up delay-3 p-8 md:p-10 rounded-[32px] bg-slate-100 dark:bg-accent-muted border border-black/10 dark:border-white/10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="studentName" className="text-sm font-medium text-foreground/60 ml-1 flex items-center gap-2">
                <User className="w-4 h-4" />
                Öğrenci Adı Soyadı *
              </label>
              <input id="studentName" name="studentName" type="text" required autoComplete="name" placeholder="Örn: Ahmet Yılmaz" className={inputCls} />
            </div>

            <div className="space-y-2">
              <label htmlFor="parentName" className="text-sm font-medium text-foreground/60 ml-1 flex items-center gap-2">
                <User className="w-4 h-4" />
                Veli Adı Soyadı *
              </label>
              <input id="parentName" name="parentName" type="text" required placeholder="Örn: Mehmet Yılmaz" className={inputCls} />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-foreground/60 ml-1 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telefon Numarası *
              </label>
              <input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="05XX XXX XX XX" className={inputCls} />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground/60 ml-1">
                E-posta (opsiyonel)
              </label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="ornek@email.com" className={inputCls} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="grade" className="text-sm font-medium text-foreground/60 ml-1 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Önümüzdeki Yıl Sınıfı *
                </label>
                <select id="grade" name="grade" required defaultValue="" className={inputCls}>
                  <option value="" disabled>Seçiniz</option>
                  {SINIF_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="school" className="text-sm font-medium text-foreground/60 ml-1 flex items-center gap-2">
                  <School className="w-4 h-4" />
                  Mevcut Okulu *
                </label>
                <input id="school" name="school" type="text" required placeholder="Okul adı" className={inputCls} />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="district" className="text-sm font-medium text-foreground/60 ml-1">
                Bulunduğunuz İlçe *
              </label>
              <input id="district" name="district" type="text" required placeholder="Örn: Bahçelievler" className={inputCls} />
            </div>

            <div className="space-y-2">
              <label htmlFor="program" className="text-sm font-medium text-foreground/60 ml-1">
                İlgilendiğiniz Program *
              </label>
              <select id="program" name="program" required defaultValue="" className={inputCls}>
                <option value="" disabled>Seçiniz</option>
                {PROGRAM_OPTIONS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="note" className="text-sm font-medium text-foreground/60 ml-1">
                Eklemek İstediğiniz Not (opsiyonel)
              </label>
              <textarea id="note" name="note" rows={3} placeholder="Varsa eklemek istediğiniz bilgi..." className={`${inputCls} resize-none`} />
            </div>

            {status === 'error' && (
              <div className="flex items-start gap-2 p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-300">
                  Başvurunuz gönderilemedi. Lütfen tekrar deneyin veya bizi arayın:{' '}
                  <a href="tel:+902125054001" className="font-semibold underline">0212 505 40 01</a>
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-5 bg-[#E35205] hover:bg-[#A03500] disabled:opacity-60 text-white font-semibold rounded-2xl transition-colors shadow-[0_0_20px_rgba(227,82,5,0.3)] flex items-center justify-center gap-2 group text-base"
            >
              {status === 'sending' ? 'Gönderiliyor...' : 'Bilgi Talep Et'}
              {status !== 'sending' && (
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              )}
            </button>
          </form>

          <p className="text-xs text-foreground/30 text-center mt-4 font-light">
            Bilgileriniz gizli tutulur ve sadece iletişim amacıyla kullanılır.
          </p>
        </div>
      </div>
    </div>
  );
}
