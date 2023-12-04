import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { Meta, Post } from "@typings/newfeeds";
import { GET_LIST_POSTS, GET_MORE_POSTS } from "../types";

export type State = {
  isLoading: boolean;
  isLoadingMore: boolean;
  data: Post[];
  meta: Meta
};

const INITIAL_STATE: State = {
  isLoading: false,
  isLoadingMore: false,
  data: [],
  meta: null
};

const request: Handler<State> = (state, { payload }) => ({
  ...state,
  isLoading: true,
});

const success: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    isLoading: false,
    data: payload?.data?.data,
    meta: payload?.data?.meta
  }
}

const loadMoreSuccess: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    isLoading: false,
    data: [...state?.data, ...payload?.data?.data],
    meta: payload?.data?.meta
  }
}


export default createReducer(INITIAL_STATE, {
  [GET_LIST_POSTS.REQUEST]: request,
  [GET_LIST_POSTS.SUCCESS]: success,
  [GET_MORE_POSTS.SUCCESS]: loadMoreSuccess,
});
