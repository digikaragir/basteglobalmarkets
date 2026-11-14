import { ABOUT as A } from '../../data/content';
import { SITE } from '../../config/site';
import { useReveal } from '../../hooks/useReveal';
import Reveal from '../motion/Reveal';
import './About.css';

/** Founder section. Shows a monogram until a real photo path is set in content.js (ABOUT.photo). */
export default function About() {
  const [listRef, listVisible] = useReveal();
  const initials = SITE.founder.split(' ').map((w) => w[0]).join('');

  return (
    <section id="about" className="section section--alt about" aria-labelledby="about-title">
      <div className="container about__grid">
        <Reveal className="about__portrait">
          <figure className={`about__frame ${A.photo ? 'about__frame--photo' : ''}`}>
            {A.photo ? (
              <picture className="about__photo">
                {A.photoWebp && <source srcSet={A.photoWebp} type="image/webp" />}
                <img
                  src={A.photo}
                  alt={`Portrait of ${SITE.founder}, ${SITE.founderTitle}`}
                  width="500"
                  height="625"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            ) : (
              <div className="about__monogram" aria-hidden="true">
                <span>
                  {initials}
                  <span className="text-green">.</span>
                </span>
              </div>
            )}
            <figcaption className="about__caption">
              <span className="about__name">{SITE.founder}</span>
              <span className="about__role">
                {SITE.founderTitle} · <span style={{ whiteSpace: 'nowrap' }}>{A.location}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="about__text">
          <Reveal>
            <p className="eyebrow">
              <span className="eyebrow__line" aria-hidden="true" />
              {A.index} — {A.eyebrow}
            </p>
            <h2 className="about__title" id="about-title">
              {A.titleLine1}
              <br />
              {A.titleLine2}
              <span className="text-green">.</span>
            </h2>
            {A.experienceYears ? (
              <p className="about__exp">
                <span className="tabular">{A.experienceYears}+</span> years in markets
              </p>
            ) : null}
            {A.paragraphs.map((p) => (
              <p key={p} className="about__para">{p}</p>
            ))}
          </Reveal>

          <ul ref={listRef} className={`about__principles ${listVisible ? 'is-visible' : ''}`}>
            {A.principles.map((pr, i) => (
              <li key={pr.title} style={{ '--i': i }}>
                <span className="about__p-num tabular" aria-hidden="true">0{i + 1}</span>
                <div>
                  <h3 className="about__p-title">{pr.title}</h3>
                  <p className="about__p-body">{pr.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
