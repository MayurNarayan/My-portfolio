import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send, Copy, Check, Shield, MapPin, ChevronUp,
  Inbox, Zap, AlertTriangle,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Chrome";
import { PROFILE } from "../data";

/** Live Formspree endpoint. */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/moevqdqv";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copy = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); } catch { /* noop */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    const formEl = e.currentTarget;
    setSending(true);
    setError(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(formEl),
      });

      if (response.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        formEl.reset();
      } else {
        setError(`Transmission failed. Please email ${PROFILE.email} directly.`);
      }
    } catch {
      setError(`Transmission failed. Please email ${PROFILE.email} directly.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <footer id="contact" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-4 pb-10 pt-20 sm:px-6">
      <div className="glow-border glass overflow-hidden rounded-3xl">
        <div className="grid lg:grid-cols-[1fr_1fr]">
          {/* Left — pitch */}
          <div className="relative border-b border-white/[0.07] p-7 sm:p-10 lg:border-b-0 lg:border-r">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
            <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-mono text-[11px] tracking-[0.3em] text-emerald-400">
              {"// 05 — CONTACT"}
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              Get in Touch
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mt-4 max-w-md text-[14.5px] leading-relaxed text-slate-400">
              Open to internships, entry-level security analyst roles, and AI-assisted development opportunities. Reach out directly using the details below.
            </motion.p>

            <div className="mt-6 space-y-3">
              <button
                onClick={copy}
                className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-emerald-400/25 bg-black/40 px-4 py-3.5 transition hover:border-emerald-400/60 hover:bg-emerald-500/5"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/30">
                    <Inbox className="h-4 w-4 text-emerald-300" />
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block font-mono text-[9.5px] tracking-[0.2em] text-slate-500">PRIMARY_CHANNEL — CLICK_TO_COPY</span>
                    <span className="block truncate font-mono text-[13.5px] font-bold text-white">{PROFILE.email}</span>
                  </span>
                </span>
                {copied
                  ? <span className="flex shrink-0 items-center gap-1.5 rounded-lg bg-emerald-500/20 px-3 py-1.5 font-mono text-[11px] font-bold text-emerald-300"><Check className="h-3.5 w-3.5" /> COPIED</span>
                  : <span className="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 font-mono text-[11px] text-slate-400 transition group-hover:border-emerald-400/40 group-hover:text-emerald-300"><Copy className="h-3.5 w-3.5" /> COPY</span>
                }
              </button>

              <div className="grid grid-cols-2 gap-3">
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="glass group flex items-center gap-3 rounded-2xl p-4 transition hover:border-emerald-400/40">
                  <GithubIcon className="h-5 w-5 text-slate-300 transition group-hover:text-emerald-300" />
                  <span>
                    <span className="block font-display text-[13.5px] font-bold text-white">GitHub</span>
                    <span className="block font-mono text-[10.5px] text-slate-500">code & labs</span>
                  </span>
                </a>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="glass group flex items-center gap-3 rounded-2xl p-4 transition hover:border-cyan-400/40">
                  <LinkedinIcon className="h-5 w-5 text-slate-300 transition group-hover:text-cyan-300" />
                  <span>
                    <span className="block font-display text-[13.5px] font-bold text-white">LinkedIn</span>
                    <span className="block font-mono text-[10.5px] text-slate-500">connect</span>
                  </span>
                </a>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11.5px] text-slate-500">
                <MapPin className="h-3.5 w-3.5 text-cyan-400" /> {PROFILE.location} · <span className="text-emerald-400">● {PROFILE.availability}</span>
              </div>

            </div>
          </div>

          {/* Right — form */}
          <div className="relative bg-black/25 p-7 sm:p-10">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-[0.25em] text-slate-400">CONTACT FORM</span>
              <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-emerald-300">
                <Zap className="h-3 w-3" /> DIRECT TO INBOX
              </span>
            </div>
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/[0.07] p-8 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 ring-1 ring-emerald-400/40">
                  <Check className="h-6 w-6 text-emerald-300" />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-white">Payload delivered.</h3>
                <p className="mt-2 max-w-xs font-mono text-[12px] leading-relaxed text-slate-300">
                  I'll get back to you shortly.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-5 rounded-xl border border-emerald-400/30 px-4 py-2 font-mono text-[11px] text-emerald-300 transition hover:border-emerald-400/60 hover:bg-emerald-500/10"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={submit}
                action={FORMSPREE_ENDPOINT}
                method="POST"
                className="space-y-4"
              >
                {error && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2.5 rounded-xl border border-red-400/30 bg-red-500/[0.08] px-4 py-3"
                  >
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                    <p className="font-mono text-[11.5px] leading-relaxed text-red-200">{error}</p>
                  </motion.div>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block font-mono text-[10.5px] tracking-[0.2em] text-slate-500">YOUR_NAME *</span>
                    <input
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ada Lovelace"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[14px] text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400/50 focus:bg-emerald-500/[0.04]"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block font-mono text-[10.5px] tracking-[0.2em] text-slate-500">YOUR_EMAIL *</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[14px] text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400/50 focus:bg-emerald-500/[0.04]"
                      required
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[10.5px] tracking-[0.2em] text-slate-500">PAYLOAD_MESSAGE *</span>
                  <textarea
                    name="message"
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="We have an opening on our SOC team / Let's collaborate on..."
                    rows={5}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[14px] leading-relaxed text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400/50 focus:bg-emerald-500/[0.04]"
                    required
                  />
                </label>
                {/* Formspree meta fields */}
                <input type="hidden" name="_subject" value="New portfolio contact message" />
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                <button
                  type="submit" disabled={sending}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3.5 font-display text-[15px] font-bold text-[#04120d] shadow-[0_0_30px_rgba(16,185,129,0.35)] transition hover:shadow-[0_0_44px_rgba(16,185,129,0.55)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {sending ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#04120d]/30 border-t-[#04120d]" />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      Transmit Secure Message
                    </>
                  )}
                </button>
                <p className="text-center font-mono text-[10.5px] text-slate-600">
                  Your details are only used to respond to your message.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/25 to-cyan-500/25 ring-1 ring-emerald-400/40">
            <Shield className="h-4 w-4 text-emerald-300" />
          </span>
          <div className="leading-tight">
            <p className="font-display text-[13px] font-bold text-white">© 2026 Mayur Narayan</p>
            <p className="font-mono text-[10.5px] text-slate-500">Built with React, Three.js & Tailwind CSS</p>
          </div>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px] text-slate-500">
          <span className="hidden items-center gap-1.5 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> ALL_SYSTEMS_SECURE</span>
          <a href="#top" className="glass flex items-center gap-1.5 rounded-lg px-3 py-2 text-slate-300 transition hover:text-emerald-300">
            <ChevronUp className="h-3.5 w-3.5" /> TOP
          </a>
        </div>
      </div>
    </footer>
  );
}
