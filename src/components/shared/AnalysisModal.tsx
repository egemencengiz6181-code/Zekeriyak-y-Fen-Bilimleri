"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { X, ArrowRight, ArrowLeft, CheckCircle2, Building2, Lightbulb, Send, Loader2 } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";

// ── Types ────────────────────────────────────────────────────────────────────
type Path = "existing" | "new" | null;

interface FormData {
  path: Path;
  // existing brand
  website: string;
  instagram: string;
  linkedin: string;
  name: string;
  email: string;
  phone: string;
  // new brand
  sector: string;
  projectDetail: string;
  services: string[];
  // final
  request: string;
}

const INITIAL: FormData = {
  path: null,
  website: "", instagram: "", linkedin: "",
  name: "", email: "", phone: "",
  sector: "", projectDetail: "", services: [],
  request: "",
};

// SERVICE_OPTIONS are now loaded from translations inside the component

// ── Overlay ──────────────────────────────────────────────────────────────────
function Overlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
      onClick={onClose}
    />
  );
}

// ── Step indicator ────────────────────────────────────────────────────────────
function Steps({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all duration-500 ${
            i < current ? "bg-violet-500 flex-1" : i === current ? "bg-violet-400 flex-[2]" : "bg-white/10 flex-1"
          }`}
        />
      ))}
    </div>
  );
}

// ── Field ─────────────────────────────────────────────────────────────────────
function Field({ label, placeholder, value, onChange, type = "text" }: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 hover:border-violet-500/40 focus:border-violet-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-all"
      />
    </div>
  );
}

// ── Textarea ──────────────────────────────────────────────────────────────────
function TextArea({ label, placeholder, value, onChange }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full bg-white/5 border border-white/10 hover:border-violet-500/40 focus:border-violet-500 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-all resize-none"
      />
    </div>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────────
export default function AnalysisModal() {
  const ft = useTranslations("Footer");
  const at = useTranslations("AnalysisModal");
  const serviceOptions = at.raw('services') as string[];
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const totalSteps = 3;

  const set = (key: keyof FormData, value: string | string[]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleService = (s: string) => {
    const curr = form.services;
    set("services", curr.includes(s) ? curr.filter((x) => x !== s) : [...curr, s]);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => { setStep(0); setForm(INITIAL); setSuccess(false); }, 400);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "analysis", ...form }),
      });
      const data = await res.json();
      console.log("[AnalysisModal] Response:", data);
      setSuccess(true);
      setStep(totalSteps);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const canNext = (() => {
    if (step === 0) return form.path !== null;
    if (step === 1) {
      if (form.path === "existing") return !!form.name && !!form.email;
      return !!form.sector && !!form.name && !!form.email;
    }
    if (step === 2) return !!form.request;
    return true;
  })();

  return (
    <>
      <GradientButton onClick={() => setOpen(true)}>
        {at('button')}
      </GradientButton>

      <AnimatePresence>
        {open && (
          <>
            <Overlay onClose={handleClose} />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 flex items-center justify-center z-[101] p-4"
              onClick={handleClose}
            >
              <div
                className="relative w-full max-w-lg bg-[#0a0514] border border-violet-500/20 rounded-3xl shadow-[0_0_80px_rgba(124,58,237,0.2)] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Purple glow top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-violet-600/10 blur-[80px] rounded-full pointer-events-none" />

                <div className="relative p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
                        {at('eyebrow')}
                      </p>
                      <h2 className="text-xl font-bold text-white mt-0.5">
                        {step === totalSteps ? at('success_title') : step === 0 ? at('step0_title') : step === 1 ? (form.path === "existing" ? at('step1a_title') : at('step1b_title')) : at('step2_title')}
                      </h2>
                    </div>
                    <button
                      onClick={handleClose}
                      className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {step < totalSteps && <Steps current={step} total={totalSteps} />}

                  {/* ── STEP 0: Path selection ─────────────────────── */}
                  <AnimatePresence mode="wait">
                    {step === 0 && (
                      <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                        <p className="text-sm text-white/40 mb-6">{at('step0_desc')}</p>
                        {[
                          { val: "existing" as Path, icon: Building2, title: at('path_existing_title'), sub: at('path_existing_sub') },
                          { val: "new" as Path, icon: Lightbulb, title: at('path_new_title'), sub: at('path_new_sub') },
                        ].map(({ val, icon: Icon, title, sub }) => (
                          <button
                            key={val}
                            onClick={() => setForm((prev) => ({ ...prev, path: val }))}
                            className={`w-full flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-300 group ${
                              form.path === val
                                ? "border-violet-500 bg-violet-500/10"
                                : "border-white/8 bg-white/[0.02] hover:border-violet-500/40 hover:bg-white/5"
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${form.path === val ? "bg-violet-500/20" : "bg-white/5 group-hover:bg-violet-500/10"}`}>
                              <Icon className={`w-6 h-6 ${form.path === val ? "text-violet-400" : "text-white/40 group-hover:text-violet-400"}`} />
                            </div>
                            <div>
                              <div className="font-semibold text-white text-sm">{title}</div>
                              <div className="text-xs text-white/40 mt-0.5">{sub}</div>
                            </div>
                            {form.path === val && <CheckCircle2 className="w-5 h-5 text-violet-400 ml-auto shrink-0" />}
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {/* ── STEP 1: Existing brand ──────────────────── */}
                    {step === 1 && form.path === "existing" && (
                      <motion.div key="step1a" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                        <Field label={at('field_website')} placeholder={at('placeholder_website')} value={form.website} onChange={(v) => set("website", v)} />
                        <Field label="Instagram" placeholder={at('placeholder_instagram')} value={form.instagram} onChange={(v) => set("instagram", v)} />
                        <Field label="LinkedIn" placeholder={at('placeholder_linkedin')} value={form.linkedin} onChange={(v) => set("linkedin", v)} />
                        <Field label={at('field_name')} placeholder={at('placeholder_name')} value={form.name} onChange={(v) => set("name", v)} />
                        <Field label={at('field_email')} placeholder={at('placeholder_email')} value={form.email} onChange={(v) => set("email", v)} type="email" />
                        <Field label={at('field_phone')} placeholder={at('placeholder_phone')} value={form.phone} onChange={(v) => set("phone", v)} type="tel" />
                      </motion.div>
                    )}

                    {/* ── STEP 1: New brand ───────────────────────── */}
                    {step === 1 && form.path === "new" && (
                      <motion.div key="step1b" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                        <Field label={at('field_sector')} placeholder={at('field_sector_placeholder')} value={form.sector} onChange={(v) => set("sector", v)} />
                        <TextArea label={at('field_project_details')} placeholder={at('field_project_placeholder')} value={form.projectDetail} onChange={(v) => set("projectDetail", v)} />
                        <div className="space-y-2">
                          <label className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400">{at('field_services')}</label>
                          <div className="flex flex-wrap gap-2">
                            {serviceOptions.map((s) => (
                              <button
                                key={s}
                                onClick={() => toggleService(s)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                                  form.services.includes(s)
                                    ? "border-violet-500 bg-violet-500/20 text-violet-300"
                                    : "border-white/10 text-white/40 hover:border-violet-500/40 hover:text-white/70"
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="pt-2 border-t border-white/8 space-y-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400">{ft('contact_info')}</p>
                          <Field label={at('field_name')} placeholder={at('placeholder_name')} value={form.name} onChange={(v) => set("name", v)} />
                          <Field label={at('field_email')} placeholder={at('placeholder_email')} value={form.email} onChange={(v) => set("email", v)} type="email" />
                          <Field label={at('field_phone')} placeholder={at('placeholder_phone')} value={form.phone} onChange={(v) => set("phone", v)} type="tel" />
                        </div>
                      </motion.div>
                    )}

                    {/* ── STEP 2: Final request ───────────────────── */}
                    {step === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                        <div className="p-4 rounded-2xl bg-violet-500/5 border border-violet-500/15">
                          <p className="text-xs text-violet-400 font-semibold uppercase tracking-wider mb-2">{at('summary_label')}</p>
                          <p className="text-sm text-white/60">
                            {form.path === "existing"
                              ? `${at('summary_existing')} · ${form.name} · ${form.email}`
                              : `${at('summary_new')} · ${form.sector}${form.services.length ? ` · ${form.services.join(", ")}` : ""}`}
                          </p>
                        </div>
                        <TextArea
                          label={at('field_request')}
                          placeholder={at('field_request_placeholder')}
                          value={form.request}
                          onChange={(v) => set("request", v)}
                        />
                      </motion.div>
                    )}

                    {/* ── SUCCESS ─────────────────────────────────────────── */}
                    {step === totalSteps && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8 space-y-4"
                      >
                        <div className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-8 h-8 text-violet-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{at('success_title')}</h3>
                        <p className="text-sm text-white/40 max-w-xs mx-auto">{at('success_text')}</p>
                        <button
                          onClick={handleClose}
                          className="mt-4 px-8 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all hover:scale-105"
                        >
                          {at('btn_close')}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── Navigation ───────────────────────────────────────── */}
                  {step < totalSteps && (
                    <div className={`flex mt-8 gap-3 ${step > 0 ? "justify-between" : "justify-end"}`}>
                      {step > 0 && (
                        <button
                          onClick={() => setStep((s) => s - 1)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 text-sm font-medium transition-all"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          {at('btn_back')}
                        </button>
                      )}

                      {step < 2 ? (
                        <button
                          onClick={() => setStep((s) => s + 1)}
                          disabled={!canNext}
                          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                        >
                          {at('btn_next')}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmit}
                          disabled={!canNext || loading}
                          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                        >
                          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                          {loading ? at('btn_sending') : at('btn_submit')}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
