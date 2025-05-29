import { useState, useEffect } from 'react';
import NotificationSystem from './NotificationSystem';
import GroupChat from './GroupChat';
import MemberProfiles from './MemberProfiles';
import { FiArrowLeft, FiArrowRight, FiCheck, FiX, FiMessageSquare, FiStar, FiEye, FiPlus, FiUser, FiCalendar, FiMapPin, FiDollarSign, FiUsers, FiTruck, FiEdit2, FiHeart, FiChevronLeft, FiChevronRight, FiMail } from 'react-icons/fi';

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

function Profile({ user, onClose, onMessage, onPhotoClick }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-4xl w-full border border-[#d1c7b7] shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold text-[#2c5e4a]">Profile</h3>
          <button
            onClick={onClose}
            className="text-[#5E5854] hover:text-[#f87c6d] text-3xl font-bold"
          >
            <FiX />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="flex flex-col items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-[#f8d56b] object-cover mb-4 cursor-pointer"
                onClick={() => onPhotoClick(user.avatar)}
              />
              <h4 className="text-2xl font-bold text-[#2c5e4a]">{user.fullName || user.name}</h4>
              <p className="text-[#5E5854]">{user.location}</p>
              <button
                onClick={onMessage}
                className="mt-4 bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] hover:from-[#f87c6d] hover:to-[#f8a95d] text-white px-6 py-2 rounded-full transition-colors font-semibold flex items-center"
              >
                <FiMail className="mr-2" /> Message
              </button>
            </div>

            <div className="bg-[#f8f4e3] p-4 rounded-xl border border-[#d1c7b7]">
              <h4 className="font-bold text-[#2c5e4a] mb-3">Contact Information</h4>
              <div className="space-y-2 text-[#5E5854]">
                <p className="flex items-center">
                  <FiMail className="mr-2" /> {user.email}
                </p>
                <p className="flex items-center">
                  <FiUser className="mr-2" /> {user.phone}
                </p>
              </div>
            </div>

            <div className="bg-[#f8f4e3] p-4 rounded-xl border border-[#d1c7b7]">
              <h4 className="font-bold text-[#2c5e4a] mb-3">About Me</h4>
              <p className="text-[#5E5854]">{user.bio}</p>
            </div>
          </div>

          {/* Right Column - Photos and Trips */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#f8f4e3] p-4 rounded-xl border border-[#d1c7b7]">
              <h4 className="font-bold text-[#2c5e4a] mb-3">My Photos</h4>
              <div className="grid grid-cols-3 gap-4">
                {user.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="aspect-square overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => onPhotoClick(photo)}
                  >
                    <img
                      src={photo}
                      alt={`User photo ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#f8f4e3] p-4 rounded-xl border border-[#d1c7b7]">
              <h4 className="font-bold text-[#2c5e4a] mb-3">Upcoming Trips</h4>
              <div className="space-y-4">
                {mockTrips.filter(trip => 
                  trip.joinedMembers.some(member => member.id === user.id)
                ).map(trip => (
                  <div key={trip.id} className="flex items-center bg-white p-3 rounded-lg border border-[#d1c7b7]">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-16 h-16 rounded-lg object-cover mr-4"
                    />
                    <div>
                      <h5 className="font-bold text-[#2c5e4a]">{trip.title}</h5>
                      <p className="text-sm text-[#5E5854]">{trip.destination} • {trip.date}</p>
                    </div>
                  </div>
                ))}
                {mockTrips.filter(trip => 
                  trip.joinedMembers.some(member => member.id === user.id)
                ).length === 0 && (
                  <p className="text-[#5E5854] text-center py-4">No upcoming trips</p>
                )}
              </div>
            </div>

            <div className="bg-[#f8f4e3] p-4 rounded-xl border border-[#d1c7b7]">
              <h4 className="font-bold text-[#2c5e4a] mb-3">Completed Trips</h4>
              <div className="grid grid-cols-2 gap-4">
                {completedTrips.map(trip => (
                  <div key={trip.id} className="relative rounded-lg overflow-hidden h-32">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3">
                      <h5 className="text-white font-semibold text-sm">{trip.title}</h5>
                      <p className="text-white/80 text-xs">{trip.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

  // Current user data
  const currentUser = {
    id: "current_user",
    name: "Alex Rivera",
    avatar: "/assets/images/Alexrivera.jpeg",
    email: "alex.rivera@nomadnova.com",
    fullName: "Alex Rivera",
    bio: "Passionate traveler and adventure seeker. Love exploring new cultures, meeting amazing people, and creating unforgettable memories around the world!",
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    photos: [
      "/assets/images/Alexrivera.jpeg",
      "/assets/images/baliadventure.jpeg",
      "/assets/images/Tokyo.jpeg",
      "/assets/images/swissmount.jpeg",
      "/assets/images/icelandnorthernlights.jpeg",
      "/assets/images/santorinisunset.jpeg"
    ]
  };

  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [availableTrips, setAvailableTrips] = useState(mockTrips);

  // Fix scrolling issues by removing auto-rotate on scroll
  useEffect(() => {
    let interval;
    
    const handleScroll = () => {
      // Clear interval when user scrolls
      clearInterval(interval);
    };

    // Only auto-rotate when not scrolling
    interval = setInterval(() => {
      setCurrentTripIndex((prev) => (prev + 1) % mockTrips.length);
      setCurrentCompletedIndex((prev) => (prev + 1) % completedTrips.length);
    }, 5000);

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle functions
  const handleJoinTrip = (tripId) => {
    if (!joinedTrips.includes(tripId)) {
      const trip = availableTrips.find(t => t.id === tripId);

      if (trip && trip.spots > 0) {
        const newMember = {
          ...currentUser,
          joinedDate: new Date().toISOString().split('T')[0]
        };

        setJoinedTrips([...joinedTrips, tripId]);

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
        alert('Successfully joined the trip! The organizer has been notified.');
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
    alert('Opening message interface...');
  };

  const handlePostTrip = () => {
    if (!newTrip.destination || !newTrip.departure || !newTrip.fromDate ||
        !newTrip.toDate || !newTrip.budget || !newTrip.maxPeople) {
      alert('Please fill in all required fields');
      return;
    }

    const fromDate = new Date(newTrip.fromDate);
    const toDate = new Date(newTrip.toDate);
    const durationDays = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24));

    const tripToAdd = {
      id: availableTrips.length + 1,
      title: `${newTrip.destination} Adventure`,
      destination: newTrip.destination,
      departure: newTrip.departure,
      duration: `${durationDays} days`,
      price: newTrip.budget,
      image: "/assets/images/default.jpeg",
      spots: newTrip.maxPeople - newTrip.numberOfPeople,
      maxSpots: newTrip.maxPeople,
      date: `${formatDate(fromDate)} - ${formatDate(toDate)}`,
      organizer: currentUser.name,
      organizerId: currentUser.id,
      organizerAvatar: currentUser.avatar,
      tags: ["Adventure", "Travel"],
      transport: newTrip.transport,
      description: newTrip.description,
      joinedMembers: []
    };

    setAvailableTrips([tripToAdd, ...availableTrips]);
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

    alert('Trip posted successfully!');
  };

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    setShowPhotoModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrip(prev => ({ ...prev, [name]: value }));
  };

  const formatDate = (date) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f4e3] to-[#f0d9b5]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#2c5e4a] to-[#1a3a2a] shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-[#f8d56b]">NomadNova</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#trips" className="text-[#a8c4b8] hover:text-[#f8d56b] transition-colors font-medium">Trips</a>
                <a href="#completed" className="text-[#a8c4b8] hover:text-[#f8d56b] transition-colors font-medium">Completed</a>
                <a href="#destinations" className="text-[#a8c4b8] hover:text-[#f8d56b] transition-colors font-medium">Destinations</a>
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
                className="bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] hover:from-[#f87c6d] hover:to-[#f8a95d] text-white px-6 py-2 rounded-full transition-colors font-semibold shadow-lg flex items-center"
              >
                <FiPlus className="mr-1" />
                Post Trip
              </button>
              <button
                onClick={onLogout}
                className="bg-[#5E5854] hover:bg-[#2c5e4a] text-white px-6 py-2 rounded-full transition-colors font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Welcome Section */}
        <section className="text-center bg-gradient-to-r from-[#6F93AD] to-[#4a708a] rounded-2xl p-8 border border-[#5E5854] shadow-xl">
          <h2 className="text-4xl font-bold mb-4 text-white">Welcome back, Traveler!</h2>
          <p className="text-xl text-white/90 font-medium">Discover your next adventure with like-minded explorers</p>
        </section>

        {/* Available Trips Carousel */}
        <section id="trips" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-bold text-[#2c5e4a]">Available Trips</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentTripIndex((prev) => (prev - 1 + mockTrips.length) % mockTrips.length)}
                className="p-3 bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] hover:from-[#f87c6d] hover:to-[#f8a95d] rounded-full text-white transition-colors shadow-lg"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentTripIndex((prev) => (prev + 1) % mockTrips.length)}
                className="p-3 bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] hover:from-[#f87c6d] hover:to-[#f8a95d] rounded-full text-white transition-colors shadow-lg"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableTrips.map((trip, index) => (
              <div
                key={trip.id}
                className={`bg-white rounded-2xl overflow-hidden border border-[#d1c7b7] shadow-lg transition-all duration-300 transform ${
                  index === currentTripIndex ? 'scale-105 z-10 ring-2 ring-[#f8a95d]' : 'scale-100 opacity-90 hover:scale-102'
                }`}
              >
                <div className="relative">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {trip.price}
                    </span>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-b from-[#f8f4e3] to-[#f0d9b5]">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-bold text-[#2c5e4a]">{trip.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      joinedTrips.includes(trip.id)
                        ? 'bg-[#f87c6d] text-white'
                        : 'bg-[#f8d56b] text-[#2c5e4a]'
                    }`}>
                      {joinedTrips.includes(trip.id) ? 'JOINED' : 'OPEN'}
                    </span>
                  </div>
                  <p className="text-[#2c5e4a] font-medium mb-2 flex items-center">
                    <FiMapPin className="mr-1" /> {trip.destination}
                  </p>
                  <p className="text-[#5E5854] mb-3 flex items-center">
                    <FiCalendar className="mr-1" /> {trip.duration} • {trip.date}
                  </p>
                  <p className="text-[#5E5854] text-sm mb-3">Organized by {trip.organizer}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {trip.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-[#2c5e4a] text-[#f8d56b] rounded-full text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[#2c5e4a] font-medium flex items-center">
                      <FiUsers className="mr-1" /> {trip.spots} spots left
                    </span>
                    <div className="flex items-center text-[#2c5e4a]">
                      <FiStar className="mr-1" />
                      <span className="text-sm">4.8</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewTrip(trip)}
                      className="flex-1 bg-[#5E5854] hover:bg-[#2c5e4a] text-white px-4 py-2 rounded-full transition-colors font-semibold flex items-center justify-center"
                    >
                      <FiEye className="mr-1" /> View Details
                    </button>
                    <button
                      onClick={() => handleJoinTrip(trip.id)}
                      disabled={joinedTrips.includes(trip.id)}
                      className={`flex-1 px-4 py-2 rounded-full transition-colors font-semibold flex items-center justify-center ${
                        joinedTrips.includes(trip.id)
                          ? 'bg-[#a8c4b8] text-[#2c5e4a] cursor-not-allowed'
                          : 'bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] hover:from-[#f87c6d] hover:to-[#f8a95d] text-white'
                      }`}
                    >
                      {joinedTrips.includes(trip.id) ? (
                        <>
                          <FiCheck className="mr-1" /> Joined
                        </>
                      ) : (
                        'Join Trip'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Trip Details Modal */}
        {showTripDetails && selectedTrip && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-5xl w-full border border-[#d1c7b7] shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-[#2c5e4a]">{selectedTrip.title}</h3>
                <button
                  onClick={() => setShowTripDetails(false)}
                  className="text-[#5E5854] hover:text-[#f87c6d] text-3xl font-bold"
                >
                  <FiX />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Trip Info */}
                <div className="space-y-6">
                  <div>
                    <img
                      src={selectedTrip.image}
                      alt={selectedTrip.title}
                      className="w-full h-64 object-cover rounded-xl border border-[#d1c7b7]"
                    />
                  </div>

                  <div className="bg-[#f8f4e3] p-4 rounded-xl border border-[#d1c7b7]">
                    <h4 className="font-bold text-[#2c5e4a] mb-3 flex items-center">
                      <FiMapPin className="mr-2" /> Trip Details
                    </h4>
                    <div className="space-y-2 text-[#5E5854]">
                      <p className="flex items-center">
                        <FiMapPin className="mr-2" /> <strong>Destination:</strong> {selectedTrip.destination}
                      </p>
                      <p className="flex items-center">
                        <FiCalendar className="mr-2" /> <strong>Duration:</strong> {selectedTrip.duration}
                      </p>
                      <p className="flex items-center">
                        <FiCalendar className="mr-2" /> <strong>Dates:</strong> {selectedTrip.date}
                      </p>
                      <p className="flex items-center">
                        <FiDollarSign className="mr-2" /> <strong>Price:</strong> {selectedTrip.price}
                      </p>
                      <p className="flex items-center">
                        <FiUser className="mr-2" /> <strong>Organizer:</strong> {selectedTrip.organizer}
                      </p>
                      <p className="flex items-center">
                        <FiUsers className="mr-2" /> <strong>Available Spots:</strong> {selectedTrip.spots} of {selectedTrip.maxSpots}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#f8d56b]/30 p-4 rounded-xl border border-[#d1c7b7]">
                    <h4 className="font-bold text-[#2c5e4a] mb-3">What's Included</h4>
                    <ul className="text-[#5E5854] space-y-2">
                      <li className="flex items-center">
                        <FiCheck className="text-[#2c5e4a] mr-2" /> Accommodation (shared rooms)
                      </li>
                      <li className="flex items-center">
                        <FiCheck className="text-[#2c5e4a] mr-2" /> Local transportation
                      </li>
                      <li className="flex items-center">
                        <FiCheck className="text-[#2c5e4a] mr-2" /> Guided tours
                      </li>
                      <li className="flex items-center">
                        <FiCheck className="text-[#2c5e4a] mr-2" /> Some meals included
                      </li>
                      <li className="flex items-center">
                        <FiCheck className="text-[#2c5e4a] mr-2" /> Travel insurance
                      </li>
                    </ul>
                  </div>

                  {selectedTrip.description && (
                    <div className="bg-[#f8f4e3] p-4 rounded-xl border border-[#d1c7b7]">
                      <h4 className="font-bold text-[#2c5e4a] mb-3">About This Trip</h4>
                      <p className="text-[#5E5854]">{selectedTrip.description}</p>
                    </div>
                  )}
                </div>

                {/* Right Column - Members & Chat */}
                <div className="space-y-6">
                  <div className="bg-[#f8f4e3] p-4 rounded-xl border border-[#d1c7b7]">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-[#2c5e4a] flex items-center">
                        <FiUsers className="mr-2" />
                        Trip Members ({selectedTrip.joinedMembers.length + 1}/{selectedTrip.maxSpots})
                      </h4>
                      {joinedTrips.includes(selectedTrip.id) && (
                        <button
                          onClick={handleStartGroupChat}
                          className="bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] hover:from-[#f87c6d] hover:to-[#f8a95d] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center"
                        >
                          <FiMessageSquare className="mr-1" /> Group Chat
                        </button>
                      )}
                    </div>

                    <MemberProfiles
                      trip={selectedTrip}
                      onStartChat={handleStartGroupChat}
                    />
                  </div>

                  {/* Trip Stats */}
                  <div className="bg-[#f8d56b]/30 p-4 rounded-xl border border-[#d1c7b7]">
                    <h4 className="font-bold text-[#2c5e4a] mb-3">Trip Statistics</h4>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-white p-3 rounded-lg border border-[#d1c7b7]">
                        <p className="text-2xl font-bold text-[#2c5e4a]">{selectedTrip.joinedMembers.length + 1}</p>
                        <p className="text-[#5E5854] text-sm">Members Joined</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-[#d1c7b7]">
                        <p className="text-2xl font-bold text-[#2c5e4a]">{selectedTrip.spots}</p>
                        <p className="text-[#5E5854] text-sm">Spots Available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex space-x-4">
                <button
                  onClick={() => setShowTripDetails(false)}
                  className="flex-1 bg-[#5E5854] hover:bg-[#2c5e4a] text-white py-3 rounded-xl transition-colors font-semibold"
                >
                  Close
                </button>
                {/* Action Buttons (continued) */}
                <button
                  onClick={() => handleJoinTrip(selectedTrip.id)}
                  disabled={joinedTrips.includes(selectedTrip.id)}
                  className={`flex-1 py-3 rounded-xl transition-colors font-semibold ${
                    joinedTrips.includes(selectedTrip.id)
                      ? 'bg-[#a8c4b8] text-[#2c5e4a] cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] hover:from-[#f87c6d] hover:to-[#f8a95d] text-white'
                  }`}
                >
                  {joinedTrips.includes(selectedTrip.id) ? (
                    <>
                      <FiCheck className="inline mr-1" /> Already Joined
                    </>
                  ) : (
                    'Join This Trip'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Completed Trips Section */}
        <section id="completed" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-bold text-[#2c5e4a]">Completed Trips</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentCompletedIndex((prev) => (prev - 1 + completedTrips.length) % completedTrips.length)}
                className="p-3 bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] hover:from-[#f87c6d] hover:to-[#f8a95d] rounded-full text-white transition-colors shadow-lg"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentCompletedIndex((prev) => (prev + 1) % completedTrips.length)}
                className="p-3 bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] hover:from-[#f87c6d] hover:to-[#f8a95d] rounded-full text-white transition-colors shadow-lg"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedTrips.map((trip, index) => (
              <div
                key={trip.id}
                className={`bg-white rounded-2xl overflow-hidden border border-[#d1c7b7] shadow-lg transition-all duration-300 transform ${
                  index === currentCompletedIndex ? 'scale-105 z-10 ring-2 ring-[#f8a95d]' : 'scale-100 opacity-90 hover:scale-102'
                }`}
                onClick={() => {
                  setSelectedTrip(trip);
                  setShowTripDetails(true);
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="relative h-64">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <h4 className="text-2xl font-bold text-white">{trip.title}</h4>
                    <p className="text-white/90">{trip.destination}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-white flex items-center">
                        <FiCalendar className="mr-1" /> {trip.date}
                      </span>
                      <span className="flex items-center text-white">
                        <FiStar className="text-[#f8d56b] mr-1" /> {trip.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-b from-[#f8f4e3] to-[#f0d9b5]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#5E5854] flex items-center">
                      <FiUsers className="mr-1" /> {trip.participants} travelers
                    </span>
                    <button className="text-[#2c5e4a] hover:text-[#f87c6d] font-semibold">
                      View Photos
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="space-y-6">
          <h3 className="text-3xl font-bold text-[#2c5e4a]">Traveler Testimonials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl p-6 border border-[#d1c7b7] shadow-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-[#f8d56b] mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-[#2c5e4a]">{testimonial.name}</h4>
                    <p className="text-[#5E5854] text-sm">{testimonial.trip}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-[#f8d56b] fill-[#f8d56b]' : 'text-[#d1c7b7]'}`}
                    />
                  ))}
                </div>
                <p className="text-[#5E5854] italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Destinations Section */}
        <section id="destinations" className="space-y-6">
          <h3 className="text-3xl font-bold text-[#2c5e4a]">Popular Destinations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularDestinations.map((destination, index) => (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden h-40 cursor-pointer group"
                onClick={() => alert(`Viewing ${destination.name}`)}
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                  <h4 className="text-white font-bold">{destination.name}</h4>
                  <p className="text-white/80 text-sm">{destination.visits} visits</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Post Trip Modal */}
        {showPostTrip && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full border border-[#d1c7b7] shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-[#2c5e4a]">Post a New Trip</h3>
                <button
                  onClick={() => setShowPostTrip(false)}
                  className="text-[#5E5854] hover:text-[#f87c6d] text-3xl font-bold"
                >
                  <FiX />
                </button>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#5E5854] font-medium mb-2">Destination*</label>
                    <input
                      type="text"
                      name="destination"
                      value={newTrip.destination}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#d1c7b7] rounded-lg focus:ring-2 focus:ring-[#f8a95d] focus:border-transparent"
                      placeholder="Where are you going?"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#5E5854] font-medium mb-2">Departure From*</label>
                    <input
                      type="text"
                      name="departure"
                      value={newTrip.departure}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#d1c7b7] rounded-lg focus:ring-2 focus:ring-[#f8a95d] focus:border-transparent"
                      placeholder="Starting point"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#5E5854] font-medium mb-2">From Date*</label>
                    <input
                      type="date"
                      name="fromDate"
                      value={newTrip.fromDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#d1c7b7] rounded-lg focus:ring-2 focus:ring-[#f8a95d] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#5E5854] font-medium mb-2">To Date*</label>
                    <input
                      type="date"
                      name="toDate"
                      value={newTrip.toDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#d1c7b7] rounded-lg focus:ring-2 focus:ring-[#f8a95d] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#5E5854] font-medium mb-2">Number of People Going*</label>
                    <input
                      type="number"
                      name="numberOfPeople"
                      value={newTrip.numberOfPeople}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#d1c7b7] rounded-lg focus:ring-2 focus:ring-[#f8a95d] focus:border-transparent"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#5E5854] font-medium mb-2">Maximum People*</label>
                    <input
                      type="number"
                      name="maxPeople"
                      value={newTrip.maxPeople}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#d1c7b7] rounded-lg focus:ring-2 focus:ring-[#f8a95d] focus:border-transparent"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#5E5854] font-medium mb-2">Transportation</label>
                    <select
                      name="transport"
                      value={newTrip.transport}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#d1c7b7] rounded-lg focus:ring-2 focus:ring-[#f8a95d] focus:border-transparent"
                    >
                      <option value="">Select option</option>
                      <option value="Flight">Flight</option>
                      <option value="Train">Train</option>
                      <option value="Bus">Bus</option>
                      <option value="Car">Car</option>
                      <option value="Mixed">Mixed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#5E5854] font-medium mb-2">Estimated Budget*</label>
                    <input
                      type="text"
                      name="budget"
                      value={newTrip.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#d1c7b7] rounded-lg focus:ring-2 focus:ring-[#f8a95d] focus:border-transparent"
                      placeholder="e.g. $1,200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#5E5854] font-medium mb-2">Trip Description</label>
                  <textarea
                    name="description"
                    value={newTrip.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#d1c7b7] rounded-lg focus:ring-2 focus:ring-[#f8a95d] focus:border-transparent h-32"
                    placeholder="Tell potential travel buddies about your trip..."
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowPostTrip(false)}
                    className="bg-[#5E5854] hover:bg-[#2c5e4a] text-white px-6 py-2 rounded-full transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handlePostTrip}
                    className="bg-gradient-to-r from-[#f8a95d] to-[#f87c6d] hover:from-[#f87c6d] hover:to-[#f8a95d] text-white px-6 py-2 rounded-full transition-colors font-semibold"
                  >
                    Post Trip
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
            user={currentUser}
            onClose={() => setShowProfile(false)}
            onMessage={handleProfileMessage}
            onPhotoClick={handlePhotoClick}
          />
        )}

        {/* Photo Modal */}
        {showPhotoModal && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative max-w-5xl w-full max-h-[90vh]">
              <button
                onClick={() => setShowPhotoModal(false)}
                className="absolute top-4 right-4 text-white text-4xl z-10 hover:text-[#f87c6d]"
              >
                <FiX />
              </button>
              <img
                src={selectedPhoto}
                alt="Enlarged view"
                className="w-full h-full object-contain max-h-[90vh]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#2c5e4a] text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-[#f8d56b]">NomadNova</h4>
              <p className="text-[#a8c4b8]">Connecting travelers worldwide for unforgettable shared experiences.</p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Explore</h5>
              <ul className="space-y-2 text-[#a8c4b8]">
                <li><a href="#trips" className="hover:text-[#f8d56b] transition-colors">Available Trips</a></li>
                <li><a href="#completed" className="hover:text-[#f8d56b] transition-colors">Completed Trips</a></li>
                <li><a href="#destinations" className="hover:text-[#f8d56b] transition-colors">Popular Destinations</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Company</h5>
              <ul className="space-y-2 text-[#a8c4b8]">
                <li><a href="#" className="hover:text-[#f8d56b] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#f8d56b] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#f8d56b] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#f8d56b] transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Contact Us</h5>
              <ul className="space-y-2 text-[#a8c4b8]">
                <li className="flex items-center"><FiMail className="mr-2" /> hello@nomadnova.com</li>
                <li className="flex items-center"><FiMapPin className="mr-2" /> San Francisco, CA</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#3a7a5f] mt-8 pt-8 text-center text-[#a8c4b8]">
            <p>&copy; {new Date().getFullYear()} NomadNova. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}