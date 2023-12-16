import { generateActionTypes } from "@Redux/helper";

// GET
export const GET_LIST_SERVICE_FILTER = generateActionTypes("@category/get-list-service-filter");
export const GET_DATA_FOR_MODAL_FILTER_SERVICE = generateActionTypes("@category/get-data-for-modal-filter-service");

// SELECT
export const SELECT_SERVICE_PARENT_CODE_GROUP = "@category/select-service-parent-code-group"
export const SELECT_SERVICE_COUPON = "@category/select-service-coupon"
export const SELECT_SERVICE_AVERAGERATING = "@category/select-service-averageRating"
export const SELECT_SERVICE_MOST_POPULAR = "@category/select-service-most-popular"
export const SELECT_SERVICE_SORT_PRICE = "@category/select-service-sort-price"
export const SELECT_SERVICE_CHILD_CODE_GROUP = "@category/select-service-child-code-group"
export const SELECT_SERVICE_LOCATION = "@category/select-service-location"
export const SELECT_SERVICE_BRANCH_GROUP = "@category/select-service-branch-group"
export const SELECT_SERVICE_RANGE_PRICE = "@category/select-service-range-price"
export const SELECT_SERVICE_UTILITIES = "@category/select-service-utilities"
export const SELECT_SERVICE_SEARCHING = "@category/select-service-searching"

// CLEAR
export const CLEAR_SERVICE_DATA_FILTER = "@category/clear-service-data-filter"
