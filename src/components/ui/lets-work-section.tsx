'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MessageCircle, Mail, Send, Loader2, CheckCircle2, ChevronDown } from 'lucide-react';

export default function LetsWorkSection() {
  const t = useTranslations('LetsWork');
  const ct = useTranslations('Contact');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', ...form }),
      });
      setSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full bg-white/5 border border-white/10 hover:border-violet-500/40 focus:border-violet-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-all";

  return (
    <section className="py-32 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs font-medium text-foreground/60 uppercase tracking-widest">
              {t('available')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-foreground/40 font-light mb-12 max-w-2xl"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 items-center mb-10"
          >
            <button
              onClick={() => setShowForm(!showForm)}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-primary text-white font-medium transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(109,40,217,0.3)] hover:shadow-[0_0_30px_rgba(109,40,217,0.5)]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t('cta')}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showForm ? 'rotate-180' : ''}`} />
            </button>

            <a
              href="mailto:info@reneedesignlab.com"
              className="flex items-center gap-3 text-foreground/60 hover:text-white transition-colors group"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-light">info@reneedesignlab.com</span>
            </a>
          </motion.div>

          {/* Inline contact form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-xl overflow-hidden"
              >
                <div className="bg-[#0a0514] border border-violet-500/20 rounded-3xl p-8 shadow-[0_0_60px_rgba(124,58,237,0.15)] text-left">
                  {sent ? (
                    <div className="flex flex-col items-center py-8 gap-4 text-center">
                      <div className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-violet-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{ct('form.success_title')}</h3>
                      <p className="text-sm text-white/40">{ct('form.success_text')}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input required className={inputCls} placeholder={ct('form.name_placeholder')} value={form.name} onChange={e => set('name', e.target.value)} />
                        <input required type="email" className={inputCls} placeholder={ct('form.email_placeholder')} value={form.email} onChange={e => set('email', e.target.value)} />
                      </div>
                      <input type="tel" className={inputCls} placeholder={ct('form.phone_placeholder')} value={form.phone} onChange={e => set('phone', e.target.value)} />
                      <textarea rows={4} className={`${inputCls} resize-none`} placeholder={ct('form.message_placeholder')} value={form.message} onChange={e => set('message', e.target.value)} />
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-semibold text-sm transition-all hover:scale-[1.02] active:scale-95"
                      >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        {loading ? ct('form.sending') : ct('form.send')}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
    </section>
  );
}

