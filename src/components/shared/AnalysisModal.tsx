"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { X, ArrowRight, ArrowLeft, CheckCircle2, Building2, Lightbulb, Send, Loader2 } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";

// ── Types ────────────────────────────────────────────────────────────────────
type Path = "existing" | "new" | null;

interface FormData {
  path: Path;
  website: string;
  instagram: string;
  linkedin: string;
  name: string;
  email: string;
  phone: string;
  sector: string;
  projectDetail: string;
  services: string[];
  request: string;
}

const INITIAL: FormData = {
  path: null,
  website: "", instagram: "", linkedin: "",
  name: "", email: "", phone: "",
  sector: "", projectDetail: "", services: [],
  request: "",
};

// ── Step indicator ────────────────────────────────────────────────────────────
function Steps({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all duration-500 ${
            i < current ? "bg-[#E35205] flex-1" : i === current ? "bg-[#FF9E7F] flex-[2]" : "bg-black/10 dark:bg-white/10 flex-1"
          }`}
        />
      ))}
    </div>
  );
}

// ── Field ─────────────────────────────────────────────────────────────────────
const fieldCls =
  "w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#E35205]/40 focus:border-[#E35205] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/25 outline-none transition-all";

function Field({ label, placeholder, value, onChange, type = "text" }: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#E35205]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={fieldCls}
      />
    </div>
  );
}

function TextArea({ label, placeholder, value, onChange }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#E35205]">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className={`${fieldCls} resize-none`}
      />
    </div>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────────
export default function AnalysisModal() {
  const ft = useTranslations("Footer");
  const at = useTranslations("AnalysisModal");
  const serviceOptions = at.raw("services") as string[];
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => setMounted(true), []);

  // Mobil sticky butonun tetikleyebilmesi için custom event dinle
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-analysis-modal", handler);
    return () => window.removeEventListener("open-analysis-modal", handler);
  }, []);

  // Modal açıkken arka plan scroll'unu kilitle
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const totalSteps = 3;

  const set = (key: keyof FormData, value: string | string[]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleService = (s: string) => {
    const curr = form.services;
    set("services", curr.includes(s) ? curr.filter((x) => x !== s) : [...curr, s]);
  };

  const handleClose = () => {
    setOpen(false);
    setStep(0);
    setForm(INITIAL);
    setError(false);
  };

  // ESC ile kapat
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "analysis", ...form }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStep(totalSteps);
    } catch {
      setError(true);
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

  const modal = (
    <>
      {/* Arka plan — backdrop blur YOK */}
      <div className="fixed inset-0 bg-black/70 z-[200] animate-fade-in" onClick={handleClose} />

      <div
        className="fixed inset-0 flex items-center justify-center z-[201] p-4"
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="animate-pop-in relative w-full max-w-lg max-h-[88dvh] overflow-y-auto overscroll-contain bg-white dark:bg-[#0a0514] border border-[#E35205]/20 rounded-3xl shadow-[0_0_60px_rgba(227,82,5,0.18)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E35205]">
                  {at("eyebrow")}
                </p>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  {step === totalSteps
                    ? at("success_title")
                    : step === 0
                      ? at("step0_title")
                      : step === 1
                        ? form.path === "existing" ? at("step1a_title") : at("step1b_title")
                        : at("step2_title")}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="w-9 h-9 shrink-0 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 transition-all"
                aria-label="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {step < totalSteps && <Steps current={step} total={totalSteps} />}

            {/* STEP 0 */}
            {step === 0 && (
              <div className="space-y-4 animate-fade-up">
                <p className="text-sm text-slate-500 dark:text-white/40 mb-6">{at("step0_desc")}</p>
                {[
                  { val: "existing" as Path, icon: Building2, title: at("path_existing_title"), sub: at("path_existing_sub") },
                  { val: "new" as Path, icon: Lightbulb, title: at("path_new_title"), sub: at("path_new_sub") },
                ].map(({ val, icon: Icon, title, sub }) => (
                  <button
                    key={val}
                    onClick={() => setForm((prev) => ({ ...prev, path: val }))}
                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-300 group ${
                      form.path === val
                        ? "border-[#E35205] bg-[#E35205]/10"
                        : "border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:border-[#E35205]/40 hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${form.path === val ? "bg-[#E35205]/20" : "bg-black/5 dark:bg-white/5 group-hover:bg-[#E35205]/10"}`}>
                      <Icon className={`w-6 h-6 ${form.path === val ? "text-[#E35205]" : "text-slate-400 dark:text-white/40 group-hover:text-[#E35205]"}`} />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white text-sm">{title}</div>
                      <div className="text-xs text-slate-500 dark:text-white/40 mt-0.5">{sub}</div>
                    </div>
                    {form.path === val && <CheckCircle2 className="w-5 h-5 text-[#E35205] ml-auto shrink-0" />}
                  </button>
                ))}
              </div>
            )}

            {/* STEP 1 — mevcut */}
            {step === 1 && form.path === "existing" && (
              <div className="space-y-4 animate-fade-up">
                <Field label={at("field_website")} placeholder={at("placeholder_website")} value={form.website} onChange={(v) => set("website", v)} />
                <Field label={at("field_name")} placeholder={at("placeholder_name")} value={form.name} onChange={(v) => set("name", v)} />
                <Field label={at("field_email")} placeholder={at("placeholder_email")} value={form.email} onChange={(v) => set("email", v)} type="email" />
                <Field label={at("field_phone")} placeholder={at("placeholder_phone")} value={form.phone} onChange={(v) => set("phone", v)} type="tel" />
              </div>
            )}

            {/* STEP 1 — yeni */}
            {step === 1 && form.path === "new" && (
              <div className="space-y-4 animate-fade-up">
                <Field label={at("field_sector")} placeholder={at("field_sector_placeholder")} value={form.sector} onChange={(v) => set("sector", v)} />
                <TextArea label={at("field_project_details")} placeholder={at("field_project_placeholder")} value={form.projectDetail} onChange={(v) => set("projectDetail", v)} />
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.15em] text-[#E35205]">{at("field_services")}</label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => toggleService(s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                          form.services.includes(s)
                            ? "border-[#E35205] bg-[#E35205]/20 text-[#A03500] dark:text-[#FF9E7F]"
                            : "border-black/10 dark:border-white/10 text-slate-500 dark:text-white/40 hover:border-[#E35205]/40 hover:text-slate-700 dark:hover:text-white/70"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pt-2 border-t border-black/10 dark:border-white/10 space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#E35205]">{ft("contact_info")}</p>
                  <Field label={at("field_name")} placeholder={at("placeholder_name")} value={form.name} onChange={(v) => set("name", v)} />
                  <Field label={at("field_email")} placeholder={at("placeholder_email")} value={form.email} onChange={(v) => set("email", v)} type="email" />
                  <Field label={at("field_phone")} placeholder={at("placeholder_phone")} value={form.phone} onChange={(v) => set("phone", v)} type="tel" />
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-up">
                <div className="p-4 rounded-2xl bg-[#E35205]/5 border border-[#E35205]/15">
                  <p className="text-xs text-[#E35205] font-semibold uppercase tracking-wider mb-2">{at("summary_label")}</p>
                  <p className="text-sm text-slate-500 dark:text-white/60 break-words">
                    {form.path === "existing"
                      ? `${at("summary_existing")} · ${form.name} · ${form.email}`
                      : `${at("summary_new")} · ${form.sector}${form.services.length ? ` · ${form.services.join(", ")}` : ""}`}
                  </p>
                </div>
                <TextArea
                  label={at("field_request")}
                  placeholder={at("field_request_placeholder")}
                  value={form.request}
                  onChange={(v) => set("request", v)}
                />
                {error && (
                  <p className="text-sm text-[#E35205]">
                    Gönderilemedi. Lütfen tekrar deneyin veya bizi arayın: 0212 505 40 01
                  </p>
                )}
              </div>
            )}

            {/* SUCCESS */}
            {step === totalSteps && (
              <div className="text-center py-8 space-y-4 animate-pop-in">
                <div className="w-16 h-16 rounded-full bg-[#E35205]/20 border border-[#E35205]/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#E35205]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{at("success_title")}</h3>
                <p className="text-sm text-slate-500 dark:text-white/40 max-w-xs mx-auto">{at("success_text")}</p>
                <button
                  onClick={handleClose}
                  className="mt-4 px-8 py-3 rounded-full bg-[#E35205] hover:bg-[#A03500] text-white text-sm font-semibold transition-colors"
                >
                  {at("btn_close")}
                </button>
              </div>
            )}

            {/* Navigation */}
            {step < totalSteps && (
              <div className={`flex mt-8 gap-3 ${step > 0 ? "justify-between" : "justify-end"}`}>
                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/10 dark:border-white/10 text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 text-sm font-medium transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {at("btn_back")}
                  </button>
                )}

                {step < 2 ? (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canNext}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E35205] hover:bg-[#A03500] disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors active:scale-95"
                  >
                    {at("btn_next")}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!canNext || loading}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E35205] hover:bg-[#A03500] disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors active:scale-95"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {loading ? at("btn_sending") : at("btn_submit")}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <GradientButton onClick={() => setOpen(true)}>{at("button")}</GradientButton>

      {/* Portal: modal document.body'ye render edilir, böylece
          masaüstü-only Navbar sarmalayıcısının display:none'ından kaçar */}
      {mounted && open && createPortal(modal, document.body)}
    </>
  );
}
