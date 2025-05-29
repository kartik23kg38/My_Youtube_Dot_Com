import React from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const isHamburgerOpen = useSelector(
    (state) => state.hamburger.isHamburgerOpen
  );

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isHamburgerOpen
          ? "ml-60 w-[calc(100%-15rem)]"  // Updated to match sidebar width (w-56 = 224px + padding)
          : "ml-4 w-[calc(100%-1rem)]"
      }`}
    >
      <div 
        className={`fixed top-16 z-40 bg-white py-2 transition-all duration-300 ease-in-out ${
          isHamburgerOpen
            ? "left-60 right-4"  // Updated to match sidebar width
            : "left-4 right-4"
        }`}
      >
        <ButtonList />
      </div>
             
      {/* Add proper spacing to ensure VideoContainer starts below ButtonList */}
      <div className="mt-32 overflow-x-hidden">
        <VideoContainer />
      </div>
    </div>
  );
};

export default MainContainer;