import { generateActionsGroup } from "@Redux/helper";
import { ApiResponse } from "@typings/api";
import { Campain, CompanionRequest } from "@typings/charity";
import { CREATE_VOLUNTEER_COMPANION, GET_DETAIL_CAMPAIN, GET_LIST_CAMPAIN, GET_LIST_COMPANION_REQUEST, SELECT_CAMPAIN } from "./types";

// POST
export const createVolunteerCompanion = generateActionsGroup<
  any,
  ApiResponse<any>
>(CREATE_VOLUNTEER_COMPANION);

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
