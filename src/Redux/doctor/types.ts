import { generateActionTypes } from "@Redux/helper";

export const GET_DOCTOR_LIST = generateActionTypes("@doctor/get-doctor-list");

export const LOAD_MORE_DOCTOR_LIST = generateActionTypes(
  "@doctor/load-more-doctor-list"
);

