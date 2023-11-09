import * as ActionType from "../Constants/ActionType";

let initialState = {
    partnerTrackingWeight: {},
    dateFilterTrackingWeight: new Date(),
    foodPartnerMenu: [],
    activityPartnerMenu: [],
    partnerWeightGoal: {}
};

const LoseWeightReducer = (state = initialState, action) => {
    switch (action.type) {


        case ActionType.REMOVE_DATA_MENU_ACTIVITY:
            return {
                ...state,
                activityPartnerMenu: [...state?.activityPartnerMenu]?.filter(item => item?._id !== action?.payload?.data[0])
            }

        case ActionType.ADD_MORE_DATA_MENU_ACTIVITY:
            return {
                ...state,
                activityPartnerMenu: [action.payload.data, ...state?.activityPartnerMenu]
            }
        case ActionType.SET_DATA_MENU_ACTIVITY:
            return {
                ...state,
                activityPartnerMenu: action.payload.data
            }

        case ActionType.SAVE_DATA_TRACKING_WEIGHT_GOAL:
            return {
                ...state,
                partnerWeightGoal: action?.payload?.data
            }

        case ActionType.UPDATE_DATA_TRACKING_WATER_GOAL:
            return {
                ...state,
                partnerTrackingWeight: {
                    ...state?.partnerTrackingWeight, 
                    waterGoal: action?.payload?.data,
                    water: 0
                }
            }

        case ActionType.UPDATE_DATA_TRACKING_WEIGHT_GOAL:
            return {
                ...state,
                partnerTrackingWeight: {
                    ...state?.partnerTrackingWeight,
                    weightGoal: action?.payload?.data
                }
            }

        case ActionType.UPDATE_DATA_TRACKING_WEIGHT:
            return {
                ...state,
                partnerTrackingWeight: {
                    ...state?.partnerTrackingWeight,
                    ...action?.payload?.data
                }
            }

        case ActionType.REMOVE_DATA_MENU_FOOD:

            return {
                ...state,
                foodPartnerMenu: [...state?.foodPartnerMenu]?.filter(item => item?._id !== action?.payload?.data[0])
            }

        case ActionType.ADD_MORE_DATA_MENU_FOOD:
            return {
                ...state,
                foodPartnerMenu: [action.payload.data, ...state?.foodPartnerMenu]
            }

        case ActionType.SET_DATA_MENU_FOOD:
            return {
                ...state,
                foodPartnerMenu: action.payload.data
            }

        case ActionType.SET_DATA_TRACKING_WEIGHT:
            return {
                ...state,
                partnerTrackingWeight: action.payload.data
            }
        case ActionType.SET_DATE_FILTER_TRACKING_WEIGHT:
            return {
                ...state,
                dateFilterTrackingWeight: action.payload.data
            }

        default:
            return state;
    }
};

export default LoseWeightReducer;
