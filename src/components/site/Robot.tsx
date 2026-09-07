import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import robot from "@/assets/robot.png";

export function Robot() {
  const [p, setP] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      setP({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="relative mx-auto flex w-full max-w-md items-center justify-center [perspective:1200px]">
      {/* glowing rings */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="animate-spin-slow h-[380px] w-[380px] rounded-full border border-blue/20 sm:h-[460px] sm:w-[460px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div
          className="animate-spin-slow h-[300px] w-[300px] rounded-full border border-dashed border-purple/25 sm:h-[360px] sm:w-[360px]"
          style={{ animationDirection: "reverse" }}
        />
      </div>
      <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-blue/20 blur-[90px]" />

      {/* floating UI chips */}
      {[
        { t: "AI.CORE", c: "top-6 -left-2", d: 0 },
        { t: "99.9% UPTIME", c: "bottom-16 -left-6", d: 0.6 },
        { t: "<BUILD/>", c: "top-24 -right-4", d: 1.2 },
        { t: "DEPLOY ✓", c: "bottom-6 right-0", d: 1.8 },
      ].map((chip) => (
        <motion.div
          key={chip.t}
          className={`glass absolute ${chip.c} rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground`}
          animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, delay: chip.d, ease: "easeInOut" }}
        >
          {chip.t}
        </motion.div>
      ))}

      <motion.img
        src={robot}
        alt="TEVEXXO futuristic AI assistant robot with glowing blue eyes"
        width={1024}
        height={1280}
        className="relative z-10 w-[78%] max-w-sm drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
        initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
        animate={{
          opacity: 1,
          y: [0, -14, 0],
          filter: "blur(0px)",
          rotateY: p.x * 8,
          rotateX: -p.y * 5,
        }}
        transition={{
          opacity: { duration: 1.2 },
          filter: { duration: 1.2 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          rotateY: { type: "spring", stiffness: 60, damping: 18 },
          rotateX: { type: "spring", stiffness: 60, damping: 18 },
        }}
      />
    </div>
  );
}
