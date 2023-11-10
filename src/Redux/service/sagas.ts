import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  GET_SERVICES,
  GET_SERVICE_DETAILS,
  GET_SERVICE_REVIEWS,
  GetServiceReviewsParams,
  GET_SERVICES_BY_GROUPS,
  GetServiceByGroupParams,
} from "./types";
import * as actions from "./actions";
import PartnerService from "src/Services/PartnerService";
import { BaseAction } from "@Redux/types";

function* getServices() {
  try {
    const data = yield call(PartnerService.getServices, {});
    yield put(actions.getServices.success(data));
  } catch (error: any) {
    yield put(actions.getServices.failure(error.message));
  }
}

function* getServicesByGroups({
  payload,
}: BaseAction<GetServiceByGroupParams>) {
  try {
    const data = yield call(PartnerService.getServicesByGroups, {
      codeGroup: {
        in: payload.codeGroup,
      },
    });
    yield put(actions.getServicesByGroups.success(data));
  } catch (error: any) {
    yield put(actions.getServicesByGroups.failure(error.message));
  }
}

function* getServiceDetails({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getServiceDetails, payload);
    yield put(actions.getServiceDetails.success(data));
  } catch (error: any) {
    yield put(actions.getServiceDetails.failure(error.message));
  }
}

function* getServiceReviews({ payload }: BaseAction<GetServiceReviewsParams>) {
  try {
    const data = yield call(PartnerService.getReview, {
      serviceCode: {
        equal: payload.serviceCode,
      },
    });
    yield put(actions.getServiceReviews.success(data));
  } catch (error: any) {
    yield put(actions.getServiceReviews.failure(error.message));
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_SERVICES.REQUEST, getServices),
    takeLatest(GET_SERVICE_DETAILS.REQUEST, getServiceDetails),
    takeLatest(GET_SERVICE_REVIEWS.REQUEST, getServiceReviews),
    takeLatest(GET_SERVICES_BY_GROUPS.REQUEST, getServicesByGroups),
  ]);
}
