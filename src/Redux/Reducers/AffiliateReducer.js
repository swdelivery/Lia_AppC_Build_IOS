import * as ActionType from "../Constants/ActionType";

let initialState = {
    listPartnerLevel:[]
};

const AffiliateReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionType.SAVE_LIST_PARTNER_LEVEL:
            return {
                ...state,
                listPartnerLevel: action?.payload
            }
        
        default:
            return state;
    }
};

export default AffiliateReducer;
