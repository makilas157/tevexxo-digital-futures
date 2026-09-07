import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { STATS } from "@/data/site";
import { Reveal, Section, SectionHeading } from "@/components/site/Reveal";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 60;
    const id = window.setInterval(() => {
      frame++;
      const p = 1 - Math.pow(1 - frame / total, 3);
      setN(Math.round(value * p));
      if (frame >= total) window.clearInterval(id);
    }, 16);
    return () => window.clearInterval(id);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <SectionHeading
          eyebrow="About us"
          title={
            <>
              We are <span className="text-gradient">Tevexxo.</span>
            </>
          }
          sub="We are a technology-driven digital company focused on creating meaningful digital experiences. We combine creativity, engineering, and innovation to help businesses transform ideas into powerful digital products."
        />

        <div className="space-y-6">
          <Reveal>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We work with businesses, startups, and organizations that need more than a website —
              they need a digital foundation. From the first conversation to launch day and beyond,
              a single focused team owns strategy, design, engineering, and quality.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="glass rounded-2xl p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                How we operate
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  "Concept and product strategy workshops",
                  "Design systems built for scale, not screenshots",
                  "Engineering with modern, maintainable architecture",
                  "Testing, performance budgets, and launch support",
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan shadow-[var(--glow-blue)]" />
                    <span className="text-muted-foreground">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="group h-full bg-background p-8 transition-colors duration-500 hover:bg-card">
              <p className="font-display text-4xl font-semibold sm:text-5xl">
                <span className="text-gradient">
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
