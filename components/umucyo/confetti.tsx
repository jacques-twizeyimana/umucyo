"use client";

import { useEffect, useRef } from "react";

/** Brand colours for the pieces. Yellow is left out: it is reserved for urgency. */
const COLOR_TOKENS = ["--navy", "--gov-blue", "--link", "--accent-on-navy", "--accent-soft", "--open"];

const DURATION = 4.5; // seconds until every piece has faded out
const FADE = 1; // seconds of fade at the end
const GRAVITY = 700; // px/s²
const DRAG = 3.5; // linear air drag, 1/s (terminal fall speed = GRAVITY / DRAG)

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  round: boolean;
  color: string;
  rot: number;
  spin: number;
  flip: number;
  flipSpeed: number;
  sway: number;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/** Reads and removes `param` from the URL, so a refresh or back-navigation doesn't celebrate twice. */
function consumeParam(param: string) {
  const url = new URL(window.location.href);
  if (!url.searchParams.has(param)) return false;
  url.searchParams.delete(param);
  window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
  return true;
}

function burst(width: number, height: number, colors: string[]): Piece[] {
  const perSide = width < 600 ? 50 : 85;
  const pieces: Piece[] = [];
  for (const dir of [1, -1]) {
    for (let i = 0; i < perSide; i++) {
      const round = Math.random() < 0.3;
      const size = round ? rand(6, 9) : rand(6, 10);
      pieces.push({
        x: dir === 1 ? rand(-20, 0) : rand(width, width + 20),
        y: height + rand(0, 20),
        // With linear drag, a piece travels about v0 / DRAG before slowing to a drift.
        vx: dir * rand(0.12, 0.55) * width * DRAG,
        vy: -rand(0.45, 0.9) * height * DRAG,
        w: size,
        h: round ? size : size * rand(1.4, 1.8),
        round,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: rand(0, Math.PI * 2),
        spin: rand(-8, 8),
        flip: rand(0, Math.PI * 2),
        flipSpeed: rand(6, 12),
        sway: rand(20, 60),
      });
    }
  }
  return pieces;
}

/**
 * A one-off confetti burst from both bottom corners of the screen.
 * It plays when the page URL carries `?{param}` (e.g. `?celebrate`) and is skipped for
 * people who prefer reduced motion. The canvas never takes clicks or focus.
 */
export function Confetti({ param = "celebrate" }: { param?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Kept in a ref so React's dev-mode double effect still plays after the param is gone.
  const pending = useRef<boolean | null>(null);

  useEffect(() => {
    if (pending.current === null) pending.current = consumeParam(param);
    if (!pending.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pending.current = false;
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const root = getComputedStyle(document.documentElement);
    const colors = COLOR_TOKENS.map((t) => root.getPropertyValue(t).trim()).filter(Boolean);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const pieces = burst(width, height, colors.length ? colors : ["#0b2257"]);
    let elapsed = 0;
    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      elapsed += dt;
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = Math.min(1, Math.max(0, (DURATION - elapsed) / FADE));

      for (const p of pieces) {
        p.vx -= p.vx * DRAG * dt;
        p.vy += (GRAVITY - p.vy * DRAG) * dt;
        p.flip += p.flipSpeed * dt;
        p.x += (p.vx + Math.sin(p.flip) * p.sway) * dt;
        p.y += p.vy * dt;
        p.rot += p.spin * dt;
        if (p.y > height + 40) continue;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        // Squashing one axis with cos() makes the piece look like it is tumbling.
        ctx.scale(1, Math.cos(p.flip));
        ctx.fillStyle = p.color;
        if (p.round) {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx.restore();
      }

      if (elapsed < DURATION) {
        frame = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, width, height);
        pending.current = false;
      }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [param]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1000 }}
    />
  );
}
