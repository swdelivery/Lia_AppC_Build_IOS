import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_BOOKING_DEPOSITS } from "../types";

export type State = {
  isLoading: boolean;
  data: any[];
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
  [GET_BOOKING_DEPOSITS.REQUEST]: request,
  [GET_BOOKING_DEPOSITS.SUCCESS]: success,
  [GET_BOOKING_DEPOSITS.FAILURE]: failure,
});
