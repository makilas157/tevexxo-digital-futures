import { TEMPLATES } from "@/data/site";
import { Card3D, Depth } from "@/components/site/Card3D";
import { Reveal, Section, SectionHeading } from "@/components/site/Reveal";
import { Link } from "@tanstack/react-router";

export function Templates({ limit }: { limit?: number }) {
  const items = limit ? TEMPLATES.slice(0, limit) : TEMPLATES;
  return (
    <Section id="templates">
      <SectionHeading
        eyebrow="Templates"
        title={
          <>
            Ready to build.
            <br />
            Ready to <span className="text-gradient">scale.</span>
          </>
        }
        sub="Professional website templates crafted by TEVEXXO — customised to your brand and launched in days."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((t, i) => (
          <Reveal key={t.name} delay={(i % 4) * 0.06}>
            <Card3D className="group h-full overflow-hidden p-3" intensity={8}>
              <Depth z={25} className="overflow-hidden rounded-xl border border-border bg-secondary">
                {/* browser chrome */}
                <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                  <span className="ml-2 flex-1 truncate rounded-full bg-background px-2 py-0.5 font-mono text-[8px] text-muted-foreground">
                    tevexxo.com/{t.name.toLowerCase().replace(/\s+/g, "-")}
                  </span>
                </div>
                <div
                  className={`relative h-36 bg-gradient-to-br ${t.hue} via-transparent to-transparent`}
                >
                  <div className="grid-lines absolute inset-0 opacity-30" />
                  <div className="absolute inset-0 flex flex-col gap-2 p-4">
                    <div className="h-2 w-20 rounded-full bg-foreground/25" />
                    <div className="h-2 w-28 rounded-full bg-foreground/15" />
                    <div className="mt-auto grid grid-cols-3 gap-2">
                      <div className="h-8 rounded-md bg-foreground/10" />
                      <div className="h-8 rounded-md bg-foreground/10" />
                      <div className="h-8 rounded-md bg-foreground/10" />
                    </div>
                  </div>
                </div>
              </Depth>
              <Depth z={45} className="px-3 pt-5 pb-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
                  {t.tag}
                </p>
                <h3 className="mt-1.5 font-display text-sm font-medium uppercase">{t.name}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    to="/contact"
                    className="rounded-full px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-primary-foreground [background:var(--gradient-accent)] transition-transform hover:scale-105"
                  >
                    Live preview
                  </Link>
                  <Link
                    to="/contact"
                    className="rounded-full border border-border px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-blue/60 hover:text-blue"
                  >
                    Explore
                  </Link>
                </div>
              </Depth>
            </Card3D>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
