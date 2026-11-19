import { Check, Copy } from 'lucide-react';
import { useCopy } from '@/hooks/useCopy';
import { cn } from '@/utils/cn';

export function CopyEmail({ email, className }) {
  const { copied, copy } = useCopy();
  return (
    <button
      type="button"
      onClick={() => copy(email)}
      className={cn('btn btn-outline h-10 px-4 text-sm', className)}
      aria-label={copied ? 'Email address copied' : `Copy email address ${email}`}
    >
      {copied ? <Check className="h-4 w-4 text-accent" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
    </button>
  );
}
