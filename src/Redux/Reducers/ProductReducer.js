import * as ActionType from "../Constants/ActionType";

let initialState = {
    listProduct: [],
    listProductHome: []

};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionType.SET_PRODUCT:
            return {
              ...state,
              listProduct: action.payload
            }
            
        case ActionType.SET_PRODUCT_HOME:
            return {
                ...state,
                listProductHome: action.payload
            }
        default:
            return state;
    }
};

export default reducer;
