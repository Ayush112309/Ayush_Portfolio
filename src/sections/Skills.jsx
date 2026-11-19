import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { skillCategories } from '@/content';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/utils/cn';

export function Skills() {
  const [active, setActive] = useState(skillCategories[0]?.id ?? '');
  const cat = skillCategories.find((c) => c.id === active) ?? skillCategories[0];
  if (!cat) return null;
  const onKey = (e, i) => {
    const n = skillCategories.length;
    let next = -1;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % n;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + n) % n;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      setActive(skillCategories[next].id);
      document.getElementById(`skill-tab-${skillCategories[next].id}`)?.focus();
    }
  };
  return (
    <Section
      id="skills"
      kicker="Skills"
      title="A toolkit organised by the problems it solves."
      lede="Grouped by discipline, with where each tool was actually used."
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="min-w-0 lg:col-span-4">
          <div
            role="tablist"
            aria-label="Skill categories"
            aria-orientation="vertical"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t"
          >
            {skillCategories.map((c, i) => {
              const on = c.id === cat.id;
              return (
                <button
                  key={c.id}
                  id={`skill-tab-${c.id}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls="skill-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(c.id)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cn(
                    'group relative shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors',
                    'lg:flex lg:items-center lg:justify-between lg:rounded-none lg:border-0 lg:border-b lg:px-0 lg:py-4 lg:text-left lg:text-[1.0625rem]',
                    on ? 'bg-ink text-bg lg:bg-transparent lg:text-ink' : 'text-muted hover:text-ink',
                  )}
                >
                  <span className="lg:font-display">{c.title}</span>
                  <span className="hidden items-center gap-3 lg:flex">
                    <span className="font-mono text-xs text-muted">{c.skills.length}</span>
                    <span
                      className={cn('h-1.5 w-1.5 rounded-full transition-colors', on ? 'bg-accent' : 'bg-transparent')}
                      aria-hidden="true"
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="min-w-0 lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={cat.id}
              id="skill-panel"
              role="tabpanel"
              aria-labelledby={`skill-tab-${cat.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="max-w-[56ch] text-[1.0625rem] text-muted">{cat.blurb}</p>
              <ul className="mt-8 grid overflow-hidden rounded-2xl border cell-grid sm:grid-cols-2 xl:grid-cols-3">
                {cat.skills.map((s, i) => (
                  <motion.li
                    key={s.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.025 }}
                    className="group relative px-5 py-5 transition-colors hover:bg-ink/[0.03]"
                  >
                    <span
                      className="absolute right-4 top-5 h-1.5 w-1.5 rounded-full bg-accent opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                    <p className="font-display text-[1.0625rem] text-ink">{s.name}</p>
                    {s.usedIn && <p className="mt-1 text-[0.8125rem] leading-snug text-muted">{s.usedIn}</p>}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
