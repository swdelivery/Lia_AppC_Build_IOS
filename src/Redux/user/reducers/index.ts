import { Action, AnyAction, Reducer, combineReducers } from "redux";
import myVouchers from "./myVouchers";
import myBooking from "./myBooking";
import bookingDetails from "./bookingDetails";
import treatmentServices from "./treatmentServices";
import bookingDeposits from "./bookingDeposits";
import paymentRequests from "./paymentRequests";
import orderDetails from "./orderDetails";
import orderPayments from "./orderPayments";
import { resettableReducer } from "@Redux/resettableReducer";
import { GET_BOOKING_DETAILS } from "../types";

export function resetable<S, A extends Action = AnyAction>(
  originalReducer: Reducer<S, A>
): Reducer<S, A> {
  return resettableReducer(GET_BOOKING_DETAILS.REQUEST, originalReducer);
}

export default combineReducers({
  myVouchers,
  myBooking,
  bookingDetails,
  treatmentServices: resetable(treatmentServices),
  bookingDeposits: resetable(bookingDeposits),
  paymentRequests: resetable(paymentRequests),
  orderDetails: resetable(orderDetails),
  orderPayments: resetable(orderPayments),
});
