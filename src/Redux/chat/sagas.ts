import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  GET_CONVERSATION_DETAILS,
  GET_CONVERSATION_MESSAGES,
  GET_PARTNER_CONVERSATIONS,
  GetPartnerConversationsParams,
  LOAD_MORE_PARTNER_CONVERSATIONS,
} from "./types";
import * as actions from "./actions";
import { BaseAction } from "@Redux/types";
import { Conversation } from "@typings/chat";
import { selectState } from "@Redux/helper";
import { getPartnerConversationsState } from "./selectors";
import PartnerService from "src/Services/PartnerService";
import configs from "src/configs";

function* getPartnerConversations({
  payload,
}: BaseAction<GetPartnerConversationsParams>) {
  try {
    const data: Conversation[] = yield call(
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

function* getConversationDetails({ payload }: BaseAction<Conversation>) {
  try {
    const data = yield call(PartnerService.getConversationDetails, payload._id);
    yield put(actions.getConversationDetails.success(data));
  } catch (error: any) {
    yield put(actions.getConversationDetails.failure(error.message));
  }
}

function* getConversationMessages({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getConversationMessages, {
      conversationId: payload,
      // before: currListMessageRedux?.messages[0]?._id,
    });
    yield put(actions.getConversationMessages.success(data));
  } catch (error: any) {
    yield put(actions.getConversationMessages.failure(error.message));
  }
}

export default function* chatSagas() {
  yield all([
    takeLatest(GET_PARTNER_CONVERSATIONS.REQUEST, getPartnerConversations),
    takeLatest(
      LOAD_MORE_PARTNER_CONVERSATIONS.REQUEST,
      loadMorePartnerConversations
    ),
    takeLatest(GET_CONVERSATION_DETAILS.REQUEST, getConversationDetails),
    takeLatest(GET_CONVERSATION_MESSAGES.REQUEST, getConversationMessages),
  ]);
}
