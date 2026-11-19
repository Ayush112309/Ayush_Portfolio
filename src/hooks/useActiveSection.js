import { useEffect, useState } from 'react';

/** Returns the id of the nav section currently crossing the middle of the viewport. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] ?? '');
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((e) => !!e);
    if (!els.length) return;
    const onScroll = () => {
      const mid = window.innerHeight * 0.4;
      let current = ids[0];
      for (const el of els) {
        if (el.getBoundingClientRect().top <= mid) current = el.id;
      }
      // At the very bottom, the last section is active.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = els[els.length - 1].id;
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);
  return active;
}
