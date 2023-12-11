import { BaseAction } from "@Redux/types";
import { Alert } from "react-native";
import { all, call, put, takeLatest } from "redux-saga/effects";
import PartnerService from "src/Services/PartnerService";
import * as actions from "./actions";
import {
  GET_HISTORY_WALLET,
  GET_WALLET
} from "./types";

function* getWallet({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getWallet, payload);
    yield put(
      actions.getWallet.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* getHistoryWallet({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getHistoryWallet, payload);
    yield put(
      actions.getHistoryWallet.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_WALLET.REQUEST, getWallet),
    takeLatest(GET_HISTORY_WALLET.REQUEST, getHistoryWallet),
  ]);
}
