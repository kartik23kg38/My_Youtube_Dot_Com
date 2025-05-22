import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeHamburger } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_VDOS_API } from "../utils/constants";
import { setVideos } from "../utils/videoSlice";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";

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
  }, [videoId]);

  const getVideoDetails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetch(YOUTUBE_VDOS_API);
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
    <div
      className="flex py-3 px-20 mx-auto gap-16 bg-gradient-to-r from-gray-800 via-white to-black
"
    >
      {/* Left Section: Video & Comments */}
      <div className="w-[780px]">
        <iframe
          className="rounded-xl w-full h-[460px]"
          src={"https://www.youtube.com/embed/" + videoId}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <div className="yt_Title mt-3 border rounded-lg">
          <h3 className="text-xl font-semibold">{title}</h3>

          <div className="flex justify-between items-center mt-4">
            {/* Left side: Channel Info + Subscribe */}
            <div className="flex items-center space-x-6 -mt-2 text-sm">
              <img
                src="https://via.placeholder.com/40"
                alt="channel logo"
                className="border w-10 h-10 bg-amber-300 mr-4 rounded-full"
              />

              <div>
                <h3 className="text-base font-medium">{channelTitle}</h3>
                <p className="text-gray-600 text-xs">832K subscribers</p>
              </div>

              <button className="cursor-pointer  bg-black text-white px-4 py-2 rounded-full hover:opacity-90 transition duration-200">
                Subscribe
              </button>
            </div>

            {/* Right side: Actions (like/share etc.) */}
            <div className="flex items-center space-x-4 -mt-2">
              <button className="cursor-pointer bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-200">
                👍 Like {likeCount ? `(${likeCount})` : ''}
              </button>
              <button className="cursor-pointer bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-200">
                🔁 Share
              </button>
              <button className="cursor-pointer bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-200">
                💾 Download
              </button>
            </div>
          </div>
        </div>
        <h1 className="font-bold text-2xl mt-8 mb-4">Comments:</h1>
        <div className="bg-gray-300 rounded-lg">
          <CommentsContainer videoId={videoId} />
        </div>
      </div>
      <div className="w-[450px] h-[600px] bg-gray-100 rounded-xl p-4 overflow-y-auto">
        <LiveChat />
      </div>
    </div>
  );
};

export default WatchPage;
