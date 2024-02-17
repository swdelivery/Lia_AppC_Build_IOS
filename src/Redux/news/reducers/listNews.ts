import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { News } from "@typings/news";
import { GET_NEWS } from "../types";

export type State = {
  data: News[],
  isFirstLoaded: boolean;
};

const INITIAL_STATE: State = {
  data: [],
  isFirstLoaded: false
};

const success: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    data: payload.data,
    isFirstLoaded: true,
  };
};

export default createReducer(INITIAL_STATE, {
  [GET_NEWS.SUCCESS]: success,
});
