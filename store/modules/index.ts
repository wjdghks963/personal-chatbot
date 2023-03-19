import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import clearChatsReducer from './clearChats';


interface ReduxSliceState {
    clearChatsReducer:{toggle:boolean}
}

const reducer = (
    state: any,
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
        clearChatsReducer
    })(state, action);
};

export default reducer;