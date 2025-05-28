import { useState } from 'react';

export default function MemberProfiles({ trip, onStartChat }) {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showMemberModal, setShowMemberModal] = useState(false);

  const allMembers = [
    {
      id: trip.organizerId,
      name: trip.organizer,
      avatar: trip.organizerAvatar,
      role: 'organizer',
      joinedDate: '2024-11-15', // Organizer created the trip
      bio: 'Passionate traveler and adventure seeker. Love exploring new cultures and making memories!',
      interests: ['Photography', 'Hiking', 'Local Cuisine'],
      previousTrips: 12,
      rating: 4.9
    },
    ...trip.joinedMembers.map(member => ({
      ...member,
      role: 'member',
      bio: 'Excited to explore and meet new people on this amazing journey!',
      interests: ['Adventure', 'Culture', 'Nature'],
      previousTrips: Math.floor(Math.random() * 8) + 1,
      rating: (Math.random() * 1 + 4).toFixed(1)
    }))
  ];

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setShowMemberModal(true);
  };

  const formatJoinedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-4">
      {/* Members Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allMembers.map((member) => (
          <div
            key={member.id}
            onClick={() => handleMemberClick(member)}
            className="bg-[#6F93AD] rounded-xl p-4 border-2 border-[#5E5854] hover:border-[#EC8E3D] transition-all duration-300 cursor-pointer hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover border-3 border-[#EE9C8F] mx-auto"
                />
                {member.role === 'organizer' && (
                  <div className="absolute -top-1 -right-1 bg-[#EC8E3D] rounded-full p-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                )}
              </div>
              
              <h4 className="text-[#204231] font-bold mt-2 text-sm">{member.name}</h4>
              <p className="text-[#204231]/70 text-xs capitalize">
                {member.role === 'organizer' ? '👑 Organizer' : '🎒 Traveler'}
              </p>
              
              {/* Rating */}
              <div className="flex items-center justify-center mt-2">
                <span className="text-[#EC8E3D] text-sm">★</span>
                <span className="text-[#204231] text-xs font-medium ml-1">{member.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Member Details Modal */}
      {showMemberModal && selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FCCB6E] rounded-2xl p-6 max-w-md w-full border-2 border-[#5E5854] shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={selectedMember.avatar}
                    alt={selectedMember.name}
                    className="w-20 h-20 rounded-full object-cover border-3 border-[#EE9C8F]"
                  />
                  {selectedMember.role === 'organizer' && (
                    <div className="absolute -top-2 -right-2 bg-[#EC8E3D] rounded-full p-2">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#204231]">{selectedMember.name}</h3>
                  <p className="text-[#204231]/70 capitalize">
                    {selectedMember.role === 'organizer' ? '👑 Trip Organizer' : '🎒 Fellow Traveler'}
                  </p>
                  <div className="flex items-center mt-1">
                    <span className="text-[#EC8E3D]">★</span>
                    <span className="text-[#204231] font-medium ml-1">{selectedMember.rating}</span>
                    <span className="text-[#204231]/60 text-sm ml-1">({selectedMember.previousTrips} trips)</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowMemberModal(false)}
                className="text-[#204231] hover:text-[#EC8E3D] text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Member Info */}
            <div className="space-y-4">
              {/* Bio */}
              <div className="bg-[#6F93AD] p-4 rounded-xl border border-[#5E5854]">
                <h4 className="font-bold text-[#204231] mb-2">About</h4>
                <p className="text-[#204231] text-sm">{selectedMember.bio}</p>
              </div>

              {/* Interests */}
              <div className="bg-[#EE9C8F] p-4 rounded-xl border border-[#5E5854]">
                <h4 className="font-bold text-[#204231] mb-2">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#204231] text-[#FCCB6E] rounded-full text-sm font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trip Stats */}
              <div className="bg-[#6F93AD] p-4 rounded-xl border border-[#5E5854]">
                <h4 className="font-bold text-[#204231] mb-2">Travel Stats</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-[#EC8E3D]">{selectedMember.previousTrips}</p>
                    <p className="text-[#204231] text-sm">Trips Completed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#EC8E3D]">{selectedMember.rating}</p>
                    <p className="text-[#204231] text-sm">Average Rating</p>
                  </div>
                </div>
              </div>

              {/* Join Date */}
              <div className="text-center">
                <p className="text-[#204231]/70 text-sm">
                  {selectedMember.role === 'organizer' 
                    ? `Created this trip on ${formatJoinedDate(selectedMember.joinedDate)}`
                    : `Joined on ${formatJoinedDate(selectedMember.joinedDate)}`
                  }
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowMemberModal(false)}
                className="flex-1 bg-[#5E5854] hover:bg-[#204231] text-white py-2 rounded-xl transition-colors font-semibold"
              >
                Close
              </button>
              {selectedMember.id !== 'current_user' && (
                <button
                  onClick={() => {
                    setShowMemberModal(false);
                    onStartChat();
                  }}
                  className="flex-1 bg-[#EC8E3D] hover:bg-[#EE9C8F] text-white py-2 rounded-xl transition-colors font-semibold"
                >
                  Message
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
