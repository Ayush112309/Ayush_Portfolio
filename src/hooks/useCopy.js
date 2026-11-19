import { useCallback, useEffect, useRef, useState } from 'react';

export function useCopy(timeout = 1800) {
  const [copied, setCopied] = useState(false);
  const t = useRef();
  const copy = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      setCopied(true);
      window.clearTimeout(t.current);
      t.current = window.setTimeout(() => setCopied(false), timeout);
    },
    [timeout],
  );
  useEffect(() => () => window.clearTimeout(t.current), []);
  return { copied, copy };
}
