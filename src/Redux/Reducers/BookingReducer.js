import * as ActionType from "../Constants/ActionType";

let initialState = {
    listBranch : [],
    listDoctor : []
};

const BookingReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionType.SAVE_LIST_BRANCH:
            return {
                ...state,
                listBranch: action.payload.data
            }
        case ActionType.SAVE_LIST_DOCTOR:
            return {
                ...state,
                listDoctor: action.payload.data
            }
        
        default:
            return state;
    }
};

export default BookingReducer;
