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
  discountType: string;
  discountAmount: number;
  discountFor: string;
  userCreate: string;
  __v: number;
  userUpdate: string;
  isTaked: boolean;
  id: string;
  couponImg: FileAvatar;
} & Timestamp;
