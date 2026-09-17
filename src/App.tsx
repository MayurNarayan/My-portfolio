import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldCheck, FileText, ExternalLink } from "lucide-react";
import Background from "./components/Background";
import Hero from "./components/Hero";
import { Navbar, TerminalModal } from "./components/Chrome";
import { Arsenal } from "./components/Arsenal";
import { Experience, Education, VerifyModal } from "./components/Journey";
import Credentials from "./components/Credentials";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import BackToTop from "./components/BackToTop";
import { PROFILE } from "./data";

function BootLoader({ done }: { done: () => void }) {
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    const steps = [
      "mounting /dev/secure …",
      "loading defense_shield …",
      "verifying THM-J9KROW03JP ✓",
      "loading verified credentials …",
      "ready",
    ];
    let i = 0;
    const iv = setInterval(() => {
      if (i < steps.length) {
        setLog((l) => [...l, steps[i]]);
        setProgress(((i + 1) / steps.length) * 100);
        i++;
      } else {
        clearInterval(iv);
        setTimeout(done, 450);
      }
    }, 260);
    return () => clearInterval(iv);
  }, [done]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05070B] p-6"
    >
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 ring-1 ring-emerald-400/50">
            <ShieldCheck className="h-5 w-5 text-emerald-300" />
          </span>
          <div>
            <p className="font-display text-[15px] font-bold text-white">MAYUR NARAYAN</p>
            <p className="font-mono text-[10px] tracking-[0.25em] text-emerald-400">LOADING PORTFOLIO</p>
          </div>
        </div>
        <div className="glass rounded-2xl p-4 font-mono text-[11.5px] leading-relaxed">
          {log.map((l, i) => (
            <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-emerald-300/90">
              <span className="text-slate-600">[{String(i).padStart(2, "0")}]</span> {l}
            </motion.p>
          ))}
          <span className="terminal-caret text-emerald-400" />
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-[0_0_16px_rgba(16,185,129,0.7)]"
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.25 }}
          />
        </div>
        <p className="mt-2 text-right font-mono text-[10px] text-slate-500">{Math.round(progress)}%</p>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [booted, setBooted] = useState(false);
  const [terminal, setTerminal] = useState(false);
  const [verify, setVerify] = useState<{ ids: string[]; title: string } | null>(null);

  const openTerminal = useCallback(() => setTerminal(true), []);
  const openVerify = useCallback((ids: string[], title: string) => setVerify({ ids, title }), []);

  return (
    <div className="relative min-h-screen select-none bg-[#05070B] text-slate-200">
      <AnimatePresence>{!booted && <BootLoader done={() => setBooted(true)} />}</AnimatePresence>

      <Background />
      <Navbar />

      <main className="relative">
        <Hero />

        {/* divider */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        </div>

        <Arsenal />
        <Experience onVerify={openVerify} />
        <Credentials onVerify={openVerify} />
        <Education />
        <Contact />
      </main>

      {/* Floating CLI button — bottom right */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: booted ? 1 : 0, scale: booted ? 1 : 0 }}
        transition={{ delay: 0.6, type: "spring", damping: 18 }}
        onClick={openTerminal}
        className="group fixed bottom-5 right-5 z-[60] flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-[#04120d] shadow-[0_8px_32px_rgba(16,185,129,0.45)] transition hover:shadow-[0_8px_44px_rgba(16,185,129,0.65)]"
        aria-label="Open terminal"
      >
        <Terminal className="h-5 w-5" />
        <span className="pointer-events-none absolute -top-9 right-0 whitespace-nowrap rounded-lg border border-emerald-400/30 bg-black/80 px-2.5 py-1.5 font-mono text-[10.5px] text-emerald-300 opacity-0 backdrop-blur transition group-hover:opacity-100">
          Open terminal
        </span>
        <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5">
          <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-300 opacity-70" />
          <span className="h-3.5 w-3.5 rounded-full border-2 border-[#05070B] bg-emerald-400" />
        </span>
      </motion.button>

      {/* Floating Resume link — bottom left (opens the Google Drive document in a new tab) */}
      <motion.a
        href={PROFILE.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: booted ? 1 : 0, scale: booted ? 1 : 0 }}
        transition={{ delay: 0.7, type: "spring", damping: 18 }}
        className="group fixed bottom-5 left-5 z-[60] flex items-center gap-2 rounded-2xl border border-emerald-400/25 bg-[#0b111e]/90 px-4 py-3.5 font-display text-[13px] font-semibold text-white shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md transition hover:border-emerald-400/50 hover:bg-emerald-500/10"
        aria-label="View resume / CV (opens in a new tab)"
      >
        <FileText className="h-4 w-4 text-emerald-300" />
        View Resume / CV
        <ExternalLink className="h-3.5 w-3.5 text-slate-400 transition group-hover:text-emerald-300" />
      </motion.a>

      <BackToTop />
      <CustomCursor />
      <TerminalModal open={terminal} onClose={() => setTerminal(false)} />
      <VerifyModal data={verify} onClose={() => setVerify(null)} />
    </div>
  );
}
