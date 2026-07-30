'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import Reveal from '@/components/ui/reveal';

const LocationMap = dynamic(() => import('@/components/shared/LocationMap'), {
  ssr: false,
  loading: () => <div className="h-[450px] bg-background" />,
});
const LetsWorkSection = dynamic(() => import('@/components/ui/lets-work-section'), {
  ssr: false,
  loading: () => <div className="h-64" />,
});

const inputCls =
  'w-full px-6 py-4 rounded-2xl bg-background/50 border border-black/10 dark:border-white/10 focus:border-primary outline-none transition-colors font-light text-sm';

export default function ContactPage() {
  const t = useTranslations('Contact');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  // ÖNCEDEN: form'un state'i, name attribute'u ve onSubmit'i yoktu —
  // "Gönder"e basınca sayfa yenilenip veri hiçbir yere gitmiyordu.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', ...form }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen pt-40 pb-24 relative overflow-hidden bg-transparent z-10">
      {/* Arka plan gradient'leri (900x900 logo mührü kaldırıldı — mobilde
          gereksiz bir tam ekran katman ve boyama maliyetiydi) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] max-w-full bg-primary/5 rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] max-w-full bg-accent/5 rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h1 className="animate-fade-up text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-slate-900 to-slate-900/40 dark:from-white dark:to-white/40 bg-clip-text text-transparent leading-tight">
            {t('title')}
          </h1>
          <p className="animate-fade-up delay-1 text-xl text-foreground/40 max-w-2xl mx-auto font-light">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
          <Reveal>
            <div className="space-y-12">
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-100 dark:bg-accent-muted flex items-center justify-center border border-black/5 dark:border-white/5 transition-colors group-hover:bg-primary/20">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t('info.address')}</h3>
                  <p className="text-foreground/40 font-light leading-relaxed">
                    Haznedar, Bahçelievler Mahallesi, Bağcılar Caddesi No:11, Bahçelievler/İstanbul
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-100 dark:bg-accent-muted flex items-center justify-center border border-black/5 dark:border-white/5 transition-colors group-hover:bg-primary/20">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t('info.phone')}</h3>
                  <a
                    href="tel:+902125054001"
                    className="block text-foreground/40 font-light hover:text-primary transition-colors"
                  >
                    0(212) 505 40 01
                  </a>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-100 dark:bg-accent-muted flex items-center justify-center border border-black/5 dark:border-white/5 transition-colors group-hover:bg-primary/20">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold mb-2">{t('info.email')}</h3>
                  <a
                    href="mailto:bahcelievlersevinckurs@gmail.com"
                    className="text-foreground/40 font-light leading-relaxed hover:text-primary transition-colors block break-words"
                  >
                    bahcelievlersevinckurs@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="p-8 sm:p-10 rounded-[40px] bg-slate-100 dark:bg-accent-muted border border-black/10 dark:border-white/10 relative"
          >
            {status === 'sent' ? (
              <div className="flex flex-col items-center text-center py-12 gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{t('form.success_title')}</h3>
                <p className="text-sm text-foreground/50">{t('form.success_text')}</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="c-name" className="text-sm font-medium text-foreground/40 ml-1">
                      {t('form.name')}
                    </label>
                    <input
                      id="c-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="c-email" className="text-sm font-medium text-foreground/40 ml-1">
                      {t('form.email')}
                    </label>
                    <input
                      id="c-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="c-subject" className="text-sm font-medium text-foreground/40 ml-1">
                    {t('form.subject')}
                  </label>
                  <input
                    id="c-subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => set('subject', e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="c-message" className="text-sm font-medium text-foreground/40 ml-1">
                    {t('form.message')}
                  </label>
                  <textarea
                    id="c-message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => set('message', e.target.value)}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-primary">
                    Gönderilemedi. Lütfen tekrar deneyin veya bizi arayın: 0212 505 40 01
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-5 bg-[#E35205] hover:bg-[#A03500] disabled:opacity-50 text-white font-medium rounded-2xl transition-colors shadow-[0_0_20px_rgba(227,82,5,0.3)] flex items-center justify-center gap-2 group"
                >
                  {status === 'sending' ? t('form.sending') : t('form.send')}
                  {status === 'sending' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>

      <LocationMap />
      <LetsWorkSection />
    </div>
  );
}
