import { generateActionsGroup } from "@Redux/helper";
import {
  GET_BRANCH_DETAILS,
  GET_BRANCH_DIARY,
  GET_BRANCH_DOCTORS,
  GET_BRANCH_LIST,
  GET_BRANCH_REVIEWS,
  GetBranchDiaryParams,
  GetBranchDoctorsParams,
  GetBranchReviewsParams,
  LOAD_MORE_BRANCH_LIST,
  SELECT_BRANCH,
} from "./types";
import { DataPagingPayload } from "@typings/api";
import { Branch } from "@typings/branch";
import { Doctor } from "@typings/doctor";
import { Review } from "@typings/review";
import { Diary } from "@typings/diary";

export const getBranchList = generateActionsGroup<
  void,
  DataPagingPayload<Branch[]>
>(GET_BRANCH_LIST);

export const loadMoreBranchList = generateActionsGroup<
  void,
  DataPagingPayload<Branch[]>
>(LOAD_MORE_BRANCH_LIST);

export const selectBranch = (branch: Branch) => ({
  type: SELECT_BRANCH,
  payload: branch,
});

export const getBranchDetails = generateActionsGroup(GET_BRANCH_DETAILS);

export const getBranchDoctors = generateActionsGroup<
  GetBranchDoctorsParams,
  Doctor[]
>(GET_BRANCH_DOCTORS);

export const getBranchReviews = generateActionsGroup<
  GetBranchReviewsParams,
  Review[]
>(GET_BRANCH_REVIEWS);

export const getBranchDiary = generateActionsGroup<
  GetBranchDiaryParams,
  Diary[]
>(GET_BRANCH_DIARY);