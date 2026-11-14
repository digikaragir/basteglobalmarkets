import { useEffect, useState } from 'react';
import { subscribe } from './scrollLoop';

/** Returns the id of the section currently in view (for active nav highlighting). */
export function useScrollSpy(ids, offset = 120) {
  const [active, setActive] = useState('');

  useEffect(() => {
    return subscribe(() => {
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      // At the very bottom, highlight the last section even if it is short
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = ids[ids.length - 1];
      }
      return () => setActive(current); // React bails out when unchanged
    });
  }, [ids, offset]);

  return active;
}

/** True once the page has scrolled past `threshold` px. */
export function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(
    () =>
      subscribe(() => {
        const s = window.scrollY > threshold;
        return () => setScrolled(s);
      }),
    [threshold]
  );
  return scrolled;
}
