import { generateActionTypes } from "@Redux/helper";

export const SAVE_RESULT = "@resultcanningeyes/save-result";
export const GET_SERVICES = generateActionTypes("@resultcanningeyes/get-services");
export const GET_DOCTORS = generateActionTypes("@resultcanningeyes/get-doctors");
export const GET_BRANCHS = generateActionTypes("@resultcanningeyes/get-branchs");
export const GET_EYE_LABEL = generateActionTypes("@resultcanningeyes/get-eye-label");

