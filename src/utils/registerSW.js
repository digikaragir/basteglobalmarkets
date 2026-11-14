/**
 * Registers the service worker (public/sw.js) in production builds only,
 * after the page has loaded so it never competes with first paint.
 * In development it is skipped so Vite hot-reload is never served stale files.
 */
export function registerSW() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      /* offline support is a bonus; the site works without it */
    });
  });
}
