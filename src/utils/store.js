import { configureStore } from '@reduxjs/toolkit'
import appReducer from "./appSlice"
import videoReducer from "./videoSlice"

const store = configureStore({
    reducer: {
        hamburger: appReducer,
        videosOfStore: videoReducer,
    }, 
});
export default store;