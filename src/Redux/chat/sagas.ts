import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  GET_PARTNER_CONVERSATIONS,
  GetPartnerConversationsParams,
  LOAD_MORE_PARTNER_CONVERSATIONS,
} from "./types";
import * as actions from "./actions";
import { BaseAction } from "@Redux/types";
import { LastMessage } from "@typings/chat";
import { selectState } from "@Redux/helper";
import { getPartnerConversationsState } from "./selectors";
import PartnerService from "src/Services/PartnerService";
import configs from "src/configs";

function* getPartnerConversations({
  payload,
}: BaseAction<GetPartnerConversationsParams>) {
  try {
    const data: LastMessage[] = yield call(
      PartnerService.getPartnerConversations,
      payload
    );
    yield put(
      actions.getPartnerConversations.success({
        data,
        paging: {
          canLoadMore: data.length === configs.apiPageSize,
          page: 1,
        },
      })
    );
  } catch (error: any) {
    yield put(actions.getPartnerConversations.failure(error.message));
  }
}

function* loadMorePartnerConversations({
  payload,
}: BaseAction<GetPartnerConversationsParams>) {
  try {
    const { paging } = yield* selectState(getPartnerConversationsState);
    if (!paging || !paging.canLoadMore) {
      throw new Error("Empty");
    }
    const data = yield call(
      PartnerService.getPartnerConversations,
      payload,
      paging.page + 1
    );
    yield put(
      actions.loadMorePartnerConversations.success({
        data,
        paging: {
          canLoadMore: data.length === configs.apiPageSize,
          page: paging.page + 1,
        },
      })
    );
  } catch (error: any) {
    yield put(actions.loadMorePartnerConversations.failure(error.message));
  }
}

export default function* chatSagas() {
  yield all([
    takeLatest(GET_PARTNER_CONVERSATIONS.REQUEST, getPartnerConversations),
    takeLatest(
      LOAD_MORE_PARTNER_CONVERSATIONS.REQUEST,
      loadMorePartnerConversations
    ),
  ]);
}
