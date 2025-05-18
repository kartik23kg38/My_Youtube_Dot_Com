import { configureStore } from '@reduxjs/toolkit'
import appReducer from "./appSlice"
import videoReducer from "./videoSlice"
import cacheReducer from "./searchSlice"
import commentsReducer from "./commentSlice"

const store = configureStore({
    reducer: {
        hamburger: appReducer,
        videosOfStore: videoReducer,
        cache: cacheReducer, // state.cache will hold the cache data
        comments: commentsReducer, // state.comments will hold the comments data
    }, 
});
export default store;