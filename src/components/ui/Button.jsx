import './Button.css';

/**
 * Link-styled button.
 * variant: 'primary' (green filled) | 'outline' | 'ghost'
 * size: 'md' | 'sm' | 'lg'
 */
export default function Button({
  href,
  children,
  icon: Icon,
  variant = 'primary',
  size = 'md',
  external = false,
  className = '',
  ...rest
}) {
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a href={href} className={`btn btn--${variant} btn--${size} ${className}`} {...ext} {...rest}>
      {Icon && <Icon className="btn__icon" />}
      <span>{children}</span>
    </a>
  );
}
