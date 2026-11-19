import { leadership } from '@/content';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

/** A quiet line drawing of a football pitch, the one non-technical motif on the page. */
function Pitch() {
  const s = { fill: 'none', stroke: 'rgb(var(--ink) / 0.16)', strokeWidth: 1.2 };
  return (
    <svg viewBox="0 0 300 200" className="h-auto w-full" aria-hidden="true">
      <rect x={6} y={6} width={288} height={188} rx={4} style={s} />
      <line x1={150} y1={6} x2={150} y2={194} style={s} />
      <circle cx={150} cy={100} r={28} style={s} />
      <rect x={6} y={56} width={40} height={88} style={s} />
      <rect x={254} y={56} width={40} height={88} style={s} />
      <rect x={6} y={78} width={14} height={44} style={s} />
      <rect x={280} y={78} width={14} height={44} style={s} />
      <path
        d="M70 150 C 110 120, 150 140, 190 90 S 240 70, 262 100"
        style={{ fill: 'none', stroke: 'rgb(var(--accent))', strokeWidth: 1.5, strokeDasharray: '3 5' }}
        className="flow-line"
      />
      <circle cx={262} cy={100} r={4} style={{ fill: 'rgb(var(--accent))' }} />
    </svg>
  );
}

export function Leadership() {
  const l = leadership;
  return (
    <Section id="leadership" kicker="Beyond code" title="Leadership on the pitch, and off it.">
      <div className="grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="font-display text-[clamp(1.35rem,2.2vw,1.7rem)] leading-snug tracking-tight text-ink">{l.intro}</p>
          <div className="mt-10 max-w-sm">
            <Pitch />
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-b pb-10">
              {l.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse justify-end">
                  <dt className="mt-1 max-w-[22ch] text-sm leading-snug text-muted">{s.label}</dt>
                  <dd className="font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-none tracking-tight">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <ol className="mt-4">
            {l.roles.map((r) => (
              <li key={r.title + r.org}>
                <Reveal className="grid gap-1 border-b py-5 sm:grid-cols-[1fr_auto] sm:gap-6">
                  <div>
                    <p className="font-display text-[1.0625rem] text-ink">{r.title}</p>
                    <p className="text-sm text-muted">{r.org}</p>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{r.detail}</p>
                  </div>
                  <p className="order-first text-sm text-muted sm:order-none sm:text-right">{r.period}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-20 grid overflow-hidden rounded-3xl border cell-grid md:grid-cols-3">
        {l.principles.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06} className="p-7 sm:p-8">
            <h3 className="text-xl">{p.title}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{p.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
