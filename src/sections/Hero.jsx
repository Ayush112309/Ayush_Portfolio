import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { activeLinks, personal } from '@/content';
import { primaryResume } from '@/utils/resume';
import { Availability } from '@/components/ui/Availability';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { HeroVisual } from '@/components/visuals/HeroVisual';

const ease = [0.22, 1, 0.36, 1];

export function Hero() {
  const { hero } = personal;
  const external = activeLinks.filter((l) => l.id !== 'email');
  return (
    <section id="home" aria-label="Introduction" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="page">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
          <Availability />
        </motion.div>

        <h1 className="mt-8 text-[clamp(2.5rem,5.6vw,5rem)] font-medium leading-[1] tracking-[-0.045em]">
          {hero.headline.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.1em]">
              <motion.span
                className={i === 0 ? 'block' : 'block text-muted'}
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid items-start gap-14 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <motion.div
            className="lg:col-span-6 lg:pt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease }}
          >
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-[1.0625rem] text-ink" aria-label="Roles">
              {hero.roles.map((r, i) => (
                <li key={r} className="flex items-center gap-4">
                  {i > 0 && <span className="hidden h-3.5 w-px bg-ink/25 sm:block" aria-hidden="true" />}
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-[44ch] text-[1.0625rem] leading-relaxed text-muted sm:text-lg">{hero.intro}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn btn-primary">
                View projects
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
              {primaryResume && (
                <a href={primaryResume.file} download className="btn btn-outline">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download resume
                </a>
              )}
              <a href="#contact" className="btn btn-ghost">
                Let’s connect
              </a>
            </div>
            {external.length > 0 && (
              <ul className="mt-6 flex items-center gap-1" aria-label="Profiles">
                {external.map((l) => (
                  <li key={l.id}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${l.label} (opens in a new tab)`}
                      className="-ml-2 flex h-10 items-center gap-2 rounded-full px-3 text-sm text-muted transition-colors hover:bg-ink/5 hover:text-ink"
                    >
                      <SocialIcon id={l.id} />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.35, ease }}
          >
            <div className="lg:ml-auto lg:max-w-[600px]">
              <HeroVisual />
            </div>
          </motion.div>
        </div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 border-t sm:mt-24 lg:grid-cols-4"
          style={{ borderColor: 'var(--line)' }}
        >
          {hero.proof.map((m, i) => (
            <div
              key={m.label}
              className={`border-b py-6 pr-4 lg:border-b-0 ${i % 2 === 1 ? 'pl-5 border-l' : ''} ${i > 0 ? 'lg:border-l lg:pl-6' : ''}`}
              style={{ borderColor: 'var(--line)' }}
            >
              <dt className="sr-only">{m.label}</dt>
              <dd className="font-display text-[1.75rem] font-medium tracking-tight sm:text-3xl">{m.value}</dd>
              <dd className="mt-1 max-w-[24ch] text-sm leading-snug text-muted">{m.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
