import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideBar = () => {
  const isHamburgerOpen = useSelector(
    (state) => state.hamburger.isHamburgerOpen
  );

  return (
    <div
      className={`fixed top-20 left-0 w-44 h-[calc(100%-4rem)] bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto ${
        isHamburgerOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Main Navigation */}
      <ul className="m-4 space-y-1">
        <li>
          <Link 
            to="/" 
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 font-medium"
          >
            Home
          </Link>
        </li>
        <li>
          <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer font-medium">
            Shorts
          </div>
        </li>
        <li>
          <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer font-medium">
            Subscriptions
          </div>
        </li>
      </ul>

      {/* Divider */}
      <hr className="mx-4 border-gray-400" />

      {/* You Section */}
      <div className="mt-4">
        <h1 className="font-bold text-sm ml-7 text-gray-900 mb-2">You</h1>
        <ul className="space-y-1 mx-4">
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              History
            </div>
          </li>
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              Playlists
            </div>
          </li>
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              Your videos
            </div>
          </li>
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              Your courses
            </div>
          </li>
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              Watch Later
            </div>
          </li>
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              Liked videos
            </div>
          </li>
        </ul>
      </div>

      {/* Divider */}
      <hr className="mx-4 border-gray-400 mt-4" />

      {/* Subscriptions Section */}
      <div className="mt-4">
        <h1 className="font-bold text-sm ml-7 text-gray-900 mb-2">Subscriptions</h1>
        <ul className="space-y-1 mx-4">
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              Channel 1
            </div>
          </li>
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              Channel 2
            </div>
          </li>
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              Channel 3
            </div>
          </li>
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              Show more
            </div>
          </li>
        </ul>
      </div>
      {/* Divider */}
      <hr className="mx-4 border-gray-200 mt-4" />

      {/* Explore Section */}
      <div className="mt-4">
        <h1 className="font-bold text-sm ml-7 text-gray-900 mb-2">Explore</h1>
        <ul className="space-y-1 mx-4">
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              Shopping
            </div>
          </li>
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              Music
            </div>
          </li>
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              Films
            </div>
          </li>
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              Live
            </div>
          </li>
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              Gaming
            </div>
          </li>
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              News
            </div>
          </li>
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              Sport
            </div>
          </li>
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              Courses
            </div>
          </li>
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              Fashion & beauty
            </div>
          </li>
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              Podcasts
            </div>
          </li>
        </ul>
      </div>

      {/* Divider */}
      <hr className="mx-4 border-gray-200 mt-4" />

      {/* More from YouTube Section */}
      <div className="mt-4 mb-6">
        <h1 className="font-bold text-sm ml-7 text-gray-900 mb-2">More from YouTube</h1>
        <ul className="space-y-1 mx-4">
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              YouTube Premium
            </div>
          </li>
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              YouTube Studio
            </div>
          </li>
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              YouTube Music
            </div>
          </li>
          <li>
            <div className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              YouTube Kids
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;