import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_SERVICES, LOAD_MORE_SERVICES } from "./types";
import * as actions from "./actions";
import PartnerService from "src/Services/PartnerService";
import configs from "src/configs";
import { selectState } from "@Redux/helper";
import { getServiceListState } from "./selectors";

function* getServices() {
  try {
    const response = yield call(PartnerService.getServices, {});
    yield put(
      actions.getServices.success({
        data: response.data,
        paging: {
          canLoadMore: response.data.length === configs.apiPageSize,
          page: 1,
        },
      })
    );
  } catch (error: any) {
    yield put(actions.getServices.failure(error.message));
  }
}

function* loadMoreServices() {
  try {
    const { paging } = yield* selectState(getServiceListState);
    if (!paging || !paging.canLoadMore) {
      throw new Error("empty");
    }
    const response = yield call(
      PartnerService.getServices,
      {},
      paging.page + 1
    );
    yield put(
      actions.loadMoreServices.success({
        data: response.data,
        paging: {
          canLoadMore: response.data.length === configs.apiPageSize,
          page: paging.page + 1,
        },
      })
    );
  } catch (error: any) {
    yield put(actions.loadMoreServices.failure(error.message));
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_SERVICES.REQUEST, getServices),
    takeLatest(LOAD_MORE_SERVICES.REQUEST, loadMoreServices),
  ]);
}
