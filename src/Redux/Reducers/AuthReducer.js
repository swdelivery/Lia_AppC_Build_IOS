import * as ActionType from "../Constants/ActionType";

let initialState = {
    isLoggedIn: true,
    checkAuthProcessing: false,
    isShowRequireLogin: {
        flag: false,
        currRouteName: null
    },
    codeAffiliate: null,
    noticeNotAutoShowTut: true,
    noticeNotAutoShowTutCreateBooking: true,
    isEndedCalling: {
        rndNum: '',
        flag: false
    }
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionType.SET_ENDED_CALLING:
            return {
                ...state,
                isEndedCalling: action?.payload?.data
            }

        case ActionType.SET_NOTICE_NOT_AUTO_SHOW_TUT:
            return {
                ...state,
                noticeNotAutoShowTut: action?.payload?.flag
            }

        case ActionType.SET_NOTICE_NOT_AUTO_SHOW_TUT_CREATE_BK:
            return {
                ...state,
                noticeNotAutoShowTutCreateBooking: action?.payload?.flag
            }
        case ActionType.SET_CODE_AFFILIATE:
            return {
                ...state,
                codeAffiliate: action?.payload?.data
            }
        case ActionType.SHOW_MODAL_REQUIRE_LOGIN:
            return {
                ...state,
                isShowRequireLogin: {
                    flag: action.payload.flag,
                    currRouteName: action?.payload?.currRouteName
                }
            }

        case ActionType.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: action.payload.flag
            }
        case ActionType.LOG_OUT:
            return {
                ...state,
                isLoggedIn: false
            }
        case ActionType.CHECK_AUTH_PROCESSING:
            return {
                ...state,
                checkAuthProcessing: action.payload.flag
            }
        default:
            return state;
    }
};

export default AuthReducer;
