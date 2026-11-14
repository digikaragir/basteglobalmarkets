import { CONTACT_SECTION as S } from '../../data/content';
import { SITE, waLink, telLink } from '../../config/site';
import { useReveal } from '../../hooks/useReveal';
import Reveal from '../motion/Reveal';
import Button from '../ui/Button';
import { WhatsAppIcon, PhoneIcon } from '../ui/Icons';
import './Contact.css';

const ROWS = [
  { label: 'Desk', value: SITE.founder },
  { label: 'Mobile', value: SITE.phoneDisplay, href: telLink, numeric: true },
  { label: 'WhatsApp', value: `wa.me/${SITE.whatsappNumber}`, href: `https://wa.me/${SITE.whatsappNumber}`, external: true, numeric: true },
  { label: 'Markets', value: 'Forex · Commodities · Indian F&O' },
  { label: 'Academy', value: 'Courses & 1-on-1 mentorship' },
];

export default function Contact() {
  const [listRef, listVisible] = useReveal();
  return (
    <section id="contact" className="section section--contact" aria-labelledby="contact-title">
      <div className="container contact">
        <Reveal className="contact__left">
          <p className="eyebrow">
            <span className="eyebrow__line" aria-hidden="true" />
            {S.index} — {S.eyebrow}
          </p>
          <h2 className="contact__title" id="contact-title">
            {S.titleLine1}
            <br />
            {SITE.founder}
            <span className="text-green">.</span>
          </h2>
          <p className="contact__desc">{S.description}</p>
          <div className="contact__ctas">
            <Button href={waLink({ source: 'Contact' })} data-cta="whatsapp-contact" external icon={WhatsAppIcon} className="btn--square">
              Chat on WhatsApp
            </Button>
            <Button href={telLink} data-cta="call-contact" variant="outline" icon={PhoneIcon} className="btn--square">
              <span className="tabular">{SITE.phoneDisplay}</span>
            </Button>
          </div>
        </Reveal>

        <dl ref={listRef} className={`contact__card ${listVisible ? 'is-visible' : ''}`}>
          {ROWS.map((r, i) => (
            <div key={r.label} className={`contact__row ${r.href ? 'contact__row--link' : ''}`} style={{ '--i': i }}>
              <dt>{r.label}</dt>
              <dd className={r.numeric ? 'tabular' : undefined}>
                {r.href ? (
                  <a href={r.href} {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {r.value}
                  </a>
                ) : (
                  r.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
