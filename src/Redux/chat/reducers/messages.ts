import { createReducer } from "@Redux/helper";
import { Handler, PagingInfo } from "@Redux/types";
import {
  GET_CONVERSATION_MESSAGES,
  LOAD_MORE_CONVERSATION_MESSAGES_HISTORY,
} from "../types";
import { Message } from "@typings/chat";
import { GET_NEW_MESSAGE } from "@Redux/Constants/ActionType";

export type State = {
  isLoading: boolean;
  isLoadingMore: boolean;
  conversationId: string;
  data: Message[];
  total: number;
  paging?: PagingInfo;
};

const INITIAL_STATE: State = {
  isLoading: false,
  isLoadingMore: false,
  conversationId: "",
  data: [],
  total: 0,
};

const request: Handler<State> = (state, { payload }) => ({
  ...state,
  isLoading: true,
  conversationId: payload,
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

const handleNewMessage: Handler<State> = (state, { payload }) => {
  if (state.conversationId === payload.data.conversationId) {
    return {
      ...state,
      data: [payload.data.message, ...state.data],
    };
  }
  return state;
};

export default createReducer(INITIAL_STATE, {
  [GET_CONVERSATION_MESSAGES.REQUEST]: request,
  [GET_CONVERSATION_MESSAGES.FAILURE]: failure,
  [GET_CONVERSATION_MESSAGES.SUCCESS]: success,

  [LOAD_MORE_CONVERSATION_MESSAGES_HISTORY.REQUEST]: loadMoreRequest,
  [LOAD_MORE_CONVERSATION_MESSAGES_HISTORY.FAILURE]: loadMoreFailure,
  [LOAD_MORE_CONVERSATION_MESSAGES_HISTORY.SUCCESS]: loadMoreSuccess,

  [GET_NEW_MESSAGE]: handleNewMessage,
});
