import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BadgeCheck, Building2, Flag, Sparkles, Bot, ShieldCheck,
  ExternalLink, Fingerprint, Award, ChevronLeft, ChevronRight,
} from "lucide-react";
import { CREDENTIALS } from "../data";

const icons: Record<string, typeof Building2> = {
  building: Building2,
  flag: Flag,
  sparkles: Sparkles,
  bot: Bot,
};

export default function Credentials({ onVerify }: { onVerify: (ids: string[], title: string) => void }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const cred = CREDENTIALS[active];
  const Icon = icons[cred.icon] ?? Award;

  const go = (n: number) => {
    setDir(n > active ? 1 : -1);
    setActive((n + CREDENTIALS.length) % CREDENTIALS.length);
  };

  return (
    <section id="credentials" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-2 font-mono text-[11px] tracking-[0.3em] text-emerald-400">
            {"// 03 — CREDENTIALS"}
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Verified Accreditations & Certifications
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mt-3 max-w-2xl text-[15px] text-slate-400">
            Each credential below includes its issuing organization and registry ID. Select a card to view verification details.
          </motion.p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => go(active - 1)} className="glass flex h-11 w-11 items-center justify-center rounded-xl text-slate-300 transition hover:border-emerald-400/40 hover:text-emerald-300" aria-label="Previous">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="font-mono text-[12px] text-slate-400">
            <span className="font-bold text-white">{String(active + 1).padStart(2, "0")}</span> / {String(CREDENTIALS.length).padStart(2, "0")}
          </span>
          <button onClick={() => go(active + 1)} className="glass flex h-11 w-11 items-center justify-center rounded-xl text-slate-300 transition hover:border-emerald-400/40 hover:text-emerald-300" aria-label="Next">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Spotlight card */}
        <div className="relative min-h-[380px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={cred.id}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60, rotateY: dir * 8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: dir * -60, rotateY: dir * -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={`glow-border relative overflow-hidden rounded-3xl border p-7 sm:p-8 ${
                cred.accent === "emerald"
                  ? "bg-gradient-to-br from-emerald-500/[0.12] via-[#0b111e] to-[#0b111e]"
                  : "bg-gradient-to-br from-cyan-500/[0.12] via-[#0b111e] to-[#0b111e]"
              } glass`}
              style={{ perspective: 1000 }}
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br from-emerald-500/15 to-cyan-500/15 blur-3xl" />
              <div className="flex items-start justify-between gap-4">
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                  cred.accent === "emerald" ? "bg-emerald-500/15 ring-1 ring-emerald-400/40" : "bg-cyan-500/15 ring-1 ring-cyan-400/40"
                }`}>
                  <Icon className={`h-6 w-6 ${cred.accent === "emerald" ? "text-emerald-300" : "text-cyan-300"}`} />
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1.5 font-mono text-[10px] font-bold tracking-widest text-emerald-300 ring-1 ring-emerald-400/30">
                  <ShieldCheck className="h-3.5 w-3.5" /> VERIFIED
                </span>
              </div>

              <p className={`mt-5 font-mono text-[11px] tracking-[0.25em] ${cred.accent === "emerald" ? "text-emerald-400" : "text-cyan-400"}`}>
                {cred.org.toUpperCase()}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-white sm:text-[26px]">{cred.title}</h3>
              <p className="mt-1.5 font-mono text-[12px] text-slate-400">{cred.meta}</p>
              <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-slate-300">{cred.desc}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {cred.skills.map((s) => (
                  <span key={s} className="rounded-lg border border-white/10 bg-black/30 px-2.5 py-1 font-mono text-[11px] text-slate-200">{s}</span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {cred.ids.map((id) => (
                  <span key={id} className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-mono text-[12px] font-bold text-slate-100">
                    <Fingerprint className={`h-3.5 w-3.5 ${cred.accent === "emerald" ? "text-emerald-400" : "text-cyan-400"}`} />
                    {id}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => onVerify(cred.ids, `${cred.org} — ${cred.title}`)}
                  className={`flex items-center gap-2 rounded-xl px-5 py-3 font-display text-sm font-bold transition ${
                    cred.accent === "emerald"
                      ? "bg-emerald-500 text-[#04120d] shadow-[0_0_28px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)]"
                      : "bg-cyan-400 text-[#04121a] shadow-[0_0_28px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)]"
                  }`}
                >
                  <BadgeCheck className="h-4 w-4" /> Inspect Verification
                </button>
                <button className="flex items-center gap-2 rounded-xl border border-white/12 px-5 py-3 font-display text-sm font-semibold text-slate-200 transition hover:border-white/30">
                  <ExternalLink className="h-4 w-4" /> Issuer Registry
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* progress dots */}
          <div className="mt-4 flex gap-2">
            {CREDENTIALS.map((c, i) => (
              <button
                key={c.id}
                onClick={() => go(i)}
                aria-label={c.org}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-10 bg-gradient-to-r from-emerald-400 to-cyan-400" : "w-4 bg-white/15 hover:bg-white/25"}`}
              />
            ))}
          </div>
        </div>

        {/* Stack list */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {CREDENTIALS.map((c, i) => {
            const I = icons[c.icon] ?? Award;
            const isActive = i === active;
            return (
              <motion.button
                key={c.id}
                onClick={() => go(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                  isActive
                    ? c.accent === "emerald"
                      ? "border-emerald-400/50 bg-emerald-500/[0.08] shadow-[0_0_32px_rgba(16,185,129,0.15)]"
                      : "border-cyan-400/50 bg-cyan-500/[0.08] shadow-[0_0_32px_rgba(6,182,212,0.15)]"
                    : "border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    c.accent === "emerald" ? "bg-emerald-500/15 ring-1 ring-emerald-400/30" : "bg-cyan-500/15 ring-1 ring-cyan-400/30"
                  }`}>
                    <I className={`h-5 w-5 ${c.accent === "emerald" ? "text-emerald-300" : "text-cyan-300"}`} />
                  </span>
                  <BadgeCheck className={`h-4 w-4 ${isActive ? "text-emerald-400" : "text-slate-600"}`} />
                </div>
                <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-slate-500">{c.org.toUpperCase()}</p>
                <h4 className="mt-1 font-display text-[14.5px] font-bold leading-snug text-white">{c.title}</h4>
                <p className="mt-2 truncate font-mono text-[11px] text-slate-400">
                  {c.ids[0]}{c.ids.length > 1 ? ` +${c.ids.length - 1}` : ""}
                </p>
                <span className={`mt-3 inline-block font-mono text-[10.5px] transition ${isActive ? "text-emerald-300" : "text-slate-600 group-hover:text-slate-400"}`}>
                  {isActive ? "● viewing" : "view →"}
                </span>
              </motion.button>
            );
          })}

          {/* compliance strip */}
          <div className="glass rounded-2xl p-5 sm:col-span-2 lg:col-span-1 xl:col-span-2">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="font-mono text-[10px] tracking-[0.25em] text-slate-500">COMPLIANCE_FRAME</span>
              {["ISO 9001:2015", "APSCHE", "Skill India"].map((b) => (
                <span key={b} className="flex items-center gap-1.5 font-mono text-[11.5px] font-semibold text-slate-200">
                  <BadgeCheck className="h-3.5 w-3.5 text-emerald-400" /> {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
