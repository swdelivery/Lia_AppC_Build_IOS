import { createReducer } from "@Redux/helper";
import { CLEAR_SERVICE_DATA_FILTER, GET_DATA_FOR_MODAL_FILTER_SERVICE, SELECT_SERVICE_AVERAGERATING, SELECT_SERVICE_BRANCH_GROUP, SELECT_SERVICE_CHILD_CODE_GROUP, SELECT_SERVICE_COUPON, SELECT_SERVICE_LOCATION, SELECT_SERVICE_MOST_POPULAR, SELECT_SERVICE_PARENT_CODE_GROUP, SELECT_SERVICE_RANGE_PRICE, SELECT_SERVICE_SEARCHING, SELECT_SERVICE_SORT_PRICE, SELECT_SERVICE_UTILITIES } from "../types";
import { Handler } from "@Redux/types";

export type State = {
  dataServiceParentCodeGroup: any;
  dataServiceCoupon: boolean;
  dataServiceAverageRating: boolean;
  dataServiceMostPopular: boolean;
  dataServiceSortPrice: any
  dataForModalFilterService: any;
  dataServiceChildCodeGroup: any;
  dataServiceLocation: any;
  dataServiceBranchGroup: any;
  dataServiceRangePrice: number;
  dataServiceUtilities: any;
  dataServiceSearching: string
};

const INITIAL_STATE: State = {
  dataServiceParentCodeGroup: null,
  dataServiceCoupon: false,
  dataServiceAverageRating: false,
  dataServiceMostPopular: false,
  dataServiceSortPrice: null,
  dataForModalFilterService: {
    childrenServiceGroup: [],
    typeGroupBranch: [],
    utilitiesGroupBranch: [],
    location: []
  },
  dataServiceChildCodeGroup: [],
  dataServiceLocation: null,
  dataServiceBranchGroup: [],
  dataServiceRangePrice: null,
  dataServiceUtilities: [],
  dataServiceSearching: ""
};

const selectServiceParentCodeGroup: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    dataServiceParentCodeGroup: payload
  }
};
const selectServiceCoupon: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    dataServiceCoupon: !state.dataServiceCoupon
  }
};
const selectServiceAverageRating: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    dataServiceAverageRating: !state.dataServiceAverageRating
  }
};
const selectServiceMostPopular: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    dataServiceMostPopular: !state.dataServiceMostPopular
  }
};
const selectServiceSortPrice: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    dataServiceSortPrice: payload
  }
};
const successGetDataForModalFilterService: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    dataForModalFilterService: payload?.data?.data
  }
};
const selectServiceChildCodeGroup: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    dataServiceChildCodeGroup: payload
  }
};
const selectServiceLocation: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    dataServiceLocation: payload
  }
};
const selectServiceBranchGroup: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    dataServiceBranchGroup: payload
  }
};
const selectServiceRangePrice: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    dataServiceRangePrice: payload
  }
};
const selectServiceUtilities: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    dataServiceUtilities: payload
  }
};
const selectServiceSearching: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    dataServiceSearching: payload
  }
};
const clearServiceDataFilter: Handler<State> = (state, { payload }) => {
  return INITIAL_STATE
};

export default createReducer(INITIAL_STATE, {
  [SELECT_SERVICE_PARENT_CODE_GROUP]: selectServiceParentCodeGroup,
  [SELECT_SERVICE_COUPON]: selectServiceCoupon,
  [SELECT_SERVICE_AVERAGERATING]: selectServiceAverageRating,
  [SELECT_SERVICE_MOST_POPULAR]: selectServiceMostPopular,
  [SELECT_SERVICE_SORT_PRICE]: selectServiceSortPrice,
  [GET_DATA_FOR_MODAL_FILTER_SERVICE.SUCCESS]: successGetDataForModalFilterService,
  [SELECT_SERVICE_CHILD_CODE_GROUP]: selectServiceChildCodeGroup,
  [SELECT_SERVICE_LOCATION]: selectServiceLocation,
  [SELECT_SERVICE_BRANCH_GROUP]: selectServiceBranchGroup,
  [SELECT_SERVICE_RANGE_PRICE]: selectServiceRangePrice,
  [SELECT_SERVICE_UTILITIES]: selectServiceUtilities,
  [SELECT_SERVICE_SEARCHING]: selectServiceSearching,
  [CLEAR_SERVICE_DATA_FILTER]: clearServiceDataFilter,
});
