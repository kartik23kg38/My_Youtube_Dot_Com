import React from "react";
import ChatMessage from "./ChatMessage";

const LiveChat = () => {
  return (
    <div className="h-auto p-4 bg-gray-200 rounded-lg">
      <h2 className="text-lg font-bold mb-4  border-b border-gray-400 ">
        Live Chats
      </h2>
      <div className="space-y-2 h-[500px] overflow-y-auto p-4 bg-gray-300 rounded-lg">
        <ChatMessage
          name="Kartik"
          msg="Reaisfy this requirement. Hello Sir, I wanna study maths..."
        /><ChatMessage
          name="Kartik"
          msg=" Sir, I wanna study maths..."
        /><ChatMessage
          name="Kartik"
          msg="R satisfy this requirement. Hello Sir, I wanna study maths..."
        /><ChatMessage
          name="Kartik"
          msg="React comptiple elements and effectively return them as a single fragment entity to satisfy this requirement. Hello Sir, I wanna study maths..."
        /><ChatMessage
          name="Kartik"
          msg="React compongments allow you to group multiple elements and effectively return them as a single fragment entity to satisfy this requirement. Hello Sir, I wanna study maths..."
        /><ChatMessage
          name="Kartik"
          msg="R satisfy this requirement. Hello Sir, I wanna study maths..."
        /><ChatMessage
          name="Kartik"
          msg="Rea a single fragment entity to satisfy this requirement. Hello Sir, I wanna study maths..."
        />
        {/* Simulate more messages here */}
      </div>
      {/* Fixed input at the bottom */}
      <div className="pt-4">
        <input
          className="w-full p-2 border border-gray-400 focus:outline-none focus:border-gray-600 rounded-lg"
          type="text"
          placeholder="Type your message..."
        />
        <button className="mt-2 w-full text-white p-2 rounded-lg bg-gradient-to-r from-violet-900 via-indigo-600 to-blue-500 hover:opacity-90 transition duration-200">
          Send
        </button>
      </div>
    </div>
  );
};

export default LiveChat;
