import { useEffect, useRef } from "react";
import nebula from "@/assets/cosmic-horizon.jpg";

// Shared warp value: intro sets it (0..1) to accelerate the stars.
export const warp = { v: 0 };

export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = innerWidth < 768;
    const N = mobile ? 180 : 420;
    let w = 0,
      h = 0;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    const stars = Array.from({ length: N }, () => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: Math.random(),
      t: Math.random(),
    }));
    const m = { x: 0, y: 0, tx: 0, ty: 0 };
    const resize = () => {
      w = innerWidth;
      h = innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const move = (e: PointerEvent) => {
      if (reduce) return;
      m.tx = e.clientX / w - 0.5;
      m.ty = e.clientY / h - 0.5;
    };
    resize();
    addEventListener("resize", resize, { passive: true });
    addEventListener("pointermove", move, { passive: true });
    let raf = 0,
      last = performance.now();
    let lastScroll = -1;
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      m.x += (m.tx - m.x) * (1 - Math.exp(-3 * dt));
      m.y += (m.ty - m.y) * (1 - Math.exp(-3 * dt));
      const speed = reduce ? 0 : 0.015 + warp.v * warp.v * 1.6;
      const scrollDepth = Math.min(scrollY / (h * 6), 1);
      if (warp.v > 0.02) {
        ctx.fillStyle = `rgba(9,10,13,${0.35 + (1 - warp.v) * 0.5})`;
        ctx.fillRect(0, 0, w, h);
      } else ctx.clearRect(0, 0, w, h);

      if (img.current && Math.abs(scrollY - lastScroll) > 1) {
        lastScroll = scrollY;
        img.current.style.transform = `translate3d(${reduce ? 0 : (-m.x * 10).toFixed(1)}px, ${reduce ? 0 : (-m.y * 10).toFixed(1)}px, 0) scale(${(1.06 + warp.v * 0.3 + (reduce ? 0 : scrollDepth * 0.06)).toFixed(3)})`;
      }

      const cx = w / 2 - m.x * 30,
        cy = h / 2 - m.y * 30;
      for (const s of stars) {
        const pz = s.z;
        s.z -= speed * dt * (1 + scrollDepth);
        if (s.z <= 0.02) {
          s.z = 1;
          s.x = (Math.random() - 0.5) * 2;
          s.y = (Math.random() - 0.5) * 2;
          continue;
        }
        const k = 0.5 / s.z,
          k0 = 0.5 / pz;
        const x = cx + s.x * w * k * 0.5 - m.x * 40 * (1 - s.z),
          y = cy + s.y * h * k * 0.5 - m.y * 40 * (1 - s.z);
        if (x < 0 || x > w || y < 0 || y > h) continue;
        const a = Math.min(1, (1 - s.z) * 1.1) * (0.55 + 0.25 * Math.sin(now / 900 + s.t * 9));
        const hueCyan = s.t > 0.85;
        const color = hueCyan
          ? `rgba(172,189,212,${a.toFixed(2)})`
          : s.t < 0.1
            ? `rgba(217,186,203,${a.toFixed(2)})`
            : `rgba(242,224,220,${a.toFixed(2)})`;

        if (warp.v > 0.15) {
          const x0 = cx + s.x * w * k0 * 0.5,
            y0 = cy + s.y * h * k0 * 0.5;
          ctx.strokeStyle = color;
          ctx.lineWidth = (1 - s.z) * 2;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x, y);
          ctx.stroke();
        } else {
          const r = (1 - s.z) * 1.3 + 0.2;
          ctx.fillStyle = color;
          ctx.fillRect(x - r, y - r, r * 2, r * 2);
        }
      }
      if (reduce && warp.v === 0) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    const wake = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };
    if (reduce) addEventListener("resize", wake, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", move);
      if (reduce) removeEventListener("resize", wake);
    };
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-background">
      <img
        ref={img}
        src={nebula}
        alt=""
        fetchPriority="high"
        decoding="async"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover opacity-30 will-change-transform max-md:object-[70%_center]"
      />
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      <div className="nebula absolute inset-0" />
      <div className="grain absolute inset-0" />
    </div>
  );
}
