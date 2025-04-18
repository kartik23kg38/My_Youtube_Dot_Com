import React from "react";

const VideoCards = ({ info }) => {
  // console.log("info = ", info);

  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;
  const { viewCount } = statistics;

  return (
<div className="cursor-pointer border border-gray-400 w-full p-2 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
  <img
    className="rounded-xl h-56 w-full object-cover"
    src={thumbnails.high.url}
    alt="vdoCard"
  />
   <div className="p-4">
    <h3 className="text-black/80 text-base font-semibold line-clamp-2 mb-1">{title}</h3>
    <p className="text-black/90 text-sm">{channelTitle}</p>
    <p className="text-black/90 text-sm">
      {new Intl.NumberFormat("en-US", { notation: "compact" }).format(viewCount)} views
    </p>
  </div>
</div>

  );
};

export default VideoCards;
