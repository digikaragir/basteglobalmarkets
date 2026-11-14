import { STATS } from '../../data/content';
import { useReveal } from '../../hooks/useReveal';
import CountUp from '../motion/CountUp';
import './Stats.css';

export default function Stats() {
  const [ref, visible] = useReveal({ threshold: 0.4 });
  return (
    <section className="stats" aria-label="At a glance">
      <div className="container">
        <dl ref={ref} className={`stats__grid ${visible ? 'is-visible' : ''}`}>
          {STATS.map((s, i) => (
            <div key={s.label} className="stats__item" style={{ '--i': i }}>
              <dt className="stats__label">{s.label}</dt>
              <dd className="stats__value">
                <CountUp end={s.end} start={visible} prefix={s.prefix} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
