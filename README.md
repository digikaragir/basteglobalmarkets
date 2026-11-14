# Baste Global Markets

The website for **Baste Global Markets** (Forex · Commodities · Indian F&O): trading **education** from an active desk, courses and 1-on-1 mentorship by Somnath Baste. Built with React and Vite. No UI kits or animation libraries; all motion is native CSS plus IntersectionObserver and requestAnimationFrame. It installs as an app on phones and computers (PWA).

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → /dist
npm run preview    # serve the production build on http://localhost:4173
```

See `requirements.txt` for system requirements and deployment notes.

## ⚠ Compliance — read this first

Baste Global Markets is **not registered with SEBI** as an Investment Adviser or Research Analyst. The site is written as education only. When editing copy:

- Never use "advisory", "tips", "calls", "signals", "targets", "sure-shot", or return/profit claims.
- Don't add live or recent market prices (the ticker deliberately shows markets, not prices).
- Don't add testimonials or result screenshots without checking with a compliance professional.
- Forex: only refer to exchange-traded currency derivatives (NSE/BSE). Never link to offshore brokers.

The legal pages (`/disclaimer/`, `/privacy/`, `/terms/`) are written to match what the site does today. **Have a lawyer review them**, and update them if you add analytics, forms or payments.

## Before you deploy

1. **Domain** — it is a placeholder. Set it in `vite.config.js` (`VITE_SITE_URL`, or define it in your host's environment variables), `public/robots.txt` and `public/sitemap.xml`.
2. **HTTPS** — the installable app and offline mode only work over HTTPS (all major static hosts provide it).
3. **Don't cache `sw.js` long-term** — serve `/sw.js` with `Cache-Control: no-cache` so app updates reach users (Netlify and Vercel do this by default for non-hashed files; check other hosts).

## Project structure

```
baste-global-markets/
├── index.html                  # Home page shell: SEO, Open Graph, JSON-LD, PWA tags
├── disclaimer/ privacy/ terms/ # index.html shells for the three legal pages
├── vite.config.js              # ★ Site URL (VITE_SITE_URL) + multi-page build inputs
├── public/
│   ├── manifest.webmanifest    # ★ App name, colours, icons, shortcuts
│   ├── sw.js                   # Service worker (offline support) — bump VERSION when changing it
│   ├── icons/                  # 192, 512 and maskable 512 app icons
│   ├── screenshots/            # Shown in the install dialog (Chrome / Android)
│   ├── og-image.png            # 1200×630 link-preview card (WhatsApp, LinkedIn, X…)
│   ├── cursors/                # Red cursor (SVG + PNG fallback)
│   ├── apple-touch-icon.png, favicon.svg, robots.txt, sitemap.xml
└── src/
    ├── main.jsx                # Home entry: install listeners, service worker, click tracking
    ├── legal.jsx               # Legal pages entry
    ├── App.jsx                 # Home page section order
    ├── config/site.js          # ★ Phone, WhatsApp number, WhatsApp message template, nav links
    ├── data/content.js         # ★ All home page text (incl. About, FAQ, disclosure band)
    ├── data/legal.js           # ★ Disclaimer, Privacy and Terms text
    ├── styles/global.css       # ★ Design tokens (colour, type, spacing, cursors), reset
    ├── styles/motion.css       # ★ Motion tokens (durations, easing, distances), reduced-motion
    ├── utils/track.js          # Click tracking (inactive until you add an analytics script)
    ├── utils/registerSW.js     # Registers the service worker (production only)
    ├── hooks/                  # scrollLoop, useReveal, useScrollProgress, useScrollSpy,
    │                           # useCountUp, usePrefersReducedMotion, useInstallPrompt
    └── components/
        ├── layout/             # Navbar, Footer, Disclosure band, FloatingWhatsApp
        ├── sections/           # Hero, Ticker, Markets, Stats, Classroom, About, Courses, Faq, Contact
        ├── charts/             # LessonChart (TradingView Lightweight Charts, lazy-loaded)
        ├── legal/              # LegalPage (shared layout for the 3 legal pages)
        ├── pwa/                # InstallButton (+ iPhone "Add to Home Screen" guide)
        ├── motion/             # Reveal, CountUp, ScrollProgressBar
        └── ui/                 # Button, SectionHeader, Icons, MarketVisual
```

Every component has its own `.css` file next to it.

## How to edit content

| Want to change… | Edit |
|---|---|
| Phone / WhatsApp number | `src/config/site.js` |
| WhatsApp pre-filled message format | `waMessage()` in `src/config/site.js` |
| Any headline or paragraph | `src/data/content.js` |
| Founder photo / years of experience | `ABOUT.photo` (put the image in `public/`) and `ABOUT.experienceYears` in `content.js` |
| "Next batch starts …" line | `COURSES_SECTION.nextBatch` in `content.js` (empty = hidden) |
| Add / remove a course | `COURSES` array in `content.js` |
| FAQ questions & answers | `FAQ` array in `content.js` (keep answers factual) |
| Disclosure band above the footer | `DISCLOSURE` in `content.js` |
| Disclaimer / Privacy / Terms | `src/data/legal.js` (update `UPDATED` date) |
| Markets marquee | `TICKER` array in `content.js` (no prices) |
| Classroom chart lessons (tabs + notes) | `CLASSROOM_SECTION` and `LESSONS` in `content.js` |
| Classroom chart data (synthetic) | `src/utils/syntheticSeries.js` |
| Stats strip (keep it factual) | `STATS` array in `content.js` |
| App name, icon, colours | `public/manifest.webmanifest`, `public/icons/` |
| Colours, fonts, type scale, spacing, cursor | `:root` tokens in `src/styles/global.css` |
| Animation speed / distance / easing | `:root` tokens in `src/styles/motion.css` |
| Section order | `src/App.jsx` |
| Domain for SEO tags | `vite.config.js`, `public/robots.txt`, `public/sitemap.xml` |

## WhatsApp messages

Every WhatsApp button sends the same structured message, built by `waMessage()` in `src/config/site.js`:

```
Hello Somnath,

*Enquiry:* Options Mastery course (Intermediate · 6 weeks)

*Name:*
*City:*
*Trading experience:* Beginner / Intermediate / Advanced

_Sent from the Baste Global Markets website · Courses_
```

The enquiry line changes per button (each course, "which course fits me?", general), and the last line tells you which part of the site the person came from. The "Not sure where to start?" link adds `START` at the top.

## Installable app (PWA)

- **Android / Chrome / Edge (phone or computer):** an **Install app** button appears in the navbar, the mobile menu and the footer whenever the browser allows installing. It opens the browser's own install dialog.
- **iPhone / iPad (Safari):** Apple has no install prompt, so the button opens a two-step "Share → Add to Home Screen" guide.
- **Already installed:** the button hides itself.
- **Offline:** pages you've visited open without a connection (`public/sw.js`). WhatsApp and calls still need a connection.
- The service worker only runs in production builds (`npm run build` / `npm run preview`), never in `npm run dev`.

## Classroom chart

The "Inside the classroom" section uses [TradingView Lightweight Charts™](https://www.tradingview.com/lightweight-charts/) (`lightweight-charts`, Apache-2.0, pinned to 5.2.1), the only runtime dependency besides React.

- **Synthetic data only.** `src/utils/syntheticSeries.js` generates a fixed practice path (range → breakout → retest → trend). No real instrument, no dates (time axis hidden). Do not swap in real or recent market data: the site is not SEBI-registered.
- **Market cards 01–04** also use it (`components/ui/MarketVisual.jsx`): candlesticks (Forex), gold area (Commodities), index-day baseline (Indian F&O) and learning-step bars (Academy). Synthetic data from `buildCardSeries()` in `syntheticSeries.js`; each card is tagged "Illustrative"; charts draw in once and never tick like live prices. Interaction is off on these small charts so they never block page scrolling.
- **Three lessons** (Structure / Trend / Risk first) toggle price lines, EMAs and markers on the same chart. Text lives in `LESSONS` in `content.js`; overlays live in `components/charts/LessonChart.jsx`.
- **Performance.** The library loads in its own file (~64 KB gzip) only when the section is about to scroll into view.
- **Behaviour.** Mouse-wheel zoom is off so the chart never traps page scrolling; drag and pinch still work.
- **Attribution.** Keep the small TradingView logo on the chart and the "Charts by TradingView Lightweight Charts™" credit line: the licence requires attribution.

## Analytics (optional)

Click tracking is built in but **does nothing** until you add an analytics script to the HTML files. Every button has a `data-cta` name (e.g. `whatsapp-hero`, `whatsapp-course-options-mastery`, `call-contact`, `install-click`). Plausible (cookieless) is recommended. If you add Google Analytics you will need a cookie banner and an updated Privacy Policy. See `src/utils/track.js`.

## Motion: what moves and how to tune it

| Where | Effect | Tune in |
|---|---|---|
| Global | Fade-up reveal on enter | `--dur`, `--reveal-y`, `--ease` in `motion.css` |
| Top of page | 2px green scroll-progress bar | `motion/ScrollProgressBar.css` |
| Navbar | Blur after 12px, scroll-spy underline, pulsing live dot, staggered mobile menu (60ms) | `layout/Navbar.css` |
| Hero | Load-in sequence with mask-reveal headline | `--hero-step`, `--hero-dur` in `motion.css` |
| Hero | "BASTE" watermark parallax (max 60px) + fade | `.hero__watermark` in `Hero.css` |
| Hero | Mouse-follow glow (desktop only) | `GLOW_LERP`, `GLOW_MAX` in `Hero.jsx` |
| Ticker | Markets marquee (pauses on hover/focus) | `Ticker.css` (45s loop) |
| Markets | Card stagger; chart drift ±20px + scale 1.04→1; each TradingView chart draws in once (candles, gold area, index baseline, academy bars) | `DRAW_MS` in `ui/MarketVisual.jsx`, `MarketVisual.css` |
| Markets | "taught" underline draws in | `.u-draw` in `SectionHeader.css` |
| Stats | Count-up when visible | `duration` in `hooks/useCountUp.js` |
| About | Principles reveal one by one | `About.css` |
| Courses | Checklist ticks in one by one (40ms) | `Courses.css` |
| FAQ | Items stagger in; answer fades in on open | `Faq.css` |
| Contact | Detail rows reveal one by one | `Contact.css` |
| WhatsApp button | Appears after 500px, hides while Contact is on screen | `FloatingWhatsApp.jsx` |

Scroll-linked effects use native CSS `animation-timeline` where the browser supports it, with a rAF fallback that writes a `--p` CSS variable (no React re-renders). Only `transform` and `opacity` are animated.

**Reduced motion:** with the OS "reduce motion" setting on, parallax, the marquee (the ticker becomes swipeable), the mouse glow, count-ups and reveals are all turned off and every element shows in its final state. Without IntersectionObserver, everything is shown immediately.
