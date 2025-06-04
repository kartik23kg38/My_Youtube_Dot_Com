import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomNames } from "../utils/helper";
import { makeRandomMessages } from "../utils/helper";
import { MessageCircle, Send, Users, Zap, Sparkles } from "lucide-react";

const LiveChat = () => {
  const dispatch = useDispatch();
  const [liveMsg, setLiveMsg] = useState("");
  const chatMessages = useSelector((state) => state.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
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
    <div className="h-[800px]  p-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl flex flex-col relative overflow-hidden">
      
      
      {/* Animated glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 right-0 w-20 h-20 bg-pink-500/10 rounded-full blur-xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Header with live indicator */}
      <div className="relative z-10 flex items-center justify-between mb-6 pb-4 border-b border-cyan-400/30">
        <div className="flex items-center space-x-3">
          <div className="relative p-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg backdrop-blur-sm border border-cyan-400/30">
            <MessageCircle className="text-cyan-400 w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-cyan-400 flex items-center space-x-2">
              <span>Live Chat</span>
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            </h2>
            <p className="text-xs text-gray-400">Real-time conversations</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-full border border-green-400/30">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            <Users className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-300 font-semibold">
              {chatMessages.length > 0 ? Math.min(chatMessages.length * 1, 2400) : 0}
            </span>
          </div>
        </div>
      </div>

      {/* Chat messages container */}
      <div className=" relative z-10 h-[500px] flex flex-col-reverse space-y-reverse space-y-3 overflow-y-auto overflow-x-hidden px-2 py-4 mb-6 custom-scrollbar">
        {chatMessages.map((message, idx) => {
          return (
            <div
              key={idx}
              className="break-words overflow-wrap-anywhere max-w-full transform transition-all duration-200 hover:translate-x-1 animate-slide-up"
            >
              <ChatMessage
                name={message.name || "Anonymous"}
                msg={message.msg || "No message provided"}
              />
            </div>
          );
        })}
      </div>

      {/* Input form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (liveMsg.trim()) {
            dispatch(
              addMessage({
                name: "You",
                msg: liveMsg,
              })
            );
            setLiveMsg("");
          }
        }}
        className="relative z-10 mt-auto space-y-4"
      >
        <div className="relative group ">
          <input
            onChange={(e) => setLiveMsg(e.target.value)}
            value={liveMsg}
            className="w-full p-4 bg-gradient-to-r from-slate-800/90 to-gray-800/90 backdrop-blur-sm border border-slate-600/50 focus:outline-none focus:border-cyan-400/70 focus:shadow-lg focus:shadow-cyan-400/20 rounded-xl text-gray-100 placeholder-gray-400 transition-all duration-300 pr-12"
            type="text"
            placeholder="Type your message..."
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Zap className="w-5 h-5 text-cyan-400/60 group-focus-within:text-cyan-400 group-focus-within:animate-pulse transition-all duration-300" />
          </div>
        </div>
        
        <button
          className="w-full text-gray-100 p-4 rounded-xl bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-400/25 font-semibold flex items-center justify-center space-x-2 relative overflow-hidden group border border-cyan-400/30"
          type="submit"
        >
          {/* Button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
          <span className="relative z-10">Send Message</span>
        </button>
      </form>

      {/* Custom styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-slide-up {
            animation: slide-up 0.4s ease-out forwards;
          }
          
          .animation-delay-1000 {
            animation-delay: 1s;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(34, 211, 238, 0.4) transparent;
          }
          
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, rgba(34, 211, 238, 0.4), rgba(168, 85, 247, 0.4));
            border-radius: 3px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, rgba(34, 211, 238, 0.6), rgba(168, 85, 247, 0.6));
          }
        `
      }} />
    </div>
  );
};

export default LiveChat;