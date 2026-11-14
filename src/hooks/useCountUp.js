import { useEffect, useState } from 'react';
import { prefersReducedMotion } from './usePrefersReducedMotion';

/** Counts 0 → `end` (ease-out) once `start` is true. Reduced motion shows the final value immediately. */
export function useCountUp(end, start, duration = 1100) {
  const [value, setValue] = useState(() => (prefersReducedMotion() ? end : 0));

  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setValue(end);
      return;
    }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / duration);
      setValue(Math.round(end * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, start, duration]);

  return value;
}
