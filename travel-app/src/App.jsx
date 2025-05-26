import { useState, useEffect } from 'react';
import './App.css';
import Loading from './components/Loading';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("App component mounted");
    const timer = setTimeout(() => {
      console.log("Setting loading to false");
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="relative min-h-screen bg-slate-900 text-white overflow-hidden">
          {/* We'll add ParticlesBg back later */}
          
          <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Your Journey should be as exciting as your <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                Destination
              </span>
            </h1>

            <h2 className="text-5xl mt-6 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">
              NomadNova
            </h2>

            <p className="mt-4 text-xl text-gray-300 max-w-2xl">
              Explore the world with people who vibe with your soul.
            </p>

            <div className="flex gap-4 mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 transition duration-300 px-8 py-3 rounded-full text-white font-semibold shadow-lg">
                Join a Trip
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white/10 transition duration-300 px-8 py-3 rounded-full text-white font-semibold">
                Explore Destinations
              </button>
            </div>
          </div>

          {/* We'll add ThreeScene back later */}
        </div>
      )}
    </>
  );
}

export default App;
