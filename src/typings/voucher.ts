import { FileAvatar, Timestamp } from "./common";

export type Voucher = {
  description: string;
  maxAmountDiscount: number;
  usage: number;
  limit: number;
  expiredAt: string;
  minRequiredOrderAmount: number;
  isActive: boolean;
  isDelete: boolean;
  content: string;
  _id: string;
  couponType: string;
  name: string;
  code: string;
  discountType: "percent" | "fixed";
  discountAmount: number;
  discountFor: string;
  userCreate: string;
  __v: number;
  userUpdate: string;
  isTaked: boolean;
  id: string;
  couponImg: FileAvatar;
} & Timestamp;

export type MyVoucher = {
  linkedOrderId: number;
  usedAt: string;
  isAutoGen: boolean;
  isActive: boolean;
  isDelete: boolean;
  _id: string;
  uniqueKey: string;
  couponCode: string;
  partnerId: string;
  coupon: Voucher;
  status: string;
} & Timestamp;
