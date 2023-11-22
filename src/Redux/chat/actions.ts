import { generateActionsGroup } from "@Redux/helper";
import {
  GET_CONVERSATION_DETAILS,
  GET_CONVERSATION_MESSAGES,
  GET_PARTNER_CONVERSATIONS,
  LOAD_MORE_CONVERSATION_MESSAGES_HISTORY,
  LOAD_MORE_PARTNER_CONVERSATIONS,
  OPEN_TREATMENT_DETAILS,
  START_CHAT,
  StartChatParams,
} from "./types";
import { DataPagingPayload } from "@typings/api";
import { Conversation, Message } from "@typings/chat";

export const getPartnerConversations = generateActionsGroup<
  any,
  DataPagingPayload<Conversation[]>
>(GET_PARTNER_CONVERSATIONS);

export const loadMorePartnerConversations = generateActionsGroup<
  any,
  DataPagingPayload<Conversation[]>
>(LOAD_MORE_PARTNER_CONVERSATIONS);

export const getConversationDetails = generateActionsGroup<
  Conversation,
  Conversation
>(GET_CONVERSATION_DETAILS);

export const getConversationMessages = generateActionsGroup<
  string,
  DataPagingPayload<Message[]>
>(GET_CONVERSATION_MESSAGES);

export const loadMoreConversationMessagesHistory = generateActionsGroup<
  void,
  DataPagingPayload<Message[]>
>(LOAD_MORE_CONVERSATION_MESSAGES_HISTORY);

export const openTreatmentDetails = generateActionsGroup<string, void>(
  OPEN_TREATMENT_DETAILS
);

export const startChat = generateActionsGroup<StartChatParams, void>(
  START_CHAT
);
