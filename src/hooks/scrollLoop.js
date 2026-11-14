/**
 * One shared, passive, rAF-throttled scroll/resize loop for the whole site.
 *
 * subscribe(read) — `read` runs once per frame while scrolling. It should only
 * READ layout (getBoundingClientRect, scrollY…) and may return a `write`
 * function that applies styles. All reads run before all writes, so the page
 * never thrashes layout no matter how many effects are subscribed.
 */
const subs = new Set();
let raf = 0;
let bound = false;

function frame() {
  raf = 0;
  const writes = [];
  subs.forEach((read) => {
    const w = read();
    if (typeof w === 'function') writes.push(w);
  });
  writes.forEach((w) => w());
}

function schedule() {
  if (!raf) raf = requestAnimationFrame(frame);
}

export function subscribe(read) {
  subs.add(read);
  if (!bound) {
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    bound = true;
  }
  schedule();
  return () => {
    subs.delete(read);
    if (!subs.size && bound) {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(raf);
      raf = 0;
      bound = false;
    }
  };
}

export const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
