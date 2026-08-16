import { FiCamera, FiExternalLink } from 'react-icons/fi';
import { PageHeader } from '../components/PageHeader';

const galleryItems = [
  { title: 'Vitthal of Pandharpur', kind: 'vitthal', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Syayambhuvithoba.jpg', credit: 'Public-domain image via Wikimedia Commons' },
  { title: 'Palkhi procession', kind: 'procession', image: 'https://upload.wikimedia.org/wikipedia/commons/1/12/A_procession_Palkhi_festival_Hindu_culture_religion_rites_rituals_sights.jpg', credit: 'Shubhi Shrivastava · CC BY 2.0' },
  { title: 'Tukaram Maharaj Palkhi', kind: 'palkhi', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Tukaram_Maharaj_palkhi_%28palanquin%29.jpg/1280px-Tukaram_Maharaj_palkhi_%28palanquin%29.jpg', credit: 'Yogee23 · CC BY-SA 4.0' },
  { title: 'Saffron flags', kind: 'flags', credit: 'Illustrated Vari motif' },
  { title: 'Chandrabhaga', kind: 'river', credit: 'Illustrated Vari motif' },
  { title: 'Tal & Mridang', kind: 'music', credit: 'Illustrated Vari motif' },
  { title: 'Dindi rhythms', kind: 'dindi', credit: 'Illustrated Vari motif' },
  { title: 'Ashadhi Ekadashi', kind: 'ekadashi', credit: 'Illustrated Vari motif' },
];

export default function GalleryPage() {
  return <div className="content-page"><PageHeader eyebrow="A visual offering" title="Devotional Gallery" description="A curated visual tribute to the people, places, and rhythms of the Pandharpur Vari." /><section className="gallery-grid">{galleryItems.map((item) => <article key={item.title} className={`gallery-item ${item.kind}`}>{item.image ? <img src={item.image} alt={item.title} /> : <div className="gallery-illustration"><i /><i /><i /></div>}<div className="gallery-overlay"><span><FiCamera /> {item.credit}</span><h2>{item.title}</h2></div></article>)}</section><p className="gallery-attribution">Photo attributions and licenses are documented in <code>ATTRIBUTIONS.md</code>. Illustrated tiles are CSS-native motifs, not claims of official imagery.</p></div>;
}
