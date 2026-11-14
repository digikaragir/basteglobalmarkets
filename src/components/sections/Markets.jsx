import { MARKETS, MARKETS_SECTION as S } from '../../data/content';
import { waLink } from '../../config/site';
import { useReveal } from '../../hooks/useReveal';
import SectionHeader from '../ui/SectionHeader';
import MarketVisual from '../ui/MarketVisual';
import Button from '../ui/Button';
import { ArrowUpRight } from '../ui/Icons';
import './Markets.css';

function MarketCard({ item, index }) {
  const [ref, visible] = useReveal();
  return (
    <article
      ref={ref}
      className={`market-card reveal ${visible ? 'is-visible' : ''} ${item.featured ? 'market-card--featured' : ''}`}
      style={{ '--delay': `${(index % 2) * 0.1}s` }}
    >
      <div className="market-card__top">
        <span className="market-card__num tabular">0{index + 1}</span>
        <span className="market-card__meta">{item.meta}</span>
      </div>
      <MarketVisual type={item.visual} active={visible} />
      <h3 className="market-card__title">{item.title}</h3>
      <p className="market-card__body">{item.body}</p>
      {item.cta && (
        <Button href={waLink({ topic: item.cta.topic, source: 'Markets' })} data-cta="whatsapp-markets" external variant="ghost" icon={ArrowUpRight} className="market-card__cta">
          {item.cta.label}
        </Button>
      )}
    </article>
  );
}

export default function Markets() {
  return (
    <section id="markets" className="section" aria-labelledby="markets-title">
      <div className="container">
        <SectionHeader index={S.index} eyebrow={S.eyebrow} titleId="markets-title">
          {S.titleStart}
          <span className="u-draw">{S.titleAccent}</span>
          {S.titleEnd}
        </SectionHeader>

        <div className="markets-grid">
          {MARKETS.map((m, i) => (
            <MarketCard key={m.id} item={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
