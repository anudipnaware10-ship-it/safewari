import { Link } from 'react-router-dom';

export function Brand({ to = '/', compact = false }) {
  return (
    <Link to={to} className="brand" aria-label="VariMitra home">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
      {!compact && <span><b>Vari</b><em>Mitra</em></span>}
    </Link>
  );
}
