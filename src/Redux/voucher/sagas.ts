import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  GET_VOUCHERS,
  LOAD_MORE_VOUCHERS,
  TAKE_VOUCHER,
  TakeVoucherParams,
} from "./types";
import * as actions from "./actions";
import PartnerService from "src/Services/PartnerService";
import { selectState } from "@Redux/helper";
import { getInfoUserReducer } from "@Redux/Selectors";
import { ApiResponse } from "@typings/api";
import { Voucher } from "@typings/voucher";
import configs from "src/configs";
import { getVouchersState } from "./selectors";
import { BaseAction } from "@Redux/types";
import { navigation } from "rootNavigation";

function* getVouchers() {
  try {
    const { infoUser } = yield* selectState(getInfoUserReducer);
    let response: ApiResponse<Voucher[]>;
    if (!infoUser || !infoUser._id) {
      response = yield call(PartnerService.getPublicVouchers, {});
    } else {
      response = yield call(PartnerService.getVouchers, {});
    }
    yield put(
      actions.getVouchers.success({
        data: response.data,
        paging: {
          page: 1,
          canLoadMore: response.data.length === configs.apiPageSize,
        },
      })
    );
  } catch (error: any) {
    yield put(actions.getVouchers.failure(error.message));
  }
}

function* loadMoreVouchers() {
  try {
    const { paging } = yield* selectState(getVouchersState);
    if (!paging || !paging.canLoadMore) {
      throw new Error("EMPTY");
    }
    const { infoUser } = yield* selectState(getInfoUserReducer);
    let response: ApiResponse<Voucher[]>;
    if (!infoUser || !infoUser._id) {
      response = yield call(PartnerService.getPublicVouchers, {});
    } else {
      response = yield call(PartnerService.getVouchers, {});
    }
    yield put(
      actions.loadMoreVouchers.success({
        data: response.data,
        paging: {
          page: paging.page + 1,
          canLoadMore: response.data.length === configs.apiPageSize,
        },
      })
    );
  } catch (error: any) {
    yield put(actions.loadMoreVouchers.failure(error.message));
  }
}

function* takeVoucher({ payload }: BaseAction<TakeVoucherParams>) {
  try {
    yield call(PartnerService.takeVoucher, payload);
    yield put(actions.takeVoucher.success());

    navigation.setParams({
      isTakeVoucherSuccess: true,
    });
  } catch (error: any) {
    yield put(actions.takeVoucher.failure(error.message));
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_VOUCHERS.REQUEST, getVouchers),
    takeLatest(LOAD_MORE_VOUCHERS.REQUEST, loadMoreVouchers),
    takeLatest(TAKE_VOUCHER.REQUEST, takeVoucher),
  ]);
}
