import { useEffect, useState } from 'react';

export const devotionalQuotes = [
  'जय जय राम कृष्ण हरी',
  'ज्ञानोबा माऊली तुकाराम',
  'विठ्ठल विठ्ठल जय हरी विठ्ठल',
  'अवघा रंग एक झाला',
  'पांडुरंग हरी वासुदेव हरी',
];

export function useQuote(interval = 4600) {
  const [index, setIndex] = useState(() => new Date().getDate() % devotionalQuotes.length);
  useEffect(() => {
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % devotionalQuotes.length), interval);
    return () => window.clearInterval(timer);
  }, [interval]);
  return { quote: devotionalQuotes[index], index };
}
