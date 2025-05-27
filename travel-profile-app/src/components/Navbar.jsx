import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Gehakash</div>
      <div className="nav-buttons">
        <button className="post-trip-btn">Post a Trip</button>
        <img 
          src="https://randomuser.me/api/portraits/men/32.jpg" 
          alt="Profile" 
          className="profile-pic" 
          onClick={() => alert('Profile clicked!')}
        />
      </div>
    </nav>
  );
};

export default Navbar;