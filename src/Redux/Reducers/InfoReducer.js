import * as ActionType from "../Constants/ActionType";

let initialState = {
    treatmentDetail: [],
    order: [],
    orderService: [],
    payment: [],
    deposit: [],
    medicalPrescription:[],
    collabStatistic: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionType.SET_INFO_TREATMENT:
            return {
              ...state,
              treatmentDetail: action.payload
            }
        
        case ActionType.SET_INFO_ORDER:
            return {
                ...state,
                order: action.payload
            }
        
        case ActionType.SET_INFO_ORDER_SERVICE:
            return {
                ...state,
                orderService: action.payload
            }
        
        case ActionType.SET_INFO_PAYMENT:
            return {
                ...state,
                payment: action.payload
            }

        case ActionType.SET_INFO_DEPOSIT:
            return {
                ...state,
                deposit: action.payload
            }

        case ActionType.SET_INFO_MEDICAL_PRESCRIPTION:
            return {
                ...state,
                medicalPrescription: action.payload
            }

        case ActionType.SET_INFO_COLLAB_STATISTIC:
            return {
                ...state,
                collabStatistic: action.payload
            }
            

        default:
            return state;
    }
};

export default reducer;
