import { DISCLOSURE as D } from '../../data/content';
import { ArrowUpRight } from '../ui/Icons';
import './Disclosure.css';

/** Compact, always-visible compliance band shown above the footer on every page. */
export default function Disclosure({ showLink = true }) {
  return (
    <aside className="disclosure" aria-labelledby="disclosure-title">
      <div className="container disclosure__inner">
        <div className="disclosure__head">
          <p className="disclosure__title" id="disclosure-title">
            <span className="disclosure__badge" aria-hidden="true">!</span>
            {D.title}
          </p>
          {showLink && (
            <a href="/disclaimer/" className="disclosure__link">
              {D.linkLabel}
              <ArrowUpRight />
            </a>
          )}
        </div>
        <ul className="disclosure__grid">
          {D.points.map((pt) => (
            <li key={pt.h}>
              <strong>{pt.h}</strong>
              <span>{pt.p}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
