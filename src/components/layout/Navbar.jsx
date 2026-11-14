import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS, SITE, waLink } from '../../config/site';
import { useScrollSpy, useScrolled } from '../../hooks/useScrollSpy';
import Button from '../ui/Button';
import { WhatsAppIcon, MenuIcon, CloseIcon } from '../ui/Icons';
import InstallButton from '../pwa/InstallButton';
import './Navbar.css';

const ids = NAV_LINKS.map((l) => l.id);
const FOCUSABLE = 'a[href], button:not([disabled])';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(ids);
  const scrolled = useScrolled(12);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);
  const wasOpen = useRef(false);

  // Mobile menu: body scroll lock, Esc to close, focus in on open / back to the toggle on close,
  // and Tab cycles between the toggle and the menu links while open.
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
      if (wasOpen.current) toggleRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    document.body.style.overflow = 'hidden';
    menuRef.current?.querySelector(FOCUSABLE)?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const items = [toggleRef.current, ...menuRef.current.querySelectorAll(FOCUSABLE)];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Close the mobile menu if the viewport grows to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const on = () => mq.matches && setOpen(false);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__brand" onClick={close}>
          {SITE.name.toUpperCase()}
        </a>

        <nav className="nav__center" aria-label="Primary">
          <span className="nav__live">
            <span className="nav__dot" aria-hidden="true" /> Global Desk · Live
          </span>
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`nav__link ${active === l.id ? 'is-active' : ''}`}
              aria-current={active === l.id ? 'true' : undefined}
            >
              {l.label}
            </a>
          ))}
          <InstallButton variant="nav" />
        </nav>

        <Button href={waLink({ source: 'Navigation' })} data-cta="whatsapp-nav" external icon={WhatsAppIcon} size="sm" className="nav__cta">
          WhatsApp the desk
        </Button>

        <button
          ref={toggleRef}
          className="nav__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <nav
        id="mobile-menu"
        ref={menuRef}
        className={`nav__mobile ${open ? 'is-open' : ''}`}
        hidden={!open}
        aria-label="Mobile"
      >
        <span className="nav__live">
          <span className="nav__dot" aria-hidden="true" /> Global Desk · Live
        </span>
        {NAV_LINKS.map((l, i) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={`nav__mobile-link ${active === l.id ? 'is-active' : ''}`}
            onClick={close}
            style={{ '--i': i }}
          >
            <span aria-hidden="true">0{i + 1}</span>
            {l.label}
          </a>
        ))}
        <div className="nav__mobile-foot" style={{ '--i': NAV_LINKS.length }}>
          <InstallButton variant="menu" onDone={close} />
          <Button
            href={waLink({ source: 'Mobile menu' })}
            data-cta="whatsapp-menu"
            external
            icon={WhatsAppIcon}
            size="lg"
            onClick={close}
            className="nav__mobile-cta"
          >
            WhatsApp the desk
          </Button>
        </div>
      </nav>
    </header>
  );
}
