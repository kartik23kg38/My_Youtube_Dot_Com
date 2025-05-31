import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeHamburger } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { REACT_APP_YOUTUBE_VDOS_API } from "../utils/constants";
import { setVideos } from "../utils/videoSlice";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import { Heart, Share2, Download, ThumbsUp } from "lucide-react";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const videoId = searchParams.get("v");
  // const [subscriberCount, setSubscriberCount] = useState(null); // ✅ State to store sub count

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
      <div className="flex py-3 px-20 mx-auto gap-16">
        {/* Left Section: Video & Comments */}
        <div className="w-[880px] ">
          <iframe
            className="rounded-xl w-full h-[500px] ml-5"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          {/* Video Title and Channel Info */}
          <div
            className="yt_Title mt-3 ml-5 rounded-2xl w-full p-6 shadow-2xl 
            bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 
            backdrop-blur-xl border border-cyan-500/20 
          text-white relative overflow-hidden"
          >
            {/* Subtle glowing blobs */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
            </div>

            {/* Title & content on top of background */}
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {title}
              </h3>

              <div className="flex justify-between items-center mt-6">
                {/* Channel info + Subscribe */}
                <div className="flex items-center space-x-6 text-sm">
                  <img
                    src="https://cdn.pixabay.com/photo/2022/01/21/00/38/youtube-icon-6953529_1280.jpg"
                    alt="channel logo"
                    className="w-12 h-12 rounded-full border-2 border-cyan-400/30 shadow-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {channelTitle}
                    </h3>
                    <p className="text-cyan-300 text-sm font-medium">
                      832K subscribers
                    </p>
                  </div>
                  <button
                    className="cursor-pointer bg-gradient-to-r from-blue-800 to-violet-900 text-white px-6 py-3 rounded-full 
                  hover:from-red-600 hover:to-red-700 transition-all duration-100 font-semibold 
                    shadow-lg shadow-purple-800/50 border-3 border-white hover:shadow-red-500/70 transform hover:scale-110 
                    animate-pulse hover:animate-none ring-2 ring-blue-700/30 hover:ring-red-500/40"
                  >
                    Subscribe
                  </button>
                </div>

                {/* Action buttons */}
                <div className="flex items-center space-x-3">
                  {/* Like Button */}
                  <button className="relative overflow-hidden cursor-pointer flex items-center space-x-2 bg-gradient-to-br from-violet-500 via-blue-600 to-white text-white px-5 py-3 rounded-full border border-white/20 shadow-xl shadow-violet-500/30 group hover:scale-105 transform transition-all duration-300">
                    {/* Glow Pulse */}
                    <span className="absolute inset-0 bg-violet-500/20 rounded-full blur-lg opacity-70 group-hover:animate-bounce"></span>
                    {/* Flash Ring */}
                    <span className="absolute w-0 h-0 rounded-full bg-indigo-400/30 group-hover:w-56 group-hover:h-56 transition-all duration-700 ease-out"></span>

                    <ThumbsUp size={18} className="relative z-10" />
                    <span className="relative z-10 font-medium">
                      {likeCount}
                    </span>
                  </button>

                  {/* Share Button */}
                  <button className="relative overflow-hidden cursor-pointer flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 py-3 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg group">
                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-400/20 rounded-full group-hover:w-52 group-hover:h-52"></span>
                    <Share2 size={18} className="relative z-10" />
                    <span className="relative z-10 font-medium">Share</span>
                  </button>

                  {/* Download Button */}
                  <button className="cursor-pointer flex items-center space-x-2 bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-700 backdrop-blur-sm border border-white/20 text-white px-5 py-3 rounded-full hover:from-indigo-600 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/20 group relative overflow-hidden">
                    <span className="absolute inset-0 bg-purple-400/20 blur-md opacity-50 group-hover:animate-pulse"></span>
                    <Download size={18} className="relative z-10" />
                    <span className="relative z-10 font-medium">Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <h1 className="font-bold text-2xl ml-5  w-full mt-8 mb-4 ">
            Comments:
          </h1>
          <div className="w-full ml-5">
            <CommentsContainer videoId={videoId} />
          </div>
        </div>
        <div className="w-[450px] h-[600px] bg-gray-100 rounded-xl p-4 overflow-y-auto">
          <LiveChat />
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
