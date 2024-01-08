import { createReducer } from "@Redux/helper";
import { Handler, PagingInfo } from "@Redux/types";
import { GET_PRODUCTS, LOAD_MORE_PRODUCTS } from "../types";
import { Product } from "@typings/product";

export type State = {
  isLoading: boolean;
  isLoadingMore: boolean;
  data: Product[];
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
  [GET_PRODUCTS.REQUEST]: request,
  [GET_PRODUCTS.FAILURE]: failure,
  [GET_PRODUCTS.SUCCESS]: success,

  [LOAD_MORE_PRODUCTS.REQUEST]: loadMoreRequest,
  [LOAD_MORE_PRODUCTS.FAILURE]: loadMoreFailure,
  [LOAD_MORE_PRODUCTS.SUCCESS]: loadMoreSuccess,
});
