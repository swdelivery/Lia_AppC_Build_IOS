import { all, call, put, takeLatest, takeLeading } from "redux-saga/effects";
import {
  GET_CONVERSATION_DETAILS,
  GET_CONVERSATION_MESSAGES,
  GET_PARTNER_CONVERSATIONS,
  GetPartnerConversationsParams,
  LOAD_MORE_CONVERSATION_MESSAGES_HISTORY,
  LOAD_MORE_PARTNER_CONVERSATIONS,
  OPEN_TREATMENT_DETAILS,
  START_CHAT,
  StartChatParams,
} from "./types";
import * as actions from "./actions";
import { BaseAction } from "@Redux/types";
import { Conversation, Message } from "@typings/chat";
import { selectState } from "@Redux/helper";
import { getMessagesState, getPartnerConversationsState } from "./selectors";
import PartnerService from "src/Services/PartnerService";
import configs from "src/configs";
import { navigation } from "rootNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import { CSS_PARTNER_SEEN_MESSAGE } from "src/Sockets/type";
import SocketInstance from "SocketInstance";

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
    const data: Message[] = yield call(PartnerService.getConversationMessages, {
      conversationId: payload,
      // before: currListMessageRedux?.messages[0]?._id,
    });
    yield put(
      actions.getConversationMessages.success({
        data,
        paging: {
          canLoadMore: data.length === configs.apiPageSize,
          after: data[data.length - 1]?._id,
        },
      })
    );

    // Mark as read
    const unreadMessages = data
      .filter((item) => !item.isPartnerSeen)
      .map((item) => item._id);
    if (unreadMessages.length > 0) {
      let data = {
        conversationId: payload,
        messageIds: unreadMessages,
      };
      SocketInstance?.socketConn?.emit(CSS_PARTNER_SEEN_MESSAGE, data);
    }
    yield put(actions.markAsRead(payload));
  } catch (error: any) {
    yield put(actions.getConversationMessages.failure(error.message));
  }
}

function* loadMoreConversationMessagesHistory() {
  try {
    const { paging, conversationId } = yield* selectState(getMessagesState);
    if (!paging || !paging.canLoadMore) {
      throw new Error("Empty");
    }
    const data: Message[] = yield call(PartnerService.getConversationMessages, {
      conversationId,
      after: paging.after,
    });
    yield put(
      actions.loadMoreConversationMessagesHistory.success({
        data,
        paging: {
          canLoadMore: data.length === configs.apiPageSize,
          after: data[data.length - 1]?._id,
        },
      })
    );

    // Mark as read
    const unreadMessages = data
      .filter((item) => !item.isPartnerSeen)
      .map((item) => item._id);
    if (unreadMessages.length > 0) {
      let data = {
        conversationId: conversationId,
        messageIds: unreadMessages,
      };
      SocketInstance?.socketConn?.emit(CSS_PARTNER_SEEN_MESSAGE, data);
    }
  } catch (error: any) {
    yield put(
      actions.loadMoreConversationMessagesHistory.failure(error.message)
    );
  }
}

function* openTreatmentDetails({ payload }: BaseAction<string>) {
  try {
    const data = yield call(PartnerService.getTreatmentDetailsById, payload);
    if (data) {
      navigation.navigate(ScreenKey.DIARY_OF_TREATMENT, {
        treatmentDetail: data,
      });
    }
    yield put(actions.openTreatmentDetails.success());
  } catch (error: any) {
    yield put(actions.openTreatmentDetails.failure(error.message));
  }
}

function* startChat({ payload }: BaseAction<StartChatParams>) {
  try {
    const data = yield call(PartnerService.startChat, payload);
    yield put(actions.startChat.success(data));
    navigation.navigate(ScreenKey.CHATTING, {
      conversation: data,
    });
  } catch (error: any) {
    yield put(actions.startChat.failure(error.message));
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
    takeLeading(
      LOAD_MORE_CONVERSATION_MESSAGES_HISTORY.REQUEST,
      loadMoreConversationMessagesHistory
    ),
    takeLatest(OPEN_TREATMENT_DETAILS.REQUEST, openTreatmentDetails),
    takeLatest(START_CHAT.REQUEST, startChat),
  ]);
}
