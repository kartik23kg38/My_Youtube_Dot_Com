import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  fetchReplies,
  likecomment,
  toggleShowReplies,
} from "../utils/commentSlice";
import { ThumbsUp, MessageCircle, Clock, User, ChevronDown, ChevronUp, Loader } from "lucide-react";

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
  const { id, name, text, replies, totalReplyCount, showReplies, publishedAt } = data;
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
    <div className="animate-slide-up">
      <div className={`flex items-start gap-3 p-4 my-3 bg-gradient-to-r ${isReply 
        ? 'from-slate-800/40 to-gray-800/40 ml-8' 
        : 'from-slate-800/60 to-gray-800/60'} 
        backdrop-blur-sm rounded-xl border ${isReply 
        ? 'border-slate-600/20' 
        : 'border-slate-600/30'} 
        hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-400/10 
        transition-all duration-300 group relative overflow-hidden`}>
        
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10 flex-shrink-0">
          <div className={`${isReply ? "w-8 h-8" : "w-11 h-11"} 
            bg-gradient-to-br from-cyan-500/80 to-purple-500/80 
            rounded-full p-0.5 shadow-lg`}>
            <img
              className={`${isReply ? "w-7 h-7" : "w-10 h-10"} 
                rounded-full object-cover bg-gray-700`}
              src={data.avatar || "data:image/jpeg;base64,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"}
              alt="user-profile"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className={`${isReply ? "w-7 h-7" : "w-11 h-11"} 
              rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 
              items-center justify-center text-white font-bold hidden`}>
              <User className={isReply ? "w-3 h-3" : "w-5 h-5"} />
            </div>
          </div>
        </div>
        
        <div className="flex-1 relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className={`${isReply ? "text-sm font-semibold" : "text-base font-bold"} 
              text-cyan-300`}>
              {name}
            </span>
            <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-slate-700/50 to-gray-700/50 
              rounded-full border border-slate-600/30">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-300 font-medium">
                {publishedAt ? formatTimestamp(publishedAt) : "Unknown time"}
              </span>
            </div>
          </div>
          <p className={`${isReply ? "text-sm" : "text-base"} 
            text-gray-200 leading-relaxed font-medium`}>
            {text}
          </p>
        </div>
      </div>
      
      <div className={`${isReply ? 'ml-11' : 'ml-3'} flex items-center gap-3 mb-4`}>
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
                {showReplies ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                <span>
                  {showReplies ? "Hide Replies" : `Show Replies (${totalReplyCount})`}
                </span>
              </>
            )}
          </button>
        )}
      </div>
      
      {showReplies && replies && replies.length > 0 && (
        <div className="ml-6 pl-4 border-l-2 border-gradient-to-b from-cyan-400/50 to-purple-400/50 relative">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/50 to-purple-400/50"></div>
          {replies.map((reply, index) => (
            <Comment key={reply.id || `reply-${id}-${index}`} data={reply} isReply={true} />
          ))}
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
    <div className="p-6 bg-gradient-to-br from-slate-900/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-slate-600/20 relative overflow-hidden">
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
              <p className="text-slate-400 text-lg font-medium">No comments yet</p>
              <p className="text-slate-500 text-sm">Be the first to share your thoughts!</p>
            </div>
          )
        )}
      </div>

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
        `
      }} />
    </div>
  );
};

export default CommentsContainer;