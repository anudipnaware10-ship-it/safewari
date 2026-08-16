import { FiCalendar, FiClock, FiMapPin, FiUsers } from 'react-icons/fi';
import { platformApi } from '../api/platform';
import { PageHeader } from '../components/PageHeader';
import { EmptyState, ErrorState, InlineLoader } from '../components/StatusViews';
import { useAsyncData } from '../hooks/useAsyncData';
import { formatDate } from '../utils/format';

export default function EventsPage() {
  const { data: events, loading, error, refresh } = useAsyncData(platformApi.events, []);
  const sortedEvents = events?.slice().sort((a, b) => String(a.date).localeCompare(String(b.date)));
  if (loading) return <InlineLoader label="Loading Vari events…" />;
  return <div className="content-page"><PageHeader eyebrow="Sangati & celebration" title="Vari Events" description="Upcoming events from the supplied backend, presented with only the dates and details that are actually published." />{error ? <ErrorState message={error} onRetry={refresh} /> : !sortedEvents?.length ? <EmptyState icon={FiCalendar} title="No events published" detail="GET /events did not return an event. Add one in the backend to display it here." /> : <section className="events-grid">{sortedEvents.map((event) => <article className="event-card" key={event.id}><div className="event-day"><span>{event.date ? new Date(`${event.date}T00:00:00`).getDate() : '—'}</span><small>{event.date ? new Intl.DateTimeFormat('en-IN', { month: 'short' }).format(new Date(`${event.date}T00:00:00`)) : 'date'}</small></div><div className="event-main"><span className="eyebrow">{formatDate(event.date)}</span><h2>{event.title || 'Untitled event'}</h2><p>{event.description || 'No description published for this event.'}</p><div className="event-details"><span><FiMapPin /> {event.location || 'Venue not published'}</span><span><FiUsers /> {event.organizer || 'Organizer not published'}</span><span><FiClock /> Time not published</span></div></div></article>)}</section>}</div>;
}
