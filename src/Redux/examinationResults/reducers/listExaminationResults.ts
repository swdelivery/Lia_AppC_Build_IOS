import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { ExaminationResult } from "@typings/examinationResult";
import { GET_LIST_EXAMINATION_RESULTS } from "../types";

export type State = {
  data: ExaminationResult[],
  isLoading: boolean
};

const INITIAL_STATE: State = {
  data: [],
  isLoading: false,
};

const request: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    isLoading: true
  }
};
const failure: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    isLoading: false
  }
};
const success: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    data: payload.data.data,
    isLoading: false
  }
};

export default createReducer(INITIAL_STATE, {
  [GET_LIST_EXAMINATION_RESULTS.REQUEST]: request,
  [GET_LIST_EXAMINATION_RESULTS.FAILURE]: failure,
  [GET_LIST_EXAMINATION_RESULTS.SUCCESS]: success,
});
