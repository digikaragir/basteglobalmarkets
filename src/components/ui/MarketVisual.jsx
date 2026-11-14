// Market-card charts, drawn with TradingView Lightweight Charts™ on SYNTHETIC data.
//   01 candles  → candlestick chart         02 gold    → gold area chart
//   03 options  → baseline (index-day) chart 04 academy → bar chart of learning steps
// The library is loaded lazily when the card scrolls into view (`active`), then the
// series "draws in" once. It does not keep ticking: no fake live prices (see content.js).
import { useEffect, useRef, useState } from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { prefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { buildCardSeries, ACADEMY_STEPS } from '../../utils/syntheticSeries';
import './MarketVisual.css';

const DRAW_MS = 1100; // draw-in duration

const C = {
  up: '#00a86b',
  down: '#e5484d',
  gold: '#d9b15a',
  grid: 'rgba(255, 255, 255, 0.045)',
  text: 'rgba(255, 255, 255, 0.62)',
};

function addSeries(LW, chart, type, s) {
  const scale = { autoscaleInfoProvider: () => ({ priceRange: { minValue: s.min, maxValue: s.max } }) };
  const quiet = { priceLineVisible: false, lastValueVisible: false, ...scale };

  if (s.kind === 'candles') {
    const series = chart.addSeries(LW.CandlestickSeries, {
      ...quiet,
      upColor: C.up, downColor: C.down, wickUpColor: C.up, wickDownColor: C.down, borderVisible: false,
    });
    const last = s.data[s.data.length - 1].close;
    series.createPriceLine({ price: last, color: 'rgba(229, 72, 77, 0.6)', lineWidth: 1, lineStyle: LW.LineStyle.Dashed, axisLabelVisible: false });
    return series;
  }
  if (s.kind === 'area') {
    return chart.addSeries(LW.AreaSeries, {
      ...quiet,
      lineColor: C.gold,
      lineWidth: 2,
      topColor: 'rgba(217, 177, 90, 0.38)',
      bottomColor: 'rgba(217, 177, 90, 0)',
      crosshairMarkerBackgroundColor: C.gold,
    });
  }
  if (s.kind === 'baseline') {
    const series = chart.addSeries(LW.BaselineSeries, {
      ...quiet,
      baseValue: { type: 'price', price: s.base },
      lineWidth: 2,
      topLineColor: C.up,
      topFillColor1: 'rgba(0, 168, 107, 0.32)',
      topFillColor2: 'rgba(0, 168, 107, 0.02)',
      bottomLineColor: C.down,
      bottomFillColor1: 'rgba(229, 72, 77, 0.02)',
      bottomFillColor2: 'rgba(229, 72, 77, 0.3)',
    });
    series.createPriceLine({ price: s.base, color: 'rgba(255,255,255,0.25)', lineWidth: 1, lineStyle: LW.LineStyle.Dashed, axisLabelVisible: false });
    return series;
  }
  // histogram (academy)
  return chart.addSeries(LW.HistogramSeries, { ...quiet, base: 0 });
}

function CardChart({ type, active }) {
  const hostRef = useRef(null);
  const stepsRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!active) return;
    let disposed = false;
    let chart;
    let raf = 0;

    import('lightweight-charts').then((LW) => {
      if (disposed || !hostRef.current) return;
      const s = buildCardSeries(type);
      const isAcademy = s.kind === 'histogram';
      const mono = getComputedStyle(document.documentElement).getPropertyValue('--font-mono') || 'monospace';

      chart = LW.createChart(hostRef.current, {
        autoSize: true,
        layout: {
          background: { type: LW.ColorType.Solid, color: 'transparent' },
          textColor: C.text,
          fontFamily: mono,
          fontSize: 11,
          attributionLogo: false, // attribution is shown once on the page (Classroom section credit)
        },
        grid: { vertLines: { visible: false }, horzLines: { color: C.grid } },
        rightPriceScale: { visible: false },
        leftPriceScale: { visible: false },
        timeScale: { visible: false, borderVisible: false },
        localization: { timeFormatter: () => '' },
        crosshair: {
          mode: LW.CrosshairMode.Magnet,
          vertLine: { color: 'rgba(255,255,255,0.18)', labelVisible: false, visible: !isAcademy },
          horzLine: { visible: false, labelVisible: false },
        },
        handleScroll: false, // never trap page scrolling or touch swipes
        handleScale: false,
      });

      const series = addSeries(LW, chart, type, s);
      const n = s.data.length;
      // Academy: pin the range to the slots exactly so the HTML step labels line up under each bar
      const range = isAcademy ? { from: -0.5, to: n - 0.5 } : { from: -0.6, to: n - 0.4 };
      // Academy: pin each HTML step label under its bar using the chart's own x-coordinates
      if (isAcademy) {
        const barTimes = s.data.filter((d) => d.value != null).map((d) => d.time);
        const place = () => {
          const spans = stepsRef.current?.children;
          if (!spans) return;
          barTimes.forEach((time, i) => {
            const x = chart.timeScale().timeToCoordinate(time);
            if (spans[i] && x != null) spans[i].style.left = `${x}px`;
          });
        };
        chart.timeScale().subscribeVisibleLogicalRangeChange(place);
        chart.timeScale().subscribeSizeChange(place);
      }
      const showAll = () => {
        series.setData(s.data);
        if (isAcademy) chart.timeScale().setVisibleLogicalRange(range);
        else chart.timeScale().fitContent();
      };

      if (prefersReducedMotion()) {
        showAll();
      } else {
        // Draw in once: reveal points left → right (bars grow up for the academy chart)
        const t0 = performance.now();
        const step = (now) => {
          if (disposed) return;
          const p = Math.min(1, (now - t0) / DRAW_MS);
          const eased = 1 - Math.pow(1 - p, 3);
          if (isAcademy) {
            series.setData(s.data.map((d) => (d.value == null ? d : { ...d, value: d.value * eased })));
          } else {
            series.setData(s.data.slice(0, Math.max(1, Math.round(n * eased))));
          }
          chart.timeScale().setVisibleLogicalRange(range);
          if (p < 1) raf = requestAnimationFrame(step);
          else showAll();
        };
        raf = requestAnimationFrame(step);
      }
      setReady(true);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      chart?.remove();
    };
  }, [type, active]);

  return (
    <>
      <div ref={hostRef} className={`mv-chart ${ready ? 'is-ready' : ''}`} aria-hidden="true" />
      {type === 'academy' && (
        <div ref={stepsRef} className={`mv-steps ${ready ? 'is-ready' : ''}`} aria-hidden="true">
          {ACADEMY_STEPS.map((label) => (
            <span key={label}>{label}</span> // left is set from the chart's bar coordinates
          ))}
        </div>
      )}
      {!ready && <div className="mv-skeleton" aria-hidden="true" />}
    </>
  );
}

export default function MarketVisual({ type, active = true }) {
  // JS fallback for the scroll parallax when CSS view() timelines aren't supported
  const ref = useScrollProgress();
  return (
    <div ref={ref} className={`mv mv--${type} ${active ? 'is-active' : ''}`}>
      <div className="mv__inner">
        <CardChart type={type} active={active} />
      </div>
      {type === 'gold' && <span className="mv__label mv__label--gold" aria-hidden="true">XAU/USD</span>}
      <span className="mv__tag" aria-hidden="true">Illustrative</span>
    </div>
  );
}
