import { useState } from 'react';
import ProfileEdit from './ProfileEdit';
import TripMemories from './TripMemories';
import OTPVerification from './OTPVerification';

export default function Profile({ currentUser, onClose, onMessage }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showTripMemories, setShowTripMemories] = useState(false);
  const [selectedTripType, setSelectedTripType] = useState('');
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [otpType, setOTPType] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);

  // Enhanced user profile data
  const profileData = {
    ...currentUser,
    fullName: "Alex Rivera",
    bio: "Passionate traveler and adventure seeker. Love exploring new cultures, meeting amazing people, and creating unforgettable memories around the world! 🌍✈️",
    location: "San Francisco, CA",
    joinedDate: "January 2023",
    phone: "+1 (555) 123-4567",
    connections: 247,
    followers: 189,
    following: 156,
    tripsPosted: 8,
    tripsJoined: 15,
    upcomingTrips: 3,
    totalCountries: 23,
    totalCities: 67,
    travelCategories: ["Adventure", "Culture", "Food", "Photography", "Nature"],
    languages: ["English", "Spanish", "French"],
    verified: true,
    rating: 4.8,
    responseRate: "95%",
    responseTime: "Within 2 hours"
  };

  const upcomingTrips = [
    {
      id: 1,
      title: "Bali Adventure",
      destination: "Bali, Indonesia",
      date: "March 15-22, 2025",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1",
      role: "member",
      status: "confirmed"
    },
    {
      id: 2,
      title: "European Backpacking",
      destination: "Multiple Cities",
      date: "June 1-30, 2025",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
      role: "organizer",
      status: "planning"
    },
    {
      id: 3,
      title: "Safari Experience",
      destination: "Kenya",
      date: "August 10-20, 2025",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
      role: "member",
      status: "pending"
    }
  ];

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleViewTripMemories = (type) => {
    setSelectedTripType(type);
    setShowTripMemories(true);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${profileData.fullName}'s Profile - NomadNova`,
        text: `Check out ${profileData.fullName}'s travel profile on NomadNova!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '👤' },
    { id: 'trips', label: 'Trips', icon: '🎒' },
    { id: 'memories', label: 'Memories', icon: '📸' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#FCCB6E] rounded-2xl w-full max-w-6xl h-[90vh] border-2 border-[#5E5854] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#6F93AD] p-6 border-b border-[#5E5854]">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-6">
              {/* Profile Picture */}
              <div className="relative">
                <img
                  src={profileData.avatar}
                  alt={profileData.fullName}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#EE9C8F]"
                />
                {profileData.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-[#EC8E3D] rounded-full p-2">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div>
                <h2 className="text-3xl font-bold text-[#204231] mb-1">{profileData.fullName}</h2>
                <p className="text-[#204231]/70 mb-2">📍 {profileData.location}</p>
                <div className="flex items-center space-x-4 text-sm text-[#204231]/80">
                  <span>⭐ {profileData.rating} rating</span>
                  <span>🌍 {profileData.totalCountries} countries</span>
                  <span>📅 Joined {profileData.joinedDate}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {currentUser.id === profileData.id ? (
                <button
                  onClick={handleEditProfile}
                  className="bg-[#EC8E3D] hover:bg-[#EE9C8F] text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  ✏️ Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleFollow}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      isFollowing
                        ? 'bg-[#5E5854] hover:bg-[#204231] text-white'
                        : 'bg-[#EC8E3D] hover:bg-[#EE9C8F] text-white'
                    }`}
                  >
                    {isFollowing ? '✓ Following' : '+ Follow'}
                  </button>
                  <button
                    onClick={onMessage}
                    className="bg-[#6F93AD] hover:bg-[#5E5854] text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    💬 Message
                  </button>
                </>
              )}
              <button
                onClick={handleShare}
                className="bg-[#EE9C8F] hover:bg-[#EC8E3D] text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                📤 Share
              </button>
              <button
                onClick={onClose}
                className="text-[#204231] hover:text-[#EC8E3D] text-2xl font-bold"
              >
                ×
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-6 mt-6 pt-4 border-t border-[#5E5854]/30">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#204231]">{profileData.connections}</p>
              <p className="text-[#204231]/70 text-sm">Connections</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#204231]">{profileData.tripsPosted}</p>
              <p className="text-[#204231]/70 text-sm">Trips Posted</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#204231]">{profileData.tripsJoined}</p>
              <p className="text-[#204231]/70 text-sm">Trips Joined</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#204231]">{profileData.upcomingTrips}</p>
              <p className="text-[#204231]/70 text-sm">Upcoming</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#6F93AD] border-b border-[#5E5854]">
          <div className="flex space-x-1 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#FCCB6E] text-[#204231]'
                    : 'text-[#204231]/70 hover:text-[#204231] hover:bg-[#FCCB6E]/20'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* About Section */}
              <div className="bg-[#6F93AD] p-6 rounded-xl border border-[#5E5854]">
                <h3 className="text-xl font-bold text-[#204231] mb-3">About</h3>
                <p className="text-[#204231] leading-relaxed">{profileData.bio}</p>
              </div>

              {/* Travel Categories */}
              <div className="bg-[#EE9C8F] p-6 rounded-xl border border-[#5E5854]">
                <h3 className="text-xl font-bold text-[#204231] mb-3">Travel Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.travelCategories.map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#204231] text-[#FCCB6E] rounded-full text-sm font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages & Response Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#6F93AD] p-6 rounded-xl border border-[#5E5854]">
                  <h3 className="text-xl font-bold text-[#204231] mb-3">Languages</h3>
                  <div className="space-y-2">
                    {profileData.languages.map((language, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-[#EC8E3D] rounded-full"></span>
                        <span className="text-[#204231]">{language}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#EE9C8F] p-6 rounded-xl border border-[#5E5854]">
                  <h3 className="text-xl font-bold text-[#204231] mb-3">Response Info</h3>
                  <div className="space-y-2 text-[#204231]">
                    <p><strong>Response Rate:</strong> {profileData.responseRate}</p>
                    <p><strong>Response Time:</strong> {profileData.responseTime}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trips' && (
            <div className="space-y-6">
              {/* Trip Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  onClick={() => handleViewTripMemories('posted')}
                  className="bg-[#6F93AD] p-6 rounded-xl border border-[#5E5854] cursor-pointer hover:border-[#EC8E3D] transition-colors"
                >
                  <h3 className="text-xl font-bold text-[#204231] mb-2">Trips Posted</h3>
                  <p className="text-3xl font-bold text-[#EC8E3D] mb-2">{profileData.tripsPosted}</p>
                  <p className="text-[#204231]/70 text-sm">Click to view details and memories</p>
                </div>

                <div
                  onClick={() => handleViewTripMemories('joined')}
                  className="bg-[#EE9C8F] p-6 rounded-xl border border-[#5E5854] cursor-pointer hover:border-[#EC8E3D] transition-colors"
                >
                  <h3 className="text-xl font-bold text-[#204231] mb-2">Trips Joined</h3>
                  <p className="text-3xl font-bold text-[#EC8E3D] mb-2">{profileData.tripsJoined}</p>
                  <p className="text-[#204231]/70 text-sm">Click to view details and memories</p>
                </div>
              </div>

              {/* Upcoming Trips */}
              <div className="bg-[#6F93AD] p-6 rounded-xl border border-[#5E5854]">
                <h3 className="text-xl font-bold text-[#204231] mb-4">Upcoming Trips</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {upcomingTrips.map((trip) => (
                    <div key={trip.id} className="bg-[#FCCB6E] rounded-lg p-4 border border-[#5E5854]">
                      <img
                        src={trip.image}
                        alt={trip.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-bold text-[#204231] mb-1">{trip.title}</h4>
                      <p className="text-[#204231]/70 text-sm mb-2">{trip.destination}</p>
                      <p className="text-[#204231]/70 text-sm mb-2">{trip.date}</p>
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          trip.role === 'organizer'
                            ? 'bg-[#EC8E3D] text-white'
                            : 'bg-[#5E5854] text-white'
                        }`}>
                          {trip.role === 'organizer' ? '👑 Organizer' : '🎒 Member'}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          trip.status === 'confirmed'
                            ? 'bg-green-500 text-white'
                            : trip.status === 'planning'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-orange-500 text-white'
                        }`}>
                          {trip.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'memories' && (
            <div className="space-y-6">
              {/* Recent Memories */}
              <div className="bg-[#6F93AD] p-6 rounded-xl border border-[#5E5854]">
                <h3 className="text-xl font-bold text-[#204231] mb-4">Recent Travel Memories</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    { url: "https://images.unsplash.com/photo-1502602898536-47ad22581b52", location: "Paris, France", date: "Dec 2024" },
                    { url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad", location: "London, UK", date: "Nov 2024" },
                    { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4", location: "Swiss Alps", date: "Oct 2024" },
                    { url: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1", location: "Bali, Indonesia", date: "Sep 2024" },
                    { url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf", location: "Tokyo, Japan", date: "Aug 2024" },
                    { url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7", location: "Iceland", date: "Jul 2024" },
                    { url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff", location: "Santorini, Greece", date: "Jun 2024" },
                    { url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e", location: "Swiss Alps", date: "May 2024" }
                  ].map((memory, index) => (
                    <div key={index} className="relative group cursor-pointer">
                      <img
                        src={memory.url}
                        alt={memory.location}
                        className="w-full h-32 object-cover rounded-lg border border-[#5E5854] group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white font-semibold text-sm">{memory.location}</p>
                          <p className="text-white/80 text-xs">{memory.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Memory Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-[#EE9C8F] p-6 rounded-xl border border-[#5E5854] text-center">
                  <p className="text-3xl font-bold text-[#EC8E3D] mb-2">156</p>
                  <p className="text-[#204231] font-medium">Photos</p>
                </div>
                <div className="bg-[#6F93AD] p-6 rounded-xl border border-[#5E5854] text-center">
                  <p className="text-3xl font-bold text-[#EC8E3D] mb-2">42</p>
                  <p className="text-[#204231] font-medium">Videos</p>
                </div>
                <div className="bg-[#EE9C8F] p-6 rounded-xl border border-[#5E5854] text-center">
                  <p className="text-3xl font-bold text-[#EC8E3D] mb-2">23</p>
                  <p className="text-[#204231] font-medium">Countries</p>
                </div>
                <div className="bg-[#6F93AD] p-6 rounded-xl border border-[#5E5854] text-center">
                  <p className="text-3xl font-bold text-[#EC8E3D] mb-2">67</p>
                  <p className="text-[#204231] font-medium">Cities</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Reviews Received */}
              <div className="bg-[#6F93AD] p-6 rounded-xl border border-[#5E5854]">
                <h3 className="text-xl font-bold text-[#204231] mb-4">Reviews Received (4.8/5)</h3>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      reviewer: "Sarah Chen",
                      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786",
                      rating: 5,
                      comment: "Alex was an amazing travel companion! Very organized and always positive. Would definitely travel with again!",
                      trip: "European Backpacking",
                      date: "December 2024"
                    },
                    {
                      id: 2,
                      reviewer: "Mike Johnson",
                      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
                      rating: 5,
                      comment: "Great organizer and very knowledgeable about local cultures. Made our trip unforgettable!",
                      trip: "Southeast Asia Food Tour",
                      date: "November 2024"
                    },
                    {
                      id: 3,
                      reviewer: "Emma Wilson",
                      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
                      rating: 4,
                      comment: "Friendly and reliable. Good communication throughout the trip planning process.",
                      trip: "Swiss Alps Trek",
                      date: "October 2024"
                    }
                  ].map((review) => (
                    <div key={review.id} className="bg-[#FCCB6E] p-4 rounded-lg border border-[#5E5854]">
                      <div className="flex items-start space-x-4">
                        <img
                          src={review.avatar}
                          alt={review.reviewer}
                          className="w-12 h-12 rounded-full border-2 border-[#EC8E3D]"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold text-[#204231]">{review.reviewer}</h4>
                              <p className="text-[#204231]/70 text-sm">{review.trip} • {review.date}</p>
                            </div>
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <span key={i} className="text-[#EC8E3D]">★</span>
                              ))}
                            </div>
                          </div>
                          <p className="text-[#204231] italic">"{review.comment}"</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Given */}
              <div className="bg-[#EE9C8F] p-6 rounded-xl border border-[#5E5854]">
                <h3 className="text-xl font-bold text-[#204231] mb-4">Reviews Given</h3>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      reviewee: "David Park",
                      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
                      rating: 5,
                      comment: "Excellent trip organizer! Everything was perfectly planned and executed.",
                      trip: "Tokyo Explorer",
                      date: "November 2024"
                    },
                    {
                      id: 2,
                      reviewee: "Lisa Zhang",
                      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
                      rating: 4,
                      comment: "Great travel companion, very adventurous and fun to be around!",
                      trip: "Bali Adventure",
                      date: "October 2024"
                    }
                  ].map((review) => (
                    <div key={review.id} className="bg-[#FCCB6E] p-4 rounded-lg border border-[#5E5854]">
                      <div className="flex items-start space-x-4">
                        <img
                          src={review.avatar}
                          alt={review.reviewee}
                          className="w-12 h-12 rounded-full border-2 border-[#EC8E3D]"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold text-[#204231]">Review for {review.reviewee}</h4>
                              <p className="text-[#204231]/70 text-sm">{review.trip} • {review.date}</p>
                            </div>
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <span key={i} className="text-[#EC8E3D]">★</span>
                              ))}
                            </div>
                          </div>
                          <p className="text-[#204231] italic">"{review.comment}"</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showEditProfile && (
        <ProfileEdit
          profileData={profileData}
          onClose={() => setShowEditProfile(false)}
          onOTPVerification={(type) => {
            setOTPType(type);
            setShowOTPVerification(true);
          }}
        />
      )}

      {showTripMemories && (
        <TripMemories
          tripType={selectedTripType}
          onClose={() => setShowTripMemories(false)}
        />
      )}

      {showOTPVerification && (
        <OTPVerification
          type={otpType}
          onClose={() => setShowOTPVerification(false)}
          onVerified={() => {
            setShowOTPVerification(false);
            alert('Verification successful!');
          }}
        />
      )}
    </div>
  );
}
