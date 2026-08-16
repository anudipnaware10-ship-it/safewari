import { useMemo, useState } from 'react';
import { FiAlertCircle, FiCheckCircle, FiMapPin, FiMoon, FiNavigation } from 'react-icons/fi';
import { PageHeader } from '../components/PageHeader';
import { RouteMap } from '../components/RouteMap';
import { EmptyState, ErrorState, InlineLoader } from '../components/StatusViews';
import { useRoutesData } from '../hooks/useRoutesData';
import { sortedStops, toMapUrl } from '../utils/format';

export default function MukkamPage() {
  const { data: routes, loading, error, refresh } = useRoutesData();
  const route = routes?.[0];
  const halts = useMemo(() => sortedStops(route).filter((stop) => stop.haltPoint), [route]);
  const [haltId, setHaltId] = useState('');
  const activeHalt = halts.find((stop) => String(stop.id) === haltId) || halts[0];
  const navigationUrl = activeHalt && toMapUrl(activeHalt.latitude, activeHalt.longitude);
  if (loading) return <InlineLoader label="Finding published night halts…" />;
  return <div className="content-page"><PageHeader eyebrow="Most useful on the road" title="Tonight’s Mukkam" description="Night halts are identified from route stops where haltPoint is true." />{error ? <ErrorState message={error} onRetry={refresh} /> : !route ? <EmptyState title="No route available" detail="A route is required before a Mukkam can be shown." /> : !activeHalt ? <EmptyState icon={FiMoon} title="No night halt is published" detail="The selected route has no stop marked as a halt point in the backend yet." /> : <><section className="mukkam-hero"><div><span className="mukkam-icon"><FiMoon /></span><span className="eyebrow light">Official halt point</span><h1>{activeHalt.stopName}</h1><p><FiMapPin /> {[activeHalt.district, activeHalt.taluka].filter(Boolean).join(', ') || 'Address details not published'}</p>{halts.length > 1 && <label>Choose a published halt<select value={haltId} onChange={(event) => setHaltId(event.target.value)}><option value="">{halts[0].stopName}</option>{halts.slice(1).map((halt) => <option value={halt.id} key={halt.id}>{halt.stopName}</option>)}</select></label>}<div className="mukkam-actions">{navigationUrl ? <a className="primary-button" href={navigationUrl} target="_blank" rel="noreferrer"><FiNavigation /> Navigate to halt</a> : <span className="muted-action"><FiAlertCircle /> Map coordinates not published</span>}</div></div><RouteMap stops={[activeHalt]} selectedStopId={activeHalt.id} /></section><section className="mukkam-info-grid"><article><span><FiMapPin /></span><h3>Address</h3><p>{[activeHalt.stopName, activeHalt.taluka, activeHalt.district].filter(Boolean).join(', ') || 'Not published by the route API.'}</p></article><article><span><FiCheckCircle /></span><h3>Facilities</h3><p>Facility details are not yet provided by the route-stop model. This area is ready for the official service feed.</p></article><article><span><FiMoon /></span><h3>Estimated arrival</h3><p>The backend does not expose an arrival-time or schedule field for stops.</p></article></section><p className="data-note">No fallback halt has been invented: this screen only highlights a stop explicitly marked <code>haltPoint: true</code>.</p></>}</div>;
}
