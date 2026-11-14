import { TICKER, TICKER_LABEL } from '../../data/content';
import './Ticker.css';

// Markets marquee. Intentionally shows no prices (see the compliance note in content.js).
function Item({ symbol, venue }) {
  return (
    <div className="ticker__item">
      <span className="ticker__sym">{symbol}</span>
      <span className="ticker__venue">{venue}</span>
      <span className="ticker__sep" aria-hidden="true">◆</span>
    </div>
  );
}

export default function Ticker() {
  return (
    <div className="ticker" role="region" aria-label={TICKER_LABEL}>
      <div className="ticker__viewport">
        <div className="ticker__track">
          {/* Rendered twice for a seamless loop; the second copy is hidden from screen readers */}
          <div className="ticker__group">
            {TICKER.map((r) => <Item key={r.symbol} {...r} />)}
          </div>
          <div className="ticker__group" aria-hidden="true">
            {TICKER.map((r) => <Item key={r.symbol} {...r} />)}
          </div>
        </div>
      </div>
      <span className="ticker__note">{TICKER_LABEL}</span>
    </div>
  );
}
