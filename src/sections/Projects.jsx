import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, PlayCircle } from 'lucide-react';
import { archive, projects } from '@/content';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { GitHubIcon } from '@/components/ui/Icons';
import { ProjectVisual } from '@/components/visuals/ProjectVisual';
import { cn } from '@/utils/cn';

function ProjectLinks({ project }) {
  const { github, live, video } = project.links;
  return (
    <>
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost"
          aria-label={`${project.title} source code on GitHub`}
        >
          <GitHubIcon className="h-4 w-4" />
          Code
        </a>
      )}
      {live && (
        <a href={live} target="_blank" rel="noreferrer" className="btn btn-ghost" aria-label={`${project.title} live demo`}>
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          Live demo
        </a>
      )}
      {video && (
        <a href={video} target="_blank" rel="noreferrer" className="btn btn-ghost" aria-label={`${project.title} demo video`}>
          <PlayCircle className="h-4 w-4" aria-hidden="true" />
          Demo video
        </a>
      )}
    </>
  );
}

function FeaturedProject({ project, flip, onOpen }) {
  const shownStack = project.stack.slice(0, 6);
  const more = project.stack.length - shownStack.length;
  return (
    <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14" aria-labelledby={`p-${project.slug}`}>
      <Reveal className={cn('lg:col-span-7', flip && 'lg:order-2')}>
        <motion.button
          type="button"
          onClick={onOpen}
          whileHover="hover"
          className="group relative block w-full overflow-hidden rounded-[24px] border bg-surface text-left"
          style={{ borderColor: 'var(--line)' }}
          aria-label={`Open ${project.title} case study`}
        >
          <motion.div variants={{ hover: { scale: 1.025 } }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <ProjectVisual
              kind={project.visual}
              className="aspect-[400/260] w-full"
              label={`Abstract illustration of ${project.title}`}
            />
          </motion.div>
          <span
            className="absolute left-4 top-4 rounded-full border bg-bg/80 px-3 py-1 text-xs text-muted backdrop-blur"
            style={{ borderColor: 'var(--line)' }}
          >
            {project.category}
          </span>
          <span className="absolute bottom-4 right-4 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-sm text-bg opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            Open case study
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </motion.button>
      </Reveal>

      <Reveal delay={0.08} className={cn('lg:col-span-5', flip && 'lg:order-1')}>
        {project.context && <p className="mb-3 text-sm text-muted">{project.context}</p>}
        <h3 id={`p-${project.slug}`} className="text-[clamp(1.75rem,3.2vw,2.5rem)]">
          {project.title}
        </h3>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">{project.tagline}</p>

        <ul className="mt-6 space-y-2.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink/90">
              <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
          {shownStack.map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
          {more > 0 && <li className="tag">+{more}</li>}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <button type="button" onClick={onOpen} className="btn btn-outline">
            Read case study
          </button>
          <ProjectLinks project={project} />
        </div>
      </Reveal>
    </article>
  );
}

export function Projects({ onOpenProject }) {
  const featured = projects.filter((p) => p.featured);
  return (
    <Section
      id="projects"
      kicker="Selected work"
      title="Systems I’ve designed, built and measured."
      lede="Open any project for the full case study: the problem, the architecture, the decisions behind it and the results."
    >
      <div className="space-y-24 sm:space-y-32">
        {featured.map((p, i) => (
          <FeaturedProject key={p.slug} project={p} flip={i % 2 === 1} onOpen={() => onOpenProject(p.slug)} />
        ))}
      </div>

      {archive.length > 0 && (
        <div className="mt-28 sm:mt-36">
          <Reveal>
            <h3 className="text-2xl sm:text-3xl">More experiments</h3>
            <p className="mt-3 max-w-[56ch] text-muted">
              Agents, NLP, computer vision, control systems and process engineering: smaller builds and coursework, each with its
              result.
            </p>
          </Reveal>
          <ul className="mt-10 border-t" style={{ borderColor: 'var(--line)' }}>
            {archive.map((a) => {
              const Row = (
                <div className="grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-6">
                  <p className="text-sm text-muted md:col-span-2">{a.area}</p>
                  <div className="md:col-span-6">
                    <p className="font-display text-lg text-ink">{a.title}</p>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{a.summary}</p>
                  </div>
                  <p className="font-display text-ink md:col-span-4 md:text-right">{a.result}</p>
                </div>
              );
              return (
                <li key={a.title} className="border-b" style={{ borderColor: 'var(--line)' }}>
                  {a.link ? (
                    <a href={a.link} target="_blank" rel="noreferrer" className="block transition-colors hover:bg-ink/[0.03]">
                      {Row}
                    </a>
                  ) : (
                    Row
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </Section>
  );
}
