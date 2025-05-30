import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Constants
const SLIDE_INTERVAL = 5000;
const ANIMATION_DURATION = 1000;

const SLIDES_DATA = [
  {
    image: '/assets/images/Loginslider1.jpeg',
    title: 'Discover new places',
    subtitle: 'Explore beautiful destinations worldwide.',
  },
  {
    image: '/assets/images/Loginslider2.jpeg',
    title: 'Experience the thrill',
    subtitle: 'Adventure awaits you beyond horizons.',
  },
  {
    image: '/assets/images/Loginslider3.jpeg',
    title: 'Create unforgettable memories',
    subtitle: 'Travel with people who vibe with your soul.',
  },
];

// Custom hooks
const useSlider = (totalSlides, interval = SLIDE_INTERVAL) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, interval);
    return () => clearInterval(timer);
  }, [totalSlides, interval]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  return { currentSlide, goToSlide };
};

// Slide Component
const Slide = ({ slide, isActive, index }) => {
  const slideStyle = useMemo(() => ({
    transform: isActive ? 'scale(1.05)' : 'scale(1)',
    opacity: isActive ? 1 : 0,
  }), [isActive]);

  const textStyle = useMemo(() => ({
    transform: isActive ? 'translateY(0)' : 'translateY(4rem)',
    opacity: isActive ? 1 : 0,
  }), [isActive]);

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
    >
      <img
        src={slide.image}
        alt={slide.title}
        className="w-full h-full object-cover transition-transform duration-[10s] ease-in-out"
        style={{ transform: slideStyle.transform }}
        loading={index === 0 ? 'eager' : 'lazy'}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 flex flex-col justify-center items-start p-6 sm:p-10 md:p-16 text-white">
        <h2 
          className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-lg transition-all duration-1000 ease-out"
          style={textStyle}
        >
          {slide.title}
        </h2>
        <p 
          className="text-base sm:text-lg md:text-xl max-w-sm drop-shadow-md transition-all duration-1000 delay-300 ease-out"
          style={{ ...textStyle, transitionDelay: '300ms' }}
        >
          {slide.subtitle}
        </p>
      </div>
    </div>
  );
};

// Slide Indicators Component
const SlideIndicators = ({ slides, currentSlide, onSlideChange }) => (
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
    {slides.map((_, index) => (
      <button
        key={index}
        onClick={() => onSlideChange(index)}
        className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
          index === currentSlide ? 'bg-white w-6' : 'bg-white/50 w-2'
        }`}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
);

// Social Login Button Component
const SocialButton = ({ icon, text, variant = 'google', onClick, type = 'button' }) => {
  const baseClasses = "w-full flex items-center justify-center transition-all duration-300 rounded-xl py-3 mb-5 shadow-md hover:shadow-lg transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    google: "bg-white hover:bg-gray-100 text-gray-800 focus:ring-gray-300",
    facebook: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
    >
      <img src={icon} alt={`${variant} icon`} className="w-6 h-6 mr-3" />
      <span className="font-semibold">{text}</span>
    </button>
  );
};

// Back Button Component
const BackButton = () => (
  <Link
    to="/"
    className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white focus:outline-none focus:ring-2 focus:ring-white/50"
    aria-label="Back to landing page"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </Link>
);

// Mobile Swipe Indicator
const MobileSwipeIndicator = () => (
  <div className="absolute bottom-4 w-full flex justify-center sm:hidden z-20">
    <div className="flex flex-col items-center text-white text-sm animate-bounce">
      <span className="mb-1">Swipe Up</span>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7 7 7" />
      </svg>
    </div>
  </div>
);

// Main Login Component
const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const { currentSlide, goToSlide } = useSlider(SLIDES_DATA.length);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onLoginSuccess?.();
    navigate('/dashboard');
  }, [onLoginSuccess, navigate]);

  const handleSocialLogin = useCallback((provider) => {
    console.log(`Login with ${provider}`);
    handleSubmit({ preventDefault: () => {} });
  }, [handleSubmit]);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-r from-[#EC8E3D] to-[#6F93AD] overflow-hidden md:overflow-hidden sm:overflow-y-auto">
      {/* Left Slider Section */}
      <div className="w-full md:w-1/2 h-[655px] sm:h-[400px] md:h-auto relative overflow-hidden">
        {SLIDES_DATA.map((slide, index) => (
          <Slide 
            key={index}
            slide={slide}
            isActive={index === currentSlide}
            index={index}
          />
        ))}
        
        <SlideIndicators 
          slides={SLIDES_DATA}
          currentSlide={currentSlide}
          onSlideChange={goToSlide}
        />
        
        <MobileSwipeIndicator />
      </div>

      {/* Right Login Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10 md:p-16 relative">
        {/* Decorative Background Elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl" />

        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/20 animate-fade-in relative overflow-hidden group">
          {/* Glass Reflection Effect */}
          <div className="absolute -inset-[500px] bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-45 translate-x-[1000px] group-hover:translate-x-[-1000px] transition-transform duration-1500 ease-in-out" />

          <BackButton />

          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow-lg">
              Welcome to
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FCCB6E] to-[#EE9C8F]">
              NomadNova
            </h2>
            <p className="text-white mt-3 font-medium">
              Login or Sign up to start your adventure
            </p>
          </header>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-0">
            <SocialButton
              icon="/assets/images/Google__G__logo.svg.webp"
              text="Continue with Google"
              variant="google"
              onClick={() => handleSocialLogin('Google')}
              type="submit"
            />
            
            <SocialButton
              icon="/assets/images/Facebook-Free-PNG.png"
              text="Continue with Facebook"
              variant="facebook"
              onClick={() => handleSocialLogin('Facebook')}
              type="submit"
            />
          </form>

          {/* Footer Links */}
          <footer className="text-center">
            <p className="text-white mt-6">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="text-[#FCCB6E] hover:text-[#EE9C8F] font-semibold transition-colors focus:outline-none focus:underline"
              >
                Sign Up
              </Link>
            </p>

            <p className="text-white/70 text-xs mt-8 select-none">
              By continuing, you agree to our{' '}
              <a 
                href="#" 
                className="underline text-yellow-400 hover:text-yellow-300 font-bold transition-colors focus:outline-none focus:text-yellow-200"
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a 
                href="#" 
                className="underline text-yellow-400 hover:text-yellow-300 font-bold transition-colors focus:outline-none focus:text-yellow-200"
              >
                Privacy Policy
              </a>
              .
            </p>
          </footer>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Login;