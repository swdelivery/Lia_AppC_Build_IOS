import * as ActionType from "../Constants/ActionType";

let initialState = {
    listTreatmentDiary : [],
    listTreatmentDiaryDetail:[],
    currentTreatmentDiary : {},
    listTreatmentDiaryService : [],

};

const DiaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.SET_LIST_TREATMENT_DIARY_SERVICE:
            return {
                ...state,
                listTreatmentDiary: action.payload
            }
        case ActionType.SET_LIST_TREATMENT_DIARY:
            return {
                ...state,
                listTreatmentDiary: action.payload
            }
        case ActionType.SET_LIST_TREATMENT_DIARY_DETAIL:
            return {
                ...state,
                listTreatmentDiaryDetail: action.payload
            }
        case ActionType.SET_CURRENT_TREATMENT_DIARY:
            return {
                ...state,
                currentTreatmentDiary: action.payload
            }
        case ActionType.CLEAR_CURRENT_TREATMENT_DIARY:
            return {
                ...state,
                currentTreatmentDiary: {}
            }
        case ActionType.UPDATE_CURRENT_TREATMENT_DIARY:
            if(state?.currentTreatmentDiary?.id === action.payload?.id)
            {
                return {
                    ...state,
                    currentTreatmentDiary: action.payload
                }
            }
            return {
                ...state
            }

        // case ActionType.UPDATE_CURRENT_TREATMENT_DIARY:
        //     var tmp = {...state}
        //     var dailyDiary = tmp?.currentTreatmentDiary?.dailyDiaryArr
        //     var index = dailyDiary?.findIndex(item=>item.id === action.payload.id)
        //     console.log('index', index)

        //     if(index>-1)
        //     {
        //         dailyDiary[index] = action.payload
        //         tmp.dailyDiaryArr= dailyDiary
        //         console.log('tmp', tmp)
        //         return tmp
        //     }
        //     return {
        //         ...state,
        //     }
        
        default:
            return state;
    }
};

export default DiaryReducer;
