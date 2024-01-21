import { BaseAction } from "@Redux/types";
import { all, call, put, takeLatest } from "redux-saga/effects";
import PartnerService from "src/Services/PartnerService";
import * as actions from "./actions";
import { GET_ABOUT_LIA } from "./types";

function* getAboutLiA({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getAboutLiA, payload);
    yield put(
      actions.getAboutLiA.success({
        data,
      })
    );
  } catch (error: any) {
    console.log({ error });
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_ABOUT_LIA.REQUEST, getAboutLiA),
  ]);
}
