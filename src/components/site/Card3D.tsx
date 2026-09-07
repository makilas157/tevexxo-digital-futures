import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Aceternity-inspired 3D tilt card. Children can opt into depth with
 * data-depth="<px>" via the Depth helper below.
 */
export function Card3D({
  children,
  className,
  intensity = 10,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * intensity, y: px * intensity });
  };

  return (
    <div
      className="[perspective:1200px]"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => {
        setActive(false);
        setTilt({ x: 0, y: 0 });
      }}
      onMouseMove={onMove}
    >
      <div
        ref={ref}
        data-card3d="true"
        className={cn(
          "relative rounded-2xl border border-border bg-card transition-[transform,box-shadow] duration-300 ease-out [transform-style:preserve-3d]",
          className,
        )}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${active ? 1.02 : 1})`,
          boxShadow: active
            ? "0 30px 70px -30px oklch(0 0 0 / 0.95), 0 0 45px -20px color-mix(in oklab, var(--purple) 55%, transparent)"
            : "var(--shadow-card)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
          style={{
            opacity: active ? 1 : 0,
            background:
              "radial-gradient(400px circle at 50% 0%, color-mix(in oklab, var(--blue) 16%, transparent), transparent 70%)",
          }}
        />
        {children}
      </div>
    </div>
  );
}

export function Depth({
  z = 40,
  className,
  children,
}: {
  z?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className} style={{ transform: `translateZ(${z}px)` }}>
      {children}
    </div>
  );
}
