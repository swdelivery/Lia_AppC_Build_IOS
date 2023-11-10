import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_SERVICE_REVIEWS } from "../types";
import { Review } from "@typings/review";
import { ApiMeta } from "@typings/api";

export type State = {
  isLoading: boolean;
  data: Review[];
  meta?: ApiMeta
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
  data: payload.data,
  meta: payload.meta
});

export default createReducer(INITIAL_STATE, {
  [GET_SERVICE_REVIEWS.REQUEST]: request,
  [GET_SERVICE_REVIEWS.SUCCESS]: success,
  [GET_SERVICE_REVIEWS.FAILURE]: failure,
});
