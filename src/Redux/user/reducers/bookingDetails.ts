import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_BOOKING_DETAILS } from "../types";
import { Booking } from "@typings/booking";

export type State = {
  isLoading: boolean;
  data: Booking;
};

const INITIAL_STATE: State = {
  isLoading: false,
  // @ts-ignore
  data: null,
};

const request: Handler<State> = (state, { payload }) => ({
  ...state,
  isLoading: true,
  data: state.data?._id === payload ? state.data : null,
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
  [GET_BOOKING_DETAILS.REQUEST]: request,
  [GET_BOOKING_DETAILS.SUCCESS]: success,
  [GET_BOOKING_DETAILS.FAILURE]: failure,
});
