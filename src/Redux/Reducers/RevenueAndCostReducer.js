import * as ActionType from "../Constants/ActionType";

let initialState = {
    dataRevenueBranch: [],
    dataRevenueService: [],
    dataCostPart: [],
    dataCostItem: [],
    dataFlowMoney:[],
    isShowModalFilter: false,
    isShowModalTabRightNotifiTask: false,
    dateFilter: {
        start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        end: new Date()
    },
    loading: {
        isLoading: false,
        content: 'Loading...',
        transparent: false
    },
    role: '1',
    isErrorNetWork: false,
    isShowMoneyFlow: false,
    newMessage: true,
};

const RevenueAndCostReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionType.SAVE_LIST_REVENUE_BRANCH:
            return {
                ...state,
                dataRevenueBranch: action.payload
            }
        case ActionType.SAVE_LIST_REVENUE_SERVICE:
            return {
                ...state,
                dataRevenueService: action.payload
            }
        case ActionType.SAVE_LIST_COST_PART:
            return {
                ...state,
                dataCostPart: action.payload
            }
        case ActionType.SAVE_LIST_COST_ITEM:
            return {
                ...state,
                dataCostItem: action.payload
            }
        case ActionType.SAVE_LIST_FLOW_MONEY:
            return {
                ...state,
                dataFlowMoney: action.payload
            }
        default:
            return state;
    }
};

export default RevenueAndCostReducer;
