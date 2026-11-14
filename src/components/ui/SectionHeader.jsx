import { useReveal } from '../../hooks/useReveal';
import './SectionHeader.css';

/** Eyebrow + H2 + optional lead. Children can include <span className="u-draw"> for an underline that draws in. */
export default function SectionHeader({ index, eyebrow, children, description, titleId }) {
  const [ref, visible] = useReveal();
  return (
    <header ref={ref} className={`section-header reveal ${visible ? 'is-visible' : ''}`}>
      <p className="eyebrow">
        <span className="eyebrow__line" aria-hidden="true" />
        {index} — {eyebrow}
      </p>
      <h2 className="section-header__title" id={titleId}>{children}</h2>
      {description && <p className="section-header__desc">{description}</p>}
    </header>
  );
}
