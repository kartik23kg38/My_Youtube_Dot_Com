import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // ✅ Add this import
import { toggleHamburger } from "../utils/appSlice";
import SideBar from "./SideBar";
import { YOUTUBE_SEARCH_SUGGESTIONS_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Add this hook
  const isHamburgerOpen = useSelector(
    (state) => state.hamburger.isHamburgerOpen
  );
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((state) => state.cache.data);

  const toggleHamburgerHandler = () => {
    dispatch(toggleHamburger());
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    performSearch(suggestion);
  };

  // Handle search (both button click and suggestion click)
  const performSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      // Navigate to results page with search query
      navigate(`/results?search_query=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  // Handle search button click
  const handleSearchClick = () => {
    performSearch();
  };

  // Debounce Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  // Cache and Fetch Logic
  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setSuggestions([]);
      return;
    }

    // Check cache first
    if (searchCache[debouncedQuery]) {
      setSuggestions(searchCache[debouncedQuery]);
      return; // Skip API call if cached
    }

    // Fetch suggestions if not cached
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          YOUTUBE_SEARCH_SUGGESTIONS_API + debouncedQuery
        );
        const json = await response.json();
        setSuggestions(json[1]);

        // Cache the result
        dispatch(
          cacheResults({
            query: debouncedQuery,
            suggestions: json[1],
          })
        );
      } catch (error) {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery, dispatch]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white grid grid-flow-col items-center gap-4 p-2 shadow-lg">
      <div className="flex items-center gap-4 col-span-1">
        <div
          onClick={toggleHamburgerHandler}
          className="w-10 h-10 rounded-full hover:bg-gray-300 cursor-pointer ml-3 flex items-center justify-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/6015/6015685.png"
            alt="hamburger-sign"
            className="h-5"
          />
        </div>
        <img
          className="h-6 cursor-pointer"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
          alt="YouTube_Logo"
          onClick={() => navigate('/')} // ✅ Add home navigation
        />
      </div>
      <div className="col-span-10 px-30 relative">
        <div className="flex"> {/* ✅ Wrap input and button in flex container */}
          <input
            className="border border-gray-400 w-2/3 rounded-l-full my-2 py-2 px-4 focus:border-2 focus:outline-none focus:border-blue-600"
            type="text"
            placeholder="Search your topic"
            value={query}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            className="border border-gray-400 rounded-r-full px-4 my-2 py-2 hover:bg-gray-100 transition-colors duration-200"
            onClick={handleSearchClick} // ✅ Add click handler
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
              alt="search-icon"
              className="h-5 w-5"
            />
          </button>
        </div>

        {suggestions.length > 0 && showSuggestions && (
          <div className="absolute left-0 w-2/3 bg-white border border-gray-300 rounded-lg shadow-lg z-50 transition-all duration-200 mt-1">
            {suggestions.map((s, idx) => (
              <div
                key={idx}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 transition-colors duration-150"
                onClick={() => handleSuggestionClick(s)} // ✅ Add click handler
                onMouseDown={(e) => e.preventDefault()} // ✅ Prevent input blur
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
                  alt="search-icon"
                  className="h-4 w-4 opacity-60"
                />
                <span className="text-gray-900 text-md font-semibold">{s}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="h-10 w-10 col-span-1">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/007/407/996/small/user-icon-person-icon-client-symbol-login-head-sign-icon-design-vector.jpg"
          alt="signin-user-logo"
          className="rounded-full cursor-pointer hover:opacity-80 transition-opacity duration-200"
        />
      </div>
    </div>
  );
};

export default Header;