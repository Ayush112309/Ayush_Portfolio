import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { experience, projects } from '@/content';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

export function Experience({ onOpenProject }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <Section
      id="experience"
      kicker="Experience"
      title="Where the systems met real hardware."
      lede="Industry work, newest first. Every figure here is measured, not estimated."
    >
      <ol ref={ref} className="relative">
        {/* timeline rail */}
        <div className="absolute bottom-0 left-[5px] top-2 w-px bg-ink/10 lg:left-[calc(25%-1px)]" aria-hidden="true">
          <motion.div className="h-full w-full origin-top bg-accent" style={{ scaleY }} />
        </div>

        {experience.map((job) => {
          const related = projects.find((p) => p.slug === job.relatedProject);
          return (
            <li key={job.id} className="relative grid gap-6 pb-4 pl-8 lg:grid-cols-4 lg:gap-0 lg:pl-0">
              <span
                className="absolute left-0 top-2 h-[11px] w-[11px] rounded-full border-2 border-accent bg-bg lg:left-[calc(25%-6px)]"
                aria-hidden="true"
              />
              <Reveal className="lg:pr-10">
                <p className="font-display text-lg text-ink">
                  {job.start} – {job.end}
                </p>
                <p className="mt-1 text-sm text-muted">{job.location}</p>
              </Reveal>

              <Reveal delay={0.08} className="lg:col-span-3 lg:pl-12">
                <h3 className="text-[clamp(1.6rem,3vw,2.25rem)]">{job.role}</h3>
                <p className="mt-2 text-lg text-muted">{job.company}</p>
                <p className="mt-6 max-w-[62ch] text-[1.0625rem] leading-relaxed text-ink/90">{job.summary}</p>

                <dl
                  className="mt-8 grid grid-cols-2 overflow-hidden rounded-2xl border cell-grid sm:grid-cols-4"
                  style={{ borderColor: 'var(--line)' }}
                >
                  {job.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col-reverse justify-end p-4">
                      <dt className="mt-0.5 text-[0.8125rem] text-muted">{m.label}</dt>
                      <dd className="font-display text-2xl tracking-tight">{m.value}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-8 space-y-3.5">
                  {job.highlights.map((h) => (
                    <li key={h.slice(0, 32)} className="flex gap-4 text-[0.98rem] leading-relaxed text-muted">
                      <span className="mt-[0.7em] h-px w-4 shrink-0 bg-ink/30" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies">
                  {job.stack.map((s) => (
                    <li key={s} className="tag">
                      {s}
                    </li>
                  ))}
                </ul>

                {related && (
                  <button type="button" onClick={() => onOpenProject(related.slug)} className="btn btn-outline mt-9">
                    Read the {related.title} case study
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
