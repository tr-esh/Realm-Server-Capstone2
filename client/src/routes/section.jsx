import { lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard';
import DashboardMOLayout from '../layoutMO/dashboard';
import DashboardGuestLayout from '../layoutGuest/dashboard'
import { useAuthContext } from '../hooks/useAuthContext';
import loadingImage from '../img/loader.png';

export const Landing = lazy(() => import('../pages/Landing'))
export const SelectUserPage = lazy(() => import('../pages/UserPage'))
export const SignInPage = lazy(() => import('../pages/Login'));
export const SignUpPage = lazy(() => import('../pages/Signup'));

export const HomePage = lazy(() => import('../pages/Dashboard'));
export const StationPage = lazy(() => import('../pages/Stations'));
export const LogPage = lazy(() => import('../pages/Entries'));
export const LogSectionPage = lazy(() => import('../pages/MonthlyEntries'));
export const StationSectionView = lazy(() => import('../pages/StationSection'));

export const MOStationPage = lazy(() => import('../pages/MOStation'));
export const MOStationView = lazy(() => import('../pages/MOStationSection'));

export const GuestPage = lazy(() => import('../pages/GuestDashboard'));
export const GuestStationView = lazy(() => import('../pages/GuestStation'));

export default function AppRouter() {
  const { user, selectedRole } = useAuthContext();
  const navigate = useNavigate();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    
    (async () => {
      const isAuthenticated = () => {
        const user = localStorage.getItem('user');
        const role = localStorage.getItem('selectedRole');
        return !!user && !!role;
      };

      if (!isAuthenticated()) {
        navigate('/user-select');
      }
      
      setInitializing(false);
    })();
  }, [navigate]);
  
  if (initializing) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <img src={loadingImage} alt="Loading..." style={{ maxWidth: '100%', maxHeight: '100%', width: '250px', height: '250px' }} />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/user-select" element={<SelectUserPage />} />

      <Route
        path="/dashboard"
        element={
          user && user.role === 'Admin' ? (
            <DashboardLayout>
              <HomePage />
            </DashboardLayout>
          ) : (
            <Navigate to="/user-select" />
          )
        }
      />

      <Route
        path="/sign-up"
        element={!user ? <SignUpPage /> : <Navigate to="/login" />}
      />

      <Route
        path="/login"
        element={
          !user ? (
            <SignInPage />
          ) : user.role === 'Monitoring-Officer' ? (
            <Navigate to="/mo-home" />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />

      <Route
        path="/stations"
        element={
          user ? (
            <DashboardLayout>
              <StationPage />
            </DashboardLayout>
          ) : (
            <Navigate to="/user-select" />
          )
        }
      />

      <Route
        path="/stations/:stationId"
        element={
          user ? (
            <DashboardLayout>
              <StationSectionView />
            </DashboardLayout>
          ) : (
            <Navigate to="/user-select" />
          )
        }
      />

      <Route
        path="/logentries"
        element={
          user ? (
            <DashboardLayout>
              <LogPage />
            </DashboardLayout>
          ) : (
            <Navigate to="/user-select" />
          )
        }
      />

      <Route
        path="/logentries/:stationId/:month/:year"
        element={
          user ? (
            <DashboardLayout>
              <LogSectionPage />
            </DashboardLayout>
          ) : (
            <Navigate to="/user-select" />
          )
        }
      />

      <Route
        path="/mo-home"
        element={
          user && user.role === 'Monitoring-Officer' ? (
            <DashboardMOLayout>
              <MOStationPage />
            </DashboardMOLayout>
          ) : (
            <Navigate to="/user-select" />
          )
        }
      />

      <Route
        path="/mo-stations/:stationId"
        element={
          user ? (
            <DashboardMOLayout>
              <MOStationView />
            </DashboardMOLayout>
          ) : (
            <Navigate to="/user-select" />
          )
        }
      />

      {/* Guest Route */}
      <Route
        path="/guest"
        element={
           selectedRole === 'Guest' ? (
            <DashboardGuestLayout>
              <GuestPage />
            </DashboardGuestLayout>
          ) : (
            <Navigate to="/user-select" />
          )
        }
      />

      <Route
        path="/guest-stations/:index"
        element={
          selectedRole === 'Guest' ? (
            <DashboardGuestLayout>
              <GuestStationView  />
            </DashboardGuestLayout>
          ) : (
            <Navigate to="/user-select" />
          )
        }
      />

    </Routes>
  );
}