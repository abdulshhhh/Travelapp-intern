import React from "react";
import Navbar from "./components/Navbar";
import ProfileCard from "./components/ProfileCard";

function App() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="overflow-y-auto">
        <ProfileCard />
      </div>
    </div>
  );
   <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080')" }}>
  {/* your content */}
</div>

}

export default App;
