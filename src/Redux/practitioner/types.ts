import { generateActionTypes } from "@Redux/helper";

export const GET_PRACTITIONER_LIST = generateActionTypes("@practitioner/get-practitioner-list");

export const LOAD_MORE_PRACTITIONER_LIST = generateActionTypes(
  "@practitioner/load-more-practitioner-list"
);

export const GET_PRACTITIONER_DETAILS = generateActionTypes(
  "@practitioner/get-practitioner-details"
);

export const SELECT_PRACTITIONER = "@practitioner/select-practitioner";

export const GET_PRACTITIONER_DIARIES = generateActionTypes(
  "@practitioner/get-practitioner-diaries"
);

export const GET_PRACTITIONER_REVIEWS = generateActionTypes(
  "@practitioner/get-practitioner-reviews"
);

export type GetPractitionerDiariesParams = {
  practitionerId: string;
};

export type GetPractitionerReviewsParams = {
  practitionerCode: string;
};
