import { all, call, put, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import PartnerService from "src/Services/PartnerService";
import configs from "src/configs";
import { selectState } from "@Redux/helper";
import { BaseAction } from "@Redux/types";
import { CHANGE_PASS, ChangePassParams, REQUEST_OTP_RESET_PASS, RESEND_OTP, RequestOTPParams, VERIFY_OTP_ACCOUNT_PARTER, VERIFY_OTP_RESET_PASS, VerifyOtpAccountPartnerParams, VerifyOtpResetPassParams } from "./types";
import Toast from "react-native-toast-message";

function* requestOTPResetPass({
  payload,
}: BaseAction<RequestOTPParams>) {
  try {
    const data = yield call(PartnerService.requestOTPResetPass, payload);
    Toast.show({
      text1: data.message,
      type: "success",
    });
    yield put(
      actions.requestOTPResetPass.success(data)
    );
  } catch (error: any) {
    Toast.show({
      text1: error.message,
      type: "error",
    });
    yield put(actions.requestOTPResetPass.failure(error.message));
  }
}

function* resendOTP({
  payload,
}: BaseAction<RequestOTPParams>) {
  try {
    const data = yield call(PartnerService.resendOTP, payload);
    Toast.show({
      text1: data.message,
      type: "success",
    });
    yield put(
      actions.resendOTP.success(data)
    );
  } catch (error: any) {
    Toast.show({
      text1: error.message,
      type: "error",
    });
    yield put(actions.resendOTP.failure(error.message));
  }
}

function* verifyOtpAccountPartner({
  payload,
}: BaseAction<VerifyOtpAccountPartnerParams>) {
  try {
    const data = yield call(PartnerService.verifyOtpAccountPartner, payload);
    Toast.show({
      text1: data.message,
      type: "success",
    });
    yield put(
      actions.verifyOtpAccountpartner.success(data)
    );
  } catch (error: any) {
    Toast.show({
      text1: error.message,
      type: "error",
    });
    yield put(actions.verifyOtpAccountpartner.failure(error.message));
  }
}

function* verifyOtpResetPass({
  payload,
}: BaseAction<VerifyOtpResetPassParams>) {
  try {
    const data = yield call(PartnerService.verifyOtpResetPass, payload);
    Toast.show({
      text1: data.message,
      type: "success",
    });
    yield put(
      actions.verifyOtpResetPass.success(data)
    );
  } catch (error: any) {
    Toast.show({
      text1: error.message,
      type: "error",
    });
    yield put(actions.verifyOtpResetPass.failure(error.message));
  }
}

function* changePass({
  payload,
}: BaseAction<ChangePassParams>) {
  try {
    const data = yield call(PartnerService.changePass, payload);
    Toast.show({
      text1: data.message,
      type: "success",
    });
    yield put(
      actions.changePass.success(data)
    );
  } catch (error: any) {
    Toast.show({
      text1: error.message,
      type: "error",
    });
    yield put(actions.changePass.failure(error.message));
  }
}

export default function* sagas() {
  yield all([
    takeLatest(REQUEST_OTP_RESET_PASS.REQUEST, requestOTPResetPass),
    takeLatest(RESEND_OTP.REQUEST, resendOTP),
    takeLatest(VERIFY_OTP_ACCOUNT_PARTER.REQUEST, verifyOtpAccountPartner),
    takeLatest(VERIFY_OTP_RESET_PASS.REQUEST, verifyOtpResetPass),
    takeLatest(CHANGE_PASS.REQUEST, changePass)
  ]);
}
