import { BaseAction } from "@Redux/types";
import { Alert } from "react-native";
import { all, call, put, takeLatest } from "redux-saga/effects";
import PartnerService from "src/Services/PartnerService";
import * as actions from "./actions";
import { CREATE_VOLUNTEER_COMPANION, CREATE_VOLUNTEER_COMPANION_DONATE, CREATE_VOLUNTEER_DONATE, GET_DETAIL_CAMPAIN, GET_LIST_CAMPAIN, GET_LIST_COMPANION_BY_USER, GET_LIST_COMPANION_REQUEST, GET_LIST_COMPANION_REQUEST_ACCEPT, GET_LIST_PARTNER_DONATE_TO_VOLUNTEER, GET_LIST_PARTNER_DONATE_TO_VOLUNTEER_COMPANION, GET_TOP_DONATE, GET_VOLUNTEER_HISTORY, GET_VOLUNTEER_REPORT_HISTORY_FILTER, SEARCH_CAMPAIN } from "./types";

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

function* getListCompanionRequestAccept({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getListCompanionRequest, payload);
    yield put(
      actions.getListCompanionRequestAccept.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* getListCompanionByUser({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getListCompanionRequest, payload);
    yield put(
      actions.getListCompanionByUser.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* createVolunteerDonate({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.createVolunteerDonate, payload?.dataFetch);
    yield put(
      actions.createVolunteerDonate.success({
        data: payload?.dataShowModal,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* createVolunteerCompanionDonate({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.createVolunteerCompanionDonate, payload?.dataFetch);
    yield put(
      actions.createVolunteerCompanionDonate.success({
        data: payload?.dataShowModal,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* searchCampain({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.searchCampain, payload);
    yield put(
      actions.searchCampain.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* getVolunteerHistory({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getVolunteerHistory, payload);
    yield put(
      actions.getVolunteerHistory.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* getVolunteerReportHistoryFilter({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getVolunteerHistory, payload);
    yield put(
      actions.getVolunteerReportHistoryFilter.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* getTopDonate({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getTopDonate, payload);
    yield put(
      actions.getTopDonate.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* getListPartnerDonateToVolunteerCompanion({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getListPartnerDonateToVolunteerCompanion, payload);
    yield put(
      actions.getListPartnerDonateToVolunteerCompanion.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* getListPartnerDonateToVolunteer({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getListPartnerDonateToVolunteerCompanion, payload);
    yield put(
      actions.getListPartnerDonateToVolunteer.success({
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
    takeLatest(GET_LIST_COMPANION_REQUEST_ACCEPT.REQUEST, getListCompanionRequestAccept),
    takeLatest(GET_LIST_COMPANION_BY_USER.REQUEST, getListCompanionByUser),
    takeLatest(CREATE_VOLUNTEER_DONATE.REQUEST, createVolunteerDonate),
    takeLatest(CREATE_VOLUNTEER_COMPANION_DONATE.REQUEST, createVolunteerCompanionDonate),
    takeLatest(SEARCH_CAMPAIN.REQUEST, searchCampain),
    takeLatest(GET_VOLUNTEER_HISTORY.REQUEST, getVolunteerHistory),
    takeLatest(GET_VOLUNTEER_REPORT_HISTORY_FILTER.REQUEST, getVolunteerReportHistoryFilter),
    takeLatest(GET_TOP_DONATE.REQUEST, getTopDonate),
    takeLatest(GET_LIST_PARTNER_DONATE_TO_VOLUNTEER_COMPANION.REQUEST, getListPartnerDonateToVolunteerCompanion),
    takeLatest(GET_LIST_PARTNER_DONATE_TO_VOLUNTEER.REQUEST, getListPartnerDonateToVolunteer),
  ]);
}
