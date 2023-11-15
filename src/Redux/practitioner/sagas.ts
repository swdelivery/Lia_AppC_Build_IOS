import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_PRACTITIONER_LIST } from "./types";
import * as actions from "./actions";
import PartnerService from "src/Services/PartnerService";
import configs from "src/configs";

function* getPractitionerList() {
  try {
    const data = yield call(PartnerService.getPractitioners);
    yield put(
      actions.getPractitionerList.success({
        data,
        paging: {
          canLoadMore: data.length === configs.apiPageSize,
          page: 1,
        },
      })
    );
  } catch (error: any) {
    yield put(actions.getPractitionerList.failure(error.message));
  }
}

export default function* sagas() {
  yield all([takeLatest(GET_PRACTITIONER_LIST.REQUEST, getPractitionerList)]);
}
