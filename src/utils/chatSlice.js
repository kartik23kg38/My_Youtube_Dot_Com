import { createSlice } from "@reduxjs/toolkit";
import { LIVE_CHAT_COUNT } from "./constants";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    // This array will store chat messages
    isLoading: false,
    // This boolean will indicate if chat is loading
    error: null,
    // This will store any error messages
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.splice(LIVE_CHAT_COUNT, 1); // Limit to the last 40 messages
      state.messages.unshift(action.payload);
      // This action adds a new message to the chat
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      // This action sets the loading state for the chat
    },
    setError: (state, action) => {
      state.error = action.payload;
      // This action sets an error message for the chat
    },
    clearChat: (state) => {
      state.messages = [];
      // This action clears all messages in the chat
    },
    removeMessage: (state, action) => {
      state.messages = state.messages.filter(
        (msg) => msg.id !== action.payload.id
        // This action removes a specific message from the chat
      );
    },
    updateMessage: (state, action) => {
      const index = state.messages.findIndex(
        (msg) => msg.id === action.payload.id
      );
      if (index !== -1) {
        state.messages[index] = {
          ...state.messages[index],
          ...action.payload.updatedData,
          // This action updates a specific message in the chat
        };
      }
    },
  },
});
export const {
  addMessage,
  setLoading,
  setError,
  clearChat,
  removeMessage,
  updateMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
