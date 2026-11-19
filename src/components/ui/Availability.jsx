import { personal } from '@/content';

const tone = {
  open: 'bg-accent',
  limited: 'bg-amber-400',
  closed: 'bg-muted',
};

export function Availability() {
  const a = personal.availability;
  if (!a.show) return null;
  return (
    <p
      className="inline-flex items-center gap-2.5 rounded-full border py-1.5 pl-3 pr-4 text-sm text-muted"
      style={{ borderColor: 'var(--line)' }}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {a.status === 'open' && <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />}
        <span className={`relative h-2 w-2 rounded-full ${tone[a.status]}`} />
      </span>
      {a.text}
    </p>
  );
}
