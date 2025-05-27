import { useState, useEffect } from 'react';

function Loading() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FCCB6E] to-[#EE9C8F] mb-8">
        NomadNova
      </h2>
      
      <div className="w-64 bg-gray-700 rounded-full h-2.5 mb-2">
        <div 
          className="bg-gradient-to-r from-[#EE9C8F] to-[#FCCB6E] h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="text-gray-400 text-sm">{progress}% loaded</p>
    </div>
  );
}

export default Loading;
