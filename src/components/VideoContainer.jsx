import React, { useEffect, useState } from "react";
import VideoCards from "./VideoCards";
import { YOUTUBE_VDOS_API } from "../utils/constants";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setVideos } from "../utils/videoSlice";

const VideoContainer = () => {
  const dispatch= useDispatch();
   // ⬇️ Get videos from Redux store
   const videos = useSelector((state) => state.videosOfStore.videos);
  // const [videos, setVideos] = useState([]);

  useEffect(() => {

    const getVideos = async () => {
      const data = await fetch(YOUTUBE_VDOS_API);
      const json = await data.json();
      dispatch(setVideos(json.items));
    };

    getVideos();

  }, []);

  return (
    <div className="px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-y-4 gap-x-4 ">
      {videos.map((video) => (
        <Link key={video.id} to={"watch?v=" + video.id}>
          <VideoCards info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
