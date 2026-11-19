import { personal } from '@/content';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

/** Three overlapping circles: where the disciplines meet. */
function Disciplines({ labels }) {
  const pos = [
    { cx: 120, cy: 112, tx: 70, ty: 52, anchor: 'middle' },
    { cx: 200, cy: 112, tx: 250, ty: 52, anchor: 'middle' },
    { cx: 160, cy: 180, tx: 160, ty: 268, anchor: 'middle' },
  ];
  return (
    <svg
      viewBox="0 0 320 280"
      className="h-auto w-full max-w-[340px]"
      role="img"
      aria-label={`Venn diagram of ${labels.join(', ')}`}
    >
      {pos.map((p, i) => (
        <circle
          key={i}
          cx={p.cx}
          cy={p.cy}
          r={66}
          style={{ fill: 'rgb(var(--ink) / 0.03)', stroke: 'rgb(var(--ink) / 0.28)', strokeWidth: 1.2 }}
        />
      ))}
      <circle cx={160} cy={136} r={9} style={{ fill: 'rgb(var(--accent))' }} />
      <circle cx={160} cy={136} r={9} style={{ fill: 'rgb(var(--accent) / 0.4)' }} className="pulse-ring" />
      {labels.slice(0, 3).map((l, i) => (
        <text
          key={l}
          x={pos[i].tx}
          y={pos[i].ty}
          textAnchor={pos[i].anchor}
          fontSize="12"
          className="font-sans"
          style={{ fill: 'rgb(var(--muted))' }}
        >
          {l}
        </text>
      ))}
    </svg>
  );
}

export function About() {
  const { about } = personal;
  return (
    <Section id="about" kicker="About" title={about.statement}>
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="hidden lg:col-span-3 lg:block">
          <Reveal className="sticky top-28">
            <Disciplines labels={about.disciplines} />
          </Reveal>
        </div>
        <div className="lg:col-span-9">
          <div className="grid gap-12 md:grid-cols-2 md:gap-10">
            <Reveal className="space-y-5 text-[1.0625rem] leading-[1.75] text-muted">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <div className="pt-4 lg:hidden">
                <Disciplines labels={about.disciplines} />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="divide-y border-y" style={{ borderColor: 'var(--line)' }}>
                {about.facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-[6.5rem_1fr] gap-4 py-4" style={{ borderColor: 'var(--line)' }}>
                    <dt className="text-sm text-muted">{f.label}</dt>
                    <dd className="text-[0.9375rem] text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
