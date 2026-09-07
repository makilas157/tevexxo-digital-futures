import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Instagram, Twitter, Dribbble } from "lucide-react";
import { NAV_ITEMS } from "@/data/site";
import { Logo } from "./Logo";

const socials = [
  { Icon: Twitter, label: "X" },
  { Icon: Linkedin, label: "LinkedIn" },
  { Icon: Github, label: "GitHub" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Dribbble, label: "Dribbble" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border px-5 py-14 sm:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Engineering Digital Experiences Beyond Expectations.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ Icon, label }) => (
              <button
                key={label}
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:border-blue/60 hover:text-cyan"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Navigate
          </p>
          <div className="grid grid-cols-2 gap-y-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Get in touch
          </p>
          <a
            href="mailto:hello@tevexxo.com"
            className="block text-sm text-foreground transition-colors hover:text-cyan"
          >
            hello@tevexxo.com
          </a>
          <p className="mt-2 text-sm text-muted-foreground">Remote-first · Working worldwide</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-full border border-border px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-blue/60 hover:text-blue"
          >
            Start your project
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-7xl flex-col gap-2 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Tevexxo. All rights reserved.</span>
        <span>Concept · Design · Development · Launch</span>
      </div>
    </footer>
  );
}
