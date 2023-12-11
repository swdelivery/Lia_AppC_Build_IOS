import { BaseAction } from "@Redux/types";
import { Alert } from "react-native";
import { all, call, put, takeLatest } from "redux-saga/effects";
import PartnerService from "src/Services/PartnerService";
import * as actions from "./actions";
import { GET_LIST_PARTNER_TREATMENT, GET_LIST_POSTOPERATIVE, UPDATE_DAILY_DIARY } from "./types";


function* getListPartnerTreatment({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getListPartnerTreatment, payload);
    yield put(
      actions.getListPartnerTreatment.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* getListPostoperative({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getListPostoperative, payload);
    yield put(
      actions.getListPostoperative.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* updateDailyDiary({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.updateDailyDiary, payload);
    Alert.alert(data.message)
    yield put(
      actions.updateDailyDiary.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}



export default function* sagas() {
  yield all([
    takeLatest(GET_LIST_PARTNER_TREATMENT.REQUEST, getListPartnerTreatment),
    takeLatest(GET_LIST_POSTOPERATIVE.REQUEST, getListPostoperative),
    takeLatest(UPDATE_DAILY_DIARY.REQUEST, updateDailyDiary),
  ]);
}
