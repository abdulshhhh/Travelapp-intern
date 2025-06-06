import { useState, useRef, useEffect } from 'react';
import { FiPhone, FiVideo, FiX } from 'react-icons/fi';

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
  const messagesEndRef = useRef(null);
  const [showAppPrompt, setShowAppPrompt] = useState(false);
  const [promptType, setPromptType] = useState('');

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

  const showMobileAppPrompt = (type) => {
    setPromptType(type);
    setShowAppPrompt(true);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div
        className="rounded-2xl w-full max-w-4xl h-[90vh] sm:h-[80vh] border border-gray-300 shadow-lg flex flex-col"
        style={{
          background: 'linear-gradient(135deg, #f7f5f2 0%, #e3d9b8 50%, #a49f94 100%)',
          color: '#4a453f' // soft mountain grey text
        }}
      >
        {/* Header */}
        <div className="p-3 sm:p-4 border-b border-yellow-300 rounded-t-2xl bg-transparent flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img
              src={trip.image}
              alt={trip.title}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-yellow-400"
            />
            <div>
              <h3 className="text-base sm:text-lg font-semibold">{trip.title}</h3>
              <p className="text-xs sm:text-sm opacity-80">
                {trip.joinedMembers.length + 1} members • {trip.joinedMembers.slice(0, 3).length} online
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => showMobileAppPrompt('voice')}
              className="p-2 hover:bg-yellow-300 rounded-full text-yellow-900 transition-colors"
              title="Voice Call"
              aria-label="Voice Call"
            >
              <FiPhone className="w-5 h-5" />
            </button>
            <button
              onClick={() => showMobileAppPrompt('video')}
              className="p-2 hover:bg-yellow-300 rounded-full text-yellow-900 transition-colors"
              title="Video Call"
              aria-label="Video Call"
            >
              <FiVideo className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-yellow-300 rounded-full text-yellow-900 transition-colors"
              title="Close Chat"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-transparent rounded-b-none">
          {messages.map((message, index) => {
            const showDate =
              index === 0 || formatDate(messages[index - 1].timestamp) !== formatDate(message.timestamp);
            const isCurrentUser = message.userId === currentUser.id;

            return (
              <div key={message.id}>
                {showDate && (
                  <div className="text-center my-3 sm:my-4">
                    <span className="bg-yellow-200 text-yellow-900 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {formatDate(message.timestamp)}
                    </span>
                  </div>
                )}

                <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`flex items-end space-x-1 sm:space-x-2 max-w-[75%] sm:max-w-xs lg:max-w-md ${
                      isCurrentUser ? 'flex-row-reverse space-x-reverse sm:space-x-reverse' : ''
                    }`}
                  >
                    {!isCurrentUser && (
                      <img
                        src={message.userAvatar}
                        alt={message.userName}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-yellow-400 flex-shrink-0"
                      />
                    )}
                    <div
                      className={`rounded-2xl px-3 sm:px-4 py-2 ${
                        isCurrentUser
                          ? 'bg-yellow-300 bg-opacity-90 text-gray-800'
                          : 'bg-yellow-50 bg-opacity-90 text-gray-700'
                      }`}
                    >
                      {!isCurrentUser && (
                        <p className="text-xs font-semibold mb-1 opacity-80">{message.userName}</p>
                      )}
                      <p className="text-xs sm:text-sm">{message.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          isCurrentUser ? 'text-gray-600' : 'text-gray-500'
                        }`}
                      >
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
        <form
          onSubmit={handleSendMessage}
          className="p-3 sm:p-4 border-t border-yellow-300 rounded-b-2xl flex bg-transparent"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 sm:px-4 py-2 text-sm rounded-full border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-yellow-50 text-gray-700 placeholder-yellow-700"
          />
          <button
            type="submit"
            className="ml-2 px-3 sm:px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-full transition-colors text-sm sm:text-base"
          >
            Send
          </button>
        </form>
      </div>

      {/* App Download Prompt Modal */}
      {showAppPrompt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl border-2 border-yellow-400">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Download Our App</h3>
              <button 
                onClick={() => setShowAppPrompt(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="text-center mb-6">
              <div className="bg-yellow-100 p-4 rounded-full inline-block mb-4">
                {promptType === 'voice' ? (
                  <FiPhone className="w-12 h-12 text-yellow-600" />
                ) : (
                  <FiVideo className="w-12 h-12 text-yellow-600" />
                )}
              </div>
              <p className="text-gray-700 mb-2">
                {promptType === 'voice' ? 'Voice' : 'Video'} calls are available exclusively on our mobile app.
              </p>
           <div className="mt-2 mb-1">
  <p className="text-lg font-semibold text-yellow-700 bg-yellow-100 px-4 py-2 rounded-full shadow-sm inline-block animate-pulse">
    🚀 Use the app for the best experience!
  </p>
</div>


              <p className="text-gray-500 text-sm">
                Download now to enjoy the full experience!
              </p>
            </div>
            
            <div className="flex space-x-4">
              <button className="flex-1 bg-black text-white py-3 rounded-xl flex items-center justify-center">
                <span className="mr-2">App Store</span>
              </button>
              <button className="flex-1 bg-green-600 text-white py-3 rounded-xl flex items-center justify-center">
                <span className="mr-2">Google Play</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
