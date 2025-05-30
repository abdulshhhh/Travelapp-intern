import { useState, useEffect, useRef, lazy, Suspense, useCallback, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

// Lazy loaded components
const Login = lazy(() => import('./components/login')); // Fixed typo here
const SignUp = lazy(() => import('./components/SignUp'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Profile = lazy(() => import('./components/Profile'));
const Loading = lazy(() => import('./components/Loading'));

// Constants
const SLIDE_INTERVAL = 5000;
const LOADING_DURATION = 5500;
const STORAGE_KEYS = {
  DARK_MODE: 'darkMode',
  AUTH_TOKEN: 'authToken'
};

const BACKGROUNDS = [
  "/assets/images/Welcomeslider1.jpeg",
  "/assets/images/Welcomeslider2.jpeg", 
  "/assets/images/Welcomeslider3.jpeg",
  "/assets/images/Welcomeslider4.jpeg"
];

const CURRENT_USER = {
  id: "current_user",
  name: "Alex Rivera",
  avatar: "/assets/images/Alexrivera.jpeg",
  email: "alex.rivera@nomadnova.com",
  fullName: "Alex Rivera",
  bio: "Passionate traveler and adventure seeker. Love exploring new cultures, meeting amazing people, and creating unforgettable memories around the world!",
  location: "San Francisco, CA",
  phone: "+1 (555) 123-4567",
  photos: [
    "/assets/images/Alexrivera.jpeg",
    "/assets/images/baliadventure.jpeg",
    "/assets/images/Tokyo.jpeg",
    "/assets/images/swissmount.jpeg",
    "/assets/images/icelandnorthernlights.jpeg",
    "/assets/images/santorinisunset.jpeg"
  ]
};

// Custom hooks
const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setStoredValue = useCallback((newValue) => {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(`Error saving to localStorage:`, error);
    }
  }, [key]);

  return [value, setStoredValue];
};

const useBackgroundSlider = (backgrounds, interval) => {
  const [activeLayer, setActiveLayer] = useState(true);
  const [bg1, setBg1] = useState(0);
  const [bg2, setBg2] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLayer(prev => {
        const isActive = !prev;
        if (isActive) {
          setBg2(prev => (prev + 1) % backgrounds.length);
        } else {
          setBg1(prev => (prev + 1) % backgrounds.length);
        }
        return isActive;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [backgrounds.length, interval]);

  return { activeLayer, bg1, bg2 };
};

// Landing Page Component
const LandingPage = () => {
  const navigate = useNavigate();
  const { activeLayer, bg1, bg2 } = useBackgroundSlider(BACKGROUNDS, SLIDE_INTERVAL);

  const backgroundStyle1 = useMemo(() => ({ 
    backgroundImage: `url(${BACKGROUNDS[bg1]})` 
  }), [bg1]);

  const backgroundStyle2 = useMemo(() => ({ 
    backgroundImage: `url(${BACKGROUNDS[bg2]})` 
  }), [bg2]);

  const handleLogin = useCallback(() => navigate('/login'), [navigate]);
  const handleSignUp = useCallback(() => navigate('/signup'), [navigate]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          activeLayer ? 'opacity-100 z-10' : 'opacity-0 z-0'
        }`}
        style={backgroundStyle1}
      />
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          !activeLayer ? 'opacity-100 z-10' : 'opacity-0 z-0'
        }`}
        style={backgroundStyle2}
      />
      
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4 bg-black/45 backdrop-blur-[1px]">
        <h1 className="text-4xl md:text-4xl font-bold leading-tight">
          Your Journey should be as exciting as your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-green-500">
            Destination
          </span>
        </h1>
        
        <h2 className="text-5xl mt-6 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FCCB6E] to-[#EE9C8F]">
          NomadNova
        </h2>
        
        <p className="mt-4 text-xl text-gray-300 max-w-2xl">
          "Unleash the Nomad in You"
        </p>

        <div className="flex gap-4 mt-8">
          <button
            className="bg-[#EC8E3D] hover:bg-[#FCCB6E] transition duration-300 px-8 py-3 rounded-full text-white font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FCCB6E] focus:ring-offset-2"
            onClick={handleLogin}
            type="button"
          >
            Forge your Journey
          </button>
          <button
            className="bg-transparent border-2 border-white hover:bg-white/10 transition duration-300 px-8 py-3 rounded-full text-white font-semibold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            onClick={handleSignUp}
            type="button"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

// Loading Fallback Component
const LoadingFallback = () => (
  <div className="min-h-screen bg-gradient-to-r from-[#EC8E3D] to-[#6F93AD] flex items-center justify-center">
    <div className="text-white text-xl">Loading...</div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children, isLoggedIn, redirectTo = "/login" }) => {
  return isLoggedIn ? children : <Navigate to={redirectTo} replace />;
};

// Public Route Component (redirect if logged in)
const PublicRoute = ({ children, isLoggedIn, redirectTo = "/dashboard" }) => {
  return !isLoggedIn ? children : <Navigate to={redirectTo} replace />;
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

  if (loading) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <Loading onLoadingComplete={handleLoadingComplete} />
      </Suspense>
    );
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={
              <PublicRoute isLoggedIn={isLoggedIn}>
                <Login onLoginSuccess={handleAuthSuccess} />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute isLoggedIn={isLoggedIn}>
                <SignUp onSignUpSuccess={handleAuthSuccess} />
              </PublicRoute>
            }
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
