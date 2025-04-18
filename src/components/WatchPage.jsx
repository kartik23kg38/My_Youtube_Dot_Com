import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeHamburger } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  // console.log(searchParams.get("v"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeHamburger());
  }, []);

  return (
    <div className="py-3 px-20">
      <iframe
        width="780"
        height="400"
        src={"https://www.youtube.com/embed/" + searchParams.get("v")}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <div className="mt-2 p-3 h-24 border bg-gray-500 rounded-lg">
        
      </div>
    </div>
  );
};

export default WatchPage;
