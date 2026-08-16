import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiActivity, FiCalendar, FiChevronRight, FiDroplet, FiHome, FiLogOut, FiMap, FiMapPin, FiMenu, FiShield, FiUser, FiX } from 'react-icons/fi';
import { Brand } from './Brand';
import { Footer } from './Footer';
import { useAuth } from '../hooks/useAuth';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: FiHome },
  { to: '/live', label: 'Live Tracking', icon: FiActivity },
  { to: '/route', label: 'Route Timeline', icon: FiMap },
  { to: '/mukkam', label: 'Night Stay', icon: FiMapPin },
  { to: '/water', label: 'Water Points', icon: FiDroplet },
  { to: '/medical', label: 'Medical & Help', icon: FiShield },
  { to: '/events', label: 'Events', icon: FiCalendar },
];

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const closeMenu = () => setMenuOpen(false);
  const exit = () => { logout(); navigate('/'); };

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <Brand to="/dashboard" />
        <div className="topbar-actions"><span className="journey-pill"><span /> Journey companion</span><button className="mobile-menu-button" type="button" aria-label="Open menu" onClick={() => setMenuOpen(true)}><FiMenu /></button></div>
      </header>
      <div className="app-body">
        {menuOpen && <button aria-label="Close menu" className="sidebar-backdrop" onClick={closeMenu} />}
        <aside className={`app-sidebar ${menuOpen ? 'is-open' : ''}`}>
          <div className="sidebar-mobile-head"><Brand to="/dashboard" /><button className="icon-button" onClick={closeMenu} aria-label="Close menu"><FiX /></button></div>
          <p className="sidebar-label">Navigate your Vari</p>
          <nav>{navItems.map(({ to, label, icon: Icon }) => <NavLink onClick={closeMenu} key={to} to={to} className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}><Icon /><span>{label}</span><FiChevronRight /></NavLink>)}</nav>
          <div className="sidebar-footer">
            <NavLink onClick={closeMenu} to="/profile" className={({ isActive }) => `profile-shortcut ${isActive ? 'active' : ''}`}><span className="avatar">{user?.name?.[0]?.toUpperCase() || 'V'}</span><span><b>{user?.name || 'My Profile'}</b><small>{user?.mobile || 'Profile settings'}</small></span><FiUser /></NavLink>
            <button className="logout-button" type="button" onClick={exit}><FiLogOut /> Logout</button>
          </div>
        </aside>
        <main className="app-content"><Outlet /></main>
      </div>
      <Footer />
    </div>
  );
}
