/**
 * Synthetic, deterministic practice data for the "Inside the classroom" chart.
 *
 * Deliberately NOT market data: no real instrument, no real dates (the time
 * axis is hidden), prices on an arbitrary ~100 scale. The path is scripted so
 * every lesson has something to point at:
 *   downtrend → range (≈92.5–100) → breakout → retest of 100 → continuation.
 */

// Waypoints: [bar index, target close]
const PATH = [
  [0, 105], [14, 99], [30, 93.4], [36, 95.6], [44, 93], [52, 99.2], [60, 94],
  [68, 99.4], [74, 96.8], [79, 99.6], [84, 105.5], [90, 108.4], [97, 102.4],
  [101, 100.9], [106, 103.6], [114, 108.8], [125, 113.6],
];
const BARS = 126;
const RANGE_END = 80; // first bar allowed to close above resistance
const SUPPORT = 92.6;
const RESISTANCE = 100;
const DAY = 86400;
const T0 = 1_000_000_000; // arbitrary epoch offset; the time axis is hidden anyway

function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function targetAt(i) {
  for (let k = 0; k < PATH.length - 1; k++) {
    const [i0, v0] = PATH[k];
    const [i1, v1] = PATH[k + 1];
    if (i >= i0 && i <= i1) return v0 + ((v1 - v0) * (i - i0)) / (i1 - i0);
  }
  return PATH[PATH.length - 1][1];
}

function ema(values, period) {
  const k = 2 / (period + 1);
  let prev;
  return values.map((v, i) => {
    prev = i === 0 ? v : v * k + prev * (1 - k);
    return prev;
  });
}

const round = (n) => Math.round(n * 100) / 100;

export function buildLessonData() {
  const rnd = seeded(11);
  const candles = [];
  let prevClose = PATH[0][1];

  for (let i = 0; i < BARS; i++) {
    const open = prevClose + (rnd() - 0.5) * 0.4;
    let close = targetAt(i) + (rnd() - 0.5) * 1.6;
    let high = Math.max(open, close) + rnd() * 1.1;
    let low = Math.min(open, close) - rnd() * 1.1;

    // Keep the range honest so the levels read cleanly
    if (i >= 28 && i < RANGE_END) {
      high = Math.min(high, RESISTANCE + 0.35);
      close = Math.min(close, RESISTANCE - 0.15);
      low = Math.max(low, SUPPORT - 0.45);
      close = Math.max(close, SUPPORT + 0.2);
    }
    // Retest: dips touch the old resistance but don't close back inside the range
    if (i >= 96 && i <= 103) {
      low = Math.max(low, RESISTANCE - 0.7);
      close = Math.max(close, RESISTANCE + 0.3);
    }
    high = Math.max(high, open, close);
    low = Math.min(low, open, close);

    candles.push({ time: T0 + i * DAY, open: round(open), high: round(high), low: round(low), close: round(close) });
    prevClose = close;
  }

  const closes = candles.map((c) => c.close);
  const toLine = (arr) => arr.map((v, i) => ({ time: candles[i].time, value: round(v) }));
  const ema20 = toLine(ema(closes, 20));
  const ema50 = toLine(ema(closes, 50));

  const volume = candles.map((c, i) => {
    const breakout = i >= 79 && i <= 85 ? 2.2 : 1;
    const bounce = i >= 101 && i <= 104 ? 1.6 : 1;
    const v = (600 + rnd() * 500) * breakout * bounce;
    return {
      time: c.time,
      value: Math.round(v),
      color: c.close >= c.open ? 'rgba(0, 168, 107, 0.35)' : 'rgba(229, 72, 77, 0.35)',
    };
  });

  // Key bars / levels the lessons annotate
  const breakoutBar = candles.findIndex((c, i) => i >= RANGE_END && c.close > RESISTANCE + 0.8);
  let retestBar = 96;
  for (let i = 96; i <= 103; i++) if (candles[i].low < candles[retestBar].low) retestBar = i;
  const entryBar = Math.min(retestBar + 1, BARS - 1);
  const entry = candles[entryBar].close;
  const stop = round(candles[retestBar].low - 0.6);
  const oneR = entry - stop;

  return {
    candles,
    ema20,
    ema50,
    volume,
    levels: {
      support: SUPPORT,
      resistance: RESISTANCE,
      entry,
      stop,
      target2R: round(entry + 2 * oneR),
    },
    bars: {
      breakout: candles[breakoutBar].time,
      retest: candles[retestBar].time,
      entry: candles[entryBar].time,
    },
  };
}

/* ------------------------------------------------------------------ */
/* Market-card illustrations (Markets section, cards 01–04)            */
/* Same rules: synthetic, deterministic, no scales/dates shown.        */
/* ------------------------------------------------------------------ */

export const ACADEMY_STEPS = ['Basics', 'Risk', 'Setups', 'Options', 'Mentorship'];

function walk(seed, n, start, drift, vol) {
  const rnd = seeded(seed);
  let v = start;
  return Array.from({ length: n }, (_, i) => {
    v += drift + (rnd() - 0.5) * vol + Math.sin(i / 7) * vol * 0.12;
    return v;
  });
}

/**
 * type: 'candles' | 'gold' | 'options' | 'academy'
 * Returns { kind, data, min, max } — min/max let the chart keep a fixed scale while it draws in.
 */
export function buildCardSeries(type) {
  const t = (i) => T0 + i * DAY;

  if (type === 'candles') {
    const rnd = seeded(7);
    const closes = walk(7, 64, 100, 0.06, 2.2);
    let prev = 100;
    const data = closes.map((c, i) => {
      const open = prev + (rnd() - 0.5) * 0.5;
      const close = c;
      const high = Math.max(open, close) + rnd() * 1.2;
      const low = Math.min(open, close) - rnd() * 1.2;
      prev = close;
      return { time: t(i), open: round(open), high: round(high), low: round(low), close: round(close) };
    });
    return { kind: 'candles', data, min: Math.min(...data.map((d) => d.low)), max: Math.max(...data.map((d) => d.high)) };
  }

  if (type === 'gold') {
    const vals = walk(23, 90, 100, 0.16, 1.5);
    const data = vals.map((v, i) => ({ time: t(i), value: round(v) }));
    return { kind: 'area', data, min: Math.min(...vals), max: Math.max(...vals) };
  }

  if (type === 'options') {
    // Index-day style: oscillates around the open (100), dips below, finishes above
    const rnd = seeded(31);
    const path = [[0, 100], [12, 100.6], [24, 99.2], [36, 98.9], [46, 100.2], [58, 101.1], [70, 100.6], [80, 101.6]];
    const at = (i) => {
      for (let k = 0; k < path.length - 1; k++) {
        const [i0, v0] = path[k], [i1, v1] = path[k + 1];
        if (i >= i0 && i <= i1) return v0 + ((v1 - v0) * (i - i0)) / (i1 - i0);
      }
      return path[path.length - 1][1];
    };
    const data = Array.from({ length: 81 }, (_, i) => ({ time: t(i), value: round(at(i) + (rnd() - 0.5) * 0.35) }));
    const vals = data.map((d) => d.value);
    return { kind: 'baseline', base: 100, data, min: Math.min(...vals), max: Math.max(...vals) };
  }

  // academy: one bar per learning step, rising. Empty (whitespace) slots between bars create gaps:
  // bars sit at even indexes 0, 2, 4, 6, 8 → 9 slots in total.
  const data = [];
  ACADEMY_STEPS.forEach((_, i) => {
    data.push({ time: t(i * 2), value: 30 + i * 15, color: `rgba(0, 168, 107, ${0.45 + i * 0.13})` });
    if (i < ACADEMY_STEPS.length - 1) data.push({ time: t(i * 2 + 1) });
  });
  return { kind: 'histogram', data, min: 0, max: 95, slots: data.length };
}
