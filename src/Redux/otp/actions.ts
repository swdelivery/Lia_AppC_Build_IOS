import { generateActionsGroup } from "@Redux/helper";
import { DataPagingPayload } from "@typings/api";
import { Practitioner } from "@typings/practitioner";
import { CHANGE_PASS, ChangePassParams, REQUEST_OTP_RESET_PASS, RESEND_OTP, RESET_STATE_CHANGE_PASS, RESET_STATE_REQUETST_RESET_PASS, RESET_STATE_VERIFY_OTP_ACCOUNT, RESET_STATE_VERIFY_OTP_RESET_PASS, RequestOTPParams, VERIFY_OTP_ACCOUNT_PARTER, VERIFY_OTP_RESET_PASS, VerifyOtpAccountPartnerParams, VerifyOtpResetPassParams } from "./types";

export const requestOTPResetPass = generateActionsGroup<RequestOTPParams>(REQUEST_OTP_RESET_PASS);

export const resendOTP = generateActionsGroup<RequestOTPParams>(RESEND_OTP);

export const verifyOtpAccountpartner = generateActionsGroup<VerifyOtpAccountPartnerParams>(VERIFY_OTP_ACCOUNT_PARTER);

export const resetVerifyAccount = generateActionsGroup(RESET_STATE_VERIFY_OTP_ACCOUNT);

export const verifyOtpResetPass = generateActionsGroup<VerifyOtpResetPassParams>(VERIFY_OTP_RESET_PASS);

export const resetVerifyOtpResetPass = generateActionsGroup(RESET_STATE_VERIFY_OTP_RESET_PASS);

export const changePass = generateActionsGroup<ChangePassParams>(CHANGE_PASS);

export const resetStateChangePass = generateActionsGroup(RESET_STATE_CHANGE_PASS);

export const resetStateRequestResetPass = () => ({
  type: RESET_STATE_REQUETST_RESET_PASS
})

