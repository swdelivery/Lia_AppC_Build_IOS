import { generateActionsGroup } from "@Redux/helper";
import { GET_INSURANCE_LIST, LOAD_MORE_INSURANCE_LIST } from "./types";
import { DataPagingPayload } from "@typings/api";
import { Insurance } from "@typings/insurance";

export const getInsuranceList = generateActionsGroup<
  void,
  DataPagingPayload<Insurance[]>
>(GET_INSURANCE_LIST);

export const loadMoreInsuranceList = generateActionsGroup<
  void,
  DataPagingPayload<Insurance[]>
>(LOAD_MORE_INSURANCE_LIST);
