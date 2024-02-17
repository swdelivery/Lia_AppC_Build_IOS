import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_SERVICES, GET_SERVICE_GROUP, LOAD_MORE_SERVICES } from "./types";
import * as actions from "./actions";
import PartnerService from "src/Services/PartnerService";
import configs from "src/configs";
import { selectState } from "@Redux/helper";
import { getServiceListState } from "./selectors";
import { BaseAction } from "@Redux/types";
import { ServiceGroup } from "@typings/serviceGroup";
import { CacheManager } from "@georstat/react-native-image-cache";
import { getImageAvataUrl } from "src/utils/avatar";

function* getServiceGroup({ payload }: BaseAction<any>) {
  try {
    const data: ServiceGroup[] = yield call(
      PartnerService.getServiceGroup,
      payload
    );
    CacheManager.prefetch(
      data.map((item) => getImageAvataUrl(item.fileAvatar))
    );
    yield put(actions.getServiceGroup.success(data));
  } catch (error: any) {
    yield put(actions.getServiceGroup.failure(error.message));
  }
}

function* getServices() {
  try {
    const response = yield call(PartnerService.getServices, {});
    yield put(
      actions.getServices.success({
        data: response.data,
        paging: {
          canLoadMore: response.data.length === configs.apiPageSize,
          page: 1,
        },
      })
    );
  } catch (error: any) {
    yield put(actions.getServices.failure(error.message));
  }
}

function* loadMoreServices() {
  try {
    const { paging } = yield* selectState(getServiceListState);
    if (!paging || !paging.canLoadMore) {
      throw new Error("empty");
    }
    const response = yield call(
      PartnerService.getServices,
      {},
      paging.page + 1
    );
    yield put(
      actions.loadMoreServices.success({
        data: response.data,
        paging: {
          canLoadMore: response.data.length === configs.apiPageSize,
          page: paging.page + 1,
        },
      })
    );
  } catch (error: any) {
    yield put(actions.loadMoreServices.failure(error.message));
  }
}

export default function* sagas() {
  yield all([
    takeLatest(GET_SERVICE_GROUP.REQUEST, getServiceGroup),
    takeLatest(GET_SERVICES.REQUEST, getServices),
    takeLatest(LOAD_MORE_SERVICES.REQUEST, loadMoreServices),
  ]);
}
