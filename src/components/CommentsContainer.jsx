import React from "react";

const Comment = ({ data, isReply = false }) => {
  const { name, text, replies } = data;

  return (
    <>
      <div className="flex items-start gap-2 p-2  border-l border-b my-2 bg-gray-400 rounded-bl-md rounded-r-2xl border-gray-500">
        <div
          className={`${
            isReply ? "bg-gray-200" : "bg-amber-300"
          } p-1 rounded-full`}
        >
          <img
            className={`${
              isReply ? "w-6 h-6" : "w-10 h-10"
            } rounded-full border-red-600 border-2`}
            src="https://yt3.ggpht.com/ukiLOR2xcRjb4vEfv_DvcTU-5WgGyhwL3w1jQxvTBVdMbBlrtDopxKwg8Scs66C8nFgXu-cl=s88-c-k-c0x00ffffff-no-rj"
            alt="user-profile"
          />
        </div>
        <div className=" flex flex-col">
          <div className=" flex items-center gap-2">
            <span className={`${isReply ? "font-semibold text-md" : "font-bold"} text-base`}>{name}</span>
            <span className={`${isReply ? "text-xs font-normal" : "text-sm font-medium"} pl-2 pr-4 bg-gray-500 rounded-e-2xl`}>1 day ago</span>
          </div>
          <p className={`${isReply ? "text-xs" : "text-base"} text-gray-700 -mt-1 font-semibold`}>{text}</p>
        </div>
      </div>
      
      {/* Recursive replies */}
      {replies && replies.length > 0 && (
        <div className="ml-6 pl-4 border-l-2 border-gray-300">
          {replies.map((reply, index) => (
            <Comment key={index} data={reply} isReply={true} />
          ))}
        </div>
      )}
    </>
  );
};

const CommentsContainer = ({ comments = [] }) => {
  return (
    <div className="font-bold m-2 py-2 text-xl">
      {/* {commentsData[0]} */}
      {comments.map((comment, index) => (
        <Comment key={index} data={comment} />
      ))}
    </div>
  );
};

export default CommentsContainer;
