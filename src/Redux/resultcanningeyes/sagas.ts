import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_BRANCHS, GET_DOCTORS, GET_EYE_LABEL, GET_SERVICES } from "./types";
import * as actions from "./actions";
import PartnerService from "src/Services/PartnerService";

function* getServices({ payload }) {
  try {
    console.log(payload);

    const data = yield call(PartnerService.getServices, payload);
    yield put(actions.getServicesByResEye.success(data));
  } catch (error: any) {
    yield put(actions.getServicesByResEye.failure(error.message));
  }
}

function* getDoctors({ payload }) {
  try {
    console.log(payload);

    const data = yield call(PartnerService.getDoctorList, payload);
    yield put(actions.getDoctorsByResEye.success(data));
  } catch (error: any) {
    yield put(actions.getDoctorsByResEye.failure(error.message));
  }
}

function* getBranchs({ payload }) {
  try {
    console.log({ payloadbranch: payload });

    const data = yield call(PartnerService.getBranchList, payload);
    yield put(actions.getBranchsByResEye.success(data));
  } catch (error: any) {
    yield put(actions.getBranchsByResEye.failure(error.message));
  }
}

function* getEyeLabel() {
  try {
    const data = yield call(PartnerService.getEyeLabel, {});
    yield put(actions.getEyeLabel.success(data));
  } catch (error: any) {
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_SERVICES.REQUEST, getServices),
    takeLatest(GET_DOCTORS.REQUEST, getDoctors),
    takeLatest(GET_BRANCHS.REQUEST, getBranchs),
    takeLatest(GET_EYE_LABEL.REQUEST, getEyeLabel)
  ]);
}
