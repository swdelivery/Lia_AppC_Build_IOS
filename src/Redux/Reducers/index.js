import * as ActionType from "../Constants/ActionType";

let initialState = {
  dataRevenueBranch: [],
  dataRevenueService: [],
  dataCostPart: [],
  dataCostItem: [],
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

const reducer = (state = initialState, action) => {
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
    case ActionType.OPEN_MODAL_FILTER:
      return {
        ...state,
        isShowModalFilter: true
      }
    case ActionType.CLOSE_MODAL_FILTER:
      return {
        ...state,
        isShowModalFilter: false
      }
    case ActionType.UPDATE_DATE_FILTER:
      return {
        ...state,
        dateFilter: action.payload
      }
    case ActionType.LOADING_BEGIN:
      return {
        ...state,
        loading: {
          isLoading: true,
          content: action.payload.content ? action.payload.content : `${state.loading.content}`,
          transparent: action.payload.transparent == 'transparent' ? true : false
        },
      }

    case ActionType.LOADING_DONE:
      return {
        ...state,
        loading: initialState.loading
      }


    case ActionType.NEW_ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          error: {
            title: 'Lỗi',
            body: action.payload.data
          }
        }
      }



    case ActionType.NETWORK_ERROR:
      return {
        ...state,
        loading: initialState.loading,
        isErrorNetWork: action.payload.flag
      }
    case ActionType.MODAL_MONEY_FLOW:
      return {
        ...state,
        isShowMoneyFlow: action.payload.flag
      }
    case ActionType.TAB_RIGHT_NOTIFI_TASK:
      return {
        ...state,
        isShowModalTabRightNotifiTask: action.payload.flag
      }

    default:
      return state;
  }
};

export default reducer;
