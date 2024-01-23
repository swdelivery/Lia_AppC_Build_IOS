import { Branch } from "./branch";
import { Timestamp } from "./common";
import { Insurance } from "./insurance";
import { PartnerPhone } from "./partner";
import { ItemOptions, Service, ServiceOption } from "./serviceGroup";
import { MyVoucher, Voucher } from "./voucher";

export type BookingDate = {
  hour: number;
  minute: number;
  dateTime: string;
};

export type AppointmentDate = {
  from: BookingDate;
  to: BookingDate;
  _id: string;
  date: string;
};

export type BookingStatus =
  | "WAIT"
  | "WAS_CHECK_IN"
  | "WAIT_CONSULTATION"
  | "IS_CONSULTING"
  | "WAS_CONSULTED"
  | "WAIT_PROGRESS"
  | "IN_PROGRESS"
  | "COMPLETE_PROGRESS"
  | "WAS_CHECK_OUT"
  | "CANCEL";

export type BookingService = {
  promotionId: string;
  servicePromotionId: string;
  extraAmount: number;
  _id: string;
  serviceCode: string;
  originalPrice: number;
  finalPrice: number;
  options: ItemOptions[];
  service: Service;
};

export type Booking = {
  type: "DEFAULT";
  sourceCodeArr: any[];
  insuranceCodeArr: any[];
  groupCodeArr: any[];
  consultationResult: any;
  depositIdArr: any;
  currentDepositId: string;
  orderId: string;
  description: string;
  partnerCouponIdArr: string[];
  needPickUp: boolean;
  desiredFoodDrinkCodeArr: string[];
  consultantId: string;
  consultationNote: string;
  evidenceImages: any[];
  latestTreatmentQueueId: string;
  treatmentQueueIdArr: string[];
  treatmentDetailIdArr: string[];
  isFirstBooking: boolean;
  isNoAppointment: boolean;
  status: BookingStatus;
  isConfirmReferral: boolean;
  isActive: boolean;
  userCreate: string;
  createdBy: string;
  userUpdate: string;
  isDelete: boolean;
  _id: string;
  treatmentDoctorIdArr: string[];
  assignedDoctorCodeArr: string[];
  partnerId: string;
  branchCode: string;
  code: string;
  partnerName: string;
  partnerPhoneNumber: string;
  __v: string;
  referralCode: string;
  queueConsultation: any;
  order: any;
  deposits: any[];
  latestTreatmentQueue: any;
  desiredFoodDrinkArr: any[];
  id: string;
  totalAmount: number;
  serviceNeedCareCodeArr: string[];
  services: BookingService[];
  servicesNeedCare: Service[];
  branch: Branch;
  appointmentDateArr: AppointmentDate;
  consultationInfo: {
    groups: any[];
    tags: any[];
    consultedServices: Service[];
    acceptedServices: Service[];
  };
  appointmentDateFinal: AppointmentDate;
  partnerPhone: PartnerPhone;
  checkInAt: string;
  startConsultationAt: string;
  completeConsultationAt: string;
  startProgressAt: string;
  completeProgressAt: string;
  checkOutAt: string;
  cancelAt: string;
  partnerCoupons: MyVoucher[];
  insuranceArr: Insurance[];
  insurances: {
    finalPrice: 4000000;
    timeNumber: number;
    _id: string;
    insuranceCode: string;
    type: "year";
    insurance: Insurance;
  }[];

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

export type TimeForBooking = {
  _id: string;
  from: string;
  to: string;
  time: {
    hour: string;
    minute: string;
  };
};
