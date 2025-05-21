import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice"; // Assuming you have an action to add
import { generateRandomNames } from "../utils/helper"; // Importing the random name generator
import { makeRandomMessages } from "../utils/helper"; // Importing the random name generator

const LiveChat = () => {
  const dispatch = useDispatch();
  const chatMessages = useSelector((state) => state.chat.messages);
  useEffect(() => {
    const i = setInterval(() => {
      console.log("Fetching new messages...");

      dispatch(
        addMessage({
          name: generateRandomNames(), // Generate a random name
          msg: makeRandomMessages(60),
        })
      );
    }, 1000);

    return () => clearInterval(i); // Cleanup interval on unmount
  }, [dispatch]);
  

  return (
    <div className="h-auto p-4 bg-violet-400 rounded-lg">
      <h2 className="text-lg font-bold mb-4  border-b border-gray-400 ">
        Live Chats
      </h2>
      <div className="space-y-2 h-[500px] flex space-y-reverse overflow-y-auto overflow-x-auto p-4 bg-pink-300 rounded-lg flex-col-reverse">
        {chatMessages.map((message, idx) => {
          return (
            <div
              key={idx}
              className="break-words overflow-wrap-anywhere max-w-full"
            >
              <ChatMessage
                name={message.name || "Anonymous"}
                msg={message.msg || "No message provided"}
              />
            </div>
          );
        })}

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
