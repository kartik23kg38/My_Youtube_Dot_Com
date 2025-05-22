import React from "react";

const ChatMessage = ({ name, msg }) => {
  return (
    <>
      {/* user chat with image and message */}
      <div className="flex items-start space-x-2 rounded-lg">
        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0 px-2 bg-purple-400 p-2 rounded-lg shadow-md">
          <div className="text-gray-800 text-sm font-semibold">{name}</div>
          <div className="text-gray-700 text-sm break-words overflow-wrap-anywhere">
            {msg}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
