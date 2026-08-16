export const formatDate = (value, options = { day: 'numeric', month: 'short', year: 'numeric' }) => {
  if (!value) return 'Not published';
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en-IN', options).format(date);
};

export const formatDistance = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? `${number.toLocaleString('en-IN', { maximumFractionDigits: 1 })} km` : 'Not published';
};

export const firstName = (name) => name?.trim()?.split(/\s+/)[0] || 'Warkari';

export const toMapUrl = (latitude, longitude) => (
  latitude != null && longitude != null
    ? `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
    : null
);

export const sortedStops = (route) => [...(route?.stops || [])].sort((a, b) => a.stopNumber - b.stopNumber);
