import { useQuote } from '../hooks/useQuote';

export function DevotionalQuote({ className = '' }) {
  const { quote, index } = useQuote();
  return <p key={index} className={`devotional-quote ${className}`}>{quote}</p>;
}
