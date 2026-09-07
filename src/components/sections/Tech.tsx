import { TECH } from "@/data/site";
import { Reveal, Section, SectionHeading } from "@/components/site/Reveal";

export function Tech() {
  return (
    <Section id="tech">
      <SectionHeading
        eyebrow="Stack"
        title={
          <>
            Powered by modern <span className="text-gradient">technology.</span>
          </>
        }
        sub="We choose tools that stay maintainable long after launch day."
      />

      <div className="mt-16 space-y-10">
        {TECH.map((group, gi) => (
          <Reveal key={group.group} delay={gi * 0.05}>
            <div className="grid gap-5 border-t border-border pt-6 sm:grid-cols-[160px_1fr]">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                {group.group}
              </p>
              <div className="flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="group relative rounded-xl border border-border bg-card px-5 py-3 font-display text-sm font-medium text-muted-foreground grayscale transition-all duration-400 hover:-translate-y-1.5 hover:border-blue/50 hover:text-foreground hover:shadow-[var(--glow-blue)] hover:grayscale-0"
                  >
                    <span className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-400 group-hover:opacity-100 [background:linear-gradient(120deg,color-mix(in_oklab,var(--blue)_12%,transparent),color-mix(in_oklab,var(--purple)_12%,transparent))]" />
                    <span className="relative">{item}</span>
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
