import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, PlayCircle, X } from 'lucide-react';
import { ProjectVisual } from './visuals/ProjectVisual';
import { GitHubIcon } from './ui/Icons';

function Block({ title, children }) {
  return (
    <section className="grid gap-3 border-t py-8 md:grid-cols-[10rem_1fr] md:gap-8">
      <h3 className="font-sans text-sm font-normal text-muted">{title}</h3>
      <div>{children}</div>
    </section>
  );
}

export default function ProjectModal({ project, onClose, onPrev, onNext, position }) {
  const dialog = useRef(null);
  const closeBtn = useRef(null);
  const scroller = useRef(null);
  useEffect(() => {
    const prev = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      prev?.focus?.();
    };
  }, []);
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [project.slug]);
  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key === 'ArrowRight' && onNext && !(e.target instanceof HTMLInputElement)) onNext();
    if (e.key === 'ArrowLeft' && onPrev && !(e.target instanceof HTMLInputElement)) onPrev();
    if (e.key !== 'Tab' || !dialog.current) return;
    const focusables = dialog.current.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
  const { github, live, video } = project.links;
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onKeyDown={onKeyDown}
        initial={{ y: 40, opacity: 0, scale: 0.985 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.985 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex max-h-[94dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[28px] border bg-bg shadow-2xl sm:max-h-[90dvh] sm:rounded-[28px]"
      >
        <div className="flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-6">
          <p className="truncate text-sm text-muted">
            {project.category}
            <span className="ml-3 font-mono text-xs text-muted/70">{position}</span>
          </p>
          <div className="flex shrink-0 items-center gap-1">
            {onPrev && (
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous project"
                className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-ink/5 hover:text-ink"
              >
                <ArrowLeft className="h-[18px] w-[18px]" />
              </button>
            )}
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                aria-label="Next project"
                className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-ink/5 hover:text-ink"
              >
                <ArrowRight className="h-[18px] w-[18px]" />
              </button>
            )}
            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-ink/5 hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          className="overflow-y-auto overscroll-contain px-5 pb-10 sm:px-10"
          style={{ paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))' }}
        >
          <motion.div key={project.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="-mx-5 border-b bg-surface sm:-mx-10">
              <ProjectVisual
                kind={project.visual}
                className="mx-auto aspect-[400/200] max-h-64 w-full"
                label={`Abstract illustration of ${project.title}`}
              />
            </div>

            <header className="pb-8 pt-8">
              {project.context && <p className="mb-2 text-sm text-muted">{project.context}</p>}
              <h2 id="modal-title" className="text-[clamp(1.9rem,4vw,3rem)]">
                {project.title}
              </h2>
              <p className="mt-4 max-w-[62ch] text-[1.0625rem] leading-relaxed text-muted">{project.tagline}</p>
              {(github || live || video) && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {github && (
                    <a href={github} target="_blank" rel="noreferrer" className="btn btn-outline">
                      <GitHubIcon className="h-4 w-4" /> View code
                    </a>
                  )}
                  {live && (
                    <a href={live} target="_blank" rel="noreferrer" className="btn btn-primary">
                      <ExternalLink className="h-4 w-4" aria-hidden="true" /> Live demo
                    </a>
                  )}
                  {video && (
                    <a href={video} target="_blank" rel="noreferrer" className="btn btn-outline">
                      <PlayCircle className="h-4 w-4" aria-hidden="true" /> Demo video
                    </a>
                  )}
                </div>
              )}
            </header>

            {project.metrics.length > 0 && (
              <dl className="mb-2 flex flex-wrap overflow-hidden rounded-2xl border cell-grid">
                {project.metrics.map((m) => (
                  <div key={m.label} className={`flex min-w-[45%] flex-1 flex-col-reverse justify-end p-4 sm:p-5 ${project.metrics.length === 4 ? '' : 'sm:min-w-[30%]'}`}>
                    <dt className="mt-1 text-[0.8125rem] leading-snug text-muted">{m.label}</dt>
                    <dd className="font-display text-2xl tracking-tight sm:text-3xl">{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <Block title="Overview">
              <p className="leading-relaxed text-ink/90">{project.overview}</p>
            </Block>
            <Block title="Problem">
              <p className="leading-relaxed text-ink/90">{project.problem}</p>
            </Block>
            <Block title="Solution">
              <p className="leading-relaxed text-ink/90">{project.solution}</p>
            </Block>
            <Block title="Architecture">
              <ol className="relative space-y-0">
                {project.architecture.map((a, i) => (
                  <li key={a.name} className="relative flex gap-4 pb-5 last:pb-0">
                    {i < project.architecture.length - 1 && (
                      <span className="absolute left-[13px] top-7 h-[calc(100%-1.25rem)] w-px bg-ink/15" aria-hidden="true" />
                    )}
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border font-mono text-[0.6875rem] text-muted">
                      {i + 1}
                    </span>
                    <div className="pt-0.5">
                      <p className="font-display text-ink">{a.name}</p>
                      <p className="mt-0.5 text-[0.9375rem] leading-relaxed text-muted">{a.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Block>
            <Block title="Engineering decisions">
              <ul className="space-y-3">
                {project.decisions.map((d) => (
                  <li key={d} className="flex gap-3 leading-relaxed text-ink/90">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </Block>
            <Block title="Challenges">
              <ul className="space-y-3">
                {project.challenges.map((c) => (
                  <li key={c} className="flex gap-3 leading-relaxed text-ink/90">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink/30" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </Block>
            <Block title="Technologies">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
            </Block>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
