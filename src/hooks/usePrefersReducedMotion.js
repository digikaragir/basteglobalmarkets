import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.(QUERY).matches;

/** Live boolean — updates if the user flips the OS setting while the page is open. */
export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(prefersReducedMotion);
  useEffect(() => {
    const mq = window.matchMedia?.(QUERY);
    if (!mq) return;
    const on = () => setReduce(mq.matches);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);
  return reduce;
}

/** True when the browser runs CSS scroll-driven animations natively. */
export const supportsScrollTimeline = () =>
  typeof CSS !== 'undefined' && !!CSS.supports?.('animation-timeline: view()');
