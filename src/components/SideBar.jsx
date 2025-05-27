import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { 
  Home, 
  Scissors, 
  Users, 
  History, 
  ListVideo, 
  Play, 
  GraduationCap, 
  Clock, 
  ThumbsUp,
  ShoppingBag,
  Music,
  Film,
  Radio,
  Gamepad2,
  Newspaper,
  Trophy,
  BookOpen,
  Shirt,
  Mic,
  Crown,
  VideoIcon,
  Youtube,
  Baby
} from 'lucide-react';

const SideBar = () => {
  const isHamburgerOpen = useSelector(
    (state) => state.hamburger.isHamburgerOpen
  );

  return (
    <div
      className={`fixed top-20 left-0 w-56 h-[calc(100%-4rem)] bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto ${
        isHamburgerOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Main Navigation */}
      <ul className="m-4 space-y-1">
        <li>
          <Link 
            to="/" 
            className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 font-medium whitespace-nowrap"
          >
            <Home className="w-5 h-5 mr-3 flex-shrink-0" />
            Home
          </Link>
        </li>
        <li>
          <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer font-medium whitespace-nowrap">
            <Scissors className="w-5 h-5 mr-3 flex-shrink-0" />
            Shorts
          </div>
        </li>
        <li>
          <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer font-medium whitespace-nowrap">
            <Users className="w-5 h-5 mr-3 flex-shrink-0" />
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
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm whitespace-nowrap">
              <History className="w-4 h-4 mr-3 flex-shrink-0" />
              History
            </div>
          </li>
          <li>
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm whitespace-nowrap">
              <ListVideo className="w-4 h-4 mr-3 flex-shrink-0" />
              Playlists
            </div>
          </li>
          <li>
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm whitespace-nowrap">
              <Play className="w-4 h-4 mr-3 flex-shrink-0" />
              Your videos
            </div>
          </li>
          <li>
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm whitespace-nowrap">
              <GraduationCap className="w-4 h-4 mr-3 flex-shrink-0" />
              Your courses
            </div>
          </li>
          <li>
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm whitespace-nowrap">
              <Clock className="w-4 h-4 mr-3 flex-shrink-0" />
              Watch Later
            </div>
          </li>
          <li>
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm whitespace-nowrap">
              <ThumbsUp className="w-4 h-4 mr-3 flex-shrink-0" />
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
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              <div className="w-4 h-4 mr-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">C</span>
              </div>
              Channel 1
            </div>
          </li>
          <li>
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              <div className="w-4 h-4 mr-3 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">C</span>
              </div>
              Channel 2
            </div>
          </li>
          <li>
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              <div className="w-4 h-4 mr-3 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">C</span>
              </div>
              Channel 3
            </div>
          </li>
          <li>
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              <Users className="w-4 h-4 mr-3" />
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
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              <ShoppingBag className="w-4 h-4 mr-3" />
              Shopping
            </div>
          </li>
          <li>
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              <Music className="w-4 h-4 mr-3" />
              Music
            </div>
          </li>
          <li>
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              <Film className="w-4 h-4 mr-3" />
              Films
            </div>
          </li>
          <li>
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              <Radio className="w-4 h-4 mr-3" />
              Live
            </div>
          </li>
          <li>
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              <Gamepad2 className="w-4 h-4 mr-3" />
              Gaming
            </div>
          </li>
          <li>
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              <Newspaper className="w-4 h-4 mr-3" />
              News
            </div>
          </li>
          <li>
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              <Trophy className="w-4 h-4 mr-3" />
              Sport
            </div>
          </li>
          <li>
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              <BookOpen className="w-4 h-4 mr-3" />
              Courses
            </div>
          </li>
          <li>
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm whitespace-nowrap">
              <Shirt className="w-4 h-4 mr-3 flex-shrink-0" />
              Fashion & beauty
            </div>
          </li>
          <li>
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              <Mic className="w-4 h-4 mr-3" />
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
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              <Crown className="w-4 h-4 mr-3 text-red-600" />
              YouTube Premium
            </div>
          </li>
          <li>
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              <VideoIcon className="w-4 h-4 mr-3 text-red-600" />
              YouTube Studio
            </div>
          </li>
          <li>
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              <Music className="w-4 h-4 mr-3 text-red-600" />
              YouTube Music
            </div>
          </li>
          <li>
            <div className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-100 cursor-pointer text-sm">
              <Baby className="w-4 h-4 mr-3 text-red-600" />
              YouTube Kids
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;