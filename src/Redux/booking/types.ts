import { generateActionTypes } from "@Redux/helper";


export const OPEN_MODAL_ADD_SERVICE_TO_BOOKING = "@booking/open-modal-add-service-to-booking";

// SELECT
export const SELECT_BRANCH = "@booking/select-branch";
export const SELECT_DOCTOR = "@booking/select-doctor";
export const SELECT_PRACTITIONER = "@booking/select-practitioner";
export const SELECT_DATE = "@booking/select-date";
export const SELECT_TIME = "@booking/select-time";
export const SELECT_SERVICES = "@booking/select-services";
export const REMOVE_SERVICE = "@booking/remove-service";
export const SELECT_COUPON = "@booking/select-coupon";
export const SELECT_INSURANCE = "@booking/select-insurance";
export const SELECT_DESCRIPTION = "@booking/select-description";

// CLEAR
export const CLEAR_DOCTOR = "@booking/clear-doctor";
export const CLEAR_PRACTITIONER = "@booking/clear-practitioner";
export const CLEAR_COUPON = "@booking/clear-coupon";
export const CLEAR_DATA_CREATE_BOOKING = "@booking/clear-data-create-booking";

// GET
export const GET_BRANCH_LIST_FOR_BOOKING = generateActionTypes(
  "@booking/get-branch-list-for-booking"
);
export const GET_DOCTOR_LIST_BY_BRANCH_CODE = generateActionTypes(
  "@booking/get-doctors-by-branch-code"
);
export const GET_PRACTITIONER_LIST_BY_BRANCH_CODE = generateActionTypes(
  "@booking/get-practitioners-by-branch-code"
);
export const GET_LIST_SERVICE_FILTER = generateActionTypes(
  "@booking/get-list-service-filter"
);

// POST
export const CREAT_PARTNER_BOOKING = generateActionTypes(
  "@booking/create-partner-booking"
);

export const RESET_DATA = "@booking/reset-data";

export type GetDoctorListByBranchCodeParams = {
  branchCode: string;
};

export type GetPractitionerListByBranchCodeParams = {
  branchCode: string;
};

export type GetListServiceForBookingParams = {
  treatmentDoctorCode?: string;
  practitionerCode: string;
  branchCode: string;
};
