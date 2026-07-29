'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, School, User, Phone, Send, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const SINIF_OPTIONS = [
  '5. Sınıf',
  '6. Sınıf',
  '7. Sınıf',
  '8. Sınıf',
  '9. Sınıf',
  '10. Sınıf',
  '11. Sınıf',
  '12. Sınıf',
  'Mezun',
];

const PROGRAM_OPTIONS = [
  'Ortaokul Programı',
  'Lise Programı',
  'VIP Program',
  'Özel Ders',
  'Deneme Kulübü',
  'Henüz Karar Vermedim',
];

export default function FormPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${data.studentName} (Veli: ${data.parentName})`,
          email: data.email || 'form@landing.com',
          subject: `Reklam Formu - ${data.grade} - ${data.program}`,
          message: `Öğrenci: ${data.studentName}\nVeli: ${data.parentName}\nTelefon: ${data.phone}\nSınıf: ${data.grade}\nOkul: ${data.school}\nİlçe: ${data.district}\nProgram: ${data.program}\nNot: ${data.note || '-'}`,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-transparent">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-b from-slate-900 to-slate-900/60 dark:from-white dark:to-white/60 bg-clip-text text-transparent">
            Başvurunuz Alındı!
          </h2>
          <p className="text-foreground/50 font-light text-lg">
            En kısa sürede sizinle iletişime geçeceğiz. Teşekkür ederiz.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-32 md:pb-24 relative bg-transparent">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full pointer-events-none -z-10" />

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <Image
              src="/logos/Sevinc-Kurs-Logo.png"
              alt="Bahçelievler Sevinç Dershanesi"
              width={80}
              height={80}
              className="dark:invert"
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-b from-slate-900 to-slate-900/40 dark:from-white dark:to-white/40 bg-clip-text text-transparent leading-tight"
          >
            Ücretsiz Bilgi Al
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-foreground/50 max-w-lg mx-auto font-light"
          >
            Öğrenciniz için en uygun programı birlikte belirleyelim. Formu doldurun, sizi arayalım.
          </motion.p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="p-8 md:p-10 rounded-[32px] bg-slate-100 dark:bg-accent-muted border border-black/10 dark:border-white/10"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Öğrenci Adı */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/60 ml-1 flex items-center gap-2">
                <User className="w-4 h-4" />
                Öğrenci Adı Soyadı *
              </label>
              <input
                name="studentName"
                type="text"
                required
                placeholder="Örn: Ahmet Yılmaz"
                className="w-full px-5 py-4 rounded-2xl bg-background/50 border border-black/10 dark:border-white/10 focus:border-primary-light outline-none transition-colors font-light text-sm"
              />
            </div>

            {/* Veli Adı */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/60 ml-1 flex items-center gap-2">
                <User className="w-4 h-4" />
                Veli Adı Soyadı *
              </label>
              <input
                name="parentName"
                type="text"
                required
                placeholder="Örn: Mehmet Yılmaz"
                className="w-full px-5 py-4 rounded-2xl bg-background/50 border border-black/10 dark:border-white/10 focus:border-primary-light outline-none transition-colors font-light text-sm"
              />
            </div>

            {/* Telefon */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/60 ml-1 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telefon Numarası *
              </label>
              <input
                name="phone"
                type="tel"
                required
                placeholder="05XX XXX XX XX"
                className="w-full px-5 py-4 rounded-2xl bg-background/50 border border-black/10 dark:border-white/10 focus:border-primary-light outline-none transition-colors font-light text-sm"
              />
            </div>

            {/* E-posta (opsiyonel) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/60 ml-1">
                E-posta (opsiyonel)
              </label>
              <input
                name="email"
                type="email"
                placeholder="ornek@email.com"
                className="w-full px-5 py-4 rounded-2xl bg-background/50 border border-black/10 dark:border-white/10 focus:border-primary-light outline-none transition-colors font-light text-sm"
              />
            </div>

            {/* Sınıf ve Okul - yan yana */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Sınıf */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/60 ml-1 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Önümüzdeki Yıl Sınıfı *
                </label>
                <select
                  name="grade"
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-background/50 border border-black/10 dark:border-white/10 focus:border-primary-light outline-none transition-colors font-light text-sm appearance-none"
                >
                  <option value="">Seçiniz</option>
                  {SINIF_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Okul */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/60 ml-1 flex items-center gap-2">
                  <School className="w-4 h-4" />
                  Mevcut Okulu *
                </label>
                <input
                  name="school"
                  type="text"
                  required
                  placeholder="Okul adı"
                  className="w-full px-5 py-4 rounded-2xl bg-background/50 border border-black/10 dark:border-white/10 focus:border-primary-light outline-none transition-colors font-light text-sm"
                />
              </div>
            </div>

            {/* İlçe */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/60 ml-1">
                Bulunduğunuz İlçe *
              </label>
              <input
                name="district"
                type="text"
                required
                placeholder="Örn: Bahçelievler"
                className="w-full px-5 py-4 rounded-2xl bg-background/50 border border-black/10 dark:border-white/10 focus:border-primary-light outline-none transition-colors font-light text-sm"
              />
            </div>

            {/* İlgilenilen Program */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/60 ml-1">
                İlgilendiğiniz Program *
              </label>
              <select
                name="program"
                required
                className="w-full px-5 py-4 rounded-2xl bg-background/50 border border-black/10 dark:border-white/10 focus:border-primary-light outline-none transition-colors font-light text-sm appearance-none"
              >
                <option value="">Seçiniz</option>
                {PROGRAM_OPTIONS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Ek Not */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/60 ml-1">
                Eklemek İstediğiniz Not (opsiyonel)
              </label>
              <textarea
                name="note"
                rows={3}
                placeholder="Varsa eklemek istediğiniz bilgi..."
                className="w-full px-5 py-4 rounded-2xl bg-background/50 border border-black/10 dark:border-white/10 focus:border-primary-light outline-none transition-colors font-light text-sm resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-[#E35205] hover:bg-[#A03500] disabled:opacity-60 text-white font-semibold rounded-2xl transition-all shadow-[0_0_20px_rgba(227,82,5,0.3)] hover:shadow-[0_0_30px_rgba(227,82,5,0.5)] flex items-center justify-center gap-2 group text-base"
            >
              {loading ? 'Gönderiliyor...' : 'Bilgi Talep Et'}
              {!loading && <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
            </button>
          </form>

          <p className="text-xs text-foreground/30 text-center mt-4 font-light">
            Bilgileriniz gizli tutulur ve sadece iletişim amacıyla kullanılır.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
