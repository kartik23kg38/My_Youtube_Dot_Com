import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeHamburger } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { REACT_APP_YOUTUBE_VDOS_API } from "../utils/constants";
import { setVideos } from "../utils/videoSlice";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import {
  Heart,
  Share2,
  Download,
  ThumbsUp,
  MessageCircle,
  X,
} from "lucide-react";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const dispatch = useDispatch();
  const videoId = searchParams.get("v");

  const videos = useSelector((state) => state.videosOfStore.videos);

  // Find the specific video object based on videoId
  const currentVideo = videos?.find((vid) => vid.id === videoId);

  useEffect(() => {
    dispatch(closeHamburger()); // Closes the hamburger menu/sidebar on the WatchPage
    getVideoDetails(); // Fetch video data from YouTube API
  }, [dispatch, videoId]);

  const getVideoDetails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetch(REACT_APP_YOUTUBE_VDOS_API);
      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }
      const json = await data.json();

      // Dispatch items consistently with VideoContainer
      if (Array.isArray(json.items)) {
        dispatch(setVideos(json.items));
      } else {
        throw new Error("Invalid API response: items is not an array");
      }
    } catch (err) {
      console.error("Fetch Video Details Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Proper loading and error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-600">Loading video...</p>
      </div>
    );
  }

  if (!currentVideo?.snippet || !currentVideo?.statistics) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-600">Video not found or data unavailable.</p>
      </div>
    );
  }

  const { channelTitle, title } = currentVideo.snippet;
  const { likeCount } = currentVideo.statistics;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 🔻 Background image with slow animation */}
      <div
        className="absolute inset-0 z-[-1] opacity-20 blur-sm"
        style={{
          backgroundImage: `url('')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "slowPan 60s linear infinite",
        }}
      />

      {/* Mobile LiveChat Toggle Button - Only visible on mobile */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowLiveChat(!showLiveChat)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          {showLiveChat ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>

      {/* Mobile LiveChat Overlay */}
      {showLiveChat && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
          <div className="absolute bottom-0 left-0 right-0 h-[70vh] bg-gradient-to-bl from-gray-600 to-white rounded-t-3xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Live Chat</h3>
              <button
                onClick={() => setShowLiveChat(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>
            <div className="h-full overflow-y-auto">
              <LiveChat />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <div className="w-full px-2 sm:px-4 lg:px-8 py-4">
        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-8 w-full min-h-[calc(100vh-100px)]">
          {/* Left Section: Video & Comments */}
          <div className="flex-grow flex flex-col min-w-0">
            {/* Video Player */}
            <div className="w-full">
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
            {/* Video Title and Channel Info */}
            <div className="mt-4 rounded-2xl p-4 sm:p-6 shadow-2xl bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 backdrop-blur-xl border border-cyan-500/20 text-white relative overflow-hidden">
              {/* Subtle glowing blobs */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
              </div>
              {/* Title & content on top of background */}
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {title}
                </h3>
                                 <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 lg:gap-6">
                   {/* Channel info + Subscribe */}
                   <div className="flex items-center gap-3 lg:gap-6 text-sm flex-shrink-0">
                     <img
                       src="https://cdn.pixabay.com/photo/2022/01/21/00/38/youtube-icon-6953529_1280.jpg"
                       alt="channel logo"
                       className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-cyan-400/30 shadow-lg"
                     />
                     <div className="min-w-0 flex-1">
                       <h3 className="text-base sm:text-lg font-semibold text-white truncate">
                         {channelTitle}
                       </h3>
                       <p className="text-cyan-300 text-xs sm:text-sm font-medium">
                         832K subscribers
                       </p>
                     </div>
                     <button className="cursor-pointer bg-gradient-to-r from-blue-800 to-violet-900 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-100 font-semibold shadow-lg shadow-purple-800/50 border-3 border-white hover:shadow-red-500/70 transform hover:scale-110 animate-pulse hover:animate-none ring-2 ring-blue-700/30 hover:ring-red-500/40 text-xs sm:text-sm flex-shrink-0">
                       Subscribe
                     </button>
                   </div>
                   {/* Action buttons */}
                   <div className="flex items-center justify-center lg:justify-end gap-1 sm:gap-2 lg:gap-3 flex-shrink-0">
                     {/* Like Button */}
                     <button className="relative overflow-hidden cursor-pointer flex items-center gap-1 sm:gap-2 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-500 text-white px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 rounded-full border border-white/20 shadow-xl shadow-emerald-500/30 group hover:scale-105 transform transition-all duration-300">
                       <span className="absolute inset-0 bg-emerald-500/20 rounded-full blur-lg opacity-70 group-hover:animate-bounce"></span>
                       <span className="absolute w-0 h-0 rounded-full bg-teal-400/30 group-hover:w-56 group-hover:h-56 transition-all duration-700 ease-out"></span>
                       <ThumbsUp
                         size={16}
                         className="relative z-10 sm:w-[18px] sm:h-[18px] lg:w-5 lg:h-5"
                       />
                       <span className="relative z-10 font-medium text-xs sm:text-sm lg:text-sm hidden sm:inline">
                         {likeCount}
                       </span>
                     </button>
                     {/* Share Button */}
                     <button className="relative overflow-hidden cursor-pointer flex items-center gap-1 sm:gap-2 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-500 backdrop-blur-sm border border-white/20 text-white px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg group">
                       <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-400/20 rounded-full group-hover:w-52 group-hover:h-52"></span>
                       <Share2
                         size={16}
                         className="relative z-10 sm:w-[18px] sm:h-[18px] lg:w-5 lg:h-5"
                       />
                       <span className="relative z-10 font-medium text-xs sm:text-sm lg:text-sm hidden sm:inline">
                         Share
                       </span>
                     </button>
                     {/* Download Button */}
                     <button className="cursor-pointer flex items-center gap-1 sm:gap-2 bg-gradient-to-br from-orange-500 via-red-600 to-pink-500 backdrop-blur-sm border border-white/20 text-white px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 rounded-full hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/20 group relative overflow-hidden">
                       <span className="absolute inset-0 bg-orange-400/20 blur-md opacity-50 group-hover:animate-pulse"></span>
                       <Download
                         size={16}
                         className="relative z-10 sm:w-[18px] sm:h-[18px] lg:w-5 lg:h-5"
                       />
                       <span className="relative z-10 font-medium text-xs sm:text-sm lg:text-sm hidden sm:inline">
                         Download
                       </span>
                     </button>
                   </div>
                </div>
              </div>
            </div>
            {/* Comments Section */}
            <div className="mt-6 sm:mt-8">
              <h2 className="font-bold text-xl sm:text-2xl mb-4 text-white">
                Comments:
              </h2>
              <CommentsContainer videoId={videoId} />
            </div>
          </div>
          {/* Desktop LiveChat */}
          <div className="flex-shrink-0 w-[380px] lg:w-[480px] xl:w-[540px] h-[600px] xl:h-[700px] 2xl:h-[830px] bg-gradient-to-bl from-gray-600 to-white rounded-xl p-4 overflow-y-auto">
            <LiveChat />
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden">
          {/* Video Player */}
          <div className="w-full">
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          {/* Video Title and Channel Info */}
          <div className="mt-4 rounded-2xl p-4 shadow-2xl bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 backdrop-blur-xl border border-cyan-500/20 text-white relative overflow-hidden">
            {/* Subtle glowing blobs */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
            </div>

            {/* Title & content on top of background */}
            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {title}
              </h3>

              <div className="flex flex-col gap-4">
                {/* Channel info + Subscribe */}
                <div className="flex items-center gap-3 text-sm">
                  <img
                    src="https://cdn.pixabay.com/photo/2022/01/21/00/38/youtube-icon-6953529_1280.jpg"
                    alt="channel logo"
                    className="w-10 h-10 rounded-full border-2 border-cyan-400/30 shadow-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white">
                      {channelTitle}
                    </h3>
                    <p className="text-cyan-300 text-xs font-medium">
                      832K subscribers
                    </p>
                  </div>
                  <button className="cursor-pointer bg-gradient-to-r from-blue-800 to-violet-900 text-white px-4 py-2 rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-100 font-semibold shadow-lg shadow-purple-800/50 border-3 border-white hover:shadow-red-500/70 transform hover:scale-110 animate-pulse hover:animate-none ring-2 ring-blue-700/30 hover:ring-red-500/40 text-xs">
                    Subscribe
                  </button>
                </div>

                                 {/* Action buttons */}
                 <div className="flex items-center justify-center gap-1 sm:gap-2">
                   {/* Like Button */}
                   <button className="relative overflow-hidden cursor-pointer flex items-center gap-1 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-500 text-white px-2 sm:px-3 py-2 rounded-full border border-white/20 shadow-xl shadow-emerald-500/30 group hover:scale-105 transform transition-all duration-300">
                     <span className="absolute inset-0 bg-emerald-500/20 rounded-full blur-lg opacity-70 group-hover:animate-bounce"></span>
                     <span className="absolute w-0 h-0 rounded-full bg-teal-400/30 group-hover:w-56 group-hover:h-56 transition-all duration-700 ease-out"></span>
                     <ThumbsUp size={16} className="relative z-10" />
                     <span className="relative z-10 font-medium text-xs hidden sm:inline">
                       {likeCount}
                     </span>
                   </button>

                   {/* Share Button */}
                   <button className="relative overflow-hidden cursor-pointer flex items-center gap-1 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-500 backdrop-blur-sm border border-white/20 text-white px-2 sm:px-3 py-2 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg group">
                     <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-400/20 rounded-full group-hover:w-52 group-hover:h-52"></span>
                     <Share2 size={16} className="relative z-10" />
                     <span className="relative z-10 font-medium text-xs hidden sm:inline">
                       Share
                     </span>
                   </button>

                   {/* Download Button */}
                   <button className="cursor-pointer flex items-center gap-1 bg-gradient-to-br from-orange-500 via-red-600 to-pink-500 backdrop-blur-sm border border-white/20 text-white px-2 sm:px-3 py-2 rounded-full hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/20 group relative overflow-hidden">
                     <span className="absolute inset-0 bg-orange-400/20 blur-md opacity-50 group-hover:animate-pulse"></span>
                     <Download size={16} className="relative z-10" />
                     <span className="relative z-10 font-medium text-xs hidden sm:inline">
                       Download
                     </span>
                   </button>
                 </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            <h2 className="font-bold text-xl mb-4 text-white">Comments:</h2>
            <CommentsContainer videoId={videoId} />
          </div>
        </div>
      </div>

      {/* 🔻 Keyframes for background animation */}
      <style jsx>{`
        @keyframes slowPan {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default WatchPage;
