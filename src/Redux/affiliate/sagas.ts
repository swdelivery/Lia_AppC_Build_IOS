import { BaseAction } from "@Redux/types";
import { Alert } from "react-native";
import { all, call, put, takeLatest } from "redux-saga/effects";
import PartnerService from "src/Services/PartnerService";
import * as actions from "./actions";
import { GET_PARTNER_LEVEL } from "./types";

function* getPartnerLevel({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getPartnerLevel, payload);
    yield put(
      actions.getPartnerLevel.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_PARTNER_LEVEL.REQUEST, getPartnerLevel),
  ]);
}
