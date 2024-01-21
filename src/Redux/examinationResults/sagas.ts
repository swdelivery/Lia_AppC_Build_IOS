import { BaseAction } from "@Redux/types";
import { all, call, put, takeLatest } from "redux-saga/effects";
import PartnerService from "src/Services/PartnerService";
import * as actions from "./actions";
import { GET_DETAIL_EXAMINATION_RESULT, GET_LIST_EXAMINATION_RESULTS } from "./types";

function* getListExaminationResults({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getListExaminationResults, payload);
    yield put(
      actions.getListExaminationResults.success({
        data,
      })
    );
  } catch (error: any) {
    console.log({ error });
  }
}

function* getDetailExaminationResult({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getDetailExaminationResult, payload);
    yield put(
      actions.getDetailExaminationResult.success({
        data,
      })
    );
  } catch (error: any) {
    console.log({ error });
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_LIST_EXAMINATION_RESULTS.REQUEST, getListExaminationResults),
    takeLatest(GET_DETAIL_EXAMINATION_RESULT.REQUEST, getDetailExaminationResult),
  ]);
}
