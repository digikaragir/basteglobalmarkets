// All page copy and data. Edit text here — components only handle layout.
//
// COMPLIANCE NOTE: Baste Global Markets is NOT registered with SEBI as an Investment Adviser or
// Research Analyst. Keep all copy educational: no "advisory", "tips", "calls", "signals", "targets",
// return claims, or live/recent market prices. When in doubt, ask a compliance professional.

export const HERO = {
  eyebrow: 'Forex · Commodities · Indian F&O',
  titleLine1: 'Every market,',
  titleLine2: 'one desk',
  description:
    'Active trading across the major forex pairs, global commodities and Indian index options & futures — led by',
  descriptionTail: '. The same desk frameworks, taught in our courses.',
  tags: ['Forex Majors', 'Bullion & Energy', 'Nifty · BankNifty F&O', 'Courses & Mentorship'],
  strip: ['Major FX · Bullion & Energy · Index F&O', 'Somnath Baste — Founder & Lead Trader'],
};

// Markets marquee under the hero. Deliberately shows NO prices: an unregistered educator
// should not display live or recent market data.
export const TICKER_LABEL = 'Markets we teach';
export const TICKER = [
  { symbol: 'EUR/USD', venue: 'Forex major' },
  { symbol: 'GBP/USD', venue: 'Forex major' },
  { symbol: 'USD/INR', venue: 'NSE currency' },
  { symbol: 'GOLD', venue: 'MCX bullion' },
  { symbol: 'SILVER', venue: 'MCX bullion' },
  { symbol: 'CRUDE OIL', venue: 'MCX energy' },
  { symbol: 'NIFTY 50', venue: 'NSE index F&O' },
  { symbol: 'BANKNIFTY', venue: 'NSE index F&O' },
];

export const MARKETS_SECTION = {
  index: '01',
  eyebrow: 'What we trade & teach',
  titleStart: 'Traded at the desk, ',
  titleAccent: 'taught',
  titleEnd: ' in the classroom.',
};

export const MARKETS = [
  {
    id: 'forex',
    meta: '24×5 · G10 Pairs',
    title: 'Forex Majors & Crosses',
    body: 'How the desk reads the major pairs — EUR/USD, GBP/USD, USD/JPY and more — with clear levels, context and risk-first positioning, taught for exchange-traded currency derivatives.',
    visual: 'candles',
  },
  {
    id: 'commodities',
    meta: 'XAU · XAG · Crude',
    title: 'Commodities & Bullion',
    body: 'Gold, silver and crude followed from macro driver to entry — learn to build a view on structure, timing and discipline, not noise.',
    visual: 'gold',
  },
  {
    id: 'indian-fo',
    meta: 'NSE · Options · Futures',
    title: 'Indian Markets — Options & Futures',
    body: 'Index options and futures on NSE — NIFTY and BANKNIFTY strategy, positioning and expiry-day tactics, always taught with defined risk.',
    visual: 'options',
  },
  {
    id: 'academy',
    meta: 'Beginner → Advanced',
    title: 'Courses & Mentorship',
    body: 'Structured courses and 1-on-1 mentorship that teach the exact frameworks the desk trades — from market basics to advanced option strategies.',
    visual: 'academy',
    featured: true,
    cta: { label: 'Ask about courses', topic: 'Courses — which one fits me?' },
  },
];

// Stats strip between Markets and About. Keep these factual — no invented client counts or returns.
// `end` counts up from 0 when the strip scrolls into view; prefix/suffix stay static.
export const STATS = [
  { end: 3, label: 'Markets' },
  { end: 24, suffix: '×5', label: 'Coverage' },
  { end: 3, label: 'Course Levels' },
  { end: 1, suffix: '-on-1', label: 'Mentorship' },
];

// "Inside the classroom" — interactive TradingView Lightweight Charts™ demo.
// The chart uses SYNTHETIC data generated in src/utils/syntheticSeries.js: no real instrument,
// no real dates, no live prices. Keep it that way (see the compliance note at the top).
export const CLASSROOM_SECTION = {
  index: '02',
  eyebrow: 'Inside the classroom',
  titleStart: 'Learn to read the chart, ',
  titleAccent: 'not follow calls',
  description:
    'A taste of how lessons break price action down — structure, trend and risk — on a practice chart. Switch between the three lenses below.',
  badge: 'Synthetic practice data · not a live market · not a recommendation',
};

// Each lesson toggles overlays on the same chart (see components/charts/LessonChart.jsx).
export const LESSONS = [
  {
    id: 'structure',
    tab: 'Structure',
    title: 'Support, resistance & role reversal',
    body: 'Price spends most of its time in ranges. Mark where buyers and sellers repeatedly stepped in, then watch what happens when a level finally breaks — old resistance often becomes new support.',
    points: ['Mark the range before you trade it', 'A clean break needs a close beyond the level', 'The retest tells you if the break is real'],
  },
  {
    id: 'trend',
    tab: 'Trend',
    title: 'Reading trend with moving averages',
    body: 'Moving averages smooth the noise. When the faster average crosses above the slower one and price holds above both, the path of least resistance has shifted.',
    points: ['20 EMA for the short-term rhythm', '50 EMA for the broader trend', 'Trade with the slope, not against it'],
  },
  {
    id: 'risk',
    tab: 'Risk first',
    title: 'Defining risk before the trade',
    body: 'Every example in class starts with the stop, not the target. Place the stop where the idea is proven wrong, size the position so that distance is a fixed slice of capital, and only then look at reward.',
    points: ['Stop below structure, not at a round number', '1R = the money you accept to lose', 'Skip setups that cannot offer at least 2R'],
  },
];

// About the founder. Only state verifiable facts.
//   photo:           portrait photo (4:5) in /public, or null to show the "SB." monogram
//   photoWebp:       optional smaller WebP version of the same photo (browsers that support it use this)
//   experienceYears: a real number (e.g. 8) to show "8+ years in markets", or null to hide it
export const ABOUT = {
  index: '03',
  eyebrow: 'The founder',
  titleLine1: 'Traded first.',
  titleLine2: 'Taught second',
  paragraphs: [
    'Somnath Baste is the founder and lead trader of Baste Global Markets, based in Pune. He actively trades the major forex pairs, bullion, energy and Indian index derivatives.',
    'The academy exists for one reason: to teach the same frameworks he uses at the desk — reading structure, timing an entry and, above all, managing risk — so you can make your own decisions with confidence.',
  ],
  principles: [
    { title: 'Risk before reward', body: 'Every lesson starts with position sizing and defined risk.' },
    { title: 'Process over predictions', body: 'Frameworks you can repeat, not forecasts to follow.' },
    { title: 'Education, not tips', body: 'No calls, no signals — you learn to decide for yourself.' },
  ],
  photo: '/somnath-baste-portrait.jpg',
  photoWebp: '/somnath-baste-portrait.webp',
  experienceYears: null,
  location: 'Pune, India',
};

export const COURSES_SECTION = {
  index: '04',
  eyebrow: 'The Academy',
  title: "Learn the desk's exact frameworks",
  description:
    'Small live batches taught by Somnath Baste — every concept backed by real trades from the desk. Pick your level and enquire on WhatsApp for the next batch.',
  // Set to a real date to show it, e.g. 'Next batch starts 6 January 2027'. Leave '' to hide.
  nextBatch: '',
  footnote: 'Not sure where to start? WhatsApp “START” — Somnath will guide you to the right course',
};

export const COURSES = [
  {
    level: 'Beginner',
    duration: '4 weeks · live online',
    title: 'Forex Foundation',
    audience: 'New traders starting from zero',
    syllabus: [
      'Market structure & global sessions',
      'Major pairs — pips, lots & leverage',
      'Risk management & position sizing',
      'Building your first trading plan',
    ],
  },
  {
    level: 'Intermediate',
    duration: '6 weeks · live online',
    title: 'Options Mastery',
    audience: 'Traders moving into NIFTY & BANKNIFTY F&O',
    syllabus: [
      'Option Greeks & chain reading',
      'Directional setups & spreads',
      'Expiry-day tactics',
      'Adjustments & hedging framework',
    ],
    popular: true,
  },
  {
    level: 'Advanced',
    duration: '6 weeks · live online',
    title: 'Commodity & Swing',
    audience: 'Traders who want desk-style conviction',
    syllabus: [
      'Gold & crude macro drivers',
      'Multi-timeframe swing entries',
      'Trade journaling & review system',
      '1-on-1 mentorship add-on',
    ],
  },
];

// FAQ — answers must stay factual. Add items (e.g. batch timings, language) once confirmed.
export const FAQ_SECTION = {
  index: '05',
  eyebrow: 'Questions',
  title: 'Before you enquire',
};

export const FAQ = [
  {
    q: 'Do you give trading tips, calls or signals?',
    a: 'No. Baste Global Markets is an education provider. We do not give buy or sell recommendations, tips, signals or portfolio advice — and we will never ask for access to your trading account or for money to trade on your behalf.',
  },
  {
    q: 'Are you registered with SEBI?',
    a: 'No. We are not registered with SEBI as an Investment Adviser or Research Analyst. That is why everything we offer is education: concepts, frameworks and risk management that you learn and then apply with your own judgement.',
  },
  {
    q: 'Which course is right for me?',
    a: 'Forex Foundation is for complete beginners. Options Mastery is for traders moving into NIFTY & BANKNIFTY F&O. Commodity & Swing is for traders who want desk-style conviction on gold, crude and swing entries. Not sure? WhatsApp “START” and Somnath will guide you.',
  },
  {
    q: 'How are classes delivered?',
    a: 'In small live online batches — 4 weeks for Forex Foundation and 6 weeks each for Options Mastery and Commodity & Swing. 1-on-1 mentorship is available as an add-on.',
  },
  {
    q: 'How much do the courses cost?',
    a: 'Fees are shared on request. Message on WhatsApp with the course name and you will receive the current fee, batch dates and enrolment terms in writing before you pay anything.',
  },
  {
    q: 'Can I trade forex from India?',
    a: 'Indian residents may trade currency derivatives only on SEBI-recognised exchanges such as NSE and BSE, in permitted pairs. Trading forex or CFDs through offshore or unauthorised platforms is not permitted under FEMA, and the RBI publishes an Alert List of such platforms. Our forex teaching follows these rules.',
  },
  {
    q: 'Will I make money after the course?',
    a: 'No course can promise profits, and we do not. Trading carries a high risk of loss — SEBI studies have found that about 9 in 10 individual traders in equity F&O lost money. What we teach is how to understand and manage that risk.',
  },
];

export const CONTACT_SECTION = {
  index: '06',
  eyebrow: 'Contact',
  titleLine1: 'Talk to',
  description:
    'One direct line to the desk — no call centres, no queues. Message or call, and you talk to Somnath himself.',
};

// Short disclosure band shown above the footer on every page.
export const DISCLOSURE = {
  title: 'Education only',
  points: [
    { h: 'Not SEBI-registered', p: 'We are not registered with SEBI as an Investment Adviser or Research Analyst.' },
    { h: 'No tips or calls', p: 'We do not give buy/sell recommendations, signals or portfolio advice.' },
    { h: 'Your money stays yours', p: 'We never handle client funds or ask for your trading-account access.' },
    { h: 'High risk', p: 'About 9 in 10 individual F&O traders lose money (SEBI study). Never risk money you cannot afford to lose.' },
  ],
  linkLabel: 'Read the full disclaimer',
};

export const DISCLAIMER =
  'Risk disclaimer: trading in forex, commodities and equity derivatives carries a substantial risk of loss and is not suitable for every investor. Nothing on this page is investment advice. Baste Global Markets is not registered with SEBI as an Investment Adviser or Research Analyst; all content and courses are for education only.';
