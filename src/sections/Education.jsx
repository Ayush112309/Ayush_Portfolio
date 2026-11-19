import { education } from '@/content';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

export function Education() {
  const e = education;
  return (
    <Section id="education" kicker="Education" title="Engineering fundamentals, from two directions.">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="text-sm text-muted">
            {e.start} – {e.end}
          </p>
          <h3 className="mt-3 text-[clamp(1.6rem,2.8vw,2.2rem)]">{e.institution}</h3>
          <p className="mt-2 text-lg text-muted">{e.degree}</p>
          <div className="mt-8 inline-flex items-baseline gap-3 rounded-2xl border px-5 py-4">
            <span className="font-display text-4xl tracking-tight">{e.score}</span>
            <span className="text-sm text-muted">{e.scoreLabel}</span>
          </div>

          {e.earlier.length > 0 && (
            <ul className="mt-10 space-y-4 border-t pt-6">
              {e.earlier.map((s) => (
                <li key={s.title} className="flex items-baseline justify-between gap-6 text-[0.9375rem]">
                  <span>
                    <span className="block text-ink">{s.title}</span>
                    <span className="block text-sm text-muted">
                      {s.school}, {s.year}
                    </span>
                  </span>
                  <span className="font-display text-ink">{s.score}</span>
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <h4 className="font-sans text-sm font-normal text-muted">Relevant coursework</h4>
          <div className="mt-4 divide-y border-y">
            {e.coursework.map((g) => (
              <div key={g.group} className="grid gap-3 py-5 sm:grid-cols-[11rem_1fr]">
                <p className="text-sm text-muted">{g.group}</p>
                <ul className="flex flex-wrap gap-x-2 gap-y-2">
                  {g.courses.map((c) => (
                    <li key={c} className="rounded-full border px-3 py-1 text-[0.9375rem] text-ink">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
