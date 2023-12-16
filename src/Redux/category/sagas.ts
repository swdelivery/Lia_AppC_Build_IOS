import { BaseAction } from "@Redux/types";
import { Alert } from "react-native";
import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import PartnerService from "src/Services/PartnerService";
import * as actions from "./actions";
import { GET_DATA_FOR_MODAL_FILTER_SERVICE, GET_LIST_SERVICE_FILTER } from "./types";

function* getListServiceFilter({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getServiceFilterCategory, payload);
    yield put(
      actions.getListServiceFilter.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* getDataForModalFilterService({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getDataForModalFilterService, payload);
    yield put(
      actions.getDataForModalFilterService.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_LIST_SERVICE_FILTER.REQUEST, getListServiceFilter),
    takeLatest(GET_DATA_FOR_MODAL_FILTER_SERVICE.REQUEST, getDataForModalFilterService),
  ]);
}
