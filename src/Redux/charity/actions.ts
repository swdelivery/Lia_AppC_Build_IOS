import { generateActionsGroup } from "@Redux/helper";
import { ApiResponse } from "@typings/api";
import { Campain, CompanionRequest, Donate, Transaction } from "@typings/charity";
import {
  CLEAR_DATA_DONATION,
  CREATE_VOLUNTEER_COMPANION,
  CREATE_VOLUNTEER_COMPANION_DONATE,
  CREATE_VOLUNTEER_DONATE,
  GET_DETAIL_CAMPAIN,
  GET_LIST_CAMPAIN,
  GET_LIST_COMPANION_BY_USER,
  GET_LIST_COMPANION_REQUEST,
  GET_LIST_COMPANION_REQUEST_ACCEPT,
  GET_LIST_PARTNER_DONATE_TO_VOLUNTEER,
  GET_LIST_PARTNER_DONATE_TO_VOLUNTEER_COMPANION,
  GET_TOP_DONATE,
  GET_VOLUNTEER_HISTORY,
  GET_VOLUNTEER_REPORT_HISTORY_FILTER,
  SEARCH_CAMPAIN,
  SELECT_AMOUNT,
  SELECT_CAMPAIN,
  SELECT_DATE_FORM,
  SELECT_DATE_TO,
  SELECT_DEPOSIT,
  SELECT_DESCRIPTION,
  SELECT_HIDE_NAME,
  SELECT_ID_VOLUNTEER,
  SELECT_IMAGE,
  SELECT_PAYMENT_METHOD,
  SELECT_PAYMENT_METHOD_CODE,
  SELECT_SEARCH_VALUE,
  SELECT_VOLUNTEER_ID
} from "./types";

// POST
export const createVolunteerCompanion = generateActionsGroup<
  any,
  ApiResponse<any>
>(CREATE_VOLUNTEER_COMPANION);
export const createVolunteerDonate = generateActionsGroup<
  any,
  ApiResponse<any>
>(CREATE_VOLUNTEER_DONATE);
export const createVolunteerCompanionDonate = generateActionsGroup<
  any,
  ApiResponse<any>
>(CREATE_VOLUNTEER_COMPANION_DONATE);

// GET
export const getListCampain = generateActionsGroup<
  any,
  ApiResponse<Campain[]>
>(GET_LIST_CAMPAIN);

export const getDetailCampain = generateActionsGroup<
  any,
  ApiResponse<Campain>
>(GET_DETAIL_CAMPAIN);

export const getListCompanionRequest = generateActionsGroup<
  any,
  ApiResponse<CompanionRequest[]>
>(GET_LIST_COMPANION_REQUEST);

export const getListCompanionRequestAccept = generateActionsGroup<
  any,
  ApiResponse<CompanionRequest[]>
>(GET_LIST_COMPANION_REQUEST_ACCEPT);

export const getListCompanionByUser = generateActionsGroup<
  any,
  ApiResponse<CompanionRequest[]>
>(GET_LIST_COMPANION_BY_USER);

export const searchCampain = generateActionsGroup<
  any,
  ApiResponse<Campain[]>
>(SEARCH_CAMPAIN);

export const getVolunteerHistory = generateActionsGroup<
  any,
  ApiResponse<Transaction>
>(GET_VOLUNTEER_HISTORY);

export const getTopDonate = generateActionsGroup<
  any,
  ApiResponse<Donate[]>
>(GET_TOP_DONATE);

export const getListPartnerDonateToVolunteerCompanion = generateActionsGroup<
  any,
  ApiResponse<CompanionRequest[]>
>(GET_LIST_PARTNER_DONATE_TO_VOLUNTEER_COMPANION);

export const getListPartnerDonateToVolunteer = generateActionsGroup<
  any,
  ApiResponse<CompanionRequest[]>
>(GET_LIST_PARTNER_DONATE_TO_VOLUNTEER);

export const getVolunteerReportHistoryFilter = generateActionsGroup<
  any,
  ApiResponse<Transaction>
>(GET_VOLUNTEER_REPORT_HISTORY_FILTER);

// SELECT
export const selectCampain = (data) => ({
  type: SELECT_CAMPAIN,
  payload: data,
});
export const selectVolunteerId = (data) => ({
  type: SELECT_VOLUNTEER_ID,
  payload: data,
});
export const selectPaymentMethodCode = (data) => ({
  type: SELECT_PAYMENT_METHOD_CODE,
  payload: data,
});
export const selectAmount = (data) => ({
  type: SELECT_AMOUNT,
  payload: data,
});
export const selectHideName = (data) => ({
  type: SELECT_HIDE_NAME,
  payload: data,
});
export const selectDescription = (data) => ({
  type: SELECT_DESCRIPTION,
  payload: data,
});
export const selectImage = (data) => ({
  type: SELECT_IMAGE,
  payload: data,
});
export const selectSearchValue = (data) => ({
  type: SELECT_SEARCH_VALUE,
  payload: data,
});
export const selectDateFrom = (data) => ({
  type: SELECT_DATE_FORM,
  payload: data,
});
export const selectDateTo = (data) => ({
  type: SELECT_DATE_TO,
  payload: data,
});
export const selectPaymentMethod = (data) => ({
  type: SELECT_PAYMENT_METHOD,
  payload: data,
});
export const selectDeposit = (data) => ({
  type: SELECT_DEPOSIT,
  payload: data,
});
export const selectIdVolunteer = (data) => ({
  type: SELECT_ID_VOLUNTEER,
  payload: data,
});


// CLEAR
export const clearDataDonation = () => ({
  type: CLEAR_DATA_DONATION,
});
