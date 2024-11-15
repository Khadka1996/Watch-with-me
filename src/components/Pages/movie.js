import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GrPlayFill } from "react-icons/gr";

const Movies = () => {
  const { movieId } = useParams(); // Get the movieId from the URL
  const [movie, setMovie] = useState(null);
  const [videoId, setVideoId] = useState(null); // For storing YouTube trailer ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  // Fetch movie details by movieId
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: {
              api_key: "7b04946a99e7a70bee2151b873f20d2e", // Replace with your API key
              append_to_response: "videos,credits,reviews", // Include videos, credits, and reviews
            },
          }
        );
        setMovie(response.data);
        // Check if there's a trailer available
        if (response.data.videos && response.data.videos.results.length > 0) {
          const trailer = response.data.videos.results[0]; // Get the first trailer
          setVideoId(trailer.key); // Set the video ID for YouTube trailer
        }
        setReviews(response.data.reviews.results.slice(0, 2)); // Set only the first 2 reviews
        fetchRecommendations(response.data.genres); // Fetch recommendations based on genres
      } catch (error) {
        setError("Failed to fetch movie details.");
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  // Fetch movie recommendations based on genre
  const fetchRecommendations = async (genres) => {
    try {
      if (!genres || genres.length === 0) return;
      const genreIds = genres.map((genre) => genre.id).join(",");
      const recommendationsResponse = await axios.get(
        `https://api.themoviedb.org/3/discover/movie`,
        {
          params: {
            api_key: "7b04946a99e7a70bee2151b873f20d2e", // Replace with your API key
            with_genres: genreIds,
            page: 1, // Adjust the page as needed
          },
        }
      );
      setRecommendedMovies(recommendationsResponse.data.results.slice(0, 8)); // Limit to 8 movies
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  // Loading Skeleton or Error
  if (loading) {
    return (
      <div className="relative bg-black text-white">
        {/* Background Image Skeleton */}
        <div className="absolute top-0 left-0 w-full h-full z-[-1]">
          <Skeleton height="100%" width="100%" />
        </div>

        {/* Dark Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-black"></div>

        {/* Movie Details Skeleton */}
        <div className="relative px-4 py-16 sm:px-8 lg:px-16 max-w-screen-xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
            <div className="w-72 h-96 relative rounded-lg shadow-lg overflow-hidden">
              <Skeleton height="100%" width="100%" />
            </div>
            <div className="flex-1 space-y-6">
              <Skeleton height={40} width="60%" />
              <Skeleton height={20} width="40%" />
              <Skeleton count={3} height={30} />
              <Skeleton height={150} />
            </div>
          </div>

          {/* Cast Section Skeleton */}
          <div className="mt-12">
            <h2 className="text-3xl text-white font-semibold">
              <Skeleton width="20%" />
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {Array(8)
                .fill()
                .map((_, index) => (
                  <div key={index} className="text-center group">
                    <Skeleton circle height={128} width={128} />
                    <Skeleton height={20} width="60%" className="mt-2" />
                    <Skeleton height={15} width="50%" />
                  </div>
                ))}
            </div>
          </div>

          {/* Reviews Section Skeleton */}
          <div className="mt-12">
            <h2 className="text-3xl text-white font-semibold">
              <Skeleton width="20%" />
            </h2>
            <div className="mt-6">
              {Array(2)
                .fill()
                .map((_, index) => (
                  <div key={index} className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md">
                    <Skeleton height={100} />
                    <Skeleton height={20} width="40%" className="mt-4" />
                  </div>
                ))}
            </div>
          </div>

          {/* Recommended Movies Section Skeleton */}
          <div className="mt-12">
            <h2 className="text-3xl text-white font-semibold">
              <Skeleton width="20%" />
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {Array(8)
                .fill()
                .map((_, index) => (
                  <div key={index} className="relative">
                    <Skeleton height={200} />
                    <Skeleton height={30} width="60%" className="mt-2" />
                    <Skeleton height={20} width="40%" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="relative bg-black text-white">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="object-cover w-full h-full opacity-40"
        />
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-black"></div>

      {/* Movie Details */}
      <div className="relative px-4 py-16 sm:px-8 lg:px-16 max-w-screen-xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
          <div className="flex-shrink-0 w-72 h-96 relative rounded-lg shadow-lg overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="object-cover w-full h-full rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white">{movie.title}</h1>
            <p className="text-lg sm:text-xl text-gray-300">{movie.release_date} • Rating: {movie.vote_average} / 10</p>

            <div className="flex flex-wrap space-x-2">
              {movie.genres &&
                movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-700 text-sm px-4 py-2 rounded-full text-white shadow-md"
                  >
                    {genre.name}
                  </span>
                ))}
            </div>

            <p className="text-lg sm:text-xl text-gray-200 mt-4">{movie.overview}</p>

            {/* Movie Trailer */}
            {videoId ? (
              <div className="flex justify-center mt-8">
                <iframe
                  width="100%"
                  height="450"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="YouTube video"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="flex justify-center mt-8">
                <button
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition"
                  onClick={() => window.location.href = `https://www.youtube.com/results?search_query=${movie.title}+trailer`}
                >
                  Watch Trailer
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Cast Section */}
        <div className="mt-12">
  <h2 className="text-3xl text-white font-semibold">Cast</h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
    {movie.credits.cast.slice(0, 8).map((actor) => (
      <div key={actor.id} className="text-center group">
        <img
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
              : "https://via.placeholder.com/200x300.png?text=No+Image"
          }
          alt={actor.name}
          className="rounded-full w-32 h-32 object-cover mx-auto"
        />
        <p className="text-white mt-2">{actor.name}</p>
        <p className="text-gray-400 text-sm">{actor.character}</p>
      </div>
    ))}
  </div>
</div>


        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-3xl text-white font-semibold">Reviews</h2>
          <div className="mt-6">
            {reviews.map((review) => (
              <div key={review.id} className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md">
                <p className="text-white text-lg">{review.content}</p>
                <p className="text-gray-300 text-sm mt-4">- {review.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Movies Section */}
        <div className="mt-12">
          <h2 className="text-3xl text-white font-semibold">You Might Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {recommendedMovies.map((movie) => (
              <div key={movie.id} className="relative group">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="object-cover w-full h-full rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                    <GrPlayFill size={48} color="#fff" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
