import { configureStore } from '@reduxjs/toolkit'
import appReducer from "./appSlice"
import videoReducer from "./videoSlice"
import cacheReducer from "./searchSlice"

const store = configureStore({
    reducer: {
        hamburger: appReducer,
        videosOfStore: videoReducer,
        cache: cacheReducer // state.cache will hold the cache data
    }, 
});
export default store;