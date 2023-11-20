import { generateActionsGroup } from "@Redux/helper";
import { OPEN_ACTION_SHEET_BOTTOM, OPEN_ACTION_SHEET_ICON, SELECT_ITEM_ACTION_SHEET_ICON } from "./types";
import { Service } from "@typings/serviceGroup";
import { Review } from "@typings/review";



export const openActionSheetBottom = (data) => ({
  type: OPEN_ACTION_SHEET_BOTTOM,
  payload: data,
});

export const openActionSheetIcon = (data) => ({
  type: OPEN_ACTION_SHEET_ICON,
  payload: data,
});

export const selectItemActionSheetIcon = (data) => ({
  type: SELECT_ITEM_ACTION_SHEET_ICON,
  payload: data,
});
