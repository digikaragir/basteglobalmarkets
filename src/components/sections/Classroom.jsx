import { useRef, useState } from 'react';
import { CLASSROOM_SECTION as S, LESSONS } from '../../data/content';
import { waLink } from '../../config/site';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../motion/Reveal';
import Button from '../ui/Button';
import LessonChart from '../charts/LessonChart';
import { WhatsAppIcon, CheckIcon } from '../ui/Icons';
import './Classroom.css';

/** "Inside the classroom": one interactive practice chart, three teaching lenses. */
export default function Classroom() {
  const [active, setActive] = useState(LESSONS[0].id);
  const tabsRef = useRef([]);
  const lesson = LESSONS.find((l) => l.id === active);

  // Arrow-key navigation between tabs (WAI-ARIA tabs pattern)
  const onKeyDown = (e, i) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + LESSONS.length) % LESSONS.length;
    setActive(LESSONS[next].id);
    tabsRef.current[next]?.focus();
  };

  return (
    <section id="classroom" className="section section--alt classroom" aria-labelledby="classroom-title">
      <div className="container">
        <SectionHeader index={S.index} eyebrow={S.eyebrow} description={S.description} titleId="classroom-title">
          {S.titleStart}
          <span className="u-draw">{S.titleAccent}</span>
          <span className="text-green">.</span>
        </SectionHeader>

        <Reveal className="classroom__card">
          <div className="classroom__bar">
            <div className="classroom__tabs" role="tablist" aria-label="Chart lessons">
              {LESSONS.map((l, i) => (
                <button
                  key={l.id}
                  ref={(el) => (tabsRef.current[i] = el)}
                  role="tab"
                  id={`tab-${l.id}`}
                  aria-selected={active === l.id}
                  aria-controls="lesson-panel"
                  tabIndex={active === l.id ? 0 : -1}
                  className={`classroom__tab ${active === l.id ? 'is-active' : ''}`}
                  onClick={() => setActive(l.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                >
                  <span className="classroom__tab-num tabular" aria-hidden="true">0{i + 1}</span>
                  {l.tab}
                </button>
              ))}
            </div>
            <p className="classroom__badge">
              <span className="classroom__badge-dot" aria-hidden="true" />
              {S.badge}
            </p>
          </div>

          <div className="classroom__body">
            <div className="classroom__chart">
              <LessonChart
                lesson={active}
                label={`Practice chart with synthetic data showing the ${lesson.tab.toLowerCase()} lesson: ${lesson.title}.`}
              />
            </div>

            <div className="classroom__notes" id="lesson-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
              <div key={active} className="classroom__notes-inner">
                <h3 className="classroom__title">{lesson.title}</h3>
                <p className="classroom__text">{lesson.body}</p>
                <ul className="classroom__points">
                  {lesson.points.map((p, i) => (
                    <li key={p} style={{ '--i': i }}>
                      <CheckIcon className="classroom__check" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                href={waLink({ topic: `Courses — the "${lesson.tab}" lesson`, source: 'Classroom' })}
                data-cta="whatsapp-classroom"
                external
                icon={WhatsAppIcon}
                size="sm"
                variant="outline"
                className="btn--square classroom__cta"
              >
                Learn this in class
              </Button>
            </div>
          </div>

          <p className="classroom__credit">
            Charts by{' '}
            <a href="https://www.tradingview.com/lightweight-charts/" target="_blank" rel="noopener noreferrer">
              TradingView Lightweight Charts™
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
