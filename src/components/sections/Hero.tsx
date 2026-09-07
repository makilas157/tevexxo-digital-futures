import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { MagneticLink } from "@/components/site/Magnetic";
import { Robot } from "@/components/site/Robot";

const LINES = ["WE BUILD THE", "FUTURE OF", "DIGITAL."];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center px-5 pt-32 pb-20 sm:px-8 lg:pt-28">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
          >
            <Sparkles className="h-3 w-3 text-cyan" />
            Engineering digital experiences beyond expectations
          </motion.div>

          <h1 className="font-display text-[clamp(2.6rem,9vw,7rem)] leading-[0.87] font-semibold uppercase">
            {LINES.map((line, li) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", opacity: 0, filter: "blur(16px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.25 + li * 0.14,
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {li === 2 ? <span className="text-gradient">{line}</span> : line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.75, duration: 0.9 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            TEVEXXO is a technology-driven digital solutions company helping businesses transform
            ideas into powerful websites, applications, AI solutions, and digital products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticLink to="/contact">
              Start a project <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
            </MagneticLink>
            <MagneticLink to="/projects" variant="ghost">
              Explore our work
            </MagneticLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6"
          >
            {[
              ["Concept → Launch", "Full lifecycle"],
              ["12 Services", "One partner"],
              ["Global", "Remote-first"],
            ].map(([a, b]) => (
              <div key={a}>
                <p className="font-display text-sm font-medium">{a}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {b}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Robot />
        </motion.div>
      </div>
    </section>
  );
}
