import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { Meta, Post } from "@typings/newfeeds";
import { CREATE_REACTION_POST, GET_LIST_POSTS, GET_MORE_POSTS } from "../types";

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

const createReactionPostSuccess: Handler<State> = (state, { payload }) => {
  let dataTemp = [...state.data]
  let indexFinded = dataTemp.findIndex(item => item?._id == payload?.postId)
  if (indexFinded !== -1) {
    dataTemp[indexFinded]['reaction'] = payload?.data?.data?.reaction
    dataTemp[indexFinded]['reactionCount'] = payload?.data?.data?.reactionCount
  }
  return {
    ...state,
    data: dataTemp
  }
}


export default createReducer(INITIAL_STATE, {
  [GET_LIST_POSTS.REQUEST]: request,
  [GET_LIST_POSTS.SUCCESS]: success,
  [GET_MORE_POSTS.SUCCESS]: loadMoreSuccess,
  [CREATE_REACTION_POST.SUCCESS]: createReactionPostSuccess,
});
