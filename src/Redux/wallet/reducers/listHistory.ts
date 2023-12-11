import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { PaymentWallet } from "@typings/wallet";
import { GET_HISTORY_WALLET } from "../types";

export type State = {
  isLoading: boolean;
  data: PaymentWallet[];
};

const INITIAL_STATE: State = {
  isLoading: false,
  data: null,
};

const request: Handler<State> = (state, { payload }) => ({
  ...state,
  isLoading: true,
});

const success: Handler<State> = (state, { payload }) => {
  return {
    ...state,
    isLoading: false,
    data: payload?.data?.data
  }
}

export default createReducer(INITIAL_STATE, {
  [GET_HISTORY_WALLET.REQUEST]: request,
  [GET_HISTORY_WALLET.SUCCESS]: success
});
