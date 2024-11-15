import React, { useState, useEffect, useRef } from "react";
import { FiGift } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { ImSearch } from "react-icons/im";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const moviesData = useSelector((state) => state.allMovies);
  const movies = moviesData?.movieCollection || [];
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for navbar
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 95);
  };

  // Handle search functionality
  const handleSearch = async (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: "7b04946a99e7a70bee2151b873f20d2e",
          query: query,
          language: "en-US",
          page: 1,
        },
      });
      setSearchResults(response.data.results || []);
    } catch (err) {
      setError("Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  // Clear search query and results
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  // Handle click outside dropdown to close it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isCategoryActive = (category) => location.pathname.includes(category.toLowerCase());

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-gray-800 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 lg:px-8">
        <NavLink to="/" className="text-2xl font-bold text-red-500">
          Watch with me
        </NavLink>

        <nav className="hidden lg:flex space-x-4">
          {["Home", "Action", "Horror", "Comedy", "Top Rated", "TV Shows"].map((link) => (
            <NavLink
              key={link}
              to={link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "_")}`}
              className={`text-white hover:font-semibold ${
                isCategoryActive(link) ? "text-red-500" : ""
              }`}
            >
              {link}
            </NavLink>
          ))}
        </nav>

        <button
          className="text-white lg:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
        </button>

        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <ImSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-8 py-2 bg-gray-700 rounded-md text-white outline-none focus:ring-2 focus:ring-red-500"
              value={searchQuery}
              onChange={handleSearch}
            />
            {loading && searchQuery && (
              <div className="absolute left-0 mt-2 bg-gray-800 rounded shadow-lg w-full text-white text-center p-2">
                Loading...
              </div>
            )}
            {error && (
              <div className="absolute left-0 mt-2 bg-red-700 text-white rounded shadow-lg w-full p-2 text-center">
                {error}
              </div>
            )}
            {searchResults.length > 0 && !loading && (
              <div className="absolute left-0 mt-2 bg-gray-800 rounded shadow-lg max-h-60 overflow-y-auto w-full">
                {searchResults.map((movie) => (
                  <div
                    key={movie.id}
                    className="p-2 text-white hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      navigate(`/movie/${movie.id}`);
                      clearSearch();
                    }}
                  >
                    {movie.name || movie.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          <FiGift className="text-white text-lg cursor-pointer hidden md:block" />
          <FaBell className="text-white text-lg cursor-pointer hidden md:block" />

          <div
            ref={dropdownRef}
            className="relative flex items-center space-x-2 cursor-pointer"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <img
              className="w-8 h-8 rounded-full"
              src="https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-1/431627977_1390086921623516_1673590469271840604_n.jpg?stp=dst-jpg_s200x200&_nc_cat=108&ccb=1-7&_nc_sid=50d2ac&_nc_eui2=AeHGJzd6Kh9yIs2euIlbDR7GWZCvUeINEHdZkK9R4g0Qd2Kaxg_Dds64qa4I3Tce-YUcuQ6h2n9-YtZBme2Tf06e&_nc_ohc=J_J9Dq1SKKQQ7kNvgEqnAxK&_nc_zt=24&_nc_ht=scontent.fktm8-1.fna&_nc_gid=AbQoaeo-iZyL7z3AGRiEblP&oh=00_AYD8Gf7__gscOBIH87DY5HpWm7Va_APOza0TT-QoYeVGmg&oe=673D4BB6"
              alt="User Avatar"
            />
            <MdArrowDropDown className="text-white text-lg" />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-40 bg-gray-800 rounded shadow-lg w-48">
                <button
                  className="block w-full px-4 py-2 text-white hover:bg-gray-700 text-left"
                  onClick={() => {
                    navigate("/manage-profile");
                    setIsDropdownOpen(false);
                  }}
                >
                  Manage Profile
                </button>
                <button
                  className="block w-full px-4 py-2 text-white hover:bg-gray-700 text-left"
                  onClick={() => {
                    navigate("/settings");
                    setIsDropdownOpen(false);
                  }}
                >
                  Settings
                </button>
                <button
                  className="block w-full px-4 py-2 text-white hover:bg-red-500 text-left"
                  onClick={() => {
                    // Add your logout logic here
                    alert("Logged out");
                    setIsDropdownOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="bg-gray-800 text-white lg:hidden">
          {["Home", "Action", "Horror", "Comedy", "Top Rated", "TV Shows"].map((link) => (
            <NavLink
              key={link}
              to={link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "_")}`}
              className="block py-2 px-4 hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              {link}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}

export default React.memo(Navbar);
