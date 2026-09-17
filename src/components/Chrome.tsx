import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Terminal, Mail, Menu, X, ChevronRight,
  Copy, Check, Lock, Wifi, Cpu,
} from "lucide-react";
import { PROFILE, TICKER_ITEMS, TERMINAL_HELP } from "../data";

export function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.04 11.04 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

/* ---------------- NAVBAR ---------------- */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const delta = y - lastY.current;
      if (y < 120) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
        setOpen(false);
      } else if (delta < -4) {
        setHidden(false);
      }
      lastY.current = y;
      ticking.current = false;
    };
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Skills", href: "#arsenal" },
    { label: "Experience", href: "#experience" },
    { label: "Credentials", href: "#credentials" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-white/[0.06] bg-[#070b12]/90 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.35)]" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="flex items-center justify-between py-3.5">
          <a href="#top" className="group flex items-center gap-3">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/25 to-cyan-500/25 ring-1 ring-emerald-400/40">
              <Shield className="h-5 w-5 text-emerald-300" />
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,1)]" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[15px] font-bold tracking-tight text-white">
                MAYUR<span className="text-emerald-400">_</span>NARAYAN
              </span>
              <span className="block font-mono text-[10px] tracking-[0.22em] text-slate-400">
                CYBERSECURITY <span className="text-cyan-400">//</span> AI DEV
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 font-mono text-[12.5px] text-slate-300 transition hover:bg-white/5 hover:text-emerald-300"
              >
                <span className="mr-1 text-emerald-500/70">./</span>{l.label.toLowerCase()}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={PROFILE.github} target="_blank" rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:border-emerald-400/50 hover:text-emerald-300"
              aria-label="GitHub"
            >
              <GithubIcon />
            </a>
            <a
              href={PROFILE.linkedin} target="_blank" rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:border-cyan-400/50 hover:text-cyan-300"
              aria-label="LinkedIn"
            >
              <LinkedinIcon />
            </a>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-200 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              className="glass-strong mb-3 rounded-2xl p-3 lg:hidden"
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 font-mono text-sm text-slate-200 transition hover:bg-emerald-500/10 hover:text-emerald-300"
                >
                  <span><span className="text-emerald-500">./</span>{l.label.toLowerCase()}</span>
                  <ChevronRight className="h-4 w-4 opacity-40" />
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

/* ---------------- TICKER ---------------- */
export function StatusTicker() {
  const row = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="glass relative overflow-hidden rounded-xl border-white/10">
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-amber-400/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-slate-400">LIVE — SOC_FEED</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          STREAMING
        </span>
      </div>
      <div className="relative overflow-hidden py-2.5">
        <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap px-4">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-2 font-mono text-[11.5px] font-medium tracking-wide">
              <span className={`h-1.5 w-1.5 rounded-full ${t.color === "emerald" ? "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,1)]" : "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)]"}`} />
              <span className={t.color === "emerald" ? "text-emerald-300" : "text-cyan-300"}>[{t.label}]</span>
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#090d16] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#090d16] to-transparent" />
      </div>
    </div>
  );
}

/* ---------------- TERMINAL MODAL ---------------- */
type Line = { type: "in" | "out" | "sys" | "ok" | "err"; text: string };

const WELCOME: Line[] = [
  { type: "sys", text: "mayur@sec-ops:~$ shell initialized" },
  { type: "sys", text: "Type 'help' to list commands. Try: skills · certifications · contact" },
];

export function TerminalModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open ]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines, open]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); onClose(); }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const push = (ls: Line[]) => setLines((p) => [...p, ...ls]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const base: Line = { type: "in", text: `mayur@sec-ops:~$ ${raw}` };
    if (!cmd) { setLines((p) => [...p, base]); return; }

    setHistory((h) => [raw, ...h].slice(0, 50));
    setHIdx(-1);

    const out: Line[] = [base];
    switch (cmd) {
      case "help":
        TERMINAL_HELP.forEach(([c, d]) =>
          out.push({ type: "out", text: `  ${c.padEnd(15)} — ${d}` })
        );
        break;
      case "whoami":
        out.push({ type: "ok", text: "Mayur Narayan — Cybersecurity Specialist & AI-Accelerated Developer" });
        out.push({ type: "out", text: "  ▸ Based in Kolkata, WB · BSc Cyber Security @ SVU (2023—Present)" });
        out.push({ type: "out", text: "  ▸ Focus: VA lifecycle · Linux · Networking · Python + LLMs" });
        break;
      case "skills":
        out.push({ type: "ok", text: "[CYBER] Vulnerability Assessment · TCP/IP·OSI·DNS·HTTP/S · Linux CLI · Crypto basics · Pentest methodology" });
        out.push({ type: "ok", text: "[CODE+AI] Python (AI-assisted) · Java · JavaScript · HTML/CSS · Prompt Engineering" });
        out.push({ type: "out", text: "[TOOLS] Linux · Windows · Git · GitHub · TryHackMe · VS Code · IntelliJ" });
        break;
      case "certifications":
      case "certs":
      case "credentials":
        out.push({ type: "ok", text: "✓ Embrizon — Internship/Project/Training Suite [ET2025IC1632 · ET2025PC1632 · ET2025TC1632]" });
        out.push({ type: "ok", text: "✓ TryHackMe — Pre Security Path, 19h10m [THM-J9KROW03JP]" });
        out.push({ type: "ok", text: "✓ Simplilearn — Intro to Prompt Engineering [10717359]" });
        out.push({ type: "ok", text: "✓ AI for Techies — Python Using AI Workshop [AIFT-PYAI-2025]" });
        break;
      case "experience":
      case "exp":
        out.push({ type: "ok", text: "Cyber Security Intern @ Embrizon Technologies [ET2025IC1632]" });
        out.push({ type: "out", text: "  1. Discovery & security scanning   2. Threat triage (CVSS)" });
        out.push({ type: "out", text: "  3. Remediation routines             4. Executive risk reports" });
        break;
      case "education":
        out.push({ type: "ok", text: "BSc (Hons.) Cyber Security & Advanced Networking — SVU, Barrackpore (2023—Present)" });
        out.push({ type: "out", text: "Foundation: CBSE higher-secondary (Science)" });
        break;
      case "contact":
        out.push({ type: "ok", text: `email → ${PROFILE.email}` });
        out.push({ type: "out", text: `github → ${PROFILE.githubLabel}` });
        out.push({ type: "out", text: `linkedin → ${PROFILE.linkedinLabel}` });
        break;
      case "resume":
      case "cv":
        out.push({ type: "ok", text: "Opening resume / CV in a new tab …" });
        out.push({ type: "out", text: PROFILE.resumeUrl });
        window.open(PROFILE.resumeUrl, "_blank", "noopener,noreferrer");
        break;
      case "ls":
        out.push({ type: "out", text: "arsenal/  experience/  credentials/  education/  resume.pdf  contact.txt" });
        break;
      case "clear":
      case "cls":
        setLines([]);
        return;
      default:
        out.push({ type: "err", text: `command not found: ${cmd} — type 'help'` });
    }
    push(out);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-3 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong scanlines glow-border relative flex max-h-[82vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl shadow-[0_0_80px_rgba(16,185,129,0.15)]"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <span className="flex gap-1.5">
                <button onClick={onClose} className="h-3 w-3 rounded-full bg-red-400/90 transition hover:brightness-125" aria-label="close" />
                <span className="h-3 w-3 rounded-full bg-amber-400/70" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
              </span>
              <span className="flex items-center gap-2 font-mono text-xs text-slate-300">
                <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                mayur@sec-ops: ~
              </span>
              <span className="ml-auto hidden items-center gap-3 font-mono text-[10px] text-slate-500 sm:flex">
                <span className="flex items-center gap-1"><Lock className="h-3 w-3 text-emerald-400" /> TLS</span>
                <span className="flex items-center gap-1"><Wifi className="h-3 w-3 text-cyan-400" /> CONNECTED</span>
                <span className="flex items-center gap-1"><Cpu className="h-3 w-3 text-emerald-400" /> ACTIVE</span>
              </span>
            </div>

            <div ref={scrollRef} className="min-h-[300px] flex-1 overflow-y-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
              {lines.map((l, i) => (
                <div
                  key={i}
                  className={
                    l.type === "in" ? "mt-2 font-semibold text-white"
                    : l.type === "ok" ? "text-emerald-300"
                    : l.type === "err" ? "text-red-300"
                    : l.type === "sys" ? "text-cyan-300/90"
                    : "text-slate-300"
                  }
                >
                  {l.text}
                </div>
              ))}
              {/* quick commands */}
              <div className="mt-4 flex flex-wrap gap-2">
                {["help", "skills", "certifications", "resume", "contact", "clear"].map((c) => (
                  <button
                    key={c}
                    onClick={() => run(c)}
                    className="rounded-md border border-emerald-400/20 bg-emerald-500/5 px-2.5 py-1 font-mono text-[11px] text-emerald-300 transition hover:border-emerald-400/50 hover:bg-emerald-500/15"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); run(input); setInput(""); }}
              className="flex items-center gap-2 border-t border-white/10 bg-black/30 px-4 py-3"
              onClick={() => inputRef.current?.focus()}
            >
              <span className="shrink-0 font-mono text-[13px] font-bold text-emerald-400">➜</span>
              <span className="hidden shrink-0 font-mono text-[12px] text-cyan-400 sm:inline">mayur@sec-ops:~$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    if (history.length) {
                      const n = Math.min(hIdx + 1, history.length - 1);
                      setHIdx(n);
                      setInput(history[n]);
                    }
                  } else if (e.key === "ArrowDown") {
                    e.preventDefault();
                    if (hIdx > 0) { setHIdx(hIdx - 1); setInput(history[hIdx - 1]); }
                    else { setHIdx(-1); setInput(""); }
                  } else if (e.key === "Tab") {
                    e.preventDefault();
                    const all = TERMINAL_HELP.map(([c]) => c);
                    const match = all.find((c) => c.startsWith(input.trim().toLowerCase()));
                    if (match) setInput(match);
                  }
                }}
                className="terminal-caret w-full bg-transparent font-mono text-[13px] text-white outline-none placeholder:text-slate-600"
                placeholder="type 'help'..."
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- COPY EMAIL ---------------- */
export function CopyEmail({ email, className = "" }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try { await navigator.clipboard.writeText(email); } catch { /* noop */ }
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      className={`group flex items-center gap-2 font-mono text-[12px] transition ${className}`}
    >
      <Mail className="h-3.5 w-3.5" />
      <span className="truncate">{email}</span>
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 opacity-50 transition group-hover:opacity-100" />}
      {copied && <span className="text-emerald-300">copied!</span>}
    </button>
  );
}
