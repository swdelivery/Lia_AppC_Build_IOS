import { AppState } from "../Reducers/RootReducer";

export const getCurrBookingForCheckinState = (state: AppState) => state.qrCheckin.currBookingForCheckin;
