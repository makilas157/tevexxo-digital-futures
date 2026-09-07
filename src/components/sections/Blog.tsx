import { ArrowUpRight } from "lucide-react";
import { POSTS } from "@/data/site";
import { Card3D, Depth } from "@/components/site/Card3D";
import { Reveal, Section, SectionHeading } from "@/components/site/Reveal";

export function Blog({ limit }: { limit?: number }) {
  const items = limit ? POSTS.slice(0, limit) : POSTS;
  return (
    <Section id="blog">
      <SectionHeading
        eyebrow="Blog"
        title={
          <>
            Insights & <span className="text-gradient">ideas.</span>
          </>
        }
        sub="Notes from our team on building products that hold up in the real world."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {items.map((post, i) => (
          <Reveal key={post.title} delay={(i % 2) * 0.07}>
            <Card3D className="group h-full p-7" intensity={7}>
              <Depth z={30} className="flex items-center justify-between">
                <span className="rounded-full border border-border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan">
                  {post.tag}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                  {post.date} · {post.read}
                </span>
              </Depth>
              <Depth z={50}>
                <h3 className="mt-6 font-display text-xl leading-snug font-medium">{post.title}</h3>
              </Depth>
              <Depth z={20}>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
              </Depth>
              <Depth z={30}>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-blue transition-all duration-300 group-hover:gap-3 group-hover:text-cyan">
                  Read article <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Depth>
            </Card3D>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
