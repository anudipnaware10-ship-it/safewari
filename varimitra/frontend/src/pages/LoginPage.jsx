import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEye, FiEyeOff, FiLock, FiPhone } from 'react-icons/fi';
import { Brand } from '../components/Brand';
import { DevotionalQuote } from '../components/DevotionalQuote';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const [form, setForm] = useState({ mobile: '', password: '', rememberMe: true });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticating } = useAuth();

  const submit = async (event) => {
    event.preventDefault();
    if (!/^\d{10}$/.test(form.mobile.trim())) return setError('Enter a valid 10-digit mobile number.');
    if (!form.password) return setError('Enter your password.');
    setError('');
    try { await login(form); navigate(location.state?.from || '/dashboard', { replace: true }); } catch (reason) { setError(reason.message); }
  };

  return (
    <div className="auth-page"><aside className="auth-aside"><Brand /><div className="auth-aside-content"><span className="eyebrow light">Welcome back, Warkari</span><h1>Your next step is held in <em>faith.</em></h1><DevotionalQuote /><p>Sign in to see route details, water facility, events, and your personal journey companion.</p></div><img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Syayambhuvithoba.jpg" alt="Vitthal of Pandharpur" /></aside><main className="auth-panel"><Link className="back-link" to="/"><FiArrowLeft /> Back to VariMitra</Link><div className="auth-card"><span className="eyebrow">Secure sign in</span><h2>Welcome back</h2><p>Use the mobile number registered with VariMitra.</p>{error && <div className="form-error" role="alert">{error}</div>}<form onSubmit={submit} noValidate><label>Mobile number<span className="input-wrap"><FiPhone /><input value={form.mobile} inputMode="numeric" maxLength="10" onChange={(event) => setForm({ ...form, mobile: event.target.value.replace(/\D/g, '') })} placeholder="10-digit mobile number" autoComplete="tel" /></span></label><label>Password<span className="input-wrap"><FiLock /><input value={form.password} type={showPassword ? 'text' : 'password'} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Your password" autoComplete="current-password" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <FiEyeOff /> : <FiEye />}</button></span></label><label className="checkbox-label"><input type="checkbox" checked={form.rememberMe} onChange={(event) => setForm({ ...form, rememberMe: event.target.checked })} /> Keep me signed in on this device</label><button className="primary-button full" disabled={isAuthenticating} type="submit">{isAuthenticating ? 'Verifying your details…' : 'Enter VariMitra'}</button></form><p className="auth-switch">New to VariMitra? <Link to="/register">Create your account</Link></p></div></main></div>
  );
}
