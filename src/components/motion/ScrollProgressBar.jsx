import { useEffect, useRef } from 'react';
import { subscribe, clamp01 } from '../../hooks/scrollLoop';
import { prefersReducedMotion, supportsScrollTimeline } from '../../hooks/usePrefersReducedMotion';
import './ScrollProgressBar.css';

/**
 * 2px page-progress bar fixed to the very top.
 * Native: CSS `animation-timeline: scroll(root)` (zero JS per frame).
 * Fallback: the shared rAF scroll loop sets scaleX directly.
 */
export default function ScrollProgressBar() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || (supportsScrollTimeline() && !prefersReducedMotion())) return;
    el.classList.add('is-js');
    return subscribe(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? clamp01(window.scrollY / max) : 0;
      return () => { el.style.transform = `scaleX(${p})`; };
    });
  }, []);

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
