import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X, ChevronDown } from "lucide-react";
import * as Icons from "lucide-react";
import { MEGA_SERVICES, NAV_ITEMS } from "@/data/site";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Cmp = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
    name
  ];
  return Cmp ? <Cmp className={className} /> : null;
}

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mega, setMega] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-[120] px-4 pt-4 sm:px-6 sm:pt-5">
      <div
        className={cn(
          "glass mx-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-full py-2.5 pl-5 pr-3 transition-all duration-500",
          scrolled ? "shadow-[0_18px_50px_-30px_oklch(0_0_0)] backdrop-saturate-150" : "",
        )}
        style={{
          boxShadow: scrolled
            ? "inset 0 0 0 1px color-mix(in oklab, var(--blue) 22%, transparent), 0 20px 60px -40px oklch(0 0 0)"
            : "inset 0 0 0 1px color-mix(in oklab, var(--border) 60%, transparent)",
        }}
      >
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isServices = item.label === "Services";
            const active = pathname === item.to;
            return (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={() => setMega(isServices)}
                onMouseLeave={() => isServices && setMega(false)}
              >
                <Link
                  to={item.to}
                  onClick={(e) => {
                    if (isServices && !mega) {
                      e.preventDefault();
                      setMega(true);
                    }
                  }}
                  className={cn(
                    "group relative flex items-center gap-1 rounded-full px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className="relative overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                      {item.label}
                    </span>
                    <span className="absolute inset-0 block translate-y-full text-blue transition-transform duration-300 group-hover:translate-y-0">
                      {item.label}
                    </span>
                  </span>
                  {isServices && (
                    <ChevronDown
                      className={cn("h-3 w-3 transition-transform", mega && "rotate-180")}
                    />
                  )}
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 [background:var(--gradient-accent)] transition-transform duration-300 group-hover:scale-x-100",
                      active && "scale-x-100",
                    )}
                  />
                  <span className="absolute inset-0 -z-10 rounded-full bg-blue/10 opacity-0 blur-[6px] transition-opacity duration-300 group-hover:opacity-100" />
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden rounded-full px-5 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground [background:var(--gradient-accent)] shadow-[var(--glow-purple)] transition-transform hover:scale-[1.04] sm:block"
          >
            Start a project
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mega menu */}
      <AnimatePresence>
        {mega && (
          <motion.div
            initial={{ opacity: 0, y: -12, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(10px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setMega(true)}
            onMouseLeave={() => setMega(false)}
            className="glass mx-auto mt-3 hidden w-full max-w-6xl rounded-3xl p-6 lg:block"
          >
            <div className="mb-5 flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                What we build
              </p>
              <Link
                to="/services"
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue hover:text-cyan"
              >
                All services
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {MEGA_SERVICES.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.35 }}
                >
                  <Link
                    to="/services"
                    className="group flex h-full flex-col gap-2 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-border hover:bg-card"
                  >
                    <span className="flex items-center justify-between">
                      <ServiceIcon
                        name={s.icon}
                        className="h-4.5 w-4.5 text-muted-foreground transition-colors group-hover:text-cyan"
                      />
                      <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 text-blue transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </span>
                    <span className="font-display text-sm font-medium">{s.name}</span>
                    <span className="text-xs leading-relaxed text-muted-foreground">{s.desc}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass mx-auto mt-3 w-full max-w-6xl rounded-3xl p-4 lg:hidden"
          >
            <div className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "border-b border-border/60 py-3 font-display text-sm uppercase tracking-[0.16em] last:border-0",
                    pathname === item.to ? "text-blue" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
