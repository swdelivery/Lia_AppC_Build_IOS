import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_ORDER_DETAILS } from "../types";
import { Order } from "@typings/payment";

export type State = {
  isLoading: boolean;
  data: Order;
};

const INITIAL_STATE: State = {
  isLoading: false,
  // @ts-ignore
  data: null,
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
  [GET_ORDER_DETAILS.REQUEST]: request,
  [GET_ORDER_DETAILS.SUCCESS]: success,
  [GET_ORDER_DETAILS.FAILURE]: failure,
});
