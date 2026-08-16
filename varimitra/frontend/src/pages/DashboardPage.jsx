import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiActivity, FiArrowRight, FiCalendar, FiCloud, FiDroplet, FiMapPin, FiMoon, FiNavigation, FiShield, FiSun } from 'react-icons/fi';
import { platformApi } from '../api/platform';
import { DevotionalQuote } from '../components/DevotionalQuote';
import { ErrorState, InlineLoader, EmptyState } from '../components/StatusViews';
import { useAsyncData } from '../hooks/useAsyncData';
import { useAuth } from '../hooks/useAuth';
import { firstName, formatDate, formatDistance, sortedStops } from '../utils/format';

const quickLinks = [
  { to: '/live', icon: FiActivity, title: 'Live Tracking', copy: 'View route markers' },
  { to: '/mukkam', icon: FiMoon, title: 'Tonight’s Stay', copy: 'Find halt points' },
  { to: '/water', icon: FiDroplet, title: 'Water Facility', copy: 'See water camps' },
  { to: '/medical', icon: FiShield, title: 'Emergency Help', copy: 'Quick actions' },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [now, setNow] = useState(() => new Date());
  const { data, loading, error, refresh } = useAsyncData(async () => {
    const [routes, waterPoints, events, weather] = await Promise.all([platformApi.routes(), platformApi.waterPoints(), platformApi.events(), platformApi.weather()]);
    return { routes, waterPoints, events, weather };
  }, []);
  useEffect(() => { const timer = window.setInterval(() => setNow(new Date()), 1000); return () => window.clearInterval(timer); }, []);
  const route = data?.routes?.[0];
  const stops = useMemo(() => sortedStops(route), [route]);
  const start = stops[0];
  const firstHalt = stops.find((stop) => stop.haltPoint);
  const event = data?.events?.slice().sort((a, b) => String(a.date).localeCompare(String(b.date)))[0];
  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 18 ? 'Good afternoon' : 'Good evening';

  if (loading) return <InlineLoader label="Loading your Vari dashboard…" />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;
  return <div className="dashboard-page"><section className="dashboard-welcome"><div><span className="eyebrow">{greeting}, {firstName(user?.name)}</span><h1>Welcome to <em>Digital Vitthal Vari</em></h1><DevotionalQuote /><p>{now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} <span>·</span> {now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p></div><div className="weather-chip"><FiCloud /><span><b>{data.weather?.Temperature || '—'}</b><small>{data.weather?.Condition || 'Weather unavailable'}</small></span><em>{data.weather?.Humidity ? `${data.weather.Humidity} humidity` : ''}</em></div></section><section className="vitthal-banner"><div><span className="eyebrow light">A steady companion</span><h2>Every step towards<br /><em>Pandharpur.</em></h2><p>Your dashboard uses the routes, water points, events, and weather published by the VariMitra backend.</p><Link className="banner-link" to="/route">Open route timeline <FiArrowRight /></Link></div><img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Syayambhuvithoba.jpg" alt="Vitthal" /></section><section className="quick-grid">{quickLinks.map(({ to, icon: Icon, title, copy }) => <Link to={to} className="quick-card" key={title}><span><Icon /></span><div><h3>{title}</h3><p>{copy}</p></div><FiArrowRight /></Link>)}</section><section className="dashboard-section-heading"><div><span className="eyebrow">Journey snapshot</span><h2>Today’s route details</h2></div><Link className="text-link" to="/route">Full timeline <FiArrowRight /></Link></section>{route ? <section className="snapshot-grid"><article className="snapshot-card"><span className="snapshot-icon"><FiNavigation /></span><p>Starting location</p><h3>{route.startLocation || start?.stopName || 'Not published'}</h3><small>{start ? `Stop ${start.stopNumber} · ${formatDistance(start.distanceFromStart)} from route start` : 'No route stops published'}</small></article><article className="snapshot-card highlighted"><span className="snapshot-icon"><FiMapPin /></span><p>Current location</p><h3>Live location not published</h3><small>The backend has route-stop coordinates but no active GPS location feed.</small><Link to="/live">View available map <FiArrowRight /></Link></article><article className="snapshot-card"><span className="snapshot-icon"><FiMoon /></span><p>Night stay · Mukkam</p><h3>{firstHalt?.stopName || 'No halt point published'}</h3><small>{firstHalt ? `${firstHalt.district || 'District not published'} · ${firstHalt.taluka || 'Taluka not published'}` : 'Halt information will appear here when added.'}</small></article><article className="snapshot-card"><span className="snapshot-icon"><FiMapPin /></span><p>Final destination</p><h3>{route.endLocation || 'Not published'}</h3><small>{formatDistance(route.totalDistance)} total route distance</small></article></section> : <EmptyState title="No route has been published" detail="The dashboard is connected to GET /routes. Add a route in the backend to see its journey snapshot." /> }<section className="dashboard-bottom-grid"><article className="event-preview"><div className="card-heading"><div><span className="eyebrow">Upcoming event</span><h2>Vari calendar</h2></div><FiCalendar /></div>{event ? <><span className="event-date">{formatDate(event.date)}</span><h3>{event.title}</h3><p>{event.description || 'Description not published.'}</p><small><FiMapPin /> {event.location || 'Venue not published'}</small><Link className="text-link" to="/events">See all events <FiArrowRight /></Link></> : <EmptyState title="No events published" detail="Events from GET /events will appear here." />}</article><article className="water-preview"><div className="card-heading"><div><span className="eyebrow">Seva nearby</span><h2>Water facilities</h2></div><FiDroplet /></div><strong>{data.waterPoints?.length || 0}</strong><p>water point{data.waterPoints?.length === 1 ? '' : 's'} currently listed by the backend.</p><Link to="/water" className="primary-button small">Find water seva <FiArrowRight /></Link></article></section></div>;
}
