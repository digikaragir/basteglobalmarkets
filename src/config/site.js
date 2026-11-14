// Central site configuration — change contact details here and they update everywhere.

export const SITE = {
  name: 'Baste Global Markets',
  founder: 'Somnath Baste',
  founderTitle: 'Founder & Lead Trader',
  phoneDisplay: '+91 75079 58364',
  phoneRaw: '+917507958364',
  whatsappNumber: '917507958364',
  year: new Date().getFullYear(),
};

/**
 * Structured WhatsApp message. Every WhatsApp button builds its text here so
 * Somnath receives the same, easy-to-scan format each time:
 *
 *   Hello Somnath,
 *
 *   *Enquiry:* Options Mastery course (Intermediate · 6 weeks)
 *
 *   *Name:*
 *   *City:*
 *   *Trading experience:* Beginner / Intermediate / Advanced
 *
 *   _Sent from the Baste Global Markets website · Courses_
 *
 * (*bold* and _italic_ are WhatsApp formatting.)
 *   topic  — what the enquiry is about
 *   source — which part of the site it came from (helps you see what works)
 *   start  — prefix the message with "START" (the course-guidance keyword)
 */
export function waMessage({ topic = 'Trading courses & mentorship', source = '', start = false } = {}) {
  return [
    ...(start ? ['START', ''] : []),
    'Hello Somnath,',
    '',
    `*Enquiry:* ${topic}`,
    '',
    '*Name:* ',
    '*City:* ',
    '*Trading experience:* Beginner / Intermediate / Advanced',
    '',
    `_Sent from the ${SITE.name} website${source ? ` · ${source}` : ''}_`,
  ].join('\n');
}

/** WhatsApp deep link. Pass a message string, or an options object for waMessage(). */
export const waLink = (message = {}) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    typeof message === 'string' ? message : waMessage(message)
  )}`;

export const telLink = `tel:${SITE.phoneRaw}`;

export const NAV_LINKS = [
  { id: 'markets', label: 'Markets' },
  { id: 'courses', label: 'Courses' },
  { id: 'contact', label: 'Contact' },
];

export const LEGAL_LINKS = [
  { href: '/disclaimer/', label: 'Disclaimer' },
  { href: '/privacy/', label: 'Privacy' },
  { href: '/terms/', label: 'Terms' },
];
