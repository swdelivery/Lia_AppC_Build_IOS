import { createReducer } from "@Redux/helper";
import { Handler, PagingInfo } from "@Redux/types";
import { GET_MY_COUPONS, LOAD_MORE_MY_COUPONS } from "../types";
import { MyVoucher } from "@typings/voucher";

export type State = {
  isLoading: boolean;
  isLoadingMore: boolean;
  data: MyVoucher[];
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
  [GET_MY_COUPONS.REQUEST]: request,
  [GET_MY_COUPONS.FAILURE]: failure,
  [GET_MY_COUPONS.SUCCESS]: success,

  [LOAD_MORE_MY_COUPONS.REQUEST]: loadMoreRequest,
  [LOAD_MORE_MY_COUPONS.FAILURE]: loadMoreFailure,
  [LOAD_MORE_MY_COUPONS.SUCCESS]: loadMoreSuccess,
});
