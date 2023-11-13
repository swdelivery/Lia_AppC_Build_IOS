import { generateActionTypes } from "@Redux/helper";

export const GET_MY_COUPONS = generateActionTypes("@user/get-my-coupons");

export const LOAD_MORE_MY_COUPONS = generateActionTypes(
  "@user/load-more-my-coupons"
);
