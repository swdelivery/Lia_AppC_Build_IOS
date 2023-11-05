import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  GET_BRANCH_DETAILS,
  GET_BRANCH_DOCTORS,
  GET_BRANCH_LIST,
  GET_BRANCH_REVIEWS,
  GetBranchReviewsParams,
} from "./types";
import * as actions from "./actions";
import { BaseAction } from "@Redux/types";
import PartnerService from "src/Services/PartnerService";
import { Branch } from "@typings/branch";
import configs from "src/configs";
import { last } from "lodash";
import { GetBranchDoctorsParams } from "./types";

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

function* getBranchDetails({ payload }: BaseAction<number>) {
  try {
    const data: any = yield call(PartnerService.getBranchById, payload);
    yield put(actions.getBranchDetails.success(data));
  } catch (error: any) {
    yield put(actions.getBranchDetails.failure(error.message));
  }
}

function* getBranchDoctors({ payload }: BaseAction<GetBranchDoctorsParams>) {
  try {
    const data = yield call(PartnerService.getDoctorList, {
      branchCode: {
        equal: payload.branchCode,
      },
    });
    yield put(actions.getBranchDoctors.success(data));
  } catch (error: any) {
    yield put(actions.getBranchDoctors.failure(error.message));
  }
}

function* getBranchReviews({ payload }: BaseAction<GetBranchReviewsParams>) {
  try {
    const data = yield call(PartnerService.getReview, {
      branchCode: {
        equal: payload.branchCode,
      },
    });
    yield put(actions.getBranchReviews.success(data));
  } catch (error: any) {
    yield put(actions.getBranchReviews.failure(error.message));
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_BRANCH_LIST.REQUEST, getBranchList),
    takeLatest(GET_BRANCH_DETAILS.REQUEST, getBranchDetails),
    takeLatest(GET_BRANCH_DOCTORS.REQUEST, getBranchDoctors),
    takeLatest(GET_BRANCH_REVIEWS.REQUEST, getBranchReviews),
  ]);
}
