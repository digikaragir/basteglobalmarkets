import { LEGAL } from '../../data/legal';
import { SITE, LEGAL_LINKS, waLink } from '../../config/site';
import Button from '../ui/Button';
import Footer from '../layout/Footer';
import Disclosure from '../layout/Disclosure';
import { WhatsAppIcon } from '../ui/Icons';
import './LegalPage.css';

/** Shared layout for /disclaimer/, /privacy/ and /terms/. Content lives in src/data/legal.js. */
export default function LegalPage({ page }) {
  const doc = LEGAL[page];
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="legal-nav">
        <div className="container legal-nav__inner">
          <a href="/" className="legal-nav__brand">{SITE.name.toUpperCase()}</a>
          <a href="/" className="legal-nav__back">← Back to site</a>
        </div>
      </header>

      <main id="main" tabIndex={-1} className="legal">
        <div className="container legal__inner">
          <nav className="legal__tabs" aria-label="Legal pages">
            {LEGAL_LINKS.map((l) => (
              <a key={l.href} href={l.href} aria-current={l.href === `/${page}/` ? 'page' : undefined}>
                {l.label}
              </a>
            ))}
          </nav>

          <h1 className="legal__title">{doc.title}<span className="text-green">.</span></h1>
          <p className="legal__updated">Last updated · <span className="tabular">{doc.updated}</span></p>
          <p className="legal__intro">{doc.intro}</p>

          {doc.sections.map((s) => (
            <section key={s.h} className="legal__section">
              <h2>{s.h}</h2>
              {s.p?.map((p) => <p key={p}>{p}</p>)}
              {s.list && (
                <ul>
                  {s.list.map((li) => <li key={li}>{li}</li>)}
                </ul>
              )}
            </section>
          ))}

          <div className="legal__cta">
            <p>Questions about this page?</p>
            <Button
              href={waLink({ topic: `Question about the ${doc.title.toLowerCase()} page`, source: doc.title })}
              data-cta={`whatsapp-legal-${page}`}
              external
              icon={WhatsAppIcon}
              size="sm"
              className="btn--square"
            >
              Ask on WhatsApp
            </Button>
          </div>
        </div>
      </main>

      {page !== 'disclaimer' && <Disclosure />}
      <Footer home={false} />
    </>
  );
}
