'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { MessageCircle, Mail, Send, Loader2, CheckCircle2, ChevronDown } from 'lucide-react';
import Reveal from '@/components/ui/reveal';

export default function LetsWorkSection() {
  const t = useTranslations('LetsWork');
  const ct = useTranslations('Contact');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', ...form }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#E35205]/40 focus:border-[#E35205] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/25 outline-none transition-all";

  return (
    <section className="py-32 relative overflow-hidden bg-transparent">
      {/* Okul arka plan görseli */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/okul2/unnamed-7.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={45}
          className="object-cover opacity-[0.12] mix-blend-luminosity"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <Reveal className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs font-medium text-foreground/60 uppercase tracking-widest">
              {t('available')}
            </span>
          </Reveal>

          {/* Başlık */}
          <Reveal
            as="h2"
            delay={0.1}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight mb-8 bg-gradient-to-b from-slate-900 to-slate-900/40 dark:from-white dark:to-white/40 bg-clip-text text-transparent"
          >
            {t('title')}
          </Reveal>

          <Reveal
            as="p"
            delay={0.2}
            className="text-xl md:text-2xl text-foreground/40 font-light mb-12 max-w-2xl"
          >
            {t('subtitle')}
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.3} className="flex flex-col sm:flex-row gap-6 items-center mb-10">
            <button
              onClick={() => setShowForm(v => !v)}
              aria-expanded={showForm}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#E35205] hover:bg-[#A03500] text-white font-medium transition-colors active:scale-95 shadow-[0_0_20px_rgba(227,82,5,0.3)]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t('cta')}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showForm ? 'rotate-180' : ''}`} />
            </button>

            <a
              href="mailto:bahcelievlersevinckurs@gmail.com"
              className="flex items-center gap-3 text-foreground/60 hover:text-slate-900 dark:hover:text-white transition-colors group min-w-0"
            >
              <div className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-light text-sm sm:text-base truncate">bahcelievlersevinckurs@gmail.com</span>
            </a>
          </Reveal>

          {/* Satır içi iletişim formu — CSS grid-rows geçişi ile aç/kapa */}
          <div
            className={`w-full max-w-xl grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
              showForm ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <div className="bg-white dark:bg-[#0a0514] border border-[#E35205]/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(227,82,5,0.12)] text-left">
                {sent ? (
                  <div className="flex flex-col items-center py-8 gap-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#E35205]/20 border border-[#E35205]/30 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-[#E35205]" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{ct('form.success_title')}</h3>
                    <p className="text-sm text-slate-500 dark:text-white/40">{ct('form.success_text')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input required className={inputCls} placeholder={ct('form.name_placeholder')} value={form.name} onChange={e => set('name', e.target.value)} />
                      <input required type="email" className={inputCls} placeholder={ct('form.email_placeholder')} value={form.email} onChange={e => set('email', e.target.value)} />
                    </div>
                    <input type="tel" className={inputCls} placeholder={ct('form.phone_placeholder')} value={form.phone} onChange={e => set('phone', e.target.value)} />
                    <textarea rows={4} className={`${inputCls} resize-none`} placeholder={ct('form.message_placeholder')} value={form.message} onChange={e => set('message', e.target.value)} />
                    {error && (
                      <p className="text-sm text-[#E35205]">
                        Gönderilemedi. Lütfen tekrar deneyin veya bizi arayın: 0212 505 40 01
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E35205] hover:bg-[#A03500] disabled:opacity-40 text-white font-semibold text-sm transition-colors active:scale-95"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      {loading ? ct('form.sending') : ct('form.send')}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
