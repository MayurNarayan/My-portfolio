import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, x: "-50%", scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
          exit={{ opacity: 0, y: 16, x: "-50%", scale: 0.9 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 z-40 flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-[#070b12]/80 px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-wider text-cyan-400 shadow-[0_4px_24px_rgba(0,0,0,0.5),0_0_12px_rgba(6,182,212,0.15)] backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-emerald-400/60 hover:text-emerald-300 hover:shadow-[0_0_24px_rgba(16,185,129,0.35)] active:scale-95"
        >
          <ChevronUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          <span>TOP</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
