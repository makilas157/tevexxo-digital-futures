import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { PROCESS } from "@/data/site";
import { Reveal, Section, SectionHeading } from "@/components/site/Reveal";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const height = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 90,
    damping: 24,
  });

  return (
    <Section id="process">
      <SectionHeading
        eyebrow="Process"
        title={
          <>
            How we <span className="text-gradient">build.</span>
          </>
        }
        sub="A transparent five-stage path from first conversation to a live product."
      />

      <div ref={ref} className="relative mt-16 pl-10 sm:pl-16">
        <div className="absolute left-3 top-2 bottom-2 w-px bg-border sm:left-6" />
        <motion.div
          className="absolute left-3 top-2 w-px [background:var(--gradient-accent)] sm:left-6"
          style={{ height }}
        />
        <div className="space-y-12">
          {PROCESS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.05}>
              <div className="group relative">
                <span className="absolute -left-[38px] top-1.5 grid h-6 w-6 place-items-center rounded-full border border-border bg-background font-mono text-[9px] text-muted-foreground transition-all duration-500 group-hover:border-blue/70 group-hover:text-cyan group-hover:shadow-[var(--glow-blue)] sm:-left-[54px]">
                  {i + 1}
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  {step.n}
                </p>
                <h3 className="mt-2 font-display text-2xl font-medium uppercase sm:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
