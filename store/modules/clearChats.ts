import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    toggle : false
};

const clearChatsSlice = createSlice({
    name: "clearChats",
    initialState,
    reducers: {
        setToggle: (state) => {
            state.toggle = !state.toggle
        },
    },
});

export const { setToggle } = clearChatsSlice.actions;
export default clearChatsSlice.reducer;