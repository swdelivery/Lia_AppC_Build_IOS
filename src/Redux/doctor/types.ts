import { generateActionTypes } from "@Redux/helper";

export const GET_DOCTOR_LIST = generateActionTypes("@doctor/get-doctor-list");

export const LOAD_MORE_DOCTOR_LIST = generateActionTypes(
  "@doctor/load-more-doctor-list"
);

export const GET_DOCTOR_DETAILS = generateActionTypes(
  "@doctor/get-doctor-details"
);

export const SELECT_DOCTOR = "@doctor/select-doctor";

export const GET_DOCTOR_DIARIES = generateActionTypes(
  "@doctor/get-doctor-diaries"
);

export const GET_DOCTOR_REVIEWS = generateActionTypes(
  "@doctor/get-doctor-reviews"
);

export type GetDoctorDiariesParams = {
  doctorId: string;
};

export type GetDoctorReviewsParams = {
  doctorCode: string;
};
