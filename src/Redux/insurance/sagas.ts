import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_INSURANCE_LIST, LOAD_MORE_INSURANCE_LIST } from "./types";
import * as actions from "./actions";
import PartnerService from "src/Services/PartnerService";
import configs from "src/configs";

function* getInsuranceList() {
  try {
    const response = yield call(PartnerService.getInsuranceList);
    yield put(
      actions.getInsuranceList.success({
        data: response.data,
        paging: {
          canLoadMore: response.data.length === configs.apiPageSize,
          page: 1,
        },
      })
    );
  } catch (error: any) {
    yield put(actions.getInsuranceList.failure(error.message));
  }
}

function* loadMoreInsuranceList() {
  try {
    yield put(actions.loadMoreInsuranceList.success());
  } catch (error: any) {
    yield put(actions.loadMoreInsuranceList.failure(error.message));
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_INSURANCE_LIST.REQUEST, getInsuranceList),
    takeLatest(LOAD_MORE_INSURANCE_LIST.REQUEST, loadMoreInsuranceList),
  ]);
}
