import { generateActionTypes } from "@Redux/helper";

// GET
export const GET_LIST_CAMPAIN = generateActionTypes("@charity/get-list-campain");
export const GET_DETAIL_CAMPAIN = generateActionTypes("@charity/get-detail-campain");
export const GET_LIST_COMPANION_REQUEST = generateActionTypes("@charity/get-list-companion-request");

// // SELECT
export const SELECT_CAMPAIN = "@charity/select-campain"

// CREATE
export const CREATE_VOLUNTEER_COMPANION = generateActionTypes("@charity/create-volunteer-companion");
