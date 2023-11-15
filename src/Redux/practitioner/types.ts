import { generateActionTypes } from "@Redux/helper";

export const GET_PRACTITIONER_LIST = generateActionTypes("@practitioner/get-practitioner-list");

export const LOAD_MORE_PRACTITIONER_LIST = generateActionTypes(
  "@practitioner/load-more-practitioner-list"
);
