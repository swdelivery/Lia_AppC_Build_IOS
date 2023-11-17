import { generateActionTypes } from "@Redux/helper";


export const OPEN_MODAL_ADD_SERVICE_TO_BOOKING = "@booking/open-modal-add-service-to-booking";

// SELECT
export const SELECT_BRANCH = "@booking/select-branch";
export const SELECT_DOCTOR = "@booking/select-doctor";
export const SELECT_PRACTITIONER = "@booking/select-practitioner";
export const SELECT_DATE = "@booking/select-date";
export const SELECT_TIME = "@booking/select-time";

// CLEAR
export const CLEAR_DOCTOR = "@booking/clear-doctor";
export const CLEAR_PRACTITIONER = "@booking/clear-practitioner";

// GET
export const GET_BRANCH_LIST_FOR_BOOKING = generateActionTypes("@booking/get-branch-list-for-booking");
export const GET_DOCTOR_LIST_BY_BRANCH_CODE = generateActionTypes("@booking/get-doctors-by-branch-code");
export const GET_PRACTITIONER_LIST_BY_BRANCH_CODE = generateActionTypes("@booking/get-practitioners-by-branch-code");


export type GetDoctorListByBranchCodeParams = {
  branchCode: string
};

export type GetPractitionerListByBranchCodeParams = {
  branchCode: string
};
