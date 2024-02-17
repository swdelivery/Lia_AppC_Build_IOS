import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_DOCTOR_LIST } from "./types";
import * as actions from "./actions";
import PartnerService from "src/Services/PartnerService";
import { Doctor } from "@typings/doctor";
import configs from "src/configs";
import { ApiResponse } from "@typings/api";
import { CacheManager } from "@georstat/react-native-image-cache";
import { getImageAvataUrl } from "src/utils/avatar";

function* getDoctorList() {
  try {
    const { data }: ApiResponse<Doctor[]> = yield call(
      PartnerService.getDoctorList,
      {}
    );
    CacheManager.prefetch(
      data.slice(0, 3).map((item) => getImageAvataUrl(item.avatar))
    );
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

export default function* sagas() {
  yield all([takeLatest(GET_DOCTOR_LIST.REQUEST, getDoctorList)]);
}
