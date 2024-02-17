import { BaseAction } from "@Redux/types";
import { all, call, put, takeLatest } from "redux-saga/effects";
import PartnerService from "src/Services/PartnerService";
import * as actions from "./actions";
import { GET_IMAGE_VOUCHER } from "./types";
import { ConfigFile } from "@typings/configFile";
import { head } from "lodash";
import { CacheManager } from "@georstat/react-native-image-cache";
import { getImageAvataUrl } from "src/utils/avatar";

function* getImageVoucherHome({ payload }: BaseAction<string>) {
  try {
    const data: ConfigFile = yield call(
      PartnerService.getConfigFileByCode,
      payload
    );
    console.log({ data });
    const file = head(data?.fileArr);
    if (file) {
      CacheManager.prefetch(getImageAvataUrl(file));
    }

    yield put(actions.getImageVoucherHome.success(file));
  } catch (error: any) {}
}

export default function* sagas() {
  yield all([
    takeLatest(GET_IMAGE_VOUCHER.REQUEST, getImageVoucherHome),
  ]);
}
