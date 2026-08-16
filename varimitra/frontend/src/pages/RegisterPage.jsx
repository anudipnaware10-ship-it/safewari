import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEye, FiEyeOff, FiLock, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import { Brand } from '../components/Brand';
import { useAuth } from '../hooks/useAuth';

const initialForm = { name: '', mobile: '', email: '', password: '', confirmPassword: '' };

export default function RegisterPage() {
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { register, isAuthenticating } = useAuth();
  const navigate = useNavigate();
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const submit = async (event) => {
    event.preventDefault();
    if (form.name.trim().length < 2) return setError('Please enter your name.');
    if (!/^\d{10}$/.test(form.mobile)) return setError('Enter a valid 10-digit mobile number.');
    if (!form.email.includes('@')) return setError('Enter a valid email address.');
    if (form.password.length < 6) return setError('Use a password with at least 6 characters.');
    if (form.password !== form.confirmPassword) return setError('Your passwords do not match.');
    setError('');
    try { await register({ name: form.name.trim(), mobile: form.mobile, email: form.email.trim(), password: form.password, role: 'USER' }); navigate('/dashboard', { replace: true }); } catch (reason) { setError(reason.message); }
  };
  return <div className="auth-page register-page"><aside className="auth-aside"><Brand /><div className="auth-aside-content"><span className="eyebrow light">Walk together</span><h1>Make your journey <em>lighter.</em></h1><p>Your profile keeps your Vari companion personal and ready when you need route or seva details.</p><div className="registration-note">Your details are saved by the supplied Spring Boot user service.</div></div><img src="https://upload.wikimedia.org/wikipedia/commons/1/12/A_procession_Palkhi_festival_Hindu_culture_religion_rites_rituals_sights.jpg" alt="Pandharpur Vari procession" /></aside><main className="auth-panel"><Link className="back-link" to="/"><FiArrowLeft /> Back to VariMitra</Link><div className="auth-card"><span className="eyebrow">Create your companion</span><h2>Join VariMitra</h2><p>A few details to begin your digital Vari.</p>{error && <div className="form-error" role="alert">{error}</div>}<form onSubmit={submit} noValidate><label>Your name<span className="input-wrap"><FiUser /><input value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Full name" autoComplete="name" /></span></label><label>Mobile number<span className="input-wrap"><FiPhone /><input value={form.mobile} inputMode="numeric" maxLength="10" onChange={(event) => update('mobile', event.target.value.replace(/\D/g, ''))} placeholder="10-digit mobile number" autoComplete="tel" /></span></label><label>Email address<span className="input-wrap"><FiMail /><input value={form.email} type="email" onChange={(event) => update('email', event.target.value)} placeholder="you@example.com" autoComplete="email" /></span></label><label>Password<span className="input-wrap"><FiLock /><input value={form.password} type={showPassword ? 'text' : 'password'} onChange={(event) => update('password', event.target.value)} placeholder="At least 6 characters" autoComplete="new-password" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <FiEyeOff /> : <FiEye />}</button></span></label><label>Confirm password<span className="input-wrap"><FiLock /><input value={form.confirmPassword} type={showPassword ? 'text' : 'password'} onChange={(event) => update('confirmPassword', event.target.value)} placeholder="Repeat your password" autoComplete="new-password" /></span></label><button className="primary-button full" disabled={isAuthenticating} type="submit">{isAuthenticating ? 'Creating your profile…' : 'Create my account'}</button></form><p className="auth-switch">Already registered? <Link to="/login">Sign in</Link></p></div></main></div>;
}
