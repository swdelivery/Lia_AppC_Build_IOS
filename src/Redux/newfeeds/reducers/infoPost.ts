import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { Meta, Post } from "@typings/newfeeds";
import { SELECT_POST } from "../types";

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

export default createReducer(INITIAL_STATE, {
  [SELECT_POST]: selectPost,
});
