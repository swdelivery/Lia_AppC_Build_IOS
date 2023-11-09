import { isEmpty } from "lodash-es";
import * as ActionType from "../Constants/ActionType";

let initialState = {
    listPartnerDiary : [],
    listPartnerDiaryDaily : [],
    currentPartnerDiary : {},
    currentPartnerDiaryDaily : {}
};

const DiaryReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionType.SET_LIST_PARTNER_DIARY:
            return {
                ...state,
                listPartnerDiary: action.payload
            }

        case ActionType.CREATE_PARNERT_DIARY:
            return {
                ...state,
                listPartnerDiary: [...action.payload, ...state.listPartnerDiary]
            }
       
        case 'UPDATE_LIST_PARTNER_DIARY':
            var index = state?.listPartnerDiary?.findIndex(item=>item?._id === action.payload._id)
            if(index>-1)
            {
                var newTmp = [...state.listPartnerDiary]
                newTmp[index] = action.payload
                return {
                    ...state,
                    listPartnerDiary: newTmp
                }
            }
            return {
                ...state
            }

        case 'UPDATE_PARNERT_DIARY_DAILY_IN_LIST':
            console.log(action.payload)
            var index = state?.listPartnerDiary?.findIndex(item=>item?._id === action.payload.partnerDiaryId)
            console.log({index})
            if(index>-1)
            {
                var newTmp = [...state.listPartnerDiary]
                var newTmpDaily = [...newTmp[index].dailyDiaryArr]

                newTmp[index]. dailyDiaryArr= [...newTmpDaily,...action.payload]
                return {
                    ...state,
                    listPartnerDiary: newTmp
                }
            }
            return {
                ...state
            }

        case ActionType.SET_CURRENT_PARTNER_DIARY:
        return {
            ...state,
            currentPartnerDiary: action.payload
        }

        case ActionType.SET_CURRENT_PARTNER_DIARY_DAILY:
        return {
            ...state,
            listPartnerDiaryDaily: action.payload
        }

        case ActionType.CREATE_PARNERT_DIARY_DAILY:
            return {
                ...state,
                listPartnerDiaryDaily: [...action.payload, ...state.listPartnerDiaryDaily]
            }

        case ActionType.UPDATE_PARNERT_DIARY_DAILY:
            var dailyTmp = [...state.listPartnerDiaryDaily]
            const indexDaily = dailyTmp.findIndex(item=> item?._id === action.payload?._id)
            if(indexDaily>-1)
            {
                dailyTmp[indexDaily] = action.payload
            }
            return {
                ...state,
                listPartnerDiaryDaily: dailyTmp
            }

         
        case ActionType.SET_CURRENT_PARTNER_DIARY_DAILY_UPDATE:
           
        return {
            ...state,
            currentPartnerDiaryDaily: action.payload
        }
            
        
        default:
            return state;
    }
};

export default DiaryReducer;
