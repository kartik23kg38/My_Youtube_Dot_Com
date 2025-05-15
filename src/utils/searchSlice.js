import { createSlice } from "@reduxjs/toolkit";

const cacheSlice = createSlice({
    name: "cache",
    initialState: {
        data: {}, 
        // This object will store cached queries
        // Structure: { "indian food": ["suggest1", "suggest2"] }
    },
    reducers: {
        // This action saves the result to cache
        cacheResults: (state, actions) => {
            const {query, suggestions} = actions.payload;
            state.data[query] = suggestions;
        }
    }
})

export const { cacheResults } = cacheSlice.actions;
export default cacheSlice.reducer;
