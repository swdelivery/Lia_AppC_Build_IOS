import { AppState } from "../Reducers/RootReducer";

export const getPartnerConversationsState = (state: AppState) =>
  state.chat.partnerConversations;

export const getConversationState = (state: AppState) =>
  state.chat.conversation;

export const getMessagesState = (state: AppState) => state.chat.messages;
