import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
// This file defines a Redux slice for managing YouTube video comments.

// export const fetchComments = createAsyncThunk(
//   "comments/fetchComments",
//   async (videoId) => {
//     const response = await fetch(
//       `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=25&textFormat=plainText&key=${
//         import.meta.env.VITE_GOOGLE_API
//       }`
//     );
//     const data = await response.json();
//     console.log("Fetched comments:", data);

//     // ✅ Fix: Declare snippet INSIDE map function block
//     const comments =
//       data.items?.map((item) => {
//         const snippet = item.snippet.topLevelComment.snippet;
//         return {
//           id: item.id,
//           name: snippet.authorDisplayName,
//           text: snippet.textDisplay,
//           avatar: snippet.authorProfileImageUrl,
//           likes: snippet.likeCount,
//           replies: [],
//           showReplies: false, // Add flag to toggle replies visibility
//         };
//       }) || [];

//     return comments;
//   }
// );

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=25&textFormat=plainText&key=${
          import.meta.env.VITE_GOOGLE_API
        }`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // console.log("Fetch Comments Response:", data);
      const comments =
        data.items?.map((item) => ({
          id: item.id,
          name: item.snippet.topLevelComment.snippet.authorDisplayName,
          text: item.snippet.topLevelComment.snippet.textDisplay,
          avatar: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
          likes: item.snippet.topLevelComment.snippet.likeCount,
          replies: [], // Initialize empty replies array
          showReplies: false, // Add flag to toggle replies visibility
        })) || [];
      return comments;
    } catch (error) {
      console.error("Fetch Comments Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchReplies = createAsyncThunk(
  "comments/fetchReplies",
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/comments?part=snippet&parentId=${commentId}&maxResults=25&textFormat=plainText&key=${
          import.meta.env.VITE_GOOGLE_API
        }`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // console.log("Fetch Replies Response:", data);
      const replies =
        data.items?.map((item) => ({
          id: item.id,
          name: item.snippet.authorDisplayName,
          text: item.snippet.textDisplay,
          avatar: item.snippet.authorProfileImageUrl,
          likes: item.snippet.likeCount,
          replies: [], // Support n-level nesting
          showReplies: false, // Add flag for nested replies
        })) || [];
      return { commentId, replies };
    } catch (error) {
      console.error("Fetch Replies Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    exampleComments: [],
    isLoading: false,
    error: null,
    repliesLoading: {},
  },
  reducers: {
    clearComments: (state) => {
      state.exampleComments = [];
    },
    addComment: (state, action) => {
      state.exampleComments.push(action.payload);
    },
    removeComment: (state, action) => {
      state.exampleComments = state.exampleComments.filter(
        (comment) => comment.id !== action.payload
      );
    },
    updateComment: (state, action) => {
      const index = state.exampleComments.findIndex(
        (comment) => comment.id === action.payload.id
      );
      if (index !== -1) {
        state.exampleComments[index] = action.payload;
      }
    },
    likecomment: (state, action) => {
      const findComment = (comments, id) => {
        for (let comment of comments) {
          if (comment.id === id) return comment;
          if (comment.replies) {
            const found = findComment(comment.replies, id);
            if (found) return found;
          }
        }
        return null;
      };
      const comment = findComment(state.exampleComments, action.payload);
      if (comment) {
        comment.likes = (comment.likes || 0) + 1;
      }
    },
    toggleShowReplies: (state, action) => {
      const comment = state.exampleComments.find(
        (comment) => comment.id === action.payload
      );
      if (comment) {
        comment.showReplies = !comment.showReplies;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exampleComments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    // .addCase(fetchReplies.pending, (state, action) => {
    //   const commentId = action.meta.arg;
    //   state.repliesLoading[commentId] = true;
    // })
    // .addCase(fetchReplies.fulfilled, (state, action) => {
    //   const { commentId, replies } = action.payload;
    //   const comment = state.exampleComments.find((c) => c.id === commentId);
    //   if (comment) {
    //     comment.replies = replies;
    //   }
    //   state.repliesLoading[commentId] = false;
    // })
    // .addCase(fetchReplies.rejected, (state, action) => {
    //   const commentId = action.meta.arg;
    //   state.repliesLoading[commentId] = false;
    // });
  },
});
export const {
  clearComments,
  addComment,
  removeComment,
  updateComment,
  likecomment,
  toggleShowReplies,
} = commentSlice.actions;
export default commentSlice.reducer;
