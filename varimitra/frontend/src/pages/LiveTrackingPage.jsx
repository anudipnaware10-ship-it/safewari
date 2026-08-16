import { useMemo } from 'react';
import { FiActivity, FiClock, FiMapPin, FiNavigation, FiWifiOff } from 'react-icons/fi';
import { PageHeader } from '../components/PageHeader';
import { RouteMap } from '../components/RouteMap';
import { EmptyState, ErrorState, InlineLoader } from '../components/StatusViews';
import { useRoutesData } from '../hooks/useRoutesData';
import { formatDistance, sortedStops } from '../utils/format';

export default function LiveTrackingPage() {
  const { data: routes, loading, error, refresh } = useRoutesData();
  const route = routes?.[0];
  const stops = useMemo(() => sortedStops(route), [route]);
  const lastCoordinate = [...stops].reverse().find((stop) => stop.latitude != null && stop.longitude != null);
  if (loading) return <InlineLoader label="Loading route coordinates…" />;
  return <div className="content-page"><PageHeader eyebrow="Route coordinates" title="Live Vari Tracking" description="Map markers are drawn from the latitude and longitude stored on route stops by the backend." />{error ? <ErrorState message={error} onRetry={refresh} /> : !route ? <EmptyState title="No route to track" detail="GET /routes has not returned a route yet." /> : <><div className="tracking-notice"><FiWifiOff /><div><strong>Live GPS is not exposed by the current backend.</strong><p>This screen shows the latest published route-stop coordinates—not a fabricated moving position.</p></div></div><section className="live-grid"><article className="live-map-card"><RouteMap stops={stops} selectedStopId={lastCoordinate?.id} /></article><aside className="tracking-details"><span className="eyebrow">Published route</span><h2>{route.routeName || `${route.startLocation || 'Start'} to ${route.endLocation || 'destination'}`}</h2><div className="tracking-stat"><FiNavigation /><span><small>Current marker</small><b>{lastCoordinate?.stopName || 'No coordinate marker'}</b></span></div><div className="tracking-stat"><FiMapPin /><span><small>Route path</small><b>{stops.length} published stops</b></span></div><div className="tracking-stat"><FiActivity /><span><small>Distance</small><b>{formatDistance(route.totalDistance)}</b></span></div><div className="tracking-stat"><FiClock /><span><small>Last updated</small><b>Not provided by API</b></span></div></aside></section><section className="tracking-legend"><span><i className="legend-dot saffron" /> Published route stop</span><span><i className="legend-dot teal" /> Latest mapped stop</span><span>For a real-time marker and update time, publish a location endpoint in the backend.</span></section></>}</div>;
}
