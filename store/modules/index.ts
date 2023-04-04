import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import clearChatsReducer from './ClearChatsSlice';
import alertDialogReducer from "./AlertDialogSlice";
import {ReduxSliceState} from "../../type";




const reducer = (
    state: ReduxSliceState,
    action: AnyAction
): CombinedState<ReduxSliceState> => {
    if (action.type === HYDRATE) {
        return {
            ...state,
            ...action.payload,
        };
    }

    // slcie한 reducer 모듈을 결합한다.
    return combineReducers({
        clearChatsReducer,
        alertDialogReducer
    })(state, action);
};

export default reducer;
