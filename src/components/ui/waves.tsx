"use client";

import { useEffect, useRef, useCallback } from "react";
import { createNoise3D } from "simplex-noise";

interface WavesProps {
  lineCount?: number;
  waveSpeedX?: number;
  waveSpeedY?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  xGap?: number;
  yGap?: number;
  friction?: number;
  tension?: number;
  maxCursorMove?: number;
  strokeColor?: string;
  backgroundColor?: string;
  className?: string;
}

interface Point {
  x: number;
  y: number;
  wave: { x: number; y: number };
  cursor: { x: number; y: number; vx: number; vy: number };
}

const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

export default function Waves({
  lineCount = 12,
  waveSpeedX = 0.0008,
  waveSpeedY = 0.0006,
  waveAmpX = 32,
  waveAmpY = 20,
  xGap = 18,
  yGap = 36,
  friction = 0.925,
  tension = 0.004,
  maxCursorMove = 90,
  strokeColor = "#8B5CF6",
  backgroundColor = "#000000",
  className = "",
}: WavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const lines = useRef<Point[][]>([]);
  const noise3D = useRef(createNoise3D()).current;
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const lastFrameRef = useRef(0);

  const buildGrid = useCallback(
    (width: number, height: number): Point[][] => {
      const cols = Math.ceil(width / xGap) + 1;
      const rows = Math.ceil(height / yGap) + 1;
      return Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => ({
          x: col * xGap,
          y: row * yGap,
          wave: { x: 0, y: 0 },
          cursor: { x: 0, y: 0, vx: 0, vy: 0 },
        }))
      );
    },
    [xGap, yGap]
  );

  const movePoints = useCallback(
    (points: Point[][], dt: number, isMobile: boolean) => {
      const cx = mouse.current.x;
      const cy = mouse.current.y;

      points.forEach((row) =>
        row.forEach((p) => {
          const nx = noise3D(p.x * 0.004, p.y * 0.004, timeRef.current * waveSpeedX);
          const ny = noise3D(p.x * 0.004 + 100, p.y * 0.004, timeRef.current * waveSpeedY);
          p.wave.x = nx * waveAmpX;
          p.wave.y = ny * waveAmpY;

          // Mobilde cursor hesaplamayı atla
          if (!isMobile) {
            const dx = p.x + p.wave.x - cx;
            const dy = p.y + p.wave.y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 200;
            if (dist < radius) {
              const force = (1 - dist / radius) * maxCursorMove;
              const angle = Math.atan2(dy, dx);
              p.cursor.vx += Math.cos(angle) * force * tension * 80;
              p.cursor.vy += Math.sin(angle) * force * tension * 80;
            }
            p.cursor.vx *= friction;
            p.cursor.vy *= friction;
            p.cursor.x += p.cursor.vx;
            p.cursor.y += p.cursor.vy;
            p.cursor.x -= p.cursor.x * tension;
            p.cursor.y -= p.cursor.y * tension;
          }
        })
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove]
  );

  const drawLines = useCallback(
    (ctx: CanvasRenderingContext2D, points: Point[][]) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      points.forEach((row, rowIdx) => {
        const alpha = 0.12 + (rowIdx % 4) * 0.06;
        ctx.beginPath();
        ctx.strokeStyle = strokeColor;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 1.2;

        row.forEach((p, i) => {
          const px = p.x + p.wave.x + p.cursor.x;
          const py = p.y + p.wave.y + p.cursor.y;
          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            const prev = row[i - 1];
            const ppx = prev.x + prev.wave.x + prev.cursor.x;
            const ppy = prev.y + prev.wave.y + prev.cursor.y;
            const cpx = (ppx + px) / 2;
            const cpy = (ppy + py) / 2;
            ctx.quadraticCurveTo(ppx, ppy, cpx, cpy);
          }
        });
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
    },
    [strokeColor, backgroundColor]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // prefers-reduced-motion: animasyonu kapat
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const isMobile = () => window.innerWidth < 768;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      // DPR'ı 1.5 ile sınırla — retina'da tam DPR çok pahalı
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      lines.current = buildGrid(width, height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onMouseMove = (e: MouseEvent) => {
      if (isMobile()) return;
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouse.current = { x: -999, y: -999 }; };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", onMouseLeave);

    let last = performance.now();
    const tick = (now: number) => {
      animRef.current = requestAnimationFrame(tick);

      // Tab gizliyse çizme
      if (document.hidden) return;

      // 30fps sınırı
      if (now - lastFrameRef.current < FRAME_INTERVAL) return;
      lastFrameRef.current = now;

      const dt = now - last;
      last = now;
      timeRef.current += dt;
      movePoints(lines.current, dt, isMobile());
      drawLines(ctx, lines.current);
    };
    animRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [buildGrid, movePoints, drawLines]);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}


interface WavesProps {
  lineCount?: number;
  waveSpeedX?: number;
  waveSpeedY?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  xGap?: number;
  yGap?: number;
  friction?: number;
  tension?: number;
  maxCursorMove?: number;
  strokeColor?: string;
  backgroundColor?: string;
  className?: string;
}

interface Point {
  x: number;
  y: number;
  wave: { x: number; y: number };
  cursor: { x: number; y: number; vx: number; vy: number };
}
