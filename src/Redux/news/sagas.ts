import { BaseAction } from "@Redux/types";
import { all, call, put, takeLatest } from "redux-saga/effects";
import PartnerService from "src/Services/PartnerService";
import * as actions from "./actions";
import { GET_NEWS } from "./types";

function* getNews({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getNews, payload);
    yield put(
      actions.getNews.success({
        data,
      })
    );
  } catch (error: any) {
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_NEWS.REQUEST, getNews),
  ]);
}
