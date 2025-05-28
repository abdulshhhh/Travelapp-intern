import { useState, useEffect } from 'react';
import NotificationSystem from './NotificationSystem';
import GroupChat from './GroupChat';
import MemberProfiles from './MemberProfiles';
import Profile from './Profile';

// Mock data for trips with enhanced structure
const mockTrips = [
  {
    id: 1,
    title: "Bali Adventure",
    destination: "Bali, Indonesia",
    duration: "7 days",
    price: "$1,200",
    image: "/assets/images/baliadventure.jpeg",
    spots: 3,
    maxSpots: 6,
    date: "March 15-22, 2025",
    organizer: "Sarah Chen",
    organizerId: "org_1",
    organizerAvatar: "/assets/images/sarachen.jpeg",
    tags: ["Beach", "Culture", "Adventure"],
    joinedMembers: [
      {
        id: "user_1",
        name: "Alex Rivera",
        avatar: "/assets/images/Alexrivera.jpeg",
        joinedDate: "2024-12-01"
      },
      {
        id: "user_2",
        name: "Maya Patel",
        avatar: "/assets/images/mayapatel.jpeg",
        joinedDate: "2024-12-03"
      },
      {
        id: "user_3",
        name: "Jordan Kim",
        avatar: "/assets/images/jordankim.jpeg",
        joinedDate: "2024-12-05"
      }
    ],
    description: "Explore the beautiful beaches and rich culture of Bali with fellow adventurers. Experience temple visits, beach relaxation, and local cuisine."
  },
  {
    id: 2,
    title: "Tokyo Explorer",
    destination: "Tokyo, Japan",
    duration: "5 days",
    price: "$1,800",
    image: "/assets/images/Tokyo.jpeg",
    spots: 2,
    maxSpots: 4,
    date: "April 10-15, 2025",
    organizer: "Mike Johnson",
    organizerId: "org_2",
    organizerAvatar: "/assets/images/mikejohnson.jpeg",
    tags: ["City", "Food", "Culture"],
    joinedMembers: [
      {
        id: "user_4",
        name: "Sophie Chen",
        avatar: "/assets/images/sophiachen.jpeg",
        joinedDate: "2024-11-28"
      },
      {
        id: "user_5",
        name: "David Park",
        avatar: "/assets/images/davidpark.jpeg",
        joinedDate: "2024-12-02"
      }
    ],
    description: "Discover Tokyo's vibrant culture, amazing food scene, and modern attractions. From traditional temples to cutting-edge technology districts."
  },
  {
    id: 3,
    title: "Swiss Alps Trek",
    destination: "Switzerland",
    duration: "10 days",
    price: "$2,500",
    image: "/assets/images/swissmount.jpeg",
    spots: 4,
    maxSpots: 8,
    date: "May 20-30, 2025",
    organizer: "Emma Wilson",
    organizerId: "org_3",
    organizerAvatar: "/assets/images/emmawilson.jpeg",
    tags: ["Mountains", "Hiking", "Nature"],
    joinedMembers: [
      {
        id: "user_6",
        name: "Carlos Rodriguez",
        avatar: "/assets/images/carlosrodriguez.jpeg",
        joinedDate: "2024-11-25"
      },
      {
        id: "user_7",
        name: "Lisa Zhang",
        avatar: "/assets/images/lisazhang.jpeg",
        joinedDate: "2024-11-30"
      },
      {
        id: "user_8",
        name: "Ahmed Hassan",
        avatar: "/assets/images/ahmedhassen.jpeg",
        joinedDate: "2024-12-01"
      },
      {
        id: "user_9",
        name: "Nina Kowalski",
        avatar: "/assets/images/ninakowalski.jpeg",
        joinedDate: "2024-12-04"
      }
    ],
    description: "Challenge yourself with breathtaking alpine hiking trails, stunning mountain vistas, and cozy mountain huts. Perfect for nature enthusiasts."
  }
];

const completedTrips = [
  {
    id: 1,
    title: "Iceland Northern Lights",
    destination: "Reykjavik, Iceland",
    image: "/assets/images/icelandnorthernlights.jpeg",
    rating: 4.9,
    participants: 8,
    date: "December 2024"
  },
  {
    id: 2,
    title: "Santorini Sunset",
    destination: "Santorini, Greece",
    image: "/assets/images/santorinisunset.jpeg",
    rating: 4.8,
    participants: 6,
    date: "October 2024"
  }
];

const testimonials = [
  {
    id: 1,
    name: "Alex Rodriguez",
    trip: "Bali Adventure",
    rating: 5,
    comment: "Amazing experience! Met incredible people and saw breathtaking places.",
    avatar: "/assets/images/Alexrivera.jpeg"
  },
  {
    id: 2,
    name: "Lisa Park",
    trip: "Tokyo Explorer",
    rating: 5,
    comment: "Perfect organization and wonderful travel companions. Highly recommend!",
    avatar: "/assets/images/lisazhang.jpeg"
  }
];

const popularDestinations = [
  { name: "Paris, France", visits: "2.3k", image: "/assets/images/paris.webp" },
  { name: "New York, USA", visits: "1.8k", image: "/assets/images/newyork.jpeg" },
  { name: "Dubai, UAE", visits: "1.5k", image: "/assets/images/dubai.jpeg" },
  { name: "London, UK", visits: "1.2k", image: "/assets/images/london.jpeg" }
];

export default function Dashboard({ onLogout }) {
  const [currentTripIndex, setCurrentTripIndex] = useState(0);
  const [currentCompletedIndex, setCurrentCompletedIndex] = useState(0);
  const [showPostTrip, setShowPostTrip] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showTripDetails, setShowTripDetails] = useState(false);
  const [joinedTrips, setJoinedTrips] = useState([]);
  const [showGroupChat, setShowGroupChat] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [newTrip, setNewTrip] = useState({
    destination: '',
    departure: '',
    numberOfPeople: 0,
    maxPeople: 0,
    fromDate: '',
    toDate: '',
    transport: '',
    budget: '',
    description: ''
  });

  // Current user data (in a real app, this would come from authentication)
  const currentUser = {
    id: "current_user",
    name: "Alex Rivera",
    avatar: "/assets/images/Alexrivera.jpeg",
    email: "alex.rivera@nomadnova.com",
    fullName: "Alex Rivera",
    bio: "Passionate traveler and adventure seeker. Love exploring new cultures, meeting amazing people, and creating unforgettable memories around the world! 🌍✈️",
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567"
  };
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [availableTrips, setAvailableTrips] = useState(mockTrips);

  // Auto-rotate carousels
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTripIndex((prev) => (prev + 1) % mockTrips.length);
      setCurrentCompletedIndex((prev) => (prev + 1) % completedTrips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle functions
  const handleJoinTrip = (tripId) => {
    if (!joinedTrips.includes(tripId)) {
      const trip = availableTrips.find(t => t.id === tripId);

      // Check if trip is at capacity before joining
      if (trip && trip.spots > 0) {
        // Add current user to trip's joined members
        const newMember = {
          ...currentUser,
          joinedDate: new Date().toISOString().split('T')[0]
        };

        // Add trip to joined trips
        setJoinedTrips([...joinedTrips, tripId]);

        // Update available spots and add member
        setAvailableTrips(availableTrips.map(t => {
          if (t.id === tripId) {
            return {
              ...t,
              spots: t.spots - 1,
              joinedMembers: [...t.joinedMembers, newMember]
            };
          }
          return t;
        }));

        // Send notification to trip organizer
        const notification = {
          id: Date.now(),
          type: 'join_request',
          tripId: tripId,
          tripTitle: trip.title,
          userName: currentUser.name,
          userAvatar: currentUser.avatar,
          organizerId: trip.organizerId,
          timestamp: new Date().toISOString(),
          read: false
        };

        setNotifications(prev => [notification, ...prev]);

        alert('Successfully joined the trip! 🎉 The organizer has been notified.');
      } else {
        alert('Sorry, this trip is full!');
      }
    }
  };

  const handleViewTrip = (trip) => {
    setSelectedTrip(trip);
    setShowTripDetails(true);
  };

  const handleStartGroupChat = () => {
    setShowGroupChat(true);
  };

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleMarkNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  const handleShowProfile = () => {
    setShowProfile(true);
  };

  const handleProfileMessage = () => {
    // In a real app, this would open a messaging interface
    alert('Opening message interface...');
  };

  const handlePostTrip = () => {
    // Validate form
    if (!newTrip.destination || !newTrip.departure || !newTrip.fromDate ||
        !newTrip.toDate || !newTrip.budget || !newTrip.maxPeople) {
      alert('Please fill in all required fields');
      return;
    }

    // Calculate duration based on dates
    const fromDate = new Date(newTrip.fromDate);
    const toDate = new Date(newTrip.toDate);
    const durationDays = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24));

    // Create new trip object
    const tripToAdd = {
      id: availableTrips.length + 1,
      title: `${newTrip.destination} Adventure`,
      destination: newTrip.destination,
      departure: newTrip.departure,
      duration: `${durationDays} days`,
      price: newTrip.budget,
      image: "/assets/images/default.jpeg", // Default image
      spots: newTrip.maxPeople - newTrip.numberOfPeople,
      date: `${formatDate(fromDate)} - ${formatDate(toDate)}`,
      organizer: "You", // In a real app, this would be the current user
      tags: ["Adventure", "Travel"],
      transport: newTrip.transport,
      description: newTrip.description
    };

    // Add the new trip to available trips
    setAvailableTrips([tripToAdd, ...availableTrips]);

    // Reset form and close modal
    setShowPostTrip(false);
    setNewTrip({
      destination: '',
      departure: '',
      numberOfPeople: 0,
      maxPeople: 0,
      fromDate: '',
      toDate: '',
      transport: '',
      budget: '',
      description: ''
    });

    alert('Trip posted successfully! 🌟');
  };

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    setShowPhotoModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrip(prev => ({ ...prev, [name]: value }));
  };

  const checkTripCapacity = (tripId) => {
    const trip = availableTrips.find(t => t.id === tripId);
    if (trip && trip.spots <= 1) {
      // Send notification to admin (in a real app, this would be an API call)
      alert('Admin notification: Trip is at capacity and one more person is requesting to join!');
    }
  };

  const formatDate = (date) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-[#FCCB6E]">
      {/* Header */}
      <header className="bg-[#204231] shadow-lg border-b-2 border-[#5E5854]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-[#FCCB6E]">NomadNova</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#trips" className="text-[#6F93AD] hover:text-[#EC8E3D] transition-colors font-medium">Trips</a>
                <a href="#completed" className="text-[#6F93AD] hover:text-[#EC8E3D] transition-colors font-medium">Completed</a>
                <a href="#destinations" className="text-[#6F93AD] hover:text-[#EC8E3D] transition-colors font-medium">Destinations</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationSystem
                notifications={notifications}
                showNotifications={showNotifications}
                onToggleNotifications={handleToggleNotifications}
                onMarkAsRead={handleMarkNotificationAsRead}
                onClearAll={handleClearAllNotifications}
              />
              <button
                onClick={handleShowProfile}
                className="flex items-center space-x-2 bg-[#6F93AD] hover:bg-[#5E5854] text-white px-4 py-2 rounded-full transition-colors font-semibold shadow-lg"
              >
                <img
                  src={currentUser.avatar}
                  alt="Profile"
                  className="w-6 h-6 rounded-full border border-white"
                />
                <span>Profile</span>
              </button>
              <button
                onClick={() => setShowPostTrip(true)}
                className="bg-[#EC8E3D] hover:bg-[#EE9C8F] text-white px-6 py-2 rounded-full transition-colors font-semibold shadow-lg"
              >
                Post Trip
              </button>
              <button
                onClick={onLogout}
                className="bg-[#5E5854] hover:bg-[#204231] text-white px-6 py-2 rounded-full transition-colors font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Welcome Section */}
        <section className="text-center bg-[#6F93AD] rounded-2xl p-8 border-2 border-[#5E5854] shadow-xl">
          <h2 className="text-4xl font-bold mb-4 text-[#204231]">Welcome back, Traveler!</h2>
          <p className="text-xl text-[#204231]/80 font-medium">Discover your next adventure with like-minded explorers</p>
        </section>

        {/* Available Trips Carousel */}
        <section id="trips" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-bold text-[#204231]">Available Trips</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentTripIndex((prev) => (prev - 1 + mockTrips.length) % mockTrips.length)}
                className="p-3 bg-[#EC8E3D] hover:bg-[#EE9C8F] rounded-full text-white transition-colors shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentTripIndex((prev) => (prev + 1) % mockTrips.length)}
                className="p-3 bg-[#EC8E3D] hover:bg-[#EE9C8F] rounded-full text-white transition-colors shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableTrips.map((trip, index) => (
              <div
                key={trip.id}
                className={`bg-[#FCCB6E] rounded-2xl p-6 border-2 border-[#5E5854] shadow-lg transition-all duration-500 transform ${
                  index === currentTripIndex ? 'scale-105 z-10' : 'scale-100 opacity-90'
                }`}
              >
                <div className="relative">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#EC8E3D] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {trip.price}
                    </span>
                  </div>
                </div>
                <div className="p-6 bg-[#6F93AD]">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-bold text-[#204231]">{trip.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      joinedTrips.includes(trip.id)
                        ? 'bg-[#EE9C8F] text-[#204231]'
                        : 'bg-[#FCCB6E] text-[#204231]'
                    }`}>
                      {joinedTrips.includes(trip.id) ? 'JOINED' : 'OPEN'}
                    </span>
                  </div>
                  <p className="text-[#204231] font-medium mb-2">{trip.destination}</p>
                  <p className="text-[#204231]/70 mb-3">{trip.duration} • {trip.date}</p>
                  <p className="text-[#204231]/80 text-sm mb-3">Organized by {trip.organizer}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {trip.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-[#204231] text-[#FCCB6E] rounded-full text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[#204231] font-medium">{trip.spots} spots left</span>
                    <div className="flex items-center text-[#204231]">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm"></span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewTrip(trip)}
                      className="flex-1 bg-[#5E5854] hover:bg-[#204231] text-white px-4 py-2 rounded-full transition-colors font-semibold"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleJoinTrip(trip.id)}
                      disabled={joinedTrips.includes(trip.id)}
                      className={`flex-1 px-4 py-2 rounded-full transition-colors font-semibold ${
                        joinedTrips.includes(trip.id)
                          ? 'bg-[#EE9C8F] text-[#204231] cursor-not-allowed'
                          : 'bg-[#EC8E3D] hover:bg-[#EE9C8F] text-white'
                      }`}
                    >
                      {joinedTrips.includes(trip.id) ? 'Joined ✓' : 'Join Trip'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Trip Details Modal */}
        {showTripDetails && selectedTrip && (
          <section className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#6F93AD] rounded-2xl p-8 max-w-5xl w-full border-2 border-[#5E5854] shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-[#204231]">{selectedTrip.title}</h3>
                <button
                  onClick={() => setShowTripDetails(false)}
                  className="text-[#204231] hover:text-[#EC8E3D] text-3xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Trip Info */}
                <div className="space-y-6">
                  <div>
                    <img
                      src={selectedTrip.image}
                      alt={selectedTrip.title}
                      className="w-full h-64 object-cover rounded-xl border-2 border-[#5E5854]"
                    />
                  </div>

                  <div className="bg-[#FCCB6E] p-4 rounded-xl border border-[#5E5854]">
                    <h4 className="font-bold text-[#204231] mb-3">Trip Details</h4>
                    <div className="space-y-2 text-[#204231]">
                      <p><strong>Destination:</strong> {selectedTrip.destination}</p>
                      <p><strong>Duration:</strong> {selectedTrip.duration}</p>
                      <p><strong>Dates:</strong> {selectedTrip.date}</p>
                      <p><strong>Price:</strong> {selectedTrip.price}</p>
                      <p><strong>Organizer:</strong> {selectedTrip.organizer}</p>
                      <p><strong>Available Spots:</strong> {selectedTrip.spots} of {selectedTrip.maxSpots}</p>
                    </div>
                  </div>

                  <div className="bg-[#EE9C8F] p-4 rounded-xl border border-[#5E5854]">
                    <h4 className="font-bold text-[#204231] mb-3">What's Included</h4>
                    <ul className="text-[#204231] space-y-1">
                      <li>✓ Accommodation (shared rooms)</li>
                      <li>✓ Local transportation</li>
                      <li>✓ Guided tours</li>
                      <li>✓ Some meals included</li>
                      <li>✓ Travel insurance</li>
                    </ul>
                  </div>

                  {selectedTrip.description && (
                    <div className="bg-[#FCCB6E] p-4 rounded-xl border border-[#5E5854]">
                      <h4 className="font-bold text-[#204231] mb-3">About This Trip</h4>
                      <p className="text-[#204231]">{selectedTrip.description}</p>
                    </div>
                  )}
                </div>

                {/* Right Column - Members & Chat */}
                <div className="space-y-6">
                  <div className="bg-[#FCCB6E] p-4 rounded-xl border border-[#5E5854]">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-[#204231]">
                        Trip Members ({selectedTrip.joinedMembers.length + 1}/{selectedTrip.maxSpots})
                      </h4>
                      {joinedTrips.includes(selectedTrip.id) && (
                        <button
                          onClick={handleStartGroupChat}
                          className="bg-[#EC8E3D] hover:bg-[#EE9C8F] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                        >
                          💬 Group Chat
                        </button>
                      )}
                    </div>

                    <MemberProfiles
                      trip={selectedTrip}
                      onStartChat={handleStartGroupChat}
                    />
                  </div>

                  {/* Trip Stats */}
                  <div className="bg-[#EE9C8F] p-4 rounded-xl border border-[#5E5854]">
                    <h4 className="font-bold text-[#204231] mb-3">Trip Statistics</h4>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-[#204231]">{selectedTrip.joinedMembers.length + 1}</p>
                        <p className="text-[#204231]/70 text-sm">Members Joined</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[#204231]">{selectedTrip.spots}</p>
                        <p className="text-[#204231]/70 text-sm">Spots Available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex space-x-4">
                <button
                  onClick={() => setShowTripDetails(false)}
                  className="flex-1 bg-[#5E5854] hover:bg-[#204231] text-white py-3 rounded-xl transition-colors font-semibold"
                >
                  Close
                </button>
                {joinedTrips.includes(selectedTrip.id) ? (
                  <button
                    onClick={handleStartGroupChat}
                    className="flex-1 bg-[#6F93AD] hover:bg-[#5E5854] text-white py-3 rounded-xl transition-colors font-semibold"
                  >
                    💬 Open Group Chat
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoinTrip(selectedTrip.id)}
                    disabled={selectedTrip.spots === 0}
                    className={`flex-1 py-3 rounded-xl transition-colors font-semibold ${
                      selectedTrip.spots === 0
                        ? 'bg-[#5E5854] text-white cursor-not-allowed'
                        : 'bg-[#EC8E3D] hover:bg-[#EE9C8F] text-white'
                    }`}
                  >
                    {selectedTrip.spots === 0 ? 'Trip Full' : 'Join This Trip'}
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Post Trip Section with Enhanced AI Suggestions */}
        {showPostTrip && (
          <section className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#6F93AD] rounded-2xl p-8 max-w-2xl w-full border-2 border-[#5E5854] shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-[#204231]">Post a New Trip</h3>
                <button
                  onClick={() => setShowPostTrip(false)}
                  className="text-[#204231] hover:text-[#EC8E3D] text-3xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[#204231] font-semibold mb-2">Departure</label>
                  <input
                    type="text"
                    name="departure"
                    value={newTrip.departure}
                    onChange={handleInputChange}
                    placeholder="Where are you departing from?"
                    className="w-full px-4 py-3 bg-[#FCCB6E] border-2 border-[#5E5854] rounded-xl text-[#204231] placeholder-[#204231]/60 focus:outline-none focus:ring-2 focus:ring-[#EC8E3D] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[#204231] font-semibold mb-2">Destination</label>
                  <input
                    type="text"
                    name="destination"
                    value={newTrip.destination}
                    onChange={handleInputChange}
                    placeholder="Where are you going?"
                    className="w-full px-4 py-3 bg-[#FCCB6E] border-2 border-[#5E5854] rounded-xl text-[#204231] placeholder-[#204231]/60 focus:outline-none focus:ring-2 focus:ring-[#EC8E3D] font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#204231] font-semibold mb-2">Max People</label>
                    <input
                      type="number"
                      name="maxPeople"
                      value={newTrip.maxPeople}
                      onChange={handleInputChange}
                      placeholder="Maximum number of people"
                      className="w-full px-4 py-3 bg-[#FCCB6E] border-2 border-[#5E5854] rounded-xl text-[#204231] placeholder-[#204231]/60 focus:outline-none focus:ring-2 focus:ring-[#EC8E3D] font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[#204231] font-semibold mb-2">Current People</label>
                    <input
                      type="number"
                      name="numberOfPeople"
                      value={newTrip.numberOfPeople}
                      onChange={handleInputChange}
                      placeholder="Current number of people"
                      className="w-full px-4 py-3 bg-[#FCCB6E] border-2 border-[#5E5854] rounded-xl text-[#204231] placeholder-[#204231]/60 focus:outline-none focus:ring-2 focus:ring-[#EC8E3D] font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#204231] font-semibold mb-2">From Date</label>
                    <input
                      type="date"
                      name="fromDate"
                      value={newTrip.fromDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#FCCB6E] border-2 border-[#5E5854] rounded-xl text-[#204231] placeholder-[#204231]/60 focus:outline-none focus:ring-2 focus:ring-[#EC8E3D] font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[#204231] font-semibold mb-2">To Date</label>
                    <input
                      type="date"
                      name="toDate"
                      value={newTrip.toDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#FCCB6E] border-2 border-[#5E5854] rounded-xl text-[#204231] placeholder-[#204231]/60 focus:outline-none focus:ring-2 focus:ring-[#EC8E3D] font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#204231] font-semibold mb-2">Mode of Transport</label>
                  <div className="flex items-center">
                    <select
                      name="transport"
                      value={newTrip.transport}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 bg-[#FCCB6E] border-2 border-[#5E5854] rounded-xl text-[#204231] focus:outline-none focus:ring-2 focus:ring-[#EC8E3D] font-medium"
                    >
                      <option value="">Select transport</option>
                      <option value="flight">Flight</option>
                      <option value="train">Train</option>
                      <option value="bus">Bus</option>
                      <option value="car">Car</option>
                      <option value="other">Other</option>
                    </select>
                    <button
                      className="ml-2 bg-[#204231] text-white px-4 py-3 rounded-xl hover:bg-[#5E5854] transition-colors"
                      onClick={() => window.open('https://www.transportoptions.com', '_blank')}
                    >
                      View Options
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[#204231] font-semibold mb-2">Budget</label>
                  <input
                    type="text"
                    name="budget"
                    value={newTrip.budget}
                    onChange={handleInputChange}
                    placeholder="e.g., $1,500"
                    className="w-full px-4 py-3 bg-[#FCCB6E] border-2 border-[#5E5854] rounded-xl text-[#204231] placeholder-[#204231]/60 focus:outline-none focus:ring-2 focus:ring-[#EC8E3D] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[#204231] font-semibold mb-2">Description</label>
                  <textarea
                    name="description"
                    value={newTrip.description}
                    onChange={handleInputChange}
                    placeholder="Tell us about your trip..."
                    rows="3"
                    className="w-full px-4 py-3 bg-[#FCCB6E] border-2 border-[#5E5854] rounded-xl text-[#204231] placeholder-[#204231]/60 focus:outline-none focus:ring-2 focus:ring-[#EC8E3D] font-medium resize-none"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowPostTrip(false)}
                    className="flex-1 bg-[#5E5854] hover:bg-[#204231] text-white py-3 rounded-xl transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePostTrip}
                    className="flex-1 bg-[#EC8E3D] hover:bg-[#EE9C8F] text-white py-3 rounded-xl transition-colors font-semibold"
                  >
                    Post Trip 🚀
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Completed Trips Carousel */}
        <section id="completed" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-bold text-[#204231]">Completed Adventures</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentCompletedIndex((prev) => (prev - 1 + completedTrips.length) % completedTrips.length)}
                className="p-3 bg-[#EC8E3D] hover:bg-[#EE9C8F] rounded-full text-white transition-colors shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentCompletedIndex((prev) => (prev + 1) % completedTrips.length)}
                className="p-3 bg-[#EC8E3D] hover:bg-[#EE9C8F] rounded-full text-white transition-colors shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedTrips.map((trip, index) => (
              <div
                key={trip.id}
                className={`bg-[#6F93AD] rounded-2xl overflow-hidden border-2 border-[#5E5854] transition-all duration-500 shadow-lg hover:shadow-xl ${
                  index === currentCompletedIndex ? 'scale-105 ring-4 ring-[#EE9C8F]' : 'scale-100'
                }`}
              >
                <div className="relative">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#EE9C8F] text-[#204231] px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      COMPLETED ✓
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-[#FCCB6E] text-lg">★</span>
                      <span className="text-white font-bold ml-1">{trip.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-[#6F93AD]">
                  <h4 className="text-xl font-bold text-[#204231] mb-2">{trip.title}</h4>
                  <p className="text-[#204231] font-medium mb-3">{trip.destination}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-[#204231] font-medium">{trip.participants} travelers</span>
                    </div>
                    <span className="text-[#204231]/70 font-medium">{trip.date}</span>
                  </div>
                  <div className="bg-[#FCCB6E] p-3 rounded-lg border border-[#5E5854]">
                    <p className="text-[#204231] text-sm font-medium">
                      "An amazing adventure with wonderful people! The memories will last forever."
                      <span className="block mt-1 text-xs opacity-70">- Recent traveler review</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Photos and Videos Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-bold text-[#204231]">Travel Memories</h3>
            <span className="text-[#204231]/70 font-medium">Click to view full size</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { url: "/assets/images/MountainAdventure.jpeg", title: "Mountain Adventure", location: "Swiss Alps" },
              { url: "/assets/images/AlpineViews.jpeg", title: "Alpine Views", location: "Switzerland" },
              { url: "/assets/images/Tokyo.jpeg", title: "Tokyo Nights", location: "Japan" },
              { url: "/assets/images/BaliBeach.jpeg", title: "Bali Beach", location: "Indonesia" },
              { url: "/assets/images/icelandnorthernlights.jpeg", title: "Northern Lights", location: "Iceland" },
              { url: "/assets/images/santorinisunset.jpeg", title: "Santorini Sunset", location: "Greece" },
              { url: "/assets/images/parisromance.jpg", title: "Paris Romance", location: "France" },
              { url: "/assets/images/NYCSkyline.jpeg", title: "NYC Skyline", location: "USA" }
            ].map((photo, index) => (
              <div
                key={index}
                onClick={() => handlePhotoClick(photo)}
                className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-[#5E5854] bg-[#6F93AD] shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white font-semibold text-sm">{photo.title}</p>
                    <p className="text-white/80 text-xs">{photo.location}</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-[#EC8E3D] rounded-full p-2 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Photo Modal */}
        {showPhotoModal && selectedPhoto && (
          <section className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              <button
                onClick={() => setShowPhotoModal(false)}
                className="absolute top-4 right-4 z-10 bg-[#EC8E3D] hover:bg-[#EE9C8F] text-white rounded-full p-2 shadow-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="bg-[#6F93AD] rounded-2xl overflow-hidden border-2 border-[#5E5854] shadow-2xl">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <div className="p-6 bg-[#6F93AD]">
                  <h4 className="text-2xl font-bold text-[#204231] mb-2">{selectedPhoto.title}</h4>
                  <p className="text-[#204231] font-medium">{selectedPhoto.location}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        <section className="space-y-6">
          <h3 className="text-3xl font-bold text-[#204231]">What Travelers Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-[#6F93AD] rounded-2xl p-6 border-2 border-[#5E5854] shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#EE9C8F]"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#EC8E3D] rounded-full p-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#204231] font-bold">{testimonial.name}</h4>
                    <p className="text-[#204231]/70 text-sm font-medium">{testimonial.trip}</p>
                  </div>
                  <div className="flex bg-[#FCCB6E] px-3 py-1 rounded-full border border-[#5E5854]">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-[#EC8E3D] text-lg">★</span>
                    ))}
                  </div>
                </div>
                <div className="bg-[#FCCB6E] p-4 rounded-xl border border-[#5E5854]">
                  <p className="text-[#204231] italic font-medium">"{testimonial.comment}"</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Destinations Section */}
        <section id="destinations" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-bold text-[#204231]">Popular Destinations</h3>
            <span className="text-[#204231]/70 font-medium">Trending this month</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularDestinations.map((destination, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-xl bg-[#6F93AD] border-2 border-[#5E5854] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className="bg-[#EC8E3D] text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                    🔥 {destination.visits}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-white font-bold text-sm mb-1">{destination.name}</h4>
                  <div className="flex items-center justify-between">
                    <p className="text-white/80 text-xs">{destination.visits} recent visits</p>
                    <div className="bg-[#FCCB6E] text-[#204231] px-2 py-1 rounded-full text-xs font-semibold">
                      Explore
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-[#EC8E3D]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </section>

        {/* Footer Section */}
        <section className="bg-[#204231] rounded-2xl p-8 border-2 border-[#5E5854] text-center">
          <h3 className="text-2xl font-bold text-[#FCCB6E] mb-4">Ready for Your Next Adventure?</h3>
          <p className="text-[#6F93AD] mb-6 font-medium">Join thousands of travelers discovering the world together</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowPostTrip(true)}
              className="bg-[#EC8E3D] hover:bg-[#EE9C8F] text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-colors"
            >
              Post Your Trip
            </button>
            <button className="bg-[#6F93AD] hover:bg-[#5E5854] text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-colors">
              Browse All Trips
            </button>
          </div>
        </section>
      </div>

      {/* Group Chat Modal */}
      {showGroupChat && selectedTrip && (
        <GroupChat
          trip={selectedTrip}
          currentUser={currentUser}
          onClose={() => setShowGroupChat(false)}
        />
      )}

      {/* Profile Modal */}
      {showProfile && (
        <Profile
          currentUser={currentUser}
          onClose={() => setShowProfile(false)}
          onMessage={handleProfileMessage}
        />
      )}
    </div>
  );
}






