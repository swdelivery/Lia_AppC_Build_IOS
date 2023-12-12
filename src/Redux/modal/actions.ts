import { generateActionsGroup } from "@Redux/helper";
import { GET_PARTNER_NOTIFICATIONS, OPEN_ACTION_SHEET_BOTTOM, OPEN_ACTION_SHEET_ICON, OPEN_MODAL_RIGHT_NOTI, SELECT_ITEM_ACTION_SHEET_ICON } from "./types";
import { Service } from "@typings/serviceGroup";
import { Review } from "@typings/review";
import { ApiResponse } from "@typings/api";
import { PartnerNoti } from "@typings/partnerNotification";

// GET
export const getPartnerNotifications = generateActionsGroup<
  any,
  ApiResponse<PartnerNoti[]>
>(GET_PARTNER_NOTIFICATIONS);

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

export const openModalRightNoti = () => ({
  type: OPEN_MODAL_RIGHT_NOTI,
});
