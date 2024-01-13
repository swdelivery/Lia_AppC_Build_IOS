import { BookingService } from "./booking";
import { Branch } from "./branch";
import { FileAvatar, Timestamp } from "./common";
import { Insurance } from "./insurance";
import { Partner } from "./partner";
import { Service } from "./serviceGroup";
import { MyVoucher } from "./voucher";

export type Currency = {
  exchangeRate: number;
  isActive: boolean;
  isDelete: boolean;
  _id: string;
  code: "VND";
  name: string;
  __v: string;
  id: string;
} & Timestamp;

export type PaymentMethodCode = "CARDTRANSFER" | "WALLETTRANSFER" | "CASH";

export type PaymentMethod = {
  isActive: boolean;
  isDelete: boolean;
  _id: string;
  code: PaymentMethodCode;
  name: string;
  __v: string;
  id: string;
} & Timestamp;

export type PaymentRequest = {
  bookingId: string;
  orderId: string;
  socialProjectId: string;
  amount: number;
  isRefund: boolean;
  description: string;
  status: "WAIT";
  paymentId: string;
  paymentIdArr: string[];
  depositId: string;
  descriptionResult: string;
  confirmImgArr: any[];
  isDelete: boolean;
  _id: string;
  paymentFor: "WALLET";
  methodCode: PaymentMethodCode;
  currencyCode: "VND";
  code: string;
  partnerId: string;
  __v: string;
  id: string;
  currency: Currency;
  images: FileAvatar[];

  paymentRequestId: string;
  exchangeRate: number;
  branchCode: string;
  paymentSource: "PARTNER";
  userCreate: string;
  creater: {
    _id: string;
    employeeCode: string;
    profile: {
      _id: string;
      code: string;
      firstName: string;
      lastName: string;
      id: string;
    };
    id: string;
  };
  method: PaymentMethod;
  branch: Branch;
  partner: Partner;
} & Timestamp;

export type Deposit = {};

export type Order = {
  totalAmount: number;
  depositIdArr: string[];
  totalAmountDeposit: number;
  totalRefundDeposit: number;
  totalAmountPayment: number;
  totalRefundPayment: number;
  totalRefundPaymentDeposit: number;
  remainingAmount: number;
  isConfirm: boolean;
  startPaymentAt: string;
  completePaymentAt: string;
  status: "CONFIRMED";
  type: "SERVICE";
  source: "CONSULTANT";
  partnerCouponIdArr: string[];
  isActive: boolean;
  isDelete: boolean;
  _id: string;
  bookingId: string;
  partnerId: string;
  branchCode: string;
  code: string;
  userCreate: string;
  createdBy: string;
  __v: string;
  userUpdate: string;
  referralPartnerId: string;
  firstTreatmentAt: string;
  deposits: Deposit[];
  finalAmountDeposit: number;
  paidAmount: number;
  id: string;
  services: BookingService[];
  insurances: {
    finalPrice: 4000000;
    timeNumber: number;
    _id: string;
    insuranceCode: string;
    type: "year";
    insurance: Insurance;
  }[];
  partnerCoupons: MyVoucher[];
  partnerLevelPromotion: {
    point: number;
    description: string;
    discountRetailService: number;
    discountComboService: number;
    discountFriend: number;
    commissionRate: number;
    indirectCommissionRate: number;
    code: string;
    name: string;
    id: string;
  };
} & Timestamp;
