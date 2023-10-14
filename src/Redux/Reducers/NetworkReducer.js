import * as ActionType from "../Constants/ActionType";

let initialState = {
    networkInfo: true
};

const NetworkReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.SET_NETWORK_INFO:
            return {
                ...state,
                networkInfo: action.payload.flag
            }
        default:
            return state; 
    }
};

export default NetworkReducer;
