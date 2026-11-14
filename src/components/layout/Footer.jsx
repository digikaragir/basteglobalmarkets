import { SITE, LEGAL_LINKS } from '../../config/site';
import { DISCLAIMER } from '../../data/content';
import InstallButton from '../pwa/InstallButton';
import './Footer.css';

export default function Footer({ home = true }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href={home ? '#top' : '/'} className="footer__brand">{SITE.name.toUpperCase()}</a>
        <p className="footer__disclaimer">{DISCLAIMER}</p>
        <p className="footer__copy">© {SITE.year} {SITE.name.toUpperCase()}</p>
      </div>
      <div className="container footer__bar">
        <nav className="footer__legal" aria-label="Legal">
          {LEGAL_LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <InstallButton variant="footer" />
      </div>
    </footer>
  );
}
