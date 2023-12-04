import { BaseAction } from "@Redux/types";
import { Alert } from "react-native";
import { all, call, put, takeLatest } from "redux-saga/effects";
import PartnerService from "src/Services/PartnerService";
import * as actions from "./actions";
import {
  GET_LIST_POSTS, GET_MORE_POSTS, GET_PARTNER_DIARY
} from "./types";

function* getListPosts({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getListPosts, payload);
    yield put(
      actions.getListPosts.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* getMorePosts({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getListPosts, payload);
    yield put(
      actions.getMorePosts.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* getPartnerDiary({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getPartnerDiary, payload);
    yield put(
      actions.getPartnerDiary.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}


export default function* sagas() {
  yield all([takeLatest(GET_LIST_POSTS.REQUEST, getListPosts)]);
  yield all([takeLatest(GET_MORE_POSTS.REQUEST, getMorePosts)]);
  yield all([takeLatest(GET_PARTNER_DIARY.REQUEST, getPartnerDiary)]);
}
