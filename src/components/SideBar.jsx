import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideBar = () => {
  const isHamburgerOpen = useSelector(
    (state) => state.hamburger.isHamburgerOpen
  );

  return (
    <div
      className={`fixed top-20 left-0 w-44 h-[calc(100%-4rem)] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isHamburgerOpen ? "translate-x-0" : "-translate-x-full "
      }`}
    >
      <ul className="m-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>Shorts</li>
        <li>Subscriptions</li>
      </ul>
      <div>
        <h1 className="font-bold text-md ml-3">You</h1>
        <ul className="ml-4 mt-2">
          <li>History</li>
          <li>Playlists</li>
          <li>Your videos</li>
          <li>Your courses</li>
          <li>Watch Later</li>
          <li>Liked videos</li>
        </ul>
      </div>
      <div>
        <h1 className="font-bold text-md ml-3 mt-3">Subscriptions</h1>
        <ul className="ml-4 mt-2">
          <li>History</li>
          <li>Playlists</li>
          <li>Your videos</li>
          <li>Your courses</li>
          <li>Watch Later</li>
          <li>Liked videos</li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
