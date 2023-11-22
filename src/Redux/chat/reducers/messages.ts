import { createReducer } from "@Redux/helper";
import { Handler, PagingInfo } from "@Redux/types";
import {
  GET_CONVERSATION_MESSAGES,
  LOAD_MORE_PARTNER_CONVERSATIONS,
} from "../types";
import { Message } from "@typings/chat";

export type State = {
  isLoading: boolean;
  isLoadingMore: boolean;
  data: Message[];
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
  data: payload,
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
  [GET_CONVERSATION_MESSAGES.REQUEST]: request,
  [GET_CONVERSATION_MESSAGES.FAILURE]: failure,
  [GET_CONVERSATION_MESSAGES.SUCCESS]: success,

  [LOAD_MORE_PARTNER_CONVERSATIONS.REQUEST]: loadMoreRequest,
  [LOAD_MORE_PARTNER_CONVERSATIONS.FAILURE]: loadMoreFailure,
  [LOAD_MORE_PARTNER_CONVERSATIONS.SUCCESS]: loadMoreSuccess,
});
