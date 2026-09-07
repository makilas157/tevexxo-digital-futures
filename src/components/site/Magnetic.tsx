import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

const base =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-display text-xs font-semibold uppercase tracking-[0.18em] transition-colors";

const styles: Record<Variant, string> = {
  primary:
    "text-primary-foreground border border-transparent [background:var(--gradient-accent)] shadow-[var(--glow-purple)]",
  ghost: "border border-border text-foreground hover:border-blue/60 hover:text-blue",
};

export function Magnetic({
  children,
  className,
  strength = 18,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setPos({
          x: ((e.clientX - r.left) / r.width - 0.5) * strength * 2,
          y: ((e.clientY - r.top) / r.height - 0.5) * strength * 2,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 220, damping: 16, mass: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

export function MagneticLink({
  to,
  children,
  variant = "primary",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Magnetic>
      <Link to={to} className={cn(base, styles[variant], className)}>
        <span className="relative z-10">{children}</span>
      </Link>
    </Magnetic>
  );
}

export function MagneticButton({
  children,
  variant = "primary",
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <Magnetic>
      <button className={cn(base, styles[variant], className)} {...rest}>
        <span className="relative z-10">{children}</span>
      </button>
    </Magnetic>
  );
}
