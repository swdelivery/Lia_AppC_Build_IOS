import { generateActionTypes } from "@Redux/helper";

// GET
export const GET_LIST_CAMPAIN = generateActionTypes("@charity/get-list-campain");
export const SEARCH_CAMPAIN = generateActionTypes("@charity/search-campain");
export const GET_DETAIL_CAMPAIN = generateActionTypes("@charity/get-detail-campain");
export const GET_LIST_COMPANION_REQUEST = generateActionTypes("@charity/get-list-companion-request");
export const GET_LIST_COMPANION_REQUEST_ACCEPT = generateActionTypes("@charity/get-list-companion-request-accept");
export const GET_LIST_COMPANION_BY_USER = generateActionTypes("@charity/get-list-companion-by-user");
export const GET_VOLUNTEER_HISTORY = generateActionTypes("@charity/get-volunteer-history");

// // SELECT
export const SELECT_CAMPAIN = "@charity/select-campain"
export const SELECT_VOLUNTEER_ID = "@charity/select-volunteer-id"
export const SELECT_PAYMENT_METHOD_CODE = "@charity/select-payment-method-code"
export const SELECT_AMOUNT = "@charity/select-amount"
export const SELECT_HIDE_NAME = "@charity/select-hide-name"
export const SELECT_DESCRIPTION = "@charity/select-description"
export const SELECT_IMAGE = "@charity/select-image"

// CREATE
export const CREATE_VOLUNTEER_COMPANION = generateActionTypes("@charity/create-volunteer-companion");
export const CREATE_VOLUNTEER_DONATE = generateActionTypes("@charity/create-volunteer-donate");
