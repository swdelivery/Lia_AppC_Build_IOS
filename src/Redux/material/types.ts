import { generateActionTypes } from "@Redux/helper";

export const GET_MATERIAL_LIST = generateActionTypes("@material/get-list");

export const LOAD_MORE_MATERIAL_LIST = generateActionTypes(
  "@material/load-more-list"
);
