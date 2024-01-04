import { generateActionTypes } from "@Redux/helper";

export const GET_MY_COUPONS = generateActionTypes("@user/get-my-coupons");

export const LOAD_MORE_MY_COUPONS = generateActionTypes(
  "@user/load-more-my-coupons"
);

export const GET_MY_BOOKING = generateActionTypes("@user/get-my-booking");

export const LOAD_MORE_MY_BOOKING = generateActionTypes(
  "@user/load-more-my-booking"
);

export const GET_BOOKING_DETAILS = generateActionTypes(
  "@user/booking/get-booking-details"
);

export const GET_TREATMENT_SERVICES = generateActionTypes(
  "@user/booking/get-treatment-services"
);

export const GET_PAYMENT_REQUEST = generateActionTypes(
  "@user/booking/get-payment-request"
);

export const GET_BOOKING_DEPOSITS = generateActionTypes(
  "@user/booking/get-booking-deposits"
);

export const GET_ORDER_DETAILS = generateActionTypes(
  "@user/booking/get-order-details"
);

export const GET_ORDER_PAYMENTS = generateActionTypes(
  "@user/booking/get-order-payments"
);

export const CANCEL_PARTNER_BOOKING = generateActionTypes(
  "@user/cancel-partner-booking"
);

export type GetTreatmentServicesParams = {
  bookingId: string;
};
