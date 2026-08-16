import { FiAlertTriangle, FiHeart, FiMapPin, FiPhone, FiPlusCircle, FiShield } from 'react-icons/fi';
import { PageHeader } from '../components/PageHeader';

const emergencyActions = [
  { number: '108', label: 'Ambulance', detail: 'Medical emergency ambulance service', icon: FiHeart, color: 'red' },
  { number: '112', label: 'Police & emergency', detail: 'National emergency response', icon: FiShield, color: 'blue' },
  { number: '101', label: 'Fire service', detail: 'Fire and rescue emergency', icon: FiAlertTriangle, color: 'orange' },
];

export default function MedicalPage() {
  return <div className="content-page"><PageHeader eyebrow="Help at hand" title="Medical & Emergency Services" description="Quick emergency actions are ready now; verified medical-location data will appear once the backend publishes it." /><section className="emergency-banner"><div><span className="emergency-pulse"><FiPlusCircle /></span><span className="eyebrow light">Emergency support</span><h2>Need urgent help?</h2><p>Call the appropriate emergency service immediately. Do not rely on a web page for time-critical care.</p></div><a className="emergency-call" href="tel:112"><FiPhone /> Call 112</a></section><section className="emergency-actions">{emergencyActions.map(({ number, label, detail, icon: Icon, color }) => <a key={number} className={`emergency-card ${color}`} href={`tel:${number}`}><span><Icon /></span><div><small>{number}</small><h2>{label}</h2><p>{detail}</p></div><FiPhone /></a>)}</section><section className="medical-unavailable"><div className="medical-illustration"><FiMapPin /><span /><span /><span /></div><div><span className="eyebrow">Integration ready</span><h2>Verified clinics and camps<br /><em>are not published yet.</em></h2><p>The uploaded backend does not have a medical-facility controller or endpoint. To protect pilgrims from inaccurate information, this app does not show invented hospitals, ambulances, medical camps, or first-aid locations.</p><div className="medical-ready-list"><span>✓ Medical camp name and hours</span><span>✓ Facility location and navigation</span><span>✓ First-aid and emergency contacts</span></div></div></section><p className="data-note">When a medical endpoint is added, this screen can consume it without a layout redesign.</p></div>;
}
