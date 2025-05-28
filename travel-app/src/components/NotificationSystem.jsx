import { useState } from 'react';

export default function NotificationSystem({ 
  notifications, 
  showNotifications, 
  onToggleNotifications, 
  onMarkAsRead,
  onClearAll 
}) {
  const unreadCount = notifications.filter(n => !n.read).length;

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={onToggleNotifications}
        className="relative p-2 rounded-full bg-[#6F93AD] hover:bg-[#5E5854] transition-colors text-white"
        aria-label="Notifications"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#EC8E3D] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 top-12 w-80 bg-[#FCCB6E] rounded-xl border-2 border-[#5E5854] shadow-2xl z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-[#5E5854] bg-[#6F93AD]">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#204231]">Notifications</h3>
              {notifications.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-sm text-[#204231] hover:text-[#EC8E3D] font-medium transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
            {unreadCount > 0 && (
              <p className="text-sm text-[#204231]/70 mt-1">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center">
                <div className="text-[#204231]/50 mb-2">
                  <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <p className="text-[#204231]/70 font-medium">No notifications yet</p>
                <p className="text-[#204231]/50 text-sm mt-1">You'll see trip updates here</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-[#5E5854]/30 hover:bg-[#EE9C8F]/20 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-[#EE9C8F]/10' : ''
                  }`}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    {/* User Avatar */}
                    <img
                      src={notification.userAvatar}
                      alt={notification.userName}
                      className="w-10 h-10 rounded-full border-2 border-[#EC8E3D] flex-shrink-0"
                    />
                    
                    {/* Notification Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[#204231] truncate">
                          {notification.userName}
                        </p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-[#EC8E3D] rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                      
                      <p className="text-sm text-[#204231] mt-1">
                        {notification.type === 'join_request' && (
                          <>joined your trip <span className="font-semibold">"{notification.tripTitle}"</span></>
                        )}
                      </p>
                      
                      <p className="text-xs text-[#204231]/60 mt-1">
                        {formatTimeAgo(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Action Buttons for Join Requests */}
                  {notification.type === 'join_request' && !notification.read && (
                    <div className="mt-3 flex space-x-2">
                      <button className="flex-1 bg-[#EC8E3D] hover:bg-[#EE9C8F] text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors">
                        View Trip
                      </button>
                      <button className="flex-1 bg-[#6F93AD] hover:bg-[#5E5854] text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors">
                        Send Message
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
