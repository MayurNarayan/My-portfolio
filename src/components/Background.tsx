import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    interface P {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      hue: number;
    }
    let particles: P[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.min(Math.floor((w * h) / 22000), 110);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.4,
        hue: Math.random() > 0.5 ? 160 : 190,
      }));
    };

    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    const drawGrid = () => {
      const gap = 48;
      ctx.strokeStyle = "rgba(16,185,129,0.045)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= w; x += gap) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y <= h; y += gap) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // ambient glows
      const g1 = ctx.createRadialGradient(w * 0.15, h * 0.1, 0, w * 0.15, h * 0.1, w * 0.5);
      g1.addColorStop(0, "rgba(16,185,129,0.07)");
      g1.addColorStop(1, "rgba(16,185,129,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(w * 0.85, h * 0.75, 0, w * 0.85, h * 0.75, w * 0.45);
      g2.addColorStop(0, "rgba(6,182,212,0.08)");
      g2.addColorStop(1, "rgba(6,182,212,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      drawGrid();

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // cursor aura
      if (mx > -1000) {
        const aura = ctx.createRadialGradient(mx, my, 0, mx, my, 180);
        aura.addColorStop(0, "rgba(16,185,129,0.10)");
        aura.addColorStop(1, "rgba(16,185,129,0)");
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(mx, my, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      // links
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // gentle cursor repulsion
        const dxm = p.x - mx;
        const dym = p.y - my;
        const dm = Math.hypot(dxm, dym);
        if (dm < 160 && dm > 0.1) {
          const f = ((160 - dm) / 160) * 0.6;
          p.vx += (dxm / dm) * f * 0.04;
          p.vy += (dym / dm) * f * 0.04;
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
        // keep minimum drift
        if (Math.abs(p.vx) < 0.08) p.vx += (Math.random() - 0.5) * 0.02;
        if (Math.abs(p.vy) < 0.08) p.vy += (Math.random() - 0.5) * 0.02;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            ctx.strokeStyle = `rgba(16,185,129,${(1 - d / 130) * 0.16})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // dots
      for (const p of particles) {
        const nearMouse = Math.hypot(p.x - mx, p.y - my) < 140;
        ctx.fillStyle = nearMouse
          ? `hsla(${p.hue}, 90%, 65%, 0.95)`
          : `hsla(${p.hue}, 70%, 55%, 0.5)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, nearMouse ? p.r + 1 : p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden />
      <div className="noise-overlay pointer-events-none fixed inset-0 z-[1] opacity-60" aria-hidden />
      <div className="bg-blueprint pointer-events-none fixed inset-0 z-0" aria-hidden />
    </>
  );
}
