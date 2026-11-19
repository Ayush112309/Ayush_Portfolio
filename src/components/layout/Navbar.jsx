import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { activeLinks, personal, siteConfig } from '@/content';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/utils/cn';
import { ThemeToggle } from '../ui/ThemeToggle';
import { SocialIcon } from '../ui/SocialIcon';

const ids = siteConfig.nav.map((n) => n.id);

export function Navbar() {
  const active = useActiveSection(ids);
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const menuBtn = useRef(null);
  const firstLink = useRef(null);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    firstLink.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const close = () => mq.matches && setOpen(false);
    mq.addEventListener('change', close);
    return () => mq.removeEventListener('change', close);
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          'mx-auto flex h-14 max-w-page items-center justify-between rounded-full border pl-2 pr-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300',
          scrolled || open
            ? 'border-[color:var(--line)] bg-bg/75 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        )}
      >
        <a
          href="#home"
          className="group flex items-center gap-3 rounded-full py-1 pl-1 pr-3"
          aria-label={`${personal.shortName}, back to top`}
          onClick={() => setOpen(false)}
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink font-display text-[0.8125rem] font-semibold tracking-tight text-bg transition-transform duration-300 group-hover:rotate-[-8deg]">
            {personal.monogram}
          </span>
          <span className="hidden font-display text-[0.9375rem] font-medium tracking-tight sm:inline">{personal.shortName}</span>
        </a>

        <ul className="hidden items-center gap-0.5 md:flex">
          {siteConfig.nav.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative z-10 block rounded-full px-3.5 py-1.5 text-sm transition-colors',
                    isActive ? 'text-ink' : 'text-muted hover:text-ink',
                  )}
                >
                  {item.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-ink/[0.07]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  >
                    <span className="absolute -bottom-[3px] left-1/2 h-[3px] w-3 -translate-x-1/2 rounded-full bg-accent" />
                  </motion.span>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            ref={menuBtn}
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-ink/5 hover:text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-w-page overflow-hidden rounded-3xl border bg-bg/95 p-3 backdrop-blur-xl md:hidden"
            style={{ borderColor: 'var(--line)' }}
          >
            <ul>
              {siteConfig.nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                >
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center justify-between rounded-2xl px-4 py-3 font-display text-2xl tracking-tight',
                      active === item.id ? 'text-ink' : 'text-muted',
                    )}
                  >
                    {item.label}
                    {active === item.id && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-2 flex gap-2 border-t px-2 pt-3" style={{ borderColor: 'var(--line)' }}>
              {activeLinks.map((l) => (
                <a
                  key={l.id}
                  href={l.href}
                  target={l.id === 'email' ? undefined : '_blank'}
                  rel="noreferrer"
                  aria-label={l.label}
                  className="grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-ink/5 hover:text-ink"
                >
                  <SocialIcon id={l.id} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
