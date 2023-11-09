import * as ActionType from "../Constants/ActionType";

let initialState = {
    listService: [],
    listServiceHome: []

};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionType.SET_SERVICE:
            return {
              ...state,
              listService: action.payload
            }
            
        case ActionType.SET_SERVICE_HOME:
            return {
                ...state,
                listServiceHome: action.payload
            }
        default:
            return state;
    }
};

export default reducer;
