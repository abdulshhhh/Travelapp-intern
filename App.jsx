import React from "react";
import ProfileCard from "./components/ProfileCard";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-800 p-6 text-white">
      <nav className="flex justify-between items-center mb-8">
        <div className="text-xl font-bold">Wanderly</div>
        <div className="flex items-center gap-4">
          <button className="bg-white text-blue-900 font-semibold px-4 py-2 rounded-lg">Post A Trip</button>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-blue-800">DP</div>
        </div>
      </nav>

      <ProfileCard />
    </div>
  );
};

export default App;
