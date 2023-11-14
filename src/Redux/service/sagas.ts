import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_SERVICES } from "./types";
import * as actions from "./actions";
import PartnerService from "src/Services/PartnerService";

function* getServices() {
  try {
    const data = yield call(PartnerService.getServices, {});
    yield put(actions.getServices.success(data));
  } catch (error: any) {
    yield put(actions.getServices.failure(error.message));
  }
}

export default function* sagas() {
  yield all([takeLatest(GET_SERVICES.REQUEST, getServices)]);
}
