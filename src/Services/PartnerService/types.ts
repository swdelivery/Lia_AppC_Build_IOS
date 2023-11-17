import { Condition } from "../types";

export type GetDoctorListPayload = {
  branchCode?: Condition;
};

export type GetPractitionerListPayload = {
  branchCode?: Condition;
};

export type GetReviewsPayload = {
  branchCode?: Condition;
  doctorCode?: Condition;
  serviceCode?: Condition;
  practitionerCode?: Condition;
};

export type GetDiaryPayload = {
  branchCode?: Condition;
  doctorId?: Condition;
  practitionerId?: Condition;
};

export type GetServicesPayload = {
  codeGroup: Condition;
};
