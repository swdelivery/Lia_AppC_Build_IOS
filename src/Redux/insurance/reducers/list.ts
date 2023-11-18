import { createReducer } from "@Redux/helper";
import { Handler, PagingInfo } from "@Redux/types";
import { GET_INSURANCE_LIST, LOAD_MORE_INSURANCE_LIST } from "../types";

export type State = {
  isLoading: boolean;
  isLoadingMore: boolean;
  data: any[];
  total: number;
  paging?: PagingInfo;
};

const INITIAL_STATE: State = {
  isLoading: false,
  isLoadingMore: false,
  data: [],
  total: 0,
};

const request: Handler<State> = (state) => ({
  ...state,
  isLoading: true,
});

const failure: Handler<State> = (state) => ({
  ...state,
  isLoading: false,
});

const success: Handler<State> = (state, { payload }) => ({
  ...state,
  isLoading: false,
  ...payload,
});

const loadMoreRequest: Handler<State> = (state) => ({
  ...state,
  isLoadingMore: !!state.paging?.canLoadMore,
});

const loadMoreFailure: Handler<State> = (state) => ({
  ...state,
  isLoadingMore: false,
});

const loadMoreSuccess: Handler<State> = (state, { payload }) => ({
  ...state,
  isLoadingMore: false,
  data: [...state.data, ...payload.data],
  paging: payload.paging,
});

export default createReducer(INITIAL_STATE, {
  [GET_INSURANCE_LIST.REQUEST]: request,
  [GET_INSURANCE_LIST.FAILURE]: failure,
  [GET_INSURANCE_LIST.SUCCESS]: success,
  [LOAD_MORE_INSURANCE_LIST.REQUEST]: loadMoreRequest,
  [LOAD_MORE_INSURANCE_LIST.FAILURE]: loadMoreFailure,
  [LOAD_MORE_INSURANCE_LIST.SUCCESS]: loadMoreSuccess,
});
