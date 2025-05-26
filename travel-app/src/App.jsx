import { useState, useEffect } from 'react';
import './App.css';
import Loading from './components/Loading';

function App() {
  const [loading, setLoading] = useState(true);
  const [activeLayer, setActiveLayer] = useState(true);
  const [bg1, setBg1] = useState(0); 
  const [bg2, setBg2] = useState(1); 

  const backgrounds = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    'https://images.unsplash.com/photo-1506765515384-028b60a970df',
  ];

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(loadingTimer);
  }, []);

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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="relative min-h-screen text-white overflow-hidden">
          {/* Background layer 1 */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              activeLayer ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundImage: `url(${backgrounds[bg1]})` }}
          />

          {/* Background layer 2 */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              !activeLayer ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundImage: `url(${backgrounds[bg2]})` }}
          />

          {/* Content */}
          <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4 bg-black/45 backdrop-blur-[ipx]">
            <h1 className="text-4xl md:text-4xl font-bold leading-tight">
              Your Journey should be as exciting as your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-green-500">
                Destination
              </span>
            </h1>

            <h2 className="text-5xl mt-6 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
              NomadNova
            </h2>

            <p className="mt-4 text-xl text-gray-300 max-w-2xl">
              Explore the world with people who vibe with your soul.
            </p>

            <div className="flex gap-4 mt-8">
              <button className="bg-green-600 hover:bg-green-700 transition duration-300 px-8 py-3 rounded-full text-white font-semibold shadow-lg">
                Join a Trip
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white/10 transition duration-300 px-8 py-3 rounded-full text-white font-semibold">
                Explore Destinations
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
