import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { Booking } from "@typings/booking";
import { SELECT_BOOKING_FOR_CHECKIN } from "../types";

export type State = {
  data: Booking,
};

const INITIAL_STATE: State = {
  data: {},
};

const selectBookingForCheckin: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    data: payload,
  }
};

export default createReducer(INITIAL_STATE, {
  [SELECT_BOOKING_FOR_CHECKIN]: selectBookingForCheckin,
});
