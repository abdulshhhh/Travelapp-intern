import React, { useState, useEffect } from 'react';

const slides = [
  {
    image: 'https://images.pexels.com/photos/2659475/pexels-photo-2659475.jpeg?cs=srgb&dl=pexels-stijn-dijkstra-1306815-2659475.jpg&fm=jpg',
    title: 'Discover new places',
    subtitle: 'Explore beautiful destinations worldwide.',
  },
  {
    image: 'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?cs=srgb&dl=pexels-pixelcop-1878293.jpg&fm=jpg',
    title: 'Experience the thrill',
    subtitle: 'Adventure awaits you beyond horizons.',
  },
  {
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG91cmlzbXxlbnwwfHwwfHx8MA%3D%3D',
    title: 'Create unforgettable memories',
    subtitle: 'Travel with people who vibe with your soul.',
  },
];

export default function Login() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      touchEndY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (touchStartY - touchEndY > 50) {
        // Swipe Up
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else if (touchEndY - touchStartY > 50) {
        // Swipe Down
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      }
    };

    const sliderElement = document.getElementById('slider-section');
    if (sliderElement) {
      sliderElement.addEventListener('touchstart', handleTouchStart);
      sliderElement.addEventListener('touchmove', handleTouchMove);
      sliderElement.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (sliderElement) {
        sliderElement.removeEventListener('touchstart', handleTouchStart);
        sliderElement.removeEventListener('touchmove', handleTouchMove);
        sliderElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-r from-green-500 to-blue-400 overflow-hidden">
      {/* Left slider section */}
      <div
        id="slider-section"
        className="w-full md:w-1/2 h-[655px] sm:h-[400px] md:h-auto relative overflow-hidden"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={`${slide.image}?auto=format&fit=crop&w=900&q=80`}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start p-6 sm:p-10 md:p-16 text-white">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl max-w-sm drop-shadow-md">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right login section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10 md:p-16">
        <div className="w-full max-w-md bg-white bg-opacity-20 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl border border-white border-opacity-30 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 text-center drop-shadow-lg">
            Welcome to
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-blue-600">
            NomadNova
          </h2>

          <p className="text-white mt-3 mb-8 text-center font-medium">
            Login or Sign up to start your adventure
          </p>

          <button className="w-full flex items-center justify-center bg-white bg-opacity-90 hover:bg-opacity-100 transition rounded-xl py-3 mb-5 shadow-md">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
              alt="Google icon"
              className="w-6 h-6 mr-3"
            />
            <span className="text-gray-800 font-semibold">Continue with Google</span>
          </button>

          <button className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 mb-8 shadow-md text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mr-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.125v-3.622h3.125v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.466.099 2.797.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.324V1.325c0-.732-.594-1.325-1.324-1.325z" />
            </svg>
            <span className="font-semibold">Continue with Facebook</span>
          </button>

          <div className="flex items-center mb-6">
            <hr className="flex-grow border-white" />
            <span className="mx-3 text-white text-sm">or</span>
            <hr className="flex-grow border-white" />
          </div>

          <form className="space-y-6">
            <input
              type="email"
              placeholder="Email or phone number"
              className="w-full px-5 py-3 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-80 text-gray-900 font-medium"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 transition text-white py-3 rounded-xl font-bold shadow-lg"
            >
              Login
            </button>
          </form>

          <p className="text-white text-xs mt-8 text-center select-none">
            By continuing, you agree to our{' '}
            <a href="#" className="underline text-green-200 hover:text-green-300 font-bold">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="underline text-green-200 hover:text-green-300 font-bold">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease forwards;
        }
      `}</style>
    </div>
  );
}
