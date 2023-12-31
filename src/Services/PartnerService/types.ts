import { Condition } from "../types";

export type GetDoctorListPayload = {
  branchCode?: Condition;
};

export type GetReviewsPayload = {
  branchCode?: Condition;
  doctorCode?: Condition;
};

export type GetDiaryPayload = {
  branchCode?: Condition;
  doctorId?: Condition;
};