import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_PRACTITIONER_LIST, LOAD_MORE_PRACTITIONER_LIST } from "./types";
import * as actions from "./actions";
import PartnerService from "src/Services/PartnerService";
import configs from "src/configs";
import { selectState } from "@Redux/helper";
import { getPractitionerListState } from "./selectors";

function* getPractitionerList() {
  try {
    const data = yield call(PartnerService.getPractitioners, {});
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

function* loadMorePractitionerList() {
  try {
    const { paging } = yield* selectState(getPractitionerListState);
    if (!paging || !paging.canLoadMore) {
      throw new Error("empty");
    }
    const data = yield call(
      PartnerService.getPractitioners,
      {},
      paging.page + 1
    );
    yield put(
      actions.loadMorePractitionerList.success({
        data,
        paging: {
          canLoadMore: data.length === configs.apiPageSize,
          page: paging.page + 1,
        },
      })
    );
  } catch (error: any) {
    yield put(actions.loadMorePractitionerList.failure(error.message));
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_PRACTITIONER_LIST.REQUEST, getPractitionerList),
    takeLatest(LOAD_MORE_PRACTITIONER_LIST.REQUEST, loadMorePractitionerList),
  ]);
}
