import { CircleMarker, MapContainer, Polyline, Popup, TileLayer } from 'react-leaflet';
import { FiMapPin } from 'react-icons/fi';
import { EmptyState } from './StatusViews';

const validCoordinate = (stop) => Number.isFinite(Number(stop?.latitude)) && Number.isFinite(Number(stop?.longitude));

export function RouteMap({ stops = [], selectedStopId, className = '' }) {
  const mappedStops = stops.filter(validCoordinate);
  if (!mappedStops.length) {
    return <EmptyState icon={FiMapPin} title="Map coordinates are not published" detail="The backend route exists, but it does not yet include latitude and longitude for a mappable stop." />;
  }

  const points = mappedStops.map((stop) => [Number(stop.latitude), Number(stop.longitude)]);
  const center = points[Math.floor(points.length / 2)];
  return (
    <div className={`route-map ${className}`}>
      <MapContainer center={center} zoom={10} scrollWheelZoom={false} aria-label="Route map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.length > 1 && <Polyline positions={points} pathOptions={{ color: '#d97706', weight: 5, opacity: 0.82 }} />}
        {mappedStops.map((stop) => {
          const active = stop.id === selectedStopId;
          return (
            <CircleMarker key={stop.id} center={[Number(stop.latitude), Number(stop.longitude)]} radius={active ? 10 : 7} pathOptions={{ color: '#fffaf0', weight: 3, fillColor: active ? '#0f766e' : '#d97706', fillOpacity: 1 }}>
              <Popup><strong>{stop.stopName}</strong><br />{stop.district || 'District not published'}</Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
