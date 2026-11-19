import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

const nodes = [
  { id: 's1', x: 44, y: 78, label: 'pump-04', r: 6 },
  { id: 's2', x: 44, y: 170, label: 'temp-07', r: 6 },
  { id: 's3', x: 44, y: 262, label: 'valve-11', r: 6 },
  { id: 'plc', x: 150, y: 170, label: 'plc' },
  { id: 'broker', x: 268, y: 170, label: 'mqtt broker', r: 22, accent: true },
  { id: 'ingest', x: 384, y: 82, label: 'ingest' },
  { id: 'tsdb', x: 480, y: 82, label: 'timescaledb' },
  { id: 'agent', x: 384, y: 258, label: 'rca agent' },
  { id: 'ui', x: 480, y: 258, label: 'operator ui' },
];

const edges = [
  { id: 'e1', d: 'M50 78 C 100 78, 110 170, 132 170', dur: 2.2, begin: 0 },
  { id: 'e2', d: 'M50 170 L 132 170', dur: 1.8, begin: 0.6 },
  { id: 'e3', d: 'M50 262 C 100 262, 110 170, 132 170', dur: 2.4, begin: 1.1 },
  { id: 'e4', d: 'M168 170 L 246 170', dur: 1.2, begin: 0.2 },
  { id: 'e5', d: 'M290 170 C 330 170, 340 82, 366 82', dur: 1.6, begin: 0.4 },
  { id: 'e6', d: 'M402 82 L 462 82', dur: 1.1, begin: 0.9 },
  { id: 'e7', d: 'M290 170 C 330 170, 340 258, 366 258', dur: 1.7, begin: 1.3 },
  { id: 'e8', d: 'M480 100 C 480 170, 420 190, 396 242', dur: 2.6, begin: 0.5 },
  { id: 'e9', d: 'M402 258 L 462 258', dur: 1.3, begin: 2.2, alert: true },
];

const streams = [
  { topic: 'plant/l2/pump-04/vibration', unit: 'mm/s', base: 4.2, spread: 0.6 },
  { topic: 'plant/l2/temp-07/outlet', unit: '°C', base: 71.5, spread: 1.4 },
  { topic: 'plant/l2/valve-11/position', unit: '%', base: 62, spread: 3 },
  { topic: 'plant/l2/pump-04/current', unit: 'A', base: 11.8, spread: 0.5 },
];

function stamp(d) {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}.${String(d.getMilliseconds()).padStart(3, '0')}`;
}

function makeLine(n) {
  const now = new Date();
  if (n > 0 && n % 9 === 0) {
    return { key: n, time: stamp(now), topic: 'agent/rca', value: 'vibration drift on pump-04, check bearing', alert: true };
  }
  const s = streams[n % streams.length];
  const v = s.base + (Math.random() - 0.5) * s.spread * 2;
  return { key: n, time: stamp(now), topic: s.topic, value: `${v.toFixed(s.unit === '%' ? 0 : 2)} ${s.unit}` };
}

export function HeroVisual() {
  const reduce = useReducedMotion();
  const { ref, inView } = useInView('100px');
  const svgRef = useRef(null);
  const counter = useRef(4);
  const [lines, setLines] = useState(() => [0, 1, 2, 3].map(makeLine));
  // Pause SMIL animations when off-screen or when reduced motion is requested.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (inView && !reduce) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [inView, reduce]);
  useEffect(() => {
    if (!inView || reduce) return;
    const t = window.setInterval(() => {
      counter.current += 1;
      setLines((ls) => [...ls.slice(1), makeLine(counter.current)]);
    }, 1100);
    return () => window.clearInterval(t);
  }, [inView, reduce]);
  // Subtle pointer tilt on desktop.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 120, damping: 20 });
  return (
    <div ref={ref} style={{ perspective: 1200 }} className="w-full">
      <motion.figure
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== 'mouse') return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        style={{ rotateX: rx, rotateY: ry, borderColor: 'var(--line)' }}
        className="relative overflow-hidden rounded-[28px] border bg-surface/60 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.35)]"
      >
        <div className="flex items-center justify-between border-b px-5 py-3.5" style={{ borderColor: 'var(--line)' }}>
          <span className="font-mono text-[0.75rem] text-muted">planttwin / live topology</span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            simulated
          </span>
        </div>

        <div className="dot-grid relative px-2 pt-2">
          <svg
            ref={svgRef}
            viewBox="0 0 524 330"
            className="h-auto w-full"
            role="img"
            aria-label="Animated diagram: sensors feed a PLC, which publishes to an MQTT broker. The broker fans out to an ingest service writing to TimescaleDB and to a root-cause-analysis agent that sends alerts to an operator dashboard."
          >
            <defs>
              {edges.map((e) => (
                <path key={e.id} id={`hv-${e.id}`} d={e.d} />
              ))}
            </defs>

            {edges.map((e) => (
              <use key={e.id} href={`#hv-${e.id}`} style={{ fill: 'none', stroke: 'rgb(var(--ink) / 0.18)', strokeWidth: 1.2 }} />
            ))}
            {/* dashed flow overlay on the alert path */}
            <path d={edges[8].d} style={{ fill: 'none', stroke: 'rgb(var(--accent))', strokeWidth: 1.4 }} className="flow-line" />

            {edges.map((e) => (
              <circle
                key={`p-${e.id}`}
                r={e.alert ? 3.2 : 2.4}
                style={{ fill: e.alert ? 'rgb(var(--accent))' : 'rgb(var(--ink) / 0.85)' }}
              >
                <animateMotion dur={`${e.dur}s`} begin={`-${e.begin}s`} repeatCount="indefinite" rotate="auto">
                  <mpath href={`#hv-${e.id}`} />
                </animateMotion>
              </circle>
            ))}

            {nodes.map((n) => {
              const r = n.r ?? 18;
              return (
                <g key={n.id}>
                  {n.accent && (
                    <circle cx={n.x} cy={n.y} r={r} style={{ fill: 'rgb(var(--accent) / 0.35)' }} className="pulse-ring" />
                  )}
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={r}
                    style={{
                      fill: 'rgb(var(--surface))',
                      stroke: n.accent ? 'rgb(var(--accent))' : 'rgb(var(--ink) / 0.35)',
                      strokeWidth: n.accent ? 1.6 : 1.2,
                    }}
                  />
                  {r > 10 && (
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={n.accent ? 5 : 3.5}
                      style={{ fill: n.accent ? 'rgb(var(--accent))' : 'rgb(var(--ink) / 0.7)' }}
                    />
                  )}
                  <text
                    x={n.x}
                    y={n.y + r + 16}
                    textAnchor="middle"
                    className="font-mono"
                    fontSize="10.5"
                    style={{ fill: 'rgb(var(--muted))' }}
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div
          className="border-t px-5 py-4 font-mono text-[0.6875rem] leading-[1.9] sm:text-[0.75rem]"
          style={{ borderColor: 'var(--line)' }}
          aria-hidden="true"
        >
          {lines.map((l, i) => (
            <motion.div
              key={l.key}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: i === 0 ? 0.45 : 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex gap-3 whitespace-nowrap"
            >
              <span className="hidden text-muted/70 sm:inline">{l.time}</span>
              <span className={l.alert ? 'text-accent' : 'text-muted'}>{l.topic}</span>
              <span className={`ml-auto truncate ${l.alert ? 'text-accent' : 'text-ink'}`}>{l.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.figure>
    </div>
  );
}
