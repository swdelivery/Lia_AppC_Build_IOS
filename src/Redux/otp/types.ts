import { generateActionTypes } from "@Redux/helper";

export const REQUEST_OTP_RESET_PASS = generateActionTypes("@otp/request-otp");

export const RESEND_OTP = generateActionTypes("@otp/resend-otp");

export const VERIFY_OTP_ACCOUNT_PARTER = generateActionTypes("@otp/verify-account-partner");

export const RESET_STATE_VERIFY_OTP_ACCOUNT = generateActionTypes("@otp/set-state-verify-account");

export const VERIFY_OTP_RESET_PASS = generateActionTypes("@otp/verify-otp-reset-pass");

export const RESET_STATE_VERIFY_OTP_RESET_PASS = generateActionTypes("@otp/set-state-verify-reset-pass");

export const CHANGE_PASS = generateActionTypes("@otp/change-pass");

export const RESET_STATE_CHANGE_PASS = generateActionTypes("@otp/reset-state-change-pass")

export const RESET_STATE_REQUETST_RESET_PASS = "@otp/reset-state-request-reset-pass"

export const RESET_STATE_RESEND_OTP = "@otp/reset-state-resend-otp"

export type RequestOTPParams = {
  phone?: {
    nationCode?: string,
    phoneNumber?: string
  },
  type?: "VERIFY_ACCOUNT" | "RESET_PASSWORD"
}

export type VerifyOtpAccountPartnerParams = {
  code?: string,
  phone?: {
    nationCode?: string,
    phoneNumber?: string,
  }
}

export type VerifyOtpResetPassParams = {
  code?: string,
  phone?: {
    nationCode?: string,
    phoneNumber?: string,
  },
  type?: "VERIFY_ACCOUNT" | "RESET_PASSWORD"
}

export type ChangePassParams = {
  code?: string,
  password?: string,
  phone?: {
    nationCode?: string,
    phoneNumber?: string,
  },
  type?: "VERIFY_ACCOUNT" | "RESET_PASSWORD"
}
