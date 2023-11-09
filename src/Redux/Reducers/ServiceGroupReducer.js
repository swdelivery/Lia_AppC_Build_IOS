import * as ActionType from "../Constants/ActionType";

let initialState = {
    listServiceGroup: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionType.SET_SERVICE_GROUP:
            return {
              ...state,
              listServiceGroup: action.payload
            }
        default:
            return state;
    }
};

export default reducer;
