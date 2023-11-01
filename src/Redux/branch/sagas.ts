import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_BRANCH_DETAILS } from "./types";
import * as actions from "./actions";
import { BaseAction } from "@Redux/types";
import PartnerService from "src/Services/PartnerService";

function* getBranchDetails({ payload }: BaseAction<number>) {
  try {
    const data: any = yield call(PartnerService.getBranchById, payload);
    yield put(actions.getBranchDetails.success(data));
  } catch (error: any) {
    yield put(actions.getBranchDetails.failure(error.message));
  }
}

export default function* sagas() {
  yield all([takeLatest(GET_BRANCH_DETAILS.REQUEST, getBranchDetails)]);
}
