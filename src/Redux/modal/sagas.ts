import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  GET_PARTNER_NOTIFICATIONS,
  OPEN_ACTION_SHEET_BOTTOM
} from "./types";
import * as actions from "./actions";
import PartnerService from "src/Services/PartnerService";
import { BaseAction } from "@Redux/types";
import { Alert } from "react-native";


function* getPartnerNotifications({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getPartnerNotifications, payload);
    yield put(
      actions.getPartnerNotifications.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_PARTNER_NOTIFICATIONS.REQUEST, getPartnerNotifications),
  ]);
}
