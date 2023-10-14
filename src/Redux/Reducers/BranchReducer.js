import * as ActionType from "../Constants/ActionType";

let initialState = {
    listBranch: []

};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionType.SET_LIST_BRANCH:
            return {
              ...state,
              listBranch: action.payload
            }
      
        default:
            return state;
    }
};

export default reducer;
