import { generateActionsGroup } from "@Redux/helper";
import {
  GET_DOCTOR_DETAILS,
  GET_DOCTOR_DIARIES,
  GET_DOCTOR_LIST,
  GET_DOCTOR_REVIEWS,
  GetDoctorReviewsParams,
  LOAD_MORE_DOCTOR_LIST,
  SELECT_DOCTOR,
} from "./types";
import { DataPagingPayload } from "@typings/api";
import { Doctor } from "@typings/doctor";
import { Review } from "@typings/review";

export const getDoctorList = generateActionsGroup<
  void,
  DataPagingPayload<Doctor[]>
>(GET_DOCTOR_LIST);

export const loadMoreDoctorList = generateActionsGroup(LOAD_MORE_DOCTOR_LIST);

export const getDoctorDetails = generateActionsGroup<string, Doctor>(
  GET_DOCTOR_DETAILS
);

export const selectDoctor = (doctor: Doctor) => ({
  type: SELECT_DOCTOR,
  payload: doctor,
});

export const getDoctorDiaries = generateActionsGroup(GET_DOCTOR_DIARIES);

export const getDoctorReviews = generateActionsGroup<
  GetDoctorReviewsParams,
  Review[]
>(GET_DOCTOR_REVIEWS);
