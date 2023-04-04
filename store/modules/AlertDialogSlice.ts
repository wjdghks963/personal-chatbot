import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AlertState  {
    alertName:string;
    toggle : boolean;
    okFn:()=>void;
};

const initialState:AlertState = {
    alertName:"",
    toggle : false,
    okFn:()=>{}
};

const alertDialogSlice = createSlice({
    name: "alertDialogToggle",
    initialState,
    reducers: {
        setAlert: (state,action:PayloadAction<AlertState>) => {
            const { alertName, toggle, okFn } = action.payload;

            state.alertName = alertName;
            state.toggle = toggle
            state.okFn = okFn
        },
    },
});

export const { setAlert } = alertDialogSlice.actions;
export default alertDialogSlice.reducer;
