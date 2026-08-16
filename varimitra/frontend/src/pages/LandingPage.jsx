import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiDroplet, FiMapPin, FiShield, FiUsers } from 'react-icons/fi';
import { Brand } from '../components/Brand';
import { DevotionalQuote } from '../components/DevotionalQuote';
import { Footer } from '../components/Footer';

const features = [
  { icon: FiMapPin, title: 'Route with clarity', text: 'Follow official route stops, distance, coordinates, and halt points published by the Vari team.' },
  { icon: FiDroplet, title: 'Seva, close by', text: 'Find water camps linked to the route stop where service is available.' },
  { icon: FiShield, title: 'Travel prepared', text: 'Keep emergency actions and the medical-services handoff in one calm, accessible place.' },
];

export default function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-nav"><Brand /><nav><a href="#about">The Vari</a><a href="#seva">Features</a><Link className="nav-login" to="/login">Login</Link><Link className="nav-join" to="/register">Register <FiArrowRight /></Link></nav></header>
      <main>
        <section className="hero-section">
          <div className="hero-backdrop"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Syayambhuvithoba.jpg" alt="Vitthal of Pandharpur" /><span className="hero-glow" /></div>
          <div className="hero-content"><p className="eyebrow light">A digital companion for every Warkari</p><h1>Walk with <em>faith.</em><br />Travel with <em>care.</em></h1><DevotionalQuote /><p className="hero-copy">A gentle guide for the sacred journey to Pandharpur—official route information, water seva, night halts, events, and help when you need it.</p><div className="hero-actions"><Link className="primary-button" to="/register">Begin your Vari <FiArrowRight /></Link><Link className="secondary-button" to="/login">I already have an account</Link></div><div className="hero-meta"><span><FiUsers /> For every dindi</span><span><FiCalendar /> Ashadhi & Kartiki</span></div></div>
          <div className="hero-saffron-band"><span>जय जय राम कृष्ण हरी</span><i /><span>ज्ञानोबा माऊली तुकाराम</span><i /><span>विठ्ठल विठ्ठल जय हरी विठ्ठल</span></div>
        </section>
        <section id="about" className="landing-intro"><div><span className="eyebrow">The spirit of Pandhari</span><h2>One journey. <em>Millions</em> of prayers.</h2></div><p>The Wari brings people together in song, service, and steady footsteps. VariMitra keeps the useful details close—without taking away from the devotion of the walk.</p></section>
        <section id="seva" className="feature-section"><div className="section-heading"><span className="eyebrow">Designed for the road</span><h2>Thoughtful help, <em>at every stop.</em></h2></div><div className="feature-grid">{features.map(({ icon: Icon, title, text }) => <article key={title} className="feature-card"><span className="feature-icon"><Icon /></span><h3>{title}</h3><p>{text}</p><Link to="/register">Explore VariMitra <FiArrowRight /></Link></article>)}</div></section>
        <section className="landing-gallery"><div className="gallery-photo gallery-photo-main"><img src="https://upload.wikimedia.org/wikipedia/commons/1/12/A_procession_Palkhi_festival_Hindu_culture_religion_rites_rituals_sights.jpg" alt="Warkaris in a Palkhi procession" /></div><div className="gallery-copy"><span className="eyebrow">From dindi to darshan</span><h2>The rhythm of <em>devotion.</em></h2><p>Saffron flags, tal and mridang, shared water seva, and the Chandrabhaga—every part of the journey carries its own grace.</p><Link className="text-link" to="/register">Join the digital Vari <FiArrowRight /></Link></div><div className="gallery-photo gallery-photo-small"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Tukaram_Maharaj_palkhi_%28palanquin%29.jpg/1280px-Tukaram_Maharaj_palkhi_%28palanquin%29.jpg" alt="Tukaram Maharaj palkhi" /></div></section>
      </main>
      <Footer />
    </div>
  );
}
