import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_MATERIAL_LIST, LOAD_MORE_MATERIAL_LIST } from "./types";
import * as actions from "./actions";
import PartnerService from "src/Services/PartnerService";
import configs from "src/configs";
import { selectState } from "@Redux/helper";
import { getMaterialListState } from "./selectors";

function* getMaterialList() {
  try {
    const response = yield call(PartnerService.getMaterial, {});
    yield put(
      actions.getMaterialList.success({
        data: response.data,
        paging: {
          canLoadMore: response.data.length === configs.apiPageSize,
          page: 1,
        },
      })
    );
  } catch (error: any) {
    yield put(actions.getMaterialList.failure(error.message));
  }
}

function* loadMoreMaterialList() {
  try {
    const { paging } = yield* selectState(getMaterialListState);
    if (!paging || !paging.canLoadMore) {
      throw new Error("empty");
    }
    const response = yield call(
      PartnerService.getMaterial,
      {},
      paging.page + 1
    );
    yield put(
      actions.loadMoreMaterialList.success({
        data: response.data,
        paging: {
          canLoadMore: response.data.length === configs.apiPageSize,
          page: paging.page + 1,
        },
      })
    );
    yield put(actions.loadMoreMaterialList.success());
  } catch (error: any) {
    yield put(actions.loadMoreMaterialList.failure(error.message));
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_MATERIAL_LIST.REQUEST, getMaterialList),
    takeLatest(LOAD_MORE_MATERIAL_LIST.REQUEST, loadMoreMaterialList),
  ]);
}
