import { generateActionsGroup } from "@Redux/helper";
import {
  GET_LIST_SERVICE_FILTER,
  SELECT_SERVICE_COUPON,
  SELECT_SERVICE_PARENT_CODE_GROUP,
  SELECT_SERVICE_AVERAGERATING,
  SELECT_SERVICE_MOST_POPULAR,
  SELECT_SERVICE_SORT_PRICE,
  GET_DATA_FOR_MODAL_FILTER_SERVICE,
  SELECT_SERVICE_CHILD_CODE_GROUP,
  SELECT_SERVICE_LOCATION,
  SELECT_SERVICE_BRANCH_GROUP,
  SELECT_SERVICE_RANGE_PRICE,
  SELECT_SERVICE_UTILITIES,
  SELECT_SERVICE_SEARCHING,
  CLEAR_SERVICE_DATA_FILTER
} from "./types";
import { ApiResponse } from "@typings/api";
import { Service } from "@typings/serviceGroup";

// GET
export const getListServiceFilter = generateActionsGroup<
  any,
  ApiResponse<Service[]>
>(GET_LIST_SERVICE_FILTER);

export const getDataForModalFilterService = generateActionsGroup<
  any,
  ApiResponse<any>
>(GET_DATA_FOR_MODAL_FILTER_SERVICE);

// SELECT
export const selectServiceParentCodeGroup = (data) => ({
  type: SELECT_SERVICE_PARENT_CODE_GROUP,
  payload: data,
});
export const selectServiceCoupon = () => ({
  type: SELECT_SERVICE_COUPON,
});
export const selectServiceAverageRating = () => ({
  type: SELECT_SERVICE_AVERAGERATING,
});
export const selectServiceMostPopular = (data = null) => ({
  type: SELECT_SERVICE_MOST_POPULAR,
  payload: data
});
export const selectServiceSortPrice = (data) => ({
  type: SELECT_SERVICE_SORT_PRICE,
  payload: data
});
export const selectServiceChildCodeGroup = (data) => ({
  type: SELECT_SERVICE_CHILD_CODE_GROUP,
  payload: data,
});
export const selectServiceLocation = (data) => ({
  type: SELECT_SERVICE_LOCATION,
  payload: data,
});
export const selectServiceBranchGroup = (data) => ({
  type: SELECT_SERVICE_BRANCH_GROUP,
  payload: data,
});
export const selectServiceRangePrice = (data) => ({
  type: SELECT_SERVICE_RANGE_PRICE,
  payload: data,
});
export const selectServiceUtilities = (data) => ({
  type: SELECT_SERVICE_UTILITIES,
  payload: data,
});
export const selectServiceSearching = (data) => ({
  type: SELECT_SERVICE_SEARCHING,
  payload: data,
});

// CLEAR
export const clearServiceDataFilter = () => ({
  type: CLEAR_SERVICE_DATA_FILTER,
});
