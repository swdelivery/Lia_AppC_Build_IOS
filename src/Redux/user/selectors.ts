import { AppState } from "@Redux/Reducers/RootReducer";

export const getMyCouponsState = (state: AppState) => state.user.myVouchers;

export const getMyBookingState = (state: AppState) => state.user.myBooking;
