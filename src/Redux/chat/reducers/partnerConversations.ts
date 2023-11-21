import {
  GET_PARTNER_CONVERSATIONS,
  LOAD_MORE_PARTNER_CONVERSATIONS,
} from "../types";
import { LastMessage } from "@typings/chat";
import { createReducer } from "@Redux/helper";
import { Handler, PagingInfo } from "@Redux/types";

export type State = {
  isLoading: boolean;
  isLoadingMore: boolean;
  data: LastMessage[];
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
  [GET_PARTNER_CONVERSATIONS.REQUEST]: request,
  [GET_PARTNER_CONVERSATIONS.FAILURE]: failure,
  [GET_PARTNER_CONVERSATIONS.SUCCESS]: success,

  [LOAD_MORE_PARTNER_CONVERSATIONS.REQUEST]: loadMoreRequest,
  [LOAD_MORE_PARTNER_CONVERSATIONS.FAILURE]: loadMoreFailure,
  [LOAD_MORE_PARTNER_CONVERSATIONS.SUCCESS]: loadMoreSuccess,
});
