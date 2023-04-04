import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    toggle : false
};

const clearChatsSlice = createSlice({
    name: "clearChats",
    initialState,
    reducers: {
        setClearChatToggle: (state) => {
            state.toggle = !state.toggle
        },
    },
});

export const { setClearChatToggle } = clearChatsSlice.actions;
export default clearChatsSlice.reducer;
