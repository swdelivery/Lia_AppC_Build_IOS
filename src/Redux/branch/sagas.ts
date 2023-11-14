import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_BRANCH_LIST } from "./types";
import * as actions from "./actions";
import { BaseAction } from "@Redux/types";
import PartnerService from "src/Services/PartnerService";
import { Branch } from "@typings/branch";
import configs from "src/configs";
import { last } from "lodash";

function* getBranchList({ payload }: BaseAction<any>) {
  try {
    const data: Branch[] = yield call(PartnerService.getBranchList, payload);
    yield put(
      actions.getBranchList.success({
        data,
        paging: {
          canLoadMore: data.length === configs.apiPageSize,
          after: last(data)?._id,
        },
      })
    );
  } catch (error: any) {
    yield put(actions.getBranchList.failure(error.message));
  }
}

export default function* sagas() {
  yield all([takeLatest(GET_BRANCH_LIST.REQUEST, getBranchList)]);
}
