import { FAQ, FAQ_SECTION as S } from '../../data/content';
import { useReveal } from '../../hooks/useReveal';
import SectionHeader from '../ui/SectionHeader';
import { PlusIcon } from '../ui/Icons';
import './Faq.css';

// FAQPage structured data, generated from the same FAQ array the page shows
const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

/** Native <details> accordion: keyboard and screen-reader support for free, works without JS. */
export default function Faq() {
  const [ref, visible] = useReveal();
  return (
    <section id="faq" className="section section--alt" aria-labelledby="faq-title">
      <div className="container faq">
        <SectionHeader index={S.index} eyebrow={S.eyebrow} titleId="faq-title">
          {S.title}
          <span className="text-green">.</span>
        </SectionHeader>

        <div ref={ref} className={`faq__list ${visible ? 'is-visible' : ''}`}>
          {FAQ.map((f, i) => (
            <details key={f.q} className="faq__item" name="faq" style={{ '--i': i }}>
              <summary className="faq__q">
                <span>{f.q}</span>
                <PlusIcon className="faq__icon" />
              </summary>
              <p className="faq__a">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
    </section>
  );
}
