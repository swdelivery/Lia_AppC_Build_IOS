import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { OPEN_MODAL_ADD_SERVICE_TO_BOOKING } from "../types";


export type State = {
  isLoading: boolean;
  data: {};
  isShowModalAddServiceToBooking: {
    flag: false,
    data: {}
  }
};

const INITIAL_STATE: State = {
  isLoading: false,
  // @ts-ignore
  data: null,
  isShowModalAddServiceToBooking: {
    flag: false,
    data: {}
  }
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

const openModalAddServiceToBooking: Handler<State> = (state, { payload }) => ({
  ...state,
  isShowModalAddServiceToBooking: payload,
});

export default createReducer(INITIAL_STATE, {
  [OPEN_MODAL_ADD_SERVICE_TO_BOOKING]: openModalAddServiceToBooking,
});
