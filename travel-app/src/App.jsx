import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import './App.css';
import Loading from './components/Loading';

const Login = lazy(() => import('./components/Login.jsx'));
const SignUp = lazy(() => import('./components/SignUp.jsx'));
const Dashboard = lazy(() => import('./components/Dashboard.jsx'));

function App() {
  const hasTransitioned = useRef(false);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeLayer, setActiveLayer] = useState(true);
  const [bg1, setBg1] = useState(0);
  const [bg2, setBg2] = useState(1);
  const [darkMode, setDarkMode] = useState(() => {
    // initialize from localStorage or default to true
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const backgrounds = [
    "/assets/images/Welcomeslider1.jpeg",
    "/assets/images/Welcomeslider2.jpeg",
    "/assets/images/Welcomeslider3.jpeg",
    "/assets/images/Welcomeslider4.jpeg",
  ];

  // Sync dark mode class on mount and when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleLoadingComplete = () => {
    if (!hasTransitioned.current) {
      hasTransitioned.current = true;
      setLoading(false);
      console.log("App: Transitioning to landing page");
    }
  };

  // Background image transition effect — interval only runs once on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLayer((prevActive) => {
        if (prevActive) {
          setBg2((prev) => (prev + 1) % backgrounds.length);
        } else {
          setBg1((prev) => (prev + 1) % backgrounds.length);
        }
        return !prevActive;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        handleLoadingComplete();
      }, 5500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleLoginClick = () => {
    setShowSignUp(false);
    setShowLogin(true);
  };

  const handleSignUpClick = () => {
    setShowLogin(false);
    setShowSignUp(true);
  };

  const handleBackToLanding = () => {
    setShowLogin(false);
    setShowSignUp(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setShowSignUp(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogin(false);
    setShowSignUp(false);
  };

  if (loading) {
    return <Loading onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-r from-[#EC8E3D] to-[#6F93AD] flex items-center justify-center">
          Loading...
        </div>
      }
    >
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : showLogin ? (
        <Login
          onSignUpClick={handleSignUpClick}
          onBackToLanding={handleBackToLanding}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : showSignUp ? (
        <SignUp
          onLoginClick={handleLoginClick}
          onBackToLanding={handleBackToLanding}
          onSignUpSuccess={handleLoginSuccess}
        />
      ) : (
        <div className="relative min-h-screen text-white overflow-hidden">
          <div
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              activeLayer ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundImage: `url(${backgrounds[bg1]})` }}
          />
          <div
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              !activeLayer ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundImage: `url(${backgrounds[bg2]})` }}
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
              "Unleash the Nomad in You"
            </p>

            <div className="flex gap-4 mt-8">
              <button
                className="bg-[#EC8E3D] hover:bg-[#FCCB6E] transition duration-300 px-8 py-3 rounded-full text-white font-semibold shadow-lg"
                onClick={handleLoginClick}
              >
                Begin your Journey
              </button>
              <button
                className="bg-transparent border-2 border-white hover:bg-white/10 transition duration-300 px-8 py-3 rounded-full text-white font-semibold"
                onClick={handleSignUpClick}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <svg
                className="w-6 h-6 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-800"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
      )}
    </Suspense>
  );
}

export default App;
