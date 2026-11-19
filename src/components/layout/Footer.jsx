import { activeLinks, personal } from '@/content';
import { SocialIcon } from '../ui/SocialIcon';

export function Footer() {
  return (
    <footer className="border-t py-10" style={{ borderColor: 'var(--line)' }}>
      <div className="page flex flex-col items-start justify-between gap-6 text-sm text-muted sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {personal.name}. Designed and built from scratch.
        </p>
        <ul className="flex items-center gap-1">
          {activeLinks.map((l) => (
            <li key={l.id}>
              <a
                href={l.href}
                target={l.id === 'email' ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={l.label}
                className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-ink/5 hover:text-ink"
              >
                <SocialIcon id={l.id} className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
