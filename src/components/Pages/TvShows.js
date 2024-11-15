import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function TVShows() {
  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Page state for pagination
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        setLoading(true); // Start loading state

        const genreId = "10759"; // Genre ID for TV shows

        const url = `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}&page=${page}`;

        const response = await axios.get(url, {
          params: {
            api_key: "7b04946a99e7a70bee2151b873f20d2e", // API key
          },
        });
        setTVShows(response.data.results); // Set the TV shows
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch TV shows.");
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchTVShows();
  }, [page]); // Re-fetch TV shows when page changes

  const handleViewDetails = (id) => {
    navigate(`/tvshow/${id}`); // Navigate to the TV show details page with ID
  };

  const handlePageChange = (newPage) => {
    setPage(newPage); // Change the page for pagination
  };

  // Skeleton loader improvement
  const skeletonLoader = (
    <div className="flex items-center justify-center h-64 text-white space-x-4">
      {[...Array(5)].map((_, idx) => (
        <div
          key={idx}
          className="w-48 h-64 bg-gray-700 animate-pulse rounded-lg mx-3"
        />
      ))}
    </div>
  );

  if (loading) {
    return skeletonLoader;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 py-8">
      <div className="mx-3 md:mx-10 lg:mx-18 mt-16">
        <h2 className="text-2xl font-semibold text-white mb-6">TV Shows</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6">
          {tvShows.map((item) => (
            <div
              key={item.id}
              className="bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative group">
                <img
                  className="w-full h-48 sm:h-56 md:h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "https://via.placeholder.com/400x250"
                  }
                  alt={item.title || item.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4 text-white">
                <h3 className="text-lg font-semibold truncate">
                  {item.name || item.title}
                </h3>
                <div className="flex items-center space-x-2 text-sm mt-1">
                  <AiFillStar className="text-yellow-400" />
                  <span>{item.vote_average || "N/A"}</span>
                </div>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {item.overview || "No description available."}
                </p>
                <button
                  className="mt-4 w-full py-2 bg-red-500 text-white text-sm font-semibold rounded-md hover:bg-red-600 transition-colors duration-300"
                  onClick={() => handleViewDetails(item.id)} // Navigate to TV show details page
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="px-4 py-2 bg-gray-700 text-white rounded-md mr-4 disabled:bg-gray-600"
          >
            Prev
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:bg-gray-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default TVShows;
