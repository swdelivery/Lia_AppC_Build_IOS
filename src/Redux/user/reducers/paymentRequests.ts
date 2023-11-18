import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_PAYMENT_REQUEST } from "../types";
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
  [GET_PAYMENT_REQUEST.REQUEST]: request,
  [GET_PAYMENT_REQUEST.SUCCESS]: success,
  [GET_PAYMENT_REQUEST.FAILURE]: failure,
});
