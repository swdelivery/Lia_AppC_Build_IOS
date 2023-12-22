import { generateActionTypes } from "@Redux/helper";

// GET
export const GET_LIST_CAMPAIN = generateActionTypes("@charity/get-list-campain");
export const SEARCH_CAMPAIN = generateActionTypes("@charity/search-campain");
export const GET_DETAIL_CAMPAIN = generateActionTypes("@charity/get-detail-campain");
export const GET_LIST_COMPANION_REQUEST = generateActionTypes("@charity/get-list-companion-request");
export const GET_LIST_COMPANION_REQUEST_ACCEPT = generateActionTypes("@charity/get-list-companion-request-accept");
export const GET_LIST_COMPANION_BY_USER = generateActionTypes("@charity/get-list-companion-by-user");
export const GET_VOLUNTEER_HISTORY = generateActionTypes("@charity/get-volunteer-history");
export const GET_TOP_DONATE = generateActionTypes("@charity/get-top-donate");
export const GET_LIST_PARTNER_DONATE_TO_VOLUNTEER_COMPANION = generateActionTypes("@charity/get-list-partner-donate-to-volunteer-companion");
export const GET_LIST_PARTNER_DONATE_TO_VOLUNTEER = generateActionTypes("@charity/get-list-partner-donate-to-volunteer");
export const GET_VOLUNTEER_REPORT_HISTORY_FILTER = generateActionTypes("@charity/get-volunteer-report-history-filter");

// // SELECT
export const SELECT_CAMPAIN = "@charity/select-campain"
export const SELECT_VOLUNTEER_ID = "@charity/select-volunteer-id"
export const SELECT_PAYMENT_METHOD_CODE = "@charity/select-payment-method-code"
export const SELECT_AMOUNT = "@charity/select-amount"
export const SELECT_HIDE_NAME = "@charity/select-hide-name"
export const SELECT_DESCRIPTION = "@charity/select-description"
export const SELECT_IMAGE = "@charity/select-image"
export const SELECT_SEARCH_VALUE = "@charity/select-search-value"
export const SELECT_DATE_FORM = "@charity/select-date-from"
export const SELECT_DATE_TO = "@charity/select-date-to"
export const SELECT_PAYMENT_METHOD = "@charity/select-payment-method"
export const SELECT_DEPOSIT = "@charity/select-deposit"
export const SELECT_ID_VOLUNTEER = "@charity/select-id-volunteer"

// CREATE
export const CREATE_VOLUNTEER_COMPANION = generateActionTypes("@charity/create-volunteer-companion");
export const CREATE_VOLUNTEER_DONATE = generateActionTypes("@charity/create-volunteer-donate");
export const CREATE_VOLUNTEER_COMPANION_DONATE = generateActionTypes("@charity/create-volunteer-companion-donate");

// CLEAR
export const CLEAR_DATA_DONATION = "@charity/clear-data-donation"
