import { FiHeart, FiRefreshCw } from 'react-icons/fi';
import { DevotionalQuote } from '../components/DevotionalQuote';
import { devotionalQuotes, useQuote } from '../hooks/useQuote';

export default function InspirationPage() {
  const { quote, index } = useQuote(5200);
  return <div className="content-page inspiration-page"><span className="eyebrow">A moment of stillness</span><h1>Daily <em>Inspiration</em></h1><section className="inspiration-hero"><div className="quote-orbit"><FiHeart /></div><p key={index} className="inspiration-quote">{quote}</p><span>Marathi devotional invocation</span><div className="quote-dots">{devotionalQuotes.map((_, dot) => <i className={dot === index ? 'active' : ''} key={dot} />)}</div></section><section className="abhang-grid"><article><span>01</span><p>ज्ञानोबा माऊली तुकाराम</p><small>In the name of the saints, the road becomes a shared prayer.</small></article><article><span>02</span><p>अवघा रंग एक झाला</p><small>In devotion, every difference softens into one color.</small></article><article><span>03</span><p>पांडुरंग हरी वासुदेव हरी</p><small>A refrain to carry quietly through the day’s walk.</small></article></section></div>;
}
