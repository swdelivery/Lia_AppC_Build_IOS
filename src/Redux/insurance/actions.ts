import { generateActionsGroup } from "@Redux/helper";
import { GET_INSURANCE_LIST, LOAD_MORE_INSURANCE_LIST } from "./types";

export const getInsuranceList = generateActionsGroup(GET_INSURANCE_LIST);

export const loadMoreInsuranceList = generateActionsGroup(
  LOAD_MORE_INSURANCE_LIST
);
