import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_ORDER_PAYMENTS } from "../types";
import { PaymentRequest } from "@typings/payment";

export type State = {
  isLoading: boolean;
  data: PaymentRequest[];
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
  [GET_ORDER_PAYMENTS.REQUEST]: request,
  [GET_ORDER_PAYMENTS.SUCCESS]: success,
  [GET_ORDER_PAYMENTS.FAILURE]: failure,
});
