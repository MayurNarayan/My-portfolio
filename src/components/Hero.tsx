import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Fingerprint, ArrowRight, Award,
  FlaskConical, Send, ChevronDown,
} from "lucide-react";
import ShieldScene from "./ShieldScene";
import { StatusTicker } from "./Chrome";
import { GithubIcon, LinkedinIcon } from "./Chrome";
import { PROFILE } from "../data";

const ROLES = ["Vulnerability Assessment", "Network Defense", "Linux Operations", "AI-Accelerated Python", "Prompt Engineering"];

function Typewriter() {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = ROLES[idx % ROLES.length];
    const speed = del ? 32 : 62;
    const t = setTimeout(() => {
      if (!del && text === word) {
        setTimeout(() => setDel(true), 1400);
      } else if (del && text === "") {
        setDel(false);
        setIdx((i) => i + 1);
      } else {
        setText(word.slice(0, text.length + (del ? -1 : 1)));
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, idx, del]);

  return (
    <span className="font-mono text-emerald-300">
      <span className="text-slate-500">$ </span>{text}
      <span className="terminal-caret" />
    </span>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative z-10 mx-auto max-w-7xl px-4 pt-28 sm:px-6 sm:pt-32 lg:pt-36">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        {/* LEFT */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 flex flex-wrap items-center gap-2"
          >
            <span className="glass flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] tracking-wider text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {PROFILE.availability}
            </span>
            <span className="glass flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[11px] tracking-wider text-slate-300">
              <MapPin className="h-3 w-3 text-cyan-400" /> {PROFILE.location}
            </span>
            <span className="glass hidden items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[11px] tracking-wider text-slate-300 sm:flex">
              <Fingerprint className="h-3 w-3 text-emerald-400" /> THM: VERIFIED
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mb-2 font-mono text-[12px] tracking-[0.3em] text-cyan-400/90"
          >
            {"// HELLO_WORLD — I_AM"}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14 }}
            className="font-display text-[44px] font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-[72px]"
          >
            Mayur
            <br />
            <span className="gradient-text text-glow-emerald">Narayan</span>
            <span className="text-emerald-400">.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            <span className="font-display text-lg font-semibold text-white sm:text-xl">{PROFILE.role}</span>
            <span className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] text-emerald-300">&</span>
            <span className="font-display text-lg font-semibold text-cyan-300 sm:text-xl">{PROFILE.role2}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-3 min-h-[28px] text-[15px]"
          >
            <Typewriter />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-400"
          >
            Entry-level cybersecurity professional combining{" "}
            <span className="text-emerald-300">hands-on vulnerability assessment</span> with{" "}
            <span className="text-cyan-300">AI-accelerated development</span>. Trained at{" "}
            <span className="text-slate-200">Embrizon Technologies</span>, certified through{" "}
            <span className="text-slate-200">TryHackMe's</span> Pre Security path, and building Python tools with AI in the loop.
          </motion.p>

          {/* Action bar */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <a
              href="#credentials"
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 font-display text-sm font-semibold text-[#04120d] shadow-[0_0_30px_rgba(16,185,129,0.35)] transition hover:shadow-[0_0_44px_rgba(16,185,129,0.55)]"
            >
              <Award className="h-4 w-4" />
              View Credentials
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#arsenal"
              className="glass glow-border glow-border-hover flex items-center gap-2 rounded-xl px-5 py-3 font-display text-sm font-semibold text-white"
            >
              <FlaskConical className="h-4 w-4 text-cyan-300" />
              Explore Skills
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 rounded-xl border border-white/12 px-5 py-3 font-display text-sm font-semibold text-slate-200 transition hover:border-emerald-400/40 hover:text-emerald-300"
            >
              <Send className="h-4 w-4" />
              Contact Me
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-5 flex flex-wrap items-center gap-2.5"
          >
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="glass group flex items-center gap-2.5 rounded-xl px-4 py-2.5 transition hover:border-emerald-400/40">
              <GithubIcon className="h-4 w-4 text-slate-300 transition group-hover:text-emerald-300" />
              <span className="font-mono text-[11.5px] text-slate-300">MayurNarayan</span>
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="glass group flex items-center gap-2.5 rounded-xl px-4 py-2.5 transition hover:border-cyan-400/40">
              <LinkedinIcon className="h-4 w-4 text-slate-300 transition group-hover:text-cyan-300" />
              <span className="font-mono text-[11.5px] text-slate-300">mayur-narayan</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.58 }}
            className="mt-6 max-w-xl"
          >
            <StatusTicker />
          </motion.div>
        </div>

        {/* RIGHT — 3D */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="relative"
        >
          <div className="relative h-[440px] sm:h-[520px] lg:h-[560px]">
            <ShieldScene />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#arsenal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mx-auto mt-12 flex w-fit flex-col items-center gap-1 font-mono text-[10px] tracking-[0.3em] text-slate-500 transition hover:text-emerald-300"
      >
        SCROLL TO EXPLORE
        <ChevronDown className="h-4 w-4 animate-bounce text-emerald-400" />
      </motion.a>
    </section>
  );
}
