import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { GET_CURRENT_FLASH_SALE_SERVICES } from "../types";
import { FlashSaleService } from "@typings/flashsale";

export type State = {
  isLoading: boolean;
  data: FlashSaleService[];
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
  [GET_CURRENT_FLASH_SALE_SERVICES.REQUEST]: request,
  [GET_CURRENT_FLASH_SALE_SERVICES.SUCCESS]: success,
  [GET_CURRENT_FLASH_SALE_SERVICES.FAILURE]: failure,
});
