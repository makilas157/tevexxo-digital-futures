import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SERVICES } from "@/data/site";
import { Card3D, Depth } from "@/components/site/Card3D";
import { Icon } from "@/components/site/Icon";
import { Reveal, Section, SectionHeading } from "@/components/site/Reveal";

export function Services({ limit }: { limit?: number }) {
  const items = limit ? SERVICES.slice(0, limit) : SERVICES;
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title={
          <>
            What we <span className="text-gradient">create.</span>
          </>
        }
        sub="Websites, applications, AI systems, commerce, automation, and templates — engineered end to end."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s, i) => (
          <Reveal key={s.title} delay={(i % 4) * 0.06}>
            <Card3D className="group h-full p-6">
              <Depth z={40} className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-secondary transition-colors duration-300 group-hover:border-blue/50">
                  <Icon name={s.icon} className="h-5 w-5 text-blue" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
              </Depth>
              <Depth z={55}>
                <h3 className="mt-6 font-display text-base font-medium uppercase">{s.title}</h3>
              </Depth>
              <Depth z={20}>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </Depth>
              <Depth z={15}>
                <ul className="mt-5 space-y-1.5 border-t border-border pt-4">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </Depth>
            </Card3D>
          </Reveal>
        ))}
      </div>

      {limit && (
        <Reveal delay={0.1}>
          <div className="mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-blue transition-colors hover:text-cyan"
            >
              View all services <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
