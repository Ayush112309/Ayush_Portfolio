import { cn } from '@/utils/cn';
import { Reveal } from './Reveal';

/** Standard section shell: a rule, a heading block, then content. */
export function Section({ id, title, lede, children, className, kicker }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn('relative py-24 sm:py-32', className)}>
      <div className="page">
        <Reveal className="mb-12 grid gap-6 border-t pt-8 sm:mb-16 lg:grid-cols-12" style={{ borderColor: 'var(--line)' }}>
          <p className="text-sm text-muted lg:col-span-3">{kicker}</p>
          <div className="lg:col-span-9">
            <h2 id={`${id}-title`} className="max-w-[20ch] text-[clamp(2rem,4.6vw,3.6rem)]">
              {title}
            </h2>
            {lede && <p className="mt-5 max-w-[60ch] text-[1.0625rem] text-muted">{lede}</p>}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
