import { useReveal } from '../../hooks/useReveal';

/**
 * <Reveal as="li" delay={0.1}>…</Reveal>
 * Fades + lifts its content in the first time it scrolls into view.
 * Timing lives in styles/motion.css (--dur, --reveal-y, --ease).
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--delay': `${delay}s`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
