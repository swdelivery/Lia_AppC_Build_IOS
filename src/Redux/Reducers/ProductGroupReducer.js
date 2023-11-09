import * as ActionType from "../Constants/ActionType";

let initialState = {
    listProductGroup: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionType.SET_PRODUCT_GROUP:
            return {
              ...state,
              listProductGroup: action.payload
            }
        default:
            return state;
    }
};

export default reducer;
