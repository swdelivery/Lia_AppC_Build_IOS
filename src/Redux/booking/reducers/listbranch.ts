import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { CHANGE_BRANCH_LIST_FOR_BOOKING_BY_SERVICE, GET_BRANCH_LIST_FOR_BOOKING } from "../types";
import { Branch } from "@typings/branch";

export type State = {
  isLoading: boolean;
  data: Branch[];
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
});

const changeBranchListForBookingByService: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    data: payload
  }
};

export default createReducer(INITIAL_STATE, {
  [GET_BRANCH_LIST_FOR_BOOKING.REQUEST]: request,
  [GET_BRANCH_LIST_FOR_BOOKING.SUCCESS]: success,
  [GET_BRANCH_LIST_FOR_BOOKING.FAILURE]: failure,
  [CHANGE_BRANCH_LIST_FOR_BOOKING_BY_SERVICE]: changeBranchListForBookingByService,
});
