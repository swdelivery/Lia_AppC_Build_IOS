import { generateActionTypes } from "@Redux/helper";

export const GET_VOUCHERS = generateActionTypes("@coupon/get-list");

export const LOAD_MORE_VOUCHERS = generateActionTypes("@coupon/load-more-list");

export const TAKE_VOUCHER = generateActionTypes("@coupon/take-voucher");

export type TakeVoucherParams = {
  partnerId: string;
  couponCode: string;
};
