import { generateActionsGroup } from "@Redux/helper";
import { ApiResponse } from "@typings/api";
import { GET_PARTNER_LEVEL, SET_CURR_PARTNER_LEVEL } from "./types";
import { PartnerLevel } from "@typings/affiliate";

// GET
export const getPartnerLevel = generateActionsGroup<
  any,
  ApiResponse<PartnerLevel[]>
>(GET_PARTNER_LEVEL);

// SET
export const setCurrPartnerLevel = (data) => ({
  type: SET_CURR_PARTNER_LEVEL,
  payload: data,
});
