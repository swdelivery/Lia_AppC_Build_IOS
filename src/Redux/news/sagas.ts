import { BaseAction } from "@Redux/types";
import { all, call, put, takeLatest } from "redux-saga/effects";
import PartnerService from "src/Services/PartnerService";
import * as actions from "./actions";
import { GET_NEWS } from "./types";
import { CacheManager } from "@georstat/react-native-image-cache";
import { ApiResponse } from "@typings/api";
import { News } from "@typings/news";
import { getImageAvataUrl } from "src/utils/avatar";
import { head } from "lodash";

function* getNews({ payload }: BaseAction<string>) {
  try {
    const data: ApiResponse<News[]> = yield call(
      PartnerService.getNews,
      payload
    );
    CacheManager.prefetch(
      data.data.map((item) =>
        getImageAvataUrl(head(item.representationFileArr))
      )
    );
    yield put(actions.getNews.success(data));
  } catch (error: any) {}
}

export default function* sagas() {
  yield all([
    takeLatest(GET_NEWS.REQUEST, getNews),
  ]);
}
