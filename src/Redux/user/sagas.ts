import { all, call, delay, put, takeLatest } from "redux-saga/effects";
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
} from "./types";
import * as actions from "./actions";
import PartnerService from "src/Services/PartnerService";
import { ApiResponse } from "@typings/api";
import { MyVoucher } from "@typings/voucher";
import configs from "src/configs";
import { Booking } from "@typings/booking";
import { BaseAction } from "@Redux/types";
import { ServiceTreatment } from "@typings/treatment";
import { LOG_OUT } from "@Redux/Constants/ActionType";
import { navigation } from "rootNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import AsyncStorage from "@react-native-community/async-storage";
import keychain from "src/utils/keychain";
import SocketInstance from "SocketInstance";

function* getMyCoupons() {
  try {
    const response: ApiResponse<MyVoucher[]> = yield call(
      PartnerService.getMyCoupons,
      {}
    );
    yield put(
      actions.getMyCoupons.success({
        data: response.data,
        paging: {
          canLoadMore: response.data.length === configs.apiPageSize,
          page: 1,
        },
      })
    );
  } catch (error: any) {
    yield put(actions.getMyCoupons.failure(error.message));
  }
}

function* getMyBooking() {
  try {
    const response: ApiResponse<Booking[]> = yield call(
      PartnerService.getBookingList,
      {}
    );
    yield put(
      actions.getMyBooking.success({
        data: response.data,
        paging: {
          canLoadMore: response.data.length === configs.apiPageSize,
          page: 1,
        },
      })
    );
  } catch (error: any) {
    yield put(actions.getMyBooking.failure(error.message));
  }
}

function* getBookingDetails({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getBookingDetails, payload);
    yield put(actions.getBookingDetails.success(data));
  } catch (error: any) {
    yield put(actions.getBookingDetails.failure(error.message));
  }
}

function* getTreatmentServices({
  payload,
}: BaseAction<GetTreatmentServicesParams>) {
  try {
    const data: ServiceTreatment[] = yield call(
      PartnerService.getTreatmentDetails,
      {
        bookingId: {
          equal: payload.bookingId,
        },
      }
    );
    yield put(actions.getTreatmentServices.success(data));
  } catch (error: any) {
    yield put(actions.getTreatmentServices.failure(error.message));
  }
}

function* getPaymentRequest({
  payload,
}: BaseAction<GetTreatmentServicesParams>) {
  try {
    const data = yield call(PartnerService.getPaymentRequest, {
      bookingId: {
        equal: payload.bookingId,
      },
    });
    yield put(actions.getPaymentRequest.success(data));
  } catch (error: any) {
    yield put(actions.getPaymentRequest.failure(error.message));
  }
}

function* getBookingDeposits({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getBookingDeposits, payload);
    yield put(actions.getBookingDeposits.success(data));
  } catch (error: any) {
    yield put(actions.getBookingDeposits.failure(error.message));
  }
}

function* getOrderDetails({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getOrderDetails, payload);
    yield put(actions.getOrderDetails.success(data));
  } catch (error: any) {
    yield put(actions.getOrderDetails.failure(error.message));
  }
}

function* getOrderPayments({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getOrderPayments, payload);
    yield put(actions.getOrderPayments.success(data));
  } catch (error: any) {
    yield put(actions.getOrderPayments.failure(error.message));
  }
}

function* logOut() {
  try {
    let fcmTokenSTR = yield AsyncStorage.getItem("fcmToken");
    let result = yield call(PartnerService.partnerLogout, {
      fcmToken: fcmTokenSTR,
    });

    yield AsyncStorage.removeItem("userName");
    yield AsyncStorage.removeItem("password");
    yield AsyncStorage.removeItem("codeAffiliateVsIdService");
    keychain.clearTokens();

    SocketInstance.instance = null;
    SocketInstance.socketConn.disconnect();
    SocketInstance.socketConn = null;
    navigation.navigate(ScreenKey.HOME);
  } catch (error: any) {
    //
  }
}

function* cancelPartnerBooking({ payload }: BaseAction<string>) {
  try {
    yield call(PartnerService.cancelPartnerBooking, payload);
    yield put(actions.cancelPartnerBooking.success());
    yield put(actions.getMyBooking.request());
  } catch (error: any) {
    yield put(actions.cancelPartnerBooking.failure(error.message));
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_MY_COUPONS.REQUEST, getMyCoupons),
    takeLatest(GET_MY_BOOKING.REQUEST, getMyBooking),
    takeLatest(GET_BOOKING_DETAILS.REQUEST, getBookingDetails),
    takeLatest(GET_TREATMENT_SERVICES.REQUEST, getTreatmentServices),
    takeLatest(GET_PAYMENT_REQUEST.REQUEST, getPaymentRequest),
    takeLatest(GET_BOOKING_DEPOSITS.REQUEST, getBookingDeposits),
    takeLatest(GET_ORDER_DETAILS.REQUEST, getOrderDetails),
    takeLatest(GET_ORDER_PAYMENTS.REQUEST, getOrderPayments),
    takeLatest(CANCEL_PARTNER_BOOKING.REQUEST, cancelPartnerBooking),
    takeLatest(LOG_OUT, logOut),
  ]);
}
