import { generateActionsGroup } from "@Redux/helper";
import { ApiResponse } from "@typings/api";
import { Campain, CompanionRequest } from "@typings/charity";
import {
  CREATE_VOLUNTEER_COMPANION,
  CREATE_VOLUNTEER_DONATE,
  GET_DETAIL_CAMPAIN,
  GET_LIST_CAMPAIN,
  GET_LIST_COMPANION_REQUEST,
  SELECT_AMOUNT,
  SELECT_CAMPAIN,
  SELECT_DESCRIPTION,
  SELECT_HIDE_NAME,
  SELECT_IMAGE,
  SELECT_PAYMENT_METHOD_CODE,
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
