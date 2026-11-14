import { useEffect, useRef, useState } from 'react';
import { buildLessonData } from '../../utils/syntheticSeries';
import './LessonChart.css';

/**
 * Interactive teaching chart built on TradingView Lightweight Charts™ (Apache-2.0).
 *
 * - The library (~45 KB gzip) is loaded with a dynamic import only when the chart
 *   is about to scroll into view, so it never slows the first page load.
 * - Data is synthetic (utils/syntheticSeries.js). The time axis is hidden.
 * - Mouse-wheel zoom is off so the chart never hijacks page scrolling.
 * - The TradingView attribution logo stays on, as the licence requires.
 *
 * lesson: 'structure' | 'trend' | 'risk'
 */
const COLORS = {
  up: '#00a86b',
  down: '#e5484d',
  text: 'rgba(255, 255, 255, 0.52)',
  grid: 'rgba(255, 255, 255, 0.045)',
  border: 'rgba(255, 255, 255, 0.08)',
  cream: '#fbf9f5',
  ema20: '#00c27b',
  ema50: 'rgba(251, 249, 245, 0.55)',
};

export default function LessonChart({ lesson, label }) {
  const hostRef = useRef(null);
  const apiRef = useRef(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  // 1) Wait until the chart is close to the viewport
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 2) Load the library and build the chart once
  useEffect(() => {
    if (!near) return;
    let disposed = false;

    import('lightweight-charts')
      .then((LW) => {
        if (disposed || !hostRef.current) return;
        const data = buildLessonData();
        const mono = getComputedStyle(document.documentElement).getPropertyValue('--font-mono') || 'monospace';

        const chart = LW.createChart(hostRef.current, {
          autoSize: true,
          layout: {
            background: { type: LW.ColorType.Solid, color: 'transparent' },
            textColor: COLORS.text,
            fontFamily: mono,
            fontSize: 11,
            attributionLogo: true,
          },
          grid: { vertLines: { color: COLORS.grid }, horzLines: { color: COLORS.grid } },
          rightPriceScale: { borderColor: COLORS.border, scaleMargins: { top: 0.08, bottom: 0.22 } },
          timeScale: { visible: false, borderColor: COLORS.border, rightOffset: 4, barSpacing: 7, fixLeftEdge: true },
          crosshair: {
            mode: LW.CrosshairMode.Normal,
            vertLine: { color: 'rgba(255,255,255,0.25)', labelVisible: false },
            horzLine: { color: 'rgba(255,255,255,0.25)', labelBackgroundColor: '#1b1d21' },
          },
          handleScroll: { mouseWheel: false, pressedMouseMove: true, horzTouchDrag: true, vertTouchDrag: false },
          handleScale: { mouseWheel: false, pinch: true, axisPressedMouseMove: true, axisDoubleClickReset: true },
        });

        const candles = chart.addSeries(LW.CandlestickSeries, {
          upColor: COLORS.up,
          downColor: COLORS.down,
          wickUpColor: COLORS.up,
          wickDownColor: COLORS.down,
          borderVisible: false,
          priceLineVisible: false,
          lastValueVisible: true,
        });
        candles.setData(data.candles);

        const volume = chart.addSeries(LW.HistogramSeries, {
          priceScaleId: '',
          priceFormat: { type: 'volume' },
          priceLineVisible: false,
          lastValueVisible: false,
        });
        volume.priceScale().applyOptions({ scaleMargins: { top: 0.84, bottom: 0 } });
        volume.setData(data.volume);

        const lineOpts = { lineWidth: 2, priceLineVisible: false, lastValueVisible: false, crosshairMarkerVisible: false, visible: false };
        const ema20 = chart.addSeries(LW.LineSeries, { ...lineOpts, color: COLORS.ema20 });
        const ema50 = chart.addSeries(LW.LineSeries, { ...lineOpts, color: COLORS.ema50 });
        ema20.setData(data.ema20);
        ema50.setData(data.ema50);

        const markers = LW.createSeriesMarkers(candles, []);
        chart.timeScale().fitContent();

        apiRef.current = { LW, chart, candles, ema20, ema50, markers, data, lines: [] };
        setReady(true);
      })
      .catch(() => !disposed && setFailed(true));

    return () => {
      disposed = true;
      apiRef.current?.chart.remove();
      apiRef.current = null;
    };
  }, [near]);

  // 3) Apply the overlays for the selected lesson
  useEffect(() => {
    const api = apiRef.current;
    if (!ready || !api) return;
    const { LW, candles, ema20, ema50, markers, data, lines } = api;
    const { levels, bars } = data;

    lines.splice(0).forEach((l) => candles.removePriceLine(l));
    const addLine = (price, color, title, style = LW.LineStyle.Dashed) =>
      lines.push(candles.createPriceLine({ price, color, title, lineWidth: 1, lineStyle: style, axisLabelVisible: true }));

    ema20.applyOptions({ visible: lesson === 'trend' });
    ema50.applyOptions({ visible: lesson === 'trend' });

    if (lesson === 'structure') {
      addLine(levels.resistance, COLORS.down, 'Resistance → support');
      addLine(levels.support, COLORS.up, 'Support');
      markers.setMarkers([
        { time: bars.breakout, position: 'aboveBar', shape: 'arrowDown', color: COLORS.cream, text: 'Breakout' },
        { time: bars.retest, position: 'belowBar', shape: 'arrowUp', color: COLORS.up, text: 'Retest' },
      ]);
    } else if (lesson === 'trend') {
      markers.setMarkers([]);
    } else if (lesson === 'risk') {
      addLine(levels.target2R, COLORS.up, '2R', LW.LineStyle.Dotted);
      addLine(levels.entry, COLORS.cream, 'Example entry', LW.LineStyle.Solid);
      addLine(levels.stop, COLORS.down, 'Stop · 1R');
      markers.setMarkers([
        { time: bars.entry, position: 'belowBar', shape: 'arrowUp', color: COLORS.cream, text: 'Example' },
      ]);
    }
  }, [lesson, ready]);

  return (
    <div className="lesson-chart">
      <div
        ref={hostRef}
        className={`lesson-chart__canvas ${ready ? 'is-ready' : ''}`}
        role="img"
        aria-label={label}
      />
      {!ready && !failed && <div className="lesson-chart__loading" aria-hidden="true" />}
      {failed && <p className="lesson-chart__failed">The practice chart could not load. Please refresh the page.</p>}
    </div>
  );
}
