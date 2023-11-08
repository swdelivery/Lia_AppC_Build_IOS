import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_DOCTOR_REVIEWS } from "../types";
import { Review } from "@typings/review";

export type State = {
  isLoading: boolean;
  data: Review[];
};

const INITIAL_STATE: State = {
  isLoading: false,
  data: [],
};

const request: Handler<State> = (state) => ({
  ...state,
  isLoading: true,
});

const failure: Handler<State> = (state) => ({
  ...state,
  isLoading: false,
});

const success: Handler<State> = (state, { payload }) => ({
  ...state,
  isLoading: false,
  data: payload,
});

export default createReducer(INITIAL_STATE, {
  [GET_DOCTOR_REVIEWS.REQUEST]: request,
  [GET_DOCTOR_REVIEWS.SUCCESS]: success,
  [GET_DOCTOR_REVIEWS.FAILURE]: failure,
});
