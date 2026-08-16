import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { InlineLoader } from './components/StatusViews';
import { useAuth } from './hooks/useAuth';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const LiveTrackingPage = lazy(() => import('./pages/LiveTrackingPage'));
const RoutePage = lazy(() => import('./pages/RoutePage'));
const MukkamPage = lazy(() => import('./pages/MukkamPage'));
const WaterPointsPage = lazy(() => import('./pages/WaterPointsPage'));
const MedicalPage = lazy(() => import('./pages/MedicalPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const InspirationPage = lazy(() => import('./pages/InspirationPage'));

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return isAuthenticated ? children : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

function Suspended({ children }) {
  return <Suspense fallback={<div className="page-loading"><InlineLoader label="Preparing your Vari companion…" /></div>}>{children}</Suspense>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Suspended><LandingPage /></Suspended>} />
      <Route path="/login" element={<PublicRoute><Suspended><LoginPage /></Suspended></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Suspended><RegisterPage /></Suspended></PublicRoute>} />
      <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Suspended><DashboardPage /></Suspended>} />
        <Route path="/live" element={<Suspended><LiveTrackingPage /></Suspended>} />
        <Route path="/route" element={<Suspended><RoutePage /></Suspended>} />
        <Route path="/mukkam" element={<Suspended><MukkamPage /></Suspended>} />
        <Route path="/water" element={<Suspended><WaterPointsPage /></Suspended>} />
        <Route path="/medical" element={<Suspended><MedicalPage /></Suspended>} />
        <Route path="/events" element={<Suspended><EventsPage /></Suspended>} />
        <Route path="/profile" element={<Suspended><ProfilePage /></Suspended>} />
        <Route path="/gallery" element={<Suspended><GalleryPage /></Suspended>} />
        <Route path="/inspiration" element={<Suspended><InspirationPage /></Suspended>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
