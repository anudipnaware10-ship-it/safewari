import { FiClock, FiDroplet, FiMapPin, FiNavigation, FiPhone } from 'react-icons/fi';
import { platformApi } from '../api/platform';
import { PageHeader } from '../components/PageHeader';
import { EmptyState, ErrorState, InlineLoader } from '../components/StatusViews';
import { useAsyncData } from '../hooks/useAsyncData';
import { toMapUrl } from '../utils/format';

export default function WaterPointsPage() {
  const { data: waterPoints, loading, error, refresh } = useAsyncData(platformApi.waterPoints, []);
  if (loading) return <InlineLoader label="Loading water-seva points…" />;
  return <div className="content-page"><PageHeader eyebrow="Seva on the path" title="Water Facilities" description="Water camp details are loaded from the backend’s water point API." />{error ? <ErrorState message={error} onRetry={refresh} /> : !waterPoints?.length ? <EmptyState icon={FiDroplet} title="No water points published" detail="GET /waterpoints returned no camps. Add an official water facility in the backend to show it here." /> : <section className="water-grid">{waterPoints.map((point) => { const mapUrl = toMapUrl(point.routeStop?.latitude, point.routeStop?.longitude); return <article className="water-card" key={point.id}><div className="water-card-head"><span className="water-icon"><FiDroplet /></span><span className={point.available ? 'availability open' : 'availability'}>{point.available ? 'Available' : 'Unavailable'}</span></div><h2>{point.campName || 'Unnamed water camp'}</h2><p className="water-location"><FiMapPin /> {point.routeStop?.stopName || 'Route stop not published'}{point.routeStop?.district ? ` · ${point.routeStop.district}` : ''}</p><p>{point.description || 'No camp description published.'}</p><dl><div><dt><FiClock /> Hours</dt><dd>{point.openingTime || '—'} – {point.closingTime || '—'}</dd></div><div><dt><FiPhone /> Contact</dt><dd>{point.contactNumber ? <a href={`tel:${point.contactNumber}`}>{point.contactNumber}</a> : 'Not published'}</dd></div></dl><div className="water-actions">{mapUrl ? <a href={mapUrl} target="_blank" rel="noreferrer"><FiNavigation /> Navigate</a> : <span>Coordinates not published</span>}</div></article>; })}</section>}</div>;
}
