import { WHY } from "@/data/site";
import { Card3D, Depth } from "@/components/site/Card3D";
import { Icon } from "@/components/site/Icon";
import { Reveal, Section, SectionHeading } from "@/components/site/Reveal";

export function Why() {
  return (
    <Section id="why">
      <SectionHeading
        eyebrow="Why us"
        title={
          <>
            Why <span className="text-gradient">Tevexxo?</span>
          </>
        }
        sub="Six reasons clients stay with us from the first prototype to the tenth release."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {WHY.map((item, i) => (
          <Reveal key={item.n} delay={i * 0.06}>
            <Card3D className="h-full p-7">
              <Depth z={30} className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-secondary">
                  <Icon name={item.icon} className="h-5 w-5 text-cyan" />
                </span>
                <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                  {item.n}
                </span>
              </Depth>
              <Depth z={50}>
                <h3 className="mt-7 font-display text-lg font-medium uppercase tracking-tight">
                  {item.title}
                </h3>
              </Depth>
              <Depth z={20}>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </Depth>
              <Depth z={10}>
                <div className="mt-7 h-px w-full [background:var(--gradient-accent)] opacity-30" />
              </Depth>
            </Card3D>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
