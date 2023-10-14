import * as ActionType from "../Constants/ActionType";

let initialState = {
    listNews: [],
    listNewsHome: []

};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionType.SET_LIST_NEWS:
            return {
              ...state,
              listNews: action.payload
            }
            
        case ActionType.SET_NEWS_HOME:
            return {
                ...state,
                listNewsHome: action.payload
            }
        default:
            return state;
    }
};

export default reducer;
