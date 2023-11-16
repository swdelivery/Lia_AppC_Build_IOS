import { generateActionsGroup } from "@Redux/helper";
import { OPEN_ACTION_SHEET_BOTTOM } from "./types";
import { Service } from "@typings/serviceGroup";
import { Review } from "@typings/review";



export const openActionSheetBottom = (data) => ({
  type: OPEN_ACTION_SHEET_BOTTOM,
  payload: data,
});