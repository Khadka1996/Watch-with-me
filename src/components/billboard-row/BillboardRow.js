import React, { useState, useEffect } from "react";
import { GrPlayFill } from "react-icons/gr";
import { FiInfo } from "react-icons/fi";
import axios from "axios";
import Skeleton from "react-loading-skeleton"; // For skeleton loading effect
import "react-loading-skeleton/dist/skeleton.css"; // Import CSS for Skeleton

const BillboardRow = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To handle errors

  // Fetch trending movie data from The Movie Database API
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setLoading(true); // Set loading state
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            params: {
              api_key: "7b04946a99e7a70bee2151b873f20d2e", // Store your API key in .env
            },
          }
        );

        // Get a random movie from the response
        const randomMovie =
          response.data.results[
            Math.floor(Math.random() * response.data.results.length)
          ];

        setSelectedMovie(randomMovie);
      } catch (error) {
        setError("Failed to load movie data. Please try again later.");
        console.error("Error fetching trending movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  // Truncate long text
  const truncate = (str, num) =>
    str && str.length > num ? `${str.substring(0, num)}...` : str;

  if (loading) {
    return (
      <div className="relative w-full h-[90vh] bg-black text-white flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full h-[90vh] bg-black text-white flex items-center justify-center">
        <p className="text-2xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[90vh] bg-black text-white">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${selectedMovie?.backdrop_path})`,
        }}>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-black"></div>
      </div>

      {/* Movie Information */}
      <div className="absolute top-1/3 left-8 md:left-16 z-10 max-w-2xl space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          {selectedMovie ? selectedMovie.title : <Skeleton width="300px" />}
        </h1>
        <p className="text-lg md:text-xl max-w-lg text-gray-300">
          {selectedMovie ? truncate(selectedMovie.overview, 150) : <Skeleton count={3} />}
        </p>

        {/* Buttons */}
        <div className="flex space-x-4">
          <a
            href={selectedMovie ? `https://www.youtube.com/watch?v=${selectedMovie.id}` : "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-6 py-2 bg-white text-black rounded font-semibold shadow-lg hover:bg-gray-200 transition"
          >
            <GrPlayFill className="mr-2 text-xl" />
            Watch Trailer
          </a>
          <button
            type="button"
            className="flex items-center px-6 py-2 bg-gray-700 bg-opacity-80 text-white rounded font-semibold shadow-lg hover:bg-opacity-60 transition"
          >
            <FiInfo className="mr-2 text-xl" />
            More Info
          </button>
        </div>
      </div>

      {/* Movie Poster */}
      <div className="absolute top-1/3 right-8">
        {selectedMovie && selectedMovie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`}
            alt={selectedMovie.title}
            className="w-56 h-auto rounded-lg shadow-lg"
          />
        ) : (
          <Skeleton width={200} height={300} />
        )}
      </div>
    </div>
  );
};

export default BillboardRow;
