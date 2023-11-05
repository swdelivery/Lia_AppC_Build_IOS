import { generateActionTypes } from "@Redux/helper";

export const GET_BRANCH_LIST = generateActionTypes("@branch/get-list");

export const LOAD_MORE_BRANCH_LIST = generateActionTypes(
  "@branch/load-more-list"
);

export const SELECT_BRANCH = "@branch/select-branch";

export const GET_BRANCH_DETAILS = generateActionTypes("@branch/get-details");

export const GET_BRANCH_DOCTORS = generateActionTypes("@branch/get-doctors");

export const GET_BRANCH_REVIEWS = generateActionTypes("@branch/get-reviews");

export type GetBranchDoctorsParams = {
  branchCode: string;
};

export type GetBranchReviewsParams = {
  branchCode: string;
};