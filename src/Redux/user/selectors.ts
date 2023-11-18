import { AppState } from "@Redux/Reducers/RootReducer";

export const getMyCouponsState = (state: AppState) => state.user.myVouchers;

export const getMyBookingState = (state: AppState) => state.user.myBooking;

export const getBookingDetailsState = (state: AppState) =>
  state.user.bookingDetails;

export const getTreatmentServicesState = (state: AppState) =>
  state.user.treatmentServices;

export const getBookingDepositsState = (state: AppState) =>
  state.user.bookingDeposits;

export const getPaymentRequestsState = (state: AppState) =>
  state.user.paymentRequests;

export const getOrderDetailsState = (state: AppState) =>
  state.user.orderDetails;

export const getOrderPaymentState = (state: AppState) =>
  state.user.orderPayments;
