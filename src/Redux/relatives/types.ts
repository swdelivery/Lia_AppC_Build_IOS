import { generateActionTypes } from "@Redux/helper";

// GET
export const GET_LIST_PARTNER_RELATIVE = generateActionTypes(
  "@relatives/get-list-partner-relative"
);

// POST
export const CREAT_PARTNER_RELATIVE = generateActionTypes(
  "@relatives/create-partner-relative"
);

// PUT
export const UPDATE_PARTNER_RELATIVE = generateActionTypes(
  "@relatives/update-partner-relative"
);

// DELETE
export const DELETE_PARTNER_RELATIVE = generateActionTypes(
  "@relatives/delete-partner-relative"
);
