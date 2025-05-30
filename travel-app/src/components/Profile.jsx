import { useState } from 'react';
import ProfileEdit from './ProfileEdit';
import TripMemories from './TripMemories';
import OTPVerification from './OTPVerification';
import { 
  FiUser, FiMapPin, FiCalendar, FiStar, FiGlobe, FiEdit2, FiMessageSquare, 
  FiShare2, FiX, FiPlus, FiCheck, FiAward, FiCamera, FiHeart, FiFlag, 
  FiClock, FiBookmark, FiUsers, FiNavigation, FiMail, FiPhone, FiVideo
} from 'react-icons/fi';

export default function Profile({ currentUser, onClose, onMessage }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showTripMemories, setShowTripMemories] = useState(false);
  const [selectedTripType, setSelectedTripType] = useState('');
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [otpType, setOTPType] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);

  // User profile data
  const profileData = {
    ...currentUser,
    fullName: "Alex Rivera",
    bio: "Passionate traveler and adventure seeker. Love exploring new cultures, meeting amazing people, and creating unforgettable memories around the world!",
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
      image: "/assets/images/baliadventure.jpeg",
      role: "member",
      status: "confirmed"
    },
    {
      id: 2,
      title: "European Backpacking",
      destination: "Multiple Cities",
      date: "June 1-30, 2025",
      image: "/assets/images/EuropeanBackpacking.jpeg",
      role: "organizer",
      status: "planning"
    },
    {
      id: 3,
      title: "Safari Experience",
      destination: "Kenya",
      date: "August 10-20, 2025",
      image: "/assets/images/SafariExperience.jpeg",
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
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FiUser className="w-5 h-5" /> },
    { id: 'trips', label: 'Trips', icon: <FiBookmark className="w-5 h-5" /> },
    { id: 'memories', label: 'Memories', icon: <FiCamera className="w-5 h-5" /> },
    { id: 'reviews', label: 'Reviews', icon: <FiStar className="w-5 h-5" /> }
  ];

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Main container with clean white background */}
      <div className="bg-white rounded-xl w-full max-w-4xl h-[90vh] shadow-2xl flex flex-col overflow-hidden">
        {/* Header with subtle gradient */}
        <div className="bg-gradient-to-r from-yellow-50 to-purple-50 p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              {/* Profile Picture */}
              <div className="relative">
                <img
                  src={profileData.avatar}
                  alt={profileData.fullName}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                />
                {profileData.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-1.5">
                    <FiCheck className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div>
                <div className="flex items-center">
                  <h2 className="text-2xl font-bold text-gray-800">{profileData.fullName}</h2>
                  {profileData.verified && (
                    <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-600 text-xs font-medium rounded-full flex items-center">
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-1">
                  <FiMapPin className="mr-1" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-500">
                  <div className="flex items-center">
                    <FiStar className="mr-1 text-yellow-400 fill-yellow-400" />
                    <span>{profileData.rating} ({profileData.followers} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <FiGlobe className="mr-1 text-yellow-400" />
                    <span>{profileData.totalCountries} countries</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors p-1"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">{profileData.connections}</p>
              <p className="text-gray-500 text-xs">Connections</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">{profileData.tripsPosted}</p>
              <p className="text-gray-500 text-xs">Trips Posted</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">{profileData.tripsJoined}</p>
              <p className="text-gray-500 text-xs">Trips Joined</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">{profileData.upcomingTrips}</p>
              <p className="text-gray-500 text-xs">Upcoming</p>
            </div>
          </div>
        </div>

        {/* Main action buttons */}
        <div className="flex justify-between px-6 py-3 bg-white border-b border-gray-200">
          <div className="flex space-x-2">
            {currentUser.id === profileData.id ? (
              <button
                onClick={handleEditProfile}
                className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors flex items-center border border-gray-300 shadow-sm"
              >
                <FiEdit2 className="mr-2" />
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleFollow}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center shadow-sm ${
                    isFollowing
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300'
                      : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <FiCheck className="mr-2" />
                      Following
                    </>
                  ) : (
                    <>
                      <FiPlus className="mr-2" />
                      Follow
                    </>
                  )}
                </button>
                <button
                  onClick={onMessage}
                  className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors flex items-center border border-gray-300 shadow-sm"
                >
                  <FiMessageSquare className="mr-2" />
                  Message
                </button>
              </>
            )}
          </div>
          <button
            onClick={handleShare}
            className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors flex items-center border border-gray-300 shadow-sm"
          >
            <FiShare2 className="mr-2" />
            Share
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 font-medium text-sm transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-yellow-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </div>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500 rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* About Section */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">About</h3>
                <p className="text-gray-600 leading-relaxed">{profileData.bio}</p>
              </div>

              {/* Travel Categories */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Travel Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.travelCategories.map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-sm font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages & Response Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Languages</h3>
                  <div className="space-y-2">
                    {profileData.languages.map((language, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        <span className="text-gray-600">{language}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Response Info</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <FiMail className="mr-2 text-yellow-500" />
                      <span><strong>Response Rate:</strong> {profileData.responseRate}</span>
                    </div>
                    <div className="flex items-center">
                      <FiClock className="mr-2 text-yellow-500" />
                      <span><strong>Response Time:</strong> {profileData.responseTime}</span>
                    </div>
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
                  className="bg-white p-6 rounded-lg border border-gray-200 cursor-pointer hover:border-yellow-300 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Trips Posted</h3>
                  <p className="text-2xl font-bold text-yellow-500 mb-2">{profileData.tripsPosted}</p>
                  <p className="text-gray-500 text-sm">Click to view details and memories</p>
                </div>

                <div
                  onClick={() => handleViewTripMemories('joined')}
                  className="bg-white p-6 rounded-lg border border-gray-200 cursor-pointer hover:border-yellow-300 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Trips Joined</h3>
                  <p className="text-2xl font-bold text-yellow-500 mb-2">{profileData.tripsJoined}</p>
                  <p className="text-gray-500 text-sm">Click to view details and memories</p>
                </div>
              </div>

              {/* Upcoming Trips */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Upcoming Trips</h3>
                  <button className="text-yellow-500 text-sm font-medium">View All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {upcomingTrips.map((trip) => (
                    <div key={trip.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                      <img
                        src={trip.image}
                        alt={trip.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-semibold text-gray-800 mb-1">{trip.title}</h4>
                      <p className="text-gray-500 text-sm mb-2">{trip.destination}</p>
                      <p className="text-gray-500 text-sm mb-2">{trip.date}</p>
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          trip.role === 'organizer'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {trip.role === 'organizer' ? (
                            <span className="flex items-center"><FiAward className="mr-1" /> Organizer</span>
                          ) : (
                            <span className="flex items-center"><FiUsers className="mr-1" /> Member</span>
                          )}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          trip.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : trip.status === 'planning'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-orange-100 text-orange-700'
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
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Travel Memories</h3>
                  <button className="text-yellow-500 text-sm font-medium">View All</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    { url: "/assets/images/paris.webp", location: "Paris, France", date: "Dec 2024" },
                    { url: "/assets/images/london.jpeg", location: "London, UK", date: "Nov 2024" },
                    { url: "/assets/images/swissalps.jpeg", location: "Swiss Alps", date: "Oct 2024" },
                    { url: "/assets/images/baliadventure.jpeg", location: "Bali, Indonesia", date: "Sep 2024" },
                    { url: "/assets/images/Tokyo.jpeg", location: "Tokyo, Japan", date: "Aug 2024" },
                    { url: "/assets/images/icelandnorthernlights.jpeg", location: "Iceland", date: "Jul 2024" },
                    { url: "/assets/images/santorinisunset.jpeg", location: "Santorini, Greece", date: "Jun 2024" },
                    { url: "/assets/images/swissmount.jpeg", location: "Swiss Alps", date: "May 2024" }
                  ].map((memory, index) => (
                    <div key={index} className="relative group cursor-pointer">
                      <img
                        src={memory.url}
                        alt={memory.location}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200 group-hover:shadow-md transition-all"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white font-medium text-sm">{memory.location}</p>
                          <p className="text-white/80 text-xs">{memory.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Memory Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                  <p className="text-2xl font-bold text-yellow-500 mb-1">156</p>
                  <p className="text-gray-500 text-sm">Photos</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                  <p className="text-2xl font-bold text-yellow-500 mb-1">42</p>
                  <p className="text-gray-500 text-sm">Videos</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                  <p className="text-2xl font-bold text-yellow-500 mb-1">23</p>
                  <p className="text-gray-500 text-sm">Countries</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                  <p className="text-2xl font-bold text-yellow-500 mb-1">67</p>
                  <p className="text-gray-500 text-sm">Cities</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Reviews Received */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Reviews Received</h3>
                    <div className="flex items-center mt-1">
                      <FiStar className="text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-gray-600 font-medium">4.8</span>
                      <span className="text-gray-500 text-sm ml-1">({profileData.followers} reviews)</span>
                    </div>
                  </div>
                  <button className="text-yellow-500 text-sm font-medium">View All</button>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      reviewer: "Sarah Chen",
                      avatar: "/assets/images/sarachen.jpeg",
                      rating: 5,
                      comment: "Alex was an amazing travel companion! Very organized and always positive. Would definitely travel with again!",
                      trip: "European Backpacking",
                      date: "December 2024"
                    },
                    {
                      id: 2,
                      reviewer: "Mike Johnson",
                      avatar: "/assets/images/mikejohnson.jpeg",
                      rating: 5,
                      comment: "Great organizer and very knowledgeable about local cultures. Made our trip unforgettable!",
                      trip: "Southeast Asia Food Tour",
                      date: "November 2024"
                    },
                    {
                      id: 3,
                      reviewer: "Emma Wilson",
                      avatar: "/assets/images/emmawilson.jpeg",
                      rating: 4,
                      comment: "Friendly and reliable. Good communication throughout the trip planning process.",
                      trip: "Swiss Alps Trek",
                      date: "October 2024"
                    }
                  ].map((review) => (
                    <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <img
                          src={review.avatar}
                          alt={review.reviewer}
                          className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-800">{review.reviewer}</h4>
                              <p className="text-gray-500 text-xs">{review.trip} • {review.date}</p>
                            </div>
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <FiStar key={i} className="text-yellow-400 fill-yellow-400 w-4 h-4" />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 mt-2 text-sm">"{review.comment}"</p>
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