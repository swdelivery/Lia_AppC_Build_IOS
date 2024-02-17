import { generateActionsGroup } from "@Redux/helper";
import { GET_DOCTOR_LIST, LOAD_MORE_DOCTOR_LIST } from "./types";
import { DataPagingPayload } from "@typings/api";
import { Doctor } from "@typings/doctor";

export const getDoctorList = generateActionsGroup<
  void,
  DataPagingPayload<Doctor[]>
>(GET_DOCTOR_LIST);

export const loadMoreDoctorList = generateActionsGroup<
  void,
  DataPagingPayload<Doctor[]>
>(LOAD_MORE_DOCTOR_LIST);
