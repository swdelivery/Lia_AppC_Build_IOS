import { Branch } from "./branch";
import { Timestamp } from "./common";
import { PartnerPhone } from "./partner";
import { Service } from "./serviceGroup";
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
  | "WAIT_CONSULTATION"
  | "IS_CONSULTING"
  | "WAS_CONSULTED"
  | "IN_PROGRESS"
  | "COMPLETE_PROGRESS"
  | "WAS_CHECK_OUT"
  | "CANCEL";

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
  services: Service[];
  __v: string;
  referralCode: string;
  queueConsultation: any;
  order: any;
  deposits: any[];
  latestTreatmentQueue: any;
  desiredFoodDrinkArr: any[];
  id: string;
  serviceNeedCareCodeArr: string[];
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
} & Timestamp;

export type TimeForBooking = {
  _id: string,
  from: string,
  to: string,
  time: {
    hour: string,
    minute: string
  }
}
