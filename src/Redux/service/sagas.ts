import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_SERVICES, GET_SERVICE_DETAILS } from "./types";
import * as actions from "./actions";
import PartnerService from "src/Services/PartnerService";
import { BaseAction } from "@Redux/types";

function* getServices() {
  try {
    const data = yield call(PartnerService.getServices, {});
    yield put(actions.getServices.success(data));
  } catch (error: any) {
    yield put(actions.getServices.failure(error.message));
  }
}

function* getServiceDetails({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getServiceDetails, payload);
    yield put(actions.getServiceDetails.success(data));
  } catch (error: any) {
    yield put(actions.getServiceDetails.failure(error.message));
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_SERVICES.REQUEST, getServices),
    takeLatest(GET_SERVICE_DETAILS.REQUEST, getServiceDetails),
  ]);
}
