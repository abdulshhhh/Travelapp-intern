import { useEffect, useState } from 'react';

export default function Loading() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 bg-black-900 flex flex-col items-center justify-center z-50">
      <div className="w-24 h-24 mb-8">
        <img 
          src="https://www.freeiconspng.com/thumbs/logo-design/blank-bird-logo-design-idea-png-15.png" 
          alt="Sample Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600 mb-4">
        NomadNova
      </h2>
      
      <div className="w-64 bg-gray-700 rounded-full h-2.5 mb-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-green-600 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="text-gray-400 text-sm">{progress}% loaded</p>
    </div>
  );
}
