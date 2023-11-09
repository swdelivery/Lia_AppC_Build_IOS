import * as ActionType from "../Constants/ActionType";


let initialState = {
    infoWallet: {},
    isShowModalGetReward: {
        show: false,
        data: {}
    },
};

const WalletReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionType.SET_DATA_WALLET:
            return {
                ...state,
                infoWallet: action?.payload?.data
            }
        case ActionType.SHOW_MODAL_GET_REWARD:
            return {
                ...state,
                isShowModalGetReward: {
                    ...state?.isShowModalGetReward,
                    show: action?.payload?.data?.show,
                    data: action?.payload?.data?.data,
                }
            }

        default:
            return state;
    }
};

export default WalletReducer;
