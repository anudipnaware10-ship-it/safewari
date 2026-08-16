import { FiAlertCircle, FiInbox, FiLoader, FiRefreshCw } from 'react-icons/fi';

export function InlineLoader({ label = 'Loading seva details…' }) {
  return <div className="inline-state"><FiLoader className="spin" />{label}</div>;
}

export function EmptyState({ title = 'Nothing published yet', detail = 'This information will appear when it is available from the official backend.', icon: Icon = FiInbox, action }) {
  return (
    <div className="empty-state">
      <Icon />
      <div><h3>{title}</h3><p>{detail}</p>{action}</div>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <FiAlertCircle />
      <div><strong>Couldn’t load this information.</strong><p>{message}</p></div>
      {onRetry && <button className="icon-button" type="button" onClick={onRetry} aria-label="Try again"><FiRefreshCw /></button>}
    </div>
  );
}
