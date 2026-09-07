import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Card3D, Depth } from "@/components/site/Card3D";
import { Reveal, Section, SectionHeading } from "@/components/site/Reveal";
import ai from "@/assets/project-ai.jpg";
import ecom from "@/assets/project-ecommerce.jpg";
import health from "@/assets/project-health.jpg";
import edu from "@/assets/project-education.jpg";
import realestate from "@/assets/project-realestate.jpg";
import saas from "@/assets/project-saas.jpg";

export const PROJECTS = [
  {
    title: "AI Business Platform",
    industry: "Artificial Intelligence",
    img: ai,
    desc: "An assistant-driven analytics platform that turns operational data into decisions.",
    tags: ["Next.js", "OpenAI", "PostgreSQL"],
  },
  {
    title: "E-Commerce Platform",
    industry: "Retail & Commerce",
    img: ecom,
    desc: "Headless storefront with subscription checkout and real-time inventory.",
    tags: ["React", "Node.js", "Stripe"],
  },
  {
    title: "Healthcare Dashboard",
    industry: "Healthcare",
    img: health,
    desc: "Clinical monitoring dashboard with role-based access and audit trails.",
    tags: ["TypeScript", "FHIR", "AWS"],
  },
  {
    title: "Smart Education System",
    industry: "Education",
    img: edu,
    desc: "Adaptive learning platform with progress intelligence for 12k students.",
    tags: ["React", "Python", "MongoDB"],
  },
  {
    title: "Real Estate Platform",
    industry: "Property",
    img: realestate,
    desc: "Map-first property discovery with instant lead routing for agents.",
    tags: ["Next.js", "Mapbox", "Postgres"],
  },
  {
    title: "SaaS Management Platform",
    industry: "B2B SaaS",
    img: saas,
    desc: "Multi-tenant workspace with billing, roles, and usage analytics built in.",
    tags: ["TypeScript", "Node.js", "Docker"],
  },
] as const;

export function Projects({ limit }: { limit?: number }) {
  const items = limit ? PROJECTS.slice(0, limit) : PROJECTS;
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Projects"
        title={
          <>
            Selected <span className="text-gradient">work.</span>
          </>
        }
        sub="A sample of platforms we have designed, engineered, and launched with clients."
      />

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        {items.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.08}>
            <Card3D className="group h-full overflow-hidden p-4" intensity={7}>
              <Depth z={20} className="overflow-hidden rounded-xl border border-border">
                <img
                  src={p.img}
                  alt={`${p.title} interface designed by Tevexxo`}
                  width={1200}
                  height={750}
                  loading="lazy"
                  className="h-56 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 sm:h-72"
                />
              </Depth>
              <Depth z={45} className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  {p.industry}
                </p>
                <h3 className="mt-2 font-display text-xl font-medium uppercase sm:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-muted-foreground opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                  {p.desc}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-blue transition-all duration-300 group-hover:gap-3 group-hover:text-cyan"
                >
                  View project <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Depth>
            </Card3D>
          </Reveal>
        ))}
      </div>

      {limit && (
        <Reveal delay={0.1}>
          <div className="mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-blue transition-colors hover:text-cyan"
            >
              See all projects <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
