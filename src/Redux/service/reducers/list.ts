import { createReducer } from "@Redux/helper";
import { Handler, PagingInfo } from "@Redux/types";
import { GET_SERVICES, LOAD_MORE_SERVICES } from "../types";
import { Service } from "@typings/serviceGroup";

export type State = {
  isLoading: boolean;
  isLoadingMore: boolean;
  data: Service[];
  total: number;
  paging?: PagingInfo;
};

const INITIAL_STATE: State = {
  isLoading: false,
  isLoadingMore: false,
  total: 0,
  data: [],
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

const loadMoreRequest: Handler<State> = (state, { payload }) => ({
  ...state,
  isLoadingMore: false,
});

const loadMoreSuccess: Handler<State> = (state, { payload }) => ({
  ...state,
  isLoadingMore: false,
  data: [...state.data, ...payload.data],
});

const loadMoreFailure: Handler<State> = (state) => ({
  ...state,
  isLoadingMore: false,
});

export default createReducer(INITIAL_STATE, {
  [GET_SERVICES.REQUEST]: request,
  [GET_SERVICES.SUCCESS]: success,
  [GET_SERVICES.FAILURE]: failure,

  [LOAD_MORE_SERVICES.REQUEST]: loadMoreRequest,
  [LOAD_MORE_SERVICES.SUCCESS]: loadMoreSuccess,
  [LOAD_MORE_SERVICES.FAILURE]: loadMoreFailure,
});
