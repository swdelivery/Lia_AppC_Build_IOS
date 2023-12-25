import { createReducer } from "@Redux/helper";
import { Handler } from "@Redux/types";
import { OPEN_ACTION_SHEET_BOTTOM, OPEN_ACTION_SHEET_ICON, SELECT_ITEM_ACTION_SHEET_ICON } from "../types";


export type State = {
  showActionSheetIcon: {
    flag: boolean;
    data: any[];
  };
  dataChoice: any;
};

const INITIAL_STATE: State = {
  showActionSheetIcon: {
    flag: false,
    data: []
  },
  dataChoice: {}
};

const openActionSheetIcon: Handler<State> = (state, { payload }) => ({
  ...state,
  dataChoice: {},
  showActionSheetIcon: payload,
});

const selectItemActionSheetIcon: Handler<State> = (state, { payload }) => ({
  ...state,
  dataChoice: payload,
});

export default createReducer(INITIAL_STATE, {
  [OPEN_ACTION_SHEET_ICON]: openActionSheetIcon,
  [SELECT_ITEM_ACTION_SHEET_ICON]: selectItemActionSheetIcon,
});
