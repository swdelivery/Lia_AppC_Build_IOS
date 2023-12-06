import { BaseAction } from "@Redux/types";
import { Alert } from "react-native";
import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import PartnerService from "src/Services/PartnerService";
import * as actions from "./actions";
import {
  CREATE_COMMENT_POST,
  CREATE_REACTION_POST,
  GET_CHILD_COMMENTS_POST,
  GET_COMMENTS_POST,
  GET_LIST_POSTS, GET_MORE_COMMENTS_POST, GET_MORE_POSTS, GET_PARTNER_DIARY
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

function* getCommentsPost({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getCommentsPost, payload);
    yield put(
      actions.getCommentsPost.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* getMoreCommentsPost({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getMoreCommentsPost, payload);
    yield put(
      actions.getMoreCommentsPost.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* getChildCommentsPost({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getCommentsPost, payload);
    yield put(
      actions.getChildCommentsPost.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* createCommentPost({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.createCommentPost, payload);
    yield put(
      actions.createCommentPost.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* createReactionPost({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.createReactionPost, payload);
    yield put(
      actions.createReactionPost.success({
        data,
        postId: payload?.postId
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}


export default function* sagas() {
  yield all([
    takeLatest(GET_LIST_POSTS.REQUEST, getListPosts),
    takeLatest(GET_MORE_POSTS.REQUEST, getMorePosts),
    takeLatest(GET_PARTNER_DIARY.REQUEST, getPartnerDiary),
    takeLatest(GET_COMMENTS_POST.REQUEST, getCommentsPost),
    takeLatest(GET_MORE_COMMENTS_POST.REQUEST, getMoreCommentsPost),
    takeEvery(GET_CHILD_COMMENTS_POST.REQUEST, getChildCommentsPost),
    takeLatest(CREATE_COMMENT_POST.REQUEST, createCommentPost),
    takeLatest(CREATE_REACTION_POST.REQUEST, createReactionPost),
  ]);
}
