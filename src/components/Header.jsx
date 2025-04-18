import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleHamburger } from "../utils/appSlice";
import SideBar from "./SideBar";

const Header = () => {
  const dispatch = useDispatch();
  const isHamburgerOpen = useSelector((state) => state.hamburger.isHamburgerOpen);

  const toggleHamburgerHandler = () => {
    dispatch(toggleHamburger());
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white grid grid-flow-col items-center gap-4 p-2 shadow-lg">
      <div className="flex items-center gap-4 col-span-1">
        <div
          onClick={() => toggleHamburgerHandler()}
          className="w-10 h-10 rounded-full hover:bg-gray-300 cursor-pointer ml-3 flex items-center justify-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/6015/6015685.png"
            alt="hamburger-sign"
            className="h-5"
          />
        </div>
        <img
          className="h-6"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
          alt="YouTube_Logo"
        />
      </div>
      <div className="col-span-10 px-30">
        <input
          className="border border-gray-400 w-1/2 rounded-l-full my-2 py-2 px-4 focus:outline-none focus:border-blue-500"
          type="text"
        />
        <button className="border border-gray-400 rounded-r-full px-2 py-2 ">
          Search
        </button>
      </div>
      <div className="h-10 w-10 col-span-1">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/007/407/996/small/user-icon-person-icon-client-symbol-login-head-sign-icon-design-vector.jpg"
          alt="signin-user-logo"
        />
      </div>
      {/* <div>{isHamburgerOpen ? "Menu Open" : "Menu Closed"}</div> */}
    </div>
  );
};

export default Header;
