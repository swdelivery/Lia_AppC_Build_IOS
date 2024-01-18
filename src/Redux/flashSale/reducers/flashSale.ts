import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { CHECK_FLASH_SALE } from "../types";
import { FlashSale } from "@typings/flashsale";
import { ConfigFile } from "@typings/configFile";

export type State = {
  isLoading: boolean;
  totalFlashSale: number;
  availableFlashSale: number;
  currentFlashSale?: FlashSale;
  nextFlashSale: FlashSale[];
  prevFlashSale: FlashSale[];
  image?: ConfigFile;
  isFirstLoaded: boolean;
};

const INITIAL_STATE: State = {
  isLoading: false,
  totalFlashSale: 0,
  availableFlashSale: 0,
  nextFlashSale: [],
  prevFlashSale: [],
  isFirstLoaded: false,
};

const request: Handler<State> = (state) => ({
  ...state,
  isLoading: true,
});

const failure: Handler<State> = (state) => ({
  ...state,
  isLoading: false,
  isFirstLoaded: true
});

const success: Handler<State> = (state, { payload }) => ({
  ...state,
  isLoading: false,
  isFirstLoaded: true,
  ...payload,
});

export default createReducer(INITIAL_STATE, {
  [CHECK_FLASH_SALE.REQUEST]: request,
  [CHECK_FLASH_SALE.SUCCESS]: success,
  [CHECK_FLASH_SALE.FAILURE]: failure,
});
