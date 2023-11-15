import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { OPEN_ACTION_SHEET_BOTTOM } from "../types";


export type State = {
  showActionSheetBottom: {
    flag: false,
    data: {}
  }
};

const INITIAL_STATE: State = {
  showActionSheetBottom: {
    flag: false,
    data: {}
  }
};

const openActionSheetBottom: Handler<State> = (state, { payload }) => ({
  ...state,
  showActionSheetBottom: payload,
});

export default createReducer(INITIAL_STATE, {
  [OPEN_ACTION_SHEET_BOTTOM]: openActionSheetBottom,
});
