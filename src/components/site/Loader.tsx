import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Loader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let value = 0;
    const id = window.setInterval(() => {
      value = Math.min(100, value + Math.random() * 9 + 4);
      setPct(Math.floor(value));
      if (value >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => setDone(true), 500);
      }
    }, 110);
    return () => window.clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, filter: "blur(14px)", scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid-lines absolute inset-0 opacity-25" />
          <svg
            aria-hidden
            className="absolute h-[520px] w-[520px] opacity-30"
            viewBox="0 0 400 400"
          >
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <line
                key={a}
                x1="200"
                y1="200"
                x2={200 + 190 * Math.cos((a * Math.PI) / 180)}
                y2={200 + 190 * Math.sin((a * Math.PI) / 180)}
                stroke="url(#g)"
                strokeWidth="0.7"
              />
            ))}
            {[60, 100, 140, 180].map((r) => (
              <motion.circle
                key={r}
                cx="200"
                cy="200"
                r={r}
                fill="none"
                stroke="url(#g)"
                strokeWidth="0.7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, delay: r / 400 }}
              />
            ))}
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
          </svg>

          <motion.h1
            className="relative font-display text-4xl font-semibold tracking-[0.4em] sm:text-6xl"
            initial={{ opacity: 0, letterSpacing: "0.9em", filter: "blur(12px)" }}
            animate={{ opacity: 1, letterSpacing: "0.4em", filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            TEVEXXO
          </motion.h1>
          <p className="relative mt-6 font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            Initializing digital experience...
          </p>
          <div className="relative mt-8 h-px w-56 overflow-hidden bg-border sm:w-72">
            <div
              className="h-full [background:var(--gradient-accent)] transition-[width] duration-200"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="relative mt-4 font-mono text-2xl font-semibold tabular-nums text-blue">
            {pct}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
