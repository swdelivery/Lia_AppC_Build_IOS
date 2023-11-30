import { generateActionsGroup } from "@Redux/helper";
import { CREAT_PARTNER_RELATIVE, DELETE_PARTNER_RELATIVE, GET_LIST_PARTNER_RELATIVE, UPDATE_PARTNER_RELATIVE } from "./types";


export const getListPartnerRelative = generateActionsGroup(GET_LIST_PARTNER_RELATIVE);
export const createPartnerRelative = generateActionsGroup(CREAT_PARTNER_RELATIVE);
export const updatePartnerRelative = generateActionsGroup(UPDATE_PARTNER_RELATIVE);
export const deletePartnerRelative = generateActionsGroup(DELETE_PARTNER_RELATIVE);
