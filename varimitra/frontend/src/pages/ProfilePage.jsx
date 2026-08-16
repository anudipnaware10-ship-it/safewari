import { useEffect, useState } from 'react';
import { FiCheckCircle, FiEdit3, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import { platformApi } from '../api/platform';
import { PageHeader } from '../components/PageHeader';
import { ErrorState, InlineLoader } from '../components/StatusViews';
import { useAsyncData } from '../hooks/useAsyncData';
import { useAuth } from '../hooks/useAuth';
import { firstName } from '../utils/format';

export default function ProfilePage() {
  const { user, updateStoredUser } = useAuth();
  const { data: profile, loading, error, refresh } = useAsyncData(() => platformApi.user(user.id), [user.id]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', mobile: '', email: '' });
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');
  useEffect(() => { if (profile) setForm({ name: profile.name || '', mobile: profile.mobile || '', email: profile.email || '' }); }, [profile]);
  const save = async (event) => {
    event.preventDefault();
    setSaveError('');
    try {
      // UserService.updateUser overwrites password, so preserve its already-hashed value without displaying it.
      const updated = await platformApi.updateUser(profile.id, { ...form, password: profile.password, role: profile.role || 'USER' });
      updateStoredUser(updated);
      setEditing(false); setSaved(true); window.setTimeout(() => setSaved(false), 3500);
    } catch (reason) { setSaveError(reason.message || 'Could not update your profile.'); }
  };
  if (loading) return <InlineLoader label="Loading your profile…" />;
  if (error || !profile) return <ErrorState message={error || 'Your profile was not returned by the backend.'} onRetry={refresh} />;
  return <div className="content-page"><PageHeader eyebrow="Your VariMitra account" title="My Profile" description="View and update the profile held by the backend’s user API." action={<button className="outline-button" type="button" onClick={() => setEditing((value) => !value)}><FiEdit3 /> {editing ? 'Cancel editing' : 'Edit profile'}</button>} />{saved && <div className="save-notice"><FiCheckCircle /> Profile updated successfully.</div>}<section className="profile-layout"><aside className="profile-card"><span className="profile-avatar">{firstName(profile.name)[0]?.toUpperCase()}</span><h2>{profile.name || 'VariMitra user'}</h2><p>{profile.role || 'USER'}</p><div><span><FiPhone /> {profile.mobile || 'Not published'}</span><span><FiMail /> {profile.email || 'Not published'}</span></div></aside><article className="profile-details"><div className="card-heading"><div><span className="eyebrow">Profile details</span><h2>{editing ? 'Make your changes' : 'Your registered details'}</h2></div></div>{saveError && <div className="form-error">{saveError}</div>}{editing ? <form className="profile-form" onSubmit={save}><label>Name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label><label>Mobile number<input inputMode="numeric" maxLength="10" value={form.mobile} onChange={(event) => setForm({ ...form, mobile: event.target.value.replace(/\D/g, '') })} /></label><label>Email address<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label><button className="primary-button" type="submit">Save profile</button></form> : <dl className="profile-list"><div><dt><FiUser /> Name</dt><dd>{profile.name || 'Not published'}</dd></div><div><dt><FiPhone /> Mobile</dt><dd>{profile.mobile || 'Not published'}</dd></div><div><dt><FiMail /> Email</dt><dd>{profile.email || 'Not published'}</dd></div><div><dt>Role</dt><dd>{profile.role || 'Not published'}</dd></div></dl>}</article></section></div>;
}
