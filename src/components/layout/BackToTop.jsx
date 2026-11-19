import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrolled } from '@/hooks/useScrolled';

export function BackToTop() {
  const show = useScrolled(900);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#home"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border bg-bg/80 text-muted shadow-lg backdrop-blur transition-colors hover:text-ink sm:bottom-8 sm:right-8"
          style={{ borderColor: 'var(--line)', marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <ArrowUp className="h-[18px] w-[18px]" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
