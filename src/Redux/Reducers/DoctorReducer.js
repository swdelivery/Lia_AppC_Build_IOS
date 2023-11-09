import * as ActionType from "../Constants/ActionType";

let initialState = {
    listDoctor: []

};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionType.SET_LIST_DOCTOR:
            return {
              ...state,
              listDoctor: action.payload
            }
      
        default:
            return state;
    }
};

export default reducer;
