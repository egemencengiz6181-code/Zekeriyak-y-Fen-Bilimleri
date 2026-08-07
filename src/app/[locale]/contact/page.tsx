'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Send, CheckCircle2, Loader2 } from 'lucide-react';
import LocationMap from '@/components/shared/LocationMap';
import LetsWorkSection from '@/components/ui/lets-work-section';

export default function ContactPage() {
  const t = useTranslations('Contact');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? '').trim();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: get('name'),
          email: get('email'),
          subject: `İletişim Formu — ${get('subject') || 'Konu belirtilmedi'}`,
          message: get('message'),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSent(true);
    } catch {
      setError(
        'Mesaj gönderilemedi. Lütfen tekrar deneyin veya 0212 201 58 48 numaralı telefondan bize ulaşın.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-40 pb-24 relative overflow-hidden bg-transparent z-10">
      {/* 900x900 arka plan logosu kaldırıldı — `fixed` olduğu için her
          scroll'da yeniden kompozit ediliyordu (mobil Safari'de takılma). */}

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full glow-soft pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full glow-soft pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h1
            className="enter-up text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-slate-900 to-slate-900/40 dark:from-white dark:to-white/40 bg-clip-text text-transparent leading-tight"
          >
            {t('title')}
          </h1>
          <p
            className="enter-up text-xl text-foreground/40 max-w-2xl mx-auto font-light"
            style={{ animationDelay: '0.1s' }}
          >
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
          <div className="enter-up" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-12">
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-accent-muted flex items-center justify-center border border-black/5 dark:border-white/5 transition-colors group-hover:bg-primary/20">
                  <MapPin className="w-6 h-6 text-primary-light" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t('info.address')}</h3>
                  <p className="text-foreground/40 font-light leading-relaxed">
                    Uskumruköy, Zekeriyaköy Mahallesi, Kilyos Caddesi, No: 238/2, Sarıyer/İstanbul
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-accent-muted flex items-center justify-center border border-black/5 dark:border-white/5 transition-colors group-hover:bg-primary/20">
                  <Phone className="w-6 h-6 text-primary-light" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t('info.phone')}</h3>
                  <p className="text-foreground/40 font-light leading-relaxed hover:text-primary-light transition-colors">
                    0212 201 58 48
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-accent-muted flex items-center justify-center border border-black/5 dark:border-white/5 transition-colors group-hover:bg-primary/20">
                  <Mail className="w-6 h-6 text-primary-light" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t('info.email')}</h3>
                  <p className="text-foreground/40 font-light leading-relaxed hover:text-primary-light transition-colors block">
                    zekeriyakoyfenbilimleri@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="enter-up p-10 rounded-[40px] bg-slate-100 dark:bg-accent-muted border border-black/10 dark:border-white/10 relative"
          >
            {sent ? (
              <div className="enter-fade text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold">{t('form.success_title')}</h3>
                <p className="text-sm text-foreground/50">{t('form.success_text')}</p>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="c-name" className="text-sm font-medium text-foreground/40 ml-1">{t('form.name')}</label>
                  <input id="c-name" name="name" type="text" required autoComplete="name" placeholder={t('form.name_placeholder')} className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-black/10 dark:border-white/10 focus:border-primary-light outline-none transition-colors font-light text-sm" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="c-email" className="text-sm font-medium text-foreground/40 ml-1">{t('form.email')}</label>
                  <input id="c-email" name="email" type="email" required autoComplete="email" placeholder={t('form.email_placeholder')} className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-black/10 dark:border-white/10 focus:border-primary-light outline-none transition-colors font-light text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="c-subject" className="text-sm font-medium text-foreground/40 ml-1">{t('form.subject')}</label>
                <input id="c-subject" name="subject" type="text" required className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-black/10 dark:border-white/10 focus:border-primary-light outline-none transition-colors font-light text-sm" />
              </div>
              <div className="space-y-2">
                <label htmlFor="c-message" className="text-sm font-medium text-foreground/40 ml-1">{t('form.message')}</label>
                <textarea id="c-message" name="message" rows={4} required placeholder={t('form.message_placeholder')} className="w-full px-6 py-4 rounded-2xl bg-background/50 border border-black/10 dark:border-white/10 focus:border-primary-light outline-none transition-colors font-light text-sm resize-none"></textarea>
              </div>

              {error && (
                <p className="text-sm text-primary bg-primary/10 border border-primary/25 rounded-2xl px-5 py-4">
                  {error}
                </p>
              )}

              <button type="submit" disabled={loading} className="w-full py-5 bg-[#ec2027] hover:bg-[#c8191f] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-2xl transition-all shadow-[0_0_20px_rgba(236,32,39,0.3)] hover:shadow-[0_0_30px_rgba(236,32,39,0.5)] flex items-center justify-center gap-2 group">
                {loading ? t('form.sending') : t('form.send')}
                {loading
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              </button>
            </form>
            )}
          </div>
        </div>
      </div>
      
      {/* Harita ve CTA */}
      <LocationMap />
      <LetsWorkSection />
    </div>
  );
}
