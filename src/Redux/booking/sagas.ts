import { BaseAction } from "@Redux/types";
import { Branch } from "@typings/branch";
import { all, call, put, takeLatest } from "redux-saga/effects";
import PartnerService from "src/Services/PartnerService";
import configs from "src/configs";
import * as actions from "./actions";
import {
  GET_BRANCH_LIST_FOR_BOOKING,
  GET_DOCTOR_LIST_BY_BRANCH_CODE,
  GET_LIST_SERVICE_FILTER,
  GET_PRACTITIONER_LIST_BY_BRANCH_CODE,
  GetDoctorListByBranchCodeParams,
  GetPractitionerListByBranchCodeParams,
  CREAT_PARTNER_BOOKING,
  GetListServiceForBookingParams,
  UPDATE_PARTNER_BOOKING,
} from "./types";
import { Doctor } from "@typings/doctor";
import { Practitioner } from "@typings/practitioner";
import { Alert } from "react-native";
import { Service } from "@typings/serviceGroup";
import { pickBy } from "lodash";
import { navigation } from "rootNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import { ApiResponse } from "@typings/api";

function* getBranchListForBooking({ payload }: BaseAction<any>) {
  try {
    const data: Branch[] = yield call(PartnerService.getBranchList, payload);
    yield put(
      actions.getBranchListForBooking.success({
        data,
        paging: {
          page: 1,
          canLoadMore: data.length === configs.apiPageSize,
        },
      })
    );
  } catch (error: any) {
    yield put(actions.getBranchListForBooking.failure(error.message));
  }
}

function* getDoctorListByBranchCode({
  payload,
}: BaseAction<GetDoctorListByBranchCodeParams>) {
  try {
    const data: Doctor[] = yield call(PartnerService.getDoctorList, {
      branchCode: { equal: payload.branchCode },
    });
    yield put(
      actions.getDoctorListByBranchCode.success({
        data,
        paging: {
          page: 1,
          canLoadMore: data.length === configs.apiPageSize,
        },
      })
    );
  } catch (error: any) {
    yield put(actions.getDoctorListByBranchCode.failure(error.message));
  }
}

function* getPractitionerListByBranchCode({
  payload,
}: BaseAction<GetPractitionerListByBranchCodeParams>) {
  try {
    const data: Practitioner[] = yield call(PartnerService.getPractitioners, {
      branchCode: { equal: payload.branchCode },
    });
    yield put(
      actions.getPractitionerListByBranchCode.success({
        data,
        paging: {
          page: 1,
          canLoadMore: data.length === configs.apiPageSize,
        },
      })
    );
  } catch (error: any) {
    yield put(actions.getPractitionerListByBranchCode.failure(error.message));
  }
}

function* getListServiceFilter({
  payload,
}: BaseAction<GetListServiceForBookingParams>) {
  try {
    const { data }: ApiResponse<Service[]> = yield call(
      PartnerService.getServices,
      pickBy(payload, (i) => i != undefined),
      1,
      100
    );
    yield put(actions.getListServiceFilter.success(data));
  } catch (error: any) {
    yield put(actions.getListServiceFilter.failure(error.message));
  }
}

function* createPartnerBooking({ payload }: BaseAction<any>) {
  try {
    const data = yield call(PartnerService.createPartnerBooking, payload);
    yield put(
      actions.createPartnerBooking.success({
        data,
      })
    );
    Alert.alert(data?.message);
    yield put(actions.clearDataCreateBooking());
    navigation.goBack();
    navigation.navigate(ScreenKey.LIST_BOOKING);
  } catch (error: any) {
    Alert.alert(error?.message);
    yield put(actions.createPartnerBooking.failure(error));
  }
}

function* updatePartnerBooking({ payload }: BaseAction<any>) {
  try {
    const data = yield call(PartnerService.updatePartnerBooking, payload);
    Alert.alert(data?.message);
    yield put(actions.clearDataCreateBooking());
    navigation.goBack();
    // navigation.navigate(ScreenKey.LIST_BOOKING);
  } catch (error: any) {
    Alert.alert(error?.message);
    yield put(actions.createPartnerBooking.failure(error));
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_BRANCH_LIST_FOR_BOOKING.REQUEST, getBranchListForBooking),
    takeLatest(GET_DOCTOR_LIST_BY_BRANCH_CODE.REQUEST, getDoctorListByBranchCode),
    takeLatest(GET_PRACTITIONER_LIST_BY_BRANCH_CODE.REQUEST, getPractitionerListByBranchCode),
    takeLatest(GET_LIST_SERVICE_FILTER.REQUEST, getListServiceFilter),
    takeLatest(CREAT_PARTNER_BOOKING.REQUEST, createPartnerBooking),
    takeLatest(UPDATE_PARTNER_BOOKING.REQUEST, updatePartnerBooking)
  ]);
}
