import React, { useEffect, useState } from "react";
import VideoCards from "./VideoCards";
import { YOUTUBE_VDOS_API } from "../utils/constants";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setVideos } from "../utils/videoSlice";

const VideoContainer = () => {

  const dispatch = useDispatch();
  // ⬇️ Get videos from Redux store
  const videos = useSelector((state) => state.videosOfStore.videos);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetch(YOUTUBE_VDOS_API);
        if (!data.ok) {
          throw new Error(`HTTP error! Status: ${data.status}`);
        }
        const json = await data.json();
        // console.log("Fetch Videos Response:", json);
        // Ensure json.items is an array before dispatching
        if (Array.isArray(json.items)) {
          dispatch(setVideos(json.items));
        } else {
          throw new Error("Invalid API response: items is not an array");
        }
      } catch (error) {
        console.error("Fetch Videos Error:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    // Only fetch if videos is not already populated
    if (!videos || videos.length === 0) {
      getVideos();
    }
  }, [dispatch]);

  return (
    <div className="px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-y-4 gap-x-4">
      {isLoading && <p className="text-gray-600">Loading videos...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {!isLoading && !error && Array.isArray(videos) && videos.length > 0 ? (
        videos.map((video, index) => (
          <Link key={video.id} to={"watch?v=" + video.id}>
            <VideoCards info={video} />
          </Link>
        ))
      ) : (
        !isLoading && <p className="text-gray-600 text-sm">No videos available.</p>
      )}
    </div>
  );
};

export default VideoContainer;
