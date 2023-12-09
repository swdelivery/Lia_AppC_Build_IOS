import { generateActionsGroup } from "@Redux/helper";
import { ApiResponse } from "@typings/api";
import { PartnerTreatment, Postoperative } from "@typings/takecare";
import { CLEAR_LIST_POSTOPERATIVE, GET_LIST_PARTNER_TREATMENT, GET_LIST_POSTOPERATIVE, UPDATE_DAILY_DIARY } from "./types";

// GET
export const getListPartnerTreatment = generateActionsGroup<
  any,
  ApiResponse<PartnerTreatment[]>
>(GET_LIST_PARTNER_TREATMENT);

export const getListPostoperative = generateActionsGroup<
  any,
  ApiResponse<Postoperative[]>
>(GET_LIST_POSTOPERATIVE);

export const updateDailyDiary = generateActionsGroup<
  any,
  ApiResponse<Postoperative[]>
>(UPDATE_DAILY_DIARY);

// CLEAR
export const clearListPostoperative = () => ({
  type: CLEAR_LIST_POSTOPERATIVE,
});
