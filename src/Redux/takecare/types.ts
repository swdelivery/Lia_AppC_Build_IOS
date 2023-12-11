import { generateActionTypes } from "@Redux/helper";

// GET
export const GET_LIST_PARTNER_TREATMENT = generateActionTypes("@takecare/get-list-partner-treatment");
export const GET_LIST_POSTOPERATIVE = generateActionTypes("@takecare/get-list-postoperative");

// PUT
export const UPDATE_DAILY_DIARY = generateActionTypes("@takecare/update-daily-diary");

// CLEAR
export const CLEAR_LIST_POSTOPERATIVE = generateActionTypes("@takecare/clear-list-postoperative");
