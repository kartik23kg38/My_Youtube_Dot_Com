import { configureStore } from '@reduxjs/toolkit'
import appReducer from "./appSlice"

const store = configureStore({
    reducer: {
        hamburger: appReducer,
    },
});
export default store;