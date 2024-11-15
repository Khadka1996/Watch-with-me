import React from 'react';
import Navbar from './navbar/navbar'; // Adjust the import path
import Footer from './footer/footer'; // Adjust the import path
import TrendingRow from './row/TrendingRow'; // Your TrendingRow Component
import Billboard from './billboard-row/BillboardRow'; // Your Billboard Component

function Home() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Navbar Component */}
      <Navbar />

      {/* Billboard Component */}
      <Billboard />

      {/* Trending Row Component */}
      <TrendingRow />

      {/* Footer Component */}
    </div>
  );
}

export default Home;
