import { generateActionsGroup } from "@Redux/helper";
import { ApiResponse } from "@typings/api";
import { ExaminationResult } from "@typings/examinationResult";
import { GET_DETAIL_EXAMINATION_RESULT, GET_LIST_EXAMINATION_RESULTS } from "./types";

// GET
export const getListExaminationResults = generateActionsGroup<
  any,
  ApiResponse<ExaminationResult[]>
>(GET_LIST_EXAMINATION_RESULTS);

export const getDetailExaminationResult = generateActionsGroup<
  any,
  ApiResponse<ExaminationResult>
>(GET_DETAIL_EXAMINATION_RESULT);
