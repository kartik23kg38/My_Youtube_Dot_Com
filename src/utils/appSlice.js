import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "hamburger",
    initialState: {
        isHamburgerOpen: true,
    },
    reducers: {
        toggleHamburger: (state) => {
            state.isHamburgerOpen = !state.isHamburgerOpen;
        },
        closeHamburger: (state) => {
            state.isHamburgerOpen = false;
        }
    }
});

export const {toggleHamburger, closeHamburger} = appSlice.actions
export default appSlice.reducer
