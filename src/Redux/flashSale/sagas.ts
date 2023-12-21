import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { CHECK_FLASH_SALE, GET_CURRENT_FLASH_SALE_SERVICES } from "./types";
import * as actions from "./actions";
import FlashSaleService from "src/Services/FlashSaleService";
import { BaseAction } from "@Redux/types";
import { FlashSalePayload } from "@typings/flashsale";

function* checkFlashSale() {
  try {
    const data: FlashSalePayload = yield call(FlashSaleService.checkFlashSale);
    if (data.currentFlashSale) {
      yield put(
        actions.getCurrentFlashSaleServices.request(data.currentFlashSale._id)
      );
    }
    yield put(actions.checkFlashSale.success(data));
  } catch (error: any) {
    yield put(actions.checkFlashSale.failure(error.message));
  }
}

function* getCurrentFlashSaleServices({ payload }: BaseAction<string>) {
  try {
    const data = yield call(FlashSaleService.getFlashSaleServices, payload);
    yield put(actions.getCurrentFlashSaleServices.success(data));
  } catch (error: any) {
    yield put(actions.getCurrentFlashSaleServices.failure(error.message));
  }
}

export default function* sagas() {
  yield all([
    takeLatest(CHECK_FLASH_SALE.REQUEST, checkFlashSale),
    takeLatest(
      GET_CURRENT_FLASH_SALE_SERVICES.REQUEST,
      getCurrentFlashSaleServices
    ),
  ]);
}
