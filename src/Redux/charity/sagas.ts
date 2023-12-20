import { BaseAction } from "@Redux/types";
import { Alert } from "react-native";
import { all, call, put, takeLatest } from "redux-saga/effects";
import PartnerService from "src/Services/PartnerService";
import * as actions from "./actions";
import { CREATE_VOLUNTEER_COMPANION, GET_DETAIL_CAMPAIN, GET_LIST_CAMPAIN, GET_LIST_COMPANION_REQUEST } from "./types";

function* getListCampain({ }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getListCampain, {});
    yield put(
      actions.getListCampain.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* getDetailCampain({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getDetailCampain, payload);
    yield put(
      actions.getDetailCampain.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* createVolunteerCompanion({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.createVolunteerCompanion, payload);
    yield put(
      actions.createVolunteerCompanion.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* getListCompanionRequest({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getListCompanionRequest, payload);
    yield put(
      actions.getListCompanionRequest.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}


export default function* sagas() {
  yield all([
    takeLatest(GET_LIST_CAMPAIN.REQUEST, getListCampain),
    takeLatest(GET_DETAIL_CAMPAIN.REQUEST, getDetailCampain),
    takeLatest(CREATE_VOLUNTEER_COMPANION.REQUEST, createVolunteerCompanion),
    takeLatest(GET_LIST_COMPANION_REQUEST.REQUEST, getListCompanionRequest),
  ]);
}
