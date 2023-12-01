import { BaseAction } from "@Redux/types";
import { Alert } from "react-native";
import { all, call, put, takeLatest } from "redux-saga/effects";
import PartnerService from "src/Services/PartnerService";
import * as actions from "./actions";
import {
  CREATE_AI_MESSAGE,
  GET_LIST_AI_MESSAGES,
  GET_MORE_AI_MESSAGES
} from "./types";

function* getListAIMessages({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getListAIMessages, payload);
    yield put(
      actions.getListAIMessages.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* getMoreAIMessages({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getListAIMessages, payload);
    yield put(
      actions.getMoreAIMessages.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

function* createAIMessage({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.createAIMessage, payload);
    yield put(
      actions.createAIMessage.success({
        data,
      })
    );
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

export default function* sagas() {
  yield all([takeLatest(GET_LIST_AI_MESSAGES.REQUEST, getListAIMessages)]);
  yield all([takeLatest(GET_MORE_AI_MESSAGES.REQUEST, getMoreAIMessages)]);
  yield all([takeLatest(CREATE_AI_MESSAGE.REQUEST, createAIMessage)]);
}
