import { createReducer } from "@Redux/helper";
import { Handler, PagingInfo } from "@Redux/types";
import { GET_VOUCHERS, LOAD_MORE_VOUCHERS } from "../types";
import { Voucher } from "@typings/voucher";

export type State = {
  isLoading: boolean;
  isLoadingMore: boolean;
  data: Voucher[];
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
  [GET_VOUCHERS.REQUEST]: request,
  [GET_VOUCHERS.FAILURE]: failure,
  [GET_VOUCHERS.SUCCESS]: success,

  [LOAD_MORE_VOUCHERS.REQUEST]: loadMoreRequest,
  [LOAD_MORE_VOUCHERS.FAILURE]: loadMoreFailure,
  [LOAD_MORE_VOUCHERS.SUCCESS]: loadMoreSuccess,
});
