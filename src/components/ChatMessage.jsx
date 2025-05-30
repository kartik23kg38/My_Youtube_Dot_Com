import React from "react";

const ChatMessage = ({ name, msg }) => {
  return (
    <>
      {/* user chat with image and message */}
      <div className="flex items-start space-x-3 rounded-lg">
        {/* Initial circle */}
        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
          {name.charAt(0).toUpperCase()}
        </div>

        {/* Message box with glassy bluish cloudy effect */}
        <div className=" flex-1 min-w-0 px-3 py-2 rounded-xl bg-gradient-to-br from-indigo-300/30 via-blue-400/20 to-purple-400/30 backdrop-blur-md shadow-xl border border-white/10">
          <div className="text-white font-semibold text-sm tracking-wide">
            {name}
          </div>
          <div className="text-white/90 text-sm break-words">{msg}</div>
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
