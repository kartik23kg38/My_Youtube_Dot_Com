import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  fetchReplies,
  likecomment,
  toggleShowReplies,
} from "../utils/commentSlice";
import {
  ThumbsUp,
  MessageCircle,
  Clock,
  User,
  ChevronDown,
  ChevronUp,
  Loader,
} from "lucide-react";

const formatTimestamp = (publishedAt) => {
  const now = new Date();
  const posted = new Date(publishedAt);
  const diffMs = now - posted;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "Just now";
  if (diffHours < 24)
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
};

const Comment = ({ data, isReply = false }) => {
  const dispatch = useDispatch();
  const { id, name, text, replies, totalReplyCount, showReplies, publishedAt } =
    data;
  const repliesLoading = useSelector(
    (store) => store.comments.repliesLoading[id]
  );

  const handleShowReplies = () => {
    if (!showReplies && replies.length === 0) {
      dispatch(fetchReplies(id));
    } else {
      dispatch(toggleShowReplies(id));
    }
  };

  return (
    <div className="animate-slide-up h-auto  px-4 py-2 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col relative overflow-hidden">
      <div
        className={`flex items-start gap-3 p-4 my-3 border transition-all duration-100 group relative overflow-hidden
    backdrop-blur-sm bg-gradient-to-r ${
      isReply
        ? "from-slate-800/40 to-gray-800/40 ml-8"
        : "from-slate-800/60 to-gray-800/60"
    } 
    rounded-xl ${
      isReply ? "border-l-3 border-cyan-400" : "border-slate-600/30"
    }
    ${!isReply ? "border-l-4 border-violet-400 hover:shadow-violet-400/20" : "hover:shadow-cyan-400/20"}
    hover:shadow-2xl  
    transition-all duration-100 group relative overflow-hidden`}
      >
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-100"></div>

        <div className="relative z-10 flex-shrink-0">
          <div
            className={`${isReply ? "w-8 h-8" : "w-11 h-11"} 
            bg-gradient-to-br from-cyan-500/80 to-purple-500/80 
            rounded-full p-0.5 shadow-lg`}
          >
            <img
              className={`${isReply ? "w-7 h-7" : "w-10 h-10"} 
                rounded-full  object-cover`}
              src={
                data.avatar ||
                "https://via.placeholder.com/150/0000FF/FFFFFF?text=Avatar"
              }
              alt="user-profile"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div
              className={`${isReply ? "w-7 h-7" : "w-11 h-11"} 
              rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 
              items-center justify-center text-white font-bold hidden`}
            >
              <User className={isReply ? "w-3 h-3" : "w-5 h-5"} />
            </div>
          </div>
        </div>

        <div className="flex-1 relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`${
                isReply ? "text-sm font-semibold" : "text-base font-bold"
              } 
              text-cyan-300`}
            >
              {name}
            </span>
            <div
              className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-slate-700/50 to-gray-700/50 
              rounded-full border border-slate-600/30"
            >
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-300 font-medium">
                {publishedAt ? formatTimestamp(publishedAt) : "Unknown time"}
              </span>
            </div>
          </div>
          <p
            className={`${isReply ? "text-sm" : "text-base"} 
            text-gray-200 leading-relaxed font-medium`}
          >
            {text}
          </p>
        </div>
      </div>

      <div
        className={`${isReply ? "ml-11" : "ml-3"} flex items-center gap-3 mb-2`}
      >
        <button
          onClick={() => dispatch(likecomment(id))}
          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600/80 to-pink-600/80 
            hover:from-purple-500/90 hover:to-pink-500/90 text-white rounded-full 
            transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-400/25 
            border border-purple-400/30 text-sm font-medium"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>Like ({data.likes || 0})</span>
        </button>

        {!isReply && totalReplyCount > 0 && (
          <button
            onClick={handleShowReplies}
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-600/80 to-blue-600/80 
              hover:from-cyan-500/90 hover:to-blue-500/90 text-white rounded-full 
              transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25 
              border border-cyan-400/30 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={repliesLoading}
          >
            {repliesLoading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                {showReplies ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                <span>
                  {showReplies
                    ? "Hide Replies"
                    : `Show Replies (${totalReplyCount})`}
                </span>
              </>
            )}
          </button>
        )}
      </div>

      {showReplies && replies && replies.length > 0 && (
        <div className="ml-6 pl-4 relative">
          {/* Gradient border split into top and bottom halves */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 flex flex-col">
            <div className="flex-1 bg-gradient-to-b from-cyan-400/50 to-purple-400/50" />
            <div className="h-1  rounded-bl-full bg-gradient-to-b from-cyan-400/50 to-purple-400/50" />
          </div>

          <div className="space-y-1">
            {replies.map((reply, index) => (
              <Comment
                key={reply.id || `reply-${id}-${index}`}
                data={reply}
                isReply={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CommentsContainer = ({ videoId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((store) => store.comments.exampleComments);
  const status = useSelector((store) => store.comments.isLoading);
  const error = useSelector((store) => store.comments.error);

  useEffect(() => {
    if (videoId) {
      dispatch(fetchComments(videoId));
    }
  }, [videoId, dispatch]);

  if (status) {
    return (
      <div className="p-6 bg-gradient-to-br from-slate-900/60 to-gray-900/60 backdrop-blur-sm rounded-2xl border border-slate-600/30">
        <div className="flex items-center justify-center space-x-3 py-8">
          <Loader className="w-6 h-6 text-cyan-400 animate-spin" />
          <p className="text-cyan-300 font-medium">Loading comments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gradient-to-br from-red-900/20 to-gray-900/60 backdrop-blur-sm rounded-2xl border border-red-500/30">
        <div className="flex items-center justify-center space-x-3 py-8">
          <MessageCircle className="w-6 h-6 text-red-400" />
          <p className="text-red-300 font-medium">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-bl from-violet-600 to-blue-400 backdrop-blur-xl rounded-2xl border border-slate-600/20 relative overflow-hidden">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/3 w-20 h-20 bg-purple-500/5 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
      </div>

      <div className="relative z-10">
        {status && (
          <div className="flex items-center justify-center space-x-3 py-8">
            <Loader className="w-6 h-6 text-cyan-400 animate-spin" />
            <p className="text-cyan-300 font-medium">Loading comments...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center space-x-3 py-8">
            <MessageCircle className="w-6 h-6 text-red-400" />
            <p className="text-red-300 font-medium">Error: {error}</p>
          </div>
        )}

        {comments && comments.length > 0 ? (
          <div className="space-y-2">
            {comments.map((comment) => (
              <Comment key={comment.id} data={comment} />
            ))}
          </div>
        ) : (
          !status && (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <MessageCircle className="w-12 h-12 text-slate-500" />
              <p className="text-slate-400 text-lg font-medium">
                No comments yet
              </p>
              <p className="text-slate-500 text-sm">
                Be the first to share your thoughts!
              </p>
            </div>
          )
        )}
      </div>

      {/* Custom styles */}
      <style
        dangerouslySetInnerHTML={{
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
        `,
        }}
      />
    </div>
  );
};

export default CommentsContainer;
