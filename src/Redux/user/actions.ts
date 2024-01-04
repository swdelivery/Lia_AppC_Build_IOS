import { generateActionsGroup } from "@Redux/helper";
import {
  CANCEL_PARTNER_BOOKING,
  GET_BOOKING_DEPOSITS,
  GET_BOOKING_DETAILS,
  GET_MY_BOOKING,
  GET_MY_COUPONS,
  GET_ORDER_DETAILS,
  GET_ORDER_PAYMENTS,
  GET_PAYMENT_REQUEST,
  GET_TREATMENT_SERVICES,
  GetTreatmentServicesParams,
  LOAD_MORE_MY_BOOKING,
  LOAD_MORE_MY_COUPONS,
} from "./types";
import { DataPagingPayload } from "@typings/api";
import { MyVoucher } from "@typings/voucher";
import { Booking } from "@typings/booking";
import { ServiceTreatment } from "@typings/treatment";
import { Order, PaymentRequest } from "@typings/payment";
import { LOG_OUT } from "@Redux/Constants/ActionType";

export const getMyCoupons = generateActionsGroup<
  void,
  DataPagingPayload<MyVoucher[]>
>(GET_MY_COUPONS);

export const loadMoreMyCoupons = generateActionsGroup<
  void,
  DataPagingPayload<MyVoucher[]>
>(LOAD_MORE_MY_COUPONS);

export const getMyBooking = generateActionsGroup<
  void,
  DataPagingPayload<Booking[]>
>(GET_MY_BOOKING);

export const loadMoreMyBooking = generateActionsGroup<
  void,
  DataPagingPayload<Booking[]>
>(LOAD_MORE_MY_BOOKING);

export const getBookingDetails = generateActionsGroup<string, Booking>(
  GET_BOOKING_DETAILS
);

export const getTreatmentServices = generateActionsGroup<
  GetTreatmentServicesParams,
  ServiceTreatment[]
>(GET_TREATMENT_SERVICES);

export const getPaymentRequest = generateActionsGroup<
  GetTreatmentServicesParams,
  PaymentRequest[]
>(GET_PAYMENT_REQUEST);

export const getBookingDeposits = generateActionsGroup<string, any>(
  GET_BOOKING_DEPOSITS
);

export const getOrderDetails = generateActionsGroup<string, Order>(
  GET_ORDER_DETAILS
);

export const getOrderPayments = generateActionsGroup<string, any>(
  GET_ORDER_PAYMENTS
);

export const cancelPartnerBooking = generateActionsGroup(
  CANCEL_PARTNER_BOOKING
);

export const logOut = () => ({
  type: LOG_OUT,
});
