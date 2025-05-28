import { useState } from 'react';

export default function TripMemories({ tripType, onClose }) {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showTripDetails, setShowTripDetails] = useState(false);

  // Mock data for posted trips
  const postedTrips = [
    {
      id: 1,
      title: "European Backpacking Adventure",
      destination: "Multiple Cities, Europe",
      duration: "30 days",
      date: "June 1-30, 2024",
      price: "$2,800",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
      participants: 6,
      rating: 4.9,
      status: "completed",
      memories: [
        {
          id: 1,
          type: "photo",
          url: "https://images.unsplash.com/photo-1502602898536-47ad22581b52",
          caption: "Amazing sunset in Paris!",
          location: "Paris, France",
          date: "June 5, 2024"
        },
        {
          id: 2,
          type: "photo",
          url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
          caption: "London Bridge at night",
          location: "London, UK",
          date: "June 12, 2024"
        },
        {
          id: 3,
          type: "video",
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
          caption: "Swiss Alps hiking adventure",
          location: "Switzerland",
          date: "June 20, 2024"
        }
      ],
      highlights: [
        "Visited 8 countries in 30 days",
        "Made lifelong friendships",
        "Tried 50+ local dishes",
        "Hiked 200+ kilometers"
      ]
    },
    {
      id: 2,
      title: "Southeast Asia Food Tour",
      destination: "Thailand, Vietnam, Cambodia",
      duration: "21 days",
      date: "March 1-21, 2024",
      price: "$1,800",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
      participants: 4,
      rating: 4.8,
      status: "completed",
      memories: [
        {
          id: 4,
          type: "photo",
          url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
          caption: "Street food in Bangkok",
          location: "Bangkok, Thailand",
          date: "March 3, 2024"
        },
        {
          id: 5,
          type: "photo",
          url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
          caption: "Angkor Wat sunrise",
          location: "Siem Reap, Cambodia",
          date: "March 15, 2024"
        }
      ],
      highlights: [
        "Tried 100+ local dishes",
        "Cooking classes in 3 countries",
        "Visited ancient temples",
        "Met amazing local chefs"
      ]
    }
  ];

  // Mock data for joined trips
  const joinedTrips = [
    {
      id: 3,
      title: "Bali Adventure",
      destination: "Bali, Indonesia",
      duration: "7 days",
      date: "December 10-17, 2024",
      price: "$1,200",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1",
      organizer: "Sarah Chen",
      rating: 4.9,
      status: "completed",
      memories: [
        {
          id: 6,
          type: "photo",
          url: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2",
          caption: "Beautiful rice terraces",
          location: "Ubud, Bali",
          date: "December 12, 2024"
        },
        {
          id: 7,
          type: "photo",
          url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
          caption: "Sunset at Tanah Lot",
          location: "Tanah Lot, Bali",
          date: "December 14, 2024"
        }
      ],
      highlights: [
        "Visited 5 temples",
        "Learned traditional cooking",
        "Surfing lessons",
        "Yoga retreat experience"
      ]
    },
    {
      id: 4,
      title: "Tokyo Explorer",
      destination: "Tokyo, Japan",
      duration: "5 days",
      date: "October 5-10, 2024",
      price: "$1,800",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
      organizer: "Mike Johnson",
      rating: 4.7,
      status: "completed",
      memories: [
        {
          id: 8,
          type: "photo",
          url: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8",
          caption: "Shibuya crossing at night",
          location: "Shibuya, Tokyo",
          date: "October 6, 2024"
        },
        {
          id: 9,
          type: "video",
          url: "https://images.unsplash.com/photo-1528164344705-47542687000d",
          caption: "Sushi making class",
          location: "Tsukiji, Tokyo",
          date: "October 8, 2024"
        }
      ],
      highlights: [
        "Visited 15 neighborhoods",
        "Tried authentic ramen",
        "Cherry blossom viewing",
        "Traditional tea ceremony"
      ]
    }
  ];

  const trips = tripType === 'posted' ? postedTrips : joinedTrips;

  const handleTripClick = (trip) => {
    setSelectedTrip(trip);
    setShowTripDetails(true);
  };

  const handleBackToList = () => {
    setShowTripDetails(false);
    setSelectedTrip(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
      <div className="bg-[#FCCB6E] rounded-2xl w-full max-w-6xl h-[85vh] border-2 border-[#5E5854] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#6F93AD] p-6 border-b border-[#5E5854]">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {showTripDetails && (
                <button
                  onClick={handleBackToList}
                  className="text-[#204231] hover:text-[#EC8E3D] text-xl font-bold"
                >
                  ← Back
                </button>
              )}
              <h2 className="text-2xl font-bold text-[#204231]">
                {showTripDetails 
                  ? selectedTrip?.title 
                  : `${tripType === 'posted' ? 'Posted' : 'Joined'} Trips & Memories`
                }
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-[#204231] hover:text-[#EC8E3D] text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!showTripDetails ? (
            /* Trip List */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => handleTripClick(trip)}
                  className="bg-[#6F93AD] rounded-xl overflow-hidden border-2 border-[#5E5854] cursor-pointer hover:border-[#EC8E3D] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
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
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        ✓ {trip.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#204231] mb-2">{trip.title}</h3>
                    <p className="text-[#204231]/70 mb-2">{trip.destination}</p>
                    <p className="text-[#204231]/70 mb-3">{trip.duration} • {trip.date}</p>
                    
                    {tripType === 'joined' && (
                      <p className="text-[#204231]/80 text-sm mb-3">Organized by {trip.organizer}</p>
                    )}
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-[#204231] font-medium">
                          {tripType === 'posted' ? trip.participants : ''} 
                          {tripType === 'posted' ? ' participants' : ''}
                        </span>
                        <div className="flex items-center">
                          <span className="text-[#EC8E3D]">★</span>
                          <span className="text-[#204231] font-medium ml-1">{trip.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[#FCCB6E] p-3 rounded-lg border border-[#5E5854]">
                      <p className="text-[#204231] text-sm font-medium">
                        {trip.memories.length} memories • Click to view details
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Trip Details */
            <div className="space-y-6">
              {/* Trip Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#6F93AD] p-6 rounded-xl border border-[#5E5854]">
                  <img
                    src={selectedTrip.image}
                    alt={selectedTrip.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-[#204231] mb-2">{selectedTrip.title}</h3>
                  <div className="space-y-2 text-[#204231]">
                    <p><strong>Destination:</strong> {selectedTrip.destination}</p>
                    <p><strong>Duration:</strong> {selectedTrip.duration}</p>
                    <p><strong>Date:</strong> {selectedTrip.date}</p>
                    <p><strong>Price:</strong> {selectedTrip.price}</p>
                    {selectedTrip.organizer && (
                      <p><strong>Organizer:</strong> {selectedTrip.organizer}</p>
                    )}
                    <div className="flex items-center space-x-2">
                      <span className="text-[#EC8E3D]">★</span>
                      <span className="font-medium">{selectedTrip.rating} rating</span>
                    </div>
                  </div>
                </div>

                {/* Trip Highlights */}
                <div className="bg-[#EE9C8F] p-6 rounded-xl border border-[#5E5854]">
                  <h4 className="text-xl font-bold text-[#204231] mb-4">Trip Highlights</h4>
                  <ul className="space-y-2">
                    {selectedTrip.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center space-x-2 text-[#204231]">
                        <span className="w-2 h-2 bg-[#EC8E3D] rounded-full"></span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Memories Gallery */}
              <div className="bg-[#6F93AD] p-6 rounded-xl border border-[#5E5854]">
                <h4 className="text-xl font-bold text-[#204231] mb-4">
                  Trip Memories ({selectedTrip.memories.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedTrip.memories.map((memory) => (
                    <div
                      key={memory.id}
                      className="bg-[#FCCB6E] rounded-lg overflow-hidden border border-[#5E5854] hover:scale-105 transition-transform duration-300"
                    >
                      <div className="relative">
                        <img
                          src={memory.url}
                          alt={memory.caption}
                          className="w-full h-48 object-cover"
                        />
                        {memory.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/50 rounded-full p-3">
                              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h5 className="font-bold text-[#204231] mb-1">{memory.caption}</h5>
                        <p className="text-[#204231]/70 text-sm mb-1">📍 {memory.location}</p>
                        <p className="text-[#204231]/60 text-xs">{memory.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Memory Stats */}
              <div className="bg-[#EE9C8F] p-6 rounded-xl border border-[#5E5854]">
                <h4 className="text-xl font-bold text-[#204231] mb-4">Memory Statistics</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-[#EC8E3D]">
                      {selectedTrip.memories.filter(m => m.type === 'photo').length}
                    </p>
                    <p className="text-[#204231]/70 text-sm">Photos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#EC8E3D]">
                      {selectedTrip.memories.filter(m => m.type === 'video').length}
                    </p>
                    <p className="text-[#204231]/70 text-sm">Videos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#EC8E3D]">{selectedTrip.duration}</p>
                    <p className="text-[#204231]/70 text-sm">Duration</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#EC8E3D]">{selectedTrip.rating}</p>
                    <p className="text-[#204231]/70 text-sm">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
