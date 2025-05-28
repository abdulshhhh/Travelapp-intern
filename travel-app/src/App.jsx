import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import './App.css';
import Loading from './components/Loading';

// Lazy load components for better initial load time
const Login = lazy(() => import('./components/login.jsx'));
const SignUp = lazy(() => import('./components/SignUp.jsx'));
const Dashboard = lazy(() => import('./components/Dashboard.jsx'));

function App() {
  const hasTransitionedToLogin = useRef(false);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeLayer, setActiveLayer] = useState(true);
  const [bg1, setBg1] = useState(0);
  const [bg2, setBg2] = useState(1);
  const [darkMode, setDarkMode] = useState(true);

  const backgrounds = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    'https://images.unsplash.com/photo-1506765515384-028b60a970df',
  ];

  // Add theme toggle function
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Handle loading completion with a more robust approach
  const handleLoadingComplete = () => {
    console.log("App: handleLoadingComplete called");
    if (!hasTransitionedToLogin.current) {
      hasTransitionedToLogin.current = true;
      setLoading(false);
      // Don't automatically show login - show landing page instead
      console.log("App: Transitioning to landing page");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeLayer) {
        setBg2((prev) => (prev + 1) % backgrounds.length);
      } else {
        setBg1((prev) => (prev + 1) % backgrounds.length);
      }
      setActiveLayer((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeLayer, backgrounds.length]);

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

  // Force transition to login after a maximum time (fallback)
  useEffect(() => {
    if (loading) {
      const maxLoadingTime = setTimeout(() => {
        handleLoadingComplete();
      }, 5500); // Reduced from 7000 to 5500 (5.5 seconds, slightly longer than Loading component's timeout)
      return () => clearTimeout(maxLoadingTime);
    }
  }, [loading]);

  console.log("App render state:", { loading, showLogin, showSignUp });

  // Simplified conditional rendering with Suspense
  if (loading) {
    return <Loading onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-r from-[#EC8E3D] to-[#6F93AD] flex items-center justify-center">Loading...</div>}>
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : showLogin ? (
        <Login onSignUpClick={handleSignUpClick} onBackToLanding={handleBackToLanding} onLoginSuccess={handleLoginSuccess} />
      ) : showSignUp ? (
        <SignUp onLoginClick={handleLoginClick} onBackToLanding={handleBackToLanding} onSignUpSuccess={handleLoginSuccess} />
      ) : (
        // Landing page content...
        <div className="relative min-h-screen text-white overflow-hidden">
          {/* Background layers */}
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

          {/* Landing content */}
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
              Explore the world with people who vibe with your soul.
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
              <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
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
