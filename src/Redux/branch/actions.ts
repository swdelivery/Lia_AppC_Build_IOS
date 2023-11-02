import { generateActionsGroup } from "@Redux/helper";
import {
  GET_BRANCH_DETAILS,
  GET_BRANCH_LIST,
  LOAD_MORE_BRANCH_LIST,
} from "./types";
import { DataPagingPayload } from "@typings/api";
import { Branch } from "@typings/branch";

export const getBranchList = generateActionsGroup<
  void,
  DataPagingPayload<Branch[]>
>(GET_BRANCH_LIST);

export const loadMoreBranchList = generateActionsGroup<
  void,
  DataPagingPayload<Branch[]>
>(LOAD_MORE_BRANCH_LIST);

export const getBranchDetails = generateActionsGroup(GET_BRANCH_DETAILS);
