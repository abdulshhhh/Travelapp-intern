import { useState, useEffect, useRef, lazy, Suspense, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

// Lazy loaded components
const Landing = lazy(() => import('./components/Landing'));
const Login = lazy(() => import('./components/Login'));
const SignUp = lazy(() => import('./components/SignUp'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Profile = lazy(() => import('./components/Profile'));
const Loading = lazy(() => import('./components/Loading'));

// Constants
const LOADING_DURATION = 5500;
const STORAGE_KEYS = {
  DARK_MODE: 'darkMode',
  AUTH_TOKEN: 'authToken'
};

const CURRENT_USER = {
  // ...existing code...
};

// Custom hooks
const useLocalStorage = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

// Protected Route Component
const ProtectedRoute = ({ children, isLoggedIn, redirectTo = "/login" }) => {
  return isLoggedIn ? children : <Navigate to={redirectTo} replace />;
};

// Public Route Component
const PublicRoute = ({ children, isLoggedIn, redirectTo = "/dashboard" }) => {
  return !isLoggedIn ? children : <Navigate to={redirectTo} replace />;
};

// Create a wrapper component for Login
const LoginWrapper = ({ isLoggedIn, handleAuthSuccess }) => {
  const navigate = useNavigate();
  
  return (
    <PublicRoute isLoggedIn={isLoggedIn}>
      <Login 
        onLoginSuccess={handleAuthSuccess}
        onSignUpClick={() => navigate('/signup')}
        onBackToLanding={() => navigate('/')}
      />
    </PublicRoute>
  );
};

// Create a wrapper component for SignUp
const SignUpWrapper = ({ isLoggedIn, handleAuthSuccess }) => {
  const navigate = useNavigate();
  
  return (
    <PublicRoute isLoggedIn={isLoggedIn}>
      <SignUp 
        onSignUpSuccess={handleAuthSuccess}
        onLoginClick={() => navigate('/login')}
        onBackToLanding={() => navigate('/')}
      />
    </PublicRoute>
  );
};

// Main App Component
const App = () => {
  const hasTransitioned = useRef(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useLocalStorage(STORAGE_KEYS.DARK_MODE, true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleLoadingComplete = useCallback(() => {
    if (!hasTransitioned.current) {
      hasTransitioned.current = true;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(handleLoadingComplete, LOADING_DURATION);
    return () => clearTimeout(timer);
  }, [loading, handleLoadingComplete]);

  const handleAuthSuccess = useCallback(() => setIsLoggedIn(true), []);
  const handleLogout = useCallback(() => setIsLoggedIn(false), []);

  useEffect(() => {
    // Shorter loading duration for testing
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading onLoadingComplete={() => setLoading(false)} />;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading onLoadingComplete={() => {}} />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/login"
            element={<LoginWrapper isLoggedIn={isLoggedIn} handleAuthSuccess={handleAuthSuccess} />}
          />
          <Route
            path="/signup"
            element={<SignUpWrapper isLoggedIn={isLoggedIn} handleAuthSuccess={handleAuthSuccess} />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Dashboard 
                  onLogout={handleLogout} 
                  currentUser={CURRENT_USER}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile 
                  currentUser={CURRENT_USER}
                  darkMode={darkMode}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;