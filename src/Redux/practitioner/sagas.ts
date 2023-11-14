import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  GET_PRACTITIONER_DETAILS,
  GET_PRACTITIONER_DIARIES,
  GET_PRACTITIONER_LIST,
  GET_PRACTITIONER_REVIEWS,
  GetPractitionerDiariesParams,
  GetPractitionerReviewsParams,
} from "./types";
import * as actions from "./actions";
import PartnerService from "src/Services/PartnerService";
import { BaseAction } from "@Redux/types";
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

function* getPractitionerDetails({ payload }: BaseAction<string>) {
  try {
    const practitioner = yield call(
      PartnerService.getPractitionerDetails,
      payload
    );
    yield put(actions.getPractitionerDetails.success(practitioner));
  } catch (error: any) {
    yield put(actions.getPractitionerDetails.failure(error.message));
  }
}

function* getPractitionerDiaries({
  payload,
}: BaseAction<GetPractitionerDiariesParams>) {
  try {
    const data = yield call(PartnerService.getDiaryList, {
      practitionerId: {
        equal: payload.practitionerId,
      },
    });
    yield put(actions.getPractitionerDiaries.success(data));
  } catch (error: any) {
    yield put(actions.getPractitionerDiaries.failure(error.message));
  }
}

function* getPractitionerReviews({
  payload,
}: BaseAction<GetPractitionerReviewsParams>) {
  try {
    const data = yield call(PartnerService.getReviewList, {
      practitionerCode: {
        equal: payload.practitionerCode,
      },
    });
    yield put(actions.getPractitionerReviews.success(data.data));
  } catch (error: any) {
    yield put(actions.getPractitionerReviews.failure(error.message));
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_PRACTITIONER_LIST.REQUEST, getPractitionerList),
    takeLatest(GET_PRACTITIONER_DETAILS.REQUEST, getPractitionerDetails),
    takeLatest(GET_PRACTITIONER_DIARIES.REQUEST, getPractitionerDiaries),
    takeLatest(GET_PRACTITIONER_REVIEWS.REQUEST, getPractitionerReviews),
  ]);
}
