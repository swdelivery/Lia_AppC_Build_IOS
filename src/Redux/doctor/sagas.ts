import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  GET_DOCTOR_DETAILS,
  GET_DOCTOR_DIARIES,
  GET_DOCTOR_LIST,
  GET_DOCTOR_REVIEWS,
  GetDoctorDiariesParams,
  GetDoctorReviewsParams,
} from "./types";
import * as actions from "./actions";
import PartnerService from "src/Services/PartnerService";
import { Doctor } from "@typings/doctor";
import configs from "src/configs";
import { BaseAction } from "@Redux/types";

function* getDoctorList() {
  try {
    const data: Doctor[] = yield call(PartnerService.getDoctorList, {});
    yield put(
      actions.getDoctorList.success({
        data,
        paging: {
          page: 1,
          canLoadMore: data.length === configs.apiPageSize,
        },
      })
    );
  } catch (error: any) {
    yield put(actions.getDoctorList.failure(error.message));
  }
}

function* getDoctorDetails({ payload }: BaseAction<string>) {
  try {
    const doctor = yield call(PartnerService.getDoctorDetails, payload);
    yield put(actions.getDoctorDetails.success(doctor));
  } catch (error: any) {
    yield put(actions.getDoctorDetails.failure(error.message));
  }
}

function* getDoctorDiaries({ payload }: BaseAction<GetDoctorDiariesParams>) {
  try {
    const data = yield call(PartnerService.getDiary, {
      doctorId: {
        equal: payload.doctorId,
      },
    });
    yield put(actions.getDoctorDiaries.success(data));
  } catch (error: any) {
    yield put(actions.getDoctorDiaries.failure(error.message));
  }
}

function* getDoctorReviews({ payload }: BaseAction<GetDoctorReviewsParams>) {
  try {
    const data = yield call(PartnerService.getReview, {
      doctorCode: {
        equal: payload.doctorCode,
      },
    });
    yield put(actions.getDoctorReviews.success(data.data));
  } catch (error: any) {
    yield put(actions.getDoctorReviews.failure(error.message));
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_DOCTOR_LIST.REQUEST, getDoctorList),
    takeLatest(GET_DOCTOR_DETAILS.REQUEST, getDoctorDetails),
    takeLatest(GET_DOCTOR_DIARIES.REQUEST, getDoctorDiaries),
    takeLatest(GET_DOCTOR_REVIEWS.REQUEST, getDoctorReviews),
  ]);
}
