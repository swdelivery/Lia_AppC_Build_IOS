import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { EyeLabel, Meta } from "@typings/resultScanningEyes";
import { GET_EYE_LABEL } from "../types";

export type State = {
  isLoading: boolean;
  data: EyeLabel[];
  meta: Meta;
};

const INITIAL_STATE: State = {
  isLoading: false,
  data: [],
  meta: null
};

const request: Handler<State> = (state) => ({
  ...state,
  isLoading: true,
});

const failure: Handler<State> = (state) => ({
  ...state,
  isLoading: false,
});

const success: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    data: payload?.data,
    meta: payload?.meta
  }
}

export default createReducer(INITIAL_STATE, {
  [GET_EYE_LABEL.REQUEST]: request,
  [GET_EYE_LABEL.SUCCESS]: success,
});
