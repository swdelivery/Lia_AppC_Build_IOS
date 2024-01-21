import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { AboutLiA } from "@typings/aboutLiA";
import { GET_ABOUT_LIA } from "../types";

export type State = {
  data: AboutLiA,
};

const INITIAL_STATE: State = {
  data: {},
  isFirstLoaded: false
};

const success: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    data: payload.data.data,
  }
};

export default createReducer(INITIAL_STATE, {
  [GET_ABOUT_LIA.SUCCESS]: success,
});
