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
  const [subscriberCount, setSubscriberCount] = useState(null); // ✅ State to store sub count
  const dispatch = useDispatch();
  const videoId = searchParams.get("v");

  const videos = useSelector((state) => state.videosOfStore.videos?.items);

  // Find the specific video object based on videoId
  const currentVideo = videos?.find((vid) => vid.id === videoId);

  useEffect(() => {
    dispatch(closeHamburger()); // Closes the hamburger menu/sidebar on the WatchPage
    getVideoDetails(); // Fetch video data from YouTube API
  }, []);

  const getVideoDetails = async () => {
    const data = await fetch(YOUTUBE_VDOS_API);
    const json = await data.json();
    dispatch(setVideos(json));
    // console.log(json?.items);
  };
  // console.log(videos);

  if (!currentVideo?.snippet || !currentVideo?.statistics) return;
  const { channelTitle, title, publishedAt, thumbnails } = currentVideo.snippet;
  const { likeCount, viewCount } = currentVideo.statistics;

  return (
    <div className="flex py-3 px-20 mx-auto gap-16 bg-gradient-to-r from-gray-800 via-white to-black
">
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
                👍 Like
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
