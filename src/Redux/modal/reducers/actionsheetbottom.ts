import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { CLOSE_ACTION_SHEET_BOTTOM, OPEN_ACTION_SHEET_BOTTOM } from "../types";


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

const closeActionSheetBottom: Handler<State> = (state, { payload }) => ({
  ...state,
  showActionSheetBottom: {
    ...state.showActionSheetBottom,
    flag: false
  }
});

export default createReducer(INITIAL_STATE, {
  [OPEN_ACTION_SHEET_BOTTOM]: openActionSheetBottom,
  [CLOSE_ACTION_SHEET_BOTTOM]: closeActionSheetBottom,
});
