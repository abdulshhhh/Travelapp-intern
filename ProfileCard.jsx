import React from "react";
import { FaUserFriends, FaRegCommentDots, FaHeart } from "react-icons/fa";

const ProfileCard = () => {
  return (
    <div className="bg-blue-900 p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center gap-6 shadow-xl">
      <div className="flex-1">
        <h1 className="text-3xl font-bold">Lokesh</h1>
        <p className="text-blue-300 mb-4">@plokesh</p>
        <p className="text-blue-100 mb-4">
          This is a placeholder description for the user's travel story or profile. Let's make travel dreams come true with
          visually appealing experiences and meaningful connections.
        </p>
        <p className="text-blue-200 text-sm">
          Exceptional experiences. From the streets of Tokyo to the cafes of Melbourne, Lokesh shares his vivid journey with
          engaging words and vibrant clicks. Join his wanderlust-filled world.
        </p>

        <div className="flex gap-6 mt-6 text-center">
          <div>
            <p className="text-xl font-semibold">36</p>
            <p className="text-sm text-blue-300">Trips</p>
          </div>
          <div>
            <p className="text-xl font-semibold">42</p>
            <p className="text-sm text-blue-300">Reviews</p>
          </div>
          <div>
            <p className="text-xl font-semibold">1638</p>
            <p className="text-sm text-blue-300">Connections</p>
          </div>
        </div>
      </div>

      <div className="relative w-full md:w-64">
        <img
          src="https://images.unsplash.com/photo-1603415526960-f8f6c6186b61?auto=format&fit=crop&w=400&q=80"
          alt="Profile"
          className="rounded-xl object-cover w-full h-80 shadow-md"
        />
        <div className="absolute bottom-2 right-2 bg-white text-blue-800 p-2 rounded-full shadow">
          <FaHeart />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
