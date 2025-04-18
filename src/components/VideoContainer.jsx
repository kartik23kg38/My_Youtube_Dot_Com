import React, { useEffect, useState } from "react";
import VideoCards from "./VideoCards";
import { YOUTUBE_VDOS_API } from "../utils/constants";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VDOS_API);
    const json = await data.json();
    setVideos(json.items);
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-y-4 gap-x-4 ">
      {videos.map((video) => (
        <Link key={video.id} to={"watch?v=" + video.id}>
          <VideoCards info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
