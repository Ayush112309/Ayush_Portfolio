import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { projects } from '@/content';
import { ThemeProvider } from '@/hooks/useTheme';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/layout/BackToTop';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Experience } from '@/sections/Experience';
import { Projects } from '@/sections/Projects';
import { Systems } from '@/sections/Systems';
import { Skills } from '@/sections/Skills';
import { Education } from '@/sections/Education';
import { Leadership } from '@/sections/Leadership';
import { Contact } from '@/sections/Contact';

const ProjectModal = lazy(() => import('@/components/ProjectModal'));

const featured = projects.filter((p) => p.featured);

function ModalLoading() {
  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-black/40 backdrop-blur-sm"
      role="status"
      aria-label="Loading case study"
    >
      <Loader2 className="h-6 w-6 animate-spin text-white" />
    </div>
  );
}

/** Keeps the open project in ?project=slug so case studies can be shared by link. */
function useProjectParam() {
  const read = () => new URLSearchParams(window.location.search).get('project');
  const [slug, setSlug] = useState(read);
  useEffect(() => {
    const onPop = () => setSlug(read());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const update = useCallback((next) => {
    const url = new URL(window.location.href);
    if (next) url.searchParams.set('project', next);
    else url.searchParams.delete('project');
    window.history.replaceState(null, '', url);
    setSlug(next);
  }, []);
  return [slug, update];
}

export default function App() {
  const [slug, setSlug] = useProjectParam();
  // Warm the case-study chunk once the page is idle so the first open is instant.
  useEffect(() => {
    const load = () => void import('@/components/ProjectModal');
    const w = window;
    if (w.requestIdleCallback) w.requestIdleCallback(load);
    else window.setTimeout(load, 2000);
  }, []);
  const index = featured.findIndex((p) => p.slug === slug);
  const project = index >= 0 ? featured[index] : null;
  const open = useCallback((s) => setSlug(s), [setSlug]);
  const close = useCallback(() => setSlug(null), [setSlug]);
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <Navbar />
        <main id="main">
          <Hero />
          <About />
          <Experience onOpenProject={open} />
          <Projects onOpenProject={open} />
          <Systems onOpenProject={open} />
          <Skills />
          <Education />
          <Leadership />
          <Contact />
        </main>
        <Footer />
        <BackToTop />

        <Suspense fallback={<ModalLoading />}>
          <AnimatePresence>
            {project && (
              <ProjectModal
                key="project-modal"
                project={project}
                position={`${index + 1} / ${featured.length}`}
                onClose={close}
                onPrev={
                  featured.length > 1 ? () => setSlug(featured[(index - 1 + featured.length) % featured.length].slug) : undefined
                }
                onNext={featured.length > 1 ? () => setSlug(featured[(index + 1) % featured.length].slug) : undefined}
              />
            )}
          </AnimatePresence>
        </Suspense>
      </MotionConfig>
    </ThemeProvider>
  );
}
