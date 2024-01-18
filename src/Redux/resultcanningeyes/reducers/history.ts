import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { SAVE_RESULT } from "../types";

export type State = {
  scanningResult: any;
  imageScan: any;
};

const INITIAL_STATE: State = {
  scanningResult: null,
  imageScan: null,
};

const saveResult: Handler<State> = (state, { payload }) => ({
  ...payload,
});

export default createReducer(INITIAL_STATE, {
  [SAVE_RESULT]: saveResult,
});
