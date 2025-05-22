import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomNames } from "../utils/helper";
import { makeRandomMessages } from "../utils/helper";

const LiveChat = () => {
  const dispatch = useDispatch();
  const [liveMsg, setLiveMsg] = useState("");
  const chatMessages = useSelector((state) => state.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      // console.log("Fetching new messages...");

      dispatch(
        addMessage({
          name: generateRandomNames(),
          msg: makeRandomMessages(60),
        })
      );
    }, 1000);

    return () => clearInterval(i);
  }, [dispatch]);

  return (
    <div className="h-auto p-4 bg-violet-400 rounded-lg flex flex-col">
      <h2 className="text-lg font-bold mb-4 border-b border-gray-400">
        Live Chats
      </h2>

      {/* Chat messages container - with flex-col-reverse for newest at top */}
      <div className="h-[500px] flex flex-col-reverse space-y-reverse space-y-2 overflow-y-auto overflow-x-hidden p-4 bg-pink-300 rounded-lg mb-4">
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
      </div>

      {/* Fixed input at the bottom - always visible */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (liveMsg.trim()) {
            // Only submit if there's actual content
            dispatch(
              addMessage({
                name: "You",
                msg: liveMsg,
              })
            );
            setLiveMsg(""); // Clear the input after sending
          }
        }}
        className="mt-auto"
      >
        <input
          onChange={(e) => setLiveMsg(e.target.value)}
          value={liveMsg}
          className="w-full p-2 border border-gray-400 focus:outline-none focus:border-gray-600 rounded-lg "
          type="text"
          placeholder="Type your message..."
        />
        <button
          className="mt-2 w-full text-white p-2 rounded-lg bg-gradient-to-r from-violet-900 via-indigo-600 to-blue-500 hover:opacity-90 transition duration-200"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default LiveChat;
