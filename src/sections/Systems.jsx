import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects, systemDomains } from '@/content';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/utils/cn';

const layout = {
  ai: { x: 180, y: 58 },
  backend: { x: 62, y: 262 },
  realtime: { x: 298, y: 262 },
};

const pairs = [
  ['ai', 'backend'],
  ['backend', 'realtime'],
  ['realtime', 'ai'],
];

function Graph({ active, onSelect }) {
  const { ref, inView } = useInView();
  const center = { x: 180, y: 194 };
  return (
    <div ref={ref} className={cn(!inView && 'paused')}>
      <svg viewBox="0 0 360 330" className="mx-auto h-auto w-full max-w-[440px]" aria-hidden="true">
        {pairs.map(([a, b]) => {
          const on = a === active || b === active;
          const A = layout[a];
          const B = layout[b];
          return (
            <g key={`${a}-${b}`}>
              <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} style={{ stroke: 'rgb(var(--ink) / 0.14)', strokeWidth: 1.2 }} />
              <line
                x1={A.x}
                y1={A.y}
                x2={B.x}
                y2={B.y}
                className="flow-line"
                style={{
                  stroke: on ? 'rgb(var(--accent))' : 'rgb(var(--ink) / 0.35)',
                  strokeWidth: on ? 1.6 : 1.1,
                  transition: 'stroke 0.4s',
                }}
              />
            </g>
          );
        })}
        {systemDomains.map((d) => (
          <line
            key={`c-${d.id}`}
            x1={center.x}
            y1={center.y}
            x2={layout[d.id].x}
            y2={layout[d.id].y}
            style={{ stroke: 'rgb(var(--ink) / 0.1)', strokeWidth: 1, strokeDasharray: '2 4' }}
          />
        ))}
        <circle cx={center.x} cy={center.y} r={5} style={{ fill: 'rgb(var(--ink) / 0.5)' }} />
        <text x={center.x} y={center.y + 22} textAnchor="middle" fontSize="11" style={{ fill: 'rgb(var(--muted))' }}>
          one system
        </text>

        {systemDomains.map((d) => {
          const p = layout[d.id];
          const on = d.id === active;
          return (
            <g key={d.id} onClick={() => onSelect(d.id)} style={{ cursor: 'pointer' }}>
              {on && <circle cx={p.x} cy={p.y} r={34} style={{ fill: 'rgb(var(--accent) / 0.3)' }} className="pulse-ring" />}
              <circle
                cx={p.x}
                cy={p.y}
                r={34}
                style={{
                  fill: on ? 'rgb(var(--accent))' : 'rgb(var(--bg))',
                  stroke: on ? 'rgb(var(--accent))' : 'rgb(var(--ink) / 0.3)',
                  strokeWidth: 1.4,
                  transition: 'fill 0.35s, stroke 0.35s',
                }}
              />
              <text
                x={p.x}
                y={p.y + 4}
                textAnchor="middle"
                fontSize="12"
                fontWeight={500}
                className="font-display"
                style={{ fill: on ? 'rgb(var(--on-accent))' : 'rgb(var(--ink))', transition: 'fill 0.35s' }}
              >
                {d.short}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function Systems({ onOpenProject }) {
  const [active, setActive] = useState(systemDomains[0].id);
  const domain = systemDomains.find((d) => d.id === active) ?? systemDomains[0];
  const related = projects.filter((p) => p.domains.includes(domain.id));
  const onKey = (e, i) => {
    const n = systemDomains.length;
    let next = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % n;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + n) % n;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      setActive(systemDomains[next].id);
      document.getElementById(`sys-tab-${systemDomains[next].id}`)?.focus();
    }
  };
  return (
    <Section
      id="systems"
      kicker="Approach"
      title="How I think about systems."
      lede="Most real products need all three: intelligence to decide, infrastructure to store and serve, and real-time paths to move data. Pick a domain to see how I work in it."
      className="border-y bg-surface/60"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <div role="tablist" aria-label="Engineering domains" className="mb-8 flex flex-wrap gap-2">
            {systemDomains.map((d, i) => {
              const on = d.id === active;
              return (
                <button
                  key={d.id}
                  id={`sys-tab-${d.id}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls="sys-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(d.id)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm transition-colors',
                    on ? 'border-transparent bg-ink text-bg' : 'text-muted hover:text-ink',
                  )}
                  style={on ? undefined : { borderColor: 'var(--line-strong)' }}
                >
                  {d.name}
                </button>
              );
            })}
          </div>
          <Graph active={active} onSelect={setActive} />
        </Reveal>

        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={domain.id}
              id="sys-panel"
              role="tabpanel"
              aria-labelledby={`sys-tab-${domain.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-[clamp(1.75rem,3vw,2.4rem)]">{domain.name}</h3>
              <p className="mt-4 max-w-[58ch] text-[1.0625rem] leading-relaxed text-muted">{domain.summary}</p>

              <div className="mt-10">
                <h4 className="font-sans text-sm font-normal text-muted">Example workflow</h4>
                <ol className="mt-4 grid gap-px overflow-hidden rounded-2xl border cell-grid sm:grid-cols-5">
                  {domain.workflow.map((step, i) => (
                    <li key={step} className="flex gap-3 p-4 sm:flex-col sm:gap-2">
                      <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-[0.9375rem] leading-snug text-ink">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-10 grid gap-10 sm:grid-cols-2">
                <div>
                  <h4 className="font-sans text-sm font-normal text-muted">Concepts I lean on</h4>
                  <ul className="mt-4 space-y-2.5">
                    {domain.concepts.map((c) => (
                      <li key={c} className="text-[0.98rem] text-ink">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-sans text-sm font-normal text-muted">Technologies</h4>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {domain.technologies.map((t) => (
                      <li key={t} className="tag">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {related.length > 0 && (
                <div className="mt-10 border-t pt-6" style={{ borderColor: 'var(--line)' }}>
                  <h4 className="font-sans text-sm font-normal text-muted">Where I’ve applied it</h4>
                  <ul className="mt-3">
                    {related.map((p) => (
                      <li key={p.slug}>
                        <button
                          type="button"
                          onClick={() => onOpenProject(p.slug)}
                          className="group flex w-full items-center justify-between gap-4 border-b py-3 text-left"
                          style={{ borderColor: 'var(--line)' }}
                        >
                          <span className="font-display text-lg text-ink">{p.title}</span>
                          <span className="flex items-center gap-2 text-sm text-muted transition-colors group-hover:text-ink">
                            <span className="hidden sm:inline">{p.category}</span>
                            <ArrowUpRight
                              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              aria-hidden="true"
                            />
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
