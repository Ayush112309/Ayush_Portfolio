import { useMemo } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/utils/cn';

/**
 * Abstract, code-drawn visuals (no stock photos, no fake screenshots).
 * Each one illustrates the core idea of the project.
 */
const C = {
  faint: 'rgb(var(--ink) / 0.10)',
  line: 'rgb(var(--ink) / 0.22)',
  mid: 'rgb(var(--ink) / 0.45)',
  ink: 'rgb(var(--ink) / 0.85)',
  muted: 'rgb(var(--muted))',
  accent: 'rgb(var(--accent))',
  accentSoft: 'rgb(var(--accent) / 0.18)',
  surface: 'rgb(var(--surface))',
};

const stroke = (color, width = 1.2, extra = {}) => ({
  fill: 'none',
  stroke: color,
  strokeWidth: width,
  ...extra,
});

const fill = (color) => ({ fill: color });

function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function Twin() {
  const series = useMemo(() => {
    const r = rng(7);
    return [0, 1, 2].map((k) => {
      const pts = [];
      for (let i = 0; i <= 60; i++) {
        const x = 30 + i * 5.6;
        let y = 70 + k * 60 + Math.sin(i / (3 + k)) * 9 + (r() - 0.5) * 6;
        if (k === 0 && i > 40 && i < 46) y -= (6 - Math.abs(43 - i)) * 9;
        pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
      }
      return pts.join(' ');
    });
  }, []);
  return (
    <>
      {[70, 130, 190].map((y) => (
        <line key={y} x1={30} x2={370} y1={y} y2={y} style={stroke(C.faint, 1, { strokeDasharray: '2 5' })} />
      ))}
      {series.map((p, i) => (
        <polyline key={i} points={p} style={stroke(i === 0 ? C.ink : C.mid, 1.3, { strokeLinejoin: 'round' })} />
      ))}
      <rect x={250} y={20} width={34} height={220} rx={6} style={fill(C.accentSoft)} />
      <line x1={267} x2={267} y1={20} y2={240} style={stroke(C.accent, 1.2, { strokeDasharray: '3 4' })} />
      <circle cx={270.8} cy={28} r={4} style={fill(C.accent)} />
      <circle cx={270.8} cy={28} r={4} style={fill(C.accent)} className="pulse-ring" />
      {['vibration', 'temperature', 'current'].map((t, i) => (
        <text key={t} x={30} y={56 + i * 60} fontSize="10" className="font-mono" style={fill(C.muted)}>
          {t}
        </text>
      ))}
    </>
  );
}

function Rag() {
  const { pts, near, q, radius } = useMemo(() => {
    const r = rng(42);
    const centers = [
      [100, 80],
      [300, 70],
      [250, 180],
      [90, 190],
    ];
    const pts = centers.flatMap(([cx, cy]) => Array.from({ length: 14 }, () => [cx + (r() - 0.5) * 150, cy + (r() - 0.5) * 90]));
    const q = [205, 128];
    const near = [...pts]
      .map((p) => ({ p, d: Math.hypot(p[0] - q[0], p[1] - q[1]) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 4)
      .map((x) => x.p);
    const radius = Math.hypot(near[3][0] - q[0], near[3][1] - q[1]) + 10;
    return { pts, near, q, radius };
  }, []);
  return (
    <>
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.6} style={fill(C.mid)} />
      ))}
      <circle cx={q[0]} cy={q[1]} r={radius} style={stroke(C.accent, 1, { strokeDasharray: '2 4', opacity: 0.7 })} />
      {near.map(([x, y], i) => (
        <g key={i}>
          <line x1={q[0]} y1={q[1]} x2={x} y2={y} style={stroke(C.accent, 1.2)} className="flow-line" />
          <circle cx={x} cy={y} r={4} style={{ ...fill(C.surface), stroke: C.accent, strokeWidth: 1.4 }} />
        </g>
      ))}
      <circle cx={q[0]} cy={q[1]} r={6} style={fill(C.accent)} />
      <text x={q[0] + 12} y={q[1] - 10} fontSize="10" className="font-mono" style={fill(C.ink)}>
        query
      </text>
      <text x={24} y={238} fontSize="10" className="font-mono" style={fill(C.muted)}>
        top-k chunks, with sources
      </text>
    </>
  );
}

function Mqtt() {
  const lanes = ['rooms/general', 'rooms/eng', 'rooms/ops'];
  return (
    <>
      <circle cx={200} cy={130} r={26} style={{ ...fill(C.surface), stroke: C.accent, strokeWidth: 1.5 }} />
      <circle cx={200} cy={130} r={26} style={fill(C.accentSoft)} className="pulse-ring" />
      <text x={200} y={134} textAnchor="middle" fontSize="10" className="font-mono" style={fill(C.ink)}>
        broker
      </text>
      {lanes.map((l, i) => {
        const y = 60 + i * 70;
        return (
          <g key={l}>
            <path d={`M40 ${y} C 120 ${y}, 140 130, 174 130`} style={stroke(C.line)} />
            <path d={`M226 130 C 260 130, 280 ${y}, 360 ${y}`} style={stroke(C.line)} />
            <path
              d={`M226 130 C 260 130, 280 ${y}, 360 ${y}`}
              style={stroke(i === 1 ? C.accent : C.mid, 1.3)}
              className="flow-line"
            />
            <circle cx={40} cy={y} r={5} style={fill(C.ink)} />
            <rect
              x={352}
              y={y - 9}
              width={18}
              height={18}
              rx={5}
              style={{ ...fill(C.surface), stroke: C.mid, strokeWidth: 1.2 }}
            />
            <text x={40} y={y - 12} fontSize="10" className="font-mono" style={fill(C.muted)}>
              {l}
            </text>
          </g>
        );
      })}
      <text x={376} y={248} textAnchor="end" fontSize="10" className="font-mono" style={fill(C.muted)}>
        retry: backoff ×2
      </text>
    </>
  );
}

function Pos() {
  const tables = [
    { x: 30, y: 40, name: 'orders', rows: 4 },
    { x: 30, y: 150, name: 'items', rows: 3 },
    { x: 150, y: 95, name: 'payments', rows: 3 },
  ];
  return (
    <>
      {tables.map((t) => (
        <g key={t.name}>
          <rect
            x={t.x}
            y={t.y}
            width={100}
            height={18 + t.rows * 16}
            rx={6}
            style={{ ...fill(C.surface), stroke: C.line, strokeWidth: 1.2 }}
          />
          <text x={t.x + 10} y={t.y + 13} fontSize="10" className="font-mono" style={fill(C.ink)}>
            {t.name}
          </text>
          {Array.from({ length: t.rows }, (_, i) => (
            <rect
              key={i}
              x={t.x + 10}
              y={t.y + 24 + i * 16}
              width={40 + ((i * 23) % 40)}
              height={5}
              rx={2.5}
              style={fill(C.faint)}
            />
          ))}
        </g>
      ))}
      <path d="M130 70 C 140 70, 140 110, 150 110" style={stroke(C.mid)} />
      <path d="M130 170 C 140 170, 140 125, 150 125" style={stroke(C.mid)} />
      <g transform="translate(276 28)">
        <path
          d="M0 0 H96 V196 l-12 8 -12 -8 -12 8 -12 -8 -12 8 -12 -8 -12 8 -12 -8 Z"
          style={{ ...fill(C.surface), stroke: C.line, strokeWidth: 1.2 }}
        />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={12} y={22 + i * 22} width={40 - (i % 2) * 10} height={5} rx={2.5} style={fill(C.faint)} />
            <rect x={66} y={22 + i * 22} width={18} height={5} rx={2.5} style={fill(C.line)} />
          </g>
        ))}
        <line x1={12} x2={84} y1={140} y2={140} style={stroke(C.line, 1, { strokeDasharray: '3 3' })} />
        <rect x={12} y={152} width={30} height={7} rx={3.5} style={fill(C.ink)} />
        <rect x={60} y={152} width={24} height={7} rx={3.5} style={fill(C.accent)} />
      </g>
      <g transform="translate(150 196)">
        <rect width={92} height={26} rx={13} style={{ ...fill(C.surface), stroke: C.line, strokeWidth: 1.2 }} />
        <circle cx={14} cy={13} r={4} style={fill(C.accent)} />
        <text x={26} y={17} fontSize="10" className="font-mono" style={fill(C.muted)}>
          role: admin
        </text>
      </g>
    </>
  );
}

function Audio() {
  const bars = useMemo(() => {
    const r = rng(3);
    return Array.from({ length: 46 }, (_, i) => 18 + Math.abs(Math.sin(i / 3.2)) * 50 + r() * 26);
  }, []);
  return (
    <>
      <line x1={24} x2={376} y1={120} y2={120} style={stroke(C.faint)} />
      {bars.map((h, i) => {
        const x = 26 + i * 7.6;
        const flagged = i >= 27 && i <= 35;
        return (
          <rect
            key={i}
            x={x}
            y={120 - h / 2}
            width={3.6}
            height={h}
            rx={1.8}
            className="bar-wave"
            style={{ ...fill(flagged ? C.accent : C.mid), animationDelay: `${(i % 12) * 0.12}s` }}
          />
        );
      })}
      <rect x={228} y={44} width={66} height={152} rx={8} style={stroke(C.accent, 1.2, { strokeDasharray: '3 4' })} />
      <text x={228} y={36} fontSize="10" className="font-mono" style={fill(C.accent)}>
        flagged segment
      </text>
      <path d="M24 222 C 90 222, 120 214, 180 212 S 260 190, 300 186 S 350 200, 376 204" style={stroke(C.ink, 1.3)} />
      <text x={24} y={244} fontSize="10" className="font-mono" style={fill(C.muted)}>
        p(synthetic), streamed over SSE
      </text>
    </>
  );
}

const map = { twin: Twin, rag: Rag, mqtt: Mqtt, pos: Pos, audio: Audio };

export function ProjectVisual({ kind, className, label }) {
  const { ref, inView } = useInView('50px');
  const Art = map[kind];
  return (
    <div ref={ref} className={cn('dot-grid relative overflow-hidden', !inView && 'paused', className)}>
      <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
        <Art />
      </svg>
    </div>
  );
}
