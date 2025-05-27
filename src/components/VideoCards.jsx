import React from "react";

const VideoCards = ({ info }) => {
  // console.log("my info = ", info);

  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;
  const { viewCount } = statistics;

  return (
    <div className="cursor-pointer w-full p-1 rounded-lg hover:shadow-xl transition-all duration-300 group">
      <div className="relative overflow-hidden rounded-xl">
        <img
          className="rounded-xl h-56 w-full object-cover transition-all duration-200 ease-out group-hover:scale-110 group-hover:rotate-2 group-hover:animate-fade-in group-hover:brightness-75 group-hover:-rotate-x-12 group-hover:rotate-y-12"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'perspective(1000px)'
          }}
          src={thumbnails.high.url}
          alt="vdoCard"
        />
        {/* Overlay for enhanced effect */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-xl"></div>
      </div>
      <div className="p-4 transition-all duration-300 group-hover:translate-y-1">
        <h3 className="text-black/80 text-base font-semibold line-clamp-2 mb-1 group-hover:text-black transition-colors duration-300">
          {title}
        </h3>
        <p className="text-black/90 text-sm group-hover:text-black/70 transition-colors duration-300">
          {channelTitle}
        </p>
        <p className="text-black/90 text-sm group-hover:text-black/70 transition-colors duration-300">
          {new Intl.NumberFormat("en-US", { notation: "compact" }).format(
            viewCount
          )}{" "}
          views
        </p>
      </div>
    </div>
  );
};

export default VideoCards;