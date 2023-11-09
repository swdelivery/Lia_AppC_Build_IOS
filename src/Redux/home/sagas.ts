import { all, call, put, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import { BaseAction } from "@Redux/types";
import { GET_SERVICE_GROUP } from "./types";
import PartnerService from "src/Services/PartnerService";

function* getServiceGroup({ payload }: BaseAction<any>) {
  try {
    const data: any[] = yield call(PartnerService.getServiceGroup, payload);
    yield put(actions.getServiceGroup.success(data));
  } catch (error: any) {
    yield put(actions.getServiceGroup.failure(error.message));
  }
}

export default function* sagas() {
  yield all([takeLatest(GET_SERVICE_GROUP.REQUEST, getServiceGroup)]);
}
