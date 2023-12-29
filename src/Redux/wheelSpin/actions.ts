import { generateActionsGroup } from "@Redux/helper";
import { ApiResponse } from "@typings/api";
import { GET_CURR_ACTIVE_WHEEL_SPIN, GET_PARTNER_WHEEL_TURN } from "./types";
import { WheelSpin } from "@typings/wheelSpin";

// GET
export const getCurrActiveWheelSpin = generateActionsGroup<
  any,
  ApiResponse<WheelSpin>
>(GET_CURR_ACTIVE_WHEEL_SPIN);

export const getPartnerWheelTurn = generateActionsGroup<
  any,
  ApiResponse<any>
>(GET_PARTNER_WHEEL_TURN);

