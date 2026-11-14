import { useEffect, useState } from 'react';
import { waLink } from '../../config/site';
import { useScrolled } from '../../hooks/useScrollSpy';
import { WhatsAppIcon } from '../ui/Icons';
import './FloatingWhatsApp.css';

/** True while the element with `id` is on screen. */
function useSectionInView(id) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [id]);
  return inView;
}

/**
 * Floating WhatsApp button: appears after 500px of scroll, and steps aside
 * while the Contact section (which has its own WhatsApp CTA) is on screen.
 */
export default function FloatingWhatsApp() {
  const scrolled = useScrolled(500);
  const contactInView = useSectionInView('contact');
  const show = scrolled && !contactInView;
  return (
    <a
      href={waLink({ source: 'Floating button' })}
      data-cta="whatsapp-floating"
      target="_blank"
      rel="noopener noreferrer"
      className={`fab ${show ? 'is-visible' : ''}`}
      aria-label="Chat with Somnath on WhatsApp"
      aria-hidden={show ? undefined : 'true'}
      tabIndex={show ? 0 : -1}
    >
      <WhatsAppIcon width={26} height={26} />
    </a>
  );
}
