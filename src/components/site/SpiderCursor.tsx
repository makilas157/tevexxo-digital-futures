import { useEffect, useRef } from "react";

type Leg = {
  side: number; // -1 left, 1 right
  index: number;
  foot: { x: number; y: number };
  target: { x: number; y: number };
  step: number; // 0..1 lift progress
};

type Ripple = { x: number; y: number; r: number; life: number };

const TRAIL_MAX = 26;

export function SpiderCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const body = { x: mouse.x, y: mouse.y, vx: 0, vy: 0, angle: 0 };
    const trail: { x: number; y: number; life: number }[] = [];
    const ripples: Ripple[] = [];
    let speed = 0;
    let contract = 0; // 0..1 hovering interactive element
    let scanRect: DOMRect | null = null;
    let webTargets: { x: number; y: number }[] = [];
    let t = 0;

    const legs: Leg[] = [];
    for (let s = 0; s < 2; s++) {
      for (let i = 0; i < 4; i++) {
        legs.push({
          side: s === 0 ? -1 : 1,
          index: i,
          foot: { x: body.x, y: body.y },
          target: { x: body.x, y: body.y },
          step: 0,
        });
      }
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      trail.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (trail.length > TRAIL_MAX) trail.shift();

      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const interactive = el?.closest("a,button,input,textarea,select,[data-magnetic]");
      const card = el?.closest("[data-card3d]");
      const img = el?.closest("img");
      contract = interactive ? 1 : 0;
      scanRect = img ? img.getBoundingClientRect() : null;
      if (card) {
        const r = card.getBoundingClientRect();
        webTargets = [
          { x: r.left, y: r.top },
          { x: r.right, y: r.top },
          { x: r.left, y: r.bottom },
          { x: r.right, y: r.bottom },
        ];
      } else {
        webTargets = [];
      }
    };

    const onTouch = (e: TouchEvent) => {
      const p = e.touches[0];
      if (!p) return;
      ripples.push({ x: p.clientX, y: p.clientY, r: 0, life: 1 });
    };

    if (coarse) {
      window.addEventListener("touchstart", onTouch, { passive: true });
      window.addEventListener("touchmove", onTouch, { passive: true });
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.classList.add("no-native-cursor");
    }

    const legBase = (leg: Leg) => {
      const along = [8, 3, -3, -9][leg.index];
      const out = [10, 12, 12, 9][leg.index];
      const cos = Math.cos(body.angle);
      const sin = Math.sin(body.angle);
      return {
        x: body.x + cos * along - sin * out * leg.side,
        y: body.y + sin * along + cos * out * leg.side,
      };
    };

    const restTarget = (leg: Leg) => {
      const spread = 1 - contract * 0.45;
      const along = [34, 16, -14, -32][leg.index] * spread;
      const out = [30, 42, 42, 30][leg.index] * spread;
      const cos = Math.cos(body.angle);
      const sin = Math.sin(body.angle);
      return {
        x: body.x + cos * along - sin * out * leg.side,
        y: body.y + sin * along + cos * out * leg.side,
      };
    };

    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      t += 1;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // web trail
      for (let i = 0; i < trail.length; i++) {
        trail[i].life *= 0.94;
      }
      while (trail.length && trail[0].life < 0.04) trail.shift();

      ctx.lineWidth = 1;
      for (let i = 1; i < trail.length; i++) {
        const a = trail[i - 1];
        const b = trail[i];
        ctx.strokeStyle = `rgba(59,130,246,${b.life * 0.35})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        if (i % 3 === 0) {
          const j = Math.max(0, i - 6);
          ctx.strokeStyle = `rgba(139,92,246,${b.life * 0.18})`;
          ctx.beginPath();
          ctx.moveTo(trail[j].x, trail[j].y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // touch ripples (mobile)
      for (const rp of ripples) {
        rp.r += 3.4;
        rp.life *= 0.955;
        ctx.strokeStyle = `rgba(34,211,238,${rp.life * 0.5})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
        const grd = ctx.createRadialGradient(rp.x, rp.y, 0, rp.x, rp.y, 90);
        grd.addColorStop(0, `rgba(139,92,246,${rp.life * 0.18})`);
        grd.addColorStop(1, "rgba(139,92,246,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, 90, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (ripples[i].life < 0.03) ripples.splice(i, 1);
      }

      if (coarse) return;

      // spring physics body
      const dx = mouse.x - body.x;
      const dy = mouse.y - body.y;
      const dist = Math.hypot(dx, dy);
      const stiffness = 0.09 + Math.min(dist / 900, 0.1);
      body.vx += dx * stiffness;
      body.vy += dy * stiffness;
      body.vx *= 0.74;
      body.vy *= 0.74;
      body.x += body.vx * 0.28;
      body.y += body.vy * 0.28;
      speed = speed * 0.85 + Math.hypot(body.vx, body.vy) * 0.15;

      if (dist > 6) {
        const target = Math.atan2(dy, dx);
        let diff = target - body.angle;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        body.angle += diff * 0.12;
      }

      const idle = Math.sin(t / 26) * (speed < 0.6 ? 2.4 : 0.6);

      // legs
      ctx.lineCap = "round";
      for (const leg of legs) {
        const hip = legBase(leg);
        const want = restTarget(leg);
        const legPhase = (leg.index + (leg.side > 0 ? 2 : 0)) % 4;
        const stepping = Math.floor(t / 7 + legPhase * 1.1) % 4 === legPhase;
        const away = Math.hypot(leg.foot.x - want.x, leg.foot.y - want.y);
        if ((stepping && away > 6 + speed * 2) || away > 70) {
          leg.target = want;
          leg.step = 1;
        }
        leg.step *= 0.82;
        leg.foot.x += (leg.target.x - leg.foot.x) * (0.18 + speed * 0.04);
        leg.foot.y += (leg.target.y - leg.foot.y) * (0.18 + speed * 0.04);

        const lift = leg.step * (6 + speed * 2);
        const mid = {
          x: (hip.x + leg.foot.x) / 2,
          y: (hip.y + leg.foot.y) / 2,
        };
        const nx = -(leg.foot.y - hip.y);
        const ny = leg.foot.x - hip.x;
        const nl = Math.hypot(nx, ny) || 1;
        const knee = {
          x: mid.x + (nx / nl) * (11 + lift) * leg.side * -1,
          y: mid.y + (ny / nl) * (11 + lift) * leg.side * -1 - lift - idle,
        };

        // shadow
        ctx.strokeStyle = "rgba(0,0,0,0.45)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(hip.x + 3, hip.y + 5);
        ctx.quadraticCurveTo(knee.x + 3, knee.y + 5, leg.foot.x + 3, leg.foot.y + 5);
        ctx.stroke();

        ctx.strokeStyle = `rgba(190,205,225,${0.75 + contract * 0.2})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(hip.x, hip.y);
        ctx.quadraticCurveTo(knee.x, knee.y, leg.foot.x, leg.foot.y);
        ctx.stroke();

        ctx.fillStyle = `rgba(34,211,238,${0.55 + contract * 0.4})`;
        ctx.beginPath();
        ctx.arc(leg.foot.x, leg.foot.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // web toward hovered card corners
      for (const wt of webTargets) {
        ctx.strokeStyle = "rgba(139,92,246,0.22)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(body.x, body.y);
        ctx.lineTo(wt.x, wt.y);
        ctx.stroke();
      }

      // image scan effect
      if (scanRect) {
        const y = scanRect.top + ((t * 3) % scanRect.height);
        const g = ctx.createLinearGradient(scanRect.left, y - 20, scanRect.left, y + 20);
        g.addColorStop(0, "rgba(34,211,238,0)");
        g.addColorStop(0.5, "rgba(34,211,238,0.3)");
        g.addColorStop(1, "rgba(34,211,238,0)");
        ctx.fillStyle = g;
        ctx.fillRect(scanRect.left, y - 20, scanRect.width, 40);
      }

      // body
      const cos = Math.cos(body.angle);
      const sin = Math.sin(body.angle);
      const scale = 1 - contract * 0.14;
      ctx.save();
      ctx.translate(body.x, body.y + idle * 0.4);
      ctx.rotate(body.angle);
      ctx.scale(scale, scale);

      // glow aura
      const aura = ctx.createRadialGradient(0, 0, 0, 0, 0, 46);
      aura.addColorStop(0, `rgba(59,130,246,${0.22 + contract * 0.25})`);
      aura.addColorStop(1, "rgba(59,130,246,0)");
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(0, 0, 46, 0, Math.PI * 2);
      ctx.fill();

      // abdomen
      ctx.fillStyle = "#101318";
      ctx.strokeStyle = "rgba(150,170,200,0.75)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(-13, 0, 13, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = `rgba(139,92,246,${0.7 + contract * 0.3})`;
      ctx.beginPath();
      ctx.moveTo(-20, 0);
      ctx.lineTo(-6, 0);
      ctx.stroke();

      // thorax
      ctx.fillStyle = "#171b21";
      ctx.strokeStyle = "rgba(180,195,215,0.8)";
      ctx.beginPath();
      ctx.ellipse(0, 0, 9, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // head
      ctx.fillStyle = "#1d2229";
      ctx.beginPath();
      ctx.ellipse(11, 0, 7, 5.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // eyes
      const eyeGlow = 0.75 + contract * 0.25 + Math.sin(t / 18) * 0.08;
      for (const [ex, ey, er] of [
        [14, -2.4, 2],
        [14, 2.4, 2],
        [10, -3.4, 1.1],
        [10, 3.4, 1.1],
      ]) {
        ctx.fillStyle = `rgba(90,170,255,${eyeGlow})`;
        ctx.shadowColor = "rgba(59,130,246,0.9)";
        ctx.shadowBlur = 10 + contract * 12;
        ctx.beginPath();
        ctx.arc(ex, ey, er, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // fangs
      ctx.strokeStyle = "rgba(200,215,235,0.8)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(17, -2);
      ctx.lineTo(21, -3.5);
      ctx.moveTo(17, 2);
      ctx.lineTo(21, 3.5);
      ctx.stroke();
      ctx.restore();
      void cos;
      void sin;
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      document.documentElement.classList.remove("no-native-cursor");
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90]"
    />
  );
}
