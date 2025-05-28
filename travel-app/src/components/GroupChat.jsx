import { useState, useRef, useEffect } from 'react';

export default function GroupChat({ trip, currentUser, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      userId: trip.organizerId,
      userName: trip.organizer,
      userAvatar: trip.organizerAvatar,
      message: `Welcome to the ${trip.title} group chat! Looking forward to this amazing adventure together! 🌟`,
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      type: 'text'
    },
    {
      id: 2,
      userId: trip.joinedMembers[0]?.id,
      userName: trip.joinedMembers[0]?.name,
      userAvatar: trip.joinedMembers[0]?.avatar,
      message: "So excited! Can't wait to explore together!",
      timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
      type: 'text'
    },
    {
      id: 3,
      userId: trip.joinedMembers[1]?.id,
      userName: trip.joinedMembers[1]?.name,
      userAvatar: trip.joinedMembers[1]?.avatar,
      message: "Has anyone started planning what to pack?",
      timestamp: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
      type: 'text'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        userId: currentUser.id,
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
        message: newMessage.trim(),
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const startCall = (video = false) => {
    setIsCallActive(true);
    setIsVideoCall(video);
    const callMessage = {
      id: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      message: `Started a ${video ? 'video' : 'voice'} call`,
      timestamp: new Date().toISOString(),
      type: 'system'
    };
    setMessages([...messages, callMessage]);
  };

  const endCall = () => {
    setIsCallActive(false);
    setIsVideoCall(false);
    setIsScreenSharing(false);
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#FCCB6E] rounded-2xl w-full max-w-4xl h-[80vh] border-2 border-[#5E5854] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#5E5854] bg-[#6F93AD] rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#EC8E3D]"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#204231]">{trip.title}</h3>
                <p className="text-sm text-[#204231]/70">
                  {trip.joinedMembers.length + 1} members • {trip.joinedMembers.filter((_, i) => i < 3).length} online
                </p>
              </div>
            </div>
            
            {/* Call Controls */}
            <div className="flex items-center space-x-2">
              {!isCallActive ? (
                <>
                  <button
                    onClick={() => startCall(false)}
                    className="p-2 bg-[#EC8E3D] hover:bg-[#EE9C8F] rounded-full text-white transition-colors"
                    title="Voice Call"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => startCall(true)}
                    className="p-2 bg-[#EC8E3D] hover:bg-[#EE9C8F] rounded-full text-white transition-colors"
                    title="Video Call"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={toggleScreenShare}
                    className={`p-2 rounded-full text-white transition-colors ${
                      isScreenSharing ? 'bg-green-500 hover:bg-green-600' : 'bg-[#5E5854] hover:bg-[#204231]'
                    }`}
                    title="Screen Share"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1h-5v2h3a1 1 0 110 2H6a1 1 0 110-2h3v-2H4a1 1 0 01-1-1V4zm1 1v6h12V5H4z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={endCall}
                    className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors"
                    title="End Call"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </button>
                </>
              )}
              
              <button
                onClick={onClose}
                className="p-2 bg-[#5E5854] hover:bg-[#204231] rounded-full text-white transition-colors"
                title="Close Chat"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Call Status */}
        {isCallActive && (
          <div className="p-3 bg-green-100 border-b border-[#5E5854] text-center">
            <p className="text-green-800 font-medium">
              {isVideoCall ? '📹' : '📞'} {isVideoCall ? 'Video' : 'Voice'} call in progress
              {isScreenSharing && ' • 🖥️ Screen sharing active'}
            </p>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => {
            const showDate = index === 0 || formatDate(messages[index - 1].timestamp) !== formatDate(message.timestamp);
            const isCurrentUser = message.userId === currentUser.id;
            
            return (
              <div key={message.id}>
                {showDate && (
                  <div className="text-center my-4">
                    <span className="bg-[#6F93AD] text-[#204231] px-3 py-1 rounded-full text-sm font-medium">
                      {formatDate(message.timestamp)}
                    </span>
                  </div>
                )}
                
                <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {!isCurrentUser && (
                      <img
                        src={message.userAvatar}
                        alt={message.userName}
                        className="w-8 h-8 rounded-full border-2 border-[#EC8E3D] flex-shrink-0"
                      />
                    )}
                    
                    <div className={`rounded-2xl px-4 py-2 ${
                      message.type === 'system' 
                        ? 'bg-[#EE9C8F] text-[#204231] text-center italic'
                        : isCurrentUser 
                          ? 'bg-[#EC8E3D] text-white' 
                          : 'bg-[#6F93AD] text-[#204231]'
                    }`}>
                      {!isCurrentUser && message.type !== 'system' && (
                        <p className="text-xs font-semibold mb-1 opacity-70">{message.userName}</p>
                      )}
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'system' 
                          ? 'opacity-60'
                          : isCurrentUser 
                            ? 'text-white/70' 
                            : 'text-[#204231]/60'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-[#5E5854] bg-[#6F93AD] rounded-b-2xl">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-[#FCCB6E] border-2 border-[#5E5854] rounded-xl text-[#204231] placeholder-[#204231]/60 focus:outline-none focus:ring-2 focus:ring-[#EC8E3D] font-medium"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="px-6 py-2 bg-[#EC8E3D] hover:bg-[#EE9C8F] disabled:bg-[#5E5854] disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
