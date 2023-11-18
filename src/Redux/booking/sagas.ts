import { BaseAction } from "@Redux/types";
import { Branch } from "@typings/branch";
import { all, call, put, takeLatest } from "redux-saga/effects";
import PartnerService from "src/Services/PartnerService";
import configs from "src/configs";
import * as actions from "./actions";
import {
  GET_BRANCH_LIST_FOR_BOOKING, GET_DOCTOR_LIST_BY_BRANCH_CODE, GET_LIST_SERVICE_FILTER, GET_PRACTITIONER_LIST_BY_BRANCH_CODE, GetDoctorListByBranchCodeParams, GetPractitionerListByBranchCodeParams
} from "./types";
import { Doctor } from "@typings/doctor";
import { Practitioner } from "@typings/practitioner";



function* getBranchListForBooking({ payload }: BaseAction<any>) {
  try {
    const data: Branch[] = yield call(PartnerService.getBranchList, payload);
    yield put(
      actions.getBranchListForBooking.success({
        data,
        paging: {
          page: 1,
          canLoadMore: data.length === configs.apiPageSize,
        }
      })
    );
  } catch (error: any) {
    yield put(actions.getBranchListForBooking.failure(error.message));
  }
}

function* getDoctorListByBranchCode({ payload }: BaseAction<GetDoctorListByBranchCodeParams>) {
  try {
    const data: Doctor[] = yield call(PartnerService.getDoctorList, { branchCode: { equal: payload.branchCode } });
    yield put(
      actions.getDoctorListByBranchCode.success({
        data,
        paging: {
          page: 1,
          canLoadMore: data.length === configs.apiPageSize,
        }
      })
    );
  } catch (error: any) {
    yield put(actions.getDoctorListByBranchCode.failure(error.message));
  }
}

function* getPractitionerListByBranchCode({ payload }: BaseAction<GetPractitionerListByBranchCodeParams>) {
  try {
    const data: Practitioner[] = yield call(PartnerService.getPractitioners, { branchCode: { equal: payload.branchCode } });
    yield put(
      actions.getPractitionerListByBranchCode.success({
        data,
        paging: {
          page: 1,
          canLoadMore: data.length === configs.apiPageSize,
        }
      })
    );
  } catch (error: any) {
    yield put(actions.getPractitionerListByBranchCode.failure(error.message));
  }
}

function* getListServiceFilter({ payload }: BaseAction<any>) {
  try {
    const data = yield call(PartnerService.getServicesFilter, payload);
    yield put(
      actions.getListServiceFilter.success({
        data,
      })
    );
  } catch (error: any) {
    yield put(actions.getListServiceFilter.failure(error.message));
  }
}

export default function* sagas() {
  yield all([takeLatest(GET_BRANCH_LIST_FOR_BOOKING.REQUEST, getBranchListForBooking)]);
  yield all([takeLatest(GET_DOCTOR_LIST_BY_BRANCH_CODE.REQUEST, getDoctorListByBranchCode)]);
  yield all([takeLatest(GET_PRACTITIONER_LIST_BY_BRANCH_CODE.REQUEST, getPractitionerListByBranchCode)]);
  yield all([takeLatest(GET_LIST_SERVICE_FILTER.REQUEST, getListServiceFilter)]);
}
