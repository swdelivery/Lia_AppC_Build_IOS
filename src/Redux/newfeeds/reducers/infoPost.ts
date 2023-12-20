import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { Meta, Post } from "@typings/newfeeds";
import { CREATE_REACTION_POST, SELECT_POST } from "../types";

export type State = {
  isLoading: boolean;
  data: Post;
  meta: Meta
};

const INITIAL_STATE: State = {
  isLoading: false,
  data: null,
  meta: null
};

const selectPost: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    data: payload
  }
};

const createReactionPostSuccess: Handler<State> = (state, { payload }) => {
  let dataTemp = { ...state.data }
  if (dataTemp?._id == payload?.postId) {
    dataTemp['reaction'] = payload?.data?.data?.reaction;
    dataTemp['reactionCount'] = payload?.data?.data?.reactionCount
  }
  return {
    ...state,
    data: dataTemp
  }
};

export default createReducer(INITIAL_STATE, {
  [SELECT_POST]: selectPost,
  [CREATE_REACTION_POST.SUCCESS]: createReactionPostSuccess,
});
