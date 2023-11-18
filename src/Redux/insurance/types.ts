import { generateActionTypes } from "@Redux/helper";

export const GET_INSURANCE_LIST = generateActionTypes("@insurance/get-list");

export const LOAD_MORE_INSURANCE_LIST = generateActionTypes(
  "@insurance/load-more-list"
);
