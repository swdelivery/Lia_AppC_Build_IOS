import * as ActionType from "../Constants/ActionType";

let initialState = {
    assetGroup: [],
    asset : []
};

const OrtherReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionType.SET_ASSET_GROUP:
            return {
                ...state,
                assetGroup: action.payload
            }

        case ActionType.SET_ASSET:
            return {
                ...state,
                asset: action.payload
            }
        
        default:
            return state;
    }
};

export default OrtherReducer;