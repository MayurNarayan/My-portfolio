import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, MapPin, BadgeCheck, ChevronDown, ScanSearch, FileWarning,
  ShieldAlert, Wrench, FileText, GraduationCap, BookOpen, X, Fingerprint, FileDown, ExternalLink,
} from "lucide-react";
import { EXPERIENCE, EDUCATION, PROFILE } from "../data";

const phaseIcons = [ScanSearch, ShieldAlert, FileWarning, Wrench, FileText];

export function Experience({ onVerify }: { onVerify: (ids: string[], title: string) => void }) {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="mb-10">
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-2 font-mono text-[11px] tracking-[0.3em] text-emerald-400">
          {"// 02 — EXPERIENCE & TRAINING"}
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Industrial Experience & Vulnerability Management
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="glow-border glass overflow-hidden rounded-3xl"
      >
        {/* Header */}
        <div className="relative border-b border-white/8 bg-gradient-to-r from-emerald-500/[0.08] via-transparent to-cyan-500/[0.08] p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/25 to-cyan-500/25 ring-1 ring-emerald-400/40">
                <Briefcase className="h-6 w-6 text-emerald-300" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{EXPERIENCE.role}</h3>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 font-mono text-[10px] font-bold tracking-widest text-emerald-300 ring-1 ring-emerald-400/30">
                    <BadgeCheck className="h-3 w-3" /> VERIFIED
                  </span>
                </div>
                <p className="mt-1 font-display text-[15px] font-semibold text-cyan-300">@ {EXPERIENCE.company}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11.5px] text-slate-400">
                  <span>{EXPERIENCE.period}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {EXPERIENCE.location}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onVerify([EXPERIENCE.credential, "ET2025PC1632", "ET2025TC1632"], "Embrizon Technologies — Training Suite")}
              className="group flex w-fit items-center gap-2.5 rounded-2xl border border-emerald-400/25 bg-black/40 px-4 py-3 text-left transition hover:border-emerald-400/60 hover:bg-emerald-500/5"
            >
              <Fingerprint className="h-5 w-5 text-emerald-400" />
              <span>
                <span className="block font-mono text-[9.5px] tracking-[0.2em] text-slate-500">CREDENTIAL ID</span>
                <span className="block font-mono text-[13px] font-bold text-emerald-300">{EXPERIENCE.credential}</span>
              </span>
              <span className="ml-2 font-mono text-[10px] text-slate-500 transition group-hover:text-emerald-300">verify →</span>
            </button>
        
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-[14.5px] leading-relaxed text-slate-300">{EXPERIENCE.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {EXPERIENCE.stack.map((s) => (
              <span key={s} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-slate-200">{s}</span>
            ))}
          </div>
        </div>

        {/* Lifecycle accordion */}
        <div className="grid lg:grid-cols-[1fr_1fr]">
          <div className="space-y-2 p-4 sm:p-6">
            <p className="mb-3 px-2 font-mono text-[10.5px] tracking-[0.25em] text-slate-500">VULNERABILITY ASSESSMENT LIFECYCLE</p>
            {EXPERIENCE.bullets.map((b, i) => {
              const Icon = phaseIcons[i];
              const isOpen = expanded === i;
              return (
                <div key={b.title} className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? "border-emerald-400/30 bg-emerald-500/[0.06]" : "border-white/[0.07] bg-white/[0.02] hover:border-white/15"}`}>
                  <button onClick={() => setExpanded(isOpen ? null : i)} className="flex w-full items-center gap-3 px-4 py-3.5 text-left">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${isOpen ? "bg-emerald-500/20 ring-1 ring-emerald-400/40" : "bg-white/5 ring-1 ring-white/10"}`}>
                      <Icon className={`h-4 w-4 ${isOpen ? "text-emerald-300" : "text-slate-400"}`} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-mono text-[10px] tracking-widest text-slate-500">PHASE 0{i + 1}</span>
                      <span className={`block font-display text-[14.5px] font-bold ${isOpen ? "text-white" : "text-slate-200"}`}>{b.title}</span>
                    </span>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-emerald-400" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <p className="px-4 pb-4 pl-[64px] text-[13.5px] leading-relaxed text-slate-400">{b.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Process overview */}
          <div className="relative flex flex-col justify-center border-t border-white/[0.07] bg-black/20 p-6 sm:p-8 lg:border-l lg:border-t-0">
            <p className="mb-5 font-mono text-[10.5px] tracking-[0.25em] text-slate-500">PROCESS OVERVIEW</p>
            <div className="relative space-y-0">
              <div className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-emerald-400/60 via-cyan-400/40 to-emerald-400/10" />
              {["Discovery & Scoping", "Scanning & Enumeration", "Validation & Triage", "Remediation Guidance", "Risk Report & Sign-off"].map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                  className="relative flex items-center gap-4 py-3"
                >
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/30 bg-[#0b111e] font-mono text-[12px] font-bold text-emerald-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display text-[14px] font-semibold text-slate-100">{s}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-500/[0.06] p-4 font-mono text-[11.5px] leading-relaxed text-cyan-200/90">
              Credential ID <span className="text-cyan-300">{EXPERIENCE.credential}</span> — verified via Embrizon Technologies training registry.
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6">
      <div className="mb-10">
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-2 font-mono text-[11px] tracking-[0.3em] text-emerald-400">
          {"// 04 — EDUCATION"}
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Education & Academic Background
        </motion.h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {EDUCATION.map((e, i) => (
          <motion.div
            key={e.school}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`glass glow-border glow-border-hover relative overflow-hidden rounded-3xl p-6 sm:p-7 ${e.current ? "lg:col-span-1" : ""}`}
          >
            {e.current && (
              <div className="absolute right-0 top-0 rounded-bl-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-1.5 font-mono text-[10px] font-bold tracking-widest text-[#04120d]">
                ● IN PROGRESS
              </div>
            )}
            <div className="flex items-start gap-4">
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${e.current ? "bg-emerald-500/15 ring-1 ring-emerald-400/40" : "bg-white/5 ring-1 ring-white/10"}`}>
                {e.current ? <GraduationCap className="h-5 w-5 text-emerald-300" /> : <BookOpen className="h-5 w-5 text-slate-300" />}
              </span>
              <div className="pt-4 sm:pt-0">
                <h3 className="font-display text-[18px] font-bold leading-tight text-white">{e.degree}</h3>
                <p className={`mt-1 font-display text-[14px] font-semibold ${e.current ? "text-emerald-300" : "text-cyan-300"}`}>{e.school}</p>
                <p className="mt-1 font-mono text-[11.5px] text-slate-500">{e.period} · {e.location}</p>
              </div>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-slate-400">{e.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {e.tags.map((t) => (
                <span key={t} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-slate-200">{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function VerifyModal({ data, onClose }: { data: { ids: string[]; title: string } | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {data && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 24, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong glow-border relative w-full max-w-md overflow-hidden rounded-3xl p-6"
          >
            <button onClick={onClose} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:text-white" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-3">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 ring-1 ring-emerald-400/40">
                <BadgeCheck className="h-6 w-6 text-emerald-300" />
                <span className="pulse-ring absolute inset-0 rounded-2xl border border-emerald-400/50" />
              </span>
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] text-emerald-400">CREDENTIAL VERIFIED</p>
                <h3 className="font-display text-[16px] font-bold text-white">{data.title}</h3>
              </div>
            </div>
            <div className="mt-5 space-y-2.5">
              {data.ids.map((id) => (
                <div key={id} className="flex items-center justify-between rounded-xl border border-emerald-400/20 bg-emerald-500/[0.06] px-4 py-3">
                  <span className="font-mono text-[13px] font-bold tracking-wide text-emerald-200">{id}</span>
                  <span className="flex items-center gap-1 font-mono text-[10px] font-bold tracking-widest text-emerald-400">
                    <BadgeCheck className="h-3.5 w-3.5" /> VERIFIED
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-black/40 p-3 font-mono text-[10.5px] leading-relaxed text-slate-500">
              These credential IDs correspond to records issued by the credentialing organization and can be referenced for verification upon request.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
