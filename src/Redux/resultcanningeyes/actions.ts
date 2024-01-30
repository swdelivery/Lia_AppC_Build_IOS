import { generateActionsGroup } from "@Redux/helper";
import { ApiResponse } from "@typings/api";
import { EyeLabel } from "@typings/resultScanningEyes";
import {
  GET_BRANCHS,
  GET_DOCTORS,
  GET_EYE_LABEL,
  GET_SERVICES,
  GET_SERVICES_RECOMMEND,
  SAVE_RESULT,
} from "./types";
import { Service } from "@typings/serviceGroup";

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

export const getServicesRecommendByLabelCodes = generateActionsGroup<
  any,
  ApiResponse<Service[]>
>(GET_SERVICES_RECOMMEND);
