import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_MY_COUPONS } from "./types";
import * as actions from "./actions";
import PartnerService from "src/Services/PartnerService";
import { ApiResponse } from "@typings/api";
import { MyVoucher } from "@typings/voucher";
import config from "src/Services/config";
import configs from "src/configs";

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

export default function* sagas() {
  yield all([takeLatest(GET_MY_COUPONS.REQUEST, getMyCoupons)]);
}
