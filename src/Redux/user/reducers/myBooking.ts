import { createReducer } from "@Redux/helper";
import { Handler, PagingInfo } from "@Redux/types";
import {
  CANCEL_PARTNER_BOOKING,
  GET_MY_BOOKING,
  LOAD_MORE_MY_BOOKING,
} from "../types";
import { Booking } from "@typings/booking";

export type State = {
  isLoading: boolean;
  isLoadingMore: boolean;
  data: Booking[];
  total: number;
  paging?: PagingInfo;
  processingBooking?: string;
};

const INITIAL_STATE: State = {
  isLoading: false,
  isLoadingMore: false,
  data: [],
  total: 0,
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
  ...payload,
});

const loadMoreRequest: Handler<State> = (state) => ({
  ...state,
  isLoadingMore: !!state.paging?.canLoadMore,
});

const loadMoreFailure: Handler<State> = (state) => ({
  ...state,
  isLoadingMore: false,
});

const loadMoreSuccess: Handler<State> = (state, { payload }) => ({
  ...state,
  isLoadingMore: false,
  data: [...state.data, ...payload.data],
  paging: payload.paging,
});

const cancelBooking: Handler<State> = (state, { payload }) => ({
  ...state,
  processingBooking: payload,
});

const cancelBookingFinish: Handler<State> = (state, { payload }) => ({
  ...state,
  processingBooking: undefined,
});

export default createReducer(INITIAL_STATE, {
  [GET_MY_BOOKING.REQUEST]: request,
  [GET_MY_BOOKING.FAILURE]: failure,
  [GET_MY_BOOKING.SUCCESS]: success,

  [LOAD_MORE_MY_BOOKING.REQUEST]: loadMoreRequest,
  [LOAD_MORE_MY_BOOKING.FAILURE]: loadMoreFailure,
  [LOAD_MORE_MY_BOOKING.SUCCESS]: loadMoreSuccess,

  [CANCEL_PARTNER_BOOKING.REQUEST]: cancelBooking,
  [CANCEL_PARTNER_BOOKING.SUCCESS]: cancelBookingFinish,
  [CANCEL_PARTNER_BOOKING.FAILURE]: cancelBookingFinish,
});
