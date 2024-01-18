import { BaseAction } from "@Redux/types";
import { all, call, put, takeLatest } from "redux-saga/effects";
import PartnerService from "src/Services/PartnerService";
import * as actions from "./actions";
import { GET_IMAGE_VOUCHER, GET_NEWS } from "./types";

function* getImageVoucherHome({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getConfigFileByCode, payload);
    yield put(
      actions.getImageVoucherHome.success({
        data,
      })
    );
  } catch (error: any) {
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_IMAGE_VOUCHER.REQUEST, getImageVoucherHome),
  ]);
}
