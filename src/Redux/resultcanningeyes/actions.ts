import { generateActionsGroup } from "@Redux/helper";
import { GET_BRANCHS, GET_DOCTORS, GET_SERVICES } from "./types";

export const getServicesByResEye = generateActionsGroup(GET_SERVICES);
export const getDoctorsByResEye = generateActionsGroup(GET_DOCTORS)
export const getBranchsByResEye = generateActionsGroup(GET_BRANCHS)
