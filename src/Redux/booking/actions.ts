import { generateActionsGroup } from "@Redux/helper";
import {
  OPEN_MODAL_ADD_SERVICE_TO_BOOKING,
  GET_BRANCH_LIST_FOR_BOOKING,
  GET_DOCTOR_LIST_BY_BRANCH_CODE,
  GetDoctorListByBranchCodeParams,
  SELECT_BRANCH,
  SELECT_DOCTOR,
  CLEAR_DOCTOR,
  GetPractitionerListByBranchCodeParams,
  GET_PRACTITIONER_LIST_BY_BRANCH_CODE,
  SELECT_PRACTITIONER,
  CLEAR_PRACTITIONER,
  SELECT_DATE,
  SELECT_TIME,
  GET_LIST_SERVICE_FILTER,
  SELECT_SERVICES,
  REMOVE_SERVICE,
  SELECT_COUPON,
  CLEAR_COUPON,
  SELECT_INSURANCE,
  SELECT_DESCRIPTION,
  CREAT_PARTNER_BOOKING,
  CLEAR_DATA_CREATE_BOOKING,
  GetListServiceForBookingParams,
  CHANGE_BRANCH_LIST_FOR_BOOKING_BY_SERVICE,
} from "./types";
import { Service } from "@typings/serviceGroup";
import { Review } from "@typings/review";
import { DataPagingPayload } from "@typings/api";
import { Branch } from "@typings/branch";
import { Doctor } from "@typings/doctor";
import { Practitioner } from "@typings/practitioner";

export const getBranchListForBooking = generateActionsGroup<
  void,
  DataPagingPayload<Branch[]>
>(GET_BRANCH_LIST_FOR_BOOKING);

export const getDoctorListByBranchCode = generateActionsGroup<
  GetDoctorListByBranchCodeParams,
  DataPagingPayload<Doctor[]>
>(GET_DOCTOR_LIST_BY_BRANCH_CODE);

export const getPractitionerListByBranchCode = generateActionsGroup<
  GetPractitionerListByBranchCodeParams,
  DataPagingPayload<Practitioner[]>
>(GET_PRACTITIONER_LIST_BY_BRANCH_CODE);

export const getListServiceFilter = generateActionsGroup<
  GetListServiceForBookingParams,
  Service[]
>(GET_LIST_SERVICE_FILTER);

export const createPartnerBooking = generateActionsGroup(CREAT_PARTNER_BOOKING);

export const openModalAddServiceToBooking = (data) => ({
  type: OPEN_MODAL_ADD_SERVICE_TO_BOOKING,
  payload: data,
});

// SELECT
export const selectBranch = (data) => ({
  type: SELECT_BRANCH,
  payload: data,
});
export const selectDoctor = (data) => ({
  type: SELECT_DOCTOR,
  payload: data,
});
export const selectPractitioner = (data) => ({
  type: SELECT_PRACTITIONER,
  payload: data,
});
export const selectDate = (data) => ({
  type: SELECT_DATE,
  payload: data,
});
export const selectTime = (data) => ({
  type: SELECT_TIME,
  payload: data,
});
export const selectServices = (data: Service[]) => ({
  type: SELECT_SERVICES,
  payload: data,
});
export const removeService = (data) => ({
  type: REMOVE_SERVICE,
  payload: data,
});
export const selectCoupon = (data) => ({
  type: SELECT_COUPON,
  payload: data,
});
export const selectInsurance = (data) => ({
  type: SELECT_INSURANCE,
  payload: data,
});
export const selectDescription = (data) => ({
  type: SELECT_DESCRIPTION,
  payload: data,
});

// CLEAR
export const clearDoctor = () => ({
  type: CLEAR_DOCTOR,
});
export const clearPractitioner = () => ({
  type: CLEAR_PRACTITIONER,
});
export const clearCoupon = (data) => ({
  type: CLEAR_COUPON,
  payload: data,
});
export const clearDataCreateBooking = () => ({
  type: CLEAR_DATA_CREATE_BOOKING,
});

// CHANGE
export const changeBranchListForBookingByService = (data) => ({
  type: CHANGE_BRANCH_LIST_FOR_BOOKING_BY_SERVICE,
  payload: data,
});
