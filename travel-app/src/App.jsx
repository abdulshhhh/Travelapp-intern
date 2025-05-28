import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import './App.css';
import Loading from './components/Loading';
const Login = lazy(() => import('./components/login.jsx'));
const SignUp = lazy(() => import('./components/SignUp.jsx'));
const Landing = lazy(() => import('./components/landingpage.jsx'));

function App() {
  const hasTransitioned = useRef(false);
  const [loading, setLoading] = useState(true);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(false);
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

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLoadingComplete = () => {
    if (!hasTransitioned.current) {
      hasTransitioned.current = true;
      setLoading(false);
      setShowWelcomeScreen(true); // 👈 Show the welcome screen after loading
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
  }, [activeLayer]);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        handleLoadingComplete();
      }, 5500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleLoginClick = () => {
    setShowWelcomeScreen(false);
    setShowSignUp(false);
    setShowLogin(true);
  };

  const handleSignUpClick = () => {
    setShowWelcomeScreen(false);
    setShowLogin(false);
    setShowSignUp(true);
  };

  const handleAuthSuccess = () => {
    setShowLogin(false);
    setShowSignUp(false);
    setShowLandingPage(true);
  };

  if (loading) {
    return <Loading onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-r from-[#EC8E3D] to-[#6F93AD] flex items-center justify-center">Loading...</div>}>
      {showLandingPage ? (
        <Landing />
      ) : showLogin ? (
        <Login onSignUpClick={handleSignUpClick} onBackToHome={handleAuthSuccess} />
      ) : showSignUp ? (
        <SignUp onLoginClick={handleLoginClick} onBackToHome={handleAuthSuccess} />
      ) : showWelcomeScreen ? (
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
              Explore the world with people who vibe with your soul.
            </p>

            <div className="flex gap-4 mt-8">
              <button
                className="bg-[#EC8E3D] hover:bg-[#FCCB6E] transition duration-300 px-8 py-3 rounded-full text-white font-semibold shadow-lg"
                onClick={handleLoginClick}
              >
                Join a Trip
              </button>
              <button 
                className="bg-transparent border-2 border-white hover:bg-white/10 transition duration-300 px-8 py-3 rounded-full text-white font-semibold"
                onClick={handleSignUpClick}
              >
                Sign Up
              </button>
            </div>
          </div>

          <button 
            onClick={toggleTheme}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
      ) : null}
    </Suspense>
  );
}

export default App;
