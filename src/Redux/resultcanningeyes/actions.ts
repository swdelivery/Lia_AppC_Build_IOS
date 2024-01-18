import { generateActionsGroup } from "@Redux/helper";
import { ApiResponse } from "@typings/api";
import { EyeLabel } from "@typings/resultScanningEyes";
import {
  GET_BRANCHS,
  GET_DOCTORS,
  GET_EYE_LABEL,
  GET_SERVICES,
  SAVE_RESULT,
} from "./types";

export const saveResult = (payload: any) => ({
  type: SAVE_RESULT,
  payload,
});

export const getServicesByResEye = generateActionsGroup(GET_SERVICES);
export const getDoctorsByResEye = generateActionsGroup(GET_DOCTORS)
export const getBranchsByResEye = generateActionsGroup(GET_BRANCHS)

export const getEyeLabel = generateActionsGroup<
  any,
  ApiResponse<EyeLabel[]>
>(GET_EYE_LABEL);
