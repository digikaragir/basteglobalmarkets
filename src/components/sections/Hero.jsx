import { useEffect, useRef } from 'react';
import { HERO } from '../../data/content';
import { SITE, waLink, telLink } from '../../config/site';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { prefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import Button from '../ui/Button';
import { WhatsAppIcon, PhoneIcon } from '../ui/Icons';
import Ticker from './Ticker';
import './Hero.css';

const GLOW_LERP = 0.08;   // how quickly the glow catches the cursor (0–1)
const GLOW_MAX = 120;     // max drift from centre, px

/** Green glow that drifts toward the cursor. Desktop + fine pointer only, never with reduced motion. */
function useMouseGlow(sectionRef, glowRef) {
  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow || prefersReducedMotion()) return;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)');
    if (!mq.matches) return;

    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const loop = () => {
      x += (tx - x) * GLOW_LERP;
      y += (ty - y) * GLOW_LERP;
      glow.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;   // -0.5 … 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5;
      tx = Math.max(-GLOW_MAX, Math.min(GLOW_MAX, nx * GLOW_MAX * 2));
      ty = Math.max(-GLOW_MAX, Math.min(GLOW_MAX, ny * GLOW_MAX * 2));
      start();
    };
    const onLeave = () => { tx = 0; ty = 0; start(); };

    section.addEventListener('pointermove', onMove, { passive: true });
    section.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
    };
  }, [sectionRef, glowRef]);
}

export default function Hero() {
  // Fallback progress (0 → 1 as the hero scrolls out) for the watermark parallax
  const sectionRef = useScrollProgress({ mode: 'exit' });
  const glowRef = useRef(null);
  useMouseGlow(sectionRef, glowRef);

  return (
    <section className="hero" id="top" ref={sectionRef} aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__glow-wrap">
          <div className="hero__glow" ref={glowRef} />
        </div>
        <span className="hero__watermark">BASTE</span>
      </div>

      <div className="container hero__content">
        <p className="hero__eyebrow hero__step" style={{ '--n': 0 }}>
          <span aria-hidden="true" />
          {HERO.eyebrow}
          <span aria-hidden="true" />
        </p>

        <h1 className="hero__title" id="hero-title">
          <span className="hero__line">
            <span className="hero__line-inner" style={{ '--n': 1 }}>{HERO.titleLine1}</span>
          </span>
          <span className="hero__line">
            <span className="hero__line-inner" style={{ '--n': 2 }}>
              {HERO.titleLine2}
              <span className="accent-dot">.</span>
            </span>
          </span>
        </h1>

        <p className="hero__desc hero__step" style={{ '--n': 3 }}>
          {HERO.description} <strong>{SITE.founder}</strong>
          {HERO.descriptionTail}
        </p>

        <ul className="hero__tags hero__step" style={{ '--n': 4 }} aria-label="What we cover">
          {HERO.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <div className="hero__ctas hero__step" style={{ '--n': 5 }}>
          <Button href={waLink({ source: 'Hero' })} data-cta="whatsapp-hero" external icon={WhatsAppIcon} size="lg">
            Chat on WhatsApp
          </Button>
          <Button href={telLink} data-cta="call-hero" variant="outline" icon={PhoneIcon} size="lg">
            Call {SITE.phoneDisplay}
          </Button>
        </div>
      </div>

      <div className="container hero__strip">
        {HERO.strip.map((s) => (
          <span key={s}>{s}</span>
        ))}
        <span>Direct line — <span className="tabular">{SITE.phoneDisplay}</span></span>
      </div>

      <Ticker />
    </section>
  );
}
