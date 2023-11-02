import { generateActionTypes } from "@Redux/helper";

export const GET_BRANCH_LIST = generateActionTypes("@branch/get-list");

export const LOAD_MORE_BRANCH_LIST = generateActionTypes(
  "@branch/load-more-list"
);

export const GET_BRANCH_DETAILS = generateActionTypes("@branch/get-details");

export type GetBranchListParams = {};