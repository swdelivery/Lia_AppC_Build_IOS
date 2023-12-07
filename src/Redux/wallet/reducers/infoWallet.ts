import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { Wallet } from "@typings/wallet";
import { GET_WALLET } from "../types";

export type State = {
  isLoading: boolean;
  data: Wallet;
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
  [GET_WALLET.REQUEST]: request,
  [GET_WALLET.SUCCESS]: success
});
