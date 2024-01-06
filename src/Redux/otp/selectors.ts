import { AppState } from "@Redux/Reducers/RootReducer";

export const getStateResendOTP = (state: AppState) => state.otp.resendOTP

export const getStateVerifyOtpAccountPartner = (state: AppState) => state.otp.verifyOTPAccountPartner

export const getStateRequestResetPass = (state: AppState) => state.otp.requestResetPass

export const getStateVerifyOtpResetPass = (state: AppState) => state.otp.verifyOTPResetPass

export const getStateChangePass = (state: AppState) => state.otp.changePass
