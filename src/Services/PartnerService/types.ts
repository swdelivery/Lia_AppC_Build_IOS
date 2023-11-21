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

export type GetTreatmentDetailsPayload = {
  bookingId: Condition;
};

export type GetPartnerConversationsPayload = {
  condition: {
    latestMessageTime: {
      from: string;
      to: string;
    };
    after?: string;
  };
  search?: string;
};
