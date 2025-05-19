import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  fetchReplies,
  likecomment,
  toggleShowReplies,
} from "../utils/commentSlice";

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
  const { id, name, text, replies, showReplies, publishedAt } = data;
  const totalReplyCount = replies ? replies.length : 0;
  const repliesLoading = useSelector(
    (store) => store.comments.repliesLoading[id]
  );

  const handleShowReplies = () => {
    if (!showReplies && replies.length === 0) {
      dispatch(fetchReplies(id)); // Fetch replies if not already fetched
    } else {
      dispatch(toggleShowReplies(id)); // Toggle visibility
    }
  };

  return (
    <>
      <div className="flex items-start gap-2 p-2 border-l border-b my-2 bg-gray-400 rounded-bl-md rounded-r-2xl border-gray-500">
        <div
          className={`${
            isReply ? "bg-gray-200" : "bg-amber-300"
          } p-1 rounded-full`}
        >
          <img
            className={`${
              isReply ? "w-6 h-6" : "w-10 h-10"
            } rounded-full border-red-600 border-2`}
            src={data.avatar || "https://via.placeholder.com/40"}
            alt="user-profile"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span
              className={`${
                isReply ? "font-semibold text-md" : "font-bold"
              } text-base`}
            >
              {name}
            </span>
            <span
              className={`${
                isReply ? "text-xs font-normal" : "text-sm font-medium"
              } pl-2 pr-4 bg-gray-500 rounded-e-2xl`}
            >
              {publishedAt ? formatTimestamp(publishedAt) : "1 day ago"}
            </span>
          </div>
          <p
            className={`${
              isReply ? "text-xs" : "text-base"
            } text-gray-700 -mt-1 font-semibold`}
          >
            {text}
          </p>
        </div>
      </div>
      <div className="ml-6">
        <button
          onClick={() => dispatch(likecomment(id))}
          className="text-sm text-blue-600 mr-4"
        >
          👍 Like ({data.likes || 0})
        </button>
        <button
          onClick={handleShowReplies}
          className="text-sm text-blue-600"
          disabled={repliesLoading}
        >
          {repliesLoading
            ? "Loading Replies..."
            : showReplies
            ? "Hide Replies"
            : `Show Replies (${totalReplyCount})`}
        </button>
      </div>
      {showReplies && replies && replies.length > 0 && (
        <div className="ml-6 pl-4 border-l-2 border-gray-300">
          {replies.map((reply, index) => (
            <Comment key={index} data={reply} isReply={true} />
          ))}
        </div>
      )}
    </>
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

  // console.log("CommentsContainer State:", { videoId, comments, status, error });

  // if (status) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      {status && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {comments && comments.length > 0
        ? comments.map((comment) => <Comment key={comment.id} data={comment} />)
        : !status && (
            <p className="text-gray-600 text-sm">No comments available.</p>
          )}
    </div>
  );
};

export default CommentsContainer;
