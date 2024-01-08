import { generateActionTypes } from "@Redux/helper";

export const GET_PRODUCTS = generateActionTypes("@product/get-products");

export const LOAD_MORE_PRODUCTS = generateActionTypes(
  "@product/load-more-products"
);
