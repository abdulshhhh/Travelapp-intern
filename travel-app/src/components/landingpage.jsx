import React from 'react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FCCB6E] to-[#6F93AD] text-white font-poppins">
      <header className="text-center py-10">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#204231] to-[#EE9C8F]">
          Welcome to NomadNova
        </h1>
        <p className="mt-4 text-lg">Discover, Join, and Share your adventures</p>
      </header>

      {/* Carousel: Posted Trips */}
      <section className="px-4 py-10">
        <h2 className="text-3xl font-bold mb-4">Upcoming Trips</h2>
        <div className="bg-white/10 p-4 rounded-xl shadow-md h-64">[Carousel of trips with View/Join]</div>
      </section>

      {/* Post a Trip with AI Suggestion */}
      <section className="px-4 py-10">
        <h2 className="text-3xl font-bold mb-4">Post Your Trip</h2>
        <div className="bg-white/10 p-4 rounded-xl shadow-md">
          <p className="mb-4">Use AI to help plan and suggest before posting.</p>
          <Button className="bg-[#EC8E3D] hover:bg-[#CC702D] text-white font-semibold px-6 py-2 rounded-full">
            Plan with AI
          </Button>
        </div>
      </section>

      {/* Carousel: Completed Trips */}
      <section className="px-4 py-10">
        <h2 className="text-3xl font-bold mb-4">Completed Trips</h2>
        <div className="bg-white/10 p-4 rounded-xl shadow-md h-64">[Carousel of Completed Trips]</div>
      </section>

      {/* Media: Photos and Videos */}
      <section className="px-4 py-10">
        <h2 className="text-3xl font-bold mb-4">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 h-40 rounded-xl">[Photo/Video 1]</div>
          <div className="bg-white/10 h-40 rounded-xl">[Photo/Video 2]</div>
          <div className="bg-white/10 h-40 rounded-xl">[Photo/Video 3]</div>
          <div className="bg-white/10 h-40 rounded-xl">[Photo/Video 4]</div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-10">
        <h2 className="text-3xl font-bold mb-4">Traveller Reviews</h2>
        <div className="space-y-4">
          <div className="bg-white/10 p-4 rounded-xl">"An unforgettable journey!" – Aishwarya</div>
          <div className="bg-white/10 p-4 rounded-xl">"Best group I ever travelled with." – Pranav</div>
        </div>
      </section>

      {/* Random Suggestions */}
      <section className="px-4 py-10">
        <h2 className="text-3xl font-bold mb-4">Explore Top Destinations</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white/10 p-4 rounded-xl">Paris</div>
          <div className="bg-white/10 p-4 rounded-xl">Bali</div>
          <div className="bg-white/10 p-4 rounded-xl">Ladakh</div>
          <div className="bg-white/10 p-4 rounded-xl">Japan</div>
          <div className="bg-white/10 p-4 rounded-xl">Iceland</div>
          <div className="bg-white/10 p-4 rounded-xl">Kerala</div>
        </div>
      </section>

      <footer className="text-center text-sm text-white/80 py-6">
        &copy; 2025 NomadNova. All rights reserved.
      </footer>
    </div>
  );
}
