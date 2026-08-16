import { useAsyncData } from '../hooks/useAsyncData';
import { platformApi } from '../api/platform';
import { FiHeart, FiPhone } from 'react-icons/fi';

export function Footer() {
  const { data: contact } = useAsyncData(platformApi.contact, []);
  return (
    <footer className="site-footer">
      <div className="footer-curve" />
      <div className="footer-inner">
        <div><p className="footer-mantra">ज्ञानोबा माऊली तुकाराम</p><p>VariMitra is a calm, practical companion for every step of the Pandharpur Vari.</p></div>
        <div><h3>Emergency</h3><a href="tel:112"><FiPhone /> 112 · National Emergency</a><a href="tel:108"><FiPhone /> 108 · Ambulance</a></div>
        <div><h3>Support</h3><a href={`mailto:${contact?.Email || 'support@varimitra.com'}`}>{contact?.Email || 'Support contact loading…'}</a><span>{contact?.Location || 'Pandharpur Vari'}</span></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} VariMitra</span><span>Made with <FiHeart /> for the Warkari community</span><a href="#privacy">Privacy</a></div>
    </footer>
  );
}
