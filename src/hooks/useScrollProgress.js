import { useEffect, useRef } from 'react';
import { subscribe, clamp01 } from './scrollLoop';
import { prefersReducedMotion, supportsScrollTimeline } from './usePrefersReducedMotion';

/**
 * JS fallback for CSS scroll-driven animations. Writes the element's scroll
 * progress (0 → 1) to a CSS variable on the element itself: no React state,
 * no re-renders.
 *
 * mode 'through': 0 when the element's top enters the bottom of the viewport,
 *                 1 when its bottom leaves the top.
 * mode 'exit':    0 while the element's top is at/below the viewport top,
 *                 1 once the element has scrolled fully out the top.
 *
 * Does nothing when the browser supports `animation-timeline` natively
 * (CSS handles it) or when the user prefers reduced motion. While active it
 * adds `.has-js-progress` so CSS can opt into the var-driven transforms.
 */
export function useScrollProgress({ mode = 'through', prop = '--p' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || supportsScrollTimeline()) return;
    el.classList.add('has-js-progress');
    let last = -1;
    const off = subscribe(() => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -vh || r.top > vh * 2) return; // far offscreen: skip the write
      const p =
        mode === 'exit'
          ? clamp01(-r.top / Math.max(1, r.height))
          : clamp01((vh - r.top) / (vh + r.height));
      const rounded = Math.round(p * 1000) / 1000;
      if (rounded === last) return;
      last = rounded;
      return () => el.style.setProperty(prop, rounded);
    });
    return () => {
      off();
      el.classList.remove('has-js-progress');
    };
  }, [mode, prop]);

  return ref;
}
