import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { ExaminationResult } from "@typings/examinationResult";
import { GET_DETAIL_EXAMINATION_RESULT } from "../types";

export type State = {
  data: ExaminationResult,
};

const INITIAL_STATE: State = {
  data: {},
};

const request: Handler<State> = (state, { payload }) => {
  return INITIAL_STATE
};
const success: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    data: payload.data.data,
  }
};

export default createReducer(INITIAL_STATE, {
  [GET_DETAIL_EXAMINATION_RESULT.REQUEST]: request,
  [GET_DETAIL_EXAMINATION_RESULT.SUCCESS]: success,
});
