import { useCountUp } from '../../hooks/useCountUp';

/**
 * Animated number. Screen readers get the final value immediately via the
 * visually-hidden copy; the animating digits are aria-hidden.
 */
export default function CountUp({ end, start, prefix = '', suffix = '', duration }) {
  const value = useCountUp(end, start, duration);
  return (
    <>
      <span aria-hidden="true" className="tabular">
        {prefix}
        {value}
        {suffix}
      </span>
      <span className="visually-hidden">
        {prefix}
        {end}
        {suffix}
      </span>
    </>
  );
}
