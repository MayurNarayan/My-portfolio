import { motion } from "framer-motion";
import {
  ShieldCheck, Code2, Wrench, Sparkles, Activity, TerminalSquare,
  Monitor, GitBranch, Flag, Braces, Cpu, Compass,
} from "lucide-react";
import { ARSENAL } from "../data";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

function SectionHead({ mono, title, desc }: { mono: string; title: string; desc: string }) {
  return (
    <div className="mb-10">
      <motion.p {...fadeUp} transition={{ duration: 0.5 }} className="mb-2 font-mono text-[11px] tracking-[0.3em] text-emerald-400">
        {mono}
      </motion.p>
      <motion.h2 {...fadeUp} transition={{ duration: 0.5, delay: 0.05 }} className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </motion.h2>
      <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-400">
        {desc}
      </motion.p>
    </div>
  );
}

function SkillRow({ name, desc, color, delay }: { name: string; desc: string; color: "emerald" | "cyan"; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition hover:border-white/15 hover:bg-white/[0.04]"
    >
      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${color === "emerald" ? "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" : "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"}`} />
      <div>
        <p className="text-[13.5px] font-semibold text-slate-100">{name}</p>
        <p className="mt-0.5 font-mono text-[11px] leading-relaxed text-slate-500">{desc}</p>
      </div>
    </motion.div>
  );
}

const toolIcon = (icon: string) => {
  switch (icon) {
    case "terminal": return TerminalSquare;
    case "monitor": return Monitor;
    case "git": return GitBranch;
    case "github": return Code2;
    case "flag": return Flag;
    case "code": return Braces;
    case "cpu": return Cpu;
    default: return Activity;
  }
};

export function Arsenal() {
  return (
    <section id="arsenal" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6">
      <SectionHead
        mono="// 01 — TECHNICAL SKILLS"
        title="Technical Skills & Expertise"
        desc="Core competencies across defensive security fundamentals, programming, and AI-accelerated development workflows."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Security card */}
        <motion.div {...fadeUp} transition={{ duration: 0.55 }} className="glass glow-border glow-border-hover rounded-3xl p-6 lg:col-span-1">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 ring-1 ring-emerald-400/40">
              <ShieldCheck className="h-5 w-5 text-emerald-300" />
            </span>
            <div>
              <h3 className="font-display text-[17px] font-bold text-white">{ARSENAL.security.title}</h3>
              <p className="font-mono text-[10.5px] tracking-widest text-emerald-400/80">DEFENSIVE SECURITY</p>
            </div>
          </div>
          <div className="space-y-2.5">
            {ARSENAL.security.items.map((s, i) => (
              <SkillRow key={s.name} {...s} color="emerald" delay={i * 0.06} />
            ))}
          </div>
        </motion.div>

        {/* Code card */}
        <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.08 }} className="glass glow-border glow-border-hover rounded-3xl p-6 lg:col-span-1">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/15 ring-1 ring-cyan-400/40">
              <Code2 className="h-5 w-5 text-cyan-300" />
            </span>
            <div>
              <h3 className="font-display text-[17px] font-bold text-white">{ARSENAL.code.title}</h3>
              <p className="font-mono text-[10.5px] tracking-widest text-cyan-400/80">DEVELOPMENT & AI</p>
            </div>
          </div>
          <div className="space-y-2.5">
            {ARSENAL.code.items.map((s, i) => (
              <SkillRow key={s.name} {...s} color="cyan" delay={i * 0.06} />
            ))}
          </div>
        </motion.div>

        {/* Right column stacked */}
        <div className="flex flex-col gap-4">
          <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.12 }} className="glass glow-border rounded-3xl p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <Wrench className="h-5 w-5 text-slate-200" />
              </span>
              <div>
                <h3 className="font-display text-[16px] font-bold text-white">Tools & Environments</h3>
                <p className="font-mono text-[10.5px] tracking-widest text-slate-500">DAILY TOOLING</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {ARSENAL.tools.map((t) => {
                const Icon = toolIcon(t.icon);
                return (
                  <span key={t.name} className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11.5px] text-slate-200 transition hover:border-emerald-400/40 hover:text-emerald-200">
                    <Icon className="h-3.5 w-3.5 text-emerald-400" /> {t.name}
                  </span>
                );
              })}
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.16 }} className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-[#0b111e] to-cyan-500/10 p-6">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-300" />
              <span className="font-mono text-[10.5px] tracking-[0.25em] text-emerald-300">AI-ACCELERATED WORKFLOW</span>
            </div>
            <p className="font-display text-[15.5px] font-bold leading-snug text-white">
              Using AI as a force multiplier for secure, faster development.
            </p>
            <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-slate-400">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                Structured prompt design for reliable, repeatable LLM outputs
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                AI-assisted debugging and data visualization in Python
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                Automated code generation with human-reviewed validation
              </li>
            </ul>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.2 }} className="glass rounded-3xl p-5">
            <div className="mb-3 flex items-center gap-2">
              <Compass className="h-4 w-4 text-cyan-300" />
              <span className="font-mono text-[11px] tracking-widest text-slate-300">AREAS OF FOCUS</span>
            </div>
            <div className="flex flex-col gap-2">
              {ARSENAL.focus.map((f) => (
                <div key={f} className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span className="font-mono text-[11.5px] text-slate-300">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
