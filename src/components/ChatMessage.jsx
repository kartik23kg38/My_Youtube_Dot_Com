import React from "react";

const ChatMessage = ({ name, msg }) => {
  return (
    <>
      {/* user chat with image and message */}
        <div className="flex items-start space-x-2">
            <img
            src="https://cdn-icons-png.flaticon.com/128/17446/17446833.png"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
            />
            <div className="flex px-2 bg-purple-400 p-2 rounded-lg shadow-md">
            <p className="pr-4 text-sm font-semibold">{name}</p>
            <p className="text-gray-700 text-sm">{msg}</p>
            </div>
            </div>
    </>
  );
};

export default ChatMessage;
