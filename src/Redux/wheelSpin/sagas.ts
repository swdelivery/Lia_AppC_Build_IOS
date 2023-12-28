import { BaseAction } from "@Redux/types";
import { Alert } from "react-native";
import { all, call, put, takeLatest } from "redux-saga/effects";
import PartnerService from "src/Services/PartnerService";
import * as actions from "./actions";
import { GET_CURR_ACTIVE_WHEEL_SPIN, GET_PARTNER_WHEEL_TURN } from "./types";

function* getCurrActiveWheelSpin({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getCurrActiveWheelSpin, payload);
    yield put(
      actions.getCurrActiveWheelSpin.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}
function* getPartnerWheelTurn({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getPartnerWheelTurn, payload);
    yield put(
      actions.getPartnerWheelTurn.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_CURR_ACTIVE_WHEEL_SPIN.REQUEST, getCurrActiveWheelSpin),
    takeLatest(GET_PARTNER_WHEEL_TURN.REQUEST, getPartnerWheelTurn),
  ]);
}
