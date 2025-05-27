import React from 'react';
import './ProfileCard.css';
import { FaEnvelope, FaComment, FaShareAlt, FaBriefcase, FaGraduationCap, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

const ProfileCard = () => {
  return (
    <div className="container">
      <div className="left-column">
        <div className="profile-header">
          <h1 className="profile-name">Lokesh</h1>
          <span className="profile-username">@plokesh</span>
        </div>
        
        <div className="scrollable-content">
          <p className="profile-bio">
           🌍 Full-time wanderer & part-time travel blogger. I've visited 47 countries so far, 
    collecting stories, photos, and friendships along the way. My mission is to prove 
    that adventure exists everywhere - from hidden alleys in Marrakech to remote 
    beaches in the Philippines.
          </p>
          <p className="profile-bio">
           🧭 Creator of "The Budget Backpacker's Guide" series. I specialize in finding 
    authentic local experiences that won't break the bank. When I'm not on the road, 
    you'll find me planning my next trip or helping others discover the joy of 
    slow travel. Let's connect and swap stories!
          </p>
        </div>
      </div>

      <div className="right-column">
        <img 
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
          alt="Profile" 
          className="profile-photo" 
        />
        
        <span className="connections-count">2330 connections</span>
        
        <div className="action-buttons">
          <button className="action-btn primary" onClick={() => alert('Contact clicked!')}>
            <FaEnvelope /> Contact
          </button>
          <button className="action-btn" onClick={() => alert('Message clicked!')}>
            <FaComment /> Message
          </button>
          <button className="action-btn" onClick={() => alert('Share clicked!')}>
            <FaShareAlt /> Share
          </button>
        </div>
        
        <div className="right-column-icons">
          <div className="icon-item" onClick={() => alert('Work clicked!')}>
            <FaBriefcase />
            <span>Work</span>
          </div>
          <div className="icon-item" onClick={() => alert('Education clicked!')}>
            <FaGraduationCap />
            <span>Education</span>
          </div>
          <div className="icon-item" onClick={() => alert('Location clicked!')}>
            <FaMapMarkerAlt />
            <span>Location</span>
          </div>
          <div className="icon-item" onClick={() => alert('Interests clicked!')}>
            <FaHeart />
            <span>Interests</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
