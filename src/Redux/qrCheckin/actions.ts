import { generateActionsGroup } from "@Redux/helper";
import { ApiResponse } from "@typings/api";
import { Branch } from "@typings/branch";
import { GET_INFO_BRANCH_BY_CODE, PARTNER_CHECKIN_BOOKING, SELECT_BOOKING_FOR_CHECKIN } from "./types";

// GET
export const getInfoBranchByCode = generateActionsGroup<
  any,
  ApiResponse<Branch>
>(GET_INFO_BRANCH_BY_CODE);

// PUT
export const partnerCheckInBooking = generateActionsGroup<
  any,
  ApiResponse<any>
>(PARTNER_CHECKIN_BOOKING);

// SELECT
export const selectBookingForCheckin = (data) => ({
  type: SELECT_BOOKING_FOR_CHECKIN,
  payload: data,
});
