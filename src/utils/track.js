/**
 * Provider-agnostic event tracking. Does NOTHING until you add an analytics
 * script to index.html. Once you do, events flow automatically:
 *
 *   Plausible (cookieless):  <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
 *   Google Analytics 4:      the standard gtag.js snippet (needs a cookie banner + Privacy Policy update)
 *
 * Every link/button with a `data-cta="…"` attribute is tracked on click
 * (see initCtaTracking), e.g. "whatsapp-hero", "call-contact", "whatsapp-course-options-mastery".
 */
export function track(event, props = {}) {
  try {
    if (typeof window.plausible === 'function') window.plausible(event, { props });
    else if (typeof window.gtag === 'function') window.gtag('event', event, props);
    if (import.meta.env.DEV) console.debug('[track]', event, props); // eslint-disable-line no-console
  } catch {
    /* analytics must never break the page */
  }
}

/** One delegated listener for every [data-cta] element on the page. */
export function initCtaTracking() {
  document.addEventListener(
    'click',
    (e) => {
      const el = e.target.closest?.('[data-cta]');
      if (el) track('cta-click', { cta: el.dataset.cta });
    },
    { capture: true, passive: true }
  );
}
