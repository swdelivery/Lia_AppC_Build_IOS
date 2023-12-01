import { BaseAction } from "@Redux/types";
import { Alert } from "react-native";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { navigation } from "rootNavigation";
import PartnerService from "src/Services/PartnerService";
import * as actions from "./actions";
import { CREAT_PARTNER_RELATIVE, DELETE_PARTNER_RELATIVE, GET_LIST_PARTNER_RELATIVE, UPDATE_PARTNER_RELATIVE } from "./types";

function* createPartnerRelative({ payload }: BaseAction<any>) {
  try {
    const data = yield call(PartnerService.createPartnerRelative, payload);
    Alert.alert(data?.message);
    navigation.goBack();
  } catch (error: any) {
    Alert.alert(error?.message);
  }
}

function* updatePartnerRelative({ payload }: BaseAction<any>) {
  try {
    const data = yield call(PartnerService.updatePartnerRelative, payload);
    Alert.alert(data?.message);
    navigation.goBack();
  } catch (error: any) {
    Alert.alert(error?.message);
  }
}

function* deletePartnerRelative({ payload }: BaseAction<any>) {
  try {
    const data = yield call(PartnerService.deletePartnerRelative, payload);
    yield put(
      actions.deletePartnerRelative.success({
        data,
      })
    );
    Alert.alert(data?.message);
  } catch (error: any) {
    Alert.alert(error?.message);
  }
}

function* getListPartnerRelative({ payload }: BaseAction<any>) {
  try {
    const data = yield call(PartnerService.getListPartnerRelative, payload);
    yield put(
      actions.getListPartnerRelative.success({
        data: data?.data,
      })
    );
  } catch (error: any) {
    Alert.alert(error?.message);
  }
}

export default function* sagas() {
  yield all([takeLatest(CREAT_PARTNER_RELATIVE.REQUEST, createPartnerRelative)]);
  yield all([takeLatest(GET_LIST_PARTNER_RELATIVE.REQUEST, getListPartnerRelative)]);
  yield all([takeLatest(UPDATE_PARTNER_RELATIVE.REQUEST, updatePartnerRelative)]);
  yield all([takeLatest(DELETE_PARTNER_RELATIVE.REQUEST, deletePartnerRelative)]);
}
